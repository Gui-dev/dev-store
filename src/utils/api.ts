import { env } from './env'

export const api = (url: string, init?: RequestInit) => {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPreFix = '/api'
  const urlPath = new URL(apiPreFix.concat(url), baseUrl)

  return fetch(urlPath, init)
}
