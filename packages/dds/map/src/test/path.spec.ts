/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import path from "path";
import { join } from "../path";

describe("Path", () => {
    it("joins two simple paths together", () => {
        assert.strictEqual(path.posix.join("root", "subdirectory"), join("root", "subdirectory"));
        console.log("pass");
        assert.strictEqual(path.posix.join("root/", "subdirectory"), join("root/", "subdirectory"));
        console.log("pass");
        assert.strictEqual(path.posix.join("root/", "subdirectory/"), join("root/", "subdirectory/"));
        console.log("pass");
        assert.strictEqual(path.posix.join("/root", "/subdirectory/"), join("/root", "/subdirectory/"));
        console.log("pass");
    });
});
