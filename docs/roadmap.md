# Core

Items highlighted in **bold** are the next to be implemented.

## General

* Add root README.md info about www, packages, CI integration

## Profiles

* Add profiles to save lots of command line options for configure and clientPackages, also for App Framework with prefered defaults.

## Assets

* **Add additional assets that are copied to dist e.g. web.config, .well-known folder**

## Build Configurations

* Allow buildConfiguration variables to reference local file instead of embedded values in unite.json

## Client Packages

* **Add option to not include JavaScript e.g. Bootstrap 4 --noScript**

## Engine Pipeline

* Make pluggable from other npm modules
* **Build dependency tree so order doesn't matter**

## HTML Index

* **Generate script includes at build time not configure**
* Default progress indicator
* Meta tags author (use same info as licensing?)

## Tasks

* **Merge gulp unit-ui into gulp unit with arg --browser**
* **Add package view task so you can see which files get included in bundling**
* Build Watch with browser reload
* Unit Watch with browser reload if in UI mode
* CSS Watch with browser reload

## Licenses

* License file substitutions e.g. 'name of author', 'owner'

# App Frameworks

* Add [Vue](https://vuejs.org/)
* Add [Ember](https://www.emberjs.com/)
* Add [Backbone](http://backbonejs.org/)
* Add [Ionic](https://ionicframework.com/)
* Add [Polymer](https://www.polymer-project.org/)
* [Aurelia](http://aurelia.io/) (Add Webpack bundling)

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

* Add [Jest](https://facebook.github.io/jest/) (Only supports CommonJs)
* Add [Wallaby](https://wallabyjs.com/) (Requires License)
* **Karma read current config and modify not overwrite**
* **Karma generate include files at unit test time not configure**
* **Remove karma pipeline step during clientConfiguration commands**

## Unit Testing

* Add report deployment

## E2E Testing

* Add selenium remote testing for use with CI
* **Protractor read existing config and modify**

## E2E Test Runner

* Add [Nightwatch](http://nightwatchjs.org/)

## E2E Frameworks

* Add [Cucumber](https://cucumber.io/)
* Change Webdriver - Allure reports need screenshots

# IDE Integration

## VSCode Plugin

* Access the commands directly from VSCode, with repo lookup for common modules using profiles

# Examples

* Common libraries
  * moment
  * lodash
  * underscore
  * jquery
  * sinon
  * bluebird
  * bootstrap 3 & 4
  * font-awesome
