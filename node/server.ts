import { execa, type Options, type ResultPromise } from 'execa'
import type { ServerConfig } from './types.js'

const defaultOpts: Options = {
  stdout: 'inherit',
  stderr: 'inherit',
  forceKillAfterDelay: false,
  reject: false,
  preferLocal: true,
}

export class NatsServer {
  args: ServerConfig
  private process?: ResultPromise

  constructor(args?: ServerConfig) {
    this.args = args ?? {}
  }

  async start(opts?: Options) {
    return new Promise(async (resolve, reject) => {
      const args = this.getArgs()

      const process = execa('nats-nest', args, {
        ...defaultOpts,
        ...opts,
      })

      this.process = process

      process.on('spawn', () => {
        if (process.pid) {
          resolve(process.pid)
        } else {
          // probably not needed?
          reject()
        }
      })

      process.on('error', (err: any) => reject(err))
    })
  }

  /**
   * Stops the server by sending a signal to the `nats-server` instance.
   * This returns false when the signal could not be sent, for example when the subprocess has already exited.
   */
  async stop() {
    if (!this.process) {
      return
    }

    return this.process.kill()
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
