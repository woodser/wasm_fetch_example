const WasmApp = require("../main/js/WasmApp");
const AppUtils = require("../main/js/AppUtils");
const assert = require("assert");

/**
 * Test the wasm app.
 */
class TestWasmApp {
  
  runTests() {
    describe("Test Wasm App", function() {
      let that = this;
      
      before(async function() {
        
      });
      
      it("Can say hello", async function() {
        let app = new WasmApp();
        await app.loadWasmModule();
        assert.equal(await app.getHello(), "Hello from WASM!");
      });
      
      it("Can recover from exceptions after http requests", async function() {
        let app = new WasmApp();
        await app.loadWasmModule();
        try {
          await app.invokeRequestThenError();
          throw new Error("Should have caught error");
        } catch (e) {
          assert.equal(e.message, "Error caught!");
        }
      });
    });
  }
}

module.exports = TestWasmApp;