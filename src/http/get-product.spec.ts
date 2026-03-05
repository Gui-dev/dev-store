import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/types/product'
import { api } from '@/utils/api'
import { getProduct } from './get-product'

const mockProduct: Product = {
  id: 1,
  title: 'Camiseta doWhile 2022',
  description: 'Camiseta de alta qualidade',
  image: '/camiseta-dowhile-2022.png',
  slug: 'camiseta-dowhile-2022',
  price: 6900,
  featured: true,
}

const createMockResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

vi.mock('@/utils/env', () => ({
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000',
    APP_URL: 'http://localhost:3000',
  },
}))

vi.mock('@/utils/api', () => ({
  api: vi.fn(),
}))

describe('getProduct', () => {
  it('should return product by slug', async () => {
    vi.mocked(api).mockResolvedValue(
      createMockResponse({ product: mockProduct })
    )

    const product = await getProduct('camiseta-dowhile-2022')

    expect(product).toEqual(mockProduct)
    expect(api).toHaveBeenCalledWith('/products/camiseta-dowhile-2022', {
      next: { revalidate: 60 * 60 },
    })
  })

  it('should return undefined when API returns error', async () => {
    vi.mocked(api).mockResolvedValue(
      createMockResponse({ error: 'Not Found' }, 404)
    )

    const product = await getProduct('invalid-slug')

    expect(product).toBeUndefined()
  })
})
