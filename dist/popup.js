/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/scripts/popup.ts ***!
  \******************************/

var _a;
(_a = document.getElementById("open-messages")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openMessages" });
    window.close();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2xvZ3ktcGx1cy8uL3NyYy9zY3JpcHRzL3BvcHVwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9hO1xuKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLW1lc3NhZ2VzXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6IFwib3Blbk1lc3NhZ2VzXCIgfSk7XG4gICAgd2luZG93LmNsb3NlKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==