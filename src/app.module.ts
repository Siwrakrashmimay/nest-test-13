import { Module } from '@nestjs/common';
import { EncryptModule } from './encrypt/encrypt.module';
@Module({imports:[EncryptModule]})
export class AppModule{}