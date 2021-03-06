/**
 * Main entry point.
 */
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { IncludeMode } from "unitejs-engine/dist/configuration/models/unite/includeMode";
import { ScriptIncludeMode } from "unitejs-engine/dist/configuration/models/unite/scriptIncludeMode";
import { Engine } from "unitejs-engine/dist/engine/engine";
import { BuildConfigurationOperation } from "unitejs-engine/dist/interfaces/buildConfigurationOperation";
import { ClientPackageOperation } from "unitejs-engine/dist/interfaces/clientPackageOperation";
import { IBuildConfigurationCommandParams } from "unitejs-engine/dist/interfaces/IBuildConfigurationCommandParams";
import { IClientPackageCommandParams } from "unitejs-engine/dist/interfaces/IClientPackageCommandParams";
import { IConfigureCommandParams } from "unitejs-engine/dist/interfaces/IConfigureCommandParams";
import { IEngine } from "unitejs-engine/dist/interfaces/IEngine";
import { IGenerateCommandParams } from "unitejs-engine/dist/interfaces/IGenerateCommandParams";
import { IPackageCommandParams } from "unitejs-engine/dist/interfaces/IPackageCommandParams";
import { IPlatformCommandParams } from "unitejs-engine/dist/interfaces/IPlatformCommandParams";
import { PlatformOperation } from "unitejs-engine/dist/interfaces/platformOperation";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";

export class CLI extends CLIBase {
    private static readonly APP_NAME: string = "UniteJS";
    private _engine: IEngine;

    constructor() {
        super(CLI.APP_NAME);
    }

    public async initialise(logger: ILogger, fileSystem: IFileSystem): Promise<number> {
        this._engine = new Engine(logger, fileSystem);
        return this._engine.initialise();
    }

    public async handleCustomCommand(logger: ILogger, fileSystem: IFileSystem, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = -1;

        const command = commandLineParser.getCommand();

        switch (command) {
            case CommandLineCommandConstants.CONFIGURE: {
                logger.info("command", { command });

                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const title = commandLineParser.getStringArgument(CommandLineArgConstants.TITLE);
                const license = commandLineParser.getStringArgument(CommandLineArgConstants.LICENSE);
                const sourceLanguage = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_LANGUAGE);
                const moduleType = commandLineParser.getStringArgument(CommandLineArgConstants.MODULE_TYPE);
                const bundler = commandLineParser.getStringArgument(CommandLineArgConstants.BUNDLER);
                const unitTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_RUNNER);
                const unitTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_FRAMEWORK);
                const unitTestEngine = commandLineParser.getStringArgument(CommandLineArgConstants.UNIT_TEST_ENGINE);
                const e2eTestRunner = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_RUNNER);
                const e2eTestFramework = commandLineParser.getStringArgument(CommandLineArgConstants.E2E_TEST_FRAMEWORK);
                const linter = commandLineParser.getStringArgument(CommandLineArgConstants.LINTER);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const cssPre = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_PRE_PROCESSOR);
                const cssPost = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_POST_PROCESSOR);
                const cssLinter = commandLineParser.getStringArgument(CommandLineArgConstants.CSS_LINTER);
                const documenter = commandLineParser.getStringArgument(CommandLineArgConstants.DOCUMENTER);
                const server = "BrowserSync"; // commandLineParser.getStringArgument(CommandLineArgConstants.CSS_POST_PROCESSOR);
                const taskManager = "Gulp"; //commandLineParser.getStringArgument(CommandLineArgConstants.CSS_POST_PROCESSOR);
                const ides = commandLineParser.getStringArrayArgument(CommandLineArgConstants.IDES);
                const applicationFramework = commandLineParser.getStringArgument(CommandLineArgConstants.APP_FRAMEWORK);
                const profile = commandLineParser.getStringArgument(CommandLineArgConstants.PROFILE);
                const force = commandLineParser.getBooleanArgument(CommandLineArgConstants.FORCE);
                const noCreateSource = commandLineParser.getBooleanArgument(CommandLineArgConstants.NO_CREATE_SOURCE);
                const description = commandLineParser.getStringArgument(CommandLineArgConstants.DESCRIPTION);
                const shortName = commandLineParser.getStringArgument(CommandLineArgConstants.SHORT_NAME);
                const keywords = commandLineParser.getStringArrayArgument(CommandLineArgConstants.KEYWORDS);
                const webSite = commandLineParser.getStringArgument(CommandLineArgConstants.WEB_SITE);
                const organization = commandLineParser.getStringArgument(CommandLineArgConstants.ORGANIZATION);
                const copyright = commandLineParser.getStringArgument(CommandLineArgConstants.COPYRIGHT);
                const namespace = commandLineParser.getStringArgument(CommandLineArgConstants.NAMESPACE);
                const author = commandLineParser.getStringArgument(CommandLineArgConstants.AUTHOR);
                const authorEmail = commandLineParser.getStringArgument(CommandLineArgConstants.AUTHOR_EMAIL);
                const authorWebSite = commandLineParser.getStringArgument(CommandLineArgConstants.AUTHOR_WEBSITE);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);

                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IConfigureCommandParams>(command, {
                        packageName,
                        title,
                        license,
                        sourceLanguage,
                        moduleType,
                        bundler,
                        unitTestRunner,
                        unitTestFramework,
                        unitTestEngine,
                        e2eTestRunner,
                        e2eTestFramework,
                        linter,
                        cssPre,
                        cssPost,
                        cssLinter,
                        documenter,
                        server,
                        taskManager,
                        ides,
                        packageManager,
                        applicationFramework,
                        profile,
                        force,
                        noCreateSource,
                        description,
                        shortName,
                        keywords,
                        webSite,
                        organization,
                        copyright,
                        namespace,
                        author,
                        authorEmail,
                        authorWebSite,
                        outputDirectory
                    });
                }
                break;
            }

            case CommandLineCommandConstants.CLIENT_PACKAGE: {
                logger.info("command", { command });

                const operation = commandLineParser.getStringArgument<ClientPackageOperation>(CommandLineArgConstants.OPERATION);
                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const version = commandLineParser.getStringArgument(CommandLineArgConstants.VERSION);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                const packageManager = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_MANAGER);
                const preload = commandLineParser.getBooleanArgument(CommandLineArgConstants.PRELOAD);
                const includeMode = commandLineParser.getStringArgument<IncludeMode>(CommandLineArgConstants.INCLUDE_MODE);
                const scriptIncludeMode = commandLineParser.getStringArgument<ScriptIncludeMode>(CommandLineArgConstants.SCRIPT_INCLUDE_MODE);
                const isPackage = commandLineParser.getBooleanArgument(CommandLineArgConstants.IS_PACKAGE);
                const main = commandLineParser.getStringArgument(CommandLineArgConstants.MAIN);
                const mainMinified = commandLineParser.getStringArgument(CommandLineArgConstants.MAIN_MINIFIED);
                const mainLib = commandLineParser.getStringArrayArgument(CommandLineArgConstants.MAIN_LIB);
                const noScript = commandLineParser.getBooleanArgument(CommandLineArgConstants.NO_SCRIPT);
                const testingAdditions = commandLineParser.getStringArrayArgument(CommandLineArgConstants.TESTING_ADDITIONS);
                const map = commandLineParser.getStringArrayArgument(CommandLineArgConstants.MAP);
                const loaders = commandLineParser.getStringArrayArgument(CommandLineArgConstants.LOADERS);
                const assets = commandLineParser.getStringArrayArgument(CommandLineArgConstants.ASSETS);
                const profile = commandLineParser.getStringArgument(CommandLineArgConstants.PROFILE);
                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IClientPackageCommandParams>(command, {
                        operation,
                        packageName,
                        version,
                        preload,
                        includeMode,
                        scriptIncludeMode,
                        main,
                        mainMinified,
                        mainLib,
                        isPackage,
                        testingAdditions,
                        assets,
                        map,
                        loaders,
                        noScript,
                        profile,
                        packageManager,
                        outputDirectory
                    });
                }
                break;
            }

            case CommandLineCommandConstants.BUILD_CONFIGURATION: {
                logger.info("command", { command });

                const operation = commandLineParser.getStringArgument<BuildConfigurationOperation>(CommandLineArgConstants.OPERATION);
                const configurationName = commandLineParser.getStringArgument(CommandLineArgConstants.CONFIGURATION_NAME);
                const bundle = commandLineParser.getBooleanArgument(CommandLineArgConstants.BUNDLE);
                const minify = commandLineParser.getBooleanArgument(CommandLineArgConstants.MINIFY);
                const sourcemaps = commandLineParser.getBooleanArgument(CommandLineArgConstants.SOURCE_MAPS);
                const pwa = commandLineParser.getBooleanArgument(CommandLineArgConstants.PWA);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IBuildConfigurationCommandParams>(command, {
                        operation,
                        configurationName,
                        bundle,
                        minify,
                        sourcemaps,
                        pwa,
                        outputDirectory
                    });
                }
                break;
            }

            case CommandLineCommandConstants.PLATFORM: {
                logger.info("command", { command });

                const operation = commandLineParser.getStringArgument<PlatformOperation>(CommandLineArgConstants.OPERATION);
                const platformName = commandLineParser.getStringArgument(CommandLineArgConstants.PLATFORM_NAME);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IPlatformCommandParams>(command, {
                        operation,
                        platformName,
                        outputDirectory
                    });
                }
                break;
            }

            case CommandLineCommandConstants.GENERATE: {
                logger.info("command", { command });

                const name = commandLineParser.getStringArgument(CommandLineArgConstants.NAME);
                const type = commandLineParser.getStringArgument(CommandLineArgConstants.TYPE);
                const subFolder = commandLineParser.getStringArgument(CommandLineArgConstants.SUB_FOLDER);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IGenerateCommandParams>(command, {
                        name,
                        type,
                        subFolder,
                        outputDirectory
                    });
                }
                break;
            }

            case CommandLineCommandConstants.PACKAGE: {
                logger.info("command", { command });

                const packageName = commandLineParser.getStringArgument(CommandLineArgConstants.PACKAGE_NAME);
                const outputDirectory = commandLineParser.getStringArgument(CommandLineArgConstants.OUTPUT_DIRECTORY);
                ret = this.checkRemaining(logger, commandLineParser);
                if (ret === 0) {
                    ret = await this._engine.command<IPackageCommandParams>(command, {
                        packageName,
                        outputDirectory
                    });
                }
            }
        }

        return ret;
    }

    public displayHelp(logger: ILogger): number {
        logger.banner("Commands");
        logger.info("  help, version, configure, clientPackage, buildConfiguration, platform");
        logger.info("");

        logger.banner("configure");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |");
        this.markdownTableToCli(logger, "| license             | None/{ See [SPDX](https://spdx.org/licenses/) for options } | The license file to generate if required |");
        this.markdownTableToCli(logger, "| appFramework        | Angular/Aurelia/Polymer/                     | The application framework to use                 |");
        this.markdownTableToCli(logger, "|                     |     Preact/React/Vanilla/Vue                 |                                                  |");
        this.markdownTableToCli(logger, "| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |");
        this.markdownTableToCli(logger, "| linter              | ESLint/TSLint/None                           | The linter                                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no linting                        |");
        this.markdownTableToCli(logger, "| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |");
        this.markdownTableToCli(logger, "| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |");
        this.markdownTableToCli(logger, "| unitTestRunner      | Jest/Karma/None                              | The unit test runner                             |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no unit testing                   |");
        this.markdownTableToCli(logger, "| unitTestFramework   | Jasmine/MochaChai                            | The unit test framework to use                   |");
        this.markdownTableToCli(logger, "| unitTestEngine      | JSDom/PhantomJS/ChromeHeadless               | The unit test engine to execute tests            |");
        this.markdownTableToCli(logger, "| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |");
        this.markdownTableToCli(logger, "| e2eTestFramework    | Jasmine/MochaChai                            | The e2e test framework to use                    |");
        this.markdownTableToCli(logger, "| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |");
        this.markdownTableToCli(logger, "| cssPost             | PostCss/None                                 | The css postprocessor to use                     |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no css post processor             |");
        this.markdownTableToCli(logger, "| cssLinter           | LessHint/None/SassLint/Stylint/StyleLint     | The css linter to use                            |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no css linter                     |");
        this.markdownTableToCli(logger, "| documenter          | ESDoc/JSDoc/None/TypeDoc                     | The documenter to use                            |");
        this.markdownTableToCli(logger, "|                     |                                              |   None - means no documenter                     |");
        this.markdownTableToCli(logger, "| ides                | VSCode                                       | This can be a comma separated list               |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional can be blank                          |");
        this.markdownTableToCli(logger, "| packageManager      | Npm/Yarn                                     | The package manager to use                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to npm if not already set  |");
        this.markdownTableToCli(logger, "| force               |                                              | Force overwrite of all existing configuration    |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to off                     |");
        this.markdownTableToCli(logger, "| noCreateSource      |                                              | Skip source file creation if already deleted     |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to off                     |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                       | The location that you want the project generated |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to current directory       |");
        this.markdownTableToCli(logger, "Meta Data (All Optional)");
        this.markdownTableToCli(logger, "| title               | plain text                                   | Used on the web index page                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to packageName             |");
        this.markdownTableToCli(logger, "| description         | plain text                                   | Meta data description                            |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to title                   |");
        this.markdownTableToCli(logger, "| shortName           | plain text (usually <= 12 chars)             | Meta data short name                             |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to title                   |");
        this.markdownTableToCli(logger, "| keywords            | comma separated plain text                   | Meta data keywords                               |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to title split on space    |");
        this.markdownTableToCli(logger, "| organization        | plain text                                   | Meta data organization                           |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| webSite             | url                                          | Url for web site associated with organization    |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| copyright           | plain text                                   | Copyright notice for application                 |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| namespace           | dotted name                                  | Namespace to use in packaging e.g. org.myorg     |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| author              | plain text                                   | Name of the app author                           |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| authorEmail         | email address                                | E-mail of the app author                         |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| authorWebSite       | url                                          | Web Site of the app author                       |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to empty                   |");

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
        this.markdownTableToCli(logger, "| pwa                 |                                           | Include Progressive Web App functionality        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to off                     |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");

        logger.banner("buildConfiguration --operation=remove");
        logger.info("");
        this.markdownTableToCli(logger, "| configurationName   | plain text                                | Name of the configuration to modify              |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");

        logger.banner("generate");
        logger.info("");
        this.markdownTableToCli(logger, "| name                | the name you want to use for your item    | This can have spaces in it and will be           |");
        this.markdownTableToCli(logger, "|                     |                                           | reformatted during generation                    |");
        this.markdownTableToCli(logger, "| type                | specific to each applicationFramework     | See below                                        |");
        this.markdownTableToCli(logger, "| subFolder           | a folder to create your new item in       | Optional with framework defaults built in        |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");

        logger.banner("generate types");
        logger.info("");
        logger.info("Angular - class, component, directive, enum, guard, interface, module, pipe, service");
        logger.info("Aurelia - attribute, binding-behavior, class, component, element, enum, interface, pipeline-step, value-converter");
        logger.info("Polymer - class, component, enum, interface");
        logger.info("Preact - class, component, enum, interface");
        logger.info("React - class, component, enum, interface");
        logger.info("Vanilla - class, enum, interface");
        logger.info("Vue - class, component, enum, interface");
        logger.info("");

        logger.banner("clientPackage --operation=add");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text                                | Name of the package to add                       |");

        this.markdownTableToCli(logger, "| version             | 1.23.4                                    | Fixed version to install                         |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to latest version          |");
        this.markdownTableToCli(logger, "| preload             |                                           | Should the package be preloaded at app startup   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to not preload             |");
        this.markdownTableToCli(logger, "| main                | 'path'                                    | The path to the main js file in the package      |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to looking it up           |");
        this.markdownTableToCli(logger, "|                     |                                           |   use * to mean all files to be mapped          |");
        this.markdownTableToCli(logger, "| mainMinified        | 'path'                                    | The path to the minified main js file            |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to using main              |");
        this.markdownTableToCli(logger, "| noScript            |                                           | Don't include any scripts from the package       |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to false                   |");
        this.markdownTableToCli(logger, "| includeMode         | app/test/both                             | When should the package be loaded as a module    |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to both                    |");
        this.markdownTableToCli(logger, "| scriptIncludeMode   | none/bundled/notBundled/both              | When should the package be included as a script  |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to none                    |");
        this.markdownTableToCli(logger, "| isPackage           |                                           | This is included as a package in module loaders  |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to not package             |");
        this.markdownTableToCli(logger, "| assets              | comma separated globs                     | These files are packed in platform builds        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| testingAdditions    | key1=value1,key2=value2                   | Additional scripts for testing                   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| map                 | key1=value1,key2=value2                   | Additional module config maps                    |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to empty                   |");
        this.markdownTableToCli(logger, "| loaders             | key1=value1,key2=value2                   | Additional module config loaders                 |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to empty                   |");
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
        this.markdownTableToCli(logger, "| platformName        | Cordova/Docker/Electron/Web               | Name of the platform to add                      |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");

        logger.banner("platform --operation=remove");
        logger.info("");
        this.markdownTableToCli(logger, "| operation           | remove                                    |                                                  |");
        this.markdownTableToCli(logger, "| platformName        | Cordova/Docker/Electron/Web               | Name of the platform to remove                   |");
        this.markdownTableToCli(logger, "| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to current directory       |");
        logger.info("");

        logger.banner("package");
        logger.info("");
        this.markdownTableToCli(logger, "| packageName         | plain text                                | Name of the package to add                       |");
        logger.info("");

        logger.banner("Global Arguments");
        logger.info("");
        this.markdownTableToCli(logger, "| noColor             |                                           | If this is used no color will appear in output   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(logger, "| logFile             | 'filename'                                | The log file to store the logging in             |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to no file logging         |");
        this.markdownTableToCli(logger, "| disableVersionCheck |                                           | Switch off the check for a new version           |");
        this.markdownTableToCli(logger, "");
        logger.info("");

        logger.banner("More Information");
        logger.info("");
        logger.info("  See https://github.com/unitejs/cli#readme for further details.");

        return 0;
    }

    public displayAdditionalVersion(logger: ILogger): void {
        logger.banner(`Engine v${this._engine.version()}`);
    }
}
