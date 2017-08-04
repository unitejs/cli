/**
 * Main entry point.
 */
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { Engine } from "unitejs-core/dist/engine/engine";
import { IEngine } from "unitejs-core/dist/interfaces/IEngine";
import { IDisplay } from "unitejs-framework/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";

export class CLI extends CLIBase {
    private static APP_NAME: string = "UniteJS";
    private static DEFAULT_LOG: string = "unite.log";

    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }

    public async handleCustomCommand(logger: ILogger, display: IDisplay, fileSystem: IFileSystem, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = -1;

        const command = commandLineParser.getCommand();

        switch (command) {
            case CommandLineCommandConstants.CONFIGURE: {
                display.info(`command: ${command}`);

                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const title = commandLineParser.getStringArgument(CommandLineArgConstants.TITLE);
                const license = commandLineParser.getStringArgument(CommandLineArgConstants.LICENSE);
                const sourceLanguage = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_LANGUAGE);
                const moduleType = commandLineParser.getStringArgument(CommandLineArgConstants.MODULE_TYPE);
                const bundler = commandLineParser.getStringArgument(CommandLineArgConstants.BUNDLER);
                const unitTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_RUNNER);
                const unitTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                const e2eTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_RUNNER);
                const e2eTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_FRAMEWORK);
                const linter = commandLineParser.getStringArgument(CommandLineArgConstants.LINTER);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const cssPreProcessor = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_PRE_PROCESSOR);
                const cssPostProcessor = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_POST_PROCESSOR);
                const appFramework = commandLineParser.getStringArgument(CommandLineArgConstants.APP_FRAMEWORK);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine = new Engine(logger, display, fileSystem);
                if (engine) {
                    ret = await engine.configure(packageName,
                                                 title,
                                                 license,
                                                 sourceLanguage,
                                                 moduleType,
                                                 bundler,
                                                 unitTestRunner,
                                                 unitTestFramework,
                                                 e2eTestRunner,
                                                 e2eTestFramework,
                                                 linter,
                                                 cssPreProcessor,
                                                 cssPostProcessor,
                                                 packageManager,
                                                 appFramework,
                                                 outputDirectory);
                } else {
                    ret = 1;
                }
                break;
            }

            case CommandLineCommandConstants.CLIENT_PACKAGE: {
                display.info(`command: ${command}`);

                const operation = commandLineParser.getStringArgument(CommandLineArgConstants.OPERATION);
                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const version = commandLineParser.getStringArgument(CommandLineArgConstants.VERSION);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const preload = commandLineParser.hasArgument(CommandLineArgConstants.PRELOAD);
                const includeMode = commandLineParser.getStringArgument(CommandLineArgConstants.INCLUDE_MODE);
                const isPackage = commandLineParser.hasArgument(CommandLineArgConstants.IS_PACKAGE);
                const main = commandLineParser.getStringArgument(CommandLineArgConstants.MAIN);
                const mainMinified = commandLineParser.getStringArgument(CommandLineArgConstants.MAIN_MINIFIED);
                const engine: IEngine = new Engine(logger, display, fileSystem);
                if (engine) {
                    ret = await engine.clientPackage(operation, packageName, version, preload, includeMode, main, mainMinified, isPackage, "", packageManager, outputDirectory);
                } else {
                    ret = 1;
                }
                break;
            }

            case CommandLineCommandConstants.BUILD_CONFIGURATION: {
                display.info(`command: ${command}`);

                const operation = commandLineParser.getStringArgument(CommandLineArgConstants.OPERATION);
                const configurationName = commandLineParser.getStringArgument(CommandLineArgConstants.CONFIGURATION_NAME);
                const bundle = commandLineParser.hasArgument(CommandLineArgConstants.BUNDLE);
                const minify = commandLineParser.hasArgument(CommandLineArgConstants.MINIFY);
                const sourceMaps = commandLineParser.hasArgument(CommandLineArgConstants.SOURCE_MAPS);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine = new Engine(logger, display, fileSystem);
                if (engine) {
                    ret = await engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
                } else {
                    ret = 1;
                }
            }
        }

        return ret;
    }

    public displayHelp(display: IDisplay): number {
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
