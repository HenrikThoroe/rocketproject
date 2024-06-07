/**
 * Build URLSearchParams from query object.
 * The query object can be a plain object with properties of type string, number, boolean or Date.
 *
 * @param query The query object to build the URLSearchParams from.
 * @returns The URLSearchParams.
 */
export function buildSearchParams<Q extends object>(query: Q): URLSearchParams {
  const params = new URLSearchParams()

  for (const key in query) {
    const value = query[key]

    if (typeof value === 'number') {
      params.set(key, Number.isInteger(value) ? value.toString() : value.toFixed(2))
    }

    if (typeof value === 'string' && value.length > 0) {
      params.set(key, value)
    }

    if (typeof value === 'boolean') {
      params.set(key, value ? 'true' : 'false')
    }

    if (value instanceof Date) {
      params.set(key, value.toISOString())
    }
  }

  return params
}
