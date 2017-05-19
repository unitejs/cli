/**
 * Tests for PackageConfiguration.
 */
import * as Chai from "chai";
import { PackageConfiguration } from "../../../../dist/configuration/models/packages/packageConfiguration";

describe("PackageConfiguration", () => {
    it("can be created", async(done) => {
        const obj = new PackageConfiguration();
        Chai.should().exist(obj);
        done();
    });
});