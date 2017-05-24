import { Display } from "./display";
/**
 * Command line parser for CLI
 */
export class CommandLineParser {
    private _interpreter: string;
    private _script: string;
    private _arguments: { [id: string]: string | null };

    public parse(argv: string[]): void {
        if (argv) {
            if (argv.length > 0) {
                this._interpreter = argv[0];
            }
            if (argv.length > 1) {
                this._script = argv[1];
            }
            if (argv.length > 2) {
                this._arguments = {};

                for (let i = 2; i < argv.length; i++) {
                    const arg = argv[i];
                    const eqIndex: number = arg.indexOf("=");
                    if (eqIndex === -1) {
                        this._arguments[arg] = null;
                    } else {
                        this._arguments[arg.substring(0, eqIndex)] = arg.substring(eqIndex + 1);
                    }
                }
            }
        }
    }

    public argumentCount(exclude: string[]): number {
        return this._arguments ? Object.keys(this._arguments).filter((argName) => (exclude || []).indexOf(argName) === -1).length : 0;
    }

    public hasArgument(argumentName: string): boolean {
        return this._arguments && argumentName in this._arguments;
    }

    public getBoolean(argumentName: string): boolean | undefined | null {
        const ret: string | null | undefined = this.getArgument(argumentName);

        return ret === undefined ? undefined : (ret === null || ret.length === 0 ? null : !!ret);
    }

    public getArgument(argumentName: string): string | null | undefined {
        if (argumentName in this._arguments) {
            return this._arguments[argumentName];
        }

        return undefined;
    }

    public diagnostics(display: Display): void {
        display.diagnostics("Interpreter: " + (this._interpreter ? this._interpreter : "Unknown"));
        display.diagnostics("Script: " + (this._script ? this._script : "Unknown"));
        display.diagnostics("Arguments: " + (this._arguments ? JSON.stringify(this._arguments) : "None"));
    }
}