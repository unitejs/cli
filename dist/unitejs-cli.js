"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main entry point.
 */
const engine_1 = require("unitejs-core/dist/engine/engine");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
const commandLineParser_1 = require("./commandLineParser");
const display_1 = require("./display");
const fileSystem_1 = require("./fileSystem");
const logger_1 = require("./logger");
class CLI {
    run(process) {
        return __awaiter(this, void 0, void 0, function* () {
            let logger;
            let ret;
            try {
                const commandLineParser = new commandLineParser_1.CommandLineParser();
                commandLineParser.parse(process.argv);
                logger = new logger_1.Logger(commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_LEVEL), commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LOG_FILE), CLI.DEFAULT_LOG);
                logger.info("Session Started");
                const display = new display_1.Display(process, commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.NO_COLOR));
                ret = yield this.handleCommand(logger, display, commandLineParser);
                logger.info("Session Ended", { returnCode: ret });
            }
            catch (err) {
                ret = 1;
                // tslint:disable-next-line:no-console
                console.log("An unhandled error occurred: ", err);
                if (logger !== undefined) {
                    logger.error("Unhandled Exception", err);
                    logger.info("Session Ended", { returnCode: ret });
                }
            }
            return ret;
        });
    }
    createEngine(logger, display, commandLineParser) {
        const fileSystem = new fileSystem_1.FileSystem();
        return new engine_1.Engine(logger, display, fileSystem);
    }
    handleCommand(logger, display, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = 0;
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
                    display.info("command: " + command);
                    const packageName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_NAME);
                    const title = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.TITLE);
                    const license = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LICENSE);
                    const sourceLanguage = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_LANGUAGE);
                    const moduleType = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MODULE_TYPE);
                    const bundler = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLER);
                    const unitTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_RUNNER);
                    const unitTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                    const e2eTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.E2E_TEST_RUNNER);
                    const e2eTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.E2E_TEST_FRAMEWORK);
                    const linter = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LINTER);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const cssPreProcessor = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CSS_PRE_PROCESSOR);
                    const cssPostProcessor = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CSS_POST_PROCESSOR);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.init(packageName, title, license, sourceLanguage, moduleType, bundler, unitTestRunner, unitTestFramework, e2eTestRunner, e2eTestFramework, linter, cssPreProcessor, cssPostProcessor, packageManager, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.CLIENT_PACKAGE: {
                    display.info("command: " + command);
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const packageName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_NAME);
                    const version = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.VERSION);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const preload = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.PRELOAD);
                    const includeMode = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.INCLUDE_MODE);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.clientPackage(operation, packageName, version, preload, includeMode, packageManager, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.BUILD_CONFIGURATION: {
                    display.info("command: " + command);
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const configurationName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CONFIGURATION_NAME);
                    const bundle = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLE);
                    const minify = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.MINIFY);
                    const sourceMaps = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_MAPS);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                default: {
                    if (command === undefined) {
                        display.error("Error: No command specified");
                    }
                    else {
                        display.error("Error: Unknown command - " + command);
                    }
                    display.info("Command line format: <command> [--arg1] [--arg2] ... [--argn]");
                    break;
                }
            }
            return ret;
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7b0JBQ1osQ0FBQztvQkFDRCxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztnQkFFRCxTQUFTLENBQUM7b0JBQ04sRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztvQkFDakQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixHQUFHLE9BQU8sQ0FBQyxDQUFDO29CQUN6RCxDQUFDO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQztvQkFDOUUsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7S0FBQTtJQUVPLGFBQWEsQ0FBQyxNQUFlLEVBQUUsT0FBaUIsRUFBRSxZQUFxQjtRQUMzRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDcEcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLE9BQWlCO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7QUExS2MsWUFBUSxHQUFXLFNBQVMsQ0FBQztBQUM3QixlQUFXLEdBQVcsV0FBVyxDQUFDO0FBRnJELGtCQTRLQyIsImZpbGUiOiJ1bml0ZWpzLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
