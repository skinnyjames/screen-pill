"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
module.exports = {
    element: function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, driver, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.index;
                        driver = this.driver;
                        return [4, this.driver.findElements(this.locator)];
                    case 1:
                        elements = _a.sent();
                        if (!elements[index]) {
                            return [2, Promise.reject("No such element at index: " + index + " with " + JSON.stringify(this.locator))];
                        }
                        return [2, Promise.resolve(elements[index])];
                }
            });
        });
    },
    allElements: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.driver.findElements(this.locator)];
            });
        });
    },
    exists: function () {
        return __awaiter(this, void 0, void 0, function () {
            function success(elements) {
                if (elements[index]) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function error(err) {
                return false;
            }
            var locator, index, driver;
            return __generator(this, function (_a) {
                locator = this.locator;
                index = this.index;
                driver = this.driver;
                return [2, driver.findElements(locator).then(success, error)];
            });
        });
    },
    waitUntil: function (cb, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var self, driver, condition;
            return __generator(this, function (_a) {
                if (!opts.timeout) {
                    opts.timeout = 5000;
                }
                if (!opts.message) {
                    opts.message = 'wait condition timed out after ' + opts.timeout + ' millseconds';
                }
                self = this;
                driver = this.driver;
                condition = function () {
                    return cb(self);
                };
                return [2, driver.wait(condition, opts.timeout, opts.message)];
            });
        });
    },
    waitUntilPresent: function (opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        var driver = this.driver;
        if (!opts.timeout) {
            opts.timeout = 5000;
        }
        if (!opts.message) {
            opts.message = 'element ' + JSON.stringify(this.locator) + ' at index ' + this.index + ' not present after ' + opts.timeout + ' millseconds';
        }
        return this.driver.wait(function () {
            var locator = _this.locator;
            var index = _this.index;
            return driver.findElements(locator).then(success, error);
            function success(elements) {
                return __awaiter(this, void 0, void 0, function () {
                    var element, displayed;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!elements[index]) return [3, 3];
                                return [4, elements[index]];
                            case 1:
                                element = _a.sent();
                                return [4, element.isDisplayed()];
                            case 2:
                                displayed = _a.sent();
                                return [2, displayed];
                            case 3: return [2, Promise.resolve(false)];
                        }
                    });
                });
            }
            function error(err) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, Promise.resolve(false)];
                    });
                });
            }
        }, opts.timeout, opts.message);
    }
};
