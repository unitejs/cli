/**
 * NPM Package Manager class.
 */
import * as npm from "npm";
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";
import { IPackageManager } from "unitejs-core/dist/interfaces/IPackageManager";
import { ILogger } from "unitejs-core/dist/unitejs-core";

export class NpmPackageManager implements IPackageManager {
    private _logger: ILogger;
    private _display: IDisplay;

    constructor(logger: ILogger, display: IDisplay) {
        this._logger = logger;
        this._display = display;
    }

    public async latestVersion(packageName: string): Promise<string> {
        this._display.info("Loading NPM Package Manager");
        return new Promise<string>((resolve, reject) => {
            npm.load((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this._display.info("Looking up package info...");

                    npm.commands.view([packageName, "version"], (err2, result2, result3, result4, result5) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            const keys = Object.keys(result2);
                            if (keys.length > 0) {
                                resolve(keys[0]);
                            } else {
                                reject(new Error("Package information ot found"));
                            }
                        }
                    });
                }
            });
        });
    }

    public async add(packageName: string, version: string, isDev: boolean): Promise<void> {
        this._display.info("Loading NPM Package Manager");
        return new Promise<void>((resolve, reject) => {
            const config: { [id: string]: any } = {};
            if (isDev) {
                config["save-dev"] = true;
            } else {
                config["save-prod"] = true;
            }
            npm.load(config, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this._display.info("Adding package...");

                    npm.commands.install([packageName + "@" + version], (err2, result2, result3, result4, result5) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    public async remove(packageName: string, isDev: boolean): Promise<void> {
        this._display.info("Loading NPM Package Manager");
        return new Promise<void>((resolve, reject) => {
            const config: { [id: string]: any } = {};
            if (isDev) {
                config["save-dev"] = true;
            } else {
                config.save = true;
            }
            npm.load(config, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this._display.info("Removing package...");

                    npm.commands.uninstall([packageName], (err2, result2, result3, result4, result5) => {
                        if (err2) {
                            reject(err2);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
}