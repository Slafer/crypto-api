import { PaymentController } from '@venom/modules/payments/controllers/payment.controller'
import { AddressController } from '@venom/modules/payments/controllers/address.controller'
import { BalanceController } from '@venom/modules/payments/controllers/balance.controller'
import { ParserController } from '@venom/modules/payments/controllers/parser.controller'

import { AdminTransactionsController } from '@venom/modules/payments/controllers/admin-transactions.controller'
import { AdminBlockchainController } from '@venom/modules/payments/controllers/admin/admin-blockchain.controller'
import { AdminConfigController } from '@venom/modules/payments/controllers/admin/admin-config.controller'
import { DumpController } from '@venom/modules/payments/controllers/dump.controller'

export const controllers = [
    PaymentController,
    AddressController,
    ParserController,
    BalanceController,
    AdminTransactionsController,
    AdminBlockchainController,
    AdminConfigController,
    DumpController,
]
