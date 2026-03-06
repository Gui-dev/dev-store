import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from './api'

vi.mock('@/utils/env', () => ({
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000',
    APP_URL: 'http://localhost:3000',
  },
}))

describe('api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should call fetch with correct URL', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{}'))

    await api('/products')

    const fetchCall = vi.mocked(fetch).mock.calls[0]
    expect(fetchCall[0].toString()).toBe('http://localhost:3000/api/products')
  })

  it('should pass init options to fetch', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{}'))

    await api('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const fetchCall = vi.mocked(fetch).mock.calls[0]
    expect(fetchCall[0].toString()).toBe('http://localhost:3000/api/products')
    expect(fetchCall[1]).toEqual({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  })

  it('should construct URL with query parameters', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{}'))

    await api('/products?featured=true')

    const fetchCall = vi.mocked(fetch).mock.calls[0]
    expect(fetchCall[0].toString()).toBe(
      'http://localhost:3000/api/products?featured=true'
    )
  })
})
