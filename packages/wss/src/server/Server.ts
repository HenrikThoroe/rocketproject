import { IOSchema, InSchema, OutSchema } from '@rocketproject/api-schema'
import { WSSLogger } from '@rocketproject/metrics'
import { Server as HTTPServer, createServer } from 'http'
import WebSocket, { RawData, WebSocketServer } from 'ws'
import { Impl, Sink, State } from './types'

/**
 * Creates a new {@link Server}. The schema defines which
 * messages will be accepted and which messages can be sent.
 *
 * ```ts
 * import { schema } from '<your-schema>'
 *
 * // State that will be passed to the implementation. Unique for each server instance.
 * const serverState = new ServerState()
 *
 * const server = wss(schema, state, {
 *   state: async (sink) => new ClientState(sink), // Client state will be recreated for each connection.
 *   onClose: async (state) => {
 *     await doSomething(state.client)
 *     await doSomethingElse(state.server)
 *   },
 *   handlers: {
 *     foo: async (sink, state, data) => {
 *       await doSomething(state.client, data) // state contains the client state for the connection and the shared server state.
 *       await doSomethingElse(state.server, data)
 *       await sink.send('bar', { ... }) // The message type is defined by the schema.
 *     }
 *   }
 * })
 * ```
 *
 * @param schema The schema for in- and outgoing messages.
 * @param state The server state that will be passed to the implementation.
 * @param impl The implementation of the schema.
 * @returns A new {@link Server}.
 */
export function wss<In extends InSchema, Out extends OutSchema, ClientState, ServerState>(
  schema: IOSchema<In, Out>,
  state: ServerState,
  impl: Impl<In, Out, ClientState, ServerState>,
) {
  return new Server(schema, state, impl)
}

/**
 * A `Server` is a typesafe abstraction over the NodeJS `ws` API.
 * The server maps an implementation to a schema and forwards
 * type checked messages to their respective handlers.
 */
export class Server<In extends InSchema, Out extends OutSchema, ClientState, ServerState> {
  private readonly schema: IOSchema<In, Out>

  private readonly impl: Impl<In, Out, ClientState, ServerState>

  private readonly wss: WebSocket.Server

  private readonly http: HTTPServer

  private readonly state: ServerState

  private logger?: WSSLogger

  constructor(
    schema: IOSchema<In, Out>,
    state: ServerState,
    impl: Impl<In, Out, ClientState, ServerState>,
  ) {
    this.schema = schema
    this.impl = impl
    this.http = createServer()
    this.wss = new WebSocketServer({ server: this.http })
    this.state = state
    this.attach()
  }

  //* API

  /**
   * Starts the server on the given port.
   *
   * @param port The port to listen on.
   */
  public listen(port: number | string) {
    this.http.listen(port)
  }

  /**
   * Closes the server.
   */
  public close() {
    this.wss.close()
  }

  /**
   * Attaches a {@link Logger logger} instance used to
   * forward in and outgoing messages.
   *
   * @param logger A {@link WSSLogger} instance.
   */
  public use(logger: WSSLogger) {
    this.logger = logger
  }

  //* Private Methods

  private attach() {
    this.wss.on('connection', async (ws) => {
      const sink = this.buildSink(ws)
      const state = await this.buildState(sink)

      ws.on('close', () => this.handleError(sink, state, () => this.handleClose(state)))

      ws.on('message', (message) =>
        this.handleError(sink, state, () => this.handleMessage(sink, state, message)),
      )
    })
  }

  private async handleError(
    sink: Sink<Out>,
    state: State<ClientState, ServerState>,
    action: () => Promise<void>,
  ) {
    try {
      await action()
    } catch (e: any) {
      try {
        await this.impl.onError?.call(null, sink, state, e)
      } catch {}

      if ('message' in e && typeof e.message === 'string') {
        this.logger?.error(e.message)
      } else {
        this.logger?.error('Unknown Error')
      }
    }
  }

  private async handleMessage(
    sink: Sink<Out>,
    state: State<ClientState, ServerState>,
    message: RawData,
  ) {
    const start = performance.now()
    const json = JSON.parse(message.toString())

    for (const key in this.impl.handlers) {
      const val = this.schema.input[key]?.safeParse(json)

      if (val?.success) {
        const handler = this.impl.handlers[key]
        await handler(sink, state, val.data)
        this.logger?.info({
          key,
          type: 'receive',
          data: val.data,
          duration: (performance.now() - start) / 1000,
        })
        return
      }
    }

    this.logger?.warn({ message: json })
  }

  private async handleClose(state: State<ClientState, ServerState>) {
    await this.impl.onClose(state)
  }

  private async buildState(sink: Sink<Out>): Promise<State<ClientState, ServerState>> {
    return {
      client: await this.impl.state(sink, this.state),
      server: this.state,
    }
  }

  private buildSink(ws: WebSocket): Sink<Out> {
    return {
      drain: async () => ws.close(),
      send: async (event, data) => {
        const start = performance.now()
        const val = this.schema.output[event]?.safeParse(data)

        if (val?.success) {
          const json = JSON.stringify(val.data)
          const end = performance.now()
          ws.send(json)

          this.logger?.info({
            key: event,
            type: 'send',
            data: val.data,
            duration: (end - start) / 1000,
          })
        }
      },
    }
  }
}
