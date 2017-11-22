/**
 * Tests for TestConfigurations.
 */
import * as Chai from "chai";
import * as Sinon from "sinon";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { FileSystem } from "unitejs-cli-core/dist/fileSystem";
import { UniteConfiguration } from "unitejs-engine/dist/configuration/models/unite/uniteConfiguration";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { CLI } from "../../../src/cli";

describe("TestConfigurations", () => {
    let sandbox: Sinon.SinonSandbox;
    let loggerStub: ILogger;
    let fileSystemStub: IFileSystem;
    let commandLineParser: CommandLineParser;
    let loggerErrorSpy: Sinon.SinonSpy;

    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = <ILogger>{};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };

        fileSystemStub = new FileSystem();

        loggerErrorSpy = sandbox.spy(loggerStub, "error");

        commandLineParser = new CommandLineParser();
    });

    afterEach(async () => {
        sandbox.restore();
        await fileSystemStub.directoryDelete("./test/unit/temp");
    });

    it("can be run with success configurations", async () => {
        const obj = new CLI();

        const files = await fileSystemStub.directoryGetFiles("./test/unit/testConfigurations/success");

        for (let i = 0; i < files.length; i++) {
            // tslint:disable-next-line
            console.log(`      configuration: ${files[i]}`);

            await fileSystemStub.directoryDelete("./test/unit/temp");
            const uniteConfig = await fileSystemStub.fileReadJson<UniteConfiguration>("./test/unit/testConfigurations/success", files[i]);

            commandLineParser.parse(["node", "./bin/unite.js", "configure",
                uniteConfig.packageName ? `--packageName=${uniteConfig.packageName}` : "",
                uniteConfig.title ? `--title="${uniteConfig.title}"` : "",
                uniteConfig.license ? `--license=${uniteConfig.license}` : "",
                uniteConfig.sourceLanguage ? `--sourceLanguage=${uniteConfig.sourceLanguage}` : "",
                uniteConfig.moduleType ? `--moduleType=${uniteConfig.moduleType}` : "",
                uniteConfig.bundler ? `--bundler=${uniteConfig.bundler}` : "",
                uniteConfig.unitTestRunner ? `--unitTestRunner=${uniteConfig.unitTestRunner}` : "",
                uniteConfig.unitTestFramework ? `--unitTestFramework=${uniteConfig.unitTestFramework}` : "",
                uniteConfig.unitTestEngine ? `--unitTestEngine=${uniteConfig.unitTestEngine}` : "",
                uniteConfig.e2eTestRunner ? `--e2eTestRunner=${uniteConfig.e2eTestRunner}` : "",
                uniteConfig.e2eTestFramework ?  `--e2eTestFramework=${uniteConfig.e2eTestFramework}` : "",
                uniteConfig.linter ? `--linter=${uniteConfig.linter}` : "",
                uniteConfig.cssPre ? `--cssPre=${uniteConfig.cssPre}` : "",
                uniteConfig.cssPost ? `--cssPost=${uniteConfig.cssPost}` : "",
                uniteConfig.cssLinter ? `--cssLinter=${uniteConfig.cssLinter}` : "",
                uniteConfig.documenter ? `--documenter=${uniteConfig.documenter}` : "",
                uniteConfig.applicationFramework ? `--appFramework=${uniteConfig.applicationFramework}` : "",
                "--outputDirectory=./test/unit/temp"
            ]);
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            if (res === 1) {
                // tslint:disable-next-line
                console.log(loggerErrorSpy.args);
            }
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }
    });

    it("can fail to run with fail configurations", async () => {
        const obj = new CLI();

        const files = await fileSystemStub.directoryGetFiles("./test/unit/testConfigurations/fail");

        for (let i = 0; i < files.length; i++) {
            // tslint:disable-next-line
            console.log(`      configuration: ${files[i]}`);

            await fileSystemStub.directoryDelete("./test/unit/temp");
            const uniteConfig = await fileSystemStub.fileReadJson<UniteConfiguration>("./test/unit/testConfigurations/fail", files[i]);

            commandLineParser.parse(["node", "./bin/unite.js", "configure",
                uniteConfig.packageName ? `--packageName=${uniteConfig.packageName}` : "",
                uniteConfig.title ? `--title="${uniteConfig.title}"` : "",
                uniteConfig.license ? `--license=${uniteConfig.license}` : "",
                uniteConfig.sourceLanguage ? `--sourceLanguage=${uniteConfig.sourceLanguage}` : "",
                uniteConfig.moduleType ? `--moduleType=${uniteConfig.moduleType}` : "",
                uniteConfig.bundler ? `--bundler=${uniteConfig.bundler}` : "",
                uniteConfig.unitTestRunner ? `--unitTestRunner=${uniteConfig.unitTestRunner}` : "",
                uniteConfig.unitTestFramework ? `--unitTestFramework=${uniteConfig.unitTestFramework}` : "",
                uniteConfig.unitTestEngine ? `--unitTestEngine=${uniteConfig.unitTestEngine}` : "",
                uniteConfig.e2eTestRunner ? `--e2eTestRunner=${uniteConfig.e2eTestRunner}` : "",
                uniteConfig.e2eTestFramework ?  `--e2eTestFramework=${uniteConfig.e2eTestFramework}` : "",
                uniteConfig.linter ? `--linter=${uniteConfig.linter}` : "",
                uniteConfig.cssPre ? `--cssPre=${uniteConfig.cssPre}` : "",
                uniteConfig.cssPost ? `--cssPost=${uniteConfig.cssPost}` : "",
                uniteConfig.cssLinter ? `--cssLinter=${uniteConfig.cssLinter}` : "",
                uniteConfig.documenter ? `--documenter=${uniteConfig.documenter}` : "",
                uniteConfig.applicationFramework ? `--appFramework=${uniteConfig.applicationFramework}` : "",
                "--outputDirectory=./test/unit/temp"
            ]);
            await obj.initialise(loggerStub, fileSystemStub);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            // tslint:disable-next-line
            console.log(`          => ${loggerErrorSpy.args[loggerErrorSpy.args.length - 1][0]}\r\n`);
            Chai.expect(res).to.be.equal(1);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
        }
    });
});
