import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AddToCartButton } from './add-to-cart-button'

vi.mock('@/contexts/cart-context', () => ({
  useCart: vi.fn(() => ({
    addToCart: vi.fn(),
  })),
}))

describe('AddToCartButton', () => {
  it('should render add to cart button', () => {
    render(<AddToCartButton productId={1} />)

    expect(
      screen.getByRole('button', { name: /adicionar ao carrinho/i })
    ).toBeInTheDocument()
  })

  it('should call addToCart with productId when clicked', async () => {
    const addToCart = vi.fn()
    const { useCart } = await import('@/contexts/cart-context')
    vi.mocked(useCart).mockReturnValue({ addToCart, items: [] })

    render(<AddToCartButton productId={1} />)

    fireEvent.click(
      screen.getByRole('button', { name: /adicionar ao carrinho/i })
    )

    expect(addToCart).toHaveBeenCalledWith(1)
  })
})
