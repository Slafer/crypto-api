export namespace AddressContract {
    export const Topic = 'address.contract'

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
