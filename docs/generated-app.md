# Generated App

The main contents of the application are in the www folder, it is created this way to allow for platform packaged versions at a higher level.

The following pre-requisities are needed

    npm -g install gulp [or] yarn global add gulp

Once the above pre-requisites are installed you can install the npm packages for the app by running the gulp commands from the www folder.

    npm install [or] yarn install

## Gulp Tasks

The following gulp commands are available for the app.

* build
* theme-build
* unit [optional]
* unit-ui [optional]
* e2e-install [optional]
* e2e [optional]
* serve
* version
* platform-web-package [optional]
* platform-electron-package [optional]

### build
This will transpile and build the app.

You can specify a buildConfiguration with the following syntax:

    gulp build --buildConfiguration=prod

### theme-build
You will probably need to run this task at least once to generate the necessary favicon images and meta tags. See [Theme Assets](#themeassets) for more details.

### unit
This will run unit tests for the app and generate unit and coverage reports in the test/reports folder. This task is only available if you specified a unit test runner and framework during configuration.

You can run just a subset of tests by providing a source name as follows.

    gulp unit --grep=app

### unit-ui
This will run unit tests for the app inside a browser to make it easier to debug. This task is only available if you specified a unit test runner and framework during configuration.

You can run just a subset of tests by providing a source name as follows.

    gulp unit --grep=app

### e2e-install
This will install all the necessary components required for the e2e tests, it need only be run once. This task is only available if you specified an e2e test runner and framework during configuration.

### e2e
This will run e2e tests for the app and generate reports in the test/reports folder. This task is only available if you specified an e2e test runner and framework during configuration.

You can run just a subset of tests by providing a source name as follows.

    gulp e2e --grep=app

You can specify that the tests are run over https or on a different port using the switches

    gulp e2e --secure --port=5000

You can also run the tests on a different browser from the default chrome by using

    gulp e2e --browser=[chrome/firefox/ie/edge]


### serve
This will serve the app for you to view in a browser.

You can specify that the content is served over https or on a different port using the switches

    gulp serve --secure --port=5000

### version
This will allow you to update the package version.

Running this task with no parameters will show the current version, alternatively use the following parameters.

    --part=[major, minor, patch] - the part of the version you want to modify
    --mode=[set, inc] - set the part to a specific value or increment the current value
    --value=someValue - required if you use the set mode

    Examples
    gulp version
    gulp version --part=patch --mode=inc
    gulp version --part=minor --mode=set --value=1

### platform-web-package
This task will gather all the necessary components of the application and create a folder in the top level packaged directory named ${version}/web.
This folder contains a complete set of web deployable files for the application. A zip file named packaged/${version}_web.zip will also be created in the packaged directory.
For configuring options for this task see the [Platforms](#platforms) section.

### platform-electron-package
This task will gather all the necessary components of the application and create a folder in the top level packaged directory named ${version}/electron.
This folder will then be used to create a set of platform/architecture electron packages in folders named ${version}/electron_${platform}_${architecture} and a corresponding zip file in the packaged root folder.
For configuring options for this task see the [Platforms](#platforms) section.

## <a name="themeassets"></a>Theme Assets

During the app generation 3 files will have been created, if you change any of them then you should run the task again.

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

## <a name="platforms"></a>Platforms

If you manually edit your unite.json, you can add additional options for the platform settings.

### Web

There are currently no other options for this platform.

### Electron

For more information about the options see the [Electron Documentation](https://github.com/electron-userland/electron-packager#readme)

You can choose to use a specific version of the Electron runtime, if not specified it default to the most recent stable version see [Electron Releases](https://github.com/electron/electron/releases).

You can specify one or more of the platform architecture combinations, if this is not specified it defaults to win32/ia32:

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
