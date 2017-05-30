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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFHN0I7SUFJSSxZQUFZLFFBQW1DLEVBQUUsT0FBa0MsRUFBRSxjQUFzQjtRQUN2RyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBZSxFQUFFLElBQTRCO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sSUFBSSxDQUFDLE9BQWUsRUFBRSxJQUE0QjtRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFlLEVBQUUsSUFBNEI7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxTQUFTLENBQUMsT0FBZSxFQUFFLFNBQWMsRUFBRSxJQUE0QjtRQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sS0FBSyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsSUFBNEI7UUFDckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQztnQkFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTt3QkFDN0IsTUFBTSxLQUFLLEdBQVUsRUFBRSxDQUFDO3dCQUV4QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLOzRCQUN2RCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQ0FDckUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzlCLDJDQUEyQztvQ0FDM0MsTUFBTSxDQUFDO2dDQUNYLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDdEIsQ0FBQzs0QkFDTCxDQUFDOzRCQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ2pCLENBQUMsQ0FBQyxDQUFDO3dCQUVILE1BQU0sSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxVQUFVLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDM0QsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsc0NBQXNDO2dCQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBaEVELHdCQWdFQyIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
