import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CurrencyService } from '@venom/modules/payments/services/currency.service'

@Injectable()
export class CurrencyGuard implements CanActivate {
    constructor(private readonly service: CurrencyService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const payload = request.body?.currency
                ? Array.isArray(request.body.payload)
                    ? request.body.payload.map(p => p.currency)
                    : [request.body.currency]
                : [request.query.currency]

            if (!Array.isArray(payload) || !payload.length) {
                throw new BadRequestException('Currencies required.')
            }

            const symbols: string[] = [...new Set(payload)]
            const currencies = await this.service.getCurrencies({ currencies: symbols })

            if (currencies.length !== symbols.length) {
                throw new BadRequestException(`Currency with symbol ${symbols.filter(c => !currencies.map(с => с.symbol).includes(c)).join(', ')} not found.`)
            }

            if (request.body) {
                request.body.currencies = currencies
            }
            return true
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }
}
