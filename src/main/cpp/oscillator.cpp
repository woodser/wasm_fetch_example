#include <emscripten/bind.h>
#include <string>
#include <vector>
#include <iostream>

using namespace emscripten;

std::vector<int> returnVectorData () {
  std::vector<int> v(10, 1);
  return v;
}

std::map<int, std::string> returnMapData () {

  try {
      throw 5;
  } catch (...) {
      std::cout << "SUCCESSFULLY CAUGHT ERROR!!!" << std::endl;
  }

  std::map<int, std::string> m;
  m.insert(std::pair<int, std::string>(10, "This is a string."));
  return m;
}

EMSCRIPTEN_BINDINGS(module) {
  function("returnVectorData", &returnVectorData);
  function("returnMapData", &returnMapData);

  // register bindings for std::vector<int> and std::map<int, std::string>.
  register_vector<int>("vector<int>");
  register_map<int, std::string>("map<int, string>");
}
