import { applyDecorators } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

export function ControllerRest(name: string) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return applyDecorators(ApiTags(capitalizedName), Controller(name))
}
