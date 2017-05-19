/**
 * Enum for TypeScript Configuration lib.
 */
export enum TypeScriptLib {
    // JavaScript only
    es5,
    es6,
    es2015,
    es7,
    es2016,
    es2017,
    esnext,
    // Host only
    dom,
    "dom.iterable",
    webworker,
    scripthost,
    // ES2015 Or ESNext By-feature options
    "es2015.core",
    "es2015.collection",
    "es2015.generator",
    "es2015.iterable",
    "es2015.promise",
    "es2015.proxy",
    "es2015.reflect",
    "es2015.symbol",
    "es2015.symbol.wellknown",
    "es2016.array.include",
    "es2017.object",
    "es2017.sharedmemory",
    "es2017.string",
    "esnext.asynciterable"
}