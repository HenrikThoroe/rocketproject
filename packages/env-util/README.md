# Environment Utility

A small wrapper for integrating NextJS style dotenv files into custom Node projects.
Uses `@next/env` for loading `.env` and `.env.local` files.

# Example Usage

It is recommended to include a `environment.d.ts` into your tsconfig file.

```ts
import { loadenv } from '@rocketproject/env-util'

loadenv()
```
