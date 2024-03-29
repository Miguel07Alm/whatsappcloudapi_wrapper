'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var unirest = require('unirest');
var signale = require("signale");
var fs = require("fs");
var msg_parser_1 = require("./msg_parser");
var WhatsappCloud = /** @class */ (function () {
    function WhatsappCloud(_a) {
        var accessToken = _a.accessToken, graphAPIVersion = _a.graphAPIVersion, senderPhoneNumberId = _a.senderPhoneNumberId, WABA_ID = _a.WABA_ID;
        this.accessToken = accessToken;
        this.graphAPIVersion = graphAPIVersion || 'v18.0';
        this.senderPhoneNumberId = senderPhoneNumberId;
        this.baseUrl = "https://graph.facebook.com/".concat(this.graphAPIVersion, "/").concat(this.senderPhoneNumberId);
        this.WABA_ID = WABA_ID;
        this.audioSupportedMediaTypes = [
            'audio/aac',
            'audio/mp4',
            'audio/mpeg',
            'audio/amr',
            'audio/ogg',
        ];
        this.documentSupportedMediaTypes = [
            'text/plain',
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/msword',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        this.imageSupportedMediaTypes = ['image/jpeg', 'image/png'];
        this.videoSupportedMediaTypes = ['video/mp4', 'video/3gp'];
        this.stickerSupportedMediaTypes = ['image/webp'];
        this.supportedMediaTypes = {
            audio: this.audioSupportedMediaTypes,
            document: this.documentSupportedMediaTypes,
            image: this.imageSupportedMediaTypes,
            video: this.videoSupportedMediaTypes,
            sticker: this.stickerSupportedMediaTypes,
        };
        if (!this.accessToken) {
            throw new Error('Missing "accessToken"');
        }
        if (!this.senderPhoneNumberId) {
            throw new Error('Missing "senderPhoneNumberId".');
        }
    }
    WhatsappCloud.prototype._mustHaveParameter = function (param, paramName) {
        if (!param) {
            throw new Error("\"".concat(paramName, "\" is required in making a request"));
        }
    };
    WhatsappCloud.prototype._uploadMedia = function (_a) {
        var file_path = _a.file_path, file_name = _a.file_name;
        return __awaiter(this, void 0, void 0, function () {
            var type, formData, fileData, blob, requestOptions, response, responseData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        console.log('🚀 ~ WhatsappCloud ~ this._uploadMedia= ~ file_path:', file_path);
                        type = this._getMediaType({ file_path: file_path });
                        console.log('🚀 ~ WhatsappCloud ~ returnnewPromise ~ type:', type);
                        if (!type) {
                            throw new Error("The type of the file isn't supported!");
                        }
                        formData = new FormData();
                        fileData = fs.readFileSync(file_path);
                        blob = new Blob([fileData], { type: type });
                        formData.append('file', blob);
                        formData.append('messaging_product', 'whatsapp');
                        formData.append('type', type);
                        requestOptions = {
                            method: 'POST',
                            headers: {
                                Authorization: "Bearer ".concat(this.accessToken),
                            },
                            body: formData,
                        };
                        return [4 /*yield*/, fetch("https://graph.facebook.com/".concat(this.graphAPIVersion, "/").concat(this.senderPhoneNumberId, "/media"), requestOptions)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _b.sent();
                        if (!response.ok) {
                            console.error(responseData.error.message);
                            throw new Error(responseData.error.message);
                        }
                        console.log(JSON.stringify(responseData));
                        return [2 /*return*/, {
                                status: 'success',
                                media_id: responseData.id,
                                file_name: file_name || null,
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new Error('Error en la subida del medio: ' + error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappCloud.prototype._retrieveMediaUrl = function (_a) {
        var media_id = _a.media_id;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._fetchAssistant({
                            baseUrl: "https://graph.facebook.com/".concat(this.graphAPIVersion),
                            url: "/".concat(media_id),
                            method: 'GET',
                        })];
                    case 1:
                        response = _b.sent();
                        if (response.status === 'success') {
                            return [2 /*return*/, response.data];
                        }
                        throw new Error(response.error);
                }
            });
        });
    };
    WhatsappCloud.prototype.UNTESTED_downloadMediaViaUrl = function (_a) {
        var media_url = _a.media_url;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        unirest('GET', "".concat(media_url, "?access_token=").concat(_this.accessToken))
                            .headers({
                            Authorization: "Bearer ".concat(_this.accessToken),
                        })
                            .end(function (res) {
                            if (res.error) {
                                reject(res.error);
                            }
                            else {
                                var responseHeaders = res.headers;
                                resolve(__assign({ status: 'success' }, responseHeaders));
                            }
                        });
                    })];
            });
        });
    };
    WhatsappCloud.prototype._fetchAssistant = function (_a) {
        var baseUrl = _a.baseUrl, url = _a.url, method = _a.method, headers = _a.headers, body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var defaultHeaders = function () {
                            var output = {
                                'Content-Type': 'application/json',
                                'Accept-Language': 'en_US',
                                Accept: 'application/json',
                            };
                            if (_this.accessToken) {
                                output['Authorization'] = "Bearer ".concat(_this.accessToken);
                            }
                            return output;
                        };
                        var defaultBody = {};
                        var defaultMethod = 'GET';
                        if (!url) {
                            throw new Error('"url" is required in making a request');
                        }
                        if (!method) {
                            signale.warn("WARNING: \"method\" is missing. The default method will default to ".concat(defaultMethod, ". If this is not what you want, please specify the method."));
                        }
                        if (!headers) {
                            signale.warn("WARNING: \"headers\" is missing.");
                        }
                        if ((method === null || method === void 0 ? void 0 : method.toUpperCase()) === 'POST' && !body) {
                            signale.warn("WARNING: \"body\" is missing. The default body will default to ".concat(JSON.stringify(defaultBody), ". If this is not what you want, please specify the body."));
                        }
                        method = (method === null || method === void 0 ? void 0 : method.toUpperCase()) || defaultMethod;
                        headers = __assign(__assign({}, defaultHeaders()), headers);
                        body = body || defaultBody;
                        _this.baseUrl = baseUrl || _this.baseUrl;
                        var fullUrl = "".concat(_this.baseUrl).concat(url);
                        unirest(method, fullUrl)
                            .headers(headers)
                            .send(JSON.stringify(body))
                            .end(function (res) {
                            if (res.error) {
                                var errorObject = function () {
                                    var _a;
                                    try {
                                        return (((_a = res.body) === null || _a === void 0 ? void 0 : _a.error) || JSON.parse(res.raw_body));
                                    }
                                    catch (e) {
                                        return {
                                            error: res.raw_body,
                                        };
                                    }
                                };
                                reject(__assign({ status: 'failed' }, errorObject()));
                            }
                            else {
                                resolve({
                                    status: 'success',
                                    data: res.body,
                                });
                            }
                        });
                    })];
            });
        });
    };
    WhatsappCloud.prototype._getMediaType = function (_a) {
        var file_path = _a.file_path;
        var extension = file_path.split('.').pop().toLowerCase();
        for (var _i = 0, _b = Object.entries(this.supportedMediaTypes); _i < _b.length; _i++) {
            var _c = _b[_i], _ = _c[0], supportedExtensions = _c[1];
            for (var _d = 0, supportedExtensions_1 = supportedExtensions; _d < supportedExtensions_1.length; _d++) {
                var type = supportedExtensions_1[_d];
                if (type.includes(extension)) {
                    return type;
                }
            }
        }
        return null;
    };
    WhatsappCloud.prototype.createQRCodeMessage = function (_a) {
        var message = _a.message, _b = _a.imageType, imageType = _b === void 0 ? 'png' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._mustHaveParameter(message, 'message');
                        if (!['png', 'svg'].includes(imageType)) {
                            throw new Error("\"imageType\" must be either \"png\" or \"svg\"");
                        }
                        return [4 /*yield*/, this._fetchAssistant({
                                url: "/message_qrdls?access_token=".concat(this.accessToken, "&prefilled_message=").concat(message, "&generate_qr_image=").concat(imageType),
                                method: 'POST',
                                body: {},
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.PENDING_TESTS_sendText = function (_a) {
        var message = _a.message, recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._fetchAssistant({
                            url: '/messages',
                            method: 'POST',
                            body: {
                                messaging_product: 'whatsapp',
                                preview_url: false,
                                recipient_type: 'individual',
                                to: recipientPhone,
                                type: 'text',
                                text: {
                                    body: message,
                                },
                            },
                        })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendText = function (_a) {
        var message = _a.message, recipientPhone = _a.recipientPhone, context = _a.context;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        this._mustHaveParameter(message, 'message');
                        body = {
                            messaging_product: 'whatsapp',
                            to: recipientPhone,
                            type: 'text',
                            text: {
                                preview_url: false,
                                body: message,
                            },
                        };
                        if (context) {
                            body['context'] = context;
                            this._mustHaveParameter(context['message_id'], 'message_id');
                        }
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: body,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendTemplate = function (_a) {
        var templateName = _a.templateName, languageCode = _a.languageCode, components = _a.components, recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        this._mustHaveParameter(templateName, 'templateName');
                        this._mustHaveParameter(components, 'components');
                        this._mustHaveParameter(languageCode, 'languageCode');
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'template',
                            template: {
                                name: templateName,
                                language: {
                                    code: languageCode,
                                },
                                components: components,
                            },
                        };
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: body,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.markMessageAsRead = function (_a) {
        var _b;
        var message_id = _a.message_id;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        this._mustHaveParameter(message_id, 'message_id');
                        return [4 /*yield*/, this._fetchAssistant({
                                url: "/messages",
                                method: 'POST',
                                body: {
                                    messaging_product: 'whatsapp',
                                    status: 'read',
                                    message_id: message_id,
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                    case 2:
                        error_2 = _c.sent();
                        msg = (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.error_data) === null || _b === void 0 ? void 0 : _b.details;
                        if (msg && msg.includes('last-seen message in this conversation')) {
                            //ignore error anyway: If message is already read or has already been deleted - since whatever the error it is non-retryable.
                            return [2 /*return*/, {
                                    status: 'success',
                                    data: { success: false, error: msg },
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status: 'failed',
                                    error: error_2,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendSimpleButtons = function (_a) {
        var recipientPhone = _a.recipientPhone, message = _a.message, listOfButtons = _a.listOfButtons;
        return __awaiter(this, void 0, void 0, function () {
            var validButtons, body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(message, 'message');
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (!listOfButtons)
                            throw new Error('listOfButtons cannot be empty');
                        if (listOfButtons.length > 3)
                            throw new Error('listOfButtons cannot be bigger than 3 elements');
                        validButtons = listOfButtons
                            .map(function (button) {
                            if (!button.title) {
                                throw new Error('"title" is required in making a request.');
                            }
                            if (button.title.length > 20) {
                                throw new Error('The button title must be between 1 and 20 characters long.');
                            }
                            if (!button.id) {
                                throw new Error('"id" is required in making a request.');
                            }
                            if (button.id.length > 256) {
                                throw new Error('The button id must be between 1 and 256 characters long.');
                            }
                            return {
                                type: 'reply',
                                reply: {
                                    title: button.title,
                                    id: button.id,
                                },
                            };
                        })
                            .filter(Boolean);
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'interactive',
                            interactive: {
                                type: 'button',
                                body: {
                                    text: message,
                                },
                                action: {
                                    buttons: validButtons,
                                },
                            },
                        };
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: body,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendRadioButtons = function (_a) {
        var recipientPhone = _a.recipientPhone, headerText = _a.headerText, bodyText = _a.bodyText, footerText = _a.footerText, listOfSections = _a.listOfSections;
        return __awaiter(this, void 0, void 0, function () {
            var totalNumberOfItems, validSections, samples, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (!bodyText)
                            throw new Error('"bodyText" is required in making a request');
                        if (!headerText)
                            throw new Error('"headerText" is required in making a request');
                        if (!footerText)
                            throw new Error('"footerText" is required in making a request');
                        totalNumberOfItems = 0;
                        validSections = listOfSections
                            .map(function (section) {
                            var _a;
                            var title = section.title;
                            var rows = (_a = section.rows) === null || _a === void 0 ? void 0 : _a.map(function (row) {
                                if (!row.id) {
                                    throw new Error('"row.id" of an item is required in list of radio buttons.');
                                }
                                if (row.id.length > 200) {
                                    throw new Error('The row id must be between 1 and 200 characters long.');
                                }
                                if (!row.title) {
                                    throw new Error('"row.title" of an item is required in list of radio buttons.');
                                }
                                if (row.title.length > 24) {
                                    throw new Error('The row title must be between 1 and 24 characters long.');
                                }
                                if (!row.description) {
                                    throw new Error('"row.description" of an item is required in list of radio buttons.');
                                }
                                if (row.description.length > 72) {
                                    throw new Error('The row description must be between 1 and 72 characters long.');
                                }
                                totalNumberOfItems += 1;
                                return {
                                    id: row.id,
                                    title: row.title,
                                    description: row.description,
                                };
                            });
                            if (!title) {
                                throw new Error('"title" of a section is required in list of radio buttons.');
                            }
                            return {
                                title: title,
                                rows: rows,
                            };
                        })
                            .filter(Boolean);
                        if (totalNumberOfItems > 10) {
                            throw new Error('The total number of items in the rows must be equal or less than 10.');
                        }
                        samples = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'interactive',
                            interactive: {
                                type: 'list',
                                header: {
                                    type: 'text',
                                    text: headerText,
                                },
                                body: {
                                    text: bodyText,
                                },
                                footer: {
                                    text: footerText,
                                },
                                action: {
                                    button: 'Select a product',
                                    sections: validSections,
                                },
                            },
                        };
                        if (validSections.length === 0) {
                            throw new Error('"listOfSections" is required in making a request');
                        }
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: samples,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendImage = function (_a) {
        var recipientPhone = _a.recipientPhone, caption = _a.caption, file_path = _a.file_path, file_name = _a.file_name, url = _a.url;
        return __awaiter(this, void 0, void 0, function () {
            var body, uploadedFile, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (file_path && url) {
                            throw new Error('You can only send an image in your "file_path" or an image in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        if (!file_path && !url) {
                            throw new Error('You must send an image in your "file_path" or an image in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'image',
                            image: {
                                caption: caption || '',
                            },
                        };
                        if (!file_path) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uploadMedia({
                                file_path: file_path,
                                file_name: file_name,
                            })];
                    case 1:
                        uploadedFile = _b.sent();
                        body['image']['id'] = uploadedFile.media_id;
                        return [3 /*break*/, 3];
                    case 2:
                        body['image']['link'] = url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this._fetchAssistant({
                            url: '/messages',
                            method: 'POST',
                            body: body,
                        })];
                    case 4:
                        response = _b.sent();
                        return [2 /*return*/, {
                                response: response,
                                body: body,
                            }];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendVideo = function (_a) {
        var recipientPhone = _a.recipientPhone, file_path = _a.file_path, file_name = _a.file_name, url = _a.url;
        return __awaiter(this, void 0, void 0, function () {
            var body, uploadedFile, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (file_path && url) {
                            throw new Error('You can only send an video in your "file_path" or an video in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        if (!file_path && !url) {
                            throw new Error('You must send an video in your "file_path" or an video in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'video',
                        };
                        if (!file_path) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uploadMedia({
                                file_path: file_path,
                                file_name: file_name,
                            })];
                    case 1:
                        uploadedFile = _b.sent();
                        body['video']['id'] = uploadedFile.media_id;
                        return [3 /*break*/, 3];
                    case 2:
                        body['video']['link'] = url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this._fetchAssistant({
                            url: '/messages',
                            method: 'POST',
                            body: body,
                        })];
                    case 4:
                        response = _b.sent();
                        return [2 /*return*/, {
                                response: response,
                                body: body,
                            }];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendAudio = function (_a) {
        var recipientPhone = _a.recipientPhone, file_path = _a.file_path, file_name = _a.file_name, url = _a.url, context = _a.context;
        return __awaiter(this, void 0, void 0, function () {
            var body, uploadedFile, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (file_path && url) {
                            throw new Error('You can only send an audio in your "file_path" or an audio in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        if (!file_path && !url) {
                            throw new Error('You must send an audio in your "file_path" or an audio in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'audio',
                            audio: {}
                        };
                        if (context) {
                            body['context'] = context;
                            this._mustHaveParameter(context['message_id'], 'message_id');
                        }
                        if (!file_path) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uploadMedia({
                                file_path: file_path,
                                file_name: file_name,
                            })];
                    case 1:
                        uploadedFile = _b.sent();
                        body['audio']['id'] = uploadedFile.media_id;
                        return [3 /*break*/, 3];
                    case 2:
                        body['audio']['link'] = url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this._fetchAssistant({
                            url: '/messages',
                            method: 'POST',
                            body: body,
                        })];
                    case 4:
                        response = _b.sent();
                        return [2 /*return*/, {
                                response: response,
                                body: body,
                            }];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendDocument = function (_a) {
        var recipientPhone = _a.recipientPhone, caption = _a.caption, file_path = _a.file_path, url = _a.url;
        return __awaiter(this, void 0, void 0, function () {
            var body, uploadedFile, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (file_path && url) {
                            throw new Error('You can only send a document in your "file_path" or one that is in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        if (!file_path && !url) {
                            throw new Error('You must send a document in your "file_path" or one that is in a publicly available "url". Provide either "file_path" or "url".');
                        }
                        if (!caption) {
                            throw new Error('"caption" is required when sending a document');
                        }
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'document',
                            document: {
                                caption: caption || '',
                            },
                        };
                        if (!file_path) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._uploadMedia({
                                file_path: file_path,
                                file_name: caption,
                            })];
                    case 1:
                        uploadedFile = _b.sent();
                        body['document']['id'] = uploadedFile.media_id;
                        body['document']['filename'] = uploadedFile.file_name || '';
                        return [3 /*break*/, 3];
                    case 2:
                        body['document']['link'] = url;
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this._fetchAssistant({
                            url: '/messages',
                            method: 'POST',
                            body: body,
                        })];
                    case 4:
                        response = _b.sent();
                        return [2 /*return*/, {
                                response: response,
                                body: body,
                            }];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendLocation = function (_a) {
        var recipientPhone = _a.recipientPhone, latitude = _a.latitude, longitude = _a.longitude, name = _a.name, address = _a.address;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        if (!latitude || !longitude) {
                            throw new Error('"latitude" and "longitude" are required in making a request');
                        }
                        if (!name || !address) {
                            throw new Error('"name" and "address" are required in making a request');
                        }
                        body = {
                            messaging_product: 'whatsapp',
                            recipient_type: 'individual',
                            to: recipientPhone,
                            type: 'location',
                            location: {
                                latitude: latitude,
                                longitude: longitude,
                                name: name,
                                address: address,
                            },
                        };
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: body,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendContact = function (_a) {
        var recipientPhone = _a.recipientPhone, contact_profile = _a.contact_profile;
        return __awaiter(this, void 0, void 0, function () {
            var format_address, format_email, format_name, format_org, format_phone, format_url, format_birthday, format_contact, body, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._mustHaveParameter(recipientPhone, 'recipientPhone');
                        format_address = function (address) {
                            var address_obj = {
                                street: address.street || null,
                                city: address.city || null,
                                state: address.state || null,
                                zip: address.zip || null,
                                country: address.country || null,
                                country_code: address.country_code || null,
                                type: address.type || null,
                            };
                            return address_obj;
                        };
                        format_email = function (email) {
                            if (!email || !(email === null || email === void 0 ? void 0 : email.email)) {
                                return {};
                            }
                            var email_obj = {
                                email: email.email || null,
                                type: email.type || null,
                            };
                            return email_obj;
                        };
                        format_name = function (name) {
                            if (!name || !(name === null || name === void 0 ? void 0 : name.first_name) || !(name === null || name === void 0 ? void 0 : name.last_name)) {
                                throw new Error('Provide both "name.first_name" and "name.last_name".');
                            }
                            var name_obj = {
                                formatted_name: name.formatted_name || null,
                                first_name: name.first_name || null,
                                last_name: name.last_name || null,
                                middle_name: name.middle_name || null,
                                suffix: name.suffix || null,
                                prefix: name.prefix || null,
                            };
                            if (!name_obj.formatted_name &&
                                name_obj.first_name &&
                                name_obj.last_name) {
                                name_obj.formatted_name = "".concat(name_obj.first_name, " ").concat(name_obj.last_name);
                            }
                            return name_obj;
                        };
                        format_org = function (org) {
                            if (!org || !(org === null || org === void 0 ? void 0 : org.company)) {
                                return {};
                            }
                            var org_obj = {
                                company: org.company || null,
                                department: org.department || null,
                                title: org.title || null,
                            };
                            return org_obj;
                        };
                        format_phone = function (phone) {
                            if (!phone || !(phone === null || phone === void 0 ? void 0 : phone.phone)) {
                                return {};
                            }
                            var phone_obj = {
                                phone: phone.phone || null,
                                type: phone.type || null,
                                wa_id: phone.wa_id || null,
                            };
                            return phone_obj;
                        };
                        format_url = function (url) {
                            if (!url || !(url === null || url === void 0 ? void 0 : url.url)) {
                                return {};
                            }
                            var url_obj = {
                                url: url.url || null,
                                type: url.type || null,
                            };
                            return url_obj;
                        };
                        format_birthday = function (birthday) {
                            if (!birthday) {
                                return null;
                            }
                            else {
                                //ensure it is a valid date
                                if (!_this.isValidDate(birthday)) {
                                    throw new Error('Provide a valid date in format: "YYYY-MM-DD"');
                                }
                                return birthday;
                            }
                        };
                        format_contact = function (_a) {
                            var addresses = _a.addresses, emails = _a.emails, name = _a.name, org = _a.org, phones = _a.phones, urls = _a.urls, birthday = _a.birthday;
                            var fields = {
                                addresses: [],
                                emails: [],
                                name: {},
                                org: {},
                                phones: [],
                                urls: [],
                                birthday: '',
                            };
                            if (addresses && Array.isArray(addresses) && addresses.length > 0) {
                                fields.addresses = addresses.map(format_address);
                            }
                            if (emails && Array.isArray(emails) && emails.length > 0) {
                                fields.emails = emails.map(format_email);
                            }
                            if (name && typeof name === 'object') {
                                fields.name = format_name(name);
                            }
                            if (org && typeof org === 'object') {
                                fields.org = format_org(org);
                            }
                            if (phones && Array.isArray(phones) && phones.length > 0) {
                                fields.phones = phones.map(format_phone);
                            }
                            if (urls && Array.isArray(urls) && urls.length > 0) {
                                fields.urls = urls.map(format_url);
                            }
                            if (birthday) {
                                fields.birthday = format_birthday(birthday);
                            }
                            return fields;
                        };
                        body = {
                            messaging_product: 'whatsapp',
                            to: recipientPhone,
                            type: 'contacts',
                            contacts: [format_contact(contact_profile)],
                        };
                        return [4 /*yield*/, this._fetchAssistant({
                                url: '/messages',
                                method: 'POST',
                                body: body,
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    WhatsappCloud.prototype.sendSticker = function (_a) {
        var message = _a.message, recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    WhatsappCloud.prototype.getUserProfile = function (_a) {
        var recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    WhatsappCloud.prototype.getUserStatus = function (_a) {
        var recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    WhatsappCloud.prototype.getUserProfilePicture = function (_a) {
        var recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    WhatsappCloud.prototype.getUserStatusPicture = function (_a) {
        var recipientPhone = _a.recipientPhone;
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/];
        }); });
    };
    WhatsappCloud.prototype.isValidDate = function (dateObject) {
        return new Date(dateObject).toString() !== 'Invalid Date';
    };
    WhatsappCloud.prototype.parseMessage = function (requestBody) {
        return (0, msg_parser_1.default)({ requestBody: requestBody, currentWABA_ID: this.WABA_ID });
    };
    return WhatsappCloud;
}());
exports.default = WhatsappCloud;
