"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineConstants_1 = require("./commandLineConstants");
const commandLineParser_1 = require("./commandLineParser");
const display_1 = require("./display");
/**
 * Main entry point.
 */
class CLI {
    run(process) {
        try {
            const commandLineParser = new commandLineParser_1.CommandLineParser();
            commandLineParser.parse(process.argv);
            const display = new display_1.Display(process, commandLineParser.hasArgument(commandLineConstants_1.CommandLineConstants.NO_COLOR));
            const packageJson = require("../package.json");
            display.banner("UniteJS CLI " + (packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version"));
            display.banner("");
            if (commandLineParser.argumentCount([commandLineConstants_1.CommandLineConstants.NO_COLOR]) === 0) {
                console.log("This is help");
            }
            else {
                commandLineParser.diagnostics(display);
            }
            return 0;
        }
        catch (err) {
            console.log("An unhandled error occurred: ", err);
            return 1;
        }
    }
}
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXRlanMtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBQzlELDJEQUF3RDtBQUN4RCx1Q0FBb0M7QUFDcEM7O0dBRUc7QUFFSDtJQUNXLEdBQUcsQ0FBQyxPQUF1QjtRQUM5QixJQUFJLENBQUM7WUFDRCxNQUFNLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztZQUNsRCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRDLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLDJDQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkcsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVuQixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBRSwyQ0FBb0IsQ0FBQyxRQUFRLENBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXhCRCxrQkF3QkMiLCJmaWxlIjoidW5pdGVqcy1jbGkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjIn0=
