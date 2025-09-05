"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let EncryptService = class EncryptService {
    loadKey(file) {
        const p = path.join(process.cwd(), 'keys', file);
        if (fs.existsSync(p))
            return fs.readFileSync(p, 'utf8');
        return undefined;
    }
    get publicKey() {
        return process.env.PUBLIC_KEY || this.loadKey('public.pem') || '';
    }
    get privateKey() {
        return process.env.PRIVATE_KEY || this.loadKey('private.pem') || '';
    }
    encrypt(payload) {
        const aesKey = crypto.randomBytes(32);
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
        const ct = Buffer.concat([cipher.update(Buffer.from(payload, 'utf8')), cipher.final()]);
        const tag = cipher.getAuthTag();
        const data2 = Buffer.concat([iv, ct, tag]).toString('base64');
        const data1 = crypto.privateEncrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, aesKey).toString('base64');
        return { data1, data2 };
    }
    decrypt(data1, data2) {
        const aesKey = crypto.publicDecrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(data1, 'base64'));
        const packed = Buffer.from(data2, 'base64');
        const iv = packed.subarray(0, 12);
        const tag = packed.subarray(packed.length - 16);
        const ct = packed.subarray(12, packed.length - 16);
        const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
        decipher.setAuthTag(tag);
        const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
        return plain.toString('utf8');
    }
};
exports.EncryptService = EncryptService;
exports.EncryptService = EncryptService = __decorate([
    (0, common_1.Injectable)()
], EncryptService);
//# sourceMappingURL=encrypt.service.js.map