import { PackageBugs } from "./packageBugs";
import { PackagePerson } from "./packagePerson";
import { PackageRepository } from "./packageRepository";
/**
 * Model of Package Configuration (package.json) file.
 * The properties defined here are sourced from https://docs.npmjs.com/files/package.json
 */
export declare class PackageConfiguration {
    name: string;
    version: string;
    description?: string;
    keywords?: string[];
    homepage?: string;
    bugs?: string | PackageBugs;
    license?: string;
    author?: string | PackagePerson;
    contributors?: string[] | PackagePerson[];
    maintainers?: string[] | PackagePerson[];
    files?: string;
    main?: string;
    bin?: string | {
        [id: string]: string;
    };
    man?: string | string[];
    directories?: {
        [id: string]: string;
    };
    repository: PackageRepository;
    scripts?: {
        [id: string]: string;
    };
    config?: {
        [id: string]: string;
    };
    dependencies?: {
        [id: string]: string;
    };
    devDependencies?: {
        [id: string]: string;
    };
    peerDependencies?: {
        [id: string]: string;
    };
    bundledDependencies?: string[];
    optionalDependencies?: {
        [id: string]: string;
    };
    engines?: {
        [id: string]: string;
    };
    os?: string[];
    cpu?: string[];
    preferGlobal?: boolean;
    private?: boolean;
    publishConfig?: {
        [id: string]: string;
    };
}
