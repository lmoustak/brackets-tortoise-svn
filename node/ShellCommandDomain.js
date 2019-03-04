/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, node: true */
/*global */

(function () {
    "use strict";
    
    var childProcess = require("child_process");
        
    /**
     * @private
     * Handler function for the tortoiseSVN.runTortoiseProcCmd command.
     */
    function runShellCmd(command) {
        childProcess.exec(command);
    }
    
    /**
     * Initializes the test domain with several test commands.
     * @param {DomainManager} domainManager The DomainManager for the server
     */
    function init(domainManager) {
        if (!domainManager.hasDomain("shellCommand")) {
            domainManager.registerDomain("shellCommand", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "shellCommand",                     // domain name
            "runShellCmd",                      // command name
            runShellCmd,                        // command handler function
            false,                              // this command is synchronous in Node
            "Executes a shell command",   // description
            [                                   // parameters
                {
                    name: "command",
                    type: "string",
                    description: "The command to be run in the shell"
                }
            ]
        );
    }
    
    exports.init = init;
    
}());
