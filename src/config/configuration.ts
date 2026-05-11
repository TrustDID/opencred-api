/**
 * Central application configuration factory.
 * Loaded once at boot via ConfigModule.forRoot({ load: [configuration] }).
 *
 * Contributor notes
 * -----------------
 * TODO: Add PostgreSQL / TypeORM database block once a contributor picks up
 *       the "feat: configure PostgreSQL + TypeORM" issue.
 * TODO: Expand the `stellar` block with contract addresses after Soroban
 *       contracts are deployed and their addresses are known.
 * TODO: Expand the `ipfs` block with pinning-service credentials once the
 *       IPFS integration issue is picked up.
 * TODO: Add refresh-token fields to the `jwt` block when the auth module is
 *       fully implemented.
 */
export default () => ({
  port: parseInt(process.env.PORT ?? "3000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",

  /**
   * TODO (contributor): Uncomment and wire into TypeOrmModule.forRootAsync()
   * inside app.module.ts once the PostgreSQL issue is resolved.
   *
   * database: {
   *   host:     process.env.DB_HOST,
   *   port:     parseInt(process.env.DB_PORT ?? "5432", 10),
   *   username: process.env.DB_USERNAME,
   *   password: process.env.DB_PASSWORD,
   *   name:     process.env.DB_NAME,
   *   ssl:      process.env.DB_SSL === "true",
   * },
   */

  stellar: {
    network: process.env.STELLAR_NETWORK ?? "testnet",
    sorobanRpcUrl:
      process.env.SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org",
    // TODO: credentialContractId: process.env.CREDENTIAL_CONTRACT_ID,
    // TODO: verificationContractId: process.env.VERIFICATION_CONTRACT_ID,
  },

  ipfs: {
    gatewayUrl: process.env.IPFS_GATEWAY_URL ?? "https://ipfs.io/ipfs",
    // TODO: apiUrl:   process.env.IPFS_API_URL,
    // TODO: apiKey:   process.env.IPFS_API_KEY,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
    // TODO: refreshSecret:    process.env.JWT_REFRESH_SECRET,
    // TODO: refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
  },
});
