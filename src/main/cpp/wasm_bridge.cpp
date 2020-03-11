#include <iostream>
#include "wasm_bridge.h"

#include <emscripten.h>

using namespace std;
using namespace wasm_bridge;

EM_JS(void, async_js, (), {
  console.log("EM_JS async_js()");
  return Asyncify.handleSleep(function(wakeUp) {
    setTimeout(wakeUp, 1000);
  });
});

string wasm_bridge::get_hello() {
  return string("Hello from WASM!");
}

void wasm_bridge::invoke_async_js_then_error(emscripten::val callback) {



  // suppose an error happens after
  try {

      // call asynchronous js
      //async_js();
    throw 5;
    //callback(string("hello!"));
  } catch (...) {
    cout << "SUCCESS!! ERROR CAUGHT!" << endl;
    callback(string("Callback payload after error"));
  }
}
