namespace TaskDraw;

internal static class Program
{
    [STAThread]
    private static void Main()
    {
        using var mutex = new Mutex(true, @"Local\TaskDraw.Desktop.SingleInstance", out var createdNew);
        if (!createdNew)
        {
            if (!NativeMethods.NotifyExistingInstance())
            {
                MessageBox.Show(
                    "TaskDraw 已经在运行。",
                    "TaskDraw",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
            return;
        }

        Application.SetHighDpiMode(HighDpiMode.PerMonitorV2);
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        try
        {
            using var host = new AppHost();
            host.Run();
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                ex.Message,
                "TaskDraw 无法启动",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
    }
}
