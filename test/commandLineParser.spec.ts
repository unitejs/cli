/**
 * Tests for CommandLineParser.
 */
import * as Chai from "chai";
import { CommandLineParser } from "../dist/commandLineParser";

describe("CommandLineParser", () => {
    it("can be created", async(done) => {
        const obj = new CommandLineParser();
        Chai.should().exist(obj);
        done();
    });
});