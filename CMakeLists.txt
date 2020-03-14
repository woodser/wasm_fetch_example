cmake_minimum_required(VERSION 3.4.1)

project(wasm-app)

# read exception whitelist from file
file(STRINGS wasm_exception_whitelist.txt WASM_EXCEPTION_WHITELIST)
string(REPLACE ";" "," WASM_EXCEPTION_WHITELIST "${WASM_EXCEPTION_WHITELIST}")
message("WASM_EXCEPTION_WHITELIST: ${WASM_EXCEPTION_WHITELIST}")

# build with exception white list
#SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
#SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 --bind -s DISABLE_EXCEPTION_CATCHING=0")
#SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 --bind -s DISABLE_EXCEPTION_CATCHING=2 -s EXCEPTION_CATCHING_WHITELIST='[\"_ZN11wasm_bridge26invoke_async_js_then_errorEN10emscripten3valE\",\"stringToUTF8\"]'")
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 --bind -s DISABLE_EXCEPTION_CATCHING=2 -s EXCEPTION_CATCHING_WHITELIST='[${WASM_EXCEPTION_WHITELIST}]'")

#find_package(Threads)
#find_package(Backtrace)

##############
# C++ bridge
##############

include_directories("src/main/cpp")

################################
# Keys-only wallet source files
################################

set(
    WASM_APP_SRC_FILES
    
    # WASM bridge
    src/main/cpp/index.cpp
    src/main/cpp/wasm_bridge.cpp
)

####################
# Build parameters
####################

#-s USE_PTHREADS=1 \
#-s PTHREAD_POOL_SIZE=2 \
#-s PROXY_TO_PTHREAD \
#-s DISABLE_EXCEPTION_CATCHING=0 \

set (
EMCC_LINKER_FLAGS_BASE

# unsure if the -I...boost..include is necessary here due to include above
# TODO? does EXPORT_NAME need to be the same for both targets? (or should it be set per-target with …_WASM, …_ASMJS?)

"-Wall -std=c++11 \
--bind -s MODULARIZE=1 \
-Oz \
-s 'EXPORT_NAME=\"wasm_app\"' \
--llvm-lto 1 \
-s ERROR_ON_UNDEFINED_SYMBOLS=0 \
-s ASSERTIONS=2 \
-s EXIT_RUNTIME=0 \
-s PRECISE_F32=1 \
-s EXCEPTION_DEBUG=1 \
-s DEMANGLE_SUPPORT=1 \
-s DISABLE_EXCEPTION_CATCHING=0 \
-s NO_DYNAMIC_EXECUTION=1 \
-s NODEJS_CATCH_EXIT=0 \
-s RESERVED_FUNCTION_POINTERS=5 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='[\"UTF8ToString\",\"stringToUTF8\",\"lengthBytesUTF8\",\"intArrayToString\",\"makeBigInt\",\"getTempRet0\",\"addFunction\"]' \
-s WASM=1 \
-s ALLOW_MEMORY_GROWTH=0 \
-s TOTAL_MEMORY=512MB \
-s ASYNCIFY=1 \
-s ASYNCIFY_IMPORTS='[\"async_js\",\"emscripten_sleep\"]' \
--post-js ${CMAKE_CURRENT_LIST_DIR}/src/main/js/module-post.js \
"
    # • Disabling exception catching does not introduce silent failures 
    # • Probably don't need PRECISE_F32 but wouldn't want to not use it
    #
    #
    # -s SAFE_HEAP=1 \
    # -g \
)

set(
EMCC_LINKER_FLAGS_WASM_APP
"${EMCC_LINKER_FLAGS_BASE} \
"
)

message(STATUS "EMCC_LINKER_FLAGS_WASM_APP ${EMCC_LINKER_FLAGS_WASM_APP}")

####################
# Build targets
####################

##[[	--- START BLOCK COMMENT ---
# monero_wallet_keys
add_executable(wasm_app ${WASM_APP_SRC_FILES})
set_target_properties(wasm_app PROPERTIES LINK_FLAGS "${EMCC_LINKER_FLAGS_WASM_APP}")
target_link_libraries(
    wasm_app
)
##]] #--- END BLOCK COMMENT ---

# build to bitcode instead of wasm
#SET(CMAKE_EXECUTABLE_SUFFIX ".bc")	