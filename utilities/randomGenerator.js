"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomDigits = exports.generateGUID = void 0;
const generateGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
        return uuid.toString(16);
    });
};
exports.generateGUID = generateGUID;
const generateRandomDigits = () => {
    return Math.floor(Math.random() * 900000) + 100000;
};
exports.generateRandomDigits = generateRandomDigits;
//# sourceMappingURL=randomGenerator.js.map