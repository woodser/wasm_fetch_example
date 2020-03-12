/**
 * Sample app.
 */
class WasmApp {
  
  constructor() {
    
  }
  
  /**
   * Load the web assembly module usng a cache.
   */
  async loadWasmModule() {
    if (WasmApp.WASM_MODULE) return WasmApp.WASM_MODULE;
    let oscillator = require("../../../dist/wasm_app")();
    return new Promise(function(resolve, reject) {
      oscillator.then(resp => {
        delete resp.then; // de-promisify
        resolve(resp);
      });
    });
  }
  
  /**
   * Returns a message from the WASM module.
   * 
   * @return {string} "Hello from WASM!"
   */
  async getHello() {
    
    console.log("Getting module");
    let Module = await this.loadWasmModule();
    console.log("Done getting module!");
    console.log(Module);
    
//    let hello = Module['get_hello']();
//    console.log("Retrieved msg: " + hello);
    
    //let Module = WasmApp.WASM_MODULE;
    
    var retVector = Module['returnVectorData']();

    // vector size
    var vectorSize = retVector.size();
   
    // reset vector value
    retVector.set(vectorSize - 1, 11);
   
    // push value into vector
    retVector.push_back(12);
   
    // retrieve value from the vector
    for (var i = 0; i < retVector.size(); i++) {
        console.log("Vector Value: ", retVector.get(i));
    }
   
    // expand vector size
    retVector.resize(20, 1);
   
    var retMap = Module['returnMapData']();
   
    // map size
    var mapSize = retMap.size();
   
    // retrieve value from map
    console.log("Map Value: ", retMap.get(10));
   
    // figure out which map keys are available
    // NB! You must call `register_vector<key_type>`
    // to make vectors available
    var mapKeys = retMap.keys();
    for (var i = 0; i < mapKeys.size(); i++) {
        var key = mapKeys.get(i);
        console.log("Map key/value: ", key, retMap.get(key));
    }
   
    // reset the value at the given index position
    retMap.set(10, "OtherValue");
    
    return "Hello!";
  }
  
//  /**
//   * Invoke a method in the WASM module which issues an HTTP request then throws an error.
//   * 
//   * The goal is for the C++ in the module to catch and return the error, but it does not.
//   */
//  async invokeRequestThenError() {
//    return new Promise(function(resolve, reject) {
//    
//      // define callback for wasm
//      let callbackFn = async function(resp) {
//        console.log("Callback called!!!");
//        reject(new Error("TODO: handle callback with response " + resp));
//      }
//      
//      // sync wallet in wasm and invoke callback when done
//      try {
//        WasmApp.WASM_MODULE.invoke_async_js_then_error(callbackFn);
//      } catch (e) {
//        console.log("JS caught error!!!");
//        console.log(e);
//        throw new Error(e);
//      }
//    });
//  }
//  
//  async invokeTryCatch() {
//    return new Promise(function(resolve, reject) {
//      
//      // define callback for wasm
//      let callbackFn = async function(resp) {
//        console.log("Callback called!!!");
//        reject(new Error("TODO: handle callback with response " + resp));
//      }
//      
//      // sync wallet in wasm and invoke callback when done
//      try {
//        WasmApp.WASM_MODULE.invoke_try_catch(callbackFn);
//      } catch (e) {
//        console.log("JS caught error!!!");
//        console.log(e);
//        throw new Error(e);
//      }
//    });
//  }
}

module.exports = WasmApp;