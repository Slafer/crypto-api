export namespace ParsingContract {
    export const Topic = 'payments.parsing.contract'

    export interface Payload {
        readonly blocks: number[]
        readonly currency: string
    }
}
