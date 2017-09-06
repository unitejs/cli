[![Join the chat at https://gitter.im/unitejs/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/unitejs/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![NPM version][npm-version-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls][coveralls-image]][coveralls-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] 

# UniteJS CLI - The Zero Configuration Web App Generation Tool

How many times have you started a new web project and thought maybe I should try using the latest and greatest tech stack to see what I am missing?

Then the reality check happens and you probably think:

* I don't have time to learn a new technology
* The getting started guides are great but I just want to dive in and code
* I don't want to have to learn all the new tasks/commands/scripts just to give it a try
* How long is it going to take me to configure the different technologies to work together

The aim of UniteJS is to provide a CLI tool that you can use to create a ready to roll application with code, styling, unit tests and e2e tests. All combinations of the chosen technologies provide the same set of tasks to run and produce the same output. We try not to be too opinionated in what is produced but sometimes that can't be helped :wink:

You can see what the app provides out of the box in the [Generated App](./docs/generated-app.md) docs.

In addition there are some extras built-in like **icon generation** and **platform packaging**.

As we add new features to UniteJS you will be able to update your project without losing any changes you have made.

So if this sounds like the tool for you just dive in, all the current options are displayed below and you can see what's coming next in the [roadmap](./docs/roadmap.md)

# Install

Unite is best installed as a global package

    npm install -g unitejs-cli / yarn global add unitejs-cli

# Usage

    unite "command" [args0] [args1] ... [argsn]
    where command is one of:
    * help
    * version
    * configure
    * clientPackage
    * buildConfiguration
    * platform

All argument values are case insensitive.

## Command help

Display the help on the command line.

## Command version

Display the version of the app on the command line.

## Command configure

If there is already a unite.json in the outputDirectory then all of the arguments will be read from the file and are optional. You only need specify the ones that you want to change.

| Argument            | Value                                        | Used For                                         |
|---------------------|----------------------------------------------|--------------------------------------------------|
| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |
| title               | plain text                                   | Used on the web index page                       |
| license             | plain text                                   | See [SPDX](https://spdx.org/licenses/) for options|
| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |
| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |
| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |
| linter              | ESLint/TSLint/None                           | The linter                                       |
|                     |                                              |   None - means no linting                        |
| unitTestRunner      | Karma/None                                   | The unit test runner                             |
|                     |                                              |   None - means no unit testing                   |
| unitTestFramework   | Jasmine/MochaChai                            | The unit test framework to use                   |
| unitTestEngine      | PhantomJS/ChromeHeadless                     | The unit test engine to execute tests            |
| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |
| e2eTestFramework    | Jasmine/MochaChai                            | The e2e test framework to use                    |
| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |
| cssPost             | PostCss/None                                 | The css postprocessor to use                     |
|                     |                                              |   None - means no css post processor             |
| appFramework        | [Angular](#ng)/[Aurelia](#au)/[PlainApp](#pa)/[React](#re)               | The application framework to use                 |
| packageManager      | Npm/Yarn                                     | The package manager to use                       |
|                     |                                              |   optional - defaults to Npm if not already set  |
| force               |                                              | Force overwrite of all existing configuration    |
|                     |                                              |   optional - defaults to off                     |
| outputDirectory     | 'path'                                       | The location that you want the project generated |
|                     |                                              |   optional - defaults to current directory       |

# Example

    unite configure --packageName=test-project --title="Test TypeScript Jasmine RequireJS" --license=MIT --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --unitTestEngine=PhantomJS --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint --cssPre=Sass --cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project

    unite configure --packageName=test-project --title="Test JavaScript Mocha Chai SystemJS" --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma --unitTestFramework=MochaChai --unitTestEngine=ChromeHeadless --e2eTestRunner=None --linter=ESLint --cssPre=Css --cssPost=None --appFramework=Aurelia --packageManager=Npm --force=true --outputDirectory=/unite/test-project

## Command buildConfiguration

By default you are created dev and prod configurations with sensible defaults. You can add or remove configurations with this command.

The configuration sections created in unite.json have a variables property which you can modify manually to add your own values that will be include in the build. The values are then available in the window.unite.config namespace at runtime. As this is just JSON your value can be any data that can be JSON serialized. The TypeScript definitions for this object are in this repo [UniteJS Types](https://github.com/unitejs/types) and can be reference using:

     /// <reference types="unitejs-types" />

# Example

unite.json

    "buildConfigurations": {
        "myconfiguration": {
            ...
            "variables": {
                "value1": 12345,
                "someFlag: true
            }
        }
    }

at runtime

    console.log(window.unite.config["value1"]);
    console.log(window.unite.config["someFlag"]);

### operation add

This will also update any existing configurations.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| bundle              |                                           | Should the final output be bundled               |
|                     |                                           |   optional - defaults to off                     |
| minify              |                                           | Should the final output be minified              |
|                     |                                           |   optional - defaults to off                     |
| sourcemaps          |                                           | Should the final output include sourcemaps       |
|                     |                                           |   optional - defaults to on                      |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite buildConfiguration --operation=add --configurationName=dev --sourcemaps

    unite buildConfiguration --operation=add --configurationName=prod --bundle --minify

    unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite buildConfiguration --operation=remove --configurationName=prod-debug

## Command clientPackage

Perform operations to add or remove client packages. These operations will perform the npm/yarn package operations as well as updating all the necessary configuration files.

### operation add

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| packageName         | plain text                                | Name of the package to add                       |
| version             | 1.23.4                                    | Fixed version to install                         |
|                     |                                           |   optional - defaults to latest version          |
| preload             |                                           | Should the package be preloaded at app startup   |
|                     |                                           |   optional - defaults to not preload             |
| main                | 'path'                                    | The path to the main js file in the package      |
|                     |                                           |   optional - defaults to looking it up           |
|                     |                                           |   used * to mean all files to be mapped          |
| mainMinified        | 'path'                                    | The path to the minified main js file            |
|                     |                                           |   optional - defaults to using main              |
| noScript            |                                           | Don't include any scripts from the package       |
|                     |                                           |   optional - defaults to false                   |
| includeMode         | app/test/both                             | When should the package be loaded as a module    |
|                     |                                           |   optional - defaults to both                    |
| scriptIncludeMode   | none/bundled/notBundled/both              | When should the package be included as a script  |
|                     |                                           |   optional - defaults to none                    |
| isPackage           |                                           | This is included as a package in module loaders  |
|                     |                                           |   optional - defaults to not package             |
| assets              | semi-colon separated globs                | These files are packed in platform builds        |
|                     |                                           |   optional - defaults to empty                   |
| testingAdditions    | key1=value1;key2=value2                   | Additional scripts for testing                   |
|                     |                                           |   optional - defaults to empty                   |
| map                 | key1=value1;key2=value2                   | Additional module config maps                    |
|                     |                                           |   optional - defaults to empty                   |
| loaders             | key1=value1;key2=value2                   | Additional module config loaders                 |
|                     |                                           |   optional - defaults to empty                   |
| packageManager      | npm/yarn                                  | The package manager to use for the add           |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=add --packageName=moment

    unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload

    unite clientPackage --operation=add --packageName=rxjs --main=*

    unite clientPackage --operation=add --packageName=sinon --includeMode=test

    unite clientPackage --operation=add --packageName=@angular/core --includeMode=both --testingAdditions=@angular/core/testing=bundles/core-testing.umd.js

    unite clientPackage --operation=add --packageName=requirejs-text --includeMode=both --map=text=requirejs-text --loaders=*.html=text;*.css=text

    unite clientPackage --operation=add --packageName=font-awesome --assets=css/**/*;fonts/**/*

    unite clientPackage --operation=add --packageName=bootstrap --version=4.0.0-beta --noScript

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| packageName         | plain text                                | Name of the package to remove                    |
| packageManager      | npm/yarn                                  | The package manager to use for the remove        |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite clientPackage --operation=remove --packageName=moment

## Command platform

Perform operations to add or remove platforms. This provides tasks that allow you to wrap your web application for different platforms.

One you have added a platform there can manually edit your unite.json to specify other options for the platform packaging, see the [Platforms](./docs/generated-app.md#platforms) section.

### operation add

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| platformName        | Web/Electron                              | Name of the platform to add                      |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite platform --operation=add --platformName=Web

### operation remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| platformName        | Web/Electron                              | Name of the platform to remove                   |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

    unite platform --operation=remove --platformName=Electron

## global arguments

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| noColor             |                                           | If this is used no color will appear in output   |
|                     |                                           |   optional - defaults to on                      |
| logFile             | 'filename'                                | The log file to store the logging in             |
|                     |                                           |   optional - default to no file logging          |

# Generated App

For more information on the generated app see [Generated App](./docs/generated-app.md)

# Frameworks

## <a name="ng"></a>Angular

Angular does not currently support bundling with RequireJS because there is no longer an AMD build of RXJS in modular form.

## <a name="au"></a>Aurelia

Aurelia does not currently support bundling with Browserify or Webpack (coming soon)

## <a name="pa"></a>Plain App

This is a vanilla app with no framework libraries included.

## <a name="re"></a>React

Nothing else to mention at the moment.

# Disclaimer

UniteJS currently has about 150 dependencies on the libraries it uses to generate the app, while we endeavour to make sure that every combination works it goes without saying that from time to time something will break. Just let us know in the [Issues](https://github.com/unitejs/cli/issues) and we will get it fixed ASAP.

# Feature Requests

You can see the planned features in the [roadmap](./docs/roadmap.md) if there is any other technologies you would like to see added just drop us a message on the [Gitter Channel](https://gitter.im/unitejs/discuss)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/unitejs-cli
[npm-version-image]: http://img.shields.io/npm/v/unitejs-cli.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/unitejs-cli.svg?style=flat

[travis-url]: http://travis-ci.org/unitejs/cli/
[travis-image]: http://img.shields.io/travis/unitejs/cli/master.svg?style=flat

[coveralls-url]: https://coveralls.io/github/unitejs/cli
[coveralls-image]: https://img.shields.io/coveralls/unitejs/cli.svg
