using Microsoft.Web.WebView2.Core;
using System.Drawing;

namespace TaskDraw;

internal sealed class AppHost : IDisposable
{
    private readonly ServerProcess _server = new();
    private CoreWebView2Environment? _environment;
    private MainWindow? _main;
    private DrawerWindow? _drawer;
    private ReminderScheduler? _reminders;
    private NotifyIcon? _tray;
    private Icon? _trayIcon;
    private bool _cleaned;

    public bool IsExiting { get; private set; }

    public void Run()
    {
        try
        {
            _server.Start();
            Directory.CreateDirectory(AppPaths.WebViewData);

            _environment = CoreWebView2Environment
                .CreateAsync(null, AppPaths.WebViewData)
                .GetAwaiter()
                .GetResult();

            _main = new MainWindow(this, _environment, _server.BaseUrl);
            _drawer = new DrawerWindow(this, _environment, _server.BaseUrl);
            _reminders = new ReminderScheduler(this, _main, _environment, _server.BaseUrl);
            SetupTray();

            Application.ApplicationExit += (_, _) => Cleanup();
            _main.Show();
            _reminders.Start();
            Application.Run(_main);
        }
        finally
        {
            Cleanup();
        }
    }

    public Screen CurrentScreen =>
        _main != null ? Screen.FromControl(_main) : Screen.PrimaryScreen ?? Screen.AllScreens[0];

    public void EnterDrawer()
    {
        if (IsExiting)
        {
            return;
        }
        _main?.Hide();
        ShowDrawer();
    }

    public void ShowDrawer()
    {
        if (IsExiting)
        {
            return;
        }
        _drawer?.ShowDrawer();
    }

    public void HideDrawer(bool immediate = false)
    {
        _drawer?.HideDrawer(immediate);
    }

    public void ShowMain()
    {
        if (IsExiting)
        {
            return;
        }
        _drawer?.HideDrawer(immediate: true);
        _main?.ShowMain();
    }

    public void RefreshReminderTasks()
    {
        _reminders?.RefreshNow();
    }

    public void PlayReminderChime()
    {
        _main?.PlayReminderChime();
    }

    public void RefreshMainFromReminder()
    {
        _main?.RefreshFromReminder();
        RefreshReminderTasks();
    }

    public void ExitApp()
    {
        if (IsExiting)
        {
            return;
        }
        IsExiting = true;
        if (_tray != null)
        {
            _tray.Visible = false;
        }
        _reminders?.Dispose();
        _drawer?.CloseForExit();
        _main?.CloseForExit();
        Application.Exit();
    }

    private void SetupTray()
    {
        Icon icon;
        try
        {
            icon = new Icon(AppPaths.IconPath, 32, 32);
        }
        catch
        {
            icon = (Icon)SystemIcons.Application.Clone();
        }
        _trayIcon = icon;

        var menu = new ContextMenuStrip();
        var openItem = new ToolStripMenuItem("打开主窗口");
        openItem.Click += (_, _) => ShowMain();
        var drawerItem = new ToolStripMenuItem("挂起列表");
        drawerItem.Click += (_, _) => EnterDrawer();
        var exitItem = new ToolStripMenuItem("退出 TaskDraw");
        exitItem.Click += (_, _) => ExitApp();
        menu.Items.Add(openItem);
        menu.Items.Add(drawerItem);
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add(exitItem);

        _tray = new NotifyIcon
        {
            Icon = icon,
            Text = "TaskDraw",
            Visible = true,
            ContextMenuStrip = menu,
        };
        _tray.MouseClick += (_, e) =>
        {
            if (e.Button == MouseButtons.Left)
            {
                ShowMain();
            }
        };
    }

    private void Cleanup()
    {
        if (_cleaned)
        {
            return;
        }
        _cleaned = true;

        try
        {
            if (_tray != null)
            {
                _tray.Visible = false;
                _tray.Dispose();
                _tray = null;
            }
        }
        catch
        {
            // Shutdown is best-effort.
        }

        _trayIcon?.Dispose();
        _trayIcon = null;
        _reminders?.Dispose();
        _server.Dispose();
    }

    public void Dispose()
    {
        Cleanup();
    }
}
