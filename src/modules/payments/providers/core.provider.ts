import { Provider } from '@nestjs/common'

import { AddressService } from '@venom/modules/payments/services/address.service'
import { BalanceService } from '@venom/modules/payments/services/balance.service'
import { CurrencyService } from '@venom/modules/payments/services/currency.service'
import { SegmentService } from '@venom/modules/payments/services/segment.service'
import { WithdrawalService } from '@venom/modules/payments/services/withdrawal.service'
import { ParserService } from '@venom/modules/payments/services/parser.service'

export const services: Provider[] = [AddressService, WithdrawalService, CurrencyService, BalanceService, SegmentService, ParserService]
