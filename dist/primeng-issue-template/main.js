(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"content-body\">\n    <h1>{{title}}</h1>\n    <div class=\"input-form\">\n        <input [(ngModel)]=\"search\" (keydown.enter)=\"onSearch(search)\" type=\"text\"/>\n        <button class=\"button\"   (click)=\"onSearch(search)\">search</button>\n    </div>\n    <p-table [columns]=\"cols\" [value]=\"months\" [resizableColumns]=\"true\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\" pResizableColumn>\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr>\n                <td *ngFor=\"let col of columns\" class=\"ui-resizable-column\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n</div>");

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("thead tr th {\n    position: relative;\n}\nspan.ui-column-resizer {\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: 8px;\n    height: 100%;\n    padding: 0;\n    cursor: col-resize;\n    border: 1px solid transparent;\n}\n:host {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.content-body {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\ntr:nth-child(even){background-color: #f2f2f2}\ntable {\n    border-collapse: collapse;\n    text-align: left;\n    padding: 8px;\n}\np-table {\n    text-align: left;\n    width: 20vw;\n    padding: 7px;\n}\n.button:hover {opacity: 1}\n.button {\n    background-color: grey;\n    border: none;\n    color: white;\n    padding: 10px 15px;\n    text-align: center;\n    font-size: 16px;\n    margin: 10px;\n    opacity: 0.6;\n    transition: 0.3s;\n    display: inline-block;\n    text-decoration: none;\n    cursor: pointer;\n    border-radius: 3px;\n}\ninput[type=text] {\n    padding: 8px 12px;\n    margin: 10px ;\n    width: auto;\n    box-sizing: border-box;\n    border: 3px solid #ccc;\n    transition: 0.5s;\n    outline: none;\n}\ninput[type=text]:focus {\n    border: 3px solid grey;\n}\n.input-form{\n    margin:20px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLFFBQVE7SUFDUixTQUFTO0lBQ1QsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLDZCQUE2QjtBQUNqQztBQUtBO0lBQ0ksMEpBQTBKO0lBQzFKLGVBQWU7SUFDZixXQUFXO0lBQ1gsc0JBQXNCO0lBQ3RCLG1DQUFtQztJQUNuQyxrQ0FBa0M7QUFDdEM7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0FBQ3ZCO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUU1QztJQUNJLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsWUFBWTtBQUNoQjtBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxZQUFZO0FBQ2hCO0FBR0EsZUFBZSxVQUFVO0FBQ3pCO0lBQ0ksc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsWUFBWTtJQUNaLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsc0JBQXNCO0lBRXRCLGdCQUFnQjtJQUNoQixhQUFhO0FBQ2pCO0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGhlYWQgdHIgdGgge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbnNwYW4udWktY29sdW1uLXJlc2l6ZXIge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdpZHRoOiA4cHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xufVxuXG5cblxuXG46aG9zdCB7XG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzMzMztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbi5jb250ZW50LWJvZHkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxudHI6bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQtY29sb3I6ICNmMmYyZjJ9XG5cbnRhYmxlIHtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcGFkZGluZzogOHB4O1xufVxuXG5wLXRhYmxlIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHdpZHRoOiAyMHZ3O1xuICAgIHBhZGRpbmc6IDdweDtcbn1cblxuXG4uYnV0dG9uOmhvdmVyIHtvcGFjaXR5OiAxfVxuLmJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBvcGFjaXR5OiAwLjY7XG4gICAgdHJhbnNpdGlvbjogMC4zcztcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5pbnB1dFt0eXBlPXRleHRdIHtcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICBtYXJnaW46IDEwcHggO1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm9yZGVyOiAzcHggc29saWQgI2NjYztcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IDAuNXM7XG4gICAgdHJhbnNpdGlvbjogMC41cztcbiAgICBvdXRsaW5lOiBub25lO1xufVxuXG5pbnB1dFt0eXBlPXRleHRdOmZvY3VzIHtcbiAgICBib3JkZXI6IDNweCBzb2xpZCBncmV5O1xufVxuLmlucHV0LWZvcm17XG4gICAgbWFyZ2luOjIwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cblxuIl19 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _mock_months__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock-months */ "./src/app/mock-months.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'select months';
        this.search = '';
        this.months = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.cols = [
            { field: 'id', header: '#', width: '30%' },
            { field: 'name', header: 'month', width: '30%' },
        ];
    };
    AppComponent.prototype.onSearch = function (search) {
        this.months = _mock_months__WEBPACK_IMPORTED_MODULE_1__["MONTHS"].filter(function (item) {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
                || item.id.toString().indexOf(search) > -1;
        });
        if (this.months.length === 1)
            this.title = 'nice choice';
        else
            this.title = 'select months';
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __importDefault(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/table */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-table.js");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/toast */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-toast.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-calendar.js");
/* harmony import */ var primeng_slider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/slider */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-slider.js");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/multiselect */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-multiselect.js");
/* harmony import */ var primeng_contextmenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/contextmenu */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-contextmenu.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-dialog.js");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/button */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-button.js");
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/dropdown */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-dropdown.js");
/* harmony import */ var primeng_progressbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/progressbar */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-progressbar.js");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/inputtext */ "./node_modules/primeng/__ivy_ngcc__/fesm5/primeng-inputtext.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                primeng_table__WEBPACK_IMPORTED_MODULE_7__["TableModule"],
                primeng_calendar__WEBPACK_IMPORTED_MODULE_9__["CalendarModule"],
                primeng_slider__WEBPACK_IMPORTED_MODULE_10__["SliderModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_13__["DialogModule"],
                primeng_multiselect__WEBPACK_IMPORTED_MODULE_11__["MultiSelectModule"],
                primeng_contextmenu__WEBPACK_IMPORTED_MODULE_12__["ContextMenuModule"],
                primeng_dropdown__WEBPACK_IMPORTED_MODULE_15__["DropdownModule"],
                primeng_button__WEBPACK_IMPORTED_MODULE_14__["ButtonModule"],
                primeng_toast__WEBPACK_IMPORTED_MODULE_8__["ToastModule"],
                primeng_inputtext__WEBPACK_IMPORTED_MODULE_17__["InputTextModule"],
                primeng_progressbar__WEBPACK_IMPORTED_MODULE_16__["ProgressBarModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot([
                    { path: '', component: _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] }
                ])
            ],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/mock-months.ts":
/*!********************************!*\
  !*** ./src/app/mock-months.ts ***!
  \********************************/
/*! exports provided: MONTHS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTHS", function() { return MONTHS; });
var MONTHS = [
    {
        id: 1,
        name: 'January'
    },
    {
        id: 2,
        name: 'February'
    },
    {
        id: 3,
        name: 'March'
    },
    {
        id: 4,
        name: 'April'
    },
    {
        id: 5,
        name: 'May'
    },
    {
        id: 6,
        name: 'June'
    },
    {
        id: 7,
        name: 'July'
    },
    {
        id: 8,
        name: 'August'
    },
    {
        id: 9,
        name: 'September'
    },
    {
        id: 10,
        name: 'October'
    },
    {
        id: 11,
        name: 'November'
    },
    {
        id: 12,
        name: 'December'
    }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vlad/project/ng-task/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map