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
            logger = new logger_1.Logger(commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL), commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE), "unite.log");
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
            display.banner("UniteJS CLI");
        }
        display.banner(packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version");
        logger.info("UniteJS Version", { version: packageJson.version });
        if (includeTitle) {
            display.banner("");
        }
    }
    displayHelp(display) {
        display.info("This is the help");
        return 0;
    }
}
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXRlanMtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxpRUFBb0Y7QUFDcEYsdUVBQW9FO0FBQ3BFLCtFQUE0RTtBQUM1RSwyREFBd0Q7QUFDeEQsdUNBQW9DO0FBQ3BDLHFDQUFrQztBQUVsQztJQUNXLEdBQUcsQ0FBQyxPQUF1QjtRQUM5QixJQUFJLE1BQTJCLENBQUM7UUFDaEMsSUFBSSxHQUFXLENBQUM7UUFFaEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7WUFDbEQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsaURBQXVCLENBQUMsU0FBUyxDQUFDLEVBQ3RFLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGlEQUF1QixDQUFDLFFBQVEsQ0FBQyxFQUNyRSxXQUFXLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFL0IsTUFBTSxPQUFPLEdBQWEsSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUVoSCxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDUixzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO2dCQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTyxhQUFhLENBQUMsTUFBZSxFQUFFLE9BQWlCLEVBQUUsaUJBQW9DO1FBQzFGLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsS0FBSyx5REFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1RyxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQyxNQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxpREFBdUIsQ0FBQyxRQUFRO1lBQ2hDLGlEQUF1QixDQUFDLFFBQVE7WUFDaEMsaURBQXVCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVqRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLHlEQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2Qyw2QkFBNkI7Z0JBQzdCLEtBQUssQ0FBQztZQUNWLENBQUM7WUFFRCxLQUFLLHlEQUEyQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUM7WUFDVixDQUFDO1lBRUQsS0FBSyx5REFBMkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxNQUFNLEdBQVksSUFBSSxxQkFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztZQUVELFNBQVMsQ0FBQztnQkFDTixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLCtEQUErRCxDQUFDLENBQUM7Z0JBQzlFLEtBQUssQ0FBQztZQUNWLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFTyxhQUFhLENBQUMsTUFBZSxFQUFFLE9BQWlCLEVBQUUsWUFBcUI7UUFDM0UsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztRQUNwRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLE9BQWlCO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKO0FBMUZELGtCQTBGQyIsImZpbGUiOiJ1bml0ZWpzLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
