(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myBundle = {}));
})(this, (function (exports) { 'use strict';

  // './test/a'
  const b = 'xx';

  // 入口main。js
  console.log(b + 1);
  console.log(1111);

  exports.b = b;

}));
