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
const cliBase_1 = require("unitejs-cli-core/dist/cliBase");
const engine_1 = require("unitejs-engine/dist/engine/engine");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME);
    }
    handleCustomCommand(logger, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.CONFIGURE: {
                    logger.info("command", { command });
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
                    const appFramework = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.APP_FRAMEWORK);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = new engine_1.Engine(logger, fileSystem);
                    if (engine) {
                        ret = yield engine.configure(packageName, title, license, sourceLanguage, moduleType, bundler, unitTestRunner, unitTestFramework, e2eTestRunner, e2eTestFramework, linter, cssPreProcessor, cssPostProcessor, packageManager, appFramework, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.CLIENT_PACKAGE: {
                    logger.info("command", { command });
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const packageName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_NAME);
                    const version = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.VERSION);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const packageManager = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PACKAGE_MANAGER);
                    const preload = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.PRELOAD);
                    const includeMode = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.INCLUDE_MODE);
                    const isPackage = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.IS_PACKAGE);
                    const main = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MAIN);
                    const mainMinified = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.MAIN_MINIFIED);
                    const assets = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.ASSETS);
                    const engine = new engine_1.Engine(logger, fileSystem);
                    if (engine) {
                        ret = yield engine.clientPackage(operation, packageName, version, preload, includeMode, main, mainMinified, isPackage, assets, packageManager, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.BUILD_CONFIGURATION: {
                    logger.info("command", { command });
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const configurationName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CONFIGURATION_NAME);
                    const bundle = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLE);
                    const minify = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.MINIFY);
                    const sourceMaps = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_MAPS);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = new engine_1.Engine(logger, fileSystem);
                    if (engine) {
                        ret = yield engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.PLATFORM: {
                    logger.info("command", { command });
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const platformName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.PLATFORM_NAME);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = new engine_1.Engine(logger, fileSystem);
                    if (engine) {
                        ret = yield engine.platform(operation, platformName, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                }
            }
            return ret;
        });
    }
    displayHelp(logger) {
        logger.banner("Commands");
        logger.info("  help, version, configure, clientPackage, buildConfiguration, platform");
        logger.info("");
        logger.banner("configure");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |");
        this.markdownTableToCli(logger, "| title               | plain text                                   | Used on the web index page                       |");
        this.markdownTableToCli(logger, "| license             | plain text                                   | See [SPDX](https://spdx.org/licenses/) for options|");
        this.markdownTableToCli(logger, "| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |");
        this.markdownTableToCli(logger, "| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |");
        this.markdownTableToCli(logger, "| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |");
        this.markdownTableToCli(logger, "| linter              | ESLint/TSLint/None                           | The linter                                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no linting                        |");
        this.markdownTableToCli(logger, "| unitTestRunner      | Karma/None                                   | The unit test runner                             |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no unit testing                   |");
        this.markdownTableToCli(logger, "| unitTestFramework   | Jasmine/Mocha-Chai                           | The unit test framework to use                   |");
        this.markdownTableToCli(logger, "| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |");
        this.markdownTableToCli(logger, "| e2eTestFramework    | Jasmine/Mocha-Chai                           | The e2e test framework to use                    |");
        this.markdownTableToCli(logger, "| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |");
        this.markdownTableToCli(logger, "| cssPost             | PostCss/None                                 | The css postprocessor to use                     |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no css post processor             |");
        this.markdownTableToCli(logger, "| appFramework        | Aurelia/PlainApp/React                       | The application framework to use                 |");
        this.markdownTableToCli(logger, "| packageManager      | Npm/Yarn                                     | The package manager to use                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                       | The location that you want the project generated |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("buildConfiguration --operation=add");
        logger.info("");
        this.markdownTableToCli(logger, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(logger, "| bundle              |                                           | Should the final output be bundled               |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(logger, "| minify              |                                           | Should the final output be minified              |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(logger, "| sourcemaps          |                                           | Should the final output include sourcemaps       |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("buildConfiguration --operation=remove");
        logger.info("");
        this.markdownTableToCli(logger, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("clientPackage --operation=add");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text                                | Name of the package to add                       |");
        this.markdownTableToCli(logger, "| version             | 1.23.4                                    | Fixed version to install                         |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to latest version          |");
        this.markdownTableToCli(logger, "| preload             |                                           | Should the package be preloaded at app startup   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to not preload             |");
        this.markdownTableToCli(logger, "| includeMode         | app/test/both                             | When should the package be loaded                |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to both                    |");
        this.markdownTableToCli(logger, "| main                | 'path'                                    | The path to the main js file in the package      |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to looking it up           |");
        this.markdownTableToCli(logger, "| mainMinified        | 'path'                                    | The path to the minified main js file            |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to using main              |");
        this.markdownTableToCli(logger, "| isPackage           |                                           | This be included as a package in module loaders  |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to not package             |");
        this.markdownTableToCli(logger, "| packageManager      | npm/yarn                                  | The package manager to use for the add           |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("clientPackage --operation=remove");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text                                | Name of the package to remove                    |");
        this.markdownTableToCli(logger, "| packageManager      | npm/yarn                                  | The package manager to use for the remove        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("platform --operation=add");
        logger.info("");
        this.markdownTableToCli(logger, "| platformName        | Web/Electron                              | Name of the platform to add                      |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("platform --operation=remove");
        logger.info("");
        this.markdownTableToCli(logger, "| operation           | remove                                    |                                                  |");
        this.markdownTableToCli(logger, "| platformName        | Web/Electron                              | Name of the platform to remove                   |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");
        logger.banner("Global Arguments");
        logger.info("");
        this.markdownTableToCli(logger, "| noColor             |                                           | If this is used no color will appear in output   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(logger, "| logFile             | 'filename'                                | The log file to store the logging in             |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to no file logging         |");
        this.markdownTableToCli(logger, "");
        logger.info("");
        logger.banner("Examples");
        logger.info("");
        logger.info("  unite configure --packageName=test-project --title=\"Test TypeScript Jasmine RequireJS\"");
        logger.info("   --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma");
        logger.info("   --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint");
        logger.info("   --cssPre=Sass -cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project");
        logger.info("");
        logger.info("  unite configure --packageName=test-project --title=\"Test JavaScript Mocha Chai SystemJS\"");
        logger.info("    --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma");
        logger.info("    --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None");
        logger.info("    --appFramework=Aurelia --packageManager=Npm --outputDirectory=/unite/test-project");
        logger.info("");
        logger.info("  unite buildConfiguration --operation=add --configurationName=dev --sourcemaps");
        logger.info("  unite buildConfiguration --operation=add --configurationName=prod --bundle --minify");
        logger.info("  unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps");
        logger.info("");
        logger.info("  unite buildConfiguration --operation=remove --configurationName=prod-debug");
        logger.info("");
        logger.info("  unite clientPackage --operation=add --packageName=moment");
        logger.info("  unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload");
        logger.info("  unite clientPackage --operation=add --packageName=sinon --includeMode=test");
        logger.info("");
        logger.info("  unite clientPackage --operation=remove --packageName=moment");
        logger.info("");
        logger.banner("More Information");
        logger.info("");
        logger.info("  See https://github.com/unitejs/cli#readme for further details.");
        return 0;
    }
}
CLI.APP_NAME = "UniteJS";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml0ZWpzLWNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyREFBd0Q7QUFFeEQsOERBQTJEO0FBSTNELHVFQUFvRTtBQUNwRSwrRUFBNEU7QUFFNUUsU0FBaUIsU0FBUSxpQkFBTztJQUc1QjtRQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVZLG1CQUFtQixDQUFDLE1BQWUsRUFBRSxVQUF1QixFQUFFLGlCQUFvQzs7WUFDM0csSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFckIsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFL0MsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFLLHlEQUEyQixDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBRXBDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGlEQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM5RixNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxpREFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakYsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsaURBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JGLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLGlEQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNwRyxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxpREFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDNUYsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsaUJB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QzdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM3SixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDN0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM3SixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDN0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM3SixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDN0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM3SixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDN0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM3SixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDN0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzdKLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO1FBQzFKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsd0hBQXdILENBQUMsQ0FBQztRQUMxSixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLHdIQUF3SCxDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLDRGQUE0RixDQUFDLENBQUM7UUFDMUcsTUFBTSxDQUFDLElBQUksQ0FBQywwR0FBMEcsQ0FBQyxDQUFDO1FBQ3hILE1BQU0sQ0FBQyxJQUFJLENBQUMsc0dBQXNHLENBQUMsQ0FBQztRQUNwSCxNQUFNLENBQUMsSUFBSSxDQUFDLHVIQUF1SCxDQUFDLENBQUM7UUFDckksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLDhGQUE4RixDQUFDLENBQUM7UUFDNUcsTUFBTSxDQUFDLElBQUksQ0FBQyw2SEFBNkgsQ0FBQyxDQUFDO1FBQzNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0dBQW9HLENBQUMsQ0FBQztRQUNsSCxNQUFNLENBQUMsSUFBSSxDQUFDLHVGQUF1RixDQUFDLENBQUM7UUFDckcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlGQUFpRixDQUFDLENBQUM7UUFDL0YsTUFBTSxDQUFDLElBQUksQ0FBQyx1RkFBdUYsQ0FBQyxDQUFDO1FBQ3JHLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEdBQTBHLENBQUMsQ0FBQztRQUN4SCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEVBQThFLENBQUMsQ0FBQztRQUM1RixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNERBQTRELENBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLHNGQUFzRixDQUFDLENBQUM7UUFDcEcsTUFBTSxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1FBQzVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDOztBQXhQYyxZQUFRLEdBQVcsU0FBUyxDQUFDO0FBRGhELGtCQTBQQyIsImZpbGUiOiJ1bml0ZWpzLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
