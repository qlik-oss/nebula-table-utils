import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ components_ComponentOne)
});

;// CONCATENATED MODULE: external "react"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const external_react_namespaceObject = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_react__["default"] });
;// CONCATENATED MODULE: ./src/components/ComponentOne.tsx

const ComponentOne = () => {
    return external_react_namespaceObject["default"].createElement("div", null, "Hi there From Component #01, NO STATE");
};
/* harmony default export */ const components_ComponentOne = (ComponentOne);

var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__default as default };
