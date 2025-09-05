import { EncryptService } from './encrypt.service';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';
export declare class EncryptController {
    private readonly svc;
    constructor(svc: EncryptService);
    getEncrypt(dto: EncryptDto): {
        successful: boolean;
        error_code: any;
        data: {
            data1: string;
            data2: string;
        };
    };
    getDecrypt(dto: DecryptDto): {
        successful: boolean;
        error_code: any;
        data: {
            payload: string;
        };
    };
}
