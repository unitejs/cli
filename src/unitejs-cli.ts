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
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser);
                if (engine) {
                    ret = await engine.init(packageName,
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

            case CommandLineCommandConstants.BUILD_CONFIGURATION: {
                display.info("command: " + command);

                const operation = commandLineParser.getStringArgument(CommandLineArgConstants.OPERATION);
                const configurationName = commandLineParser.getStringArgument(CommandLineArgConstants.CONFIGURATION_NAME);
                const bundle = commandLineParser.hasArgument(CommandLineArgConstants.BUNDLE);
                const minify = commandLineParser.hasArgument(CommandLineArgConstants.MINIFY);
                const sourceMaps = commandLineParser.hasArgument(CommandLineArgConstants.SOURCE_MAPS);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const engine: IEngine | undefined = this.createEngine(logger, display, commandLineParser);
                if (engine) {
                    ret = await engine.buildConfiguration(operation, configurationName, bundle, minify, sourceMaps, outputDirectory);
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
        display.diagnostics("Commands");
        display.info("  help, init, clientPackage, buildConfiguration");
        display.info("");

        display.diagnostics("init");
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
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");

        display.diagnostics("buildConfiguration --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");

        display.diagnostics("clientPackage --operation=add");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| bundle              |                                           | Should the final output be bundled               |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| minify              |                                           | Should the final output be minified              |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(display, "| sourcemaps          |                                           | Should the final output include sourcemaps       |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");

        display.diagnostics("clientPackage --operation=remove");
        display.info("");
        this.markdownTableToCli(display, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(display, "| outputDirectory     | 'path'                                    | Location of the unite.json generated from init   |");
        this.markdownTableToCli(display, "|                     |                                           |   optional - defaults to current directory       |");
        display.info("");

        display.diagnostics("Examples");
        display.info("");
        display.info("  unite init --packageName=test-project --title=\"Test TypeScript Jasmine RequireJS\"");
        display.info("   --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma");
        display.info("   --unitTestFramework=Jasmine --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint");
        display.info("   --cssPre=Sass -cssPost=PostCss --packageManager=Yarn --outputDirectory=/unite/test-project");
        display.info("");
        display.info("  unite init --packageName=test-project --title=\"Test JavaScript Mocha Chai Webpack\"");
        display.info("    --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=Webpack --unitTestRunner=Karma");
        display.info("    --unitTestFramework=Mocha-Chai --e2eTestRunner=None --linter=ESLint --cssPre=Css -cssPost=None");
        display.info("    --packageManager=Npm --outputDirectory=/unite/test-project");
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

    private markdownTableToCli(display: IDisplay, row: string): void {
        if (row.length > 2) {
            row = row.substring(0, row.length - 1).trim().replace(/\|/g, "");
            if (row[2] === " ") {
                display.info("   " + row.substring(1));
            } else {
                display.info(" --" + row.substring(1));
            }
        }
    }
}