import * as z from 'zod'

/**
 * HTTP method of an endpoint.
 */
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * Input schema for an endpoint.
 */
interface Input<Q extends z.ZodType, B extends z.ZodType, P extends z.ZodType, F extends string> {
  query: Q
  body: B
  params: P
  files: F[]
}

/**
 * Output schema for an endpoint.
 */
interface Output<S extends z.ZodType, F extends z.ZodType> {
  success: S
  failure: F
}

/**
 * Default failure schema for an endpoint.
 */
const defaultFailureSchema = z.object({
  message: z.string(),
})

/**
 * Creates a new endpoint with default input and output schemas.
 * The default input schema expects an empty query, an undefined body and empty params.
 * The default output schema expects an undefined success response and a failure response with a message property.
 * An endpoint requires authentication by default.
 *
 * @example
 * ```ts
 * const myEndpoint = endpoint('/foo', 'GET')
 *   .query(z.object({ foo: z.string() }))
 *   .body(z.object({ bar: z.number() }))
 *   .params(z.object({ id: z.string() }))
 *   .success(z.object({ baz: z.boolean() }))
 *   .failure(z.object({ message: z.string() }))
 *
 * myEndpoint.validateQuery({ foo: 'foo' })           // { foo: 'foo' }
 * myEndpoint.validateBody({ bar: 42 })               // { bar: 42 }
 * myEndpoint.validateParams(null)                    // Throws ZodError
 * myEndpoint.validateSuccess({ baz: true })          // { baz: true }
 * myEndpoint.validateFailure({ message: 'message' }) // { message: 'message' }
 * ```
 *
 * @param path The path of the endpoint.
 * @param method The HTTP method of the endpoint.
 * @returns A new endpoint with default input and output schemas.
 */
export function endpoint(path: string, method: Method) {
  return new Endpoint(
    path,
    method,
    {
      query: z.object({}, { invalid_type_error: 'Expected empty query' }),
      body: z.union([z.undefined(), z.object({})], {
        invalid_type_error: 'Expected undefined body',
      }),
      params: z.object({}),
      files: [],
    },
    {
      success: z.undefined({ invalid_type_error: 'Expected undefined success response' }),
      failure: defaultFailureSchema,
    },
    true,
    new Set(),
  )
}

/**
 * An endpoint represents the schema of a single API endpoint.
 * It defines which input the endpoint accepts and which output it returns.
 * The input consists of query parameters, a body, attached files, authentication data and path parameters aka params.
 * Each input and output is defined by a Zod schema and can be validated at runtime
 * when data is received over an untrusted network.
 */
export class Endpoint<
  Q extends z.ZodType,
  B extends z.ZodType,
  P extends z.ZodType,
  U extends string,
  S extends z.ZodType,
  A extends boolean,
  F extends z.ZodType = typeof defaultFailureSchema,
> {
  /**
   * The path of the endpoint.
   * Translates to the path of the express route.
   */
  public readonly path: string

  /**
   * The HTTP method of the endpoint.
   */
  public readonly method: Method

  /**
   * Whether the endpoint requires authentication.
   */
  public readonly authenticated: A

  /**
   * The input schema of the endpoint.
   */
  protected readonly input: Input<Q, B, P, U>

  /**
   * The output schema of the endpoint.
   */
  protected readonly output: Output<S, F>

  /**
   * The accepted access roles of the endpoint.
   */
  protected readonly accessRoles: Set<string>

  constructor(
    path: string,
    method: Method,
    input: Input<Q, B, P, U>,
    output: Output<S, F>,
    authenticated: A,
    accessRoles: Set<string>,
  ) {
    this.path = path
    this.method = method
    this.input = input
    this.output = output
    this.authenticated = authenticated
    this.accessRoles = new Set(accessRoles)
  }

  /**
   * Creates a new endpoint with the same path and method but requires authentication.
   *
   * @returns A new endpoint with updated authentication requirement.
   */
  public protected(): Endpoint<Q, B, P, U, S, true, F> {
    return new Endpoint(this.path, this.method, this.input, this.output, true, this.accessRoles)
  }

  /**
   * Creates a new endpoint with the same path and method but does not require authentication.
   *
   * @returns A new endpoint with updated authentication requirement.
   */
  public unprotected(): Endpoint<Q, B, P, U, S, false, F> {
    return new Endpoint(this.path, this.method, this.input, this.output, false, this.accessRoles)
  }

  /**
   * Creates a new endpoint with the same path and method but a different input schema.
   *
   * @param query The new query schema.
   * @returns A new endpoint with updated query schema.
   */
  public query<T extends z.ZodType>(query: T): Endpoint<T, B, P, U, S, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      { ...this.input, query },
      this.output,
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but a different input schema.
   *
   * @param body The new body schema.
   * @returns A new endpoint with updated body schema.
   */
  public body<T extends z.ZodType>(body: T): Endpoint<Q, T, P, U, S, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      { ...this.input, body },
      this.output,
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but a different input schema.
   *
   * @param params The new params schema.
   * @returns A new endpoint with updated params schema.
   */
  public params<T extends z.ZodType>(params: T): Endpoint<Q, B, T, U, S, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      { ...this.input, params },
      this.output,
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but a different input schema.
   *
   * @param files The new files list of expected files.
   * @returns A new endpoint with updated files list.
   */
  public files<T extends string>(files: T[]): Endpoint<Q, B, P, T, S, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      { ...this.input, files },
      this.output,
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but a different output schema.
   *
   * @param success The new success schema.
   * @returns A new endpoint with updated success schema.
   */
  public success<T extends z.ZodType>(success: T): Endpoint<Q, B, P, U, T, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      this.input,
      { ...this.output, success },
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but a different output schema.
   *
   * @param failure The new failure schema.
   * @returns A new endpoint with updated failure schema.
   */
  public failure<T extends z.ZodType>(failure: T): Endpoint<Q, B, P, U, S, A, T> {
    return new Endpoint(
      this.path,
      this.method,
      this.input,
      { ...this.output, failure },
      this.authenticated,
      this.accessRoles,
    )
  }

  /**
   * Creates a new endpoint with the same path and method but different access roles.
   * These roles are used to check if a user is authorized to the endpoint.
   *
   * @param roles Accepted roles for the endpoint.
   * @returns A new endpoint with updated access roles.
   */
  public access(...roles: string[]): Endpoint<Q, B, P, U, S, A, F> {
    return new Endpoint(
      this.path,
      this.method,
      this.input,
      this.output,
      this.authenticated,
      new Set(roles),
    )
  }

  /**
   * Checks if the given role is accepted by the endpoint.
   *
   * @param role The role to check.
   * @returns Whether the role is accepted by the endpoint.
   */
  public hasAccess(role: string): boolean {
    return this.accessRoles.has(role)
  }

  /**
   * Validates the query of a request.
   *
   * @param query Any query to validate.
   * @returns The parsed and validated query.
   * @throws If the query is invalid a `ZodError` is thrown.
   */
  public validateQuery(query: unknown): z.infer<Q> {
    return this.input.query.parse(query)
  }

  /**
   * Validates the body of a request.
   *
   * @param body Any body to validate.
   * @returns The parsed and validated body.
   * @throws If the body is invalid a `ZodError` is thrown.
   */
  public validateBody(body: unknown): z.infer<B> {
    return this.input.body.parse(body)
  }

  /**
   * Validates the files of a request.
   *
   * @param files A record of filenames and their associated data buffer.
   * @returns A record where all required keys are present.
   */
  public validateFiles(files: Record<string, Buffer>): Record<U, Buffer> {
    const hasAllKeys = this.input.files.every((key) => key in files)
    const hasEqualLength = this.input.files.length === Object.keys(files).length

    if (!hasAllKeys || !hasEqualLength) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          path: [],
          message: 'Expected exactly these files: ' + this.input.files.join(', '),
        },
      ])
    }

    return files as Record<U, Buffer>
  }

  /**
   * Validates the success response of a request.
   *
   * @param success Any success response to validate.
   * @returns The parsed and validated success response.
   * @throws If the success response is invalid a `ZodError` is thrown.
   */
  public validateSuccess(success: unknown): z.infer<S> {
    return this.output.success.parse(success)
  }

  /**
   * Validates the failure response of a request.
   *
   * @param failure Any failure response to validate.
   * @returns The parsed and validated failure response.
   * @throws If the failure response is invalid a `ZodError` is thrown.
   */
  public validateFailure(failure: unknown): z.infer<F> {
    return this.output.failure.parse(failure)
  }

  /**
   * Validates the params of a request.
   *
   * @param params Any params to validate.
   * @returns The parsed and validated params.
   * @throws If the params are invalid a `ZodError` is thrown.
   */
  public validateParams(params: unknown): z.infer<P> {
    return this.input.params.parse(params)
  }
}
