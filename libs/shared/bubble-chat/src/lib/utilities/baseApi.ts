export type ApiHeaders = {
  apiKey: string
  apiSecret: string
  appId: string
  session: string
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export class BaseApiRequest {
  private baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public get = async (
    url: string,
    apiHeaders: ApiHeaders,
    signal?: AbortSignal,
  ) => {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiHeaders.apiKey,
          'x-api-secret': apiHeaders.apiSecret,
          'x-app-id': apiHeaders.appId,
          'x-session': apiHeaders.session,
          Accept: 'application/json',
        },
        signal,
      })

      return response
    } catch (error) {
      throw new ApiError('Network error occurred')
    }
  }

  public post = async <TData extends BodyInit | Record<string, unknown>>(
    url: string,
    data: TData,
    headers: Record<string, unknown> & ApiHeaders,
    signal?: AbortSignal,
    options?: {
      isFormData: boolean
    },
  ) => {
    try {
      const { apiKey, apiSecret, appId, session, ...restHeaders } = headers
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...restHeaders,
          'x-api-key': apiKey,
          'x-api-secret': apiSecret,
          'x-app-id': appId,
          'x-session': session,
        },
        body: options?.isFormData
          ? (data as BodyInit)
          : (JSON.stringify(data) as BodyInit),
        signal,
        ...options,
      })

      return response
    } catch (error) {
      throw new ApiError('Network error occurred')
    }
  }
}
