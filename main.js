/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Extension that adds TortoiseSVN menu items in "File" menu
    and file tree context menus */
define(function (require, exports, module) {
    "use strict";

    var CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain          = brackets.getModule("utils/NodeDomain"),
        ProjectManager      = brackets.getModule("project/ProjectManager"),
        PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        prefs               = PreferencesManager.getExtensionPrefs("brackets-tortoise-svn");
    
    prefs.definePreference("tortoiseProcPath", "string", "C:/Program Files/TortoiseSVN/bin/TortoiseProc.exe", {
        description: "Contains the path to TortoiseProc.exe, necessary to run Tortoise SVN",
        values: ["C:/Program Files/TortoiseSVN/bin/TortoiseProc.exe", "C:/Program Files (x86)/TortoiseSVN/bin/TortoiseProc.exe"]
    });
    
    prefs.definePreference("closeOnEnd", "object", {commit: 0, checkout: 0, update: 2, revert: 0, log: 0}, {
        description: "Defines when should the dialog box automatically close after the command executes: 0 - never; 1 - close if no errors; 2 - close if no errors and conflicts; 3 - close if no errors, conflicts and merges",
        keys: {
            commit: {
                type: "number",
                values: [0, 1, 2, 3],
                initial: 0
            },
            checkout: {
                type: "number",
                values: [0, 1, 2, 3],
                initial: 0
            },
            update: {
                type: "number",
                values: [0, 1, 2, 3],
                initial: 2
            },
            revert: {
                type: "number",
                values: [0, 1, 2, 3],
                initial: 0
            },
            log: {
                type: "number",
                values: [0, 1, 2, 3],
                initial: 0
            }
        }
    });

    
    // Function to run when the menu item is clicked
    function runTortoiseSVNCommand(command) {
        if (command === undefined) {
            window.alert("TortoiseSVN command is undefined");
            return;
        } else if (command === null) {
            window.alert("TortoiseSVN command is null");
            return;
        }
        
        var path = ProjectManager.getFileTreeContext() || ProjectManager.getProjectRoot();
        var execCommand = '"' + prefs.get("tortoiseProcPath") + '" /command:' + command + ' /closeonend:' + prefs.get("closeOnEnd")[command] + ' /path:"' + path.fullPath + '"';
        
        var shellCommandDomain = new NodeDomain("shellCommand", ExtensionUtils.getModulePath(module, "node/ShellCommandDomain"));
        shellCommandDomain.exec("runShellCmd", execCommand);
    }
    
    function runTortoiseSVNCommit() {
        runTortoiseSVNCommand("commit");
    }
    function runTortoiseSVNCheckout() {
        runTortoiseSVNCommand("checkout");
    }
    function runTortoiseSVNUpdate() {
        runTortoiseSVNCommand("update");
    }
    function runTortoiseSVNRevert() {
        runTortoiseSVNCommand("revert");
    }
    function runTortoiseSVNLog() {
        runTortoiseSVNCommand("log");
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var SVN_PROJECT_COMMIT  = "brackets-tortoise-svn.project.commit",   // package-style naming to avoid collisions
        SVN_PROJECT_CHECKOUT= "brackets-tortoise-svn.project.checkout",
        SVN_PROJECT_UPDATE  = "brackets-tortoise-svn.project.update",
        SVN_PROJECT_REVERT  = "brackets-tortoise-svn.project.revert",
        SVN_PROJECT_LOG     = "brackets-tortoise-svn.project.log",
        
        SVN_CONTEXT_COMMIT  = "brackets-tortoise-svn.context.commit",
        SVN_CONTEXT_CHECKOUT= "brackets-tortoise-svn.context.checkout",
        SVN_CONTEXT_UPDATE  = "brackets-tortoise-svn.context.update",
        SVN_CONTEXT_REVERT  = "brackets-tortoise-svn.context.revert",
        SVN_CONTEXT_LOG     = "brackets-tortoise-svn.context.log";
    
    CommandManager.register("Tortoise SVN Commit Project", SVN_PROJECT_COMMIT, runTortoiseSVNCommit);
    CommandManager.register("Tortoise SVN Checkout Project", SVN_PROJECT_CHECKOUT, runTortoiseSVNCheckout);
    CommandManager.register("Tortoise SVN Update Project", SVN_PROJECT_UPDATE, runTortoiseSVNUpdate);
    CommandManager.register("Tortoise SVN Revert Project", SVN_PROJECT_REVERT, runTortoiseSVNRevert);
    CommandManager.register("Tortoise SVN Log Project", SVN_PROJECT_LOG, runTortoiseSVNLog);
    
    CommandManager.register("Tortoise SVN Commit", SVN_CONTEXT_COMMIT, runTortoiseSVNCommit);
    CommandManager.register("Tortoise SVN Checkout", SVN_CONTEXT_CHECKOUT, runTortoiseSVNCheckout);
    CommandManager.register("Tortoise SVN Update", SVN_CONTEXT_UPDATE, runTortoiseSVNUpdate);
    CommandManager.register("Tortoise SVN Revert", SVN_CONTEXT_REVERT, runTortoiseSVNRevert);
    CommandManager.register("Tortoise SVN Log", SVN_CONTEXT_LOG, runTortoiseSVNLog);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.PROJECT_MENU);
    contextMenu.addMenuItem(SVN_CONTEXT_COMMIT);
    contextMenu.addMenuItem(SVN_CONTEXT_CHECKOUT);
    contextMenu.addMenuItem(SVN_CONTEXT_UPDATE);
    contextMenu.addMenuItem(SVN_CONTEXT_REVERT);
    contextMenu.addMenuItem(SVN_CONTEXT_LOG);
    contextMenu.addMenuDivider(Menus.BEFORE, SVN_CONTEXT_COMMIT);
    
    var fileMenu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    fileMenu.addMenuItem(SVN_PROJECT_COMMIT, null, Menus.LAST_IN_SECTION, Menus.MenuSection.FILE_SAVE_COMMANDS);
    fileMenu.addMenuItem(SVN_PROJECT_CHECKOUT, null, Menus.LAST_IN_SECTION, Menus.MenuSection.FILE_SAVE_COMMANDS);
    fileMenu.addMenuItem(SVN_PROJECT_UPDATE, null, Menus.LAST_IN_SECTION, Menus.MenuSection.FILE_SAVE_COMMANDS);
    fileMenu.addMenuItem(SVN_PROJECT_REVERT, null, Menus.LAST_IN_SECTION, Menus.MenuSection.FILE_SAVE_COMMANDS);
    fileMenu.addMenuItem(SVN_PROJECT_LOG, null, Menus.LAST_IN_SECTION, Menus.MenuSection.FILE_SAVE_COMMANDS);
    fileMenu.addMenuDivider(Menus.BEFORE, SVN_PROJECT_COMMIT);
    
    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-W");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});