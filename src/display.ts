/**
 * Display class
 */
import { IDisplay } from "unitejs-core/dist/interfaces/IDisplay";

// tslint:disable:no-console
export class Display implements IDisplay {
    private _colorsOn: boolean;
    private _colors: { [id: string]: { start: number, stop: number } };

    constructor(process: NodeJS.Process, noColor: boolean) {
        this._colorsOn = this.calculateColors(process, noColor);
        this._colors = {
            reset: { start: 0, stop: 0 },

            bold: { start: 1, stop: 22 },
            dim: { start: 2, stop: 22 },
            italic: { start: 3, stop: 23 },
            underline: { start: 4, stop: 24 },
            inverse: { start: 7, stop: 27 },
            hidden: { start: 8, stop: 28 },
            strikethrough: { start: 9, stop: 29 },

            black: { start: 30, stop: 39 },
            red: { start: 31, stop: 39 },
            green: { start: 32, stop: 39 },
            yellow: { start: 33, stop: 39 },
            blue: { start: 34, stop: 39 },
            magenta: { start: 35, stop: 39 },
            cyan: { start: 36, stop: 39 },
            white: { start: 37, stop: 39 },
            gray: { start: 90, stop: 39 },
            grey: { start: 90, stop: 39 },

            bgBlack: { start: 40, stop: 49 },
            bgRed: { start: 41, stop: 49 },
            bgGreen: { start: 42, stop: 49 },
            bgYellow: { start: 43, stop: 49 },
            bgBlue: { start: 44, stop: 49 },
            bgMagenta: { start: 45, stop: 49 },
            bgCyan: { start: 46, stop: 49 },
            bgWhite: { start: 47, stop: 49 }
        };
    }

    public banner(message: string): void {
        console.log(this.colorStart("green") + message + this.colorStop("green"));
    }

    public log(message: string, args?: string): void {
        if (args) {
            console.log(this.colorStart("white") + message + ": " + this.colorStop("white") + this.colorStart("cyan") + args + this.colorStop("cyan"));
        } else {
            console.log(this.colorStart("white") + message + this.colorStop("white"));
        }
    }

    public info(message: string): void {
        console.log(this.colorStart("cyan") + message + this.colorStop("cyan"));
    }

    public error(message: string): void {
        console.log(this.colorStart("red") + message + this.colorStop("red"));
    }

    public diagnostics(message: string): void {
        console.log(this.colorStart("yellow") + message + this.colorStop("yellow"));
    }

    private colorStart(color: string): string {
        return this._colorsOn ? "\u001b[" + this._colors[color].start + "m" : "";
    }

    private colorStop(color: string): string {
        return this._colorsOn ? "\u001b[" + this._colors[color].stop + "m" : "";
    }

    private calculateColors(process: NodeJS.Process, noColor: boolean): boolean {
        if (noColor === true) {
            return false;
        }

        // if (process.stdout && !process.stdout.isTTY) {
        //     return false;
        // }

        if (process.platform === "win32") {
            return true;
        }

        if ("COLORTERM" in process.env) {
            return true;
        }

        if (process.env.TERM === "dumb") {
            return false;
        }

        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
            return true;
        }

        return false;
    }
}