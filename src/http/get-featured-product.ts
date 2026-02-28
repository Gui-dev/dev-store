import type { Product } from '@/types/product'
import { api } from '@/utils/api'

export const getFeaturedProduct = async (): Promise<Product[]> => {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })
  const { products } = await response.json()

  return products
}
