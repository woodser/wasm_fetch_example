#include <iostream>
#include "wasm_bridge.h"

#include <emscripten.h>

using namespace std;
using namespace wasm_bridge;

EM_JS(void, js_send_json_request, (), {
  console.log("EM_JS js_send_json_request()");

  // use asyncify to synchronously return to C++
  return Asyncify.handleSleep(function(wakeUp) {
//    wakeUp();
//    await new Promise(function(resolve) { setTimeout(resolve, MoneroUtils.WALLET_REFRESH_RATE); });
    console.log("setting timeout");
    setTimeout(function() {
      console.log("Calling wakup!");
      wakeUp();
    }, 1000);
  });
});

string wasm_bridge::get_hello() {
  return string("Hello from WASM!");
}

void wasm_bridge::invoke_request_then_error(emscripten::val callback) {
  try {

    // make json request through javascript
    cout << "before calling request" << endl;
    js_send_json_request();
    cout << "done calling request!" << endl;

    // throw error
    throw runtime_error(string("Catch this!"));
    callback(string("Calling back after request!"));
  } catch (...) {
    cout << "WASM bridge caught exception!" << endl;
    callback(string("Error callback"));
    //throw runtime_error("Error caught!");
  }
}
