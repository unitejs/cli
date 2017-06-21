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
                    const moduleLoader = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MODULE_LOADER);
                    const unitTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_RUNNER);
                    const unitTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                    const linter = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.LINTER);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser);
                    if (engine) {
                        ret = yield engine.init(packageName, title, license, sourceLanguage, moduleLoader, unitTestRunner, unitTestFramework, linter, packageManager, outputDirectory);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
