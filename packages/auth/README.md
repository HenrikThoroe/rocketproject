# Auth

A library for integrating authorization and authentication needs.
The package allows connecting against auth providers like Supabase to verify incoming requests.
`auth` tightly integrates with the `@rocketproject/api-schema` and `@rocketproject/rest` packages
to allow role based authorization and token based authentication. Secrets used for the verification
of requests are provided by the underlying auth provider. The set of supported providers can easily be expanded if desired.
To define which endpoints require authentication and which users have access to them, see the `@rocketproject/api-schema` package.

## Example Usage

```ts
import { AuthFactory } from '@rocketproject/auth'
import { router } from '@rocketproject/rest'
import { route, endpoint } from '@rocketproject/api-schema'
import express from 'express'

const apiSchema = route(...)
const app = express()
const apiRouter = router(apiSchema, ...)

const { handler } = AuthFactory.supabase({
    url: '<Supabase API URL>',
    key: '<MY SECRET SUPABASE ACCESS KEY>',
    secret: '<MY SECRET SUPABASE JWT KEY>',
    issuer: '<JWT Issuer URL>'
})

apiRouter.mount(app, undefined, handler)
app.listen(3000)
```
