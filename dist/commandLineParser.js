"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Command line parser for CLI
 */
class CommandLineParser {
    parse(argv) {
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
                    const eqIndex = arg.indexOf("=");
                    if (eqIndex === -1) {
                        this._arguments[arg] = null;
                    }
                    else {
                        this._arguments[arg.substring(0, eqIndex)] = arg.substring(eqIndex + 1);
                    }
                }
            }
        }
    }
    argumentCount(exclude) {
        return this._arguments ? Object.keys(this._arguments).filter((argName) => (exclude || []).indexOf(argName) === -1).length : 0;
    }
    hasArgument(argumentName) {
        return this._arguments && argumentName in this._arguments;
    }
    getBoolean(argumentName) {
        const ret = this.getArgument(argumentName);
        return ret === undefined ? undefined : (ret === null || ret.length === 0 ? null : !!ret);
    }
    getArgument(argumentName) {
        if (argumentName in this._arguments) {
            return this._arguments[argumentName];
        }
        return undefined;
    }
    diagnostics(display) {
        display.diagnostics("Interpreter: " + (this._interpreter ? this._interpreter : "Unknown"));
        display.diagnostics("Script: " + (this._script ? this._script : "Unknown"));
        display.diagnostics("Arguments: " + (this._arguments ? JSON.stringify(this._arguments) : "None"));
    }
}
exports.CommandLineParser = CommandLineParser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1hbmRMaW5lUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0E7O0dBRUc7QUFDSDtJQUtXLEtBQUssQ0FBQyxJQUFjO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUVyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixNQUFNLE9BQU8sR0FBVyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDaEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzVFLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGFBQWEsQ0FBQyxPQUFpQjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBRU0sV0FBVyxDQUFDLFlBQW9CO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzlELENBQUM7SUFFTSxVQUFVLENBQUMsWUFBb0I7UUFDbEMsTUFBTSxHQUFHLEdBQThCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdEUsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTSxXQUFXLENBQUMsWUFBb0I7UUFDbkMsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBZ0I7UUFDL0IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMzRixPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzVFLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7Q0FDSjtBQXhERCw4Q0F3REMiLCJmaWxlIjoiY29tbWFuZExpbmVQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
