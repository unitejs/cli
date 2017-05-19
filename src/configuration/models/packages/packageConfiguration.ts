import { PackageBugs } from "./packageBugs";
import { PackagePerson } from "./packagePerson";
import { PackageRepository } from "./packageRepository";
/**
 * Model of Package Configuration (package.json) file.
 * The properties defined here are sourced from https://docs.npmjs.com/files/package.json
 */
export class PackageConfiguration {
    public name: string;
    public version: string;
    public description?: string;
    public keywords?: string[];
    public homepage?: string;
    public bugs?: string | PackageBugs;
    public license?: string;
    public author?: string | PackagePerson;
    public contributors?: string[] | PackagePerson[];
    public maintainers?: string[] | PackagePerson[];
    public files?: string;
    public main?: string;
    public types?: string;
    public bin?: string | { [id: string]: string };
    public man?: string | string[];
    public directories?: { [id: string]: string };
    public repository: PackageRepository;
    public scripts?: { [id: string]: string };
    public config?: { [id: string]: string };
    public dependencies?: { [id: string]: string };
    public devDependencies?: { [id: string]: string };
    public peerDependencies?: { [id: string]: string };
    public bundledDependencies?: string[];
    public optionalDependencies?: { [id: string]: string };
    public engines?: { [id: string]: string };
    public os?: string[];
    public cpu?: string[];
    public preferGlobal?: boolean;
    public private?: boolean;
    public publishConfig?: { [id: string]: string };
}