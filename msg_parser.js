"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var messageParser = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var requestBody = _a.requestBody, currentWABA_ID = _a.currentWABA_ID;
    if (!requestBody) {
        throw new Error('"requestBody" is required');
    }
    if (!currentWABA_ID) {
        throw new Error('currentWABA_ID is required. This is the business ID that you have configured in your WABA account.');
    }
    var WABA_ID = ((_c = (_b = requestBody.entry) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id) || ''; // extract the business ID from the webhook payload
    if (WABA_ID === '0') {
        console.warn({
            message: "WABA_ID is 0. You seem to be testing with Meta test subscription. This is not really a valid WABA_ID. I recommend you to send an actual message from an actual whatsapp customer's number.",
        });
    }
    if (!WABA_ID || WABA_ID !== currentWABA_ID) {
        throw new Error('WABA_ID is not valid. Hint: the message is not intended for this Whatsapp Business Account.');
    }
    // first check if the message is a whatsapp message
    if (!requestBody.object ||
        requestBody.object !== 'whatsapp_business_account') {
        throw new Error('requestBody is not a valid whatsapp message. Hint: check the "object" property');
    }
    if (!requestBody.entry || !((_d = requestBody.entry) === null || _d === void 0 ? void 0 : _d.length)) {
        throw new Error('requestBody is not a valid whatsapp message. Hint: check the "entry" property');
    }
    if (!((_e = requestBody.entry[0].changes) === null || _e === void 0 ? void 0 : _e.length) ||
        requestBody.entry[0].changes[0].field !== 'messages') {
        throw new Error('requestBody is not a valid whatsapp message. Hint: check the "changes" property');
    }
    var metadata = (_f = requestBody.entry[0].changes[0].value) === null || _f === void 0 ? void 0 : _f.metadata;
    var contacts = ((_h = (_g = requestBody.entry[0].changes[0].value) === null || _g === void 0 ? void 0 : _g.contacts) === null || _h === void 0 ? void 0 : _h.length)
        ? requestBody.entry[0].changes[0].value.contacts[0]
        : null;
    // Messages vs Notifications
    var message = ((_k = (_j = requestBody.entry[0].changes[0].value) === null || _j === void 0 ? void 0 : _j.messages) === null || _k === void 0 ? void 0 : _k.length)
        ? requestBody.entry[0].changes[0].value.messages[0]
        : null;
    var notificationMessage = ((_m = (_l = requestBody.entry[0].changes[0].value) === null || _l === void 0 ? void 0 : _l.statuses) === null || _m === void 0 ? void 0 : _m.length)
        ? requestBody.entry[0].changes[0].value.statuses[0]
        : null;
    var output = {
        metadata: metadata,
        contacts: contacts,
        WABA_ID: WABA_ID,
    };
    if (notificationMessage) {
        output.isNotificationMessage = true;
        output.isMessage = false;
        output.notificationType = notificationMessage.status;
        output.notificationMessage = {
            from: {
                name: null, // name is not available for notifications, it is only available for messages
                phone: notificationMessage.recipient_id || '',
            },
            errors: undefined,
        };
    }
    else if (message) {
        output.isNotificationMessage = false;
        output.isMessage = true;
        var msgType = void 0;
        if (message.type === 'text' && message.referral) {
            msgType = 'ad_message';
        }
        else if (message.type === 'text') {
            msgType = 'text_message';
        }
        else if (message.type === 'sticker') {
            msgType = 'sticker_message';
        }
        else if (message.type === 'image') {
            msgType = 'media_message';
        }
        else if (message.location) {
            msgType = 'location_message';
        }
        else if (message.contacts) {
            msgType = 'contact_message';
        }
        else if (message.type === 'button') {
            msgType = 'quick_reply_message';
        }
        else if (message.type === 'interactive') {
            if (((_o = message.interactive) === null || _o === void 0 ? void 0 : _o.type) === 'list_reply') {
                msgType = 'radio_button_message';
                message.list_reply = message.interactive.list_reply;
            }
            else if (((_p = message.interactive) === null || _p === void 0 ? void 0 : _p.type) === 'button_reply') {
                msgType = 'simple_button_message';
                message.button_reply = message.interactive.button_reply;
            }
            else {
                msgType = 'unknown_message';
            }
        }
        else if (message.type === 'unsupported') {
            msgType = 'unknown_message';
            if ((_q = message.errors) === null || _q === void 0 ? void 0 : _q.length) {
                console.log({ Q: message.errors });
                output.isNotificationMessage = true;
                output.isMessage = false;
                notificationMessage = {
                    errors: message.errors,
                };
            }
        }
        else {
            msgType = 'unknown_message';
        }
        message.type = msgType;
        message.from = {
            name: ((_r = contacts === null || contacts === void 0 ? void 0 : contacts.profile) === null || _r === void 0 ? void 0 : _r.name) || null,
            phone: (message === null || message === void 0 ? void 0 : message.from) || '',
        };
        if (output.isMessage) {
            var thread = null;
            if (message.context) {
                thread = {
                    from: {
                        name: null,
                        phone: ((_s = message.context) === null || _s === void 0 ? void 0 : _s.from) || '',
                        message_id: ((_t = message.context) === null || _t === void 0 ? void 0 : _t.id) || '',
                    },
                };
            }
            output.message = __assign(__assign({}, message), { thread: thread, message_id: message.id || null });
            if (output.message) {
                delete output.message.id; // keep the data light
            }
            delete output.message.context; // keep the data light
        }
    }
    else {
        console.warn('An unidentified message type was received.');
    }
    return output;
};
exports.default = messageParser;
