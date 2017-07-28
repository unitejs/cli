/**
 * Tests for CommandLineArgConstants.
 */
import * as Chai from "chai";
import { CommandLineArgConstants } from "../../../dist/commandLineArgConstants";

describe("CommandLineArgConstants", () => {
    it("can be created", () => {
        const obj = new CommandLineArgConstants();
        Chai.should().exist(obj);
    });
});
