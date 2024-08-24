export interface ServerConfig {
  /**
   * Host on which the NATS server will listen
   * (default: "0.0.0.0")
   */
  host?: string;

  /**
   * Port on which the NATS server will listen
   * (default: 4222)
   */
  port?: number;

  /**
   * HTTP port for monitoring dashboard
   * (exclusive of --https_port)
   */
  httpPort?: number;

  /**
   * HTTPS port for monitoring dashboard
   * (exclusive of --httpx_port)
   */
  httpsPort?: number;

  /**
   * Server name
   */
  name?: string;

  /**
   * File to write the server's PID
   */
  pidFile?: string;

  /**
   * Path to configuration file
   */
  config?: string;

  // Logging

  /**
   * File to redirect log output
   */
  logFile?: string;

  /**
   * Disable logging
   */
  noLog?: boolean;

  /**
   * Enable debug mode
   */
  debug?: boolean;

  /**
   * Log to syslog or windows event log
   */
  syslog?: boolean;

  // Jetstream

  /**
   * Enable JetStream functionality
   */
  jetstream?: boolean;

  /**
   * Set the storage directory
   */
  storeDir?: string;
}
