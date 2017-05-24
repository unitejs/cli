import { CommandLineConstants } from "./commandLineConstants";
import { CommandLineParser } from "./commandLineParser";
import { Display } from "./display";
/**
 * Main entry point.
 */

export class CLI {
    public run(process: NodeJS.Process): number {
        try {
            const commandLineParser = new CommandLineParser();
            commandLineParser.parse(process.argv);

            const display = new Display(process, commandLineParser.hasArgument(CommandLineConstants.NO_COLOR));
            const packageJson = require("../package.json");

            display.banner("UniteJS CLI " + (packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version"));
            display.banner("");

            if (commandLineParser.argumentCount([ CommandLineConstants.NO_COLOR ]) === 0) {
                console.log("This is help");
            } else {
                commandLineParser.diagnostics(display);
            }

            return 0;
        } catch (err) {
            console.log("An unhandled error occurred: ", err);
            return 1;
        }
    }
}