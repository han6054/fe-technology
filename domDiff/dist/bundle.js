/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./element.js":
/*!********************!*\
  !*** ./element.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return patch; });\n\nlet Utils = __webpack_require__(/*! ./utils */ \"./utils.js\")\n\nclass Element {\n    /*\n      @tagName 标签名\n      @attrs 属性对象\n      @children 子元素数组\n    */\n    constructor(tagName, attrs, children) {\n        this.tagName = tagName;\n        this.attrs = attrs;\n        this.children = children || [];\n    }\n    render() {\n        let element = document.createElement(this.tagName); \n        // real dom add attrs\n        for(let attr in this.attrs) {\n            Utils.setAttr(element, attr, this.attrs[attr])\n        }\n        // 递归遍历，深度优先\n        this.children.forEach(child => {\n           console.log(child instanceof Element)\n           let childElement = (child instanceof Element)? child.render(): document.createTextNode(child);    \n           element.appendChild(childElement);\n        });\n        return element\n    }\n}\nfunction createElement(tagName, attrs, children) {\n  return new Element(tagName, attrs, children);\n}\n\n// patch\nlet allPaches = {};\nlet index = 0; //默认哪个需要补丁\nfunction patch(dom, patches) {\n    allPaches = patches;\n    walk(dom);\n}\n\nfunction walk(dom) {\n    let currentPatche = allPaches[index++];\n    let childNodes = dom.childNodes;\n    childNodes.forEach(element => walk(element));\n    if (currentPatche > 0) {\n        doPatch(dom, currentPatche);\n    }\n}\n\nfunction doPatch(node, patches) {\n    patches.forEach(patch => {\n        switch (patch.type) {\n            case 'ATTRS':\n                Utils.setAttr(patch.attrs)//别的文件方法\n                break;\n            case 'TEXT':\n                node.textContent = patch.text;\n                break;\n            case 'REPLACE':\n                let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);\n                node.parentNode.replaceChild(newNode, node)\n                break;\n            case 'REMOVE':\n                node.parentNode.removeChild(node);\n                break;\n        }\n    })\n}\n\nmodule.exports = { createElement };\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./element.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let {createElement} = __webpack_require__(/*! ./element.js */ \"./element.js\")\n\nlet ul1 = createElement('ul', {class: 'list'}, [\n    createElement('li', {class: 'item'}, ['1']),\n    createElement('li', {class: 'item'}, ['2']),\n    createElement('li', {class: 'item'}, ['3'])\n])\nlet root = ul1.render();\ndocument.body.appendChild(root)\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let utils =  {\n    setAttr(element, attr , value) {\n        switch(attr) {\n            case 'style':\n                element.style.cssText = value;\n                break;\n            case 'value':\n                let tagName = element.tagName.toLowercase();\n                if(tagName == 'input' || tagName == 'textarea') {\n                 element.value = value\n                }else {\n                    element.setAttribute(attr, value)\n                }\n                break;\n            default: \n                element.setAttribute(attr, value);\n                break;     \n        }\n        element.setAttribute(attr, value)\n    }\n}\nmodule.exports =  utils\n\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ });