# Brackets TortoiseSVN
(WINDOWS ONLY) A TortoiseSVN menu extension for Brackets.

## Features
Adds TortoiseSVN commands like commit, switch, update, revert, log, diff, blame in File menu, directory tree and working set context menus.

## Prerequisites
TortoiseSVN must be installed. Supports Windows only.

## Using the extension
Upon installing this extension, make sure the path to TortoiseProc.exe is **C:\Program Files\TortoiseSVN\bin\TortoiseProc.exe**.
If not, you'll have to set the path in `brackets-tortoise-svn.tortoiseProcPath`'s value in brackets.json, like so:
```
"brackets-tortoise-svn.tortoiseProcPath": "C:/path/to/TortoiseProc.exe"
```
You can also modify whether TortoiseSVN will close after execution for every command by changing the `brackets-tortoise-svn.closeOnEnd` values.
```
// Defines when should the dialog box automatically close after the command executes: 0 - never; 1 - close if no errors; 2 - close if no errors and conflicts; 3 - close if no errors, conflicts and merges
"brackets-tortoise-svn.closeOnEnd": {
    // Default: 3
    "commit": 3,

    // Default: 0
    "log": 0,

    // Default: 0
    "revert": 0,

    // Default: 0
    "switch": 0,

    // Default: 0
    "update": 0
}
```

### File menu
The File menu contains the commit, switch, update, revert, and log commands for the current project.

![File menu](/images/fileMenu.png)

### Project context menu
The Project context menu (which appears after right-clicking on a file or folder in the project file tree), contains the aforementioned commands for the specific folder or file.

![Project context menu](/images/projectContextMenu.png)

### Working Files context menu
The Working Files context menu (appearing when an open file is right-clicked), contains the diff and blame commands for that specific file.

![Working Files context menu](/images/workingFilesContextMenu.png)

## License
Published under the MIT license. See [LICENSE.md](LICENSE.md) for more details.
