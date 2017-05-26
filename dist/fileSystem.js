"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File system class
 */
const fs = require("fs");
const path = require("path");
class FileSystem {
    directoryPathFormat(directoryName) {
        if (directoryName === undefined || directoryName === null) {
            return directoryName;
        }
        else {
            return path.resolve(directoryName.replace(path.sep === "\\" ? /\//g : /\\/g, path.sep));
        }
    }
    directoryExists(directoryName) {
        return new Promise((resolve, reject) => {
            fs.lstat(directoryName, (err, stats) => {
                if (err) {
                    reject(err);
                }
                resolve(stats.isDirectory());
            });
        });
    }
    directoryCreate(directoryName) {
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
    fileWrite(directoryName, fileName, contents) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(directoryName, fileName), contents, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.FileSystem = FileSystem;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0I7SUFDVyxtQkFBbUIsQ0FBQyxhQUFxQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLGFBQXFCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBVSxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUs7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGVBQWUsQ0FBQyxhQUFxQjtRQUN4QyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNyQyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLO2dCQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNaLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7eUJBQ3BDLElBQUksQ0FBQzt3QkFDRixFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUk7NEJBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNqQixDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLE9BQU8sRUFBRSxDQUFDOzRCQUNkLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLElBQUk7d0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxTQUFTLENBQUMsYUFBcUIsRUFBRSxRQUFnQixFQUFFLFFBQWdCO1FBQ3RFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3JDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRztnQkFDM0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE5REQsZ0NBOERDIiwiZmlsZSI6ImZpbGVTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
