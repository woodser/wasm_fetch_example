#include <iostream>
#include "wasm_bridge.h"

#include <emscripten.h>

using namespace std;
using namespace wasm_bridge;

string wasm_bridge::get_hello() {
  return string("Hello from WASM!");
}

string wasm_bridge::invoke_request_then_error() {
  throw runtime_error("not implemented");

//    // make json request through javascript
//    string uri = string(m_ssl_enabled ? "https" : "http") + "://" + m_host + ":" + m_port + string(path);
//    string password = string(m_user->password.data(), m_user->password.size());
//    const char* resp_str = js_send_json_request(to_string((int) this).data(), uri.data(), m_user->username.data(), password.data(), method.data(), body.data(), timeout);
//    if (resp_str == nullptr) {
//        cout << "Aborting this op." << endl;
//        return false;
//    }
}
