using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Text.Json;

namespace TaskDraw;

internal sealed class ReminderWindow : Form
{
    private const int BarWidth = 600;
    private const int BarHeight = 104;

    private readonly CoreWebView2Environment _environment;
    private readonly WebView2 _web;
    private readonly string _url;
    private bool _initializing;
    private bool _forceClose;

    public event Action? Confirmed;

    public ReminderWindow(CoreWebView2Environment environment, string baseUrl, int taskId, string kind, string time)
    {
        _environment = environment;
        Text = "TaskDraw 提醒";
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        StartPosition = FormStartPosition.Manual;
        TopMost = true;
        BackColor = ColorTranslator.FromHtml("#FBF7EF");
        Size = new Size(BarWidth, BarHeight);

        _web = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = ColorTranslator.FromHtml("#FBF7EF"),
        };
        Controls.Add(_web);

        var query = $"task={taskId}&kind={Uri.EscapeDataString(kind)}&time={Uri.EscapeDataString(time)}";
        _url = $"{baseUrl}/reminder?{query}";

        Load += (_, _) => ApplyRoundedRegion();
        Shown += (_, _) => _ = EnsureWebAsync();
    }

    protected override bool ShowWithoutActivation => true;

    protected override CreateParams CreateParams
    {
        get
        {
            var parameters = base.CreateParams;
            parameters.ClassStyle |= 0x00020000; // CS_DROPSHADOW
            parameters.ExStyle |= 0x00000080; // WS_EX_TOOLWINDOW
            parameters.ExStyle |= 0x08000000; // WS_EX_NOACTIVATE
            return parameters;
        }
    }

    protected override void OnResize(EventArgs e)
    {
        base.OnResize(e);
        ApplyRoundedRegion();
    }

    private void ApplyRoundedRegion()
    {
        if (Width <= 0 || Height <= 0)
        {
            return;
        }
        const int radius = 18;
        var diameter = radius * 2;
        using var path = new GraphicsPath();
        path.AddArc(0, 0, diameter, diameter, 180, 90);
        path.AddArc(Width - diameter - 1, 0, diameter, diameter, 270, 90);
        path.AddArc(Width - diameter - 1, Height - diameter - 1, diameter, diameter, 0, 90);
        path.AddArc(0, Height - diameter - 1, diameter, diameter, 90, 90);
        path.CloseFigure();
        var previous = Region;
        Region = new Region(path);
        previous?.Dispose();
    }

    public void ShowReminder()
    {
        if (_forceClose)
        {
            return;
        }
        Show();
        TopMost = true;
        _ = EnsureWebAsync();
    }

    private async Task EnsureWebAsync()
    {
        if (_initializing || _forceClose)
        {
            return;
        }
        _initializing = true;
        try
        {
            await _web.EnsureCoreWebView2Async(_environment);
            if (_forceClose)
            {
                return;
            }
            var settings = _web.CoreWebView2.Settings;
            settings.IsStatusBarEnabled = false;
            settings.AreDefaultContextMenusEnabled = false;
            settings.AreDevToolsEnabled = false;
            settings.IsZoomControlEnabled = false;
            settings.AreBrowserAcceleratorKeysEnabled = false;
            _web.CoreWebView2.WebMessageReceived += OnWebMessage;
            _web.CoreWebView2.NewWindowRequested += (_, e) => e.Handled = true;
            _web.Source = new Uri(_url);
        }
        catch
        {
            if (!_forceClose)
            {
                Close();
            }
        }
        finally
        {
            _initializing = false;
        }
    }

    private void OnWebMessage(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        try
        {
            using var document = JsonDocument.Parse(e.WebMessageAsJson);
            var action = document.RootElement.GetProperty("action").GetString();
            switch (action)
            {
                case "reminder-confirmed":
                    Confirmed?.Invoke();
                    break;
                case "reminder-close":
                    Close();
                    break;
            }
        }
        catch
        {
            // Ignore malformed messages from the page.
        }
    }

    public void CloseForExit()
    {
        _forceClose = true;
        Close();
    }
}
