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
const unitejs_core_1 = require("unitejs-core/dist/unitejs-core");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
const commandLineParser_1 = require("./commandLineParser");
const display_1 = require("./display");
const fileSystem_1 = require("./fileSystem");
const logger_1 = require("./logger");
const npmPackageManager_1 = require("./packageManagers/npmPackageManager");
const yarnPackageManager_1 = require("./packageManagers/yarnPackageManager");
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
                    logger.exception("Unhandled Exception", err);
                    logger.info("Session Ended", { returnCode: ret });
                }
            }
            return ret;
        });
    }
    createEngine(logger, display, commandLineParser, packageManager) {
        if (packageManager === null || packageManager === undefined || packageManager.length === 0) {
            packageManager = "npm";
        }
        if (packageManager !== "npm" && packageManager !== "yarn") {
            display.error("packageManager: Must be npm or yarn");
            return undefined;
        }
        else {
            const fileSystem = new fileSystem_1.FileSystem();
            const scriptLocation = fileSystem.pathCombine(__dirname, "../");
            const pm = packageManager === "npm" ? new npmPackageManager_1.NpmPackageManager(logger, display, fileSystem) : new yarnPackageManager_1.YarnPackageManager(logger, display, fileSystem);
            return new unitejs_core_1.Engine(logger, display, fileSystem, pm, scriptLocation);
        }
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
                    const sourceLanguage = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_LANGUAGE);
                    const moduleLoader = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MODULE_LOADER);
                    const unitTestRunner = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_RUNNER);
                    const unitTestFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = this.createEngine(logger, display, commandLineParser, "");
                    if (engine) {
                        ret = yield engine.init(packageName, title, sourceLanguage, moduleLoader, unitTestRunner, unitTestFramework, outputDirectory);
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
                    const engine = this.createEngine(logger, display, commandLineParser, packageManager);
                    if (engine) {
                        ret = yield engine.clientPackage(operation, packageName, version, preload, includeMode, outputDirectory);
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
