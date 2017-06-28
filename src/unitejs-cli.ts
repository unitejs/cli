/**
 * Main entry point.
 */
import { Engine } from "unitejs-core/dist/engine/engine";
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";
import { IEngine } from "unitejs-core/dist/interfaces/IEngine";
import { ILogger } from "unitejs-core/dist/interfaces/ILogger";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";
import { CommandLineParser } from "./commandLineParser";
import { Display } from "./display";
import { FileSystem } from "./fileSystem";
import { Logger } from "./logger";

export class CLI {
    private static APP_NAME: string = "UniteJS";
    private static DEFAULT_LOG: string = "unite.log";

    public async run(process: NodeJS.Process): Promise<number> {
        let logger: ILogger | undefined;
        let ret: number;

        try {
            const commandLineParser = new CommandLineParser();
            commandLineParser.parse(process.argv);

            logger = new Logger(commandLineParser.getNumberArgument(CommandLineArgConstants.LOG_LEVEL),
                                commandLineParser.getStringArgument(CommandLineArgConstants.LOG_FILE),
                                CLI.DEFAULT_LOG);
            logger.info("Session Started");

            const display: IDisplay = new Display(process, commandLineParser.hasArgument(CommandLineArgConstants.NO_COLOR));

            ret = await this.handleCommand(logger, display, commandLineParser);

            logger.info("Session Ended", { returnCode: ret });
        } catch (err) {
            ret = 1;
            // tslint:disable-next-line:no-console
            console.log("An unhandled error occurred: ", err);
            if (logger !== undefined) {
                logger.error("Unhandled Exception", err);
                logger.info("Session Ended",  { returnCode: ret });
            }
        }

        return ret;
    }

    private createEngine(logger: ILogger, display: IDisplay, commandLineParser: CommandLineParser): IEngine | undefined {
        const fileSystem = new FileSystem();
        return new Engine(logger, display, fileSystem);
    }

    private async handleCommand(logger: ILogger, display: IDisplay, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = 0;

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
                display.info("command: " + command);

                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const title = commandLineParser.getStringArgument(CommandLineArgConstants.TITLE);
                const license = commandLineParser.getStringArgument(CommandLineArgConstants.LICENSE);
                const sourceLanguage = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_LANGUAGE);
                const moduleLoader = commandLineParser.getStringArgument(CommandLineArgConstants.MODULE_LOADER);
                const unitTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_RUNNER);
                const unitTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                const e2eTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_RUNNER);
                const e2eTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_FRAMEWORK);
                const linter = commandLineParser.getStringArgument(CommandLineArgConstants.LINTER);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const cssPreProcessor = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_PRE_PROCESSOR);
                const cssPostProcessor = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_POST_PROCESSOR);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser);
                if (engine) {
                    ret = await engine.init(packageName,
                                            title,
                                            license,
                                            sourceLanguage,
                                            moduleLoader,
                                            unitTestRunner,
                                            unitTestFramework,
                                            e2eTestRunner,
                                            e2eTestFramework,
                                            linter,
                                            cssPreProcessor,
                                            cssPostProcessor,
                                            packageManager,
                                            outputDirectory);
                } else {
                    ret = 1;
                }
                break;
            }

            case CommandLineCommandConstants.CLIENT_PACKAGE: {
                display.info("command: " + command);

                const operation = commandLineParser.getStringArgument(CommandLineArgConstants.OPERATION);
                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const version = commandLineParser.getStringArgument(CommandLineArgConstants.VERSION);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const preload = commandLineParser.hasArgument(CommandLineArgConstants.PRELOAD);
                const includeMode = commandLineParser.getStringArgument(CommandLineArgConstants.INCLUDE_MODE);
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser);
                if (engine) {
                    ret = await engine.clientPackage(operation, packageName, version, preload, includeMode, packageManager, outputDirectory);
                } else {
                    ret = 1;
                }
                break;
            }

            default: {
                if (command === undefined) {
                    display.error("Error: No command specified");
                } else {
                    display.error("Error: Unknown command - " + command);
                }
                display.info("Command line format: <command> [--arg1] [--arg2] ... [--argn]");
                break;
            }
        }

        return ret;
    }

    private displayBanner(logger: ILogger, display: IDisplay, includeTitle: boolean): void {
        const packageJson = require("../package.json");
        if (includeTitle) {
            display.banner(CLI.APP_NAME + " CLI");
        }
        display.banner(packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version");
        logger.info(CLI.APP_NAME, { version: packageJson.version } );
        if (includeTitle) {
            display.banner("");
        }
    }

    private displayHelp(display: IDisplay): number {
        display.info("This is the help");

        return 0;
    }
}