#include <stdio.h>
#include <emscripten/bind.h>
//#include <emscripten.h>

#include "wasm_bridge.h"

// register bindings from JS to C++ using emscripten
EMSCRIPTEN_BINDINGS(module)
{
  emscripten::function("get_hello", &wasm_bridge::get_hello);
  emscripten::function("invoke_request_then_error", &wasm_bridge::invoke_request_then_error);
}
extern "C"
{
}
