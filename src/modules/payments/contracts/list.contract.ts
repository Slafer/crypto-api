export namespace ListContract {
    export const Topic = 'payments.list'

    export interface Payload {
        readonly currency: string
    }
}
