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
    exception(message, exception, args) {
        this.write("EXCEPTION", message, { exception, args });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SyxDQUFDLENBQUM7Z0NBQ3RCLENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNqQixDQUFDLENBQUMsQ0FBQzt3QkFFSCxNQUFNLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBQzNELENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXRFRCx3QkFzRUMiLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYyJ9
