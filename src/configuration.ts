import * as process from 'process'

export namespace Configuration {
    export const NAME = process.env.APP_NAME
    export const TIMEZONE = process.env.APP_TIMEZONE || 'UTC'

    export const PORT = Number(process.env.PORT)
    export const BROKER_URL = `${process.env.BROKER_USER}:${encodeURIComponent(process.env.BROKER_PASSWORD!)}@${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`
    export const DATABASE_URL = `postgres://${process.env.DATABASE_USER}:${encodeURIComponent(process.env.DATABASE_PASSWORD!)}@${process.env.DATABASE_HOST}:${Number(process.env.DATABASE_PORT)}/${process.env.DATABASE_NAME}`
}
