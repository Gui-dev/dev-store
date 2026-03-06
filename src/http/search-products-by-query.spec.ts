import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/types/product'
import { searchProductsByQuery } from './search-products-by-query'

vi.mock('@/utils/api', () => ({
  api: vi.fn(),
}))

describe('searchProductsByQuery', () => {
  it('should return products array', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Camiseta',
        description: 'Description',
        image: '/image.png',
        slug: 'camiseta',
        price: 100,
        featured: true,
      },
    ]

    const { api } = await import('@/utils/api')
    vi.mocked(api).mockResolvedValue(
      new Response(JSON.stringify({ products: mockProducts }), {
        headers: { 'Content-Type': 'application/json' },
      })
    )

    const result = await searchProductsByQuery('camiseta')

    expect(result).toEqual(mockProducts)
  })

  it('should call API with correct query parameter', async () => {
    const { api } = await import('@/utils/api')
    vi.mocked(api).mockResolvedValue(
      new Response(JSON.stringify({ products: [] }), {
        headers: { 'Content-Type': 'application/json' },
      })
    )

    await searchProductsByQuery('test')

    expect(api).toHaveBeenCalledWith('/products/search?q=test', {
      next: { revalidate: 60 * 60 },
    })
  })

  it('should return empty array when no products found', async () => {
    const { api } = await import('@/utils/api')
    vi.mocked(api).mockResolvedValue(
      new Response(JSON.stringify({ products: [] }), {
        headers: { 'Content-Type': 'application/json' },
      })
    )

    const result = await searchProductsByQuery('nonexistent')

    expect(result).toEqual([])
  })
})
