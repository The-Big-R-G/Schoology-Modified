/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/scripts/popup.ts ***!
  \******************************/

var _a, _b;
(_a = document.getElementById("open-messages")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openMessages" });
    window.close();
});
(_b = document.getElementById("open-browser")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openBrowser" });
    window.close();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDtBQUNBLENBQUM7QUFDRDtBQUNBLGlDQUFpQyxxQkFBcUI7QUFDdEQ7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sb2d5LXBsdXMvLi9zcmMvc2NyaXB0cy9wb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfYSwgX2I7XG4oX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW4tbWVzc2FnZXNcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogXCJvcGVuTWVzc2FnZXNcIiB9KTtcbiAgICB3aW5kb3cuY2xvc2UoKTtcbn0pO1xuKF9iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLWJyb3dzZXJcIikpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogXCJvcGVuQnJvd3NlclwiIH0pO1xuICAgIHdpbmRvdy5jbG9zZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=