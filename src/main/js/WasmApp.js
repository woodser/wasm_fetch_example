/**
 * Sample app.
 */
class WasmApp {
  
  constructor() {
  }
  
  /**
   * Load the web assembly module.
   */
  async loadWasmModule() {
    
    // use cache if suitable, core module supersedes keys module because it is superset
    if (WasmApp.WASM_MODULE) return WasmApp.WASM_MODULE;
    
    // load module
    WasmApp.WASM_MODULE = await require("../../../dist/wasm_app")().ready;
    return WasmApp.WASM_MODULE;
  }
  
  /**
   * Returns a message from the WASM module.
   * 
   * @return {string} "Hello from WASM!"
   */
  async getHello() {
    return WasmApp.WASM_MODULE.get_hello();
  }
  
  /**
   * Invoke a method in the WASM module which issues an HTTP request then throws an error.
   * 
   * The goal is for the C++ in the module to catch and return the error, but it does not.
   */
  async invokeRequestThenError() {
    
    // sync wallet
    return new Promise(function(resolve, reject) {
    
      // define callback for wasm
      let callbackFn = async function(resp) {
        console.log("GOT RESPONSE FROM ERROR INVOCATION");
        console.log(resp);
        reject(new Error("Not implemented!!"));
      }
      
      // sync wallet in wasm and invoke callback when done
      try {
        console.log("invoking_request...");
        WasmApp.WASM_MODULE.invoke_request_then_error(callbackFn);
      } catch (e) {
        console.log("JS caught error:");
        console.log(e);
        throw new Error(e);
      }
    });
  }
}

module.exports = WasmApp;