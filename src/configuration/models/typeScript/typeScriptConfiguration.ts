import { TypeScriptJsx } from "./typeScriptJsx";
import { TypeScriptLib } from "./typeScriptLib";
import { TypeScriptModule } from "./typeScriptModule";
import { TypeScriptModuleResolution } from "./typeScriptModuleResolution";
import { TypeScriptNewLine } from "./typeScriptNewLine";
import { TypeScriptTarget } from "./typeScriptTarget";
/**
 * Model of TypeScript Configuration (tsconfig.json) file.
 * The properties defined here are sourced from https://github.com/Microsoft/TypeScript/blob/master/src/compiler/commandLineParser.ts
 */
export class TypeScriptConfiguration {
    // Basic
    public target?: TypeScriptTarget;
    public module?: TypeScriptModule;
    public lib?: TypeScriptLib[];
    public allowJs?: boolean;
    public checkJs?: boolean;
    public jsx?: TypeScriptJsx;
    public declaration?: boolean;
    public sourceMap?: boolean;
    public outFile?: string;
    public outDir?: string;
    public rootDir?: string;
    public removeComments?: boolean;
    public noEmit?: boolean;
    public importHelpers?: boolean;
    public downlevelIteration?: boolean;
    public isolatedModules?: boolean;
    // Strict Type Checks
    public strict?: boolean;
    public noImplicitAny?: boolean;
    public strictNullChecks?: boolean;
    public noImplicitThis?: boolean;
    public alwaysStrict?: boolean;
    // Additional Checks
    public noUnusedLocals?: boolean;
    public noUnusedParameters?: boolean;
    public noImplicitReturns?: boolean;
    public noFallthroughCasesInSwitch?: boolean;
    // Module Resolution
    public moduleResolution?: TypeScriptModuleResolution;
    public baseUrl?: string;
    public paths?: { [id: string]: string[] };
    public rootDirs?: string[];
    public typeRoots?: string[];
    public types?: string[];
    public allowSyntheticDefaultImports?: boolean;
    // Source Maps
    public sourceRoot?: string;
    public mapRoot?: string;
    public inlineSourceMap?: boolean;
    public inlineSources?: boolean;
    // Experimental
    public experimentalDecorators?: boolean;
    public emitDecoratorMetadata?: boolean;
    // Advanced
    public jsxFactory?: string;
    public diagnostics?: boolean;
    public extendedDiagnostics?: boolean;
    public traceResolution?: boolean;
    public listFiles?: boolean;
    public listEmittedFiles?: boolean;
    public out?: string;
    public reactNamespace?: string;
    public skipDefaultLibCheck?: boolean;
    public charset?: string;
    public emitBOM?: boolean;
    public locale?: string;
    public newLine?: TypeScriptNewLine;
    public noErrorTruncation?: boolean;
    public noLib?: boolean;
    public noResolve?: boolean;
    public stripInternal?: boolean;
    public disableSizeLimit?: boolean;
    public noImplicitUseStrict?: boolean;
    public noEmitHelpers?: boolean;
    public noEmitOnError?: boolean;
    public preserveConstEnums?: boolean;
    public declarationDir?: string;
    public skipLibCheck?: boolean;
    public allowUnusedLabels?: boolean;
    public allowUnreachableCode?: boolean;
    public suppressExcessPropertyErrors?: boolean;
    public suppressImplicitAnyIndexErrors?: boolean;
    public forceConsistentCasingInFileNames?: boolean;
    public maxNodeModuleJsDepth?: number;
}