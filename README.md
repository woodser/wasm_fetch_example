This project illustrates an issue catching errors after invoking asynchronous JavaScript from C++.

# Build and Run
1. `sh ./bin/build-wasm-emscripten.sh` (builds wasm files to ./dist directory)
2. `npm test` (runs tests which show runtime shutdown when error is hit)