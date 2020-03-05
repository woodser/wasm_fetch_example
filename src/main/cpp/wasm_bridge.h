/**
 * Provides a bridge from WebAssembly to the Monero wallet.
 */
#ifndef wasm_bridge_h
#define wasm_bridge_h

#include <emscripten/bind.h>
#include <string>

using namespace std;
using namespace emscripten;

namespace wasm_bridge
{
  string get_hello();
  void invoke_request_then_error(emscripten::val callback);
}

#endif /* wasm_bridge_h */
