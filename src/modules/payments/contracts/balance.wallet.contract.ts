import { Big } from 'big.js'

export namespace BalanceWalletContract {
    export const Topic = `balance.wallet`

    export interface Payload {
        readonly balance: Big
        readonly segment: string
    }
}
