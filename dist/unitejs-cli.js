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
const engine_1 = require("unitejs-core/dist/engine/engine");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }
    handleCustomCommand(logger, display, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.CONFIGURE: {
                    display.info(`command: ${command}`);
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
                    const engine = new engine_1.Engine(logger, display, fileSystem);
                    if (engine) {
                        ret = yield engine.configure(packageName, title, license, sourceLanguage, moduleType, bundler, unitTestRunner, unitTestFramework, e2eTestRunner, e2eTestFramework, linter, cssPreProcessor, cssPostProcessor, packageManager, appFramework, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.CLIENT_PACKAGE: {
                    display.info(`command: ${command}`);
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
                    const engine = new engine_1.Engine(logger, display, fileSystem);
                    if (engine) {
                        ret = yield engine.clientPackage(operation, packageName, version, preload, includeMode, main, mainMinified, isPackage, "", packageManager, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.BUILD_CONFIGURATION: {
                    display.info(`command: ${command}`);
                    const operation = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OPERATION);
                    const configurationName = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.CONFIGURATION_NAME);
                    const bundle = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.BUNDLE);
                    const minify = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.MINIFY);
                    const sourceMaps = commandLineParser.hasArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_MAPS);
                    const outputDirectory = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.OUTPUT_DIRECTORY);
                    const engine = new engine_1.Engine(logger, display, fileSystem);
                    if (engine) {
                        ret = yield engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
                    }
                    else {
                        ret = 1;
                    }
                }
            }
            return ret;
        });
    }
    displayHelp(display) {
        display.diagnostics("Commands");
        display.info("  help, version, configure, clientPackage, buildConfiguration");
        display.info("");
        display.diagnostics("configure");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |");
        this.markdownTableToCli(display, "| title               | plain text                                   | Used on the web index page                       |");
        this.markdownTableToCli(display, "| license             | plain text                                   | See [SPDX](https://spdx.org/licenses/) for options|");
        this.markdownTableToCli(display, "| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |");
        this.markdownTableToCli(display, "| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |");
        this.markdownTableToCli(display, "| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |");
        this.markdownTableToCli(display, "| linter              | ESLint/TSLint/None                           | The linter                                       |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no linting                        |");
        this.markdownTableToCli(display, "| unitTestRunner      | Karma/None                                   | The unit test runner                             |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no unit testing                   |");
        this.markdownTableToCli(display, "| unitTestFramework   | Jasmine/Mocha-Chai                           | The unit test framework to use                   |");
        this.markdownTableToCli(display, "| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |");
        this.markdownTableToCli(display, "| e2eTestFramework    | Jasmine/Mocha-Chai                           | The e2e test framework to use                    |");
        this.markdownTableToCli(display, "| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |");
        this.markdownTableToCli(display, "| cssPost             | PostCss/None                                 | The css postprocessor to use                     |");
        this.markdownTableToCli(display, "|                     |                                              |   None - means no css post processor             |");
        this.markdownTableToCli(display, "| appFramework        | Aurelia/PlainApp/React                       | The application framework to use                 |");
        this.markdownTableToCli(display, "| packageManager      | Npm/Yarn                                     | The package manager to use                       |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                       | The location that you want the project generated |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("buildConfiguration --operation=add");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| bundle              |                                           | Should the final output be bundled               |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| minify              |                                           | Should the final output be minified              |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| sourcemaps          |                                           | Should the final output include sourcemaps       |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("buildConfiguration --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("clientPackage --operation=add");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text                                | Name of the package to add                       |");
        this.markdownTableToCli(display, "| version             | 1.23.4                                    | Fixed version to install                         |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to latest version          |");
        this.markdownTableToCli(display, "| preload             |                                           | Should the package be preloaded at app startup   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to not preload             |");
        this.markdownTableToCli(display, "| includeMode         | app/test/both                             | When should the package be loaded                |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to both                    |");
        this.markdownTableToCli(display, "| main                | 'path'                                    | The path to the main js file in the package      |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to looking it up           |");
        this.markdownTableToCli(display, "| mainMinified        | 'path'                                    | The path to the minified main js file            |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to using main              |");
        this.markdownTableToCli(display, "| isPackage           |                                           | This be included as a package in module loaders  |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to not package             |");
        this.markdownTableToCli(display, "| packageManager      | npm/yarn                                  | The package manager to use for the add           |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("clientPackage --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| packageName         | plain text                                | Name of the package to remove                    |");
        this.markdownTableToCli(display, "| packageManager      | npm/yarn                                  | The package manager to use for the remove        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");
        display.diagnostics("Examples");
        display.info("");
        display.info("  unite configure --packageName=test-project --title=\"Test TypeScript Jasmine RequireJS\"");
        display.info("   --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma");
        display.info("   --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint");
        display.info("   --cssPre=Sass -cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project");
        display.info("");
        display.info("  unite configure --packageName=test-project --title=\"Test JavaScript Mocha Chai SystemJS\"");
        display.info("    --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma");
        display.info("    --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None");
        display.info("    --appFramework=Aurelia --packageManager=Npm --outputDirectory=/unite/test-project");
        display.info("");
        display.info("  unite buildConfiguration --operation=add --configurationName=dev --sourcemaps");
        display.info("  unite buildConfiguration --operation=add --configurationName=prod --bundle --minify");
        display.info("  unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps");
        display.info("");
        display.info("  unite buildConfiguration --operation=remove --configurationName=prod-debug");
        display.info("");
        display.info("  unite clientPackage --operation=add --packageName=moment");
        display.info("  unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload");
        display.info("  unite clientPackage --operation=add --packageName=sinon --includeMode=test");
        display.info("");
        display.info("  unite clientPackage --operation=remove --packageName=moment");
        display.info("");
        display.diagnostics("More Information");
        display.info("");
        display.info("  See https://github.com/unitejs/cli#readme for further details.");
        return 0;
    }
}
CLI.APP_NAME = "UniteJS";
CLI.DEFAULT_LOG = "unite.log";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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a0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSw0SEFBNEgsQ0FBQyxDQUFDO1FBQy9KLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzlKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzlKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzlKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzlKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFB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QUMsNEZBQTRGLENBQUMsQ0FBQztRQUMzRyxPQUFPLENBQUMsSUFBSSxDQUFDLDBHQUEwRyxDQUFDLENBQUM7UUFDekgsT0FBTyxDQUFDLElBQUksQ0FBQyxzR0FBc0csQ0FBQyxDQUFDO1FBQ3JILE9BQU8sQ0FBQyxJQUFJLENBQUMsdUhBQXVILENBQUMsQ0FBQztRQUN0SSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEZBQThGLENBQUMsQ0FBQztRQUM3RyxPQUFPLENBQUMsSUFBSSxDQUFDLDZIQUE2SCxDQUFDLENBQUM7UUFDNUksT0FBTyxDQUFDLElBQUksQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1FBQ25ILE9BQU8sQ0FBQyxJQUFJLENBQUMsdUZBQXVGLENBQUMsQ0FBQztRQUN0RyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUZBQWlGLENBQUMsQ0FBQztRQUNoRyxPQUFPLENBQUMsSUFBSSxDQUFDLHVGQUF1RixDQUFDLENBQUM7UUFDdEcsT0FBTyxDQUFDLElBQUksQ0FBQywwR0FBMEcsQ0FBQyxDQUFDO1FBQ3pILE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0ZBQXNGLENBQUMsQ0FBQztRQUNyRyxPQUFPLENBQUMsSUFBSSxDQUFDLDhFQUE4RSxDQUFDLENBQUM7UUFDN0YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLCtEQUErRCxDQUFDLENBQUM7UUFDOUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQixPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7UUFFakYsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7O0FBak5jLFlBQVEsR0FBVyxTQUFTLENBQUM7QUFDN0IsZUFBVyxHQUFXLFdBQVcsQ0FBQztBQUZyRCxrQkFtTkMiLCJmaWxlIjoidW5pdGVqcy1jbGkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
