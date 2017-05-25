"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logger class
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
class Logger {
    constructor(logLevel, logFile, defaultLogName) {
        this._logLevel = logLevel || 0;
        this._logFile = logFile || path.join(path.resolve("./"), defaultLogName);
        try {
            if (fs.existsSync(this._logFile)) {
                fs.unlinkSync(this._logFile);
            }
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error("Error Deleting Log File: " + err);
        }
    }
    // tslint:disable-next-line:no-any
    log(message, args) {
        this.write("LOG", message, args);
    }
    // tslint:disable-next-line:no-any
    info(message, args) {
        this.write("INFO", message, args);
    }
    // tslint:disable-next-line:no-any
    error(message, args) {
        this.write("ERROR", message, args);
    }
    // tslint:disable-next-line:no-any
    write(type, message, args) {
        if (this._logLevel > 0) {
            try {
                let output = type + ": " + message + os.EOL;
                if (args) {
                    Object.keys(args).forEach((argKey) => {
                        // tslint:disable-next-line:no-any
                        const cache = [];
                        const objectJson = JSON.stringify(args[argKey], (key, value) => {
                            if (typeof value === "object" && value !== null && value !== undefined) {
                                if (cache.indexOf(value) !== -1) {
                                    /* circular reference found, discard key */
                                    return;
                                }
                                else {
                                    cache.push(value);
                                }
                            }
                            return value;
                        });
                        output += "\t\t" + argKey + ": " + objectJson + os.EOL;
                    });
                }
                fs.appendFileSync(this._logFile, output);
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.error("Error Logging: " + err);
            }
        }
    }
}
exports.Logger = Logger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0I7SUFJSSxZQUFZLFFBQTRCLEVBQUUsT0FBMkIsRUFBRSxjQUFzQjtRQUN6RixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBa0M7SUFDM0IsR0FBRyxDQUFDLE9BQWUsRUFBRSxJQUE0QjtRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGtDQUFrQztJQUMzQixJQUFJLENBQUMsT0FBZSxFQUFFLElBQTRCO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0NBQWtDO0lBQzNCLEtBQUssQ0FBQyxPQUFlLEVBQUUsSUFBNEI7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxrQ0FBa0M7SUFDMUIsS0FBSyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsSUFBNEI7UUFDckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQztnQkFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTt3QkFDN0Isa0NBQWtDO3dCQUNsQyxNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7d0JBRXhCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUs7NEJBQ3ZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dDQUNyRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDOUIsMkNBQTJDO29DQUMzQyxNQUFNLENBQUM7Z0NBQ1gsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDSixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUN0QixDQUFDOzRCQUNMLENBQUM7NEJBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDakIsQ0FBQyxDQUFDLENBQUM7d0JBRUgsTUFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO29CQUMzRCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUFqRUQsd0JBaUVDIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
