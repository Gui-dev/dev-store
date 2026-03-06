import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchForm } from './search-form'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

describe('SearchForm', () => {
  it('should render search input with placeholder', () => {
    render(<SearchForm />)

    expect(screen.getByPlaceholderText(/buscar produto/i)).toBeInTheDocument()
  })

  it('should render search icon (svg)', () => {
    render(<SearchForm />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should have input with correct name', () => {
    render(<SearchForm />)

    const input = screen.getByPlaceholderText(/buscar produto/i)
    expect(input).toHaveAttribute('name', 'query')
  })
})
