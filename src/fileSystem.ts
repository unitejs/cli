/**
 * File system class
 */
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {IFileSystem} from "unitejs-core/dist/unitejs-core";

export class FileSystem implements IFileSystem {
    public directoryPathFormat(directoryName: string): string {
        if (directoryName === undefined || directoryName === null) {
            return directoryName;
        } else {
            return path.resolve(directoryName.replace(path.sep === "\\" ? /\//g : /\\/g, path.sep));
        }
    }

    public directoryExists(directoryName: string): Promise<boolean> {
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
}