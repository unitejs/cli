/**
 * Yarn Package Manager class.
 */
import * as child from "child_process";
import * as npm from "npm";
import { PackageConfiguration } from "unitejs-core/dist/configuration/models/packages/packageConfiguration";
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-core/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-core/dist/interfaces/ILogger";
import { IPackageManager } from "unitejs-core/dist/interfaces/IPackageManager";

export class YarnPackageManager implements IPackageManager {
    private _logger: ILogger;
    private _display: IDisplay;
    private _fileSystem: IFileSystem;

    constructor(logger: ILogger, display: IDisplay, fileSystem: IFileSystem) {
        this._logger = logger;
        this._display = display;
        this._fileSystem = fileSystem;
    }

    public async info(packageName: string): Promise<PackageConfiguration> {
        /* We still use NPM for this as yarn doesn't have this facility yet */
        this._display.info("Looking up package info...");
        return new Promise<PackageConfiguration>((resolve, reject) => {
            npm.load({json: true}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    npm.commands.view([packageName, "version", "main"], (err2, result2, result3, result4, result5) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            const keys = Object.keys(result2);
                            if (keys.length > 0) {
                                resolve(result2[keys[0]]);
                            } else {
                                reject(new Error("No package information found."));
                            }
                        }
                    });
                }
            });
        });
    }

    public async add(workingDirectory: string, packageName: string, version: string, isDev: boolean): Promise<void> {
        this._display.info("Adding package...");

        const args = ["add", packageName + "@" + version];
        if (isDev) {
            args.push("--dev");
        }

        return this.execYarn(workingDirectory, args);
    }

    public async remove(workingDirectory: string, packageName: string, isDev: boolean): Promise<void> {
        this._display.info("Removing package...");

        const args = ["remove", packageName];
        if (isDev) {
            args.push("--dev");
        }

        return this.execYarn(workingDirectory, args);
    }

    private async execYarn(workingDirectory: string, args: string[]): Promise<void> {
        const isWin = /^win/.test(process.platform);

        return new Promise<void>((resolve, reject) => {
            const spawnProcess = child.spawn("yarn" + (isWin ? ".cmd" : ""), args, { cwd: this._fileSystem.pathFormat(workingDirectory) });

            spawnProcess.stdout.on("data", (data) => {
                this._display.log((data ? data.toString() : "").replace(/\n/g, ""));
            });

            spawnProcess.stderr.on("data", (data) =>  {
                const error = (data ? data.toString() : "").replace(/\n/g, "");
                if (error.startsWith("warning")) {
                    this._display.info(error);
                } else {
                    this._display.error(error);
                }
            });

            spawnProcess.on("error", (err) =>  {
                reject(err);
            });

            spawnProcess.on("close", (exitCode) =>  {
                if (exitCode === 0) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}