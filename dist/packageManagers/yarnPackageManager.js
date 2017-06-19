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
 * Yarn Package Manager class.
 */
const child = require("child_process");
const npm = require("npm");
class YarnPackageManager {
    constructor(logger, display, fileSystem) {
        this._logger = logger;
        this._display = display;
        this._fileSystem = fileSystem;
    }
    info(packageName) {
        return __awaiter(this, void 0, void 0, function* () {
            /* We still use NPM for this as yarn doesn't have this facility yet */
            this._display.info("Looking up package info...");
            return new Promise((resolve, reject) => {
                npm.load({ json: true }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        npm.commands.view([packageName, "version", "main"], (err2, result2, result3, result4, result5) => {
                            if (err2) {
                                reject(err2);
                            }
                            else {
                                const keys = Object.keys(result2);
                                if (keys.length > 0) {
                                    resolve(result2[keys[0]]);
                                }
                                else {
                                    reject(new Error("No package information found."));
                                }
                            }
                        });
                    }
                });
            });
        });
    }
    add(workingDirectory, packageName, version, isDev) {
        return __awaiter(this, void 0, void 0, function* () {
            this._display.info("Adding package...");
            const args = ["add", packageName + "@" + version];
            if (isDev) {
                args.push("--dev");
            }
            return this.execYarn(workingDirectory, args);
        });
    }
    remove(workingDirectory, packageName, isDev) {
        return __awaiter(this, void 0, void 0, function* () {
            this._display.info("Removing package...");
            const args = ["remove", packageName];
            if (isDev) {
                args.push("--dev");
            }
            return this.execYarn(workingDirectory, args);
        });
    }
    execYarn(workingDirectory, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const isWin = /^win/.test(process.platform);
            return new Promise((resolve, reject) => {
                const spawnProcess = child.spawn("yarn" + (isWin ? ".cmd" : ""), args, { cwd: this._fileSystem.pathFormat(workingDirectory) });
                spawnProcess.stdout.on("data", (data) => {
                    this._display.log((data ? data.toString() : "").replace(/\n/g, ""));
                });
                spawnProcess.stderr.on("data", (data) => {
                    const error = (data ? data.toString() : "").replace(/\n/g, "");
                    if (error.startsWith("warning")) {
                        this._display.info(error);
                    }
                    else {
                        this._display.error(error);
                    }
                });
                spawnProcess.on("error", (err) => {
                    reject(err);
                });
                spawnProcess.on("close", (exitCode) => {
                    if (exitCode === 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            });
        });
    }
}
exports.YarnPackageManager = YarnPackageManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VNYW5hZ2Vycy95YXJuUGFja2FnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsdUNBQXVDO0FBQ3ZDLDJCQUEyQjtBQU8zQjtJQUtJLFlBQVksTUFBZSxFQUFFLE9BQWlCLEVBQUUsVUFBdUI7UUFDbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVZLElBQUksQ0FBQyxXQUFtQjs7WUFDakMsc0VBQXNFO1lBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLElBQUksT0FBTyxDQUF1QixDQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU07b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPOzRCQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakIsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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QUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO29CQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUVILFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUTtvQkFDOUIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE9BQU8sRUFBRSxDQUFDO29CQUNkLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxFQUFFLENBQUM7b0JBQ2IsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUExRkQsZ0RBMEZDIiwiZmlsZSI6InBhY2thZ2VNYW5hZ2Vycy95YXJuUGFja2FnZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
