export namespace DumpContract {
    export const Topic = 'payments.dump'

    export interface Payload {
        readonly currency: string
        readonly commission?: number
    }
}
