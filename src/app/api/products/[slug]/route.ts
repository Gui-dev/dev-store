import { z } from 'zod'
import data from './../data.json'

interface ProductParams {
  params: Promise<{ slug: string }>
}

export const GET = async (_request: Request, { params }: ProductParams) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const { slug } = await params
  const parsedSlug = z.string().parse(slug)

  const product = data.products.find(product => product.slug === parsedSlug)

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 400 })
  }

  return Response.json({ product })
}
