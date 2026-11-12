using Microsoft.Web.WebView2.Core;
using System.Drawing;
using System.Net.Http;
using System.Text.Json;

namespace TaskDraw;

internal sealed class ReminderScheduler : IDisposable
{
    private sealed class ReminderTask
    {
        public int Id { get; init; }
        public string Title { get; init; } = "";
        public string Status { get; init; } = "";
        public string TaskDate { get; init; } = "";
        public string? DueTime { get; init; }
        public string? AdvanceTime { get; init; }
    }

    private readonly AppHost _app;
    private readonly MainWindow _main;
    private readonly CoreWebView2Environment _environment;
    private readonly string _baseUrl;
    private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(5) };
    private readonly System.Windows.Forms.Timer _timer = new() { Interval = 250 };
    private readonly List<ReminderWindow> _windows = new();
    private readonly HashSet<string> _fired = new(StringComparer.Ordinal);
    private readonly Dictionary<int, ReminderTask> _tasks = new();
    private DateTime _lastFetch = DateTime.MinValue;
    private bool _fetching;
    private bool _disposed;

    public ReminderScheduler(AppHost app, MainWindow main, CoreWebView2Environment environment, string baseUrl)
    {
        _app = app;
        _main = main;
        _environment = environment;
        _baseUrl = baseUrl;
        _timer.Tick += (_, _) => Tick();
    }

    public void Start()
    {
        if (_disposed)
        {
            return;
        }
        _timer.Start();
        _ = FetchAsync();
    }

    public void RefreshNow()
    {
        if (_disposed)
        {
            return;
        }
        _lastFetch = DateTime.MinValue;
        _ = FetchAsync();
    }

    private async Task FetchAsync()
    {
        if (_fetching || _disposed)
        {
            return;
        }
        _fetching = true;
        try
        {
            var today = DateTime.Now.ToString("yyyy-MM-dd");
            var json = await _http.GetStringAsync($"{_baseUrl}/api/tasks?date={today}");
            if (_disposed)
            {
                return;
            }
            using var document = JsonDocument.Parse(json);
            var list = new Dictionary<int, ReminderTask>();
            if (document.RootElement.TryGetProperty("tasks", out var tasks))
            {
                foreach (var item in tasks.EnumerateArray())
                {
                    var id = item.GetProperty("id").GetInt32();
                    list[id] = new ReminderTask
                    {
                        Id = id,
                        Title = item.TryGetProperty("title", out var title) ? title.GetString() ?? "" : "",
                        Status = item.TryGetProperty("status", out var status) ? status.GetString() ?? "" : "",
                        TaskDate = item.TryGetProperty("task_date", out var date) ? date.GetString() ?? "" : "",
                        DueTime = ReadTime(item, "due_time"),
                        AdvanceTime = ReadTime(item, "advance_time"),
                    };
                }
            }
            _main.BeginInvoke(new Action(() =>
            {
                if (_disposed)
                {
                    return;
                }
                _tasks.Clear();
                foreach (var pair in list)
                {
                    _tasks[pair.Key] = pair.Value;
                }
                _lastFetch = DateTime.Now;
            }));
        }
        catch
        {
            // Retry on the next tick.
        }
        finally
        {
            _fetching = false;
        }
    }

    private static string? ReadTime(JsonElement item, string name)
    {
        if (!item.TryGetProperty(name, out var value) || value.ValueKind != JsonValueKind.String)
        {
            return null;
        }
        var text = value.GetString();
        return string.IsNullOrWhiteSpace(text) ? null : text;
    }

    private void Tick()
    {
        if (_disposed)
        {
            return;
        }
        var now = DateTime.Now;
        if ((now - _lastFetch).TotalSeconds > 15)
        {
            _ = FetchAsync();
        }
        if (_tasks.Count == 0)
        {
            return;
        }

        var today = now.ToString("yyyy-MM-dd");
        foreach (var task in _tasks.Values)
        {
            if (!string.Equals(task.Status, "open", StringComparison.Ordinal)
                || !string.Equals(task.TaskDate, today, StringComparison.Ordinal))
            {
                continue;
            }

            if (task.DueTime != null)
            {
                QueueIfDue(task, "on", task.DueTime, now, today);
            }
            if (task.AdvanceTime != null && task.DueTime != null
                && string.CompareOrdinal(task.AdvanceTime, task.DueTime) < 0)
            {
                QueueIfDue(task, "advance", task.AdvanceTime, now, today);
            }
        }
    }

    private void QueueIfDue(ReminderTask task, string kind, string time, DateTime now, string today)
    {
        if (!TryParseTime(time, out var hour, out var minute))
        {
            return;
        }
        var target = DateTime.Today.AddHours(hour).AddMinutes(minute);
        var delta = (now - target).TotalSeconds;
        if (delta < 0 || delta > 90)
        {
            return;
        }
        var key = $"{task.Id}:{today}:{kind}:{time}";
        if (!_fired.Add(key))
        {
            return;
        }
        _ = VerifyAndShowAsync(task.Id, kind, time);
    }

    private static bool TryParseTime(string value, out int hour, out int minute)
    {
        hour = 0;
        minute = 0;
        var parts = value.Split(':');
        if (parts.Length != 2
            || !int.TryParse(parts[0], out hour)
            || !int.TryParse(parts[1], out minute)
            || hour is < 0 or > 23
            || minute is < 0 or > 59)
        {
            return false;
        }
        return true;
    }

    private async Task VerifyAndShowAsync(int taskId, string kind, string time)
    {
        try
        {
            var json = await _http.GetStringAsync($"{_baseUrl}/api/tasks/{taskId}");
            using var document = JsonDocument.Parse(json);
            var root = document.RootElement;
            if (!string.Equals(root.GetProperty("status").GetString(), "open", StringComparison.Ordinal))
            {
                return;
            }
            var due = ReadTime(root, "due_time");
            var advance = ReadTime(root, "advance_time");
            if (kind == "on" && !string.Equals(due, time, StringComparison.Ordinal))
            {
                return;
            }
            if (kind == "advance" && !string.Equals(advance, time, StringComparison.Ordinal))
            {
                return;
            }
            var title = root.TryGetProperty("title", out var titleNode) ? titleNode.GetString() ?? "" : "";
            _main.BeginInvoke(new Action(() =>
            {
                if (_disposed)
                {
                    return;
                }
                ShowWindow(taskId, title, kind, time);
            }));
        }
        catch
        {
            // A transient failure can be retried after the next task refresh.
        }
    }

    private void ShowWindow(int taskId, string title, string kind, string time)
    {
        if (_disposed)
        {
            return;
        }
        var window = new ReminderWindow(_environment, _baseUrl, taskId, kind, time);
        window.Confirmed += () => _app.RefreshMainFromReminder();
        window.FormClosed += (_, _) =>
        {
            if (_windows.Remove(window))
            {
                LayoutWindows();
            }
        };
        _windows.Add(window);
        LayoutWindows();
        window.ShowReminder();
        _app.PlayReminderChime();
    }

    private void LayoutWindows()
    {
        var area = _app.CurrentScreen.WorkingArea;
        var visible = _windows.Where(window => !window.IsDisposed).ToList();
        for (var index = 0; index < visible.Count; index++)
        {
            var window = visible[index];
            window.Location = new Point(
                area.Right - window.Width - 18,
                area.Top + 18 + index * (window.Height + 10));
        }
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }
        _disposed = true;
        _timer.Stop();
        _timer.Dispose();
        foreach (var window in _windows.ToList())
        {
            try
            {
                window.CloseForExit();
            }
            catch
            {
                // Shutdown is best-effort.
            }
        }
        _windows.Clear();
        _http.Dispose();
    }
}
