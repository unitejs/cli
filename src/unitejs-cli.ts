import { Display } from "./display";
/**
 * Main entry point.
 */
export * from "./commandLineParser";

export class CLI {
    public run(process: NodeJS.Process): void {
        try {
            const display = new Display(process);
            const packageJson = require("../package.json");

            display.banner("UniteJS CLI " + (packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version"));
            display.banner("");
            display.info("Command Line Arguments");
            display.info(process.argv.join(" "));
        } catch (err) {
            console.log("An unhandled error occurred: ", err);
        }
    }
}