[![Join the chat at https://gitter.im/unitejs/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/unitejs/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![NPM version][npm-version-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls][coveralls-image]][coveralls-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] 

# UniteJS CLI - Zero Configuration Web App Creation

How many times have you started a new web project and thought maybe I should try using the latest and greatest tech stack to see what I am missing?

Then the reality check happens and you probably think:

* I don't have time to learn a new technology
* The getting started guides are great but I just want to dive in and code
* I don't want to have to learn all the new tasks/commands/scripts just to give it a try
* How long is it going to take me to configure the different technologies to work together

The aim of UniteJS is to provide a CLI tool which you can use to create a ready to roll application with code, styling, unit tests and e2e tests, platform packaging, resource generation all with zero configuration. All combinations of the chosen technologies provide the same set of tasks to run and produce the same output.

We try not to be too opinionated with what our CLI produces, but sometimes that can't be helped :wink:

Create your app with any combination of the options below, all guaranteed to work with no additional configuration.

* **Application Frameworks**: Angular, Aurelia, Polymer, Preact, React, Vanilla, Vue.
* **Languages**: JavaScript, TypeScript
* **Module Types**: AMD, CommonJS, SystemJS
* **Bundlers**: Browserify, RequireJS, SystemJS, Webpack
* **Linter**: ESLint, TSLint
* **Unit Test Runners**: Jest, Karma
* **Unit Test Frameworks**: Jasmine, Mocha
* **Unit Test Engines**: Chrome Headless, JSDOM, PhantomJS
* **E2E Test Runners**: Protractor, WebDriverIO
* **E2E Test Frameworks**: Jasmine, Mocha
* **CSS Pro Processors**: Css, Less, Sass, Stylus
* **CSS Post Processors**: PostCss
* **CSS Linter**: LessHint, SassLint, Stylint, StyleLint
* **Task Runners**: Gulp
* **Package Managers**: Npm, Yarn
* **Platforms**: Cordova, Docker, Electron, Web

As we add new features to UniteJS you will be able to update your project without losing any changes you have made.

# Documentation

In depth CLI documentation with examples can be found on our web site at [http://unitejs.com/#/cli](http://unitejs.com/#/cli)

Information on the facilities available in the generated app can be found at [http://unitejs.com/#/generatedapp](http://unitejs.com/#/generatedapp)

If you don't want to type in all the command line options we have provided an online generator on our web site at [http://unitejs.com/#/generator](http://unitejs.com/#/generator) or if you are using VSCode you can install our extension [UniteJS VSCode Extension](https://marketplace.visualstudio.com/items?itemName=unitejs.unitejs-vscode) with shortcuts to many of the tasks.

# Install

UniteJS is a node module and is best installed as a global package.

``` shell
npm install -g unitejs-cli / yarn global add unitejs-cli
```

# Usage

``` shell
unite command --argName<0>=argValue<0> ... --argName<n>=argValue<n>
```

where command is one of:

* help
* version
* configure
* buildConfiguration
* generate
* clientPackage
* platform

Argument names are case sensitive but values are case insensitive, argument values with spaces should be enclosed in quotes, apostrophes or backticks.

# Commands

## unite help

Displays the help on the command line.

---

## unite version

Displays the version of the app and the engine on the command line.

---

## unite configure

This command will generate your skeleton application with the options you specify.

| Argument            | Value                                        | Used For                                         |
|---------------------|----------------------------------------------|--------------------------------------------------|
| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |
| license             | None/{See [SPDX](https://spdx.org/licenses/) for options} | The license file to generate if required |
| appFramework        | Angular/Aurelia/Polymer/React/Vanilla/Vue    | The application framework to use                 |
| sourceLanguage      | JavaScript/TypeScript                        | The language you want to code in                 |
| linter              | ESLint/TSLint/None                           | The linter                                       |
|                     |                                              |   None - means no linting                        |
| moduleType          | AMD/CommonJS/SystemJS                        | The module type you want to use                  |
| bundler             | Browserify/RequireJS/SystemJSBuilder/Webpack | The bundler you want to use                      |
| unitTestRunner      | [Jest](#jest)/[Karma](#karma)/None                              |  The unit test runner                             |
|                     |                                              |   None - means no unit testing                   |
| unitTestFramework   | Jasmine/MochaChai                            | The unit test framework to use                   |
| unitTestEngine      | JSDom/PhantomJS/ChromeHeadless               | The unit test engine to execute tests            |
| e2eTestRunner       | Protractor/WebdriverIO/None                  | The e2e test runner                              |
| e2eTestFramework    | Jasmine/MochaChai                            | The e2e test framework to use                    |
| cssPre              | Css/Less/Sass/Stylus                         | The css preprocessor to use                      |
| cssPost             | PostCss/None                                 | The css postprocessor to use                     |
|                     |                                              |   None - means no css post processor             |
| cssLinter           | LessHint/None/SassLint/Stylint/StyleLint     | The css linter to use                            |
|                     |                                              |   None - means no css linter                     |
| documenter          | ESDoc/JSDoc/None/TSDoc                       | The documenter to use                            |
|                     |                                              |   None - means no documenter                     |
| ides                | VSCode                                       | This can be a comma separated list               |
|                     |                                              |   optional can be blank                          |
| packageManager      | Npm/Yarn                                     | The package manager to use                       |
|                     |                                              |   optional - defaults to Npm if not already set  |
| profile             | [See Profiles](#configprofiles)                                     | The profile to use                       |
|                     |                                              |   optional - defaults to no profile              |
| force               |                                              | Force overwrite of all existing configuration    |
|                     |                                              |   optional - defaults to off                     |
| noCreateSource      |                                              | Skip source file creation if already deleted     |
|                     |                                              |   optional - defaults to off                     |
| outputDirectory     | 'path'                                       | The location that you want the project generated |
|                     |                                              |   optional - defaults to current directory       |
| **Meta Data**           | **All Optional**                                 |                                                  |
| title               | plain text                                   | Used on the web index page                       |
|                     |                                              |   optional - defaults to packageName             |
| description         | plain text                                   | Meta data description                            |
|                     |                                              |   optional - defaults to title                   |
| shortName           | plain text (usually <= 12 chars)             | Meta data short name                             |
|                     |                                              |   optional - defaults to title                   |
| keywords            | comma separated plain text                   | Meta data keywords                               |
|                     |                                              |   optional - defaults to title split on space    |
| organization        | plain text                                   | Meta data organization                           |
|                     |                                              |   optional - defaults to empty                   |
| webSite             | url                                          | Url for web site associated with organization    |
|                     |                                              |   optional - defaults to empty                   |
| copyright           | plain text                                   | Copyright notice for application                 |
|                     |                                              |   optional - defaults to empty                   |
| namespace           | dotted name                                  | Namespace to use in packaging e.g. org.myorg     |
|                     |                                              |   optional - defaults to empty                   |
| author              | plain text                                   | Name of the app author                           |
|                     |                                              |   optional - defaults to empty                   |
| authorEmail         | email address                                | E-mail of the app author                         |
|                     |                                              |   optional - defaults to empty                   |
| authorWebSite       | url                                          | Web Site of the app author                       |
|                     |                                              |   optional - defaults to empty                   |

## Command buildConfiguration

### --operation=add

This will either add a new configuration or update any existing configurations with the same name.

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
| pwa                 |                                           | Include Progressive Web App functionality        |
|                     |                                           |   optional - defaults to off                     |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

### --operation=remove

This will remove an existing configuration.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

---

## unite generate

Creates components for use in your application, your application framework, sourceLanguage, css preprocessor and other variables will be used to create code specific to your configuration. Additionally simple unit tests will be created.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| name                | the name you want to use for your item    | This can have spaces in it and will be           |
|                     |                                           | reformatted during generation                    |
| type                | specific to each applicationFramework     | See below                                        |
| subFolder           | a folder to create your new item in       | Optional with framework defaults built in        |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

### Generate Types

* Angular - class, component, directive, enum, guard, interface, module, pipe, service
* Aurelia - attribute, binding-behavior, class, component, element, enum, interface, pipeline-step, value-converter
* Polymer - class, component, enum, interface
* Preact - class, component, enum, interface
* React - class, component, enum, interface
* Vanilla - class, enum, interface
* Vue - class, component, enum, interface

---

## unite clientPackage

Perform operations to add or remove client packages. In addition these operations will handle the npm/yarn tasks.

### operation add

This will add a new clientPackage and modify all the necessary configuration files to include it in your app.

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
|                     |                                           |   use * to mean all files to be mapped           |
| mainMinified        | 'path'                                    | The path to the minified main js file            |
|                     |                                           |   optional - defaults to using main              |
| mainLib             | comma separated globs                     | A specific set of files to include when main=*   |
|                     |                                           |   optional - defaults to all js in the package   |
| noScript            |                                           | Don't include any scripts from the package       |
|                     |                                           |   optional - defaults to false                   |
| includeMode         | app/test/both                             | When should the package be loaded as a module    |
|                     |                                           |   optional - defaults to both                    |
| scriptIncludeMode   | none/bundled/notBundled/both              | When should the package be included as a script  |
|                     |                                           |   optional - defaults to none                    |
| isPackage           |                                           | This is included as a package in module loaders  |
|                     |                                           |   optional - defaults to not package             |
| assets              | comma separated globs                     | These files are packed in platform builds        |
|                     |                                           |   optional - defaults to empty                   |
| testingAdditions    | key1=value1,key2=value2                   | Additional scripts for testing                   |
|                     |                                           |   optional - defaults to empty                   |
| map                 | key1=value1,key2=value2                   | Additional module config maps                    |
|                     |                                           |   optional - defaults to empty                   |
| loaders             | key1=value1,key2=value2                   | Additional module config loaders                 |
|                     |                                           |   optional - defaults to empty                   |
| transpileAlias      | 'path'                                    | The location to build a transpiled version       |
|                     |                                           |   optional - defaults to empty                   |
| transpileLanguage   | JavaScript/TypeScript                     | The source language to transpile from            |
|                     |                                           |   optional - defaults to empty                   |
| transpileSources    | comma separated globs                     | The source files to transpile                    |
|                     |                                           |   optional - defaults to empty                   |
| transpileModules    | comma separated module names              | Relative module name imports to replace with map |
|                     |                                           |   optional - defaults to empty                   |
| transpileStripExt   |                                           | Should we strip extensions from imports          |
|                     |                                           |   optional - defaults to false                   |
| transpileTransforms | from1,to1,from2,to2...                    | Regex transforms to apply during transpilation   |
|                     |                                           |   optional - defaults to empty                   |
| packageManager      | npm/yarn                                  | The package manager to use for the add           |
|                     |                                           |   optional - defaults to npm if not already set  |
| profile             | [See Profiles](#clientpackageprofiles)                                     | The profile to use                       |
|                     |                                              |   optional - defaults to no profile              |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

### --operation=remove

This will remove an existing clientPackage and modify all the necessary configuration files to remove it from your app.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| packageName         | plain text                                | Name of the package to remove                    |
| packageManager      | npm/yarn                                  | The package manager to use for the remove        |
|                     |                                           |   optional - defaults to npm if not already set  |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

---

## unite platform

Perform operations to add or remove platforms. This provides tasks that allow you to wrap your web application for different platforms.

### --operation=add

This will add a new platform and modify all the necessary configuration files to include it in your app.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| platformName        | Cordova/Docker/Electron/Web               | Name of the platform to add                      |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

### --operation=remove

This will remove an existing platform and modify all the necessary configuration files to remove it from your app.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| platformName        | Cordova/Docker/Electron/Web               | Name of the platform to remove                   |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# <a name="configprofiles"></a>Configuration Profiles

The following configuration profiles are currently available, they provide a set of defaults recommended by the application framework providers.

* AngularJavaScript
* AngularTypeScript
* AureliaJavaScript
* AureliaTypeScript
* PolymerJavaScript
* PolymerTypeScript
* PreactJavaScript
* PreactTypeScript
* ReactJavaScript
* ReactTypeScript
* VanillaJavaScript
* VanillaTypeScript
* VueJavaScript
* VueTypeScript

# <a name="clientpackageprofiles"></a>Client Package Profiles

The following clientPackage profiles are currently available, they provide a set of defaults for the libraries.

* font-awesome
* bootstrap4
* bluebird
* primsjs
* rxjs

# Disclaimer

UniteJS currently has about 200 dependencies on the libraries it uses to generate the app, while we endeavour to make sure that every combination works it goes without saying that from time to time something will break.

Our web site [Status](http://unitejs.com/#/status) page shows the current state of our test matrix which tries to test as many combinations as possible using the latest version of each library.

If you are still having issues just let us know in the [Issues](https://github.com/unitejs/cli/issues) and we will get it fixed ASAP.

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
