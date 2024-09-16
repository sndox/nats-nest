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
   * The server will accept websocket client connections on this hostname/IP.
   * @default 127.0.0.1
   */
  websocketHost?: string
  /**
   * The server will accept websocket client connections on this port.
   */
  websocketPort?: number
  /**
   * By default the server will enforce the use of TLS. If no TLS configuration is provided, you need to explicitly set NoTLS to true to allow the server to start without TLS configuration.
   * Note that if a TLS configuration is present, this boolean is ignored and the server will run the Websocket server with that TLS configuration.
   * Running without TLS is less secure since Websocket clients that use bearer tokens will send them in clear. So this should not be used in production.
   * @default false
   */
  websocketNoTLS?: boolean
  /**
   * If set to true, the server will negotiate with clients if compression can be used.
   * If this is false, no compression will be used (both in server and clients) since it has to be negotiated between both endpoints
   */
  websocketCompression?: boolean
  /**
   * Total time allowed for the server to read the client request and write the response back to the client.
   * This include the time needed for the TLS Handshake.
   */
  websocketHandshakeTimeout?: number
}

export interface ServerInfo {
  server_id: string
  server_name: string
  version: string
  proto: number
  git_commit: string
  go: string
  host: string
  port: number
  max_connections: number
  ping_interval: number
  ping_max: number
  http_host: string
  http_port: number
  http_base_path: string
  https_port: number
  auth_timeout: number
  max_control_line: number
  max_payload: number
  max_pending: number
  cluster: Cluster
  gateway: Gateway
  leaf: Leaf
  mqtt: Mqtt
  websocket: Websocket
  jetstream: Jetstream
  tls_timeout: number
  write_deadline: number
  start: string
  now: string
  uptime: string
  mem: number
  cores: number
  gomaxprocs: number
  cpu: number
  connections: number
  total_connections: number
  routes: number
  remotes: number
  leafnodes: number
  in_msgs: number
  out_msgs: number
  in_bytes: number
  out_bytes: number
  slow_consumers: number
  subscriptions: number
  http_req_stats: HttpReqStats
  config_load_time: string
  system_account: string
  slow_consumer_stats: SlowConsumerStats
}

export interface Cluster {}

export interface Gateway {}

export interface Leaf {}

export interface Mqtt {}

export interface Websocket {}

export interface Jetstream {}

export interface HttpReqStats {
  '/': number
  '/connz': number
  '/gatewayz': number
  '/routez': number
  '/subsz': number
  '/varz': number
}

export interface SlowConsumerStats {
  clients: number
  routes: number
  gateways: number
  leafs: number
}
