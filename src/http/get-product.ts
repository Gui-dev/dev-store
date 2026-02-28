import type { Product } from '@/types/product'
import { api } from '@/utils/api'

export const getProduct = async (slug: string): Promise<Product> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  })
  const { product } = await response.json()

  return product
}
