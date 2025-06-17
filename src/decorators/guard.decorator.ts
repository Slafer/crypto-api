import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsInt, IsUUID, IsOptional, IsPositive, IsArray } from 'class-validator'

interface Options<T = unknown> {
    readonly description?: string
    readonly maxLength?: number
    readonly required?: boolean
    readonly default?: T
    readonly example?: T
    readonly enum?: object
}

export function String(options?: Options): ReturnType<typeof applyDecorators> {
    const decorators = [IsString(), IsNotEmpty(), ApiProperty({ type: 'string', ...options })]

    return applyDecorators(...decorators)
}

export function OptionalString(options?: Options): ReturnType<typeof applyDecorators> {
    const decorators = [IsString(), IsOptional(), ApiPropertyOptional({ type: 'string', ...options })]

    return applyDecorators(...decorators)
}

export function Int(options?: Options): ReturnType<typeof applyDecorators> {
    const decorators = [IsInt(), IsPositive(), IsNotEmpty(), ApiProperty({ type: 'integer', ...options })]

    return applyDecorators(...decorators)
}

export function OptionalInt(options?: Options): ReturnType<typeof applyDecorators> {
    const decorators = [IsInt(), IsPositive(), IsOptional(), ApiPropertyOptional({ type: 'integer', ...options })]

    return applyDecorators(...decorators)
}

export function Number(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsNumber(), IsNotEmpty(), ApiProperty({ type: 'number', ...options }))
}

export function NumberArray(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsArray(), IsNumber({}, { each: true }), IsNotEmpty(), ApiProperty({ type: 'array', items: { type: 'number' }, ...options }))
}

export function OptionalNumber(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsNumber(), ApiPropertyOptional({ type: 'number', ...options }))
}

export function Boolean(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsBoolean(), IsNotEmpty(), ApiProperty({ type: 'boolean', ...options }))
}

export function OptionalBoolean(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsBoolean(), IsOptional(), ApiPropertyOptional({ type: 'boolean', ...options }))
}

export function Uuid(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsUUID(), IsNotEmpty(), ApiProperty({ type: 'string', format: 'uuid', example: '321f93e1-fe41-4b5a-8064-ad5b76926681', ...options }))
}

export function OptionalUuid(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsUUID(), IsOptional(), ApiPropertyOptional({ type: 'string', format: 'uuid', example: '321f93e1-fe41-4b5a-8064-ad5b76926681', ...options }))
}

export function StringArray(options?: Options): ReturnType<typeof applyDecorators> {
    return applyDecorators(IsArray(), IsString({ each: true }), IsNotEmpty(), ApiProperty({ type: 'array', items: { type: 'string' }, ...options }))
}
