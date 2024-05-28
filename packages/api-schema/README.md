# API Schema

A library for defining HTTP endpoints. Endpoints are configured with `zod` schemas for their parameters, bodies, query, etc. and
optional authentication and authorization options. Endpoints are grouped in routes, which then can be implemented by the `@rocketproject/rest` library.

## Example Usage

```ts
import { z } from 'zod'
import { route, endpoint } from '@rocketproject/api-schema'
import { userSchema } from '<model>'

const userFilterSchema = z.object({
  name: z.string().min(1).max(10),
  age: z.coerce.number().positive(),
})

export const sampleRoute = route('/users', {
  all: endpoint('/', 'GET').unprotected().success(z.array(z.string())),
  find: endpoint('/', 'GET').unprotected().query(userFilterSchema).success(userSchema),
  add: endpoint('/', 'POST').unprotected().body(userSchema).success(userSchema),
  remove: endpoint('/:id', 'DELETE')
    .protected()
    .access('admin', 'moderator')
    .params(z.object({ id: z.string() }))
    .success(z.object({ success: z.literal(true) })),
})
```
