import { execa, type Options, type ResultPromise } from 'execa'
import type { ServerConfig } from './types.js'

const defaultOpts: Options = {
  stdout: ['pipe', 'inherit'],
  stderr: 'inherit',
  forceKillAfterDelay: false,
  reject: false,
  preferLocal: true,
  env: { FORCE_COLOR: 'true' },
}

export class NatsServer {
  args: ServerConfig
  private subprocess?: ResultPromise

  constructor(args?: ServerConfig) {
    this.args = args ?? {}
  }

  /**
   * Starts the server and will resolve the promise once it is ready.
   */
  async start(opts?: Options) {
    return new Promise((resolve, reject) => {
      const args = this.getArgs()

      const subprocess = execa('nats-nest', args, {
        ...defaultOpts,
        ...opts,
      })

      this.subprocess = subprocess

      subprocess.stdout?.on('data', (data) => {
        if (Buffer.isBuffer(data)) {
          const str = data.toString()

          if (str.includes('Server is ready')) {
            resolve(subprocess.pid)
          }
        }
      })

      subprocess.on('error', (err: any) => reject(err))
    })
  }

  /**
   * Stops the server by sending a signal to the `nats-server` instance.
   */
  async stop() {
    return this.subprocess?.kill()
  }

  private getArgs() {
    const args: string[] = []

    for (const [key, val] of Object.entries(this.args)) {
      args.push(`--${key}`)

      // This is to exclude args with `true` as `--${flagName}` is enough to enable a setting
      // But also need to pass in `false` so that settings that are enabled by default can be disabled
      if (typeof val === 'boolean') {
        if (!val) {
          args.push(`${val}`)
        }
        continue
      }

      args.push(`${val}`)
    }

    return args
  }
}
