import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({required  : false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiProperty({required  : false})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
}

export class PaginationMetaDto {
    readonly page: number;
    readonly limit: number;
    readonly totalPages: number;
    readonly totalCount: number;

    constructor(page: number, limit: number, totalCount: number) {
        this.page = page;
        this.limit = limit;
        this.totalCount = totalCount;
        this.totalPages = Math.ceil(totalCount / limit);
    }
}

export class PaginationResponseDto<T> {
    readonly data: T[];
    readonly meta: PaginationMetaDto;

    constructor(data: T[], meta: PaginationMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
