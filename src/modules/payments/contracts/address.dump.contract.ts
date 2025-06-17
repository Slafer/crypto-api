export namespace AddressDumpContract {
    export const Topic = 'address.dump.contract'

    export interface Payload {
        readonly foreignId: string
        readonly segment: string
        readonly currency: string
        readonly address: string
        readonly fingerprint: string
        readonly group: string
        readonly path: string
    }

    export interface Response {
        readonly foreignId: string
        readonly segment: string
        readonly currency: string
        readonly address: string
    }
}
