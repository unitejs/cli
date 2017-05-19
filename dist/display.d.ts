/// <reference types="node" />
/**
 * Display class
 */
export declare class Display {
    private _colorsOn;
    private _colors;
    constructor(process: NodeJS.Process);
    banner(message: string): void;
    info(message: string): void;
    private colorStart(color);
    private colorStop(color);
    private calculateColors(process);
}
