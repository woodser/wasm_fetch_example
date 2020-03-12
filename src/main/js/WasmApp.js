/**
 * Sample app.
 */
class WasmApp {
  
  constructor() {
    
  }
  
//  /**
//   * Load the web assembly module.
//   */
//  async loadWasmModule() {
//    
//    // use cache if suitable, core module supersedes keys module because it is superset
//    if (WasmApp.WASM_MODULE) return WasmApp.WASM_MODULE;
//    
//    // load module
////    const assert = require("assert");
//    WasmApp.WASM_MODULE = await require("../../../dist/index")().ready;
//    return WasmApp.WASM_MODULE;
//    //throw new Error("Not implemented!");
//  }
//  
////  /**
////   * Load the web assembly module.
////   */
////  async loadWasmModule2() {
////    
////    // use cache if suitable, core module supersedes keys module because it is superset
////    if (WasmApp.WASM_MODULE) return WasmApp.WASM_MODULE;
////    
////    // load module
////    WasmApp.WASM_MODULE = await require("../../../web_app/index")().ready;
////    return WasmApp.WASM_MODULE;
////  }
//  
  /**
   * Returns a message from the WASM module.
   * 
   * @return {string} "Hello from WASM!"
   */
  async getHello() {
    
    return new Promise(function(resolve, reject) {
      
      // load module
      const assert = require("assert");
      console.log("Required assert...");
      const oscillator = require("../../../dist/oscillator")();
      console.log("Requred oscillator:");
      oscillator.then(resp => {
        let Module = oscillator;
        
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
        
        resolve("Hello!");
      })
    });
    

    
//    console.log(await oscillator.then());
//    console.log("OK?!?!");
//    console.log(oscillator.onRuntimeInitialized);
//    let Module = oscillator
//    //let Module = await require("../../../dist/oscillator")().then;
//    console.log("Fetched module!");
//    console.log(Module);
    
//    const fs = require('fs');
//    let source = fs.readFileSync('../../../dist/oscillator.wasm');
//    let typedArray = new Uint8Array(source);
    
//    WebAssembly.instantiateStreaming(typedArray, importObject)
//    .then(results => {
//      console.log("WebAssembly module loaded!!!")
//      // Do something with the results!
//    });
    
//    //const fetch = require("fetch");
//    const fetch = require("node-fetch");
//    const fetchPromise = fetch('../../../dist/oscillator');
//    const { Module } = await WebAssembly.instantiateStreaming(fetchPromise);
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