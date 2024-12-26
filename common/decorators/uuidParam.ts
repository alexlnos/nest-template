import { Param, ParseUUIDPipe } from '@nestjs/common'

export function UUIDParam(paramName: string = 'uuid') {
    return Param(paramName, new ParseUUIDPipe())
}
