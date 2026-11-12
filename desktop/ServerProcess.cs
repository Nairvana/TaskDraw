using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;

namespace TaskDraw;

internal sealed class ServerProcess : IDisposable
{
    private readonly object _logLock = new();
    private Process? _process;
    private bool _disposed;

    public int Port { get; private set; }
    public string BaseUrl => $"http://127.0.0.1:{Port}";

    public void Start()
    {
        if (!File.Exists(AppPaths.ServerScript))
        {
            throw new InvalidOperationException($"找不到服务脚本：{AppPaths.ServerScript}");
        }

        Directory.CreateDirectory(AppPaths.DataDirectory);
        try
        {
            File.WriteAllText(AppPaths.ServerLog, string.Empty);
        }
        catch
        {
            // Logging is best-effort only.
        }

        Port = FindFreePort(8765);
        var python = FindPython()
            ?? throw new InvalidOperationException("找不到 Python，请确认 pythonw.exe 已加入 PATH。");

        var startInfo = new ProcessStartInfo
        {
            FileName = python,
            Arguments = $"\"{AppPaths.ServerScript}\" --port {Port} --parent-pid {Environment.ProcessId}",
            WorkingDirectory = AppPaths.Root,
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
        };

        _process = new Process { StartInfo = startInfo };
        _process.OutputDataReceived += (_, e) => AppendLog(e.Data);
        _process.ErrorDataReceived += (_, e) => AppendLog(e.Data);
        _process.Start();
        _process.BeginOutputReadLine();
        _process.BeginErrorReadLine();

        if (!WaitUntilReady(TimeSpan.FromSeconds(15)))
        {
            var tail = ReadLogTail();
            Dispose();
            throw new InvalidOperationException(
                $"本地服务未能启动。{Environment.NewLine}{Environment.NewLine}{tail}");
        }
    }

    private bool WaitUntilReady(TimeSpan timeout)
    {
        using var client = new HttpClient { Timeout = TimeSpan.FromMilliseconds(900) };
        var deadline = DateTime.UtcNow + timeout;
        var url = $"{BaseUrl}/api/health";

        while (DateTime.UtcNow < deadline)
        {
            if (_process == null || _process.HasExited)
            {
                return false;
            }
            try
            {
                using var response = client.GetAsync(url).GetAwaiter().GetResult();
                if (response.IsSuccessStatusCode)
                {
                    var body = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    using var document = JsonDocument.Parse(body);
                    if (document.RootElement.TryGetProperty("ok", out var ok) && ok.GetBoolean())
                    {
                        return true;
                    }
                }
            }
            catch
            {
                // Server is still starting.
            }
            Thread.Sleep(120);
        }
        return false;
    }

    private void AppendLog(string? line)
    {
        if (string.IsNullOrWhiteSpace(line))
        {
            return;
        }
        lock (_logLock)
        {
            try
            {
                File.AppendAllText(AppPaths.ServerLog, $"[{DateTime.Now:HH:mm:ss}] {line}{Environment.NewLine}");
            }
            catch
            {
                // Logging is best-effort only.
            }
        }
    }

    private string ReadLogTail()
    {
        try
        {
            if (!File.Exists(AppPaths.ServerLog))
            {
                return "没有服务日志。";
            }
            var lines = File.ReadAllLines(AppPaths.ServerLog);
            return string.Join(Environment.NewLine, lines.TakeLast(12));
        }
        catch
        {
            return "没有服务日志。";
        }
    }

    private static string? FindPython()
    {
        var local = Path.Combine(AppPaths.Root, "pythonw.exe");
        if (File.Exists(local))
        {
            return local;
        }
        return FindOnPath("pythonw.exe") ?? FindOnPath("python.exe");
    }

    private static string? FindOnPath(string fileName)
    {
        var path = Environment.GetEnvironmentVariable("PATH") ?? string.Empty;
        foreach (var part in path.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries))
        {
            try
            {
                var candidate = Path.Combine(part.Trim(), fileName);
                if (File.Exists(candidate))
                {
                    return candidate;
                }
            }
            catch
            {
                // Ignore malformed PATH entries.
            }
        }
        return null;
    }

    private static int FindFreePort(int preferred)
    {
        for (var port = preferred; port < preferred + 40; port++)
        {
            try
            {
                var listener = new TcpListener(IPAddress.Loopback, port);
                listener.Start();
                listener.Stop();
                return port;
            }
            catch (SocketException)
            {
                // Port in use, try the next one.
            }
        }
        throw new InvalidOperationException("找不到可用的本地端口。");
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }
        _disposed = true;

        var process = _process;
        _process = null;
        if (process == null)
        {
            return;
        }

        try
        {
            if (!process.HasExited)
            {
                process.Kill(entireProcessTree: true);
                process.WaitForExit(3000);
            }
        }
        catch
        {
            // The process may already be gone.
        }
        finally
        {
            process.Dispose();
        }
    }
}
