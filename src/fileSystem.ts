/**
 * File system class
 */
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {IFileSystem} from "unitejs-core/dist/unitejs-core";

export class FileSystem implements IFileSystem {
    public directoryPathCombine(directoryName: string, additional: string): string {
        directoryName = this.directoryPathFormat(directoryName);
        additional = this.cleanupSeparators(additional);
        return path.join(directoryName, additional);
    }

    public directoryPathFormat(directoryName: string): string {
        if (directoryName === undefined || directoryName === null) {
            return directoryName;
        } else {
            return path.resolve(this.cleanupSeparators(directoryName));
        }
    }

    public directoryExists(directoryName: string): Promise<boolean> {
        directoryName = this.directoryPathFormat(directoryName);
        return new Promise<boolean>((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err) {
                    reject(err);
                }
                resolve(stats.isDirectory());
            });
        });
    }

    public directoryCreate(directoryName: string): Promise<void> {
        directoryName = this.directoryPathFormat(directoryName);
        return new Promise<void>((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err && err.code !== "ENOENT") {
                    reject(err);
                }

                if (!err && stats.isDirectory()) {
                    resolve();
                } else {
                    const parts = directoryName.split(path.sep);
                    parts.pop();
                    const parentFolder = parts.join(path.sep);
                    return this.directoryCreate(parentFolder)
                        .then(() => {
                            fs.mkdir(directoryName, (err2) => {
                                if (err2) {
                                    reject(err2);
                                } else {
                                    resolve();
                                }
                            });
                        })
                        .catch((err3) => {
                            reject(err3);
                        });
                }
            });
        });
    }

    public fileWriteJson(directoryName: string, fileName: string, object: any): Promise<void> {
        directoryName = this.directoryPathFormat(directoryName);

        return new Promise<void>((resolve, reject) => {
            fs.writeFile(path.join(directoryName, fileName), JSON.stringify(object, null, "\t"), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public fileWriteLines(directoryName: string, fileName: string, lines: string[]): Promise<void> {
        directoryName = this.directoryPathFormat(directoryName);

        return new Promise<void>((resolve, reject) => {
            fs.writeFile(path.join(directoryName, fileName), lines ? lines.join(os.EOL) : "", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private cleanupSeparators(directoryName: string): string {
        if (directoryName === undefined || directoryName === null) {
            return directoryName;
        } else {
            return directoryName.replace(path.sep === "\\" ? /\//g : /\\/g, path.sep);
        }
    }
}