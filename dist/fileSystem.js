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
                    this.directoryCreate(parentFolder)
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
                                                    resolve2();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUc7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFFBQWdCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RSxDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBOU9ELGdDQThPQyIsImZpbGUiOiJmaWxlU3lzdGVtLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYyJ9
