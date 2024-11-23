import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GeneralResponseDto<T> {
  @ApiProperty({ required: true, readOnly: true })
  @IsEnum(HttpStatus)
  status: HttpStatus;

  @ApiProperty({ required: false, readOnly: true })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ required: false, readOnly: true })
  @IsOptional()
  data?: T;

  constructor(status: HttpStatus, message?: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
