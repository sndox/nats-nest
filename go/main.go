package main

import (
	"time"

	"github.com/alexflint/go-arg"
	"github.com/nats-io/nats-server/v2/server"
)

// https://docs.nats.io/running-a-nats-service/introduction/flags
type Args struct {
	Host string `arg:"-h,--host,env:NATS_NEST_HOST" default:"127.0.0.1" help:"Host on which the NATS server will listen"`
	Port int    `arg:"-p,--port,env:NATS_NEST_PORT" default:"4222" help:"Port on which the NATS server will listen"`

	HTTPPort     int    `arg:"-m,--http-port,env:NATS_NEST_HTTP_PORT" help:"HTTP port for monitoring dashboard (exclusive of --https_port)"`
	HTTPSPort    int    `arg:"--https-port,env:NATS_NEST_HTTPS_PORT" help:"HTTPS port for monitoring dashboard (exclusive of --httpx_port)"`
	HTTPBasePath string `arg:"--http-base-path" help:"Base path for HTTP monitoring endpoints"`

	Name    string `arg:"-n,--name,env:NATS_NEST_NAME" help:"Server name"`
	PidFile string `arg:"-P,--pid,env:NATS_NEST_PID" help:"File to write the server's PID"`
	// Logging
	LogFile string `arg:"-l,--log" help:"File to redirect log output"`
	NoLog   bool   `arg:"--no-log,env:NATS_NEST_NO_LOG" help:"Disable logging"`
	Debug   bool   `arg:"-D,--debug,env:NATS_NEST_DEBUG" help:"Enable debug mode"`
	Syslog  bool   `arg:"-s,--syslog" help:"Log to syslog or windows event log"`

	// Jetstream

	StoreDir string `arg:"--store-dir" help:"Set the storage directory"`

	DontListen   bool          `arg:"--dont-listen" help:"Do not listen for incoming connections"`
	MaxConn      int           `arg:"--max-connections" help:"Maximum number of connections"`
	MaxSubs      int           `arg:"--max-subscriptions" help:"Maximum number of subscriptions"`
	PingInterval time.Duration `arg:"--ping-interval" help:"Interval for sending ping messages"`
	MaxPingsOut  int           `arg:"--ping-max" help:"Maximum number of unanswered ping messages before disconnect"`

	AuthTimeout    float64 `arg:"--auth-timeout" help:"Authentication timeout in seconds"`
	MaxControlLine int32   `arg:"--max-control-line" help:"Maximum length of control line"`
	MaxPayload     int32   `arg:"--max-payload" help:"Maximum payload size"`
	MaxPending     int64   `arg:"--max-pending" help:"Maximum number of pending messages"`

	JetStream                 bool          `arg:"--jet-stream" help:"Enable JetStream functionality"`
	JetStreamUniqueTag        string        `arg:"--jet-stream-unique-tag" help:"Unique tag for JetStream"`
	JetStreamMaxCatchup       int64         `arg:"--jet-stream-max-catchup" help:"Maximum catchup duration for JetStream"`
	JetStreamMaxStore         int64         `arg:"--jet-stream-max-store" help:"Maximum storage for JetStream storage (in bytes)"`
	JetStreamMaxMemory        int64         `arg:"--jet-stream-max-memory" help:"Maximum memory for JetStream memory (in bytes)"`
	JetStreamDomain           string        `arg:"--jet-stream-domain"`
	JetStreamKey              string        `arg:"--jet-stream-key"`
	JetStreamOldKey           string        `arg:"--jet-stream-old-key"`
	TLSTimeout                float64       `arg:"--tls-timeout" help:"TLS handshake timeout in seconds"`
	TLSHandshakeFirst         bool          `arg:"--tls-handshake-first" help:"Perform TLS handshake before sending the INFO protocol"`
	TLSHandshakeFirstFallback time.Duration `arg:"--tls-handshake-first-fallback" help:"Timeout for TLS handshake fallback in case of mixed client compatibility"`
	AllowNonTLS               bool          `arg:"--allow-non-tls" help:"Allow non-TLS connections"`

	WriteDeadline    time.Duration `arg:"--write-deadline" help:"Write deadline duration"`
	MaxClosedClients int           `arg:"--max-closed-clients" help:"Maximum number of closed clients to track"`

	LameDuckDuration    time.Duration `arg:"--lame-duck-duration" help:"Duration for graceful shutdown during lame duck mode"`
	LameDuckGracePeriod time.Duration `arg:"--lame-duck-grace-period" help:"Grace period for lame duck mode"`
	MaxTracedMsgLen     int           `arg:"--max-traced-msg-len" help:"Maximum printable length for traced messages"`
	AlwaysEnableNonce   bool          `arg:"--always-enable-nonce" help:"Always present a nonce to new connections"`
	// CheckConfig            bool          `arg:"--check-config" help:"Check configuration file syntax and exit"`
	DisableJetStreamBanner bool `arg:"--disable-jet-stream-banner" help:"Disable JetStream startup banner"`
	ConnectErrorReports    int  `arg:"--connect-error-reports" help:"Number of failed connection attempts before reporting an error"`
	ReconnectErrorReports  int  `arg:"--reconnect-error-reports" help:"Number of failed reconnection attempts before reporting an error"`

	WebsocketHost             string `arg:"--websocket-host" default:"127.0.0.1"`
	WebsocketPort             int    `arg:"--websocket-port"`
	WebsocketNoTLS            bool   `arg:"--websocket-no-tls" help:"set NoTLS to true to allow the server to start without TLS configuration."`
	WebsocketCompression      bool   `arg:"--websocket-compression" help:"If set to true, the server will negotiate with clients if compression can be used. If this is false, no compression will be used (both in server and clients) since it has to be negotiated between both endpoints"`
	WebsocketHandshakeTimeout int64  `arg:"--websocket-handshake-timeout" help:"Total time allowed for the server to read the client request and write the response back to the client. This include the time needed for the TLS Handshake."`
}

func (args Args) Version() string {
	return server.VERSION
}

func main() {
	var args Args
	arg.MustParse(&args)

	opts := &server.Options{
		ServerName:                args.Name,
		Host:                      args.Host,
		Port:                      args.Port,
		HTTPPort:                  args.HTTPPort,
		HTTPSPort:                 args.HTTPSPort,
		HTTPBasePath:              args.HTTPBasePath,
		PidFile:                   args.PidFile,
		LogFile:                   args.LogFile,
		NoLog:                     args.NoLog,
		Debug:                     args.Debug,
		Syslog:                    args.Syslog,
		JetStream:                 args.JetStream,
		StoreDir:                  args.StoreDir,
		DontListen:                args.DontListen,
		MaxConn:                   args.MaxConn,
		MaxSubs:                   args.MaxSubs,
		PingInterval:              args.PingInterval,
		MaxPingsOut:               args.MaxPingsOut,
		AuthTimeout:               args.AuthTimeout,
		MaxControlLine:            args.MaxControlLine,
		MaxPayload:                args.MaxPayload,
		MaxPending:                args.MaxPending,
		JetStreamMaxStore:         args.JetStreamMaxStore,
		JetStreamMaxMemory:        args.JetStreamMaxMemory,
		JetStreamDomain:           args.JetStreamDomain,
		JetStreamKey:              args.JetStreamKey,
		JetStreamOldKey:           args.JetStreamOldKey,
		JetStreamUniqueTag:        args.JetStreamUniqueTag,
		JetStreamMaxCatchup:       args.JetStreamMaxCatchup,
		TLSTimeout:                args.TLSTimeout,
		TLSHandshakeFirst:         args.TLSHandshakeFirst,
		TLSHandshakeFirstFallback: args.TLSHandshakeFirstFallback,
		AllowNonTLS:               args.AllowNonTLS,
		WriteDeadline:             args.WriteDeadline,
		MaxClosedClients:          args.MaxClosedClients,
		LameDuckDuration:          args.LameDuckDuration,
		LameDuckGracePeriod:       args.LameDuckGracePeriod,
		MaxTracedMsgLen:           args.MaxTracedMsgLen,
		AlwaysEnableNonce:         args.AlwaysEnableNonce,
		DisableJetStreamBanner:    args.DisableJetStreamBanner,
		ConnectErrorReports:       args.ConnectErrorReports,
		ReconnectErrorReports:     args.ReconnectErrorReports,
		Websocket: server.WebsocketOpts{
			Port:             args.WebsocketPort,
			Host:             args.WebsocketHost,
			NoTLS:            args.WebsocketNoTLS,
			Compression:      args.WebsocketCompression,
			HandshakeTimeout: time.Duration(args.WebsocketHandshakeTimeout),
		},
	}

	s, err := server.NewServer(opts)
	if err != nil {
		panic(err)
	}

	s.ConfigureLogger()

	s.Start()

	s.WaitForShutdown()
}
