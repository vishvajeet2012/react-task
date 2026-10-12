import type { ApiEnvelope } from './types'

const configuredBaseUrl = import.meta.env.VITE_FASTOR_API_URL?.trim()
const defaultBaseUrl = import.meta.env.DEV
  ? '/api'
  : 'https://staging.fastor.ai'

export const API_BASE_URL = (
  configuredBaseUrl || defaultBaseUrl
).replace(/\/+$/, '')

const REQUEST_TIMEOUT_MS = 12_000

export class ApiError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

function extractErrorMessage(payload: ApiEnvelope<unknown>) {
  if (payload.error_message) {
    return payload.error_message
  }

  if (Array.isArray(payload.error)) {
    const firstError = payload.error[0]
    if (
      firstError &&
      typeof firstError === 'object' &&
      'error' in firstError &&
      typeof firstError.error === 'string'
    ) {
      return firstError.error
    }
  }

  return 'Something went wrong. Please try again.'
}

export async function apiRequest<T>(path: string, init: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  )

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...init.headers,
      },
    })

    let payload: ApiEnvelope<T>

    try {
      payload = (await response.json()) as ApiEnvelope<T>
    } catch {
      throw new ApiError(
        'The server returned an invalid response. Please try again.',
        response.status,
      )
    }

    if (!response.ok || payload.status !== 'Success' || payload.data === undefined) {
      throw new ApiError(
        extractErrorMessage(payload),
        payload.status_code || response.status,
      )
    }

    return payload.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('The request timed out. Please try again.')
    }

    throw new ApiError('Unable to connect to Fastor. Check your connection and try again.')
  } finally {
    window.clearTimeout(timeoutId)
  }
}
