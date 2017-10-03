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
                "--unitTestRunner=Karma",
                "--unitTestFramework=Jasmine",
                "--unitTestEngine=ChromeHeadless",
                "--e2eTestRunner=Protractor",
                "--e2eTestFramework=Jasmine",
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
                "--unitTestRunner=Karma",
                "--unitTestFramework=Jasmine",
                "--unitTestEngine=ChromeHeadless",
                "--e2eTestRunner=Protractor",
                "--e2eTestFramework=Jasmine",
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
            Chai.expect(/Engine v(\d*)\.(\d*)\.(\d*)/.test(loggerBannerSpy.args[0][loggerBannerSpy.args.length - 1])).to.be.equal(true);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdW5pdC9zcmMvY2xpLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwrRUFBNEU7QUFDNUUsaUVBQThEO0FBRzlELGdGQUE2RTtBQUM3RSwwQ0FBdUM7QUFFdkMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7SUFDakIsSUFBSSxPQUEyQixDQUFDO0lBQ2hDLElBQUksVUFBbUIsQ0FBQztJQUN4QixJQUFJLGNBQTJCLENBQUM7SUFDaEMsSUFBSSxpQkFBa0MsQ0FBQztJQUN2QyxJQUFJLGlCQUFvQyxDQUFDO0lBQ3pDLElBQUksYUFBNkIsQ0FBQztJQUNsQyxJQUFJLGNBQThCLENBQUM7SUFDbkMsSUFBSSxlQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLGNBQWMsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUVsQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdkQsYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEQsaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNqQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEIsTUFBTSxjQUFjLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7UUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtRQUNqQyxFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBUyxFQUFFO1lBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUUsR0FBUyxFQUFFO1lBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFdBQVc7Z0JBQzFELHdCQUF3QjtnQkFDeEIsc0JBQXNCO2dCQUN0QixlQUFlO2dCQUNmLDZCQUE2QjtnQkFDN0Isa0JBQWtCO2dCQUNsQixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsNkJBQTZCO2dCQUM3QixpQ0FBaUM7Z0JBQ2pDLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1QixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQix5QkFBeUI7Z0JBQ3pCLG9DQUFvQzthQUN2QyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN6RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0NBQXNDLEVBQUUsR0FBUyxFQUFFO1lBQ2xELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFdBQVc7Z0JBQzFELHdCQUF3QjtnQkFDeEIsc0JBQXNCO2dCQUN0QixlQUFlO2dCQUNmLDZCQUE2QjtnQkFDN0Isa0JBQWtCO2dCQUNsQixxQkFBcUI7Z0JBQ3JCLHdCQUF3QjtnQkFDeEIsNkJBQTZCO2dCQUM3QixpQ0FBaUM7Z0JBQ2pDLDRCQUE0QjtnQkFDNUIsNEJBQTRCO2dCQUM1QixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQix5QkFBeUI7Z0JBQ3pCLG9DQUFvQztnQkFDcEMsZUFBZTthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDBCQUEwQixFQUFFLEdBQVMsRUFBRTtZQUN0QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBQ3RCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO2dCQUM5RCxpQkFBaUI7Z0JBQ2pCLHNCQUFzQjtnQkFDdEIsb0NBQW9DO2FBQ3ZDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakQsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFTLEVBQUU7WUFDdEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUN0QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZTtnQkFDOUQsaUJBQWlCO2dCQUNqQixzQkFBc0I7Z0JBQ3RCLG9DQUFvQztnQkFDcEMsZUFBZTthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFLEdBQVMsRUFBRTtZQUMzQyxNQUFNLGNBQWMsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxRCxNQUFNLGNBQWMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTFFLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQjtnQkFDbkUsaUJBQWlCO2dCQUNqQiwwQkFBMEI7Z0JBQzFCLG9DQUFvQzthQUN2QyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN6RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBUyxFQUFFO1lBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQjtnQkFDbkUsaUJBQWlCO2dCQUNqQiwwQkFBMEI7Z0JBQzFCLG9DQUFvQztnQkFDcEMsZUFBZTthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQVMsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBQ3RCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxVQUFVO2dCQUN6RCxpQkFBaUI7Z0JBQ2pCLHlCQUF5QjtnQkFDekIsb0NBQW9DO2FBQ3ZDLENBQUMsQ0FBQztZQUNILE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakQsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFTLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUN0QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVTtnQkFDekQsaUJBQWlCO2dCQUNqQix5QkFBeUI7Z0JBQ3pCLG9DQUFvQztnQkFDcEMsZUFBZTthQUNsQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUN6QixFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBUyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDdEMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQVMsRUFBRTtZQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakQsR0FBRyxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hJLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNsaS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0cyBmb3IgQ0xJLlxuICovXG5pbXBvcnQgKiBhcyBDaGFpIGZyb20gXCJjaGFpXCI7XG5pbXBvcnQgKiBhcyBTaW5vbiBmcm9tIFwic2lub25cIjtcbmltcG9ydCB7IENvbW1hbmRMaW5lUGFyc2VyIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9jb21tYW5kTGluZVBhcnNlclwiO1xuaW1wb3J0IHsgRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWNsaS1jb3JlL2Rpc3QvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgSUZpbGVTeXN0ZW0gfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9pbnRlcmZhY2VzL0lGaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSBcInVuaXRlanMtZnJhbWV3b3JrL2Rpc3QvaW50ZXJmYWNlcy9JTG9nZ2VyXCI7XG5pbXBvcnQgeyBEZWZhdWx0TG9nZ2VyIH0gZnJvbSBcInVuaXRlanMtZnJhbWV3b3JrL2Rpc3QvbG9nZ2Vycy9kZWZhdWx0TG9nZ2VyXCI7XG5pbXBvcnQgeyBDTEkgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2NsaVwiO1xuXG5kZXNjcmliZShcIkNMSVwiLCAoKSA9PiB7XG4gICAgbGV0IHNhbmRib3g6IFNpbm9uLlNpbm9uU2FuZGJveDtcbiAgICBsZXQgbG9nZ2VyU3R1YjogSUxvZ2dlcjtcbiAgICBsZXQgZmlsZVN5c3RlbVN0dWI6IElGaWxlU3lzdGVtO1xuICAgIGxldCBkZWZhdWx0TG9nZ2VyU3R1YjogU2lub24uU2lub25TdHViO1xuICAgIGxldCBjb21tYW5kTGluZVBhcnNlcjogQ29tbWFuZExpbmVQYXJzZXI7XG4gICAgbGV0IGxvZ2dlckluZm9TcHk6IFNpbm9uLlNpbm9uU3B5O1xuICAgIGxldCBsb2dnZXJFcnJvclNweTogU2lub24uU2lub25TcHk7XG4gICAgbGV0IGxvZ2dlckJhbm5lclNweTogU2lub24uU2lub25TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc2FuZGJveCA9IFNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgICAgIGxvZ2dlclN0dWIgPSA8SUxvZ2dlcj57fTtcbiAgICAgICAgbG9nZ2VyU3R1Yi5iYW5uZXIgPSAoKSA9PiB7IH07XG4gICAgICAgIGxvZ2dlclN0dWIuaW5mbyA9ICgpID0+IHsgfTtcbiAgICAgICAgbG9nZ2VyU3R1Yi53YXJuaW5nID0gKCkgPT4geyB9O1xuICAgICAgICBsb2dnZXJTdHViLmVycm9yID0gKCkgPT4geyB9O1xuXG4gICAgICAgIGZpbGVTeXN0ZW1TdHViID0gbmV3IEZpbGVTeXN0ZW0oKTtcblxuICAgICAgICBkZWZhdWx0TG9nZ2VyU3R1YiA9IHNhbmRib3guc3R1YihEZWZhdWx0TG9nZ2VyLCBcImxvZ1wiKTtcblxuICAgICAgICBsb2dnZXJJbmZvU3B5ID0gc2FuZGJveC5zcHkobG9nZ2VyU3R1YiwgXCJpbmZvXCIpO1xuICAgICAgICBsb2dnZXJFcnJvclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiZXJyb3JcIik7XG4gICAgICAgIGxvZ2dlckJhbm5lclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiYmFubmVyXCIpO1xuXG4gICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyID0gbmV3IENvbW1hbmRMaW5lUGFyc2VyKCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5RGVsZXRlKFwiLi90ZXN0L3VuaXQvdGVtcFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIGNyZWF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgIENoYWkuc2hvdWxkKCkuZXhpc3Qob2JqKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKFwiaGFuZGxlQ3VzdG9tQ29tbWFuZFwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGZhaWwgd2l0aCB1bmtub3duIGNvbW1hbmRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1widW5rbm93blwiXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBjb25maWd1cmVcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY29uZmlndXJlXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPXRlc3QtYXBwXCIsXG4gICAgICAgICAgICAgICAgXCItLXRpdGxlPVxcXCJUZXN0IEFwcFxcXCJcIixcbiAgICAgICAgICAgICAgICBcIi0tbGljZW5zZT1NSVRcIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlTGFuZ3VhZ2U9SmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgICAgIFwiLS1tb2R1bGVUeXBlPUFNRFwiLFxuICAgICAgICAgICAgICAgIFwiLS1idW5kbGVyPVJlcXVpcmVKU1wiLFxuICAgICAgICAgICAgICAgIFwiLS11bml0VGVzdFJ1bm5lcj1LYXJtYVwiLFxuICAgICAgICAgICAgICAgIFwiLS11bml0VGVzdEZyYW1ld29yaz1KYXNtaW5lXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0RW5naW5lPUNocm9tZUhlYWRsZXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLWUyZVRlc3RSdW5uZXI9UHJvdHJhY3RvclwiLFxuICAgICAgICAgICAgICAgIFwiLS1lMmVUZXN0RnJhbWV3b3JrPUphc21pbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tbGludGVyPUVTTGludFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQcmU9U2Fzc1wiLFxuICAgICAgICAgICAgICAgIFwiLS1jc3NQb3N0PU5vbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tYXBwRnJhbWV3b3JrPVBsYWluQXBwXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgYXdhaXQgb2JqLmluaXRpYWxpc2UobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIpO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwidW5pdGUuanNvblwiKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KGZpbGVFeGlzdHMpLnRvLmJlLmVxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIGNvbmZpZ3VyZSB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJjb25maWd1cmVcIixcbiAgICAgICAgICAgICAgICBcIi0tcGFja2FnZU5hbWU9dGVzdC1hcHBcIixcbiAgICAgICAgICAgICAgICBcIi0tdGl0bGU9XFxcIlRlc3QgQXBwXFxcIlwiLFxuICAgICAgICAgICAgICAgIFwiLS1saWNlbnNlPU1JVFwiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VMYW5ndWFnZT1KYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgXCItLW1vZHVsZVR5cGU9QU1EXCIsXG4gICAgICAgICAgICAgICAgXCItLWJ1bmRsZXI9UmVxdWlyZUpTXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0UnVubmVyPUthcm1hXCIsXG4gICAgICAgICAgICAgICAgXCItLXVuaXRUZXN0RnJhbWV3b3JrPUphc21pbmVcIixcbiAgICAgICAgICAgICAgICBcIi0tdW5pdFRlc3RFbmdpbmU9Q2hyb21lSGVhZGxlc3NcIixcbiAgICAgICAgICAgICAgICBcIi0tZTJlVGVzdFJ1bm5lcj1Qcm90cmFjdG9yXCIsXG4gICAgICAgICAgICAgICAgXCItLWUyZVRlc3RGcmFtZXdvcms9SmFzbWluZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1saW50ZXI9SlNMaW50XCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1ByZT1TYXNzXCIsXG4gICAgICAgICAgICAgICAgXCItLWNzc1Bvc3Q9Tm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1hcHBGcmFtZXdvcms9UGxhaW5BcHBcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIixcbiAgICAgICAgICAgICAgICBcIi0tc29tZUFyZz1mb29cIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIGNsaWVudFBhY2thZ2VcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiY2xpZW50UGFja2FnZVwiLFxuICAgICAgICAgICAgICAgIFwiLS1vcGVyYXRpb249YWRkXCIsXG4gICAgICAgICAgICAgICAgXCItLXBhY2thZ2VOYW1lPW1vbWVudFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGZhaWwgY2xpZW50UGFja2FnZSB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJjbGllbnRQYWNrYWdlXCIsXG4gICAgICAgICAgICAgICAgXCItLW9wZXJhdGlvbj1hZGRcIixcbiAgICAgICAgICAgICAgICBcIi0tcGFja2FnZU5hbWU9bW9tZW50XCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvbWVBcmc9Zm9vXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIGhhbmRsZSBidWlsZENvbmZpZ3VyYXRpb25cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5Q3JlYXRlKFwiLi90ZXN0L3VuaXQvdGVtcC9cIik7XG4gICAgICAgICAgICBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlV3JpdGVKc29uKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIsIHt9KTtcblxuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiYnVpbGRDb25maWd1cmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCItLW9wZXJhdGlvbj1hZGRcIixcbiAgICAgICAgICAgICAgICBcIi0tY29uZmlndXJhdGlvbk5hbWU9cHJvZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDApO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gZmFpbCBidWlsZENvbmZpZ3VyYXRpb24gd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwiYnVpbGRDb25maWd1cmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCItLW9wZXJhdGlvbj1hZGRcIixcbiAgICAgICAgICAgICAgICBcIi0tY29uZmlndXJhdGlvbk5hbWU9cHJvZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiLFxuICAgICAgICAgICAgICAgIFwiLS1zb21lQXJnPWZvb1wiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBoYW5kbGUgcGxhdGZvcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLmpzXCIsIFwicGxhdGZvcm1cIixcbiAgICAgICAgICAgICAgICBcIi0tb3BlcmF0aW9uPWFkZFwiLFxuICAgICAgICAgICAgICAgIFwiLS1wbGF0Zm9ybU5hbWU9ZWxlY3Ryb25cIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIHBsYXRmb3JtIHdpdGggdW5rbm93biBhcmdzXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcInBsYXRmb3JtXCIsXG4gICAgICAgICAgICAgICAgXCItLW9wZXJhdGlvbj1hZGRcIixcbiAgICAgICAgICAgICAgICBcIi0tcGxhdGZvcm1OYW1lPWVsZWN0cm9uXCIsXG4gICAgICAgICAgICAgICAgXCItLW91dHB1dERpcmVjdG9yeT0uL3Rlc3QvdW5pdC90ZW1wXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvbWVBcmc9Zm9vXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcImRpc3BsYXlIZWxwXCIsICgpID0+IHtcbiAgICAgICAgaXQoXCJjYW4gZGlzcGxheSBoZWxwXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG9iai5kaXNwbGF5SGVscChsb2dnZXJTdHViKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChsb2dnZXJJbmZvU3B5LmNhbGxlZCkudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCJkaXNwbGF5QWRkaXRpb25hbFZlcnNpb25cIiwgKCkgPT4ge1xuICAgICAgICBpdChcImNhbiBkaXNwbGF5IGVuZ2luZSB2ZXJzaW9uXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIG9iai5kaXNwbGF5QWRkaXRpb25hbFZlcnNpb24obG9nZ2VyU3R1Yik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdCgvRW5naW5lIHYoXFxkKilcXC4oXFxkKilcXC4oXFxkKikvLnRlc3QobG9nZ2VyQmFubmVyU3B5LmFyZ3NbMF1bbG9nZ2VyQmFubmVyU3B5LmFyZ3MubGVuZ3RoIC0gMV0pKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
