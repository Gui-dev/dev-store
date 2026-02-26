import data from './data.json'

export const GET = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return Response.json({ products: data.products })
}
