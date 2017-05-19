"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const display_1 = require("./display");
/**
 * Main entry point.
 */
__export(require("./commandLineParser"));
class CLI {
    run(process) {
        try {
            const display = new display_1.Display(process);
            const packageJson = require("../package.json");
            display.banner("UniteJS CLI " + (packageJson && packageJson.version ? "v" + packageJson.version : " Unknown Version"));
            display.banner("");
            display.info("Command Line Arguments");
            display.info(process.argv.join(" "));
        }
        catch (err) {
            console.log("An unhandled error occurred: ", err);
        }
    }
}
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXRlanMtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUNBQW9DO0FBQ3BDOztHQUVHO0FBQ0gseUNBQW9DO0FBRXBDO0lBQ1csR0FBRyxDQUFDLE9BQXVCO1FBQzlCLElBQUksQ0FBQztZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUUvQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2SCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0NBQ0o7QUFkRCxrQkFjQyIsImZpbGUiOiJ1bml0ZWpzLWNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XHJcbi8qKlxyXG4gKiBNYWluIGVudHJ5IHBvaW50LlxyXG4gKi9cclxuZXhwb3J0ICogZnJvbSBcIi4vY29tbWFuZExpbmVQYXJzZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDTEkge1xyXG4gICAgcHVibGljIHJ1bihwcm9jZXNzOiBOb2RlSlMuUHJvY2Vzcyk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSBuZXcgRGlzcGxheShwcm9jZXNzKTtcclxuICAgICAgICAgICAgY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xyXG5cclxuICAgICAgICAgICAgZGlzcGxheS5iYW5uZXIoXCJVbml0ZUpTIENMSSBcIiArIChwYWNrYWdlSnNvbiAmJiBwYWNrYWdlSnNvbi52ZXJzaW9uID8gXCJ2XCIgKyBwYWNrYWdlSnNvbi52ZXJzaW9uIDogXCIgVW5rbm93biBWZXJzaW9uXCIpKTtcclxuICAgICAgICAgICAgZGlzcGxheS5iYW5uZXIoXCJcIik7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuaW5mbyhcIkNvbW1hbmQgTGluZSBBcmd1bWVudHNcIik7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuaW5mbyhwcm9jZXNzLmFyZ3Yuam9pbihcIiBcIikpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFuIHVuaGFuZGxlZCBlcnJvciBvY2N1cnJlZDogXCIsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
