import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
/******/ var __webpack_modules__ = ({

/***/ 710:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(810);

const Shared = () => {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, "This is shared");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shared);


/***/ }),

/***/ 810:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_react__["default"], ["useState"]: () => __WEBPACK_EXTERNAL_MODULE_react__.useState });

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(810);
/* harmony import */ var _Shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(710);


const ComponentTwo = (args) => {
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(10);
    const handleClick = () => setState(state + 10);
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null,
        "Hi there from #2nd test component ---",
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { onClick: handleClick, type: "button" }, "add:"),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", { "data-testid": "state-val" }, state),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Shared__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComponentTwo);

})();

var __webpack_exports__default = __webpack_exports__.Z;
export { __webpack_exports__default as default };
