/**
 * NPM Package Manager class.
 */
import * as npm from "npm";
import { PackageConfiguration } from "unitejs-core/dist/configuration/models/packages/packageConfiguration";
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-core/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-core/dist/interfaces/ILogger";
import { IPackageManager } from "unitejs-core/dist/interfaces/IPackageManager";

export class NpmPackageManager implements IPackageManager {
    private _logger: ILogger;
    private _display: IDisplay;
    private _fileSystem: IFileSystem;

    constructor(logger: ILogger, display: IDisplay, fileSystem: IFileSystem) {
        this._logger = logger;
        this._display = display;
        this._fileSystem = fileSystem;
    }

    public async info(packageName: string): Promise<PackageConfiguration> {
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
        return new Promise<void>((resolve, reject) => {
            const config: { [id: string]: any } = {};
            config.prefix = this._fileSystem.pathFormat(workingDirectory);
            if (isDev) {
                config["save-dev"] = true;
            } else {
                config["save-prod"] = true;
            }
            npm.load(config, (err, result) => {
                if (err) {
                    reject(err);
                } else {
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

    public async remove(workingDirectory: string, packageName: string, isDev: boolean): Promise<void> {
        this._display.info("Removing package...");
        return new Promise<void>((resolve, reject) => {
            const config: { [id: string]: any } = {};
            config.prefix = this._fileSystem.pathFormat(workingDirectory);
            if (isDev) {
                config["save-dev"] = true;
            } else {
                config.save = true;
            }
            npm.load(config, (err, result) => {
                if (err) {
                    reject(err);
                } else {
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