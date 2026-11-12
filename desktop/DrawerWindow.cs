using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Text.Json;

namespace TaskDraw;

internal sealed class DrawerWindow : Form
{
    private const int PanelWidth = 372;
    private const int MaxPanelHeight = 676;
    private const int ScreenMargin = 18;
    private const int CollapsedWidth = 40;
    private const int CollapsedHeight = 200;

    private readonly AppHost _app;
    private readonly CoreWebView2Environment _environment;
    private readonly string _baseUrl;
    private readonly WebView2 _web;
    private readonly System.Windows.Forms.Timer _animation;
    private int _animationFrom;
    private int _animationTarget;
    private long _animationStart;
    private int _animationDuration;
    private bool _hideAfterAnimation;
    private bool _hiding;
    private bool _collapsed;
    private bool _forceClose;
    private bool _webReady;
    private bool _initializing;

    public DrawerWindow(AppHost app, CoreWebView2Environment environment, string baseUrl)
    {
        _app = app;
        _environment = environment;
        _baseUrl = baseUrl;

        Text = "TaskDraw 挂起列表";
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        StartPosition = FormStartPosition.Manual;
        TopMost = true;
        BackColor = ColorTranslator.FromHtml("#E0D6C6");
        Padding = new Padding(1);
        Width = PanelWidth;
        Height = MaxPanelHeight;

        _web = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = ColorTranslator.FromHtml("#FFFDF9"),
        };
        Controls.Add(_web);

        _animation = new System.Windows.Forms.Timer { Interval = 15 };
        _animation.Tick += OnAnimationTick;

        Load += (_, _) => ApplyRoundedRegion();
    }

    protected override CreateParams CreateParams
    {
        get
        {
            var parameters = base.CreateParams;
            parameters.ClassStyle |= 0x00020000; // CS_DROPSHADOW
            parameters.ExStyle |= 0x00000080; // WS_EX_TOOLWINDOW
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
        const int radius = 16;
        var diameter = radius * 2;
        using var path = new GraphicsPath();

        if (_collapsed)
        {
            path.AddArc(0, 0, diameter, diameter, 180, 90);
            path.AddLine(radius, 0, Width - 1, 0);
            path.AddLine(Width - 1, 0, Width - 1, Height - 1);
            path.AddLine(Width - 1, Height - 1, radius, Height - 1);
            path.AddArc(0, Height - diameter - 1, diameter, diameter, 90, 90);
            path.AddLine(0, Height - radius, 0, radius);
            path.CloseFigure();
        }
        else
        {
            path.AddArc(0, 0, diameter, diameter, 180, 90);
            path.AddArc(Width - diameter - 1, 0, diameter, diameter, 270, 90);
            path.AddArc(Width - diameter - 1, Height - diameter - 1, diameter, diameter, 0, 90);
            path.AddArc(0, Height - diameter - 1, diameter, diameter, 90, 90);
            path.CloseFigure();
        }

        var previous = Region;
        Region = new Region(path);
        previous?.Dispose();
    }

    public void ShowDrawer()
    {
        if (_forceClose)
        {
            return;
        }

        if (Visible)
        {
            if (_collapsed)
            {
                ExpandDrawer();
                return;
            }
            if (!_hiding)
            {
                TopMost = true;
                Activate();
                BringToFront();
                RefreshDrawer();
                return;
            }
        }

        var screen = _app.CurrentScreen.WorkingArea;
        _collapsed = false;
        Width = PanelWidth;
        Height = Math.Min(MaxPanelHeight, Math.Max(520, screen.Height - 56));
        var targetX = screen.Right - Width - ScreenMargin;
        var targetY = screen.Top + (screen.Height - Height) / 2;

        if (!Visible)
        {
            StopAnimation();
            Bounds = new Rectangle(screen.Right, targetY, Width, Height);
            Show();
            TopMost = true;
            Activate();
            _hiding = false;
            AnimateTo(targetX, hideAfter: false, duration: 190);
            _ = EnsureWebAsync();
        }
        else
        {
            StopAnimation();
            _hiding = false;
            ApplyRoundedRegion();
            AnimateTo(targetX, hideAfter: false, duration: 140);
            TopMost = true;
            Activate();
        }
        SyncCollapsedState();
        RefreshDrawer();
    }

    public void CollapseDrawer()
    {
        if (!Visible || _collapsed)
        {
            return;
        }

        _collapsed = true;
        StopAnimation();
        _hiding = false;
        SyncCollapsedState();

        var screen = Screen.FromControl(this).WorkingArea;
        var centeredTop = Top + (Height - CollapsedHeight) / 2;
        var top = Math.Clamp(
            centeredTop,
            screen.Top + 8,
            Math.Max(screen.Top + 8, screen.Bottom - CollapsedHeight - 8));
        Bounds = new Rectangle(Left, top, CollapsedWidth, CollapsedHeight);
        ApplyRoundedRegion();
        TopMost = true;
        Activate();
        AnimateTo(screen.Right - CollapsedWidth, hideAfter: false, duration: 170);
    }

    public void ExpandDrawer()
    {
        if (!Visible || !_collapsed)
        {
            return;
        }

        _collapsed = false;
        StopAnimation();
        _hiding = false;

        var screen = Screen.FromControl(this).WorkingArea;
        Height = Math.Min(MaxPanelHeight, Math.Max(520, screen.Height - 56));
        var targetX = screen.Right - PanelWidth - ScreenMargin;
        var targetY = screen.Top + (screen.Height - Height) / 2;

        Bounds = new Rectangle(Left, targetY, PanelWidth, Height);
        ApplyRoundedRegion();
        TopMost = true;
        Activate();
        BringToFront();
        SyncCollapsedState();
        AnimateTo(targetX, hideAfter: false, duration: 170);
        RefreshDrawer();
    }

    private void SyncCollapsedState()
    {
        if (!_webReady || _web.CoreWebView2 == null)
        {
            return;
        }
        try
        {
            var value = _collapsed ? "true" : "false";
            _web.CoreWebView2.ExecuteScriptAsync(
                $"window.taskdrawSetCollapsed && window.taskdrawSetCollapsed({value})");
        }
        catch
        {
            // The drawer may be closing.
        }
    }

    public void HideDrawer(bool immediate = false)
    {
        if (!Visible)
        {
            return;
        }

        if (immediate)
        {
            StopAnimation();
            _hiding = false;
            Hide();
            TopMost = false;
            return;
        }

        if (_hiding)
        {
            return;
        }

        _hiding = true;
        var screen = Screen.FromControl(this).WorkingArea;
        AnimateTo(screen.Right + 8, hideAfter: true, duration: 150);
    }

    public void CloseForExit()
    {
        _forceClose = true;
        StopAnimation();
        Close();
    }

    private void AnimateTo(int targetX, bool hideAfter, int duration)
    {
        StopAnimation();
        _animationFrom = Left;
        _animationTarget = targetX;
        _hideAfterAnimation = hideAfter;
        _animationStart = Environment.TickCount64;
        _animationDuration = Math.Max(1, duration);
        _animation.Start();
    }

    private void StopAnimation()
    {
        _animation.Stop();
    }

    private void OnAnimationTick(object? sender, EventArgs e)
    {
        var elapsed = Environment.TickCount64 - _animationStart;
        var progress = Math.Clamp(elapsed / (double)_animationDuration, 0, 1);
        var eased = 1 - Math.Pow(1 - progress, 3);
        Left = (int)Math.Round(_animationFrom + (_animationTarget - _animationFrom) * eased);

        if (progress < 1)
        {
            return;
        }

        StopAnimation();
        if (_hideAfterAnimation)
        {
            Hide();
            TopMost = false;
            _hiding = false;
        }
        else
        {
            _hiding = false;
        }
    }

    private async Task EnsureWebAsync()
    {
        if (_webReady || _initializing)
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
            _web.CoreWebView2.NavigationCompleted += (_, _) =>
            {
                SyncCollapsedState();
                RefreshDrawer();
            };
            _web.Source = new Uri($"{_baseUrl}/drawer");
            _webReady = true;
        }
        catch (Exception ex)
        {
            if (!_forceClose)
            {
                Hide();
                TopMost = false;
                MessageBox.Show(
                    $"无法加载挂起列表。{Environment.NewLine}{Environment.NewLine}{ex.Message}",
                    "TaskDraw",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
                _app.ShowMain();
            }
        }
        finally
        {
            _initializing = false;
        }
    }

    private void RefreshDrawer()
    {
        if (!_webReady || _web.CoreWebView2 == null)
        {
            return;
        }
        try
        {
            _web.CoreWebView2.ExecuteScriptAsync("window.taskdrawRefresh && window.taskdrawRefresh()");
        }
        catch
        {
            // The drawer may be closing.
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
                case "open-main":
                    _app.ShowMain();
                    break;
                case "collapse-drawer":
                    CollapseDrawer();
                    break;
                case "expand-drawer":
                    ExpandDrawer();
                    break;
                case "drag":
                    NativeMethods.BeginWindowDrag(Handle);
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

    protected override void OnFormClosing(FormClosingEventArgs e)
    {
        if (!_forceClose)
        {
            e.Cancel = true;
            _app.ExitApp();
            return;
        }
        base.OnFormClosing(e);
    }
}
