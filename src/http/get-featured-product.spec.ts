import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/types/product'
import { getFeaturedProduct } from './get-featured-product'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Camiseta doWhile 2022',
    description: 'Camiseta de alta qualidade',
    image: '/camiseta-dowhile-2022.png',
    slug: 'camiseta-dowhile-2022',
    price: 6900,
    featured: true,
  },
  {
    id: 2,
    title: 'Moletom IA',
    description: 'Moletom confortável com estampa de IA',
    image: '/moletom-ia-p-devs.png',
    slug: 'moletom-ia',
    price: 12900,
    featured: true,
  },
]

const createMockResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

vi.mock('@/utils/env', () => ({
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000',
  },
}))

vi.mock('@/utils/api', () => ({
  api: vi.fn(),
}))

import { api } from '@/utils/api'

describe('getFeaturedProduct', () => {
  it('should return featured products', async () => {
    vi.mocked(api).mockResolvedValue(
      createMockResponse({ products: mockProducts })
    )

    const products = await getFeaturedProduct()

    expect(products).toHaveLength(2)
    expect(products[0].title).toBe('Camiseta doWhile 2022')
    expect(products[0].price).toBe(6900)
    expect(products[1].title).toBe('Moletom IA')
    expect(products[1].price).toBe(12900)
  })

  it('should return undefined when API returns error', async () => {
    vi.mocked(api).mockResolvedValue(
      createMockResponse({ error: 'Error' }, 500)
    )

    const products = await getFeaturedProduct()

    expect(products).toBeUndefined()
  })
})
