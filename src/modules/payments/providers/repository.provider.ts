import { Provider } from '@nestjs/common'
import { WithdrawalRepository } from '@venom/modules/payments/repositories/withdrawal.repository'
import { AddressesRepository } from '@venom/modules/payments/repositories/addresses.repository'
import { CurrencyRepository } from '@venom/modules/payments/repositories/currency.repository'
import { SegmentRepository } from '@venom/modules/payments/repositories/segment.repository'

export const repositories: Provider[] = [WithdrawalRepository, AddressesRepository, CurrencyRepository, SegmentRepository]
