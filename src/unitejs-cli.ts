/**
 * Main entry point.
 */
import { Engine, IDisplay, IEngine, ILogger } from "unitejs-core/dist/unitejs-core";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";
import { CommandLineParser } from "./commandLineParser";
import { Display } from "./display";
import { FileSystem } from "./fileSystem";
import { Logger } from "./logger";
import { NpmPackageManager } from "./packageManagers/npmPackageManager";
import { YarnPackageManager } from "./packageManagers/yarnPackageManager";

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
                logger.exception("Unhandled Exception", err);
                logger.info("Session Ended",  { returnCode: ret });
            }
        }

        return ret;
    }

    private createEngine(logger: ILogger, display: IDisplay, commandLineParser: CommandLineParser, packageManager: string | null | undefined): IEngine | undefined {
        if (packageManager === null || packageManager === undefined || packageManager.length === 0) {
            packageManager = "npm";
        }

        if (packageManager! !== "npm" && packageManager! !== "yarn") {
            display.error("packageManager: Must be npm or yarn");
            return undefined;
        } else {
            const fileSystem = new FileSystem();
            const scriptLocation = fileSystem.pathCombine(__dirname, "../");
            const pm = packageManager === "npm" ? new NpmPackageManager(logger, display, fileSystem) : new YarnPackageManager(logger, display, fileSystem);
            return new Engine(logger, display, fileSystem, pm, scriptLocation);
        }
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
                const sourceLanguage = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_LANGUAGE);
                const moduleLoader = commandLineParser.getStringArgument(CommandLineArgConstants.MODULE_LOADER);
                const unitTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_RUNNER);
                const unitTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser, "");
                if (engine) {
                    ret = await engine.init(packageName, title, sourceLanguage, moduleLoader, unitTestRunner, unitTestFramework, outputDirectory);
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
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser, packageManager);
                if (engine) {
                    ret = await engine.clientPackage(operation, packageName, version, preload, includeMode, outputDirectory);
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