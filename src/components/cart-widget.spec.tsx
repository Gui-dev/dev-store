import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CartWidget } from './cart-widget'

vi.mock('@/contexts/cart-context', () => ({
  useCart: vi.fn(() => ({
    items: [],
  })),
}))

describe('CartWidget', () => {
  it('should render cart with zero items', () => {
    render(<CartWidget />)

    expect(screen.getByText(/carrinho \(0\)/i)).toBeInTheDocument()
  })

  it('should render cart with item count', async () => {
    const { useCart } = await import('@/contexts/cart-context')
    vi.mocked(useCart).mockReturnValue({
      items: [{ productId: 1, quantity: 2 }],
      addToCart: vi.fn(),
    })

    render(<CartWidget />)

    expect(screen.getByText(/carrinho \(1\)/i)).toBeInTheDocument()
  })

  it('should render cart with multiple different items', async () => {
    const { useCart } = await import('@/contexts/cart-context')
    vi.mocked(useCart).mockReturnValue({
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
      addToCart: vi.fn(),
    })

    render(<CartWidget />)

    expect(screen.getByText(/carrinho \(2\)/i)).toBeInTheDocument()
  })
})
