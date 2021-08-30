/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { setup, onMessage } = __webpack_require__(/*! ./ws */ \"./src/client/ws.js\");\nconst { renderMessages, filterMessages } = __webpack_require__(/*! ./ui */ \"./src/client/ui.js\");\nconst socket = setup(\"jon\");\nconst messages = [];\nconst filterQuery = \"\";\nconst filterQueryInput = document.getElementById(\"filter-query\");\nfilterQueryInput.addEventListener(\"change\", () => {\n  renderMessages(filterMessages(messages));\n});\n\nonMessage(socket, (event) => {\n  console.log(event);\n  messages.push(JSON.parse(event.data));\n  renderMessages(filterMessages(messages));\n});\n\n// messages\n// filter query\n// setup filter\n// setup listen\n//// render message\n\n\n//# sourceURL=webpack://mega-feed/./src/client/index.js?");

/***/ }),

/***/ "./src/client/ui.js":
/*!**************************!*\
  !*** ./src/client/ui.js ***!
  \**************************/
/***/ ((module) => {

eval("const renderMessages = (messages) => {\n  const feedContainer = document.getElementById(\"feed-container\");\n\n  messages.forEach((message) => {\n    const feedItem = document.createElement(\"div\");\n    feedItem.class = \"feed-container\";\n    feedItem.innerHTML = `${message.service} | ${message.time} | ${message.content}`;\n    feedContainer.appendChild(feedItem);\n  });\n};\n\nconst filterMessages = (filter, messages) => {\n  return messages.filter((message) => {\n    return message.content.includes(filter) || message.service.includes(filter);\n  });\n};\n\nmodule.exports = {\n  renderMessages,\n  filterMessages,\n};\n\n\n//# sourceURL=webpack://mega-feed/./src/client/ui.js?");

/***/ }),

/***/ "./src/client/ws.js":
/*!**************************!*\
  !*** ./src/client/ws.js ***!
  \**************************/
/***/ ((module) => {

eval("const setup = (user, key) => {\n  const socket = new WebSocket(`ws://localhost:8080?user=${user}&key=${key}`);\n  return socket;\n};\n\nconst onMessage = (socket, handler) => {\n  socket.addEventListener(\"message\", function (event) {\n    handler(JSON.parse(event.data));\n  });\n};\n\nmodule.exports = {\n  setup,\n  onMessage,\n};\n\n\n//# sourceURL=webpack://mega-feed/./src/client/ws.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/index.js");
/******/ 	
/******/ })()
;