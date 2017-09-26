/**
 * Tests for CLI.
 */
import * as Chai from "chai";
import * as Sinon from "sinon";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { FileSystem } from "unitejs-cli-core/dist/fileSystem";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { DefaultLogger } from "unitejs-framework/dist/loggers/defaultLogger";
import { CLI } from "../../../dist/cli";

describe("CLI", () => {
    let sandbox: Sinon.SinonSandbox;
    let loggerStub: ILogger;
    let fileSystemStub: IFileSystem;
    let defaultLoggerStub: Sinon.SinonStub;
    let commandLineParser: CommandLineParser;
    let loggerInfoSpy: Sinon.SinonSpy;
    let loggerErrorSpy: Sinon.SinonSpy;
    let loggerBannerSpy: Sinon.SinonSpy;

    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = <ILogger>{};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };

        fileSystemStub = new FileSystem();

        defaultLoggerStub = sandbox.stub(DefaultLogger, "log");

        loggerInfoSpy = sandbox.spy(loggerStub, "info");
        loggerErrorSpy = sandbox.spy(loggerStub, "error");
        loggerBannerSpy = sandbox.spy(loggerStub, "banner");

        commandLineParser = new CommandLineParser();
    });

    afterEach(async () => {
        sandbox.restore();
        await fileSystemStub.directoryDelete("./test/unit/temp");
    });

    it("can be created", () => {
        const obj = new CLI();
        Chai.should().exist(obj);
    });

    describe("handleCustomCommand", () => {
        it("can fail with unknown command", async () => {
            const obj = new CLI();
            commandLineParser.parse(["unknown"]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(-1);
        });

        it("can handle configure", async () => {
            const obj = new CLI();
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
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can fail configure with unknown args", async () => {
            const obj = new CLI();
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
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle clientPackage", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "clientPackage",
                "--operation=add",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp"
            ]);
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
        });

        it("can fail clientPackage with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "clientPackage",
                "--operation=add",
                "--packageName=moment",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle buildConfiguration", async () => {
            await fileSystemStub.directoryCreate("./test/unit/temp/");
            await fileSystemStub.fileWriteJson("./test/unit/temp/", "unite.json", {});

            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "buildConfiguration",
                "--operation=add",
                "--configurationName=prod",
                "--outputDirectory=./test/unit/temp"
            ]);
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can fail buildConfiguration with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "buildConfiguration",
                "--operation=add",
                "--configurationName=prod",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle platform", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "platform",
                "--operation=add",
                "--platformName=electron",
                "--outputDirectory=./test/unit/temp"
            ]);
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
        });

        it("can fail platform with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite.js", "platform",
                "--operation=add",
                "--platformName=electron",
                "--outputDirectory=./test/unit/temp",
                "--someArg=foo"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

    });

    describe("displayHelp", () => {
        it("can display help", async () => {
            const obj = new CLI();
            const res = obj.displayHelp(loggerStub);
            Chai.expect(res).to.be.equal(0);
            Chai.expect(loggerInfoSpy.called).to.be.equal(true);
        });
    });

    describe("displayAdditionalVersion", () => {
        it("can display engine version", async () => {
            const obj = new CLI();
            await obj.initialise(loggerStub, fileSystemStub);
            obj.displayAdditionalVersion(loggerStub);
            Chai.expect(/Engine v(\d*)\.(\d*)\.(\d*)/.test(loggerBannerSpy.args[0][loggerBannerSpy.args.length - 1])).to.be.equal(true);
        });
    });
});
