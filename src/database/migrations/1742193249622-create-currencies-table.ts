import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCurrencies1742193249622 implements MigrationInterface {
    name = 'CreateCurrencies1742193249622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "currencies" (
           "id" integer NOT NULL, 
           "name" character varying(255) NOT NULL,
           "symbol" character varying(50) NOT NULL, 
           "group" character varying(255) NOT NULL, 
           "price" numeric(12,2) NOT NULL DEFAULT '0',
           "min" numeric(18,6) NOT NULL DEFAULT '0', 
           "max" numeric(18,6) NOT NULL DEFAULT '0', 
           "active" boolean NOT NULL DEFAULT false,
           "created_at" TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
           CONSTRAINT "UQ_30ed1fd0130c0874227d1817f2c" UNIQUE ("symbol"), 
           CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"),
           CONSTRAINT "FK_d528c54870c4182db13548e01c9" FOREIGN KEY ("group") REFERENCES "groups" ("name") ON DELETE RESTRICT
        )
       `)

        await queryRunner.query(`
            INSERT INTO "currencies" ("id", "symbol", "name", "group") VALUES
            (1000, 'BTC', 'Bitcoin', 'BTC'),
            (2000, 'BCH', 'Bitcoin Cash', 'BCH'),
            (3000,'LTC', 'Litecoin', 'LTC'),
            (4000, 'KAS', 'Kaspa', 'KAS'),
            (5000, 'DOGE', 'Dogecoin', 'DOGE'),
            (6000, 'POL', 'Polygon', 'EVM'),
            (6001, 'P_BUSD', 'Binance-PG BUSD', 'EVM'),
            (6002, 'P_USDC', 'Polygon (USDC)', 'EVM'),
            (6003, 'P_USDCE', 'Polygon (USDC.E)', 'EVM'),
            (6004, 'P_USDT', 'Polygon (USDT)', 'EVM'),
            (7000, 'TON', 'The Open Network', 'TON'),
            (7001, 'TON_USDT', 'TON USDT', 'TON'),
            (8000, 'BNB', 'Binance Smart Chain', 'EVM'),
            (8001, 'B_BUSD', 'Binance-Peg BUSD', 'EVM'),
            (8002, 'B_USDT', 'BNB USDT', 'EVM'),
            (8003, 'B_USDC', 'BNB USDC', 'EVM'),
            (9000, 'SOL', 'Solana', 'SOL'),
            (9001, 'S_USDC', 'Solana (USDC)', 'SOL'),
            (9002, 'S_USDT', 'Solana (USDT)', 'SOL'),
            (9003, 'S_BOM', 'Solana (BOM)', 'SOL'),
            (9004, 'S_MEM_MELANIA', 'Solana MELANIA TRUMP', 'SOL'),
            (9005, 'S_MEM_MEW', 'Solana MEM MEW', 'SOL'),
            (9006,'S_MEM_TRUMP', 'Solana TRUMP', 'SOL'),
            (10000, 'ETH', 'Ethereum', 'EVM'),
            (10001, 'E_BUSD', 'Binance-Peg EBUSD', 'EVM'),
            (10002, 'E_FDUSD', 'First Digital USD ETH', 'EVM'),
            (10003, 'E_RLUSD', 'Ripplie USD Ethereum', 'EVM'),
            (10004, 'E_LINK', 'Chainlink', 'EVM'),
            (10005, 'E_PAX', 'Paxos Standard', 'EVM'),
            (10007, 'E_POL', 'Polygon Token', 'EVM'),
            (10008, 'E_STETH', 'Lido stETH', 'EVM'),
            (10009, 'E_STPOL', 'Lido stPOL', 'EVM'),
            (10010, 'E_USDC', 'USD coin', 'EVM'),
            (10011, 'E_USDT', 'Tether', 'EVM'),
            (10012, 'E_UST', 'Terra USD', 'EVM'),
            (10013, 'E_WBTC', 'Wrapped Bitcoin', 'EVM'),
            (10014, 'E_SHIB', 'Shiba Inu', 'EVM'),
            (10015, 'E_DAI', 'DAI Stablecoin', 'EVM'),
            (11000, 'TRX', 'TRON', 'TVM'),
            (11001, 'T_BUSD', 'Tron BUSD Token', 'TVM'),
            (11002, 'T_TUSD', 'Tron True USDT', 'TVM'),
            (11003, 'T_USDC', 'Tron USDC', 'TVM'),
            (11004, 'T_USDD', 'Tron USDD', 'TVM'),
            (11005, 'T_USDT', 'Tron USDT', 'TVM'),
            (12000, 'XRP', 'Ripple', 'XRPL'),
            (12001, 'XRP_RLUSD', 'Ripple USD', 'XRPL'),
            (13000, 'AVAX', 'Avalanche', 'EVM'),
            (13001, 'A_BUSD', 'Binance-Peg A_BUSD', 'EVM'),
            (13002, 'A_USDC', 'Avalanche USDC', 'EVM'),
            (13003, 'A_USDT', 'Avalanche USDT', 'EVM'),
            (14000, 'ARB_ETH', 'Arbitrum Ethereum', 'EVM'),
            (14001, 'ARB_ARB', 'Arbitrum Token', 'EVM'),
            (14002, 'ARB_USDC', 'Arbitrum USDC', 'EVM'),
            (14003, 'ARB_USDT', 'Arbitrum USDT', 'EVM'),
            (15000, 'OPT_ETH', 'Optimism Ethereum', 'EVM'),
            (15001, 'OPT_OPT', 'Optimism Token', 'EVM'),
            (15002, 'OPT_USDC', 'Optimism USDC', 'EVM'),
            (15003, 'OPT_USDT', 'Optimism USDT', 'EVM'),
            (16000, 'BS_ETH', 'Base Ethereum', 'EVM'),
            (16001, 'BS_CBBTC', 'Base Wrapped Bitcoin', 'EVM'),
            (16002, 'BS_USDC', 'Base USDC', 'EVM'),
            (16003, 'BS_USDT', 'Base USDT', 'EVM'),
            (16004, 'BS_WETH', 'Base Wrapped Ethereum', 'EVM'),
            (17000, 'ZKEVM_POL_ETH', 'ZK EVM Polygon Ethereum', 'EVM'),
            (17001, 'ZKEVM_POL_USDC', 'ZK EVM Polygon USDC', 'EVM'),
            (17002, 'ZKEVM_POL_USDT', 'ZK EVM Polygon USDT', 'EVM');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "currencies"`)
    }
}
