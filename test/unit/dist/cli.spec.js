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
const defaultLogger_1 = require("unitejs-framework/dist/loggers/defaultLogger");
const cli_1 = require("../../../dist/cli");
describe("CLI", () => {
    let sandbox;
    let loggerStub;
    let fileSystemStub;
    let defaultLoggerStub;
    let commandLineParser;
    let loggerInfoSpy;
    let loggerErrorSpy;
    let loggerBannerSpy;
    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = {};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };
        fileSystemStub = new fileSystem_1.FileSystem();
        defaultLoggerStub = sandbox.stub(defaultLogger_1.DefaultLogger, "log");
        loggerInfoSpy = sandbox.spy(loggerStub, "info");
        loggerErrorSpy = sandbox.spy(loggerStub, "error");
        loggerBannerSpy = sandbox.spy(loggerStub, "banner");
        commandLineParser = new commandLineParser_1.CommandLineParser();
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
                "--unitTestRunner=None",
                "--e2eTestRunner=None",
                "--linter=ESLint",
                "--cssPre=Sass",
                "--cssPost=None",
                "--appFramework=PlainApp",
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
                "--unitTestRunner=None",
                "--e2eTestRunner=None",
                "--linter=JSLint",
                "--cssPre=Sass",
                "--cssPost=None",
                "--appFramework=PlainApp",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle clientPackage", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "clientPackage",
                "--operation=add",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
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
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "buildConfiguration",
                "--operation=add",
                "--configurationName=prod",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
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
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "platform",
                "--operation=add",
                "--platformName=electron",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
        }));
        it("can fail platform with unknown args", () => __awaiter(this, void 0, void 0, function* () {
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
            /* tslint:disable */
            console.log(loggerBannerSpy.args);
            Chai.expect(/Engine v(\d*)\.(\d*)\.(\d*)/.test(loggerBannerSpy.args[0][loggerBannerSpy.args.length - 1])).to.be.equal(true);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdW5pdC9zcmMvY2xpLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwrRUFBNEU7QUFDNUUsaUVBQThEO0FBRzlELGdGQUE2RTtBQUM3RSwyQ0FBd0M7QUFFeEMsUUFBUSxDQUFDLEtBQUssRUFBRTtJQUNaLElBQUksT0FBMkIsQ0FBQztJQUNoQyxJQUFJLFVBQW1CLENBQUM7SUFDeEIsSUFBSSxjQUEyQixDQUFDO0lBQ2hDLElBQUksaUJBQWtDLENBQUM7SUFDdkMsSUFBSSxpQkFBb0MsQ0FBQztJQUN6QyxJQUFJLGFBQTZCLENBQUM7SUFDbEMsSUFBSSxjQUE4QixDQUFDO0lBQ25DLElBQUksZUFBK0IsQ0FBQztJQUVwQyxVQUFVLENBQUM7UUFDUCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDOUIsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFN0IsY0FBYyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRWxDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2RCxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxD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TUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUN0QixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxvQkFBb0I7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEksQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiY2xpLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlc3RzIGZvciBDTEkuXG4gKi9cbmltcG9ydCAqIGFzIENoYWkgZnJvbSBcImNoYWlcIjtcbmltcG9ydCAqIGFzIFNpbm9uIGZyb20gXCJzaW5vblwiO1xuaW1wb3J0IHsgQ29tbWFuZExpbmVQYXJzZXIgfSBmcm9tIFwidW5pdGVqcy1jbGktY29yZS9kaXN0L2NvbW1hbmRMaW5lUGFyc2VyXCI7XG5pbXBvcnQgeyBGaWxlU3lzdGVtIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9maWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBJRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWZyYW1ld29yay9kaXN0L2ludGVyZmFjZXMvSUZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9pbnRlcmZhY2VzL0lMb2dnZXJcIjtcbmltcG9ydCB7IERlZmF1bHRMb2dnZXIgfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9sb2dnZXJzL2RlZmF1bHRMb2dnZXJcIjtcbmltcG9ydCB7IENMSSB9IGZyb20gXCIuLi8uLi8uLi9kaXN0L2NsaVwiO1xuXG5kZXNjcmliZShcIkNMSVwiLCAoKSA9PiB7XG4gICAgbGV0IHNhbmRib3g6IFNpbm9uLlNpbm9uU2FuZGJveDtcbiAgICBsZXQgbG9nZ2VyU3R1YjogSUxvZ2dlcjtcbiAgICBsZXQgZmlsZVN5c3RlbVN0dWI6IElGaWxlU3lzdGVtO1xuICAgIGxldCBkZWZhdWx0TG9nZ2VyU3R1YjogU2lub24uU2lub25TdHViO1xuICAgIGxldCBjb21tYW5kTGluZVBhcnNlcjogQ29tbWFuZExpbmVQYXJzZXI7XG4gICAgbGV0IGxvZ2dlckluZm9TcHk6IFNpbm9uLlNpbm9uU3B5O1xuICAgIGxldCBsb2dnZXJFcnJvclNweTogU2lub24uU2lub25TcHk7XG4gICAgbGV0IGxvZ2dlckJhbm5lclNweTogU2lub24uU2lub25TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc2FuZGJveCA9IFNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgICAgIGxvZ2dlclN0dWIgPSA8SUxvZ2dlcj57fTtcbiAgICAgICAgbG9nZ2VyU3R1Yi5iYW5uZXIgPSAoKSA9PiB7IH07XG4gICAgICAgIGxvZ2dlclN0dWIuaW5mbyA9ICgpID0+IHsgfTtcbiAgICAgICAgbG9nZ2VyU3R1Yi53YXJuaW5nID0gKCkgPT4geyB9O1xuICAgICAgICBsb2dnZXJTdHViLmVycm9yID0gKCkgPT4geyB9O1xuXG4gICAgICAgIGZpbGVTeXN0ZW1TdHViID0gbmV3IEZpbGVTeXN0ZW0oKTtcblxuICAgICAgICBkZWZhdWx0TG9nZ2VyU3R1YiA9IHNhbmRib3guc3R1YihEZWZhdWx0TG9nZ2VyLCBcImxvZ1wiKTtcblxuICAgICAgICBsb2dnZXJJbmZvU3B5ID0gc2FuZGJveC5zcHkobG9nZ2VyU3R1YiwgXCJpbmZvXCIpO1xuICAgICAgICBsb2dnZXJFcnJvclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiZXJyb3JcIik7XG4gICAgICAgIGxvZ2dlckJhbm5lclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiYmFubmVyXCIpO1xuXG4gICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyID0gbmV3IENvbW1hbmRMaW5lUGFyc2VyKCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5RGVsZXRlKFwiLi90ZXN0L3VuaXQvdGVtcFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIGNyZWF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgIENoYWkuc2hvdWxkKCkuZXhpc3Qob2JqKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiaGFuZGxlQ3VzdG9tQ29tbWFuZFwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGZhaWwgd2l0aCB1bmtub3duIGNvbW1hbmRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1widW5rbm93blwiXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBjb25maWd1cmVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY29uZmlndXJlXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPXRlc3QtYXBwXCIsXG4gICAgICAgICAgICAgICAgXCItLXRpdGxlPVxcXCJUZXN0IEFwcFxcXCJcIixcbiAgICAgICAgICAgICAgICBcIi0tbGljZW5zZT1NSVRcIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlTGFuZ3VhZ2U9SmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgICAgIFwiLS1tb2R1bGVUeXBlPUFNRFwiLFxuICAgICAgICAgICAgICAgIFwiLS1idW5kbGVyPVJlcXVpcmVKU1wiLFxuICAgICAgICAgICAgICAgIFwiLS11bml0VGVzdFJ1bm5lcj1Ob25lXCIsXG4gICAgICAgICAgICAgICAgXCItLWUyZVRlc3RSdW5uZXI9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1saW50ZXI9RVNMaW50XCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1ByZT1TYXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1Bvc3Q9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1hcHBGcmFtZXdvcms9UGxhaW5BcHBcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgY29uZmlndXJlIHdpdGggdW5rbm93biBhcmdzXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImNvbmZpZ3VyZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1wYWNrYWdlTmFtZT10ZXN0LWFwcFwiLFxuICAgICAgICAgICAgICAgIFwiLS10aXRsZT1cXFwiVGVzdCBBcHBcXFwiXCIsXG4gICAgICAgICAgICAgICAgXCItLWxpY2Vuc2U9TUlUXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvdXJjZUxhbmd1YWdlPUphdmFTY3JpcHRcIixcbiAgICAgICAgICAgICAgICBcIi0tbW9kdWxlVHlwZT1BTURcIixcbiAgICAgICAgICAgICAgICBcIi0tYnVuZGxlcj1SZXF1aXJlSlNcIixcbiAgICAgICAgICAgICAgICBcIi0tdW5pdFRlc3RSdW5uZXI9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1lMmVUZXN0UnVubmVyPU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tbGludGVyPUpTTGludFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQcmU9U2Fzc1wiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQb3N0PU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tYXBwRnJhbWV3b3JrPVBsYWluQXBwXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvbWVBcmc9Zm9vXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBjbGllbnRQYWNrYWdlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImNsaWVudFBhY2thZ2VcIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wYWNrYWdlTmFtZT1tb21lbnRcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIGNsaWVudFBhY2thZ2Ugd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY2xpZW50UGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1vcGVyYXRpb249YWRkXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPW1vbWVudFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiLFxuICAgICAgICAgICAgICAgIFwiLS1zb21lQXJnPWZvb1wiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBoYW5kbGUgYnVpbGRDb25maWd1cmF0aW9uXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImJ1aWxkQ29uZmlndXJhdGlvblwiLFxuICAgICAgICAgICAgICAgIFwiLS1vcGVyYXRpb249YWRkXCIsXG4gICAgICAgICAgICAgICAgXCItLWNvbmZpZ3VyYXRpb25OYW1lPXByb2RcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIGJ1aWxkQ29uZmlndXJhdGlvbiB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJidWlsZENvbmZpZ3VyYXRpb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jb25maWd1cmF0aW9uTmFtZT1wcm9kXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvbWVBcmc9Zm9vXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBwbGF0Zm9ybVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJwbGF0Zm9ybVwiLFxuICAgICAgICAgICAgICAgIFwiLS1vcGVyYXRpb249YWRkXCIsXG4gICAgICAgICAgICAgICAgXCItLXBsYXRmb3JtTmFtZT1lbGVjdHJvblwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgcGxhdGZvcm0gd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwicGxhdGZvcm1cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wbGF0Zm9ybU5hbWU9ZWxlY3Ryb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiZGlzcGxheUhlbHBcIiwgKCkgPT4ge1xuICAgICAgICBpdChcImNhbiBkaXNwbGF5IGhlbHBcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gb2JqLmRpc3BsYXlIZWxwKGxvZ2dlclN0dWIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KGxvZ2dlckluZm9TcHkuY2FsbGVkKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcImRpc3BsYXlBZGRpdGlvbmFsVmVyc2lvblwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGRpc3BsYXkgZW5naW5lIHZlcnNpb25cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgb2JqLmRpc3BsYXlBZGRpdGlvbmFsVmVyc2lvbihsb2dnZXJTdHViKTtcbiAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dnZXJCYW5uZXJTcHkuYXJncyk7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdCgvRW5naW5lIHYoXFxkKilcXC4oXFxkKilcXC4oXFxkKikvLnRlc3QobG9nZ2VyQmFubmVyU3B5LmFyZ3NbMF1bbG9nZ2VyQmFubmVyU3B5LmFyZ3MubGVuZ3RoIC0gMV0pKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
