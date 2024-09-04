import { execa, type Options, type ResultPromise } from 'execa'
import got, { type OptionsOfTextResponseBody } from 'got'
import { kebabCase } from 'string-ts'
import type { ServerInfo, ServerOptions } from './types.js'
import { sleep } from './utils.js'

export class NatsServer {
  args: ServerOptions = { httpPort: 8222, host: '127.0.0.1' }
  private subprocess?: ResultPromise

  constructor(args?: ServerOptions) {
    this.args = { ...this.args, ...args }
  }

  /**
   * Starts the server and will resolve the promise once it is ready.
   */
  async start(opts?: Options) {
    return new Promise(async (resolve, reject) => {
      const argsString = this.getArgsString()

      const subprocess = execa('nats-nest', argsString, {
        stderr: 'inherit',
        forceKillAfterDelay: false,
        reject: false,
        preferLocal: true,
        env: { FORCE_COLOR: 'true' },
        stdout: ['pipe', 'inherit'],
        ...opts,
      })

      try {
        // give the server a lil time to start up before checking
        await sleep(500)
        const resp = await got
          .get(`${this.getMonitoringUrl()}/healthz`, {
            retry: {
              limit: 10,
            },
          })
          .json<{ status: string }>()

        if (resp.status === 'ok') {
          resolve(subprocess.pid)
        } else {
          reject(`Error starting server. received status: ${resp.status}`)
        }
      } catch (error) {
        reject('Error starting server')
        console.error(error)
      }
    })
  }

  /**
   * Stops the server by sending a signal to the `nats-server` instance.
   */
  async stop() {
    return this.subprocess?.kill()
  }

  getMonitoringUrl() {
    const args = this.args

    const protocol = args.httpsPort ? 'https' : 'http'
    const host = args.httpHost || args.host || '127.0.0.1'
    const port = args.httpsPort || args.httpPort || 8222
    // const basePath = args.httpBasePath ?? ''

    return `${protocol}://${host}:${port}`
  }

  getArgsString() {
    const args: string[] = []

    for (const [key, val] of Object.entries(this.args)) {
      if (typeof val === 'undefined') {
        continue
      }

      args.push(`--${kebabCase(key)}`)

      // This is to exclude args with `true` as `--${flagName}` is enough to enable a setting
      // But also need to pass in `false` so that settings that are enabled by default can be disabled
      if (typeof val === 'boolean') {
        if (!val) {
          args.push(`${val}`)
        }
        continue
      }

      args.push(val)
    }

    return args
  }

  async getServerInfo(options?: OptionsOfTextResponseBody) {
    return await got
      .get(`${this.getMonitoringUrl()}/varz`, options)
      .json<ServerInfo>()
  }
}
