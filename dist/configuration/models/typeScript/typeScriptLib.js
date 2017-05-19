"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum for TypeScript Configuration lib.
 */
var TypeScriptLib;
(function (TypeScriptLib) {
    // JavaScript only
    TypeScriptLib[TypeScriptLib["es5"] = 0] = "es5";
    TypeScriptLib[TypeScriptLib["es6"] = 1] = "es6";
    TypeScriptLib[TypeScriptLib["es2015"] = 2] = "es2015";
    TypeScriptLib[TypeScriptLib["es7"] = 3] = "es7";
    TypeScriptLib[TypeScriptLib["es2016"] = 4] = "es2016";
    TypeScriptLib[TypeScriptLib["es2017"] = 5] = "es2017";
    TypeScriptLib[TypeScriptLib["esnext"] = 6] = "esnext";
    // Host only
    TypeScriptLib[TypeScriptLib["dom"] = 7] = "dom";
    TypeScriptLib[TypeScriptLib["dom.iterable"] = 8] = "dom.iterable";
    TypeScriptLib[TypeScriptLib["webworker"] = 9] = "webworker";
    TypeScriptLib[TypeScriptLib["scripthost"] = 10] = "scripthost";
    // ES2015 Or ESNext By-feature options
    TypeScriptLib[TypeScriptLib["es2015.core"] = 11] = "es2015.core";
    TypeScriptLib[TypeScriptLib["es2015.collection"] = 12] = "es2015.collection";
    TypeScriptLib[TypeScriptLib["es2015.generator"] = 13] = "es2015.generator";
    TypeScriptLib[TypeScriptLib["es2015.iterable"] = 14] = "es2015.iterable";
    TypeScriptLib[TypeScriptLib["es2015.promise"] = 15] = "es2015.promise";
    TypeScriptLib[TypeScriptLib["es2015.proxy"] = 16] = "es2015.proxy";
    TypeScriptLib[TypeScriptLib["es2015.reflect"] = 17] = "es2015.reflect";
    TypeScriptLib[TypeScriptLib["es2015.symbol"] = 18] = "es2015.symbol";
    TypeScriptLib[TypeScriptLib["es2015.symbol.wellknown"] = 19] = "es2015.symbol.wellknown";
    TypeScriptLib[TypeScriptLib["es2016.array.include"] = 20] = "es2016.array.include";
    TypeScriptLib[TypeScriptLib["es2017.object"] = 21] = "es2017.object";
    TypeScriptLib[TypeScriptLib["es2017.sharedmemory"] = 22] = "es2017.sharedmemory";
    TypeScriptLib[TypeScriptLib["es2017.string"] = 23] = "es2017.string";
    TypeScriptLib[TypeScriptLib["esnext.asynciterable"] = 24] = "esnext.asynciterable";
})(TypeScriptLib = exports.TypeScriptLib || (exports.TypeScriptLib = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3VyYXRpb24vbW9kZWxzL3R5cGVTY3JpcHQvdHlwZVNjcmlwdExpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBWSxhQTZCWDtBQTdCRCxXQUFZLGFBQWE7SUFDckIsa0JBQWtCO0lBQ2xCLCtDQUFHLENBQUE7SUFDSCwrQ0FBRyxDQUFBO0lBQ0gscURBQU0sQ0FBQTtJQUNOLCtDQUFHLENBQUE7SUFDSCxxREFBTSxDQUFBO0lBQ04scURBQU0sQ0FBQTtJQUNOLHFEQUFNLENBQUE7SUFDTixZQUFZO0lBQ1osK0NBQUcsQ0FBQTtJQUNILGlFQUFjLENBQUE7SUFDZCwyREFBUyxDQUFBO0lBQ1QsOERBQVUsQ0FBQTtJQUNWLHNDQUFzQztJQUN0QyxnRUFBYSxDQUFBO0lBQ2IsNEVBQW1CLENBQUE7SUFDbkIsMEVBQWtCLENBQUE7SUFDbEIsd0VBQWlCLENBQUE7SUFDakIsc0VBQWdCLENBQUE7SUFDaEIsa0VBQWMsQ0FBQTtJQUNkLHNFQUFnQixDQUFBO0lBQ2hCLG9FQUFlLENBQUE7SUFDZix3RkFBeUIsQ0FBQTtJQUN6QixrRkFBc0IsQ0FBQTtJQUN0QixvRUFBZSxDQUFBO0lBQ2YsZ0ZBQXFCLENBQUE7SUFDckIsb0VBQWUsQ0FBQTtJQUNmLGtGQUFzQixDQUFBO0FBQzFCLENBQUMsRUE3QlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUE2QnhCIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb24vbW9kZWxzL3R5cGVTY3JpcHQvdHlwZVNjcmlwdExpYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBFbnVtIGZvciBUeXBlU2NyaXB0IENvbmZpZ3VyYXRpb24gbGliLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gVHlwZVNjcmlwdExpYiB7XHJcbiAgICAvLyBKYXZhU2NyaXB0IG9ubHlcclxuICAgIGVzNSxcclxuICAgIGVzNixcclxuICAgIGVzMjAxNSxcclxuICAgIGVzNyxcclxuICAgIGVzMjAxNixcclxuICAgIGVzMjAxNyxcclxuICAgIGVzbmV4dCxcclxuICAgIC8vIEhvc3Qgb25seVxyXG4gICAgZG9tLFxyXG4gICAgXCJkb20uaXRlcmFibGVcIixcclxuICAgIHdlYndvcmtlcixcclxuICAgIHNjcmlwdGhvc3QsXHJcbiAgICAvLyBFUzIwMTUgT3IgRVNOZXh0IEJ5LWZlYXR1cmUgb3B0aW9uc1xyXG4gICAgXCJlczIwMTUuY29yZVwiLFxyXG4gICAgXCJlczIwMTUuY29sbGVjdGlvblwiLFxyXG4gICAgXCJlczIwMTUuZ2VuZXJhdG9yXCIsXHJcbiAgICBcImVzMjAxNS5pdGVyYWJsZVwiLFxyXG4gICAgXCJlczIwMTUucHJvbWlzZVwiLFxyXG4gICAgXCJlczIwMTUucHJveHlcIixcclxuICAgIFwiZXMyMDE1LnJlZmxlY3RcIixcclxuICAgIFwiZXMyMDE1LnN5bWJvbFwiLFxyXG4gICAgXCJlczIwMTUuc3ltYm9sLndlbGxrbm93blwiLFxyXG4gICAgXCJlczIwMTYuYXJyYXkuaW5jbHVkZVwiLFxyXG4gICAgXCJlczIwMTcub2JqZWN0XCIsXHJcbiAgICBcImVzMjAxNy5zaGFyZWRtZW1vcnlcIixcclxuICAgIFwiZXMyMDE3LnN0cmluZ1wiLFxyXG4gICAgXCJlc25leHQuYXN5bmNpdGVyYWJsZVwiXHJcbn0iXX0=
