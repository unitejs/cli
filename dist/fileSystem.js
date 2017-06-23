"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File system class
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
class FileSystem {
    pathCombine(pathName, additional) {
        pathName = this.pathFormat(pathName);
        additional = this.cleanupSeparators(additional);
        return path.join(pathName, additional);
    }
    pathDirectoryRelative(pathName1, pathName2) {
        return "." + path.sep + path.relative(pathName1, pathName2) + path.sep;
    }
    pathFileRelative(pathName1, pathName2) {
        return "." + path.sep + path.relative(pathName1, pathName2);
    }
    pathToWeb(pathName) {
        return pathName.replace(/\\/g, "/");
    }
    pathFormat(pathName) {
        if (pathName === undefined || pathName === null) {
            return pathName;
        }
        else {
            return path.resolve(this.cleanupSeparators(pathName));
        }
    }
    pathGetDirectory(pathName) {
        if (pathName === undefined || pathName === null) {
            return pathName;
        }
        else {
            return path.dirname(this.cleanupSeparators(pathName));
        }
    }
    directoryExists(directoryName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        resolve(false);
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    resolve(stats.isDirectory());
                }
            });
        });
    }
    directoryCreate(directoryName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err && err.code !== "ENOENT") {
                    reject(err);
                }
                if (!err && stats.isDirectory()) {
                    resolve();
                }
                else {
                    const parts = directoryName.split(path.sep);
                    parts.pop();
                    const parentFolder = parts.join(path.sep);
                    return this.directoryCreate(parentFolder)
                        .then(() => {
                        fs.mkdir(directoryName, (err2) => {
                            if (err2) {
                                reject(err2);
                            }
                            else {
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
    directoryDelete(directoryName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(directoryName)) {
                fs.readdir(directoryName, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const allPromises = [];
                        files.forEach((file, index) => {
                            const curPath = path.join(directoryName, file);
                            allPromises.push(new Promise((resolve2, reject2) => {
                                fs.lstat(curPath, (err2, stats) => {
                                    if (err2) {
                                        reject2(err2);
                                    }
                                    else {
                                        if (stats.isDirectory()) {
                                            this.directoryDelete(curPath)
                                                .then(() => {
                                                resolve2();
                                            })
                                                .catch((err5) => {
                                                reject2(err5);
                                            });
                                        }
                                        else {
                                            fs.unlink(curPath, (err3) => {
                                                if (err3) {
                                                    reject2(err3);
                                                }
                                                else {
                                                    resolve2(err3);
                                                }
                                            });
                                        }
                                    }
                                });
                            }));
                        });
                        Promise.all(allPromises)
                            .then(() => {
                            fs.rmdir(directoryName, (err4) => {
                                if (err4) {
                                    reject(err4);
                                }
                                else {
                                    resolve();
                                }
                            });
                        });
                    }
                });
            }
            else {
                resolve();
            }
        });
    }
    fileExists(directoryName, fileName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.lstat(path.join(directoryName, fileName), (err, stats) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        resolve(false);
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    resolve(stats.isFile());
                }
            });
        });
    }
    fileWriteJson(directoryName, fileName, object) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(directoryName, fileName), JSON.stringify(object, null, "\t"), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    fileWriteLines(directoryName, fileName, lines) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(directoryName, fileName), lines ? lines.join(os.EOL) : "", (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    fileReadJson(directoryName, fileName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(directoryName, fileName), (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    try {
                        const obj = JSON.parse(data.toString());
                        resolve(obj);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
            });
        });
    }
    fileReadLines(directoryName, fileName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(directoryName, fileName), (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString().replace(/\r/g, "").split("\n"));
                }
            });
        });
    }
    fileDelete(directoryName, fileName) {
        directoryName = this.pathFormat(directoryName);
        return new Promise((resolve, reject) => {
            fs.unlink(path.join(directoryName, fileName), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    cleanupSeparators(pathName) {
        if (pathName === undefined || pathName === null) {
            return pathName;
        }
        else {
            return pathName.replace(path.sep === "\\" ? /\//g : /\\/g, path.sep);
        }
    }
}
exports.FileSystem = FileSystem;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUNyQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBZ0I7UUFDdEMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUE5T0QsZ0NBOE9DIiwiZmlsZSI6ImZpbGVTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
