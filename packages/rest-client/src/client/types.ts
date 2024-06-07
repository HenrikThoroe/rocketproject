import { Endpoint } from '@rocketproject/api-schema'
import { z } from 'zod'

/**
 * Success type of an endpoint.
 */
export type Success<T> = T extends Endpoint<any, any, any, any, infer S, any> ? z.infer<S> : never

/**
 * Failure type of an endpoint.
 */
export type Failure<T> =
  T extends Endpoint<any, any, any, any, any, any, infer F> ? z.infer<F> : never

/**
 * A type that maps another type either to undefined if it is empty (`{}`) or to the original type.
 */
export type Maybe<T> = keyof T extends never ? undefined : T

/**
 * A type that marks all properties from an object that have the value `undefined` as optional.
 */
export type Sanitize<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>
} & { [K in keyof T as undefined extends T[K] ? never : K]: T[K] }

/**
 * The payload of an endpoint. It contains the query, body, params and files of the request.
 */
export type Payload<EP> =
  EP extends Endpoint<
    infer Query,
    infer Body,
    infer Params,
    infer Files,
    infer _Success,
    infer _Auth,
    infer _Failure
  >
    ? {
        query: Maybe<z.infer<Query>>
        body: Maybe<z.infer<Body>>
        params: Maybe<z.infer<Params>>
        files: Maybe<Record<Files, Blob>>
      }
    : never

/**
 * The result of a fetch request. It contains either the success value or the error code and error message.
 */
export type Result<Success, Failure, S = boolean> = S extends true
  ? {
      success: S
      value: Success
    }
  : {
      success: S
      code: number
      error: Failure
    }

/**
 * The result of a fetch request. It contains either the success value or the error code and error message.
 */
export type FetchResult<EP, S = boolean> = Result<Success<EP>, Failure<EP>, S>

/**
 * Reconstructs the sanitized payload object by re-adding all optional properties.
 *
 * @param payload The payload object to reconstruct.
 * @returns The reconstructed payload object.
 */
export function reconstructPayload<T>(payload: Sanitize<Payload<T>>): Payload<T> {
  return {
    query: 'query' in payload ? payload.query : undefined,
    body: 'body' in payload ? payload.body : undefined,
    params: 'params' in payload ? payload.params : undefined,
    files: 'files' in payload ? payload.files : undefined,
  } as Payload<T>
}
