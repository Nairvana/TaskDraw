namespace TaskDraw;

internal static class AppPaths
{
    public static string Root { get; } = FindRoot();
    public static string ServerScript => Path.Combine(Root, "server.py");
    public static string IconPath => Path.Combine(Root, "assets", "taskdraw.ico");
    public static string DataDirectory => Path.Combine(Root, "data");
    public static string ServerLog => Path.Combine(DataDirectory, "desktop.log");
    public static string WebViewData => Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
        "TaskDraw",
        "WebView2");

    private static string FindRoot()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        for (var depth = 0; depth < 8 && directory != null; depth++)
        {
            if (File.Exists(Path.Combine(directory.FullName, "server.py")))
            {
                return directory.FullName;
            }
            directory = directory.Parent;
        }
        return AppContext.BaseDirectory;
    }
}
