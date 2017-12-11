"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for CLI.
 */
const Chai = require("chai");
const Sinon = require("sinon");
const commandLineParser_1 = require("unitejs-cli-core/dist/commandLineParser");
const fileSystem_1 = require("unitejs-cli-core/dist/fileSystem");
const packageUtils_1 = require("unitejs-engine/dist/pipelineSteps/packageUtils");
const cli_1 = require("../../../dist/cli");
describe("CLI", () => {
    let sandbox;
    let loggerStub;
    let fileSystemStub;
    let commandLineParser;
    let loggerInfoSpy;
    let loggerBannerSpy;
    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = {};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };
        fileSystemStub = new fileSystem_1.FileSystem();
        loggerInfoSpy = sandbox.spy(loggerStub, "info");
        loggerBannerSpy = sandbox.spy(loggerStub, "banner");
        commandLineParser = new commandLineParser_1.CommandLineParser();
        sandbox.stub(packageUtils_1.PackageUtils, "exec").resolves("{}");
    });
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        sandbox.restore();
        yield fileSystemStub.directoryDelete("./test/unit/temp");
    }));
    it("can be created", () => {
        const obj = new cli_1.CLI();
        Chai.should().exist(obj);
    });
    describe("handleCustomCommand", () => {
        it("can fail with unknown command", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["unknown"]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(-1);
        }));
        it("can handle configure", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "configure",
                "--packageName=test-app",
                "--title=\"Test App\"",
                "--license=MIT",
                "--sourceLanguage=JavaScript",
                "--moduleType=AMD",
                "--bundler=RequireJS",
                "--unitTestRunner=Karma",
                "--unitTestFramework=Jasmine",
                "--unitTestEngine=ChromeHeadless",
                "--e2eTestRunner=Protractor",
                "--e2eTestFramework=Jasmine",
                "--linter=ESLint",
                "--cssPre=Sass",
                "--cssPost=None",
                "--cssLinter=None",
                "--documenter=None",
                "--appFramework=Vanilla",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail configure with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "configure",
                "--packageName=test-app",
                "--title=\"Test App\"",
                "--license=MIT",
                "--sourceLanguage=JavaScript",
                "--moduleType=AMD",
                "--bundler=RequireJS",
                "--unitTestRunner=Karma",
                "--unitTestFramework=Jasmine",
                "--unitTestEngine=ChromeHeadless",
                "--e2eTestRunner=Protractor",
                "--e2eTestFramework=Jasmine",
                "--linter=JSLint",
                "--cssPre=Sass",
                "--cssPost=None",
                "--cssLinter=None",
                "--documenter=None",
                "--appFramework=Vanilla",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle clientPackage", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/node_modules/.bin/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {
                packageManager: "npm"
            });
            yield fileSystemStub.fileWriteText("./test/unit/temp/www/node_modules/.bin/", "npm.cmd", "");
            yield fileSystemStub.fileWriteText("./test/unit/temp/www/node_modules/.bin/", "npm", "");
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "clientPackage",
                "--operation=add",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail clientPackage with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "clientPackage",
                "--operation=add",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle buildConfiguration", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "buildConfiguration",
                "--operation=add",
                "--configurationName=prod",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail buildConfiguration with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "buildConfiguration",
                "--operation=add",
                "--configurationName=prod",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle platform", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/");
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/assetsSrc/theme/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", { packageManager: "npm" });
            yield fileSystemStub.fileWriteJson("./test/unit/temp/www/", "package.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "platform",
                "--operation=add",
                "--platformName=electron",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail platform with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {});
            yield fileSystemStub.fileWriteJson("./test/unit/temp/www/", "package.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "platform",
                "--operation=add",
                "--platformName=electron",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle generate", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {
                applicationFramework: "Vanilla",
                unitTestFramework: "Jasmine",
                dirs: {
                    wwwRoot: "./www/",
                    www: {
                        src: "./src/"
                    }
                },
                sourceExtensions: [
                    "ts"
                ]
            });
            yield fileSystemStub.fileWriteJson("./test/unit/temp/www/", "package.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "generate",
                "--name=test",
                "--type=class",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/www/src/", "test.ts");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail generate with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "generate",
                "--name=test",
                "--type=class",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle package", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/www/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {
                applicationFramework: "Vanilla",
                moduleType: "CommonJs",
                packageManager: "Npm",
                dirs: {
                    wwwRoot: "./www/",
                    www: {
                        src: "./src/"
                    }
                },
                sourceExtensions: [
                    "ts"
                ]
            });
            yield fileSystemStub.fileWriteJson("./test/unit/temp/www/", "package.json", {});
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "package",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/www/src/examples/", "example-moment.ts");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail package with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            yield fileSystemStub.directoryCreate("./test/unit/temp/");
            yield fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {
                applicationFramework: "Vanilla",
                moduleType: "CommonJs",
                packageManager: "Npm",
                dirs: {
                    wwwRoot: "./www/",
                    www: {
                        src: "./src/"
                    }
                },
                sourceExtensions: [
                    "ts"
                ]
            });
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "package",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
    });
    describe("displayHelp", () => {
        it("can display help", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            const res = obj.displayHelp(loggerStub);
            Chai.expect(res).to.be.equal(0);
            Chai.expect(loggerInfoSpy.called).to.be.equal(true);
        }));
    });
    describe("displayAdditionalVersion", () => {
        it("can display engine version", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            yield obj.initialise(loggerStub, fileSystemStub);
            obj.displayAdditionalVersion(loggerStub);
            Chai.expect(/Engine v(\d*)\.(\d*)\.(\d*)/.test(loggerBannerSpy.args[0][loggerBannerSpy.args.length - 1])).to.be.equal(true);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdW5pdC9zcmMvY2xpLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwrRUFBNEU7QUFDNUUsaUVBQThEO0FBQzlELGlGQUE4RTtBQUc5RSwwQ0FBdUM7QUFFdkMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7SUFDakIsSUFBSSxPQUEyQixDQUFDO0lBQ2hDLElBQUksVUFBbUIsQ0FBQztJQUN4QixJQUFJLGNBQTJCLENBQUM7SUFDaEMsSUFBSSxpQkFBb0MsQ0FBQztJQUN6QyxJQUFJLGFBQTZCLENBQUM7SUFDbEMsSUFBSSxlQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLGNBQWMsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUVsQyxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXBELGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztRQUU1QyxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUFZLEVBQUUsTUFB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QUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hJLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNsaS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0cyBmb3IgQ0xJLlxuICovXG5pbXBvcnQgKiBhcyBDaGFpIGZyb20gXCJjaGFpXCI7XG5pbXBvcnQgKiBhcyBTaW5vbiBmcm9tIFwic2lub25cIjtcbmltcG9ydCB7IENvbW1hbmRMaW5lUGFyc2VyIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9jb21tYW5kTGluZVBhcnNlclwiO1xuaW1wb3J0IHsgRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWNsaS1jb3JlL2Rpc3QvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgUGFja2FnZVV0aWxzIH0gZnJvbSBcInVuaXRlanMtZW5naW5lL2Rpc3QvcGlwZWxpbmVTdGVwcy9wYWNrYWdlVXRpbHNcIjtcbmltcG9ydCB7IElGaWxlU3lzdGVtIH0gZnJvbSBcInVuaXRlanMtZnJhbWV3b3JrL2Rpc3QvaW50ZXJmYWNlcy9JRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gXCJ1bml0ZWpzLWZyYW1ld29yay9kaXN0L2ludGVyZmFjZXMvSUxvZ2dlclwiO1xuaW1wb3J0IHsgQ0xJIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9jbGlcIjtcblxuZGVzY3JpYmUoXCJDTElcIiwgKCkgPT4ge1xuICAgIGxldCBzYW5kYm94OiBTaW5vbi5TaW5vblNhbmRib3g7XG4gICAgbGV0IGxvZ2dlclN0dWI6IElMb2dnZXI7XG4gICAgbGV0IGZpbGVTeXN0ZW1TdHViOiBJRmlsZVN5c3RlbTtcbiAgICBsZXQgY29tbWFuZExpbmVQYXJzZXI6IENvbW1hbmRMaW5lUGFyc2VyO1xuICAgIGxldCBsb2dnZXJJbmZvU3B5OiBTaW5vbi5TaW5vblNweTtcbiAgICBsZXQgbG9nZ2VyQmFubmVyU3B5OiBTaW5vbi5TaW5vblNweTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBzYW5kYm94ID0gU2lub24uc2FuZGJveC5jcmVhdGUoKTtcbiAgICAgICAgbG9nZ2VyU3R1YiA9IDxJTG9nZ2VyPnt9O1xuICAgICAgICBsb2dnZXJTdHViLmJhbm5lciA9ICgpID0+IHsgfTtcbiAgICAgICAgbG9nZ2VyU3R1Yi5pbmZvID0gKCkgPT4geyB9O1xuICAgICAgICBsb2dnZXJTdHViLndhcm5pbmcgPSAoKSA9PiB7IH07XG4gICAgICAgIGxvZ2dlclN0dWIuZXJyb3IgPSAoKSA9PiB7IH07XG5cbiAgICAgICAgZmlsZVN5c3RlbVN0dWIgPSBuZXcgRmlsZVN5c3RlbSgpO1xuXG4gICAgICAgIGxvZ2dlckluZm9TcHkgPSBzYW5kYm94LnNweShsb2dnZXJTdHViLCBcImluZm9cIik7XG4gICAgICAgIGxvZ2dlckJhbm5lclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiYmFubmVyXCIpO1xuXG4gICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyID0gbmV3IENvbW1hbmRMaW5lUGFyc2VyKCk7XG5cbiAgICAgICAgc2FuZGJveC5zdHViKFBhY2thZ2VVdGlscywgXCJleGVjXCIpLnJlc29sdmVzKFwie31cIik7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5RGVsZXRlKFwiLi90ZXN0L3VuaXQvdGVtcFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIGNyZWF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgIENoYWkuc2hvdWxkKCkuZXhpc3Qob2JqKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiaGFuZGxlQ3VzdG9tQ29tbWFuZFwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGZhaWwgd2l0aCB1bmtub3duIGNvbW1hbmRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1widW5rbm93blwiXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBjb25maWd1cmVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY29uZmlndXJlXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPXRlc3QtYXBwXCIsXG4gICAgICAgICAgICAgICAgXCItLXRpdGxlPVxcXCJUZXN0IEFwcFxcXCJcIixcbiAgICAgICAgICAgICAgICBcIi0tbGljZW5zZT1NSVRcIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlTGFuZ3VhZ2U9SmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgICAgIFwiLS1tb2R1bGVUeXBlPUFNRFwiLFxuICAgICAgICAgICAgICAgIFwiLS1idW5kbGVyPVJlcXVpcmVKU1wiLFxuICAgICAgICAgICAgICAgIFwiLS11bml0VGVzdFJ1bm5lcj1LYXJtYVwiLFxuICAgICAgICAgICAgICAgIFwiLS11bml0VGVzdEZyYW1ld29yaz1KYXNtaW5lXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0RW5naW5lPUNocm9tZUhlYWRsZXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLWUyZVRlc3RSdW5uZXI9UHJvdHJhY3RvclwiLFxuICAgICAgICAgICAgICAgIFwiLS1lMmVUZXN0RnJhbWV3b3JrPUphc21pbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tbGludGVyPUVTTGludFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQcmU9U2Fzc1wiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQb3N0PU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tY3NzTGludGVyPU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tZG9jdW1lbnRlcj1Ob25lXCIsXG4gICAgICAgICAgICAgICAgXCItLWFwcEZyYW1ld29yaz1WYW5pbGxhXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KGZpbGVFeGlzdHMpLnRvLmJlLmVxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIGNvbmZpZ3VyZSB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJjb25maWd1cmVcIixcbiAgICAgICAgICAgICAgICBcIi0tcGFja2FnZU5hbWU9dGVzdC1hcHBcIixcbiAgICAgICAgICAgICAgICBcIi0tdGl0bGU9XFxcIlRlc3QgQXBwXFxcIlwiLFxuICAgICAgICAgICAgICAgIFwiLS1saWNlbnNlPU1JVFwiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VMYW5ndWFnZT1KYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgXCItLW1vZHVsZVR5cGU9QU1EXCIsXG4gICAgICAgICAgICAgICAgXCItLWJ1bmRsZXI9UmVxdWlyZUpTXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0UnVubmVyPUthcm1hXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0RnJhbWV3b3JrPUphc21pbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tdW5pdFRlc3RFbmdpbmU9Q2hyb21lSGVhZGxlc3NcIixcbiAgICAgICAgICAgICAgICBcIi0tZTJlVGVzdFJ1bm5lcj1Qcm90cmFjdG9yXCIsXG4gICAgICAgICAgICAgICAgXCItLWUyZVRlc3RGcmFtZXdvcms9SmFzbWluZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1saW50ZXI9SlNMaW50XCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1ByZT1TYXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1Bvc3Q9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NMaW50ZXI9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1kb2N1bWVudGVyPU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tYXBwRnJhbWV3b3JrPVZhbmlsbGFcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIGNsaWVudFBhY2thZ2VcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5Q3JlYXRlKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvbm9kZV9tb2R1bGVzLy5iaW4vXCIpO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlSnNvbihcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiLCB7XG4gICAgICAgICAgICAgICAgcGFja2FnZU1hbmFnZXI6IFwibnBtXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlVGV4dChcIi4vdGVzdC91bml0L3RlbXAvd3d3L25vZGVfbW9kdWxlcy8uYmluL1wiLCBcIm5wbS5jbWRcIiwgXCJcIik7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVUZXh0KFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvbm9kZV9tb2R1bGVzLy5iaW4vXCIsIFwibnBtXCIsIFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY2xpZW50UGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1vcGVyYXRpb249YWRkXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPW1vbWVudFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDApO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gZmFpbCBjbGllbnRQYWNrYWdlIHdpdGggdW5rbm93biBhcmdzXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImNsaWVudFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wYWNrYWdlTmFtZT1tb21lbnRcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIGJ1aWxkQ29uZmlndXJhdGlvblwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5kaXJlY3RvcnlDcmVhdGUoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiKTtcbiAgICAgICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVXcml0ZUpzb24oXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIiwge30pO1xuXG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJidWlsZENvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jb25maWd1cmF0aW9uTmFtZT1wcm9kXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KGZpbGVFeGlzdHMpLnRvLmJlLmVxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIGJ1aWxkQ29uZmlndXJhdGlvbiB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJidWlsZENvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jb25maWd1cmF0aW9uTmFtZT1wcm9kXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvbWVBcmc9Zm9vXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBwbGF0Zm9ybVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5kaXJlY3RvcnlDcmVhdGUoXCIuL3Rlc3QvdW5pdC90ZW1wL3d3dy9cIik7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5kaXJlY3RvcnlDcmVhdGUoXCIuL3Rlc3QvdW5pdC90ZW1wL3d3dy9hc3NldHNTcmMvdGhlbWUvXCIpO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlSnNvbihcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiLCB7IHBhY2thZ2VNYW5hZ2VyOiBcIm5wbVwifSk7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVKc29uKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvXCIsIFwicGFja2FnZS5qc29uXCIsIHt9KTtcblxuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwicGxhdGZvcm1cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wbGF0Zm9ybU5hbWU9ZWxlY3Ryb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgcGxhdGZvcm0gd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5Q3JlYXRlKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvXCIpO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlSnNvbihcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiLCB7fSk7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVKc29uKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvXCIsIFwicGFja2FnZS5qc29uXCIsIHt9KTtcblxuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwicGxhdGZvcm1cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wbGF0Zm9ybU5hbWU9ZWxlY3Ryb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIGdlbmVyYXRlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmRpcmVjdG9yeUNyZWF0ZShcIi4vdGVzdC91bml0L3RlbXAvd3d3L1wiKTtcbiAgICAgICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVXcml0ZUpzb24oXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIiwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uRnJhbWV3b3JrOiBcIlZhbmlsbGFcIixcbiAgICAgICAgICAgICAgICB1bml0VGVzdEZyYW1ld29yazogXCJKYXNtaW5lXCIsXG4gICAgICAgICAgICAgICAgZGlyczoge1xuICAgICAgICAgICAgICAgICAgICB3d3dSb290OiBcIi4vd3d3L1wiLFxuICAgICAgICAgICAgICAgICAgICB3d3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCIuL3NyYy9cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3VyY2VFeHRlbnNpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidHNcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlSnNvbihcIi4vdGVzdC91bml0L3RlbXAvd3d3L1wiLCBcInBhY2thZ2UuanNvblwiLCB7fSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImdlbmVyYXRlXCIsXG4gICAgICAgICAgICAgICAgXCItLW5hbWU9dGVzdFwiLFxuICAgICAgICAgICAgICAgIFwiLS10eXBlPWNsYXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvd3d3L3NyYy9cIiwgXCJ0ZXN0LnRzXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgZ2VuZXJhdGUgd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5Q3JlYXRlKFwiLi90ZXN0L3VuaXQvdGVtcC9cIik7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVKc29uKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIsIHt9KTtcblxuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiZ2VuZXJhdGVcIixcbiAgICAgICAgICAgICAgICBcIi0tbmFtZT10ZXN0XCIsXG4gICAgICAgICAgICAgICAgXCItLXR5cGU9Y2xhc3NcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIHBhY2thZ2VcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5Q3JlYXRlKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvXCIpO1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVdyaXRlSnNvbihcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiLCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25GcmFtZXdvcms6IFwiVmFuaWxsYVwiLFxuICAgICAgICAgICAgICAgIG1vZHVsZVR5cGU6IFwiQ29tbW9uSnNcIixcbiAgICAgICAgICAgICAgICBwYWNrYWdlTWFuYWdlcjogXCJOcG1cIixcbiAgICAgICAgICAgICAgICBkaXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHd3d1Jvb3Q6IFwiLi93d3cvXCIsXG4gICAgICAgICAgICAgICAgICAgIHd3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi4vc3JjL1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvdXJjZUV4dGVuc2lvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0c1wiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVKc29uKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvXCIsIFwicGFja2FnZS5qc29uXCIsIHt9KTtcblxuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwicGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1wYWNrYWdlTmFtZT1tb21lbnRcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC93d3cvc3JjL2V4YW1wbGVzL1wiLCBcImV4YW1wbGUtbW9tZW50LnRzXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgcGFja2FnZSB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5kaXJlY3RvcnlDcmVhdGUoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiKTtcbiAgICAgICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVXcml0ZUpzb24oXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIiwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uRnJhbWV3b3JrOiBcIlZhbmlsbGFcIixcbiAgICAgICAgICAgICAgICBtb2R1bGVUeXBlOiBcIkNvbW1vbkpzXCIsXG4gICAgICAgICAgICAgICAgcGFja2FnZU1hbmFnZXI6IFwiTnBtXCIsXG4gICAgICAgICAgICAgICAgZGlyczoge1xuICAgICAgICAgICAgICAgICAgICB3d3dSb290OiBcIi4vd3d3L1wiLFxuICAgICAgICAgICAgICAgICAgICB3d3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCIuL3NyYy9cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzb3VyY2VFeHRlbnNpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidHNcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJwYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPW1vbWVudFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiLFxuICAgICAgICAgICAgICAgIFwiLS1zb21lQXJnPWZvb1wiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiZGlzcGxheUhlbHBcIiwgKCkgPT4ge1xuICAgICAgICBpdChcImNhbiBkaXNwbGF5IGhlbHBcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gb2JqLmRpc3BsYXlIZWxwKGxvZ2dlclN0dWIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KGxvZ2dlckluZm9TcHkuY2FsbGVkKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcImRpc3BsYXlBZGRpdGlvbmFsVmVyc2lvblwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGRpc3BsYXkgZW5naW5lIHZlcnNpb25cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgb2JqLmRpc3BsYXlBZGRpdGlvbmFsVmVyc2lvbihsb2dnZXJTdHViKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KC9FbmdpbmUgdihcXGQqKVxcLihcXGQqKVxcLihcXGQqKS8udGVzdChsb2dnZXJCYW5uZXJTcHkuYXJnc1swXVtsb2dnZXJCYW5uZXJTcHkuYXJncy5sZW5ndGggLSAxXSkpLnRvLmJlLmVxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
