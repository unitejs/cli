/**
 * File system class
 */
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {IFileSystem} from "unitejs-core/dist/unitejs-core";

export class FileSystem implements IFileSystem {
    public pathCombine(pathName: string, additional: string): string {
        pathName = this.pathFormat(pathName);
        additional = this.cleanupSeparators(additional);
        return path.join(pathName, additional);
    }

    public pathDirectoryRelative(pathName1: string, pathName2: string): string {
        return "." + path.sep + path.relative(pathName1, pathName2) + path.sep;
    }

    public pathFileRelative(pathName1: string, pathName2: string): string {
        return "." + path.sep + path.relative(pathName1, pathName2);
    }

    public pathToWeb(pathName: string): string {
        return pathName.replace(/\\/g, "/");
    }

    public pathFormat(pathName: string): string {
        if (pathName === undefined || pathName === null) {
            return pathName;
        } else {
            return path.resolve(this.cleanupSeparators(pathName));
        }
    }

    public pathGetDirectory(pathName: string): string {
        if (pathName === undefined || pathName === null) {
            return pathName;
        } else {
            return path.dirname(this.cleanupSeparators(pathName));
        }
    }

    public directoryExists(directoryName: string): Promise<boolean> {
        directoryName = this.pathFormat(directoryName);
        return new Promise<boolean>((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        resolve(false);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(stats.isDirectory());
                }
            });
        });
    }

    public directoryCreate(directoryName: string): Promise<void> {
        directoryName = this.pathFormat(directoryName);
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

    public fileExists(directoryName: string, fileName: string): Promise<boolean> {
        directoryName = this.pathFormat(directoryName);
        return new Promise<boolean>((resolve, reject) => {
            fs.lstat(path.join(directoryName, fileName), (err, stats) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        resolve(false);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(stats.isFile());
                }
            });
        });
    }

    public fileWriteJson(directoryName: string, fileName: string, object: any): Promise<void> {
        directoryName = this.pathFormat(directoryName);

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
        directoryName = this.pathFormat(directoryName);

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

    public fileReadJson<T>(directoryName: string, fileName: string): Promise<T> {
        directoryName = this.pathFormat(directoryName);

        return new Promise<T>((resolve, reject) => {
            fs.readFile(path.join(directoryName, fileName), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data.toString()));
                }
            });
        });
    }

    public fileReadLines(directoryName: string, fileName: string): Promise<string[]> {
        directoryName = this.pathFormat(directoryName);

        return new Promise<string[]>((resolve, reject) => {
            fs.readFile(path.join(directoryName, fileName), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString().replace(/\r/g, "").split("\n"));
                }
            });
        });
    }

    public fileDelete(directoryName: string, fileName: string): Promise<void> {
        directoryName = this.pathFormat(directoryName);

        return new Promise<void>((resolve, reject) => {
            fs.unlink(path.join(directoryName, fileName), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private cleanupSeparators(pathName: string): string {
        if (pathName === undefined || pathName === null) {
            return pathName;
        } else {
            return pathName.replace(path.sep === "\\" ? /\//g : /\\/g, path.sep);
        }
    }
}