# Core

Items highlighted in **bold** are the highest priority features.

## General

* Add root README.md info about www, packages, CI integration
* Add JSON parser that can accept comments
* **Convert gulp scripts to TypeScript with compile steps**
* Create source/unit/e2e tests from descriptor language to avoid massive repetition

## Documentation

* Web site cheat sheet for other CLIs

## Assets

* Add additional assets that are copied to dist e.g. web.config, .well-known folder

## Build Configurations

* Allow buildConfiguration variables to reference local file instead of embedded values in unite.json

## Engine Pipeline

* **Make pluggable from other npm modules**

## Tasks

* Add package view task so you can see which files get included in bundling

## Licenses

* License file substitutions e.g. 'name of author', 'owner'

## HTML Index

* Default progress indicator
* Meta tags author (use same info as licensing?)

# App Frameworks

* Add [Preact](https://vuejs.org/)
* Add [Vue](https://vuejs.org/)
* Add [Ember](https://www.emberjs.com/)
* Add [Backbone](http://backbonejs.org/)
* Add [Ionic](https://ionicframework.com/)
* Add [Polymer](https://www.polymer-project.org/) Waiting for v3 so no more bower
* [Aurelia](http://aurelia.io/) (Add Webpack bundling - module resolution is currently too flaky as of 2.0.0-rc.5)

# CI

## General

* Add shields to readme file

## Build

* Add [Travis](https://travis-ci.org/)
* Add [Circle](https://circleci.com/)
* Add [Jenkins](https://jenkins.io/)
* Add [TeamCity](https://www.jetbrains.com/teamcity/)
* Add [Visual Studio Online](https://www.visualstudio.com/vso/)
* Add build number to window.unite variable
* Add build date/time to window.unite variable

## Test

* Add [Coveralls](https://coveralls.io/)

## Distribution

* Add [Docker](https://www.docker.com/)
* Add [Azure](https://azure.microsoft.com/en-gb/)

# Platform

## Wrappers

* Add [Cordova](https://cordova.apache.org/)
* Add Windows Universal App

# Code

## Source Languages

* Add [Coffee Script](http://coffeescript.org/)
* Add [Flow](https://flow.org/)

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

# Test

## Test Frameworks

* Add [Wallaby](https://wallabyjs.com/) (Requires License)
* Add [JsDom](https://github.com/tmpvar/jsdom)
* Support [Jest](https://facebook.github.io/jest/) watch option **

## Unit Testing

* Add report deployment

## E2E Testing

* **Add selenium remote testing for use with CI**
* Protractor read existing config and modify

## E2E Test Runner

* Add [Nightwatch](http://nightwatchjs.org/)

## E2E Frameworks

* Add [Cucumber](https://cucumber.io/)
* Change Webdriver - Allure reports need screenshots

# IDE Integration

* Add WebStorm

## VSCode Plugin

* Access the commands directly from VSCode, with repo lookup for common modules using profiles

# Profiles

* Common libraries
  * lodash
  * underscore
  * jquery
  * sinon
