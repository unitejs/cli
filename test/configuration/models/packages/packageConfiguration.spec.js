"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for PackageConfiguration.
 */
const Chai = require("chai");
const packageConfiguration_1 = require("../../../../dist/configuration/models/packages/packageConfiguration");
describe("PackageConfiguration", () => {
    it("can be created", (done) => __awaiter(this, void 0, void 0, function* () {
        const obj = new packageConfiguration_1.PackageConfiguration();
        Chai.should().exist(obj);
        done();
    }));
});
