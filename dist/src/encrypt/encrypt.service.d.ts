export declare class EncryptService {
    private loadKey;
    private get publicKey();
    private get privateKey();
    encrypt(payload: string): {
        data1: string;
        data2: string;
    };
    decrypt(data1: string, data2: string): string;
}
