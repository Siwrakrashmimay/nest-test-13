"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt_service_1 = require("../src/encrypt/encrypt.service");
const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
process.env.PUBLIC_KEY = publicKey.toString();
process.env.PRIVATE_KEY = privateKey.toString();
describe('EncryptService (simple)', () => {
    const svc = new encrypt_service_1.EncryptService();
    it('encrypt -> decrypt', () => {
        const msg = 'Hello simple world!';
        const { data1, data2 } = svc.encrypt(msg);
        const plain = svc.decrypt(data1, data2);
        expect(plain).toBe(msg);
    });
    it('handles 2000 chars', () => {
        const msg = 'x'.repeat(2000);
        const { data1, data2 } = svc.encrypt(msg);
        const plain = svc.decrypt(data1, data2);
        expect(plain).toBe(msg);
    });
});
//# sourceMappingURL=encrypt.service.spec.js.map