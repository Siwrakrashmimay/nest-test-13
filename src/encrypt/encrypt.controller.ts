import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncryptService } from './encrypt.service';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';

@ApiTags('encrypt')
@Controller()
export class EncryptController {
  constructor(private readonly svc: EncryptService){}

  @Post('get-encrypt-data')
  getEncrypt(@Body() dto: EncryptDto){
    const { data1, data2 } = this.svc.encrypt(dto.payload);
    return { successful: true, error_code: null, data: { data1, data2 } };
  }

  @Post('get-decrypt-data')
  getDecrypt(@Body() dto: DecryptDto){
    const payload = this.svc.decrypt(dto.data1, dto.data2);
    return { successful: true, error_code: null, data: { payload } };
  }
}
