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
 * Tests for TestConfigurations.
 */
const Chai = require("chai");
const Sinon = require("sinon");
const commandLineParser_1 = require("unitejs-cli-core/dist/commandLineParser");
const fileSystem_1 = require("unitejs-cli-core/dist/fileSystem");
const defaultLogger_1 = require("unitejs-framework/dist/loggers/defaultLogger");
const cli_1 = require("../../../dist/cli");
describe("TestConfigurations", () => {
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
    it("can be run with success configurations", () => __awaiter(this, void 0, void 0, function* () {
        const obj = new cli_1.CLI();
        const files = yield fileSystemStub.directoryGetFiles("./test/unit/testConfigurations/success");
        for (let i = 0; i < files.length; i++) {
            // tslint:disable-next-line
            console.log(`      configuration: ${files[i]}`);
            yield fileSystemStub.directoryDelete("./test/unit/temp");
            const uniteConfig = yield fileSystemStub.fileReadJson("./test/unit/testConfigurations/success", files[i]);
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
                uniteConfig.e2eTestFramework ? `--e2eTestFramework=${uniteConfig.e2eTestFramework}` : "",
                uniteConfig.linter ? `--linter=${uniteConfig.linter}` : "",
                uniteConfig.cssPre ? `--cssPre=${uniteConfig.cssPre}` : "",
                uniteConfig.cssPost ? `--cssPost=${uniteConfig.cssPost}` : "",
                uniteConfig.applicationFramework ? `--appFramework=${uniteConfig.applicationFramework}` : "",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            if (res === 1) {
                // tslint:disable-next-line
                console.log(loggerErrorSpy.args);
            }
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(true);
        }
    }));
    it("can fail to run with fail configurations", () => __awaiter(this, void 0, void 0, function* () {
        const obj = new cli_1.CLI();
        const files = yield fileSystemStub.directoryGetFiles("./test/unit/testConfigurations/fail");
        for (let i = 0; i < files.length; i++) {
            // tslint:disable-next-line
            console.log(`      configuration: ${files[i]}`);
            yield fileSystemStub.directoryDelete("./test/unit/temp");
            const uniteConfig = yield fileSystemStub.fileReadJson("./test/unit/testConfigurations/fail", files[i]);
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
                uniteConfig.e2eTestFramework ? `--e2eTestFramework=${uniteConfig.e2eTestFramework}` : "",
                uniteConfig.linter ? `--linter=${uniteConfig.linter}` : "",
                uniteConfig.cssPre ? `--cssPre=${uniteConfig.cssPre}` : "",
                uniteConfig.cssPost ? `--cssPost=${uniteConfig.cssPost}` : "",
                uniteConfig.applicationFramework ? `--appFramework=${uniteConfig.applicationFramework}` : "",
                "--outputDirectory=./test/unit/temp"
            ]);
            yield obj.initialise(loggerStub, fileSystemStub);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            // tslint:disable-next-line
            console.log(`          => ${loggerErrorSpy.args[loggerErrorSpy.args.length - 1][0]}\r\n`);
            Chai.expect(res).to.be.equal(1);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "unite.json");
            Chai.expect(fileExists).to.be.equal(false);
        }
    }));
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdW5pdC9zcmMvdGVzdENvbmZpZ3VyYXRpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwrRUFBNEU7QUFDNUUsaUVBQThEO0FBSTlELGdGQUE2RTtBQUM3RSwyQ0FBd0M7QUFFeEMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO0lBQzNCLElBQUksT0FBMkIsQ0FBQztJQUNoQyxJQUFJLFVBQW1CLENBQUM7SUFDeEIsSUFBSSxjQUEyQixDQUFDO0lBQ2hDLElBQUksaUJBQWtDLENBQUM7SUFDdkMsSUFBSSxpQkFBb0MsQ0FBQztJQUN6QyxJQUFJLGFBQTZCLENBQUM7SUFDbEMsSUFBSSxjQUE4QixDQUFDO0lBQ25DLElBQUksZUFBK0IsQ0FBQztJQUVwQyxVQUFVLENBQUM7UUFDUCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxVQUFVLEdBQVksRUFBRSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDOUIsVUFBVSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFN0IsY0FBYyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRWxDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2RCxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELGVBQWUsR0FB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QUcsRUFBRTtnQkFDMUQsV0FBVyxDQUFDLE9BQU8sR0FBRyxhQUFhLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUM3RCxXQUFXLENBQUMsb0JBQW9CLEdBQUcsa0JBQWtCLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzVGLG9DQUFvQzthQUN2QyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN6RiwyQkFBMkI7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3RDb25maWd1cmF0aW9ucy5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0cyBmb3IgVGVzdENvbmZpZ3VyYXRpb25zLlxuICovXG5pbXBvcnQgKiBhcyBDaGFpIGZyb20gXCJjaGFpXCI7XG5pbXBvcnQgKiBhcyBTaW5vbiBmcm9tIFwic2lub25cIjtcbmltcG9ydCB7IENvbW1hbmRMaW5lUGFyc2VyIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9jb21tYW5kTGluZVBhcnNlclwiO1xuaW1wb3J0IHsgRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWNsaS1jb3JlL2Rpc3QvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVW5pdGVDb25maWd1cmF0aW9uIH0gZnJvbSBcInVuaXRlanMtZW5naW5lL2Rpc3QvY29uZmlndXJhdGlvbi9tb2RlbHMvdW5pdGUvdW5pdGVDb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBJRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWZyYW1ld29yay9kaXN0L2ludGVyZmFjZXMvSUZpbGVTeXN0ZW1cIjtcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9pbnRlcmZhY2VzL0lMb2dnZXJcIjtcbmltcG9ydCB7IERlZmF1bHRMb2dnZXIgfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9sb2dnZXJzL2RlZmF1bHRMb2dnZXJcIjtcbmltcG9ydCB7IENMSSB9IGZyb20gXCIuLi8uLi8uLi9kaXN0L2NsaVwiO1xuXG5kZXNjcmliZShcIlRlc3RDb25maWd1cmF0aW9uc1wiLCAoKSA9PiB7XG4gICAgbGV0IHNhbmRib3g6IFNpbm9uLlNpbm9uU2FuZGJveDtcbiAgICBsZXQgbG9nZ2VyU3R1YjogSUxvZ2dlcjtcbiAgICBsZXQgZmlsZVN5c3RlbVN0dWI6IElGaWxlU3lzdGVtO1xuICAgIGxldCBkZWZhdWx0TG9nZ2VyU3R1YjogU2lub24uU2lub25TdHViO1xuICAgIGxldCBjb21tYW5kTGluZVBhcnNlcjogQ29tbWFuZExpbmVQYXJzZXI7XG4gICAgbGV0IGxvZ2dlckluZm9TcHk6IFNpbm9uLlNpbm9uU3B5O1xuICAgIGxldCBsb2dnZXJFcnJvclNweTogU2lub24uU2lub25TcHk7XG4gICAgbGV0IGxvZ2dlckJhbm5lclNweTogU2lub24uU2lub25TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc2FuZGJveCA9IFNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgICAgIGxvZ2dlclN0dWIgPSA8SUxvZ2dlcj57fTtcbiAgICAgICAgbG9nZ2VyU3R1Yi5iYW5uZXIgPSAoKSA9PiB7IH07XG4gICAgICAgIGxvZ2dlclN0dWIuaW5mbyA9ICgpID0+IHsgfTtcbiAgICAgICAgbG9nZ2VyU3R1Yi53YXJuaW5nID0gKCkgPT4geyB9O1xuICAgICAgICBsb2dnZXJTdHViLmVycm9yID0gKCkgPT4geyB9O1xuXG4gICAgICAgIGZpbGVTeXN0ZW1TdHViID0gbmV3IEZpbGVTeXN0ZW0oKTtcblxuICAgICAgICBkZWZhdWx0TG9nZ2VyU3R1YiA9IHNhbmRib3guc3R1YihEZWZhdWx0TG9nZ2VyLCBcImxvZ1wiKTtcblxuICAgICAgICBsb2dnZXJJbmZvU3B5ID0gc2FuZGJveC5zcHkobG9nZ2VyU3R1YiwgXCJpbmZvXCIpO1xuICAgICAgICBsb2dnZXJFcnJvclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiZXJyb3JcIik7XG4gICAgICAgIGxvZ2dlckJhbm5lclNweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiYmFubmVyXCIpO1xuXG4gICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyID0gbmV3IENvbW1hbmRMaW5lUGFyc2VyKCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5RGVsZXRlKFwiLi90ZXN0L3VuaXQvdGVtcFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIHJ1biB3aXRoIHN1Y2Nlc3MgY29uZmlndXJhdGlvbnNcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG5cbiAgICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5kaXJlY3RvcnlHZXRGaWxlcyhcIi4vdGVzdC91bml0L3Rlc3RDb25maWd1cmF0aW9ucy9zdWNjZXNzXCIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYCAgICAgIGNvbmZpZ3VyYXRpb246ICR7ZmlsZXNbaV19YCk7XG5cbiAgICAgICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmRpcmVjdG9yeURlbGV0ZShcIi4vdGVzdC91bml0L3RlbXBcIik7XG4gICAgICAgICAgICBjb25zdCB1bml0ZUNvbmZpZyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVSZWFkSnNvbjxVbml0ZUNvbmZpZ3VyYXRpb24+KFwiLi90ZXN0L3VuaXQvdGVzdENvbmZpZ3VyYXRpb25zL3N1Y2Nlc3NcIiwgZmlsZXNbaV0pO1xuXG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUuanNcIiwgXCJjb25maWd1cmVcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5wYWNrYWdlTmFtZSA/IGAtLXBhY2thZ2VOYW1lPSR7dW5pdGVDb25maWcucGFja2FnZU5hbWV9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcudGl0bGUgPyBgLS10aXRsZT1cIiR7dW5pdGVDb25maWcudGl0bGV9XCJgIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5saWNlbnNlID8gYC0tbGljZW5zZT0ke3VuaXRlQ29uZmlnLmxpY2Vuc2V9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcuc291cmNlTGFuZ3VhZ2UgPyBgLS1zb3VyY2VMYW5ndWFnZT0ke3VuaXRlQ29uZmlnLnNvdXJjZUxhbmd1YWdlfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLm1vZHVsZVR5cGUgPyBgLS1tb2R1bGVUeXBlPSR7dW5pdGVDb25maWcubW9kdWxlVHlwZX1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5idW5kbGVyID8gYC0tYnVuZGxlcj0ke3VuaXRlQ29uZmlnLmJ1bmRsZXJ9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcudW5pdFRlc3RSdW5uZXIgPyBgLS11bml0VGVzdFJ1bm5lcj0ke3VuaXRlQ29uZmlnLnVuaXRUZXN0UnVubmVyfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLnVuaXRUZXN0RnJhbWV3b3JrID8gYC0tdW5pdFRlc3RGcmFtZXdvcms9JHt1bml0ZUNvbmZpZy51bml0VGVzdEZyYW1ld29ya31gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy51bml0VGVzdEVuZ2luZSA/IGAtLXVuaXRUZXN0RW5naW5lPSR7dW5pdGVDb25maWcudW5pdFRlc3RFbmdpbmV9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcuZTJlVGVzdFJ1bm5lciA/IGAtLWUyZVRlc3RSdW5uZXI9JHt1bml0ZUNvbmZpZy5lMmVUZXN0UnVubmVyfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLmUyZVRlc3RGcmFtZXdvcmsgPyAgYC0tZTJlVGVzdEZyYW1ld29yaz0ke3VuaXRlQ29uZmlnLmUyZVRlc3RGcmFtZXdvcmt9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcubGludGVyID8gYC0tbGludGVyPSR7dW5pdGVDb25maWcubGludGVyfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLmNzc1ByZSA/IGAtLWNzc1ByZT0ke3VuaXRlQ29uZmlnLmNzc1ByZX1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5jc3NQb3N0ID8gYC0tY3NzUG9zdD0ke3VuaXRlQ29uZmlnLmNzc1Bvc3R9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcuYXBwbGljYXRpb25GcmFtZXdvcmsgPyBgLS1hcHBGcmFtZXdvcms9JHt1bml0ZUNvbmZpZy5hcHBsaWNhdGlvbkZyYW1ld29ya31gIDogXCJcIixcbiAgICAgICAgICAgICAgICBcIi0tb3V0cHV0RGlyZWN0b3J5PS4vdGVzdC91bml0L3RlbXBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBhd2FpdCBvYmouaW5pdGlhbGlzZShsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1Yik7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgaWYgKHJlcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZ2dlckVycm9yU3B5LmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ1bml0ZS5qc29uXCIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QoZmlsZUV4aXN0cykudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGZhaWwgdG8gcnVuIHdpdGggZmFpbCBjb25maWd1cmF0aW9uc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmRpcmVjdG9yeUdldEZpbGVzKFwiLi90ZXN0L3VuaXQvdGVzdENvbmZpZ3VyYXRpb25zL2ZhaWxcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgICAgICAgY29uZmlndXJhdGlvbjogJHtmaWxlc1tpXX1gKTtcblxuICAgICAgICAgICAgYXdhaXQgZmlsZVN5c3RlbVN0dWIuZGlyZWN0b3J5RGVsZXRlKFwiLi90ZXN0L3VuaXQvdGVtcFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXRlQ29uZmlnID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZVJlYWRKc29uPFVuaXRlQ29uZmlndXJhdGlvbj4oXCIuL3Rlc3QvdW5pdC90ZXN0Q29uZmlndXJhdGlvbnMvZmFpbFwiLCBmaWxlc1tpXSk7XG5cbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS5qc1wiLCBcImNvbmZpZ3VyZVwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLnBhY2thZ2VOYW1lID8gYC0tcGFja2FnZU5hbWU9JHt1bml0ZUNvbmZpZy5wYWNrYWdlTmFtZX1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy50aXRsZSA/IGAtLXRpdGxlPVwiJHt1bml0ZUNvbmZpZy50aXRsZX1cImAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLmxpY2Vuc2UgPyBgLS1saWNlbnNlPSR7dW5pdGVDb25maWcubGljZW5zZX1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5zb3VyY2VMYW5ndWFnZSA/IGAtLXNvdXJjZUxhbmd1YWdlPSR7dW5pdGVDb25maWcuc291cmNlTGFuZ3VhZ2V9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcubW9kdWxlVHlwZSA/IGAtLW1vZHVsZVR5cGU9JHt1bml0ZUNvbmZpZy5tb2R1bGVUeXBlfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLmJ1bmRsZXIgPyBgLS1idW5kbGVyPSR7dW5pdGVDb25maWcuYnVuZGxlcn1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy51bml0VGVzdFJ1bm5lciA/IGAtLXVuaXRUZXN0UnVubmVyPSR7dW5pdGVDb25maWcudW5pdFRlc3RSdW5uZXJ9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcudW5pdFRlc3RGcmFtZXdvcmsgPyBgLS11bml0VGVzdEZyYW1ld29yaz0ke3VuaXRlQ29uZmlnLnVuaXRUZXN0RnJhbWV3b3JrfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLnVuaXRUZXN0RW5naW5lID8gYC0tdW5pdFRlc3RFbmdpbmU9JHt1bml0ZUNvbmZpZy51bml0VGVzdEVuZ2luZX1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5lMmVUZXN0UnVubmVyID8gYC0tZTJlVGVzdFJ1bm5lcj0ke3VuaXRlQ29uZmlnLmUyZVRlc3RSdW5uZXJ9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcuZTJlVGVzdEZyYW1ld29yayA/ICBgLS1lMmVUZXN0RnJhbWV3b3JrPSR7dW5pdGVDb25maWcuZTJlVGVzdEZyYW1ld29ya31gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5saW50ZXIgPyBgLS1saW50ZXI9JHt1bml0ZUNvbmZpZy5saW50ZXJ9YCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5pdGVDb25maWcuY3NzUHJlID8gYC0tY3NzUHJlPSR7dW5pdGVDb25maWcuY3NzUHJlfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVuaXRlQ29uZmlnLmNzc1Bvc3QgPyBgLS1jc3NQb3N0PSR7dW5pdGVDb25maWcuY3NzUG9zdH1gIDogXCJcIixcbiAgICAgICAgICAgICAgICB1bml0ZUNvbmZpZy5hcHBsaWNhdGlvbkZyYW1ld29yayA/IGAtLWFwcEZyYW1ld29yaz0ke3VuaXRlQ29uZmlnLmFwcGxpY2F0aW9uRnJhbWV3b3JrfWAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiLS1vdXRwdXREaXJlY3Rvcnk9Li90ZXN0L3VuaXQvdGVtcFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGF3YWl0IG9iai5pbml0aWFsaXNlKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgICAgICAgICAgPT4gJHtsb2dnZXJFcnJvclNweS5hcmdzW2xvZ2dlckVycm9yU3B5LmFyZ3MubGVuZ3RoIC0gMV1bMF19XFxyXFxuYCk7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcInVuaXRlLmpzb25cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIl19
