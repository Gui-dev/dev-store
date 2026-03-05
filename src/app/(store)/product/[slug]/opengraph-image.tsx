import { ImageResponse } from 'next/og'
import { getProduct } from '@/http/get-product'
import { env } from '@/utils/env'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface IImageProps {
  params: Promise<{ slug: string }>
}

export default async function OgImage({ params }: IImageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  const productImageUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    <div
      style={{
        background: '#09090b', // zinc-950 equivalente
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={productImageUrl}
        alt={product.title}
        style={{ width: '100%' }}
      />
    </div>,
    {
      ...size,
    }
  )
}
