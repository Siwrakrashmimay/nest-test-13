import { EncryptService } from '../src/encrypt/encrypt.service';
import * as crypto from 'crypto';

// generate keypair for test (RSA-2048)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{
  modulusLength: 2048,
  publicKeyEncoding: { type:'spki', format:'pem' },
  privateKeyEncoding: { type:'pkcs8', format:'pem' }
});

// patch env for service
process.env.PUBLIC_KEY = publicKey.toString();
process.env.PRIVATE_KEY = privateKey.toString();

describe('EncryptService (simple)', ()=>{
  const svc = new EncryptService();

  it('encrypt -> decrypt', ()=>{
    const msg = 'Hello simple world!';
    const { data1, data2 } = svc.encrypt(msg);
    const plain = svc.decrypt(data1, data2);
    expect(plain).toBe(msg);
  });

  it('handles 2000 chars', ()=>{
    const msg = 'x'.repeat(2000);
    const { data1, data2 } = svc.encrypt(msg);
    const plain = svc.decrypt(data1, data2);
    expect(plain).toBe(msg);
  });
});
