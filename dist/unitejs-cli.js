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
            const scriptLocation = fileSystem.pathCombine(fileSystem.pathGetDirectory(commandLineParser.getScript()), "../");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QztvQkFDWixDQUFDO29CQUNELEtBQUssQ0FBQztnQkFDVixDQUFDO2dCQUVELFNBQVMsQ0FBQztvQkFDTixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO29CQUNqRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsT0FBTyxDQUFDLENBQUM7b0JBQ3pELENBQUM7b0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO29CQUM5RSxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRU8sYUFBYSxDQUFDLE1BQWUsRUFBRSxPQUFpQixFQUFFLFlBQXFCO1FBQzNFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztRQUNwRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFFLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXLENBQUMsT0FBaUI7UUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDOztBQTdJYyxZQUFRLEdBQVcsU0FBUyxDQUFDO0FBQzdCLGVBQVcsR0FBVyxXQUFXLENBQUM7QUFGckQsa0JBK0lDIiwiZmlsZSI6InVuaXRlanMtY2xpLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYyJ9
