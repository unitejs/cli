/**
 * Command line parser for CLI
 */
import { Display } from "./display";

export class CommandLineParser {
    private _interpreter: string;
    private _script: string;
    private _command: string;
    private _arguments: { [id: string]: string | null };

    public parse(argv: string[]): void {
        if (argv) {
            if (argv.length > 0) {
                this._interpreter = argv[0];
            }
            if (argv.length > 1) {
                this._script = argv[1];
            }
            let argStart = 2;
            if (argv.length > 2) {
                if (!argv[2].startsWith("--")) {
                    this._command = argv[2];
                    argStart++;
                }
            }
            if (argv.length > argStart) {
                this._arguments = {};

                for (let i = argStart; i < argv.length; i++) {
                    let arg = argv[i];
                    if (arg.startsWith("--")) {
                        arg = arg.substring(2);
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
    }

    public getScript(): string {
        return this._script;
    }

    public getCommand(): string {
        return this._command;
    }

    public getArguments(exclude?: string[]): { [id: string]: string | null } {
        if (this._arguments && exclude && exclude.length > 0) {
            const newArgs: { [id: string]: string | null } = {};

            Object.keys(this._arguments)
                .filter((argKey) => exclude.indexOf(argKey) === -1)
                .forEach((argKey) => {
                    newArgs[argKey] = this._arguments[argKey];
                });

            return newArgs;
        } else {
            return this._arguments;
        }
    }

    public getArgument(argumentName: string): string | null | undefined {
        return this._arguments ? this._arguments[argumentName] : undefined;
    }

    public getNumberArgument(argumentName: string): number | undefined | null {
        const arg = this.getArgument(argumentName);

        if (arg === undefined) {
            return undefined;
        } else if (arg === null) {
            return null;
        } else {
            const val = parseInt(arg, 10);

            return isNaN(val) ? undefined : val;
        }
    }

    public getStringArgument(argumentName: string): string | undefined | null {
        const arg = this.getArgument(argumentName);

        if (arg === undefined) {
            return undefined;
        } else if (arg === null) {
            return null;
        } else {
            if (arg.length >= 2 && arg.startsWith("\"") && arg.endsWith("\"")) {
                return arg.substring(1, arg.length - 2).trim();
            } else {
                return arg.trim();
            }
        }
    }

    public hasArgument(argumentName: string): boolean {
        return this._arguments && argumentName in this._arguments;
    }

    public diagnostics(display: Display): void {
        display.diagnostics("Interpreter: " + (this._interpreter ? this._interpreter : "Unknown"));
        display.diagnostics("Script: " + (this._script ? this._script : "Unknown"));
        display.diagnostics("Command: " + (this._command ? this._command : "Unknown"));
        display.diagnostics("Arguments: " + (this._arguments ? JSON.stringify(this._arguments) : "None"));
    }
}