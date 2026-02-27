import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
  ),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}))

vi.mock('@/http/get-featured-product', () => ({
  getFeaturedProduct: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Camiseta doWhile 2022',
      description: 'Camiseta de alta qualidade',
      image: '/camiseta-dowhile-2022.png',
      slug: 'camiseta-dowhile-2022',
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
    {
      id: 3,
      title: 'Boné Tech',
      description: 'Boné moderno',
      image: '/bone-tech.png',
      slug: 'bone-tech',
      price: 3900,
      featured: true,
    },
  ]),
}))

describe('Home Page', () => {
  it('renders star product with correct link', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    const starProductLink = screen.getByRole('link', {
      name: /camiseta dowhile/i,
    })
    expect(starProductLink).toHaveAttribute(
      'href',
      '/products/camiseta-dowhile-2022'
    )
  })

  it('renders star product image with correct alt', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    const image = screen.getByAltText('Camiseta doWhile 2022')
    expect(image).toBeInTheDocument()
  })

  it('renders star product price formatted in BRL', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    expect(screen.getByText(/R\$ 6\.900/)).toBeInTheDocument()
  })

  it('renders secondary products', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    expect(screen.getByText('Moletom IA')).toBeInTheDocument()
    expect(screen.getByText('Boné Tech')).toBeInTheDocument()
  })

  it('renders secondary products with correct links', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    const links = screen.getAllByTestId('next-link')
    expect(links).toHaveLength(3)
    expect(links[1]).toHaveAttribute('href', '/products/moletom-ia')
    expect(links[2]).toHaveAttribute('href', '/products/bone-tech')
  })

  it('renders secondary products prices formatted in BRL', async () => {
    const { default: Store } = await import('@/app/(store)/(home)/page')
    render(await Store())

    expect(screen.getByText(/R\$ 12\.900/)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 3\.900/)).toBeInTheDocument()
  })
})
