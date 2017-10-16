# Generated App

The main contents of the application are in the www folder, it is created this way to allow for platform and packaged versions folders in the root.

The following global pre-requisities are needed

    npm -g install gulp [or] yarn global add gulp

Once gulp is installed you can install the npm packages for the app by running the gulp commands from the www folder.

    npm install [or] yarn install

## Gulp Tasks

The following gulp commands are available for the app.

* build
* theme-build
* unit [optional]
* e2e-install [optional]
* e2e [optional]
* serve
* version
* platform-electron-dev [optional]
* platform-web-package [optional]
* platform-electron-package [optional]

### build

This will transpile and build the app ready to run.

    gulp build

You can specify a buildConfiguration (see the buildConfiguration command for details on how to add one) with the following syntax:

    gulp build --buildConfiguration=prod

If you don't want to keep running the build command you can add the watch switch, this will monitor for changes in source/views/styling and build whatever is required. This will perform an initial complete build to make sure it is error free, but will only run some of the sub tasks for changes. You should run a full build again before performing other tasks:

    gulp build --watch

### theme-build

You will need to run this task at least once to generate the necessary favicon images and meta tags. See [Theme Assets](#themeassets) for more details.

    gulp theme-build

### unit

This will run unit tests for the app and generate unit and coverage reports in the test/reports folder. This task is only available if you specified a unit test runner, framework and engine during configuration.

    gulp unit

You can run just a subset of tests by providing a source name as follows:

    gulp unit --grep=app

Or run in a browser (this will only work if the unit test runner is Karma) using:

    gulp unit --browser=[chrome/firefox/ie/safari]

If you don't want to keep running the full unit command you can add the watch switch, this will monitor for changes in source/views/styling and build whatever is required.

    gulp unit --watch

### e2e-install

This will install all the necessary components required for the e2e tests, it need only be run once. This task is only available if you specified an e2e test runner and framework during configuration.

    gulp e2e-install

### e2e

This will run e2e tests for the app and generate reports in the test/reports folder. This task is only available if you specified an e2e test runner and framework during configuration.

    gulp e2e

You can run just a subset of tests by providing a source name as follows:

    gulp e2e --grep=app

You can specify that the tests are run over https or on a different port using the switches:

    gulp e2e --secure --port=5000

You can also run the tests on a different browser from the default chrome by using:

    gulp e2e --browser=[chrome/firefox/ie/edge]

### serve

This will serve the app for you to view in a browser.

    gulp serve

You can specify that the content is served over https or on a different port using the switches:

    gulp serve --secure --port=5000

This command will also watch for changes in the files being served, rebuild them and then reload the browser.

### version

This will allow you to show or update the package version.

    gulp version

Running this task with no parameters will show the current version, alternatively use the following parameters to update the version:

    --part=[major, minor, patch] - the part of the version you want to modify
    --mode=[set, inc] - set the part to a specific value or increment the current value
    --value=someValue - required if you use the set mode

    gulp version --part=patch --mode=inc
    gulp version --part=minor --mode=set --value=1

### platform-electron-dev

This task will create development versions of the electron runtime that will wrap your www folder and allow you to develop in-situ.

    gulp platform-electron-dev

The platform development versions will be created in the ./platform/electron/{platform}-{architecture} folder, where the platforms and architectures are either read from your unite.json or automatically determined from you system.

### platform-web-package

This task will gather all the necessary components of the application and create a folder in the top level packaged directory named {version}/web.

    gulp platform-web-package

This folder contains a complete set of web deployable files for the application. A zip file named packaged/{version}_web.zip will also be created in the packaged directory.

To see which file are included in a packaged version see the [Platform Packaged Files](#platformpackagedfiles) section.

For configuring options for this task see the [Platform Web](#platformweb) section.

### platform-electron-package

This task will gather all the necessary components of the application and create a folder in the top level packaged directory named {version}/electron.

    gulp platform-electron-package

This folder will then be used to create a set of platform/architecture electron packages in folders named {version}/electron_{platform}_{architecture} and a corresponding zip file in the packaged root folder.

To see which file are included in a packaged version see the [Platform Packaged Files](#platformpackagedfiles) section.

For configuring options for this task see the [Platform Electron](#platformelectron) section.

---

## <a name="themeassets"></a>Theme Assets

During the app generation 3 files will have been created, if you change any of them then you should run the theme-build task again.

* assetsSource/theme/logo-tile.svg
* assetsSource/theme/logo-transparent.svg
* assetsSource/theme/unite-theme.json

The logo-tile.svg image should have a design that works well on a tile, e.g. a white icon with transparent background (the background color can be specified as part of the unite-theme.json configuration).

The logo-transparent.svg image should be a normal colored icon also on a transparent background, mostly used for the .ico image.

The fields in the unite-theme.json should be self explanatory in terms of what they generate in the index.html page. The themeHeaders will get overwritten when you run theme-build again so any custom headers you want should go in the customHeaders property. The backgroundColor is used for tile backgrounds and the themeColor is used to color the safari pinned icon mask.

    {
        "metaDescription": "Test CSS",
        "metaKeywords": [
            "Test",
            "CSS"
        ],
        "metaAuthor": "Unite JS",
        "customHeaders": [
            "<meta property=\"twitter:site\" content=\"@unitejs\">"
        ],
        "themeHeaders": [
            ... Generated by theme-build task
        ],
        "backgroundColor": "#339933",
        "themeColor": "#339933"
    }

## <a name="platformpackagedfiles"></a>Platform Packaged Files

The files included within each package are calculated from the list below:

* index.html
* dist/**/*
* css/**/*
* assets/**/*
* assetsSrc/root/**/* - These files will be recursively copied to the root of the packaged version
* client packages code that is script included in index.html
* client packages assets defined in unite.json clientPackages section

## Platforms Options

If you manually edit your unite.json, you can add additional options for the platform settings.

### <a name="platformweb"></a>Web

There are currently no other options for this platform.

### <a name="platformelectron"></a>Electron

For more information about the options see the [Electron Documentation](https://github.com/electron-userland/electron-packager#readme)

You can choose to use a specific version of the Electron runtime, if not specified it defaults to the most recent stable version see [Electron Releases](https://github.com/electron/electron/releases).

You can specify one or more of the platform architecture combinations, if you don't specify any platforms the packager will try and identify your current platform/architecture and create a package accordingly.

Any others keys in the Electron settings will be converted into -- params and passed to the packager, this allows for other options like those specific to the darwin/mas or win32 targets [Electron Usage](https://github.com/electron-userland/electron-packager/blob/master/usage.txt) to be used.

    "platforms": {
        "Electron": {
            "runtimeVersion": "1.7.5",
            "platformArch" : [
                "win32/ia32",
                "win32/x64",
                "darwin/x64",
                "mas/x64",
                "linux/ia32",
                "linux/x64",
                "linux/armv7l"
            ]
            ...
        }
    }

## Modifications To Generated Files

If you modify any of the files generated by UniteJS then you should remove the *Generated by UniteJS* comment at the bottom of the file. If you then call any of the UniteJS operations again your changes will be retained. Any files which are generated but can not contain comments because of their format (e.g. .json files) will where possible be combined with any changes you have made.

## Icon Modifications

Of course you don't need to run the theme-build task you could instead generate your own icons and headers using a site such as [RealFaviconGenerator](https://realfavicongenerator.net/) and copy the headers in to the customHeaders property and the icons wherever you like in your site. All credit goes to RealFaviconGenerator for the inspiration of the minimal set of resources need to satisfy modern browsers.
