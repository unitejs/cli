/**
 * Main entry point.
 */
import { Engine, IDisplay, IEngine, ILogger } from "unitejs-core/dist/unitejs-core";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";
import { CommandLineParser } from "./commandLineParser";
import { Display } from "./display";
import { Logger } from "./logger";

export class CLI {
    public run(process: NodeJS.Process): number {
        let logger: ILogger | undefined;
        let ret: number;

        try {
            const commandLineParser = new CommandLineParser();
            commandLineParser.parse(process.argv);

            logger = new Logger(commandLineParser.getNumberArgument(CommandLineArgConstants.LOG_LEVEL),
                                commandLineParser.getStringArgument(CommandLineArgConstants.LOG_FILE),
                                "unite.log");
            logger.info("Session Started");

            const display: IDisplay = new Display(process, commandLineParser.hasArgument(CommandLineArgConstants.NO_COLOR));

            ret = this.handleCommand(logger, display, commandLineParser);

            logger.info("Session Ended", { returnCode: ret });
        } catch (err) {
            ret = 1;
            // tslint:disable-next-line:no-console
            console.log("An unhandled error occurred: ", err);
            if (logger !== undefined) {
                logger.error("Unhandled Exception", { exception: err } );
                logger.info("Session Ended",  { returnCode: ret });
            }
        }

        return ret;
    }

    private handleCommand(logger: ILogger, display: IDisplay, commandLineParser: CommandLineParser): number {
        this.displayBanner(logger, display, commandLineParser.getCommand() !== CommandLineCommandConstants.VERSION);

        const command = commandLineParser.getCommand();
        const args = commandLineParser.getArguments([CommandLineArgConstants.NO_COLOR,
                                                     CommandLineArgConstants.LOG_FILE,
                                                     CommandLineArgConstants.LOG_LEVEL]);

        logger.info("Command Line", { command, args });

        switch (command) {
            case CommandLineCommandConstants.VERSION: {
                /* Nothing else to display */
                break;
            }

            case CommandLineCommandConstants.HELP: {
                this.displayHelp(display);
                break;
            }

            case CommandLineCommandConstants.INIT: {
                const engine: IEngine = new Engine(logger, display);
                engine.init(args);
                break;
            }

            default: {
                if (command === undefined) {
                    display.error("Error: No command specified");
                } else {
                    display.error("Error: Unknown command");
                }
                display.info("Command line format: <command> [--arg1] [--arg2] ... [--argn]");
                break;
            }
        }

        return 0;
    }

    private displayBanner(logger: ILogger, display: IDisplay, includeTitle: boolean): void {
        const packageJson = require("../package.json");
        if (includeTitle) {
            display.banner("UniteJS CLI");
        }
        display.banner(packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version");
        logger.info("UniteJS Version", { version: packageJson.version } );
        if (includeTitle) {
            display.banner("");
        }
    }

    private displayHelp(display: IDisplay): number {
        display.info("This is the help");

        return 0;
    }
}