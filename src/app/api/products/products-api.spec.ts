import { describe, expect, it } from 'vitest'
import { GET } from './route'

describe('GET /api/products', () => {
  it('should return products list', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('products')
    expect(Array.isArray(data.products)).toBe(true)
  })

  it('should return all products from data.json', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data.products).toHaveLength(5)
    expect(data.products[0]).toEqual({
      id: 1,
      title: 'Moletom Never Stop Learning',
      slug: 'moletom-never-stop-learning',
      price: 129,
      image: '/moletom-never-stop-learning.png',
      description: 'Moletom fabricado com 88% de algodão e 12% de poliéster.',
      featured: true,
    })
  })
})
