"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Bluebird = require("bluebird");
var Element = require('./element');
module.exports = function ScreenPill(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.setDriver = function (driver) {
            this.driver = driver;
        };
        class_1.prototype.directUrl = function (url) {
            this.url = url;
        };
        class_1.prototype.visit = function (url) {
            if (url) {
                return this.driver.get(url);
            }
            else {
                return this.driver.get(this.url);
            }
        };
        class_1.prototype.element = function (key, elementName, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement(elementName, locator);
            this.standardMethods(element);
            this[key] = element;
        };
        class_1.prototype.div = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('div', locator);
            element = this.standardMethods(element);
            element.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.getText()];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.textField = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('input[type=text]', locator);
            element = this.standardMethods(element);
            element.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.getAttribute('value')];
                        }
                    });
                });
            };
            element.set = function (value) {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.sendKeys(value)];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.passwordField = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('input[type=password]', locator);
            element = this.standardMethods(element);
            element.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.getAttribute('value')];
                        }
                    });
                });
            };
            element.set = function (value) {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.sendKeys(value)];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.textarea = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('textarea', locator);
            element = this.standardMethods(element);
            element.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.getAttribute('value')];
                        }
                    });
                });
            };
            element.set = function (value) {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [4, el.click()];
                            case 2:
                                _a.sent();
                                return [4, el.clear()];
                            case 3:
                                _a.sent();
                                return [2, el.sendKeys(value)];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.checkbox = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('input[type=checkbox]', locator);
            element = this.standardMethods(element);
            element.check = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.click()];
                        }
                    });
                });
            };
            element.isChecked = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.isSelected()];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.submit = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('div', locator);
            element = this.standardMethods(element);
            element.click = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.click()];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.selectList = function (key, locator) {
            if (locator === void 0) { locator = {}; }
            var element = this.initializeElement('div', locator);
            element = this.standardMethods(element);
            element.optionElements = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var el;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.element()];
                            case 1:
                                el = _a.sent();
                                return [2, el.findElements({ css: 'option' })];
                        }
                    });
                });
            };
            element.options = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var options;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.optionElements()];
                            case 1:
                                options = _a.sent();
                                return [2, Bluebird.map(options, function (option) {
                                        return option.getText();
                                    })];
                        }
                    });
                });
            };
            element.getSelected = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var options, selected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.optionElements()];
                            case 1:
                                options = _a.sent();
                                selected = Bluebird.filter(options, function (option) {
                                    return option.isSelected();
                                });
                                return [2, Bluebird.map(selected, function (el) {
                                        return el.getText();
                                    })];
                        }
                    });
                });
            };
            element.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var selected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.getSelected()];
                            case 1:
                                selected = _a.sent();
                                return [2, selected[0]];
                        }
                    });
                });
            };
            element.select = function (value) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, this.selectBy('text', value)];
                    });
                });
            };
            element.selectBy = function (type, token) {
                if (type === void 0) { type = 'index'; }
                return __awaiter(this, void 0, void 0, function () {
                    var options, _loop_1, i, _loop_2, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.optionElements()];
                            case 1:
                                options = _a.sent();
                                switch (type) {
                                    case 'index':
                                        return [2, options[token].click()];
                                        break;
                                    case 'value':
                                        _loop_1 = function (i) {
                                            options[i].getAttribute('value')
                                                .then(function (value) {
                                                if (value == token) {
                                                    options[i].click();
                                                }
                                            });
                                        };
                                        for (i = 0; i < options.length; i++) {
                                            _loop_1(i);
                                        }
                                        break;
                                    default:
                                        _loop_2 = function (i) {
                                            options[i].getText()
                                                .then(function (text) {
                                                if (text == token) {
                                                    options[i].click();
                                                }
                                            });
                                        };
                                        for (i = 0; i < options.length; i++) {
                                            _loop_2(i);
                                        }
                                }
                                return [2];
                        }
                    });
                });
            };
            this[key] = element;
        };
        class_1.prototype.standardMethods = function (element) {
            return Object.assign(element, Element);
        };
        class_1.prototype.initializeElement = function (elementName, locator) {
            var parsedLocator = this.parseLocator(elementName, locator);
            var element = {
                driver: this.driver,
                locator: parsedLocator.locator,
                index: parsedLocator.index
            };
            return element;
        };
        class_1.prototype.parseLocator = function (elementName, locator) {
            var index;
            if (locator.css) {
                locator.css = elementName + locator.css;
            }
            else {
                locator.css = elementName;
            }
            if (locator.index != null) {
                index = locator.index;
                delete locator.index;
            }
            else {
                index = 0;
            }
            return { locator: locator, index: index };
        };
        return class_1;
    }(Base));
};
