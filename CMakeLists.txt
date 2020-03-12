cmake_minimum_required(VERSION 3.4.1)

project(wasm-app)

#SET(CMAKE_C_COMPILER emcc)
#SET(CMAKE_CPP_COMPILER em++)
#SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 --bind -s DISABLE_EXCEPTION_CATCHING=2 -s 'EXCEPTION_CATCHING_WHITELIST=\"@exceptions_whitelist.txt\"'")


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
    src/main/cpp/oscillator.cpp
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

"-Wall -Werror -std=c++11 -O2 \
--bind -s MODULARIZE=1 \
-s MODULARIZE=1 \
-s DISABLE_EXCEPTION_CATCHING=0 \
-s WASM=1 \
"
)

set(
EMCC_LINKER_FLAGS_WASM_APP
"${EMCC_LINKER_FLAGS_BASE} \
"
)

message(STATUS "EMCC_LINKER_FLAGS_WASM_APP ${EMCC_LINKER_FLAGS_BASE}")

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