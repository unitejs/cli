/**
 * Logger class
 */
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {ILogger} from "unitejs-core/dist/unitejs-core";

export class Logger implements ILogger {
    private _logLevel: number;
    private _logFile: string;

    constructor(logLevel: number | undefined | null, logFile: string | undefined | null, defaultLogName: string) {
        this._logLevel = logLevel || 0;
        this._logFile = logFile || path.join(path.resolve("./"), defaultLogName);
        try {
            if (fs.existsSync(this._logFile)) {
                fs.unlinkSync(this._logFile);
            }
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error("Error Deleting Log File: " + err);
        }
    }

    // tslint:disable-next-line:no-any
    public log(message: string, args?: { [id: string]: any }): void {
        this.write("LOG", message, args);
    }

    // tslint:disable-next-line:no-any
    public info(message: string, args?: { [id: string]: any }): void {
        this.write("INFO", message, args);
    }

    // tslint:disable-next-line:no-any
    public error(message: string, args?: { [id: string]: any }): void {
        this.write("ERROR", message, args);
    }

    // tslint:disable-next-line:no-any
    public exception(message: string, exception: any, args?: { [id: string]: any }): void {
        this.write("EXCEPTION", message, { exception, args });
    }

    // tslint:disable-next-line:no-any
    private write(type: string, message: string, args?: { [id: string]: any }): void {
        if (this._logLevel > 0) {
            try {
                let output = type + ": " + message + os.EOL;
                if (args) {
                    Object.keys(args).forEach((argKey) => {
                        // tslint:disable-next-line:no-any
                        const cache: any[] = [];

                        const objectJson = JSON.stringify(args[argKey], (key, value) => {
                            if (typeof value === "object" && value !== null && value !== undefined) {
                                if (cache.indexOf(value) !== -1) {
                                    /* circular reference found, discard key */
                                    return;
                                } else {
                                    cache.push(value);
                                }
                            }
                            return value;
                        });

                        output += "\t\t" + argKey + ": " + objectJson + os.EOL;
                    });
                }

                fs.appendFileSync(this._logFile, output);
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.error("Error Logging: " + err);
            }
        }
    }
}