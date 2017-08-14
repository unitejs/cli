/**
 * Tests for CommandLineCommandConstants.
 */
import * as Chai from "chai";
import { CommandLineCommandConstants } from "../../../dist/commandLineCommandConstants";

describe("CommandLineCommandConstants", () => {
    it("can be created", () => {
        const obj = new CommandLineCommandConstants();
        Chai.should().exist(obj);
    });
});
