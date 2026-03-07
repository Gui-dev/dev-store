import type { Product } from '@/types/product'
import { api } from '@/utils/api'

export const searchProductsByQuery = async (
  query: string
): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  })
  const { products } = await response.json()

  return products
}
