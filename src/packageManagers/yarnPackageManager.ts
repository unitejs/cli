/**
 * Yarn Package Manager class.
 */
import * as child from "child_process";
import * as npm from "npm";
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";
import { IPackageManager } from "unitejs-core/dist/interfaces/IPackageManager";
import { ILogger } from "unitejs-core/dist/unitejs-core";

export class YarnPackageManager implements IPackageManager {
    private _logger: ILogger;
    private _display: IDisplay;

    constructor(logger: ILogger, display: IDisplay) {
        this._logger = logger;
        this._display = display;
    }

    public async latestVersion(packageName: string): Promise<string> {
        this._display.info("Looking up package info...");
        return new Promise<string>((resolve, reject) => {
            /* We still use NPM for this as yarn doesn't have this facility yet */
            npm.load((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    npm.commands.view([packageName, "version"], (err2, result2, result3, result4, result5) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            const keys = Object.keys(result2);
                            if (keys.length > 0) {
                                resolve(keys[0]);
                            } else {
                                reject(new Error("Package information not found"));
                            }
                        }
                    });
                }
            });
        });
    }

    public async add(packageName: string, version: string, isDev: boolean): Promise<void> {
        this._display.info("Adding package...");

        const args = ["add", packageName + "@" + version];
        if (isDev) {
            args.push("--dev");
        }

        return this.execYarn(args);
    }

    public async remove(packageName: string, isDev: boolean): Promise<void> {
        this._display.info("Removing package...");

        const args = ["remove", packageName];
        if (isDev) {
            args.push("--dev");
        }

        return this.execYarn(args);
    }

    private async execYarn(args: string[]): Promise<void> {
        const isWin = /^win/.test(process.platform);

        return new Promise<void>((resolve, reject) => {
            const spawnProcess = child.spawn("yarn" + (isWin ? ".cmd" : ""), args);

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