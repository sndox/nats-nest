export interface ServerOptions {
  /**
   * Server name
   */
  serverName?: string

  /**
   * Host on which the NATS server will listen
   * (default?: "0.0.0.0")
   */
  host?: string

  /**
   * Port on which the NATS server will listen
   * (default?: 4222)
   */
  port?: number

  /**
   * Whether the server should not listen for incoming connections
   */
  dontListen?: boolean

  /**
   * Interval for sending ping messages (in milliseconds)
   */
  pingInterval?: number

  /**
   * Maximum number of unanswered ping messages before disconnect
   */
  maxPingsOut?: number

  /**
   * HTTP monitoring server host
   */
  httpHost?: string

  /**
   * HTTP port for monitoring dashboard
   * (exclusive of --https_port)
   */
  httpPort?: number

  /**
   * Base path for HTTP monitoring endpoints
   */
  httpBasePath?: string

  /**
   * HTTPS port for monitoring dashboard
   * (exclusive of --httpx_port)
   */
  httpsPort?: number

  /**
   * Authentication timeout (in seconds)
   */
  authTimeout?: number

  /**
   * Maximum length of control line
   */
  maxControlLine?: number

  /**
   * Maximum payload size
   */
  maxPayload?: number

  /**
   * Maximum number of pending messages
   */
  maxPending?: number

  /**
   * Whether JetStream is enabled
   */
  jetStream?: boolean

  /**
   * Maximum memory allocated to JetStream (in bytes)
   */
  jetStreamMaxMemory?: number

  /**
   * Maximum storage allocated to JetStream (in bytes)
   */
  jetStreamMaxStore?: number

  /**
   * Unique tag for JetStream
   */
  jetStreamUniqueTag?: string

  /**
   * Store directory path
   */
  storeDir?: string

  /**
   * TLS handshake timeout (in seconds)
   */
  tlsTimeout?: number

  /**
   * Whether TLS is enabled
   */
  tls?: boolean

  /**
   * Whether TLS verification is enabled
   */
  tlsVerify?: boolean

  /**
   * Whether TLS mapping is enabled
   */
  tlsMap?: boolean

  /**
   * Whether TLS handshake is performed before sending the INFO protocol
   */
  tlsHandshakeFirst?: boolean

  /**
   * Time to wait for TLS handshake to start before falling back to previous behavior (in milliseconds)
   */
  tlsHandshakeFirstFallback?: number

  /**
   * Whether non-TLS connections are allowed
   */
  allowNonTLS?: boolean

  /**
   * Write deadline duration (in milliseconds)
   */
  writeDeadline?: number

  /**
   * Maximum number of closed clients to track
   */
  maxClosedClients?: number

  /**
   * Duration for graceful shutdown during lame duck mode (in milliseconds)
   */
  lameDuckDuration?: number

  /**
   * Grace period for lame duck mode (in milliseconds)
   */
  lameDuckGracePeriod?: number

  /**
   * Maximum printable length for traced messages
   */
  maxTracedMsgLen?: number

  /**
   * Whether to always present a nonce to new connections
   */
  alwaysEnableNonce?: boolean

  /**
   * Whether to disable the JetStream startup banner
   */
  disableJetStreamBanner?: boolean

  /**
   * Number of failed connection attempts before reporting an error
   */
  connectErrorReports?: number

  /**
   * Number of failed reconnection attempts before reporting an error
   */
  reconnectErrorReports?: number

  /**
   * File to redirect log output
   */
  logFile?: string

  /**
   * Disable logging
   */
  noLog?: boolean

  /**
   * Enable debug mode
   */
  debug?: boolean

  /**
   * File to write the server's PID
   */
  pidFile?: string

  /**
   * Path to configuration file
   */
  config?: string
}
