#include<iostream>

int main() {
  std::cout << "Hello World" << std::endl;
  try {
      throw 5;
  } catch (...) {
      std::cout << "SUCCESS!!!" << std::endl;
  }
  return 0;
}
