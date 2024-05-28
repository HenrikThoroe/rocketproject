<h1 align="center">Rocketproject</h1>

<p align="center">
    <img alt="GitHub" style="padding: 10px" src="https://img.shields.io/github/license/HenrikThoroe/rocketproject?style=for-the-badge">
    <img alt="ESLint" style="padding: 10px" src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=for-the-badge">
    <img alt="Prettier" style="padding: 10px" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge">
</p>

<p align="center"><i>Everything to spin up your side projects. Fast!</i></p>

# 🚀 Introduction

A set of tools to quickly spin up your NodeJS + React applications.
The mono-repo includes a wide variety of backend libraries and a set of React components.
All libraries have been developed to make the development process of my side projects
faster and more enjoyable. The focus is on abstracting all the boring stuff and providing absolute
type safety. So what is included?

- `api-schema`
  - A library for configuring a schema for REST-like web APIs
  - Allows to quickly define all types of parameters and responses
  - Supports configuring authentication and authorization per endpoint
- `auth`
  - Tools for easy integration of auth providers into the `rest` package
  - Allows to use Supabase but could be trivially expanded for other providers
- `env-util`
  - Small tool to use NextJS style .env files in your custom Node applications
- `kv-store`
  - Type-safe and schema based accessor for Redis
  - Allows simulating a Redis store in memory for local testing
  - Could easily be expanded to support other key-value storage solutions
- `metrics`
  - Convenient tool set for everything metric related
  - easy integration into `rest` and `wss` package for convenient logging of all requests
- `rest`
  - An express wrapper to implement schemas defined using the `api-schema` package
  - Takes care of all the heavy lifting and lets you focus on the logic
  - Automatically verifies the parameters and responses for each request
  - Only allows requests that meet the authentication and authorization requirements
- `ui`
  - Set of react components that happened to be used throughout some of my projects
- `wss`
  - Type-safe and schema based web socket server
  - Allows session based web socket servers that only allow type-safe messages
  - Easy to spin up
  - State management included

# 🔥 Getting Started

## Install Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [NodeJS](https://nodejs.org/en/download) (v18.12+, recommended v20+)
- [Yarn](https://yarnpkg.com/getting-started/install) (v4+ is required. Use `yarn set version stable`)

## Setup Dev Environment

```sh
# Start external services
docker compose up

# Install dependencies
yarn install

# Run linter
yarn lint

# Build packages
yarn build

# Publish packages (access token or OTP required)
yarn publish-packages
```

# 🧑‍⚖️ License

MIT
