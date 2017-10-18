[![Join the chat at https://gitter.im/unitejs/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/unitejs/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![NPM version][npm-version-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls][coveralls-image]][coveralls-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] 

# UniteJS CLI - Zero Configuration Web App Creation

How many times have you started a new web project and thought maybe I should try using the latest and greatest tech stack to see what I am missing?

Then the reality check happens and you probably think:

* I don't have time to learn a new technology
* The getting started guides are great but I just want to dive in and code
* I don't want to have to learn all the new tasks/commands/scripts just to give it a try
* How long is it going to take me to configure the different technologies to work together

The aim of UniteJS is to provide a CLI tool which you can use to create a ready to roll application with code, styling, unit tests and e2e tests and zero configuration. All combinations of the chosen technologies provide the same set of tasks to run and produce the same output.

We try not to be too opinionated in what is produced but sometimes that can't be helped :wink:

The CLI provides a multitude of different options for lots of the most popular dev tools. In addition there are some extras built-in like **icon generation** and **platform packaging**.

As we add new features to UniteJS you will be able to update your project without losing any changes you have made.

So if this sounds like the tool for you just dive in.

# Documentation

In depth CLI documentation can be found on the web site at [http://unitejs.com/#/cli](http://unitejs.com/#/cli)

# Generator

If you don't want to type in all the command line options you can find a command line generator on the web site at [http://unitejs.com/#/generator](http://unitejs.com/#/generator)

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

Argument names are case sensitive but values are case insensitive, argument values with spaces should be enclosed in quotes.

# Commands

## unite help

Displays the help on the command line.

## unite version

Displays the version of the app and the engine on the command line.

## unite configure

This command will generate your skeleton application with the options you specify.

If there is already a unite.json in the outputDirectory then all of the arguments will be read from the file and are optional, you only need specify the ones that you want to change.

This is also true if you specify the profile argument, you only need override the arguments that you want to.

You can use this command with no parameters to update an existing installation to the latest components.

| Argument            | Value                                        | Used For                                         |
|---------------------|----------------------------------------------|--------------------------------------------------|
| packageName         | plain text, package.json name rules apply    | Name to be used for your package                 |
| title               | plain text                                   | Used on the web index page                       |
| license             | None/{See [SPDX](https://spdx.org/licenses/) for options} | The license file to generate if required |
| appFramework        | [Angular](#ng)/[Aurelia](#au)/[PlainApp](#pa)/[Preact](#pr)/[React](#re)/[Vue](#vu)               | The application framework to use                 |
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
| ides                | VSCode                                       | This can be a semi-colon separated list          |
|                     |                                              |   optional can be blank                          |
| packageManager      | Npm/Yarn                                     | The package manager to use                       |
|                     |                                              |   optional - defaults to Npm if not already set  |
| profile             | [See Profiles](#configprofiles)                                     | The profile to use                       |
|                     |                                              |   optional - defaults to no profile              |
| force               |                                              | Force overwrite of all existing configuration    |
|                     |                                              |   optional - defaults to off                     |
| outputDirectory     | 'path'                                       | The location that you want the project generated |
|                     |                                              |   optional - defaults to current directory       |

# Example

``` shell
unite configure --packageName=test-project --title="Test TypeScript Jasmine RequireJS" --license=None --sourceLanguage=TypeScript --moduleType=AMD --bundler=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --unitTestEngine=PhantomJS --e2eTestRunner=Protractor --e2eTestFramework=Jasmine --linter=TSLint --cssPre=Sass --cssPost=PostCss --appFramework=PlainApp --packageManager=Yarn --outputDirectory=/unite/test-project

unite configure --packageName=test-project --title="Test JavaScript Mocha Chai SystemJS" --license=Apache-2.0 --sourceLanguage=JavaScript --moduleType=SystemJS --bundler=SystemJSBuilder --unitTestRunner=Karma --unitTestFramework=MochaChai --unitTestEngine=ChromeHeadless --e2eTestRunner=None --linter=ESLint --cssPre=Css --cssPost=None --appFramework=Aurelia --packageManager=Npm --force=true --outputDirectory=/unite/test-project

unite configure --packageName=test-angular --title="Test Angular" --profile=AngularTypeScript --outputDirectory=/unite/test-project
```

## Command buildConfiguration

By default you are created dev and prod configurations with sensible defaults. You can add or remove configurations with this command.

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
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

``` shell
unite buildConfiguration --operation=add --configurationName=dev --sourcemaps

unite buildConfiguration --operation=add --configurationName=prod --bundle --minify

unite buildConfiguration --operation=add --configurationName=prod-debug --bundle --minify --sourcemaps
```

### --operation=remove

This will remove an existing configuration.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| configurationName   | plain text                                | Name of the configuration to modify              |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

``` shell
unite buildConfiguration --operation=remove --configurationName=prod-debug
```

# Build Configuration Variables

With each configuration that is created a .json file is created in the configuration folder with the same name. The values that you store in the config files are then available in the window.unite.config namespace at runtime depending on the type of build you create. Also in the configuration folder is a common.json file which you can use to store any values common to all configurations. The TypeScript definitions for this object are in this repo [UniteJS Types](https://github.com/unitejs/types) and can be reference using:

``` typescript
/// <reference types="unitejs-types" />
```

configuration/common.json

``` json
{
    "myCommonVariable": "myValue"
}

```

configuration/dev.json

``` json
{
    "myApiKey": "--dev-key--"
}
```

configuration/prod.json

``` json
{
    "myApiKey": "--prod-key--"
}
```

At runtime a dev build would allow you to access the variables as follows:

``` javascript
console.log(window.unite.config["myCommonVariable"]); // myValue
console.log(window.unite.config["myApiKey"]); // --dev-key--
```

At runtime a prod build would allow you to access the variables as follows:

``` javascript
console.log(window.unite.config["myCommonVariable"]); // myValue
console.log(window.unite.config["myApiKey"]); // --prod-key--
```


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
* PlainApp - class, enum, interface
* Preact - class, component, enum, interface
* React - class, component, enum, interface
* Vue - class, component, enum, interface

# Example

``` shell
unite generate --name=thing --type=component
unite generate --name="My Thing" --type=class --subFolder=./myClasses/sub2
```

## unite clientPackage

Perform operations to add or remove client packages. In addition these operations will handle the npm/yarn tasks.

### operation add

This will add a new clientPackage and modify all the necessary configuration files to include it in your app.

You can use the profile parameter to use one of the in-built clientPackage profiles which will configure the other arguments for you.

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
|                     |                                           |   use * to mean all files to be mapped          |
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
| profile             | [See Profiles](#clientpackageprofiles)                                     | The profile to use                       |
|                     |                                              |   optional - defaults to no profile              |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

``` shell
unite clientPackage --operation=add --packageName=moment

unite clientPackage --operation=add --packageName=moment --version=2.0.0 --preload

unite clientPackage --operation=add --packageName=rxjs --main=*

unite clientPackage --operation=add --packageName=sinon --includeMode=test

unite clientPackage --operation=add --packageName=@angular/core --includeMode=both --testingAdditions=@angular/core/testing=bundles/core-testing.umd.js

unite clientPackage --operation=add --packageName=requirejs-text --includeMode=both --map=text=requirejs-text --loaders=*.html=text;*.css=text

unite clientPackage --operation=add --packageName=font-awesome --assets=css/**/*;fonts/**/*

unite clientPackage --operation=add --packageName=bootstrap --version=4.0.0-beta --noScript
```

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

# Example

``` shell
unite clientPackage --operation=remove --packageName=moment
```

## unite platform

Perform operations to add or remove platforms. This provides tasks that allow you to wrap your web application for different platforms.

Once you have added a platform you can manually edit your unite.json to specify other options for the platform packaging, see the [Platforms](https://github.com/unitejs/engine/blob/master/assets/README.md#platforms) section. If you don't specify any platforms the packager will try and identify your current platform/architecture and create a package accordingly.

### --operation=add

This will add a new platform and modify all the necessary configuration files to include it in your app.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | add                                       |                                                  |
| platformName        | Web/Electron                              | Name of the platform to add                      |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

``` shell
unite platform --operation=add --platformName=Web
```

### --operation=remove

This will remove an existing platform and modify all the necessary configuration files to remove it from your app.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| operation           | remove                                    |                                                  |
| platformName        | Web/Electron                              | Name of the platform to remove                   |
| outputDirectory     | 'path'                                    | Location of the unite.json from configure        |
|                     |                                           |   optional - defaults to current directory       |

# Example

``` shell
unite platform --operation=remove --platformName=Electron
```

## global arguments

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| noColor             |                                           | If this is used no color will appear in output   |
|                     |                                           |   optional - defaults to on                      |
| logFile             | 'filename'                                | The log file to store the logging in             |
|                     |                                           |   optional - default to no file logging          |

# Generated App

For more information on the generated app see [Generated App](https://github.com/unitejs/engine/blob/master/assets/README.md)

# <a name="configprofiles"></a>Configuration Profiles

The following configuration profiles are currently available, they provide a set of defaults recommended by the application framework providers.

* AngularJavaScript
* AngularTypeScript
* AureliaJavaScript
* AureliaTypeScript
* PreactJavaScript
* PreactTypeScript
* ReactJavaScript
* ReactTypeScript
* VueJavaScript
* VueTypeScript

# <a name="clientpackageprofiles"></a>Client Package Profiles

The following clientPackage profiles are currently available, they provide a set of defaults for the libraries.

* font-awesome
* bootstrap4
* bluebird
* primsjs
* rxjs

# Frameworks

Although we try to support all the different framework and tool combinations this is not always possible.

## <a name="ng"></a>Angular

Angular does not currently support bundling with RequireJS because there is no longer an AMD build of RXJS in modular form.

## <a name="au"></a>Aurelia

Aurelia does not currently support bundling with Browserify or Webpack.

## <a name="pa"></a>Plain App

This is a vanilla app with no framework libraries included.

## <a name="pr"></a>Preact

Preact can only be used with CommonJS module type as there is currently no UMD build of the library.

## <a name="re"></a>React

Nothing else to mention at the moment.

## <a name="vu"></a>Vue

The 'Vue' way of combining all your source/view/style in to one .vue file is **not** currently supported due to the granular way in which the build is performed. Instead you should import your .css and .vue files as shown below:

``` javascript
import "./my-component.css";

@Component({
    "template": "./my-component.vue"
})
export class MyComponent extends Vue {
}
```

If the template property looks like a file path the .vue file will be imported and compiled, all the content in your .vue file apart from that enclosed in the &lt;template&gt;...&lt;/template&gt; tags will be ignored by the build process.

Regular inline templates of course will also still work and will be compiled as well.

Scoped css is **not** supported due to the different loading mechanism. Other style formats less, sass and stylus are built to a css file for the component during the normal build process so you should always import the .css file in your code file.

Vue 2.5.0 can not yet be used due to the way the module compilation has changed, although this change was to improve TypeScript support it also breaks the behaviour of default exports when used with other module loaders. This is actually an issue with the TypeScript compiler which should be addressed in the TypeScript 2.7 release [https://github.com/Microsoft/TypeScript/issues/19168](https://github.com/Microsoft/TypeScript/issues/19168) and more specifically Issue [#16093](https://github.com/Microsoft/TypeScript/issues/16093).

# Unit Test Runners

## <a name="jest"></a>Jest

Jest currently only supports projects using CommonJS as the module type and Jasmine as the unit test framework.

## <a name="karma"></a>Karma

Although JSDom can be used with Karma there are limitations, see the [JSDom](https://github.com/tmpvar/jsdom#readme) home page for more info.

# Disclaimer

UniteJS currently has about 160 dependencies on the libraries it uses to generate the app, while we endeavour to make sure that every combination works it goes without saying that from time to time something will break. Just let us know in the [Issues](https://github.com/unitejs/cli/issues) and we will get it fixed ASAP.

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
