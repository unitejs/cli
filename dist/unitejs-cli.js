"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main entry point.
 */
const unitejs_core_1 = require("unitejs-core/dist/unitejs-core");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
const commandLineParser_1 = require("./commandLineParser");
const display_1 = require("./display");
const logger_1 = require("./logger");
class CLI {
    run(process) {
        let logger;
        let ret;
        try {
            const commandLineParser = new commandLineParser_1.CommandLineParser();
            commandLineParser.parse(process.argv);
            logger = new logger_1.Logger(commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL), commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE), CLI.DEFAULT_LOG);
            logger.info("Session Started");
            const display = new display_1.Display(process, commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.NO_COLOR));
            ret = this.handleCommand(logger, display, commandLineParser);
            logger.info("Session Ended", { returnCode: ret });
        }
        catch (err) {
            ret = 1;
            // tslint:disable-next-line:no-console
            console.log("An unhandled error occurred: ", err);
            if (logger !== undefined) {
                logger.error("Unhandled Exception", { exception: err });
                logger.info("Session Ended", { returnCode: ret });
            }
        }
        return ret;
    }
    handleCommand(logger, display, commandLineParser) {
        this.displayBanner(logger, display, commandLineParser.getCommand() !== commandLineCommandConstants_1.CommandLineCommandConstants.VERSION);
        const command = commandLineParser.getCommand();
        const args = commandLineParser.getArguments([commandLineArgConstants_1.CommandLineArgConstants.NO_COLOR,
            commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE,
            commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL]);
        logger.info("Command Line", { command, args });
        switch (command) {
            case commandLineCommandConstants_1.CommandLineCommandConstants.VERSION: {
                /* Nothing else to display */
                break;
            }
            case commandLineCommandConstants_1.CommandLineCommandConstants.HELP: {
                this.displayHelp(display);
                break;
            }
            case commandLineCommandConstants_1.CommandLineCommandConstants.INIT: {
                const engine = new unitejs_core_1.Engine(logger, display);
                engine.init(args);
                break;
            }
            default: {
                if (command === undefined) {
                    display.error("Error: No command specified");
                }
                else {
                    display.error("Error: Unknown command");
                }
                display.info("Command line format: <command> [--arg1] [--arg2] ... [--argn]");
                break;
            }
        }
        return 0;
    }
    displayBanner(logger, display, includeTitle) {
        const packageJson = require("../package.json");
        if (includeTitle) {
            display.banner(CLI.APP_NAME + " CLI");
        }
        display.banner(packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version");
        logger.info(CLI.APP_NAME, { version: packageJson.version });
        if (includeTitle) {
            display.banner("");
        }
    }
    displayHelp(display) {
        display.info("This is the help");
        return 0;
    }
}
CLI.APP_NAME = "UniteJS";
CLI.DEFAULT_LOG = "unite.log";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXRlanMtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxpRUFBb0Y7QUFDcEYsdUVBQW9FO0FBQ3BFLCtFQUE0RTtBQUM1RSwyREFBd0Q7QUFDeEQsdUNBQW9DO0FBQ3BDLHFDQUFrQztBQUVsQztJQUlXLEdBQUcsQ0FBQyxPQUF1QjtRQUM5QixJQUFJLE1BQTJCLENBQUM7UUFDaEMsSUFBSSxHQUFXLENBQUM7UUFFaEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDbEQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsaURBQXVCLENBQUMsU0FBUyxDQUFDLEVBQ3RFLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGlEQUF1QixDQUFDLFFBQVEsQ0FBQyxFQUNyRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRS9CLE1BQU0sT0FBTyxHQUFhLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlEQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFaEgsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBRTdELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1Isc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztnQkFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQWUsRUFBRSxPQUFpQixFQUFFLGlCQUFvQztRQUMxRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxFQUFFLEtBQUsseURBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUcsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0MsTUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsaURBQXVCLENBQUMsUUFBUTtZQUNoQyxpREFBdUIsQ0FBQyxRQUFRO1lBQ2hDLGlEQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFakYsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUvQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyx5REFBMkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdkMsNkJBQTZCO2dCQUM3QixLQUFLLENBQUM7WUFDVixDQUFDO1lBRUQsS0FBSyx5REFBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztZQUVELEtBQUsseURBQTJCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFZLElBQUkscUJBQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQztZQUNWLENBQUM7WUFFRCxTQUFTLENBQUM7Z0JBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQzVDLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO2dCQUM5RSxLQUFLLENBQUM7WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQWUsRUFBRSxPQUFpQixFQUFFLFlBQXFCO1FBQzNFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztRQUNwRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFFLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXLENBQUMsT0FBaUI7UUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDOztBQTNGYyxZQUFRLEdBQVcsU0FBUyxDQUFDO0FBQzdCLGVBQVcsR0FBVyxXQUFXLENBQUM7QUFGckQsa0JBNkZDIiwiZmlsZSI6InVuaXRlanMtY2xpLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYyJ9
