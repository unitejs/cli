# Core

## General

* Convert gulp script from JavaScript to TypeScript with compilation to improve resiliency
* Create source/unit/e2e tests from descriptor language to avoid repetition and possibly easier introduction of other languages (vscode snippet format ?)

## Engine Pipeline

* Make pluggable from other npm modules
* Separate the application framework pipeline steps into their own repos

# App Frameworks

* Add native Web Components
* Add [Ember](https://www.emberjs.com/) When it supports TypeScript ?
* [Aurelia](http://aurelia.io/) Add Webpack bundling - module resolution is currently too flaky as of 2.0.0-rc.5

# Module Types

* Add ES6 as a module type (long term), browser support not yet solidified
* Find a way to make RequireJS bundled version work with mapped modules e.g. polymer/rxjs

# CI

## General

* Add shields to readme file

## Build

* Add [Travis](https://travis-ci.org/) integration
* Add [Circle](https://circleci.com/) integration
* Add [Appveyor](https://www.appveyor.com/) integration
* Add [Jenkins](https://jenkins.io/) integration
* Add [TeamCity](https://www.jetbrains.com/teamcity/) integration
* Add [Visual Studio Online](https://www.visualstudio.com/vso/) integration

## Test

* Add [Coveralls](https://coveralls.io/)

# Platform

# Code

## Source Languages

* Add [Coffee Script](http://coffeescript.org/)
* Add [Flow](https://flow.org/)

# Code Linting

* Add [JSHint](http://jshint.com/)
* Add [JSLint](http://jslint.com/)

## CSS Linting

* Add [stylelint](https://stylelint.io/)
* Add [sass-lint](https://github.com/sasstools/sass-lint)
* Add [less-hint](https://github.com/lesshint/lesshint)
* Add [stylint](https://github.com/SimenB/stylint)

## Code Style

* Add [Prettier](https://prettier.io/)
* Add [Beautify](https://github.com/beautify-web/js-beautify)

## Bundlers

* Add [Rollup](https://rollupjs.org/) (No RequireJS Support)

## Build Engine

* Add [NPM scripts](https://docs.npmjs.com/misc/scripts)
* Add [Gulp 4](https://github.com/gulpjs/gulp/tree/4.0)

## Documentation

* Add [JSDoc](http://usejsdoc.org/)
* Add [ESDoc](https://esdoc.org/)

# Test

Unit Testing add custom setup script than can do things like disable development mode for Vue warning.

## Test Frameworks

* Add [Wallaby](https://wallabyjs.com/) (Requires License)
* Support [Jest](https://facebook.github.io/jest/) watch option

## Unit Testing

* Add [QUnit](https://qunitjs.com/)
* Add report zipping/deployment

## E2E Testing

* Add selenium remote testing for use with CI
* Protractor read existing config and modify

## E2E Test Runner

* Add [Nightwatch](http://nightwatchjs.org/)
* Add [Cypress](https://www.cypress.io/)

## E2E Frameworks

* Add [Cucumber](https://cucumber.io/)
* Change Webdriver - Allure reports need screenshots

# IDE Integration

* Add WebStorm
* Add VSCode tasks/launch etc

# Client Package Profiles

* Common libraries
  * lodash
  * underscore
  * jquery
  * sinon
