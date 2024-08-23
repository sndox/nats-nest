# `nats-nest`

`nats-nest` is a thin wrapper around an embedded NATS server in a Go module.

## Installation

```bash
npm install @sndo/nats-nest
```

## CLI Usage

A NATS server can be started like so:

```bash
npx nats-nest
```

### Configuration Options

Server config options can also be set when starting the server.

| Field       | Type     | Flag(s)           | Environment Variable   | Default   | Help                                                              |
| ----------- | -------- | ----------------- | ---------------------- | --------- | ----------------------------------------------------------------- |
| `Host`      | `string` | `-h, --host`      | `NATS_NEST_HOST`       | `0.0.0.0` | Host on which the NATS server will listen                         |
| `Port`      | `int`    | `-p, --port`      | `NATS_NEST_PORT`       | `4222`    | Port on which the NATS server will listen                         |
| `HTTPPort`  | `int`    | `-m, --http-port` | `NATS_NEST_HTTP_PORT`  |           | HTTP port for monitoring dashboard (exclusive of `--https-port`)  |
| `HTTPSPort` | `int`    | `--https-port`    | `NATS_NEST_HTTPS_PORT` |           | HTTPS port for monitoring dashboard (exclusive of `--httpx-port`) |
| `Name`      | `string` | `-n, --name`      | `NATS_NEST_NAME`       |           | Server name                                                       |
| `PidFile`   | `string` | `-P, --pid`       | `NATS_NEST_PID`        |           | File to write the server's PID                                    |
| `Config`    | `string` | `-c, --config`    | `NATS_NEST_CONFIG`     |           | Path to configuration file                                        |
| `LogFile`   | `string` | `-l, --log`       |                        |           | File to redirect log output                                       |
| `NoLog`     | `bool`   | `--no-log`        | `NATS_NEST_NO_LOG`     |           | Disable logging                                                   |
| `Debug`     | `bool`   | `-D, --debug`     | `NATS_NEST_DEBUG`      |           | Enable debug mode                                                 |
| `Syslog`    | `bool`   | `-s, --syslog`    |                        |           | Log to syslog or windows event log                                |
| `Jetstream` | `bool`   | `--jetstream`     |                        |           | Enable JetStream functionality                                    |
| `StoreDir`  | `string` | `--store_dir`     |                        |           | Set the storage directory                                         |

**Examples:**

Setting a name and enabling Jetsream

```bash
npx nats-nest --name "MyNatsServer" --jetstream
```

Setting the port and host

```bash
npx nats-nest --port 4222 --host 127.0.0.1
```
