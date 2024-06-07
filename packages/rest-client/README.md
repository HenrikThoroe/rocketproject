# REST Client

The `@rocketproject/rest-client` package provides a library to connect against a REST API which implements a schema configured
using `@rocketproject/api-schema`. Requests rely on the native `fetch` API, making the package portable between Node and Browser
environments. The package provides a type-safe API, applying type checks on request data like URL parameters and query data and on
the server response.

## Example Usage

```ts
import schema from '<model>'
import { RestClient } from '@rocketproject/rest-client'

const client = new RestClient(schema, 'https://my-api-host.example.com')

const result = await client.fetch('get', {
  params: { id: 'object-id' },
  query: { filter: true },
})

if (result.success) {
  console.log(result.value)
} else {
  console.error(result.code, result.error)
}
```

## WIP

- An implementation for the auth specification of an API route
