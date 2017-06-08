# UniteJS CLI
Command line interface to the UniteJS JavaScript framework management tool.

# Install

Unite is best installed as a global package

npm install -g unitejs-cli

# Usage

unitejs-cli &lt;command&gt; [args0] [args1] ... [argsn]

## Command init

--packageName
Name to be used for your package.
Plain text, package.json name rules apply

--title
Used on the web index page
Plain text

--sourceLanguage
The language you want to write in
* JavaScript
* TypeScript

--moduleLoader
The module loader you want to use
* RequireJS
* SystemJS
* Webpack

--unitTestRunner
The unit test runner
* Karma
* None (for no unit testing)

--unitTestFramework
The unit test framework to use
* Jasmine
* Mocha-Chai

--outputDirectory
The location that you want the package generated

## global arguments

--logLevel
The level of logging to generate
* 0 = no logging (default)
* 1 = logging

--logFile
The log file to store the logging in
default is unite.log

# Example

unitejs-cli init --packageName=test-typescript-requirejs-jasmine --title="Test TypeScript Jasmine RequireJS" --sourceLanguage=TypeScript --moduleLoader=RequireJS --unitTestRunner=Karma --unitTestFramework=Jasmine --outputDirectory=c:\unite\test-typescript-requirejs-jasmine