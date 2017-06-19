# UniteJS CLI
Command line interface to the UniteJS JavaScript framework management tool.

This will generate a scaffold app with the options you specify.

# Install

Unite is best installed as a global package

    npm install -g unitejs-cli

# Usage

    unitejs-cli "command" [args0] [args1] ... [argsn]

## Command init

If there is already a unite.json in the outputDirectory then all of the arguments are optional.

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| --packageName       | Plain text, package.json name rules apply | Name to be used for your package                 |
| --title             | Plain text                                | Used on the web index page                       |
| --sourceLanguage    | JavaScript/TypeScript                     | The language you want to code in                 |
| --moduleLoader      | RequireJS/SystemJS/Webpack                | The module loader you want to use                |
| --unitTestRunner    | Karma/None (for no unit testing)          | The unit test runner                             |
| --unitTestFramework | Jasmine/Mocha-Chai                        | The unit test framework to use                   |
| --outputDirectory   | "path"                                    | The location that you want the package generated |
|                     |                                           | optional - defaults to current directory         |

# Example

unitejs-cli init --packageName=test-typescript-requirejs-jasmine --title="Test TypeScript Jasmine RequireJS" --sourceLanguage=TypeScript --moduleLoader=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --outputDirectory=c:\unite\test-typescript-requirejs-jasmine

## Command clientPackage

Perform operations on client packages.

### Add

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| --operation         | add                                       |                                                  |
| --packageName       | Plain text                                | Name of the package to add                       |
| --version           | 1.23.4 [optional]                         | Fixed version to install, or optional defaults   |
|                     |                                           | to latest                                        |
| --preload           | [optional]                                | Should the package be preloaded at app startup   |
| --includeMode       | app | test | both                         | When should the package be loaded                |
|                     |                                           | optional - defaults to both                      |
| --packageManager    | npm/yarn [optional]                       | The package manager to use for the add           |
| --outputDirectory   | "path"                                    | Location of the unite.json generated from init   |
|                     |                                           | optional - defaults to current directory         |

# Example

unitejs-cli clientPackage --operation=add --packageName=moment

unitejs-cli clientPackage --operation=add --packageName=moment --version=2.0.0

### --operation=remove

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| --operation         | remove                                    |                                                  |
| --packageName       | Plain text                                | Name of the package to remove                    |
| --packageManager    | npm/yarn [optional]                       | The package manager to use for the remove        |
| --outputDirectory   | "path"                                    | Location of the unite.json generated from init   |
|                     |                                           | optional - defaults to current directory         |

# Example

unitejs-cli clientPackage --operation=remove --packageName=moment

## global arguments

| Argument            | Value                                     | Used For                                         |
|---------------------|-------------------------------------------|--------------------------------------------------|
| --logLevel          | 0/1 = no logging/logging                  | The level of logging to generate                 |
| --logFile           | "filename"                                | The log file to store the logging in             |
|                     | default = unite.log                       |                                                  |

# Scaffold App

The following pre-requisities are needed

    npm install -g gulp

Once the above are installed you can install the npm packages for the scaffold app with

    npm install


The following gulp commands are then available for the scaffold app.

* build
* unit

### build
This will transpile and build the app.

### unit

This will run unit tests for the app and generate unit and coverage reports in the reports folder.
