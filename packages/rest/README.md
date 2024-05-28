# REST

The `@rocketproject/rest` package provides a library for creating REST-full or REST-like type safe HTTP APIs.
It is meant to provide a convenient type safe layer above `express` routers which is backward compatible
to existing plain express infrastructure.

The types rely on the `@rocketproject/api-schema` package.
This library can take those schemas and easily allow adding logic to the already defined
endpoints while preserving type safety.

## Example Usage

```ts
// mySchema is imported from the `api-schema` package
const myRouter = router(mySchema, {
  // 'foo' is not arbitrary. 'foo' has been defined as an endpoint
  // in `mySchema`. 'foo's input and output types have been defined by
  // `mySchema` as well and are also typesafe.
  // You will get full code-completion on the required properties
  // as TS knows about the endpoints defined in `mySchema`.
  foo: async ({ body, query, params }, success, failure) => {
    // some imaginary logic. The types of body, query and params are known at transpile time!
    const data = doSomething(body, query, params)

    // some condition
    if (data.flag) {
      // success(:T) is a convenience function to produce a successfull `Result`.
      // Successfull means the `ok` property is `true` and `value: T` exists.
      // The type of data is defined by the schema as well and will result in
      // build time errors if not matching.
      return success(data)
    }

    // failure(:T) is a convenience function to produce a failed `Result`.
    // Failed means the `ok` property is `false` and `error: E` exists.
    // The error type is of course defined by the schema too!
    return failure({ message: 'Something went wrong' }, 404)
  },
})

const app = express()

// Mount the router onto app.
// Creates a `Router` object from express under the hood and
// calls `app.use(mySchema.name, <created express router>)`.
myRouter.mount(app)
app.listen(3000)
```
