import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
  ),
}))

vi.mock('@/http/get-product', () => ({
  getProduct: vi.fn().mockResolvedValue({
    id: 1,
    title: 'Camiseta doWhile 2022',
    description: 'Camiseta de alta qualidade da linha 2022',
    image: '/camiseta-dowhile-2022.png',
    slug: 'camiseta-dowhile-2022',
    price: 6900,
    featured: true,
  }),
}))

describe('Product Page', () => {
  it('renders product title', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(screen.getByText('Camiseta doWhile 2022')).toBeInTheDocument()
  })

  it('renders product description', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(
      screen.getByText('Camiseta de alta qualidade da linha 2022')
    ).toBeInTheDocument()
  })

  it('renders product price formatted in BRL', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(screen.getByText(/R\$ 6\.900/)).toBeInTheDocument()
  })

  it('renders installment text', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(screen.getByText(/Em até 12 x sem juros de/)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 575/)).toBeInTheDocument()
  })

  it('renders size buttons', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(screen.getByRole('button', { name: 'P' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'M' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'G' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'GG' })).toBeInTheDocument()
  })

  it('renders add to cart button', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    expect(
      screen.getByRole('button', { name: 'Adicionar ao carrinho' })
    ).toBeInTheDocument()
  })

  it('renders product image with correct alt', async () => {
    const { default: Product } = await import(
      '@/app/(store)/product/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'camiseta-dowhile-2022' })
    render(await Product({ params }))

    const image = screen.getByAltText('Camiseta doWhile 2022')
    expect(image).toBeInTheDocument()
  })
})
