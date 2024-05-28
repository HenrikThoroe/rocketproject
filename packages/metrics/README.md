# Metrics

A library for integrating metrics and logging into the set of tools bundled in `@rocketproject`.
The logging suite integrates with `@rocketproject/rest` and `@rocketproject/wss`.

## WIP

Prometheus compatible metrics are possible and most of the required infrastructure is already set up and
working. Due to time limits I couldn't finish this part yet. Maybe in a future alternative universe I will find
the time.

## Example Usage

**Code:**

```ts
import express from 'express'
import { HTTPLogger } from '@rocketproject/metrics'
import { sampleRouter } from '<model>'

const app = express()
const logger = new HTTPLogger('MyScope')

sampleRouter.mount(app, logger)
app.listen(3000)
```

**Output:**

```sh
[MyScope] HTTP Request - GET / (500) in 10ms (37 B)
[MyScope] HTTP Request - GET / (500) in 3ms (37 B)
[MyScope] HTTP Request - GET / (200) in 4ms (15 B)
```
