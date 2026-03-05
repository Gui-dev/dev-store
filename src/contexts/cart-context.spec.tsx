import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CartProvider, useCart } from './cart-context'

const TestComponent = () => {
  const { items, addToCart } = useCart()

  return (
    <div>
      <span data-testid="item-count">{items.length}</span>
      <button
        type="button"
        data-testid="add-product-1"
        onClick={() => addToCart(1)}
      >
        Add Product 1
      </button>
      <button
        type="button"
        data-testid="add-product-2"
        onClick={() => addToCart(2)}
      >
        Add Product 2
      </button>
      {items.map(item => (
        <div key={item.productId} data-testid={`item-${item.productId}`}>
          {item.productId}: {item.quantity}
        </div>
      ))}
    </div>
  )
}

describe('CartProvider', () => {
  it('should initialize with empty items', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('item-count').textContent).toBe('0')
  })

  it('should add new item to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    screen.getByTestId('add-product-1').click()

    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('1')
    })
    expect(screen.getByTestId('item-1').textContent).toBe('1: 1')
  })

  it('should increment quantity when adding existing item', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    screen.getByTestId('add-product-1').click()
    await waitFor(() => {
      expect(screen.getByTestId('item-1').textContent).toBe('1: 1')
    })

    screen.getByTestId('add-product-1').click()
    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('1')
    })
    expect(screen.getByTestId('item-1').textContent).toBe('1: 2')
  })

  it('should add multiple different products', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    screen.getByTestId('add-product-1').click()
    await waitFor(() => {
      expect(screen.getByTestId('item-1').textContent).toBe('1: 1')
    })

    screen.getByTestId('add-product-2').click()
    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('2')
    })
    expect(screen.getByTestId('item-1').textContent).toBe('1: 1')
    expect(screen.getByTestId('item-2').textContent).toBe('2: 1')
  })
})

describe('usaeCart', () => {
  it('should throw error when used outside CartProvider', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow()

    error.mockRestore()
  })
})
