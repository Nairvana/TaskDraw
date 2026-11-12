using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System.Drawing;
using System.Text.Json;

namespace TaskDraw;

internal sealed class MainWindow : Form
{
    private readonly AppHost _app;
    private readonly CoreWebView2Environment _environment;
    private readonly string _baseUrl;
    private readonly WebView2 _web;
    private bool _initializing;
    private bool _forceClose;

    public MainWindow(AppHost app, CoreWebView2Environment environment, string baseUrl)
    {
        _app = app;
        _environment = environment;
        _baseUrl = baseUrl;

        Text = "TaskDraw";
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = ColorTranslator.FromHtml("#F3EFE7");
        try
        {
            Icon = new Icon(AppPaths.IconPath);
        }
        catch
        {
            // Fall back to the default icon.
        }

        var area = Screen.PrimaryScreen?.WorkingArea ?? new Rectangle(0, 0, 1280, 860);
        Width = Math.Min(1280, Math.Max(1020, area.Width - 120));
        Height = Math.Min(880, Math.Max(660, area.Height - 100));
        MinimumSize = new Size(1020, 660);

        _web = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = ColorTranslator.FromHtml("#F3EFE7"),
        };
        Controls.Add(_web);

        Load += async (_, _) => await InitializeAsync();
    }

    private async Task InitializeAsync()
    {
        if (_initializing)
        {
            return;
        }
        _initializing = true;

        try
        {
            await _web.EnsureCoreWebView2Async(_environment);
            var settings = _web.CoreWebView2.Settings;
            settings.IsStatusBarEnabled = false;
            settings.AreDefaultContextMenusEnabled = false;
            settings.AreDevToolsEnabled = false;
            settings.IsZoomControlEnabled = false;
            settings.AreBrowserAcceleratorKeysEnabled = true;

            _web.CoreWebView2.WebMessageReceived += OnWebMessage;
            _web.CoreWebView2.NewWindowRequested += (_, e) => e.Handled = true;
            _web.Source = new Uri(_baseUrl);
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                this,
                $"无法加载 TaskDraw 界面。{Environment.NewLine}{Environment.NewLine}{ex.Message}",
                "TaskDraw",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
            _app.ExitApp();
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
                case "show-drawer":
                    _app.EnterDrawer();
                    break;
                case "refresh-reminders":
                    _app.RefreshReminderTasks();
                    break;
                case "quit":
                    _app.ExitApp();
                    break;
            }
        }
        catch
        {
            // Ignore malformed messages from the page.
        }
    }

    public void PlayReminderChime()
    {
        try
        {
            _web.CoreWebView2?.ExecuteScriptAsync(
                "window.taskdrawReminderChime && window.taskdrawReminderChime()");
        }
        catch
        {
            // The main window may be shutting down.
        }
    }

    public void RefreshFromReminder()
    {
        try
        {
            _web.CoreWebView2?.ExecuteScriptAsync(
                "window.taskdrawRefresh && window.taskdrawRefresh()");
        }
        catch
        {
            // The main window may be shutting down.
        }
    }

    public void ShowMain()
    {
        if (!Visible)
        {
            Show();
        }
        if (WindowState == FormWindowState.Minimized)
        {
            WindowState = FormWindowState.Normal;
        }
        Activate();
        BringToFront();
        _web.Focus();
    }

    public void CloseForExit()
    {
        _forceClose = true;
        Close();
    }

    protected override void OnFormClosing(FormClosingEventArgs e)
    {
        if (!_forceClose && !_app.IsExiting && e.CloseReason == CloseReason.UserClosing)
        {
            e.Cancel = true;
            _app.EnterDrawer();
            return;
        }
        base.OnFormClosing(e);
    }

    protected override void WndProc(ref Message m)
    {
        if (m.Msg == NativeMethods.WM_SHOW_MAIN)
        {
            _app.ShowMain();
            return;
        }
        base.WndProc(ref m);
    }
}
