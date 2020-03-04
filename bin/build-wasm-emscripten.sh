#!/bin/sh

#EMCC_DEBUG=1 


mkdir -p build && 
cd build && 
emconfigure cmake .. && 
emmake cmake --build . && 
emmake make -j$HOST_NCORES .

# move wasm files to /dist
cd ../ &&
mkdir -p dist &&
mv ./build/wasm_app.js ./dist/ &&
mv ./build/wasm_app.wasm ./dist/