package main

import (
	"github.com/alexflint/go-arg"
	"github.com/dnlsandiego/nats-nest/go/internal/logger"
	"github.com/nats-io/nats-server/v2/server"
)

type Args struct {
	Host string `arg:"-h,--host,env:HOST" default:"0.0.0.0" help:"Host on which the NATS server will listen"`
	Port int    `arg:"-p,--port,env:PORT" default:"4222" help:"Port on which the NATS server will listen"`

	HTTPPort  int `arg:"-m,--http-port,env:HTTP_PORT" help:"HTTP port for monitoring dashboard (exclusive of --https_port)"`
	HTTPSPort int `arg:"--https-port,env:HTTPS_PORT" help:"HTTPS port for monitoring dashboard (exclusive of --httpx_port)"`

	Name    string `arg:"-n,--name,env:NAME" help:"Server name"`
	PidFile string `arg:"-P,--pid,env:PID" help:"File to write the server's PID"`
	Config  string `arg:"-c,--config,env:CONFIG" help:"Path to configuration file"`

	// Logging
	LogFile string `arg:"-l,--log" help:"File to redirect log output"`
	NoLog   bool   `arg:"--no-log,env:NO_LOG" help:"Disable logging"`
	Debug   bool   `arg:"-D,--debug,env:DEBUG" help:"Enable debug mode"`
	Syslog  bool   `arg:"-s,--syslog" help:"Log to syslog or windows event log"`
}

func main() {
	var args Args
	arg.MustParse(&args)

	opts := &server.Options{
		ServerName: args.Name,
		Host:       args.Host,
		Port:       args.Port,
		PidFile:    args.PidFile,

		HTTPPort:  args.HTTPPort,
		HTTPSPort: args.HTTPSPort,

		Debug:   args.Debug,
		LogFile: args.LogFile,
		Syslog:  args.Syslog,

		ConfigFile: args.Config,
	}

	if args.NoLog {
		opts.NoLog = true
	}

	s, err := server.NewServer(opts)
	if err != nil {
		panic(err)
	}

	s.SetLogger(logger.NewLogger(), true, true)

	s.Start()

	s.WaitForShutdown()
}
