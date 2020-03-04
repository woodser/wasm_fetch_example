/**
 * Sample app.
 */
class WasmApp {
  
  /**
   * Load the web assembly module.
   */
  async loadWasmModule() {
    throw new Error("Not implemented");
  }
  
  /**
   * Returns a message from the WASM module.
   * 
   * @return {string} "Hello from WASM!"
   */
  async getHello() {
    throw new Error("Not implemented");
//    let that = this;
//    return new Promise(function(resolve, reject) {
//      
//      // define callback for wasm
//      let callbackFn = function(resp) {
//        resolve(resp);
//      }
//      
//      // sync wallet in wasm and invoke callback when done
//      that.module.get_height(that.cppAddress, callbackFn);
//    });
  }
  
  /**
   * Invoke a method in the WASM module which issues an HTTP request then throws an error.
   * 
   * The goal is for the C++ in the module to catch and return the error, but it does not.
   */
  async invokeRequestThenError() {
    throw new Error("Not implemented");
  }
}

module.exports = WasmApp;