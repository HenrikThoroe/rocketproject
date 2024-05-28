import { z } from 'zod'
import { Receiver } from './Receiver'
import { Sender } from './Sender'

/**
 * ChannelSchema is a map of job names to zod schemas.
 */
export type ChannelSchema = {
  [key: string]: z.ZodType
}

type Cache<T extends ChannelSchema> = {
  sender?: Sender<T>
  receiver?: Receiver<T>
}

/**
 * Factory is used to create {@link Sender} and {@link Receiver} instances
 * for a given channel schema and name.
 * The channel name is used to identify the channel in the bullmq/redis queue.
 * The schema is used to validate the data sent through the channel.
 *
 * @example
 * ```ts
 * // Definition (shared)
 * const host = process.env.REDIS_HOST
 * const port = parseInt(process.env.REDIS_PORT)
 * const channels = {
 *   replays: new Factory(host, port, 'replays', {
 *     add: shared.replay.replaySchema,
 *     addLog: shared.replay.replayLogSchema,
 *     fetch: payload.replays.fetch,
 *   }),
 *   stats: new Factory(host, port, 'stats', {
 *     addReplay: shared.replay.replaySchema,
 *   }),
 * }
 *
 * // Sender
 *
 * // Replay object is validated against the schema
 * channels.replays.sender().send('add', { ... })
 *
 * // Receiver
 *
 * // Data is validated against the schema and guranteed to be of type Replay
 * channels.replays.receiver().on('add', (data) => { ... })
 * ```
 */
export class Factory<T extends ChannelSchema> {
  private readonly schema: T
  private readonly id: string
  private cache: Cache<T>
  private readonly host: string
  private readonly port: number

  constructor(host: string, port: number, id: string, schema: T) {
    this.schema = schema
    this.id = id
    this.cache = {}
    this.host = host
    this.port = port
  }

  /**
   * Creates a {@link Sender} instance for the channel.
   * If a sender instance already exists, it is returned from cache.
   *
   * @returns A {@link Sender} instance.
   */
  public sender() {
    if (!this.cache.sender) {
      this.cache.sender = new Sender(this.schema, this.id, this.host, this.port)
    }

    return this.cache.sender!
  }

  /**
   * Creates a {@link Receiver} instance for the channel.
   * If a receiver instance already exists, it is returned from cache.
   *
   * @returns A {@link Receiver} instance.
   */
  public receiver() {
    if (!this.cache.receiver) {
      this.cache.receiver = new Receiver(this.schema, this.id, this.host, this.port)
    }

    return this.cache.receiver!
  }

  /**
   * Closes the underlying bullmq queue and worker.
   * If a sender or receiver instance exists, it is closed and removed from cache.
   */
  public async close() {
    if (this.cache.sender) {
      await this.cache.sender.close()
    }

    if (this.cache.receiver) {
      await this.cache.receiver.close()
    }

    this.cache = {}
  }
}
