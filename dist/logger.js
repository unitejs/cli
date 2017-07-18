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
    log(message, args) {
        this.write("LOG", message, args);
    }
    info(message, args) {
        this.write("INFO", message, args);
    }
    error(message, args) {
        this.write("ERROR", message, args);
    }
    exception(message, exception, args) {
        this.write("EXCEPTION", message, { exception, args });
    }
    write(type, message, args) {
        if (this._logLevel > 0) {
            try {
                let output = type + ": " + message + os.EOL;
                if (args) {
                    Object.keys(args).forEach((argKey) => {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsNkJBQTZCO0FBRzdCO0lBSUksWUFBWSxRQUFtQyxFQUFFLE9BQWtDLEVBQUUsY0FBc0I7UUFDdkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLHNDQUFzQztZQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLE9BQWUsRUFBRSxJQUE0QjtRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUFlLEVBQUUsSUFBNEI7UUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBZSxFQUFFLElBQTRCO1FBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sU0FBUyxDQUFDLE9BQWUsRUFBRSxTQUFjLEVBQUUsSUFBNEI7UUFDMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVPLEtBQUssQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLElBQTRCO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUM7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07d0JBQzdCLE1BQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQzt3QkFFeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSzs0QkFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUM5QiwyQ0FBMkM7b0NBQzNDLE1BQU0sQ0FBQztnQ0FDWCxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3RCLENBQUM7NEJBQ0wsQ0FBQzs0QkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNqQixDQUFDLENBQUMsQ0FBQzt3QkFFSCxNQUFNLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBQzNELENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLHNDQUFzQztnQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQWhFRCx3QkFnRUMiLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYyJ9
