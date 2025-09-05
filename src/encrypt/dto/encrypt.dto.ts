import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class EncryptDto {
  @ApiProperty({ minLength: 0, maxLength: 2000 })
  @IsString()
  @Length(0, 2000)
  payload!: string;
}
