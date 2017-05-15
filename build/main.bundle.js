webpackJsonp([1,4],{

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 151;


/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(169);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(af, router) {
        var _this = this;
        this.af = af;
        this.router = router;
        this.af.auth.subscribe(function (auth) {
            if (auth) {
                _this.name = auth;
            }
        });
    }
    AppComponent.prototype.logout = function () {
        this.af.auth.logout();
        this.name = null;
        console.log("logged out");
        localStorage.clear();
        this.router.navigateByUrl('/login');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(244),
        styles: [__webpack_require__(238)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_home_component_home_component__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_authentication_login_component_login_component__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_authentication_register_component_register_component__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_authentication_reset_password_component_reset_password_component__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_authentication_reset_confirmation_component_reset_confirmation_component__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_kinect_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_drawcanvas_service__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_database_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(168);
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















// routes variabelen
var appRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__components_authentication_login_component_login_component__["a" /* LoginComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_8__components_home_component_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthGuard */]] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_10__components_authentication_register_component_register_component__["a" /* RegisterComponent */] },
    { path: 'resetpassword', component: __WEBPACK_IMPORTED_MODULE_11__components_authentication_reset_password_component_reset_password_component__["a" /* ResetPasswordComponent */] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
    // PageNotFound { path: '**', component: PageNotFoundComponent }
];
var firebaseConfig = {
    apiKey: "AIzaSyDt80FBi9Tver1DAEljAAhJKE7P8KR3EIA",
    authDomain: "stagekinect2.firebaseapp.com",
    databaseURL: "https://stagekinect2.firebaseio.com",
    projectId: "stagekinect2",
    storageBucket: "stagekinect2.appspot.com",
    messagingSenderId: "595627469769"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        //component declarations
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_8__components_home_component_home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_9__components_authentication_login_component_login_component__["a" /* LoginComponent */], __WEBPACK_IMPORTED_MODULE_10__components_authentication_register_component_register_component__["a" /* RegisterComponent */], __WEBPACK_IMPORTED_MODULE_11__components_authentication_reset_password_component_reset_password_component__["a" /* ResetPasswordComponent */], __WEBPACK_IMPORTED_MODULE_12__components_authentication_reset_confirmation_component_reset_confirmation_component__["a" /* ResetConfirmationComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_16_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
        ],
        //services
        providers: [__WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* HashLocationStrategy */], __WEBPACK_IMPORTED_MODULE_13__services_kinect_service__["a" /* KinectService */], __WEBPACK_IMPORTED_MODULE_14__services_drawcanvas_service__["a" /* DrawCanvasService */], __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthGuard */], __WEBPACK_IMPORTED_MODULE_15__services_database_service__["a" /* DatabaseService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]],
        schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]] // to clear the router-outlet test, else it fails
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animations_router_animations__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(af, router) {
        var _this = this;
        this.af = af;
        this.router = router;
        this.errCond = false;
        this.error = new Error("");
        this.af.auth.subscribe(function (auth) {
            if (auth) {
                _this.router.navigateByUrl('/home');
            }
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        if (formData.valid) {
            console.log(formData.value);
            this.af.auth.login({
                email: formData.value.email,
                password: formData.value.password
            }, {
                provider: __WEBPACK_IMPORTED_MODULE_1_angularfire2__["e" /* AuthProviders */].Password,
                method: __WEBPACK_IMPORTED_MODULE_1_angularfire2__["f" /* AuthMethods */].Password,
            }).then(function (success) {
                console.log(success);
                console.log(success.uid);
                localStorage.setItem('currentUser', JSON.stringify({ uid: success.uid })); //save user's uid locally
                _this.router.navigate(['/home']);
                _this.errCond = false;
            }).catch(function (err) {
                console.log(err);
                _this.errCond = true;
                _this.error = err;
            });
        }
    };
    LoginComponent.prototype.providerLogin = function (from) {
        var _this = this;
        this.af.auth.login({
            provider: this._getProvider(from),
            method: __WEBPACK_IMPORTED_MODULE_1_angularfire2__["f" /* AuthMethods */].Popup,
        }).then(function (success) {
            _this.router.navigate(['/home']);
        }).catch(function (err) {
            console.log(err);
            _this.error = err;
        });
    };
    LoginComponent.prototype._getProvider = function (from) {
        switch (from) {
            case 'google': return __WEBPACK_IMPORTED_MODULE_1_angularfire2__["e" /* AuthProviders */].Google;
            case 'facebook': return __WEBPACK_IMPORTED_MODULE_1_angularfire2__["e" /* AuthProviders */].Facebook;
            case 'twitter': return __WEBPACK_IMPORTED_MODULE_1_angularfire2__["e" /* AuthProviders */].Twitter;
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'login',
        template: __webpack_require__(245),
        styles: [__webpack_require__(233)],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__animations_router_animations__["a" /* routerTransition */])()],
        host: { '[@routerTransition]': '' }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animations_router_animations__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_database_service__ = __webpack_require__(72);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(af, router, dbService) {
        this.af = af;
        this.router = router;
        this.dbService = dbService;
        this.error = new Error("");
    }
    RegisterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        if (formData.valid) {
            console.log(formData.value.surname);
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then(function (success) {
                console.log("in registercomponent");
                localStorage.setItem('currentUser', JSON.stringify({ uid: success.uid })); //save user's uid locally
                //create a new userobject in the database
                _this.dbService.createUser(formData, success.uid);
                _this.router.navigate(['/home']);
            }).catch(function (err) {
                _this.error = err;
                console.log(err);
                console.log(_this.error.message);
            });
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'register',
        template: __webpack_require__(246),
        styles: [__webpack_require__(234)],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__animations_router_animations__["a" /* routerTransition */])()],
        host: { '[@routerTransition]': '' }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2__["b" /* AngularFire */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_database_service__["a" /* DatabaseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_database_service__["a" /* DatabaseService */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animations_router_animations__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetConfirmationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResetConfirmationComponent = (function () {
    function ResetConfirmationComponent(router) {
        this.router = router;
    }
    ResetConfirmationComponent.prototype.okButtonClicked = function () {
        this.router.navigate(['/login']);
    };
    return ResetConfirmationComponent;
}());
ResetConfirmationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'resetconfirmation',
        template: __webpack_require__(247),
        styles: [__webpack_require__(235)],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__animations_router_animations__["a" /* routerTransition */])()],
        host: { '[@routerTransition]': '' }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], ResetConfirmationComponent);

var _a;
//# sourceMappingURL=reset-confirmation.component.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animations_router_animations__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(af, fa, router) {
        this.af = af;
        this.router = router;
        this.errCond = false;
        this.error = new Error("");
        this.auth = fa.auth();
    }
    ResetPasswordComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        console.log(formData.value);
        this.auth.sendPasswordResetEmail(formData.value.email)
            .then(function (success) {
            console.log(success);
            _this.router.navigate(['/resetconfirmation']);
            _this.errCond = false;
        }).catch(function (err) {
            console.log(err);
            _this.errCond = true;
            _this.error = err;
        });
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'resetpassword',
        template: __webpack_require__(248),
        styles: [__webpack_require__(236)],
        animations: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__animations_router_animations__["a" /* routerTransition */])()],
        host: { '[@routerTransition]': '' }
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1_angularfire2__["c" /* FirebaseApp */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */]) === "function" && _a || Object, Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ResetPasswordComponent);

var _a, _b;
//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_kinect_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_drawcanvas_service__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_database_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = (function () {
    function HomeComponent(kinectService, drawcanvasService, af, dbService, auth) {
        this.kinectService = kinectService;
        this.drawcanvasService = drawcanvasService;
        this.af = af;
        this.dbService = dbService;
        this.auth = auth;
        this.currentExercise = null;
        this.exercisesOfCurrentProgram = new Array();
        this.ipc = electron.ipcRenderer;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadUserData();
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        //declare canvas & context here after the view is loaded. else canvas = null
        this.bodyFrameCanvas = document.getElementById('bodyframecanvas');
        this.colorFrameCanvas = document.getElementById('colorframecanvas');
        this.excerciseCanvas = document.getElementById('exercisecanvas');
        this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, false, ""); //draw the bodyframe without mock data(skeleton)        
        this.drawcanvasService.drawColorFrame(this.colorFrameCanvas); //draw the colorframe
    };
    HomeComponent.prototype.onChangeProgram = function (newProgramId) {
        var _this = this;
        //get all the excerciseIds in the currentTraject of the user
        this.exercisesOfCurrentProgram.length = 0;
        //this.excercisesOfCurrentTraject.splice(0,this.excercisesOfCurrentTraject.length);
        Object.keys(this.userdata.programs[newProgramId].exercises).forEach(function (ex) {
            _this.dbService.getExerciseByUid(ex).subscribe(function (ex2) {
                _this.exercisesOfCurrentProgram.push(ex2);
            });
        });
    };
    HomeComponent.prototype.onChangeExcercise = function (newExerciseId) {
        console.log(newExerciseId);
        this.loadExcercise(newExerciseId);
    };
    HomeComponent.prototype.drawExcercise = function () {
        //KINECT OPZETTEN
        this.drawcanvasService.drawExcercise(this.excerciseCanvas, this.currentExercise);
    };
    HomeComponent.prototype.playMockData = function (mockExcerciseNr) {
        switch (mockExcerciseNr) {
            case 1:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "lefthand-up-and-down"); //draw the bodyframe with mock excercise 1  
                    return;
                }
            case 2:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "righthand-up-and-down");
                    return;
                }
            case 3:
                {
                    this.drawcanvasService.drawBodyFrame(this.bodyFrameCanvas, true, "arrow-to-the-knee");
                }
        }
    };
    HomeComponent.prototype.loadUserData = function () {
        var _this = this;
        this.userUid = JSON.parse(localStorage.getItem('currentUser')).uid;
        this.dbService.getUserdataById(this.userUid).subscribe(function (userData) {
            _this.userdata = userData;
            _this.currentProgram = userData.programs[userData.currentProgram];
            if (_this.userdata.programs != undefined) {
                Object.keys(_this.userdata.programs[_this.userdata.currentProgram].exercises).forEach(function (ex) {
                    _this.dbService.getExerciseByUid(ex).subscribe(function (ex2) {
                        _this.exercisesOfCurrentProgram.push(ex2);
                        _this.currentExercise = _this.exercisesOfCurrentProgram[0];
                    });
                });
            }
        });
    };
    HomeComponent.prototype.loadExcercise = function (excerciseId) {
        var _this = this;
        this.exercisesOfCurrentProgram.forEach(function (ex) {
            if (ex["$key"] == excerciseId)
                _this.currentExercise = ex;
        });
    };
    HomeComponent.prototype.copyUserId = function (uidParagraph) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(uidParagraph);
        selection.addRange(range);
        document.execCommand('copy');
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* Component */])({
        selector: 'home',
        template: __webpack_require__(249),
        styles: [__webpack_require__(237)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_kinect_service__["a" /* KinectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_kinect_service__["a" /* KinectService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_drawcanvas_service__["a" /* DrawCanvasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_drawcanvas_service__["a" /* DrawCanvasService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* AngularFire */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_database_service__["a" /* DatabaseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_database_service__["a" /* DatabaseService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2__["d" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2__["d" /* AngularFireAuth */]) === "function" && _e || Object])
], HomeComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_angularfire2__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].from(this.auth)
            .take(1)
            .map(function (state) { return !!state; })
            .do(function (authenticated) {
            if (!authenticated)
                _this.router.navigate(['/login']);
        });
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_angularfire2__["d" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_angularfire2__["d" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Ostrich';\n  src: url(" + __webpack_require__(71) + ");\n  font-weight: bold; }\n\nh1 {\n  text-align: center;\n  margin-top: 5%;\n  margin-bottom: 5%;\n  font-family: \"Ostrich\";\n  font-size: 5em; }\n\nform {\n  width: 400px;\n  margin: auto;\n  text-align: center; }\n  form p {\n    padding: 5px;\n    width: 80%;\n    margin: auto;\n    margin-top: 5%;\n    margin-bottom: 5%;\n    color: orange;\n    background-color: rgba(50, 50, 50, 0.5);\n    border-radius: 5px; }\n  form .form-group {\n    width: 90%;\n    margin: auto; }\n    form .form-group .form-control {\n      -webkit-transition: all 0.1s ease;\n      transition: all 0.1s ease; }\n      form .form-group .form-control:focus {\n        -webkit-transform: scale(1.15);\n        transform: scale(1.15); }\n    form .form-group input {\n      width: 90%;\n      margin: auto;\n      margin-top: 2%;\n      height: 40px;\n      color: black;\n      font-size: 15px;\n      border-radius: 5px;\n      font-family: Helvetica, sans-serif; }\n    form .form-group button {\n      width: 100%; }\n    form .form-group a {\n      width: 100%;\n      height: 25px;\n      font-size: 15px;\n      margin-top: 3%; }\n    form .form-group #resetpasswordbutton {\n      font-size: .8em;\n      text-align: right;\n      width: 98%;\n      margin: auto; }\n  form #buttons {\n    margin: auto;\n    margin-top: 1%;\n    width: 80%;\n    text-align: center; }\n    form #buttons #loginbutton {\n      background: #3ED600;\n      font-size: 1.3em; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Ostrich';\n  src: url(" + __webpack_require__(71) + ");\n  font-weight: bold; }\n\nh1 {\n  text-align: center;\n  margin-top: 5%;\n  margin-bottom: 5%;\n  font-family: \"Ostrich\";\n  font-size: 5em; }\n\nform {\n  width: 400px;\n  margin: auto; }\n  form .form-group {\n    width: 90%;\n    margin: auto; }\n    form .form-group .form-control {\n      -webkit-transition: all 0.1s ease;\n      /* Safari and Chrome */\n      /* Firefox */\n      /* Opera */\n      transition: all 0.1s ease; }\n      form .form-group .form-control:focus {\n        -webkit-transform: scale(1.15);\n        /* Safari and Chrome */\n        /* Firefox */\n        /* IE 9 */\n        /* Opera */\n        transform: scale(1.15); }\n    form .form-group input {\n      width: 90%;\n      margin: auto;\n      margin-top: 2%;\n      height: 40px;\n      color: black;\n      font-size: 15px;\n      background: white;\n      border-radius: 5px;\n      font-family: Helvetica, sans-serif; }\n  form #buttons {\n    margin: auto;\n    margin-top: 5%;\n    width: 80%;\n    text-align: center; }\n    form #buttons button {\n      width: 100%; }\n    form #buttons a {\n      width: 100%;\n      height: 25px;\n      font-size: 15px;\n      margin-top: 3%; }\n    form #buttons #registerbutton {\n      background: #3ED600;\n      font-size: 1.3em; }\n  form #errMsg {\n    padding: 5px;\n    width: 80%;\n    margin: auto;\n    margin-top: 5%;\n    margin-bottom: 5%;\n    text-align: center;\n    color: orange;\n    background-color: rgba(50, 50, 50, 0.5);\n    border-radius: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Ostrich';\n  src: url(" + __webpack_require__(71) + ");\n  font-weight: bold; }\n\nh1 {\n  text-align: center;\n  margin-top: 5%;\n  margin-bottom: 5%;\n  font-family: \"Ostrich\";\n  font-size: 5em; }\n\ndiv {\n  margin: auto;\n  width: 400px;\n  background-color: rgba(20, 20, 20, 0.5);\n  text-align: center;\n  padding-bottom: 2%;\n  border-radius: 10px;\n  text-shadow: 0px 1px #777777; }\n  div button {\n    margin-top: 5%;\n    width: 150px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Ostrich';\n  src: url(" + __webpack_require__(71) + ");\n  font-weight: bold; }\n\nh1 {\n  text-align: center;\n  margin-top: 5%;\n  margin-bottom: 5%;\n  font-family: \"Ostrich\";\n  font-size: 5em; }\n\np {\n  text-align: center; }\n\nform {\n  width: 400px;\n  margin: auto; }\n  form .form-group {\n    width: 90%;\n    margin: auto; }\n    form .form-group .form-control {\n      -webkit-transition: all 0.1s ease;\n      transition: all 0.1s ease; }\n      form .form-group .form-control:focus {\n        -webkit-transform: scale(1.15);\n        transform: scale(1.15); }\n    form .form-group input {\n      width: 90%;\n      margin: auto;\n      margin-top: 2%;\n      height: 40px;\n      color: black;\n      font-size: 15px;\n      border-radius: 5px;\n      font-family: Helvetica, sans-serif; }\n  form #buttons {\n    margin: auto;\n    margin-top: 5%;\n    width: 80%;\n    text-align: center; }\n    form #buttons button {\n      width: 100%;\n      background: #3ED600;\n      font-size: 1.3em; }\n  form a {\n    width: 100%;\n    height: 25px;\n    font-size: 15px;\n    margin-top: 3%; }\n  form #errMsg {\n    padding: 5px;\n    width: 80%;\n    margin: auto;\n    margin-top: 5%;\n    margin-bottom: 5%;\n    text-align: center;\n    color: orange;\n    background-color: rgba(50, 50, 50, 0.5);\n    border-radius: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "select {\n  color: black; }\n\n#uidModal {\n  color: black; }\n  #uidModal #uid {\n    font-weight: bold; }\n\n.wrapper {\n  margin-left: 5%;\n  margin-right: 5%; }\n\n.startButtonDiv {\n  margin-top: 25px; }\n\n.header-current-program {\n  color: \"yellow\"; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)();
// imports


// module
exports.push([module.i, "\r\nbody{\r\n    background-image: url('/./assets/images/background.jpg');\r\n}\r\n\r\n#logoutButton{\r\n    padding:0;\r\n    background-color:transparent;\r\n    border: none;\r\n}\r\n\r\n#logoutImg{\r\n    width:40px;\r\n    height:40px;\r\n}\r\n\r\n.navigatieheader{\r\n    padding-right:5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 244:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navigation navbar-default\">\r\n  <div class=\"container-fluid navigatieheader\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\r\n        aria-expanded=\"false\">\r\n        <span class=\"sr-only\">Toggle navigation</span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <a class=\"navbar-brand brand\" [routerLink]=\"['/home']\">Joint Effort Client App</a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n      <ul class=\"nav navbar-nav\">\r\n      </ul>\r\n      <ul class=\"nav navbar-nav navbar-right\">\r\n        <button id=\"logoutButton\" *ngIf=\"name != null\" class=\"btn navbutton btn-danger\" (click)=\"logout()\"><img id=\"logoutImg\" src=\"./assets/images/logout.svg\"></button>\r\n      </ul>\r\n    </div>\r\n    <!-- /.navbar-collapse -->\r\n  </div>\r\n  <!-- /.container-fluid -->\r\n</nav>\r\n\r\n<router-outlet> </router-outlet>"

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

module.exports = "<h1>Login</h1>\r\n<form name=\"form\" (ngSubmit)=\"onSubmit(formData)\" #formData='ngForm'>\r\n  <p *ngIf=\"error.message != ''\" id=\"errMsg\">{{error.message}}</p>\r\n  <div class=\"form-group\">\r\n    <input type=\"email\" placeholder=\"Email\" class=\"form-control\" name=\"email\" (ngModel)=\"email\" required/>\r\n  </div>\r\n\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"password\" placeholder=\"Password\" class=\"form-control\" name=\"password\" (ngModel)=\"password\" required />\r\n    <a [routerLink]=\"['/resetpassword']\" id=\"resetpasswordbutton\" class=\"btn btn-link\">Forgot password?</a>\r\n  </div>\r\n\r\n  <div class=\"form-group\" id=\"buttons\">\r\n    <button id=loginbutton type=\"submit\" [disabled]=\"!formData.valid\" class=\"btn btn-primary\">Login</button>\r\n  </div>\r\n  <a [routerLink]=\"['/register']\" id=\"registerButton\" class=\"btn btn-link\">No account yet? <strong>You can make one here!</strong></a>\r\n\r\n  <form>"

/***/ }),

/***/ 246:
/***/ (function(module, exports) {

module.exports = "<h1>Register</h1>\r\n<form name=\"form\" #formData='ngForm' (ngSubmit)=\"onSubmit(formData)\" novalidate>\r\n  <p *ngIf=\"error.message != ''\" id=\"errMsg\">{{error.message}}</p>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"text\" placeholder=\"Name\" class=\"form-control\" name=\"surname\" (ngModel)=\"surname\" required />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"text\" placeholder=\"Last Name\" class=\"form-control\" name=\"lastname\" (ngModel)=\"lastname\" required />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"number\" placeholder=\"Weight\" class=\"form-control\" name=\"weight\" (ngModel)=\"weight\" required />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"number\" placeholder=\"Length\" class=\"form-control\" name=\"length\" (ngModel)=\"length\" required />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"date\" placeholder=\"Birthdate\" class=\"form-control\" name=\"birthdate\" (ngModel)=\"birthdate\" required />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"email\" placeholder=\"Email\" class=\"form-control\" name=\"email\" (ngModel)=\"email\" required />\r\n  </div>\r\n\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"password\" placeholder=\"Password\" class=\"form-control\" name=\"password\" (ngModel)=\"password\" required validateEqual=\"repeatPassword\"\r\n    />\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"password\" placeholder=\"Repeat your password\" class=\"form-control\" name=\"repeatPassword\" required validateEqual=\"password\"\r\n    />\r\n  </div>\r\n\r\n\r\n  <div class=\"form-group\" id=\"buttons\">\r\n    <button type=\"submit\" id=registerbutton [disabled]=\"!formData.valid\" class=\"btn btn-success\">Register</button>\r\n    <a [routerLink]=\"['/login']\" id=\"loginButton\" class=\"btn btn-link\">Go Back</a>\r\n  </div>\r\n\r\n  <form>"

/***/ }),

/***/ 247:
/***/ (function(module, exports) {

module.exports = "<h1>Reset password</h1>\r\n<div class=\"container\">\r\n    <h2>Email send!</h2>\r\n    <h3>Please check your inbox</h3>\r\n    <button class=\"btn btn-success\" (click)=\"okButtonClicked()\">Go back to login</button>\r\n</div>"

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = "<h1>Reset password</h1>\r\n<form name=\"form\" (ngSubmit)=\"onSubmit(formData)\" #formData='ngForm'>\r\n  <p *ngIf=\"error.message != ''\" id=\"errMsg\">{{error.message}}</p>\r\n  <div class=\"form-group\">\r\n    <input type=\"email\" placeholder=\"Email\" class=\"form-control\" name=\"email\" (ngModel)=\"email\" required/>\r\n  </div>\r\n\r\n  <div class=\"form-group\" id=\"buttons\">\r\n    <button id=resetbutton type=\"submit\" [disabled]=\"!formData.valid\" class=\"btn btn-primary\">Send email</button>\r\n  </div>\r\n  <a [routerLink]=\"['/login']\" id=\"loginButton\" class=\"btn btn-link\">Go back</a>\r\n\r\n  <form>"

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "<div id=\"uidModal\" class=\"modal fade\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h4 class=\"modal-title\">Uid</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>Give this Uid to your mentor to start the Joint Effort</p>\r\n                <p id=\"uid\" #uid>{{userUid}}</p>\r\n                <button (click)=\"copyUserId(uid)\"> COPY</button>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Go back</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"wrapper\">\r\n    <h1 class=\"col-xs-12\">{{currentExcercise?.name}}</h1>\r\n    <!--<button class=\"btn btn-warning\" (click)=\"playMockData(1)\">Play linkerhand</button>    \r\n    <button class=\"btn btn-warning\" (click)=\"playMockData(2)\">Play rechterhand</button>-->\r\n    <!--<button (click)=\"loadExcercise(1)\">getEx1</button>-->\r\n\r\n    <div class=\"canvasArea col-xs-8\">\r\n        <canvas id=\"colorframecanvas\" width=\"960\" height=\"540\" style=\"position:absolute\"></canvas>\r\n        <canvas id=\"bodyframecanvas\" width=\"960\" height=\"540\" style=\"position:absolute\"></canvas>\r\n        <canvas id=\"exercisecanvas\" width=\"960\" height=\"540\" style=\"position:absolute\"></canvas>\r\n    </div>\r\n    \r\n\r\n    <div class=\"col-xs-4 controls\">\r\n    <button class=\"btn btn-warning\" (click)=\"playMockData(3)\">Play arrow to the knee</button>    \r\n    <button class=\"btn btn-warning\" data-toggle=\"modal\" data-target=\"#uidModal\">Show Uid</button>\r\n    \r\n    <h2 class=\"col-xs-12\">Current Program</h2>\r\n    <div class=\"col-xs-12\">\r\n    <!--<select (change)=\"onChangeProgram($event.target.value)\" [disabled]>\r\n        <option *ngFor=\"let program of currentProgram\" value=\"{{program.programId}}\">{{program.name}}</option>\r\n    </select>-->\r\n    <h3 class=\"header-current-program\">{{currentProgram?.name}}</h3>\r\n    </div>\r\n    <h2 class=\"col-xs-12\">Exercise</h2>\r\n    <!--combobox to display all the excercises in the selected traject-->\r\n    <div class=\"col-xs-12\">\r\n        <select (change)=\"onChangeExcercise($event.target.value)\">\r\n        <option *ngFor=\"let exercise of exercisesOfCurrentProgram\" value=\"{{exercise?.$key}}\">{{exercise?.name}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"col-xs-12 startButtonDiv\">\r\n    <button class=\"col-xs-6\" id=\"btnStartExercise\" class=\"btn btn-info\" (click)=\"drawExcercise()\"> Start Excercise</button>\r\n    </div>\r\n    </div>\r\n    \r\n</div>"

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = routerTransition;
/* unused harmony export slideRightTransition */
/* unused harmony export slideLeftTransition */

function routerTransition() {
    return fade();
}
function fade() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* trigger */])('routerTransition', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('void', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('*', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':enter', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ opacity: '0' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.2s ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ opacity: '1' }))
        ]),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':leave', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'scale(1.0)' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.2 ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'scale(0.0)', opacity: '0' }))
        ])
    ]);
}
function slideRightTransition() {
    return slideToRight();
}
function slideToRight() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* trigger */])('routerTransition', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('void', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('*', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':enter', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translateX(-100%)' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.3s ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translateX(0%)' }))
        ]),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':leave', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'transform(0%)' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.3 ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translate(-100%)' }))
        ])
    ]);
}
function slideLeftTransition() {
    return slideToLeft();
}
function slideToLeft() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* trigger */])('routerTransition', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('void', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* state */])('*', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ position: 'absolute', width: '100%' })),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':enter', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translateX(100%)' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.3s ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translateX(0%)' }))
        ]),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* transition */])(':leave', [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'transform(0%)' }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* animate */])('0.3 ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* style */])({ transform: 'translate(-100%)' }))
        ])
    ]);
}
//# sourceMappingURL=router.animations.js.map

/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(152);


/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = "data:font/opentype;base64,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"

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatabaseService = (function () {
    function DatabaseService(af) {
        this.af = af;
        this.items2 = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.oefening = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.items = af.database.list('items');
    }
    DatabaseService.prototype.getUserdataById = function (uid) {
        return this.af.database.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        }).map(function (res) { return res[0]; });
    };
    DatabaseService.prototype.getExcerciseById = function (excercise) {
        return this.af.database.list('exercises', {
            query: {
                orderByChild: 'excerciseid',
                equalTo: Number(excercise)
            }
        });
    };
    DatabaseService.prototype.getExerciseByUid = function (exercise) {
        return this.af.database.object('/exercises/' + exercise);
    };
    //sets the excerciseNr to fetch from getExcerciseDetails
    DatabaseService.prototype.setOefening = function (excerciseNr) {
        this.oefening.next(excerciseNr);
    };
    DatabaseService.prototype.createUser = function (userData, uid) {
        console.log("in service");
        console.log(userData);
        console.log(userData.value.email);
        console.log(userData.value.lastname);
        this.af.database.list('/users').push({
            uid: uid,
            name: userData.value.surname,
            lastName: userData.value.lastname,
            email: userData.value.email,
            weight: userData.value.weight,
            length: userData.value.length,
            birthDate: userData.value.birthdate,
            traject: new Array(),
            mentorId: "0"
        });
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* AngularFire */]) === "function" && _a || Object])
], DatabaseService);

var _a;
//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KinectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KinectService = (function () {
    function KinectService(_http) {
        this._http = _http;
        this.bodyFrame = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.bodyFrameMock = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.colorFrame = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.mockData = false;
        this.counter = 0;
        this.array = null;
        var self = this;
        this.ipc = electron.ipcRenderer;
        //open the listener to the bodyFrames
        this.ipc.on('bodyFrame', function (event, bodyFrame) {
            self.bodyFrame.next(bodyFrame);
        });
        //open the listener to the colorFrames
        this.ipc.on('colorFrame', function (event, colorFrame) {
            self.colorFrame.next(colorFrame);
        });
        //open listener for other logs
        this.ipc.on('log', function (event, data) {
        });
    }
    KinectService.prototype.getBodyFrames = function (mock, fileName) {
        if (mock) {
            this.streamMockData(fileName);
            return this.bodyFrameMock.asObservable();
        }
        else
            return this.bodyFrame.asObservable();
    };
    KinectService.prototype.getColorFrames = function () {
        return this.colorFrame.asObservable();
    };
    KinectService.prototype.streamMockData = function (fileName) {
        var _this = this;
        var self = this;
        var interval;
        this._http.get('assets/' + fileName + '.json').map(function (res) {
            _this.array = JSON.parse(JSON.stringify(res.json()));
            interval = setInterval(function () {
                if (self.counter <= self.array.length) {
                    self.bodyFrameMock.next(JSON.stringify(self.array[self.counter]));
                }
                else {
                    clearInterval(interval);
                    self.counter = 0;
                }
                self.counter++;
            }, 1000 / 30);
        }).subscribe(function (res) { return res; });
    };
    return KinectService;
}());
KinectService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object])
], KinectService);

var _a;
//# sourceMappingURL=kinect.service.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kinect_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bezier_js__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bezier_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bezier_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrawCanvasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DrawCanvasService = (function () {
    function DrawCanvasService(kinectService) {
        this.kinectService = kinectService;
        this.HANDSIZE = 13;
        this.HANDCLOSEDCOLOR = "red";
        this.HANDOPENCOLOR = "green";
        this.HANDLASSOCOLOR = "blue";
        this.COLOR_ACTION_CURRENT = "#E88C00";
        this.COLOR_ACTION_NEXT = "rgba(255,255,255,0.1)";
        this.COLOR_ACTION_COMPLETED = "#7DFF00";
        this.COLOR_OFFSET = "red";
        this.colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
        this.joints = null; //array with all recognised joints (25)
        this.intervalOfCurrentExcercise = null;
        this.stepColors = new Array();
        this.currentStepNr = 0;
    }
    /**
         * param2: boolean to set when playing mockdata
         * param3: filename without .json that needs to be played
         */
    DrawCanvasService.prototype.drawBodyFrame = function (bodyFrameCanvas, mock, fileName) {
        var self = this;
        var bodyFrameCtx = bodyFrameCanvas.getContext('2d');
        var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
        this.kinectService.getBodyFrames(mock, fileName).subscribe(function (bodyFrame) {
            bodyFrame = JSON.parse(bodyFrame);
            //main rendering process
            bodyFrameCtx.clearRect(0, 0, bodyFrameCanvas.width, bodyFrameCanvas.height);
            var index = 0;
            bodyFrame.bodies.forEach(function (body) {
                if (body.tracked) {
                    //draw the joints
                    for (var jointType in body.joints) {
                        var joint = body.joints[jointType];
                        bodyFrameCtx.fillStyle = colors[index];
                        bodyFrameCtx.fillRect(joint.depthX * bodyFrameCtx.canvas.width, joint.depthY * bodyFrameCtx.canvas.height, 5, 5);
                    }
                    index++;
                    self.joints = body.joints; //save all joints to class variable
                    self.joints.push(body.bodyIndex);
                    //draw the hands
                    //draw hand states
                    self.updateHandState(body.leftHandState, body.joints[7], bodyFrameCtx);
                    self.updateHandState(body.rightHandState, body.joints[11], bodyFrameCtx);
                }
                ;
            });
        });
    };
    DrawCanvasService.prototype.drawColorFrame = function (colorFrameCanvas) {
        var colorFrameCtx = colorFrameCanvas.getContext('2d');
        var colorProcessing = false;
        var colorWorkerThread = new Worker("./assets/colorWorker.js");
        colorWorkerThread.addEventListener("message", function (event) {
            if (event.data.message === 'imageReady') {
                colorFrameCtx.putImageData(event.data.imageData, 0, 0);
                colorProcessing = false;
            }
        });
        colorWorkerThread.postMessage({
            "message": "setImageData",
            "imageData": colorFrameCtx.createImageData(colorFrameCtx.canvas.width, colorFrameCtx.canvas.height)
        });
        this.kinectService.getColorFrames().subscribe(function (imageBuffer) {
            if (!colorProcessing) {
                colorProcessing = true;
                colorWorkerThread.postMessage({ "message": "processImageData", "imageBuffer": imageBuffer });
            }
        });
    };
    //function updatehandstate to draw the bodyFrame
    DrawCanvasService.prototype.updateHandState = function (handState, jointPoint, bodyFrameCtx) {
        switch (handState) {
            case 3:
                this.drawHand(jointPoint, this.HANDCLOSEDCOLOR, bodyFrameCtx);
                break;
            case 2:
                this.drawHand(jointPoint, this.HANDOPENCOLOR, bodyFrameCtx);
                break;
            case 4:
                this.drawHand(jointPoint, this.HANDLASSOCOLOR, bodyFrameCtx);
                break;
        }
    };
    //function drawhand to draw the bodyFrame
    DrawCanvasService.prototype.drawHand = function (jointPoint, handColor, bodyFrameCtx) {
        // draw semi transparent hand cicles
        bodyFrameCtx.globalAlpha = 0.75;
        bodyFrameCtx.beginPath();
        bodyFrameCtx.fillStyle = handColor;
        bodyFrameCtx.arc(jointPoint.depthX * bodyFrameCtx.canvas.width, jointPoint.depthY * bodyFrameCtx.canvas.height, this.HANDSIZE, 0, Math.PI * 2, true);
        bodyFrameCtx.fill();
        bodyFrameCtx.closePath();
        bodyFrameCtx.globalAlpha = 1;
    };
    DrawCanvasService.prototype.drawExcercise = function (excerciseCanvas, newExcercise) {
        var self = this;
        this.ctx = excerciseCanvas.getContext('2d');
        this.stepColors = new Array();
        this.currentStepNr = 0;
        var steps = newExcercise.steps;
        //clear the current excercise if a new one is started
        if (this.intervalOfCurrentExcercise != null) {
            clearInterval(this.intervalOfCurrentExcercise);
            this.ctx.clearRect(0, 0, excerciseCanvas.width, excerciseCanvas.height);
        }
        //loop over every step in the excercise and define the right color
        this.initializeExercise(newExcercise);
        ///check for collision with a kinect-joint and a point in the excercise with 30 FPS        
        this.intervalOfCurrentExcercise = setInterval(function () {
            newExcercise.steps.forEach(function (step, index) {
                //check if the step is a TouchPoint or TrackingLine then do collision detection
                if (step.stepNr == self.currentStepNr && self.joints != null) {
                    if (step.stepType == 0)
                        self.detectCollisionWithTouchPoint(step, index, steps, excerciseCanvas, false);
                    else if (step.stepType == 1)
                        self.detectCollisionWithTrackingLine(step, index, steps, excerciseCanvas);
                    else if (step.stepType == 2) {
                        self.detectCollisionWithTouchPoint(step, index, steps, excerciseCanvas, true);
                    }
                }
                if (self.currentStepNr >= newExcercise.steps.length)
                    clearInterval(self.intervalOfCurrentExcercise);
            });
        }, 1000 / 30);
    };
    DrawCanvasService.prototype.drawTouchPoint = function (x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    DrawCanvasService.prototype.drawTrackingLine = function (step, lineColor) {
        this.ctx.beginPath();
        this.ctx.moveTo(step.x0, step.y0);
        this.ctx.bezierCurveTo(step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = lineColor;
        this.ctx.stroke();
        this.ctx.closePath();
        if (this.currentStepNr == step.stepNr) {
            this.drawOffsetOfTrackingLine(step);
        }
    };
    DrawCanvasService.prototype.drawOffsetOfTrackingLine = function (step) {
        var offsetLeft = new __WEBPACK_IMPORTED_MODULE_2_bezier_js___default.a(step.x0, step.y0, step.x1, step.y1, step.x2, step.y2, step.x3, step.y3).offset(step.trackingLineOffset);
        var offsetRight = new __WEBPACK_IMPORTED_MODULE_2_bezier_js___default.a(step.x0, step.y0, step.x1, step.y1, step.x2, step.y2, step.x3, step.y3).offset(-step.trackingLineOffset);
        this.ctx.beginPath();
        this.ctx.moveTo(offsetLeft[0].points[0].x, offsetLeft[0].points[0].y);
        for (var i = 0; i < Object.keys(offsetLeft).length; i++) {
            this.ctx.strokeStyle = this.COLOR_OFFSET;
            this.ctx.bezierCurveTo(offsetLeft[i].points[1].x, offsetLeft[i].points[1].y, offsetLeft[i].points[2].x, offsetLeft[i].points[2].y, offsetLeft[i].points[3].x, offsetLeft[i].points[3].y);
            this.ctx.stroke();
        }
        this.ctx.moveTo(offsetRight[0].points[0].x, offsetRight[0].points[0].y);
        for (var i = 0; i < Object.keys(offsetRight).length; i++) {
            this.ctx.strokeStyle = this.COLOR_OFFSET;
            this.ctx.bezierCurveTo(offsetRight[i].points[1].x, offsetRight[i].points[1].y, offsetRight[i].points[2].x, offsetRight[i].points[2].y, offsetRight[i].points[3].x, offsetRight[i].points[3].y);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    };
    DrawCanvasService.prototype.detectCollisionWithTouchPoint = function (step, index, steps, canvas, hasSecondTouchPoint) {
        var mousex = this.joints[step.jointType].depthX * canvas.width;
        var mousey = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer            
        var distanceToFirstTrackingPoint = Math.sqrt((mousex - step.x0) * (mousex - step.x0) + (mousey - step.y0) * (mousey - step.y0));
        var distanceToSecondTrackingPoint = Math.sqrt((mousex - step.x1) * (mousex - step.x1) + (mousey - step.y1) * (mousey - step.y1));
        if (hasSecondTouchPoint) {
            if (distanceToFirstTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            }
            else
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
            if (distanceToSecondTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_COMPLETED);
            }
            else
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_CURRENT);
            if (distanceToSecondTrackingPoint < step.radius && distanceToFirstTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
                this.drawTouchPoint(step.x1, step.y1, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.currentStepNr++;
            }
        }
        else {
            if (distanceToFirstTrackingPoint < step.radius) {
                this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.currentStepNr++;
            }
        }
    };
    DrawCanvasService.prototype.detectCollisionWithTrackingLine = function (step, index, steps, canvas) {
        var mouseX = this.joints[step.jointType].depthX * canvas.width;
        var mouseY = this.joints[step.jointType].depthY * canvas.height;
        //calculate the distance between the circle and the mousepointer
        //calculate the bezier-distance
        var curve = new __WEBPACK_IMPORTED_MODULE_2_bezier_js___default.a(step.x0, step.y0, step.x1, step.y1, step.x2, step.y2, step.x3, step.y3);
        var mouseCoordinates = { x: mouseX, y: mouseY };
        var distanceOfJointFromTrackingLine = curve.project(mouseCoordinates);
        var distanceFromStartingPoint = Math.sqrt((mouseX - step.x0) * (mouseX - step.x0) + (mouseY - step.y0) * (mouseY - step.y0));
        var distanceFromEndingPoint = Math.sqrt((mouseX - step.x3) * (mouseX - step.x3) + (mouseY - step.y3) * (mouseY - step.y3));
        //First check if the user touched the starting point of the TrackingLine
        if (distanceFromStartingPoint < step.radius) {
            this.drawTrackingLine(step, this.COLOR_ACTION_CURRENT);
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = true;
        }
        else if (distanceFromStartingPoint < step.radius && !this.hasToFollowTrackingLine) {
            this.drawTrackingLine(step, this.COLOR_ACTION_NEXT);
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_COMPLETED);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = true;
        }
        //user has to stay between the TrackingLineOffset
        if (distanceOfJointFromTrackingLine.d < step.trackingLineOffset && this.hasToFollowTrackingLine) {
            //check if the user touches the endpoint and completed the TrackingLine => step IS COMPLETE!!
            if (distanceFromEndingPoint < step.radius) {
                this.drawTrackingLine(step, this.COLOR_ACTION_COMPLETED);
                this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_COMPLETED);
                if (steps[index + 1] != null) {
                    this.drawTouchPoint(steps[index + 1].x0, steps[index + 1].y0, steps[index + 1].radius, this.COLOR_ACTION_CURRENT);
                }
                this.hasToFollowTrackingLine = false;
                this.currentStepNr++;
            }
        }
        else if (distanceOfJointFromTrackingLine.d > step.trackingLineOffset && this.hasToFollowTrackingLine) {
            //if the user is out of reach from the offset => reset the TrackingLine step. The user now has to retry the step.
            this.drawTrackingLine(step, "white");
            this.drawTouchPoint(step.x0, step.y0, step.radius, this.COLOR_ACTION_CURRENT);
            this.drawTouchPoint(step.x3, step.y3, step.radius, this.COLOR_ACTION_NEXT);
            this.hasToFollowTrackingLine = false;
        }
    };
    DrawCanvasService.prototype.initializeExercise = function (exercise) {
        var _this = this;
        exercise.steps.forEach(function (step, stepNr) {
            if (step.stepType == 0) {
                if (stepNr <= 0)
                    _this.drawTouchPoint(step.x0, step.y0, step.radius, _this.COLOR_ACTION_CURRENT);
                else
                    _this.drawTouchPoint(step.x0, step.y0, step.radius, _this.COLOR_ACTION_NEXT);
            }
            else if (step.stepType == 1) {
                _this.drawTrackingLine(step, _this.COLOR_ACTION_NEXT);
                if (stepNr <= 0)
                    _this.drawTouchPoint(step.x0, step.y0, step.radius, _this.COLOR_ACTION_CURRENT);
                else
                    _this.drawTouchPoint(step.x0, step.y0, step.radius, _this.COLOR_ACTION_NEXT);
            }
            else if (step.stepType == 2) {
                if (stepNr <= 0)
                    _this.drawTouchPoint(step.x0, step.y0, step.radius, _this.COLOR_ACTION_CURRENT);
                else
                    _this.drawTouchPoint(step.x1, step.y1, step.radius, _this.COLOR_ACTION_CURRENT);
            }
        });
    };
    return DrawCanvasService;
}());
DrawCanvasService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__kinect_service__["a" /* KinectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__kinect_service__["a" /* KinectService */]) === "function" && _a || Object])
], DrawCanvasService);

var _a;
//# sourceMappingURL=drawcanvas.service.js.map

/***/ })

},[514]);
//# sourceMappingURL=main.bundle.js.map