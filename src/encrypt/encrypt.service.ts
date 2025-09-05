import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class EncryptService {
  private loadKey(file: string): string | undefined {
    const p = path.join(process.cwd(), 'keys', file);
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
    return undefined;
  }
  private get publicKey(): string {
    return process.env.PUBLIC_KEY || this.loadKey('public.pem') || '';
  }
  private get privateKey(): string {
    return process.env.PRIVATE_KEY || this.loadKey('private.pem') || '';
  }

  encrypt(payload: string) {
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, iv);
    const ct = Buffer.concat([cipher.update(Buffer.from(payload,'utf8')), cipher.final()]);
    const tag = cipher.getAuthTag();
    const data2 = Buffer.concat([iv, ct, tag]).toString('base64');

    const data1 = crypto.privateEncrypt(
      { key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      aesKey
    ).toString('base64');

    return { data1, data2 };
  }

  decrypt(data1: string, data2: string): string {
    const aesKey = crypto.publicDecrypt(
      { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      Buffer.from(data1,'base64')
    );
    const packed = Buffer.from(data2,'base64');
    const iv = packed.subarray(0,12);
    const tag = packed.subarray(packed.length-16);
    const ct = packed.subarray(12, packed.length-16);
    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
    return plain.toString('utf8');
  }
}
