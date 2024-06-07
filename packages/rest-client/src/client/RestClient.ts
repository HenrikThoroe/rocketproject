import { Route, RouteConfig } from '@rocketproject/api-schema'
import { buildSearchParams } from '../util/buildSearchParams'
import { Failure, FetchResult, Payload, Sanitize, Success, reconstructPayload } from './types'

/**
 * A REST client that can be used to fetch data from a REST API.
 *
 * Utilizes the `fetch` API to send requests to the server and
 * the `@rocketproject/api-schema` to provide type-safe endpoints.
 *
 * @example
 * ```ts
 * import schema from '<model>'
 * import { RestClient } from '@rocketproject/rest-client'
 *
 * const client = new RestClient(schema, 'https://my-api-host.example.com')
 *
 * const result = await client.fetch('get', {
 *   params: { id: 'object-id' },
 *   query: { filter: true },
 * })
 *
 * if (result.success) {
 *   console.log(result.value)
 * } else {
 *   console.error(result.code, result.error)
 * }
 * ```
 */
export class RestClient<T extends RouteConfig> {
  private readonly route: Route<T>

  private readonly host: string

  constructor(route: Route<T>, host: string) {
    this.route = route
    this.host = host
  }

  //* API

  /**
   * Sends a fetch request to the given endpoint with the provided payload.
   *
   * @param endpoint The name of the endpoint to fetch.
   * @param payload The payload of the request.
   * @param cache The cache mode of the request.
   * @returns The result of the request.
   */
  public async fetch<K extends Extract<keyof T, string>>(
    endpoint: K,
    payload: Sanitize<Payload<T[K]>>,
    cache: RequestCache | number = 'default',
  ): Promise<FetchResult<T[K], boolean>> {
    const options = reconstructPayload(payload)
    const url = this.buildURL(endpoint, options)
    const data = this.buildBodyData(options)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000)
    const method = this.route.get(endpoint).method

    const response = await fetch(url, {
      method,
      body: data,
      mode: 'cors',
      cache: typeof cache === 'number' ? 'default' : cache,
      headers: await this.headers(options),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const resp = await response.json()
      const error = this.route.get(endpoint).validateFailure(resp) as Failure<T[K]>

      return {
        success: false,
        code: response.status,
        error,
      }
    }

    const resp = await response.json()
    const result = this.route.get(endpoint).validateSuccess(resp) as Success<T[K]>

    return {
      success: true,
      value: result,
    }
  }

  //* Private Methods

  private async headers<K extends Extract<keyof T, string>>(
    options: Payload<T[K]>,
  ): Promise<HeadersInit> {
    const headers: HeadersInit = {}

    if (options.files !== undefined) {
      return headers
    }

    return {
      ...headers,
      'Content-Type': 'application/json',
    }
  }

  private buildBodyData<K extends Extract<keyof T, string>>(options: Payload<T[K]>) {
    if (options.files) {
      const data = new FormData()

      for (const key in options.body) {
        const value = options.body[key] as File

        data.append(key, value)
      }

      for (const key in options.files) {
        const value = options.files[key]

        if (value) {
          data.append(key, value)
        }
      }

      return data
    }

    return JSON.stringify(options.body)
  }

  private buildURL<K extends Extract<keyof T, string>>(key: K, payload: Payload<any>) {
    const query = buildSearchParams(payload.query ?? {})
    const ep = this.route.get(key)
    let path = ep.path

    for (const key in payload.params) {
      const value = payload.params[key]

      path = path.replace(`:${key}`, value)
    }

    return `${this.host}${this.route.path}${path}${this.encodeQuery(query)}`
  }

  private encodeQuery(query: URLSearchParams): string {
    const encoded = query.toString()

    if (encoded.length === 0) {
      return ''
    }

    return `?${encoded}`
  }
}
