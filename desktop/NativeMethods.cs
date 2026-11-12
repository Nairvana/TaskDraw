using System.Runtime.InteropServices;

namespace TaskDraw;

internal static class NativeMethods
{
    public const uint WM_SHOW_MAIN = 0x8001;
    private const int WM_NCLBUTTONDOWN = 0xA1;
    private const int HTCAPTION = 2;

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    private static extern IntPtr FindWindow(string? className, string windowName);

    [DllImport("user32.dll")]
    private static extern bool PostMessage(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll")]
    private static extern bool ReleaseCapture();

    [DllImport("user32.dll")]
    private static extern IntPtr SendMessage(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

    public static bool NotifyExistingInstance()
    {
        for (var attempt = 0; attempt < 15; attempt++)
        {
            var handle = FindWindow(null, "TaskDraw");
            if (handle != IntPtr.Zero)
            {
                PostMessage(handle, WM_SHOW_MAIN, IntPtr.Zero, IntPtr.Zero);
                return true;
            }
            Thread.Sleep(200);
        }
        return false;
    }

    public static void BeginWindowDrag(IntPtr handle)
    {
        ReleaseCapture();
        SendMessage(handle, WM_NCLBUTTONDOWN, HTCAPTION, IntPtr.Zero);
    }
}
