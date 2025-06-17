import { ClientProviderOptions, Transport } from '@nestjs/microservices'
import { Configuration } from '@venom/configuration'

export namespace ClientMessage {
    export const Name = Symbol('gateway.client')

    export const Queue = 'gateway_queue'

    export const Host = `amqp://${Configuration.BROKER_URL}`

    export const Options: ClientProviderOptions = {
        name: ClientMessage.Name,
        transport: Transport.RMQ,
        options: {
            urls: [ClientMessage.Host],
            queue: ClientMessage.Queue,
        },
    }
}
