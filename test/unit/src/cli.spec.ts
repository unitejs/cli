/**
 * Tests for CLI.
 */
import * as Chai from "chai";
import { CLI } from "../../../dist/cli";

describe("CLI", () => {
    it("can be created", () => {
        const obj = new CLI();
        Chai.should().exist(obj);
    });
});
