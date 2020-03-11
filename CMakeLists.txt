cmake_minimum_required(VERSION 3.4.1)

project(wasm-app)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

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

"--bind \
-s MODULARIZE=1 \
-s 'EXPORT_NAME=\"wasm_app\"' \
-s DISABLE_EXCEPTION_CATCHING=0 \
-s WASM=1 \
--post-js ${CMAKE_CURRENT_LIST_DIR}/src/main/js/module-post.js \
"
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