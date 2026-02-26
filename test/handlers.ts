import { HttpResponse, http } from 'msw'
import type { Product } from '@/types/product'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Camiseta Dev Store',
    description: 'Camiseta de alta qualidade',
    image: '/camiseta-dowhile-2022.png',
    slug: 'camiseta-dev-store',
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

export const handlers = [
  http.get('/api/products/featured', () => {
    return HttpResponse.json({ products: mockProducts })
  }),
]
