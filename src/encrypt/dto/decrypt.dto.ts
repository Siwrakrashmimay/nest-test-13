import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DecryptDto {
  @ApiProperty()
  @IsString()
  data1!: string;

  @ApiProperty()
  @IsString()
  data2!: string;
}
