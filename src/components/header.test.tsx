/// <reference types="vitest" />

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './header'

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />)

    expect(screen.getByText('Dev Store')).toBeInTheDocument()
  })

  it('renders logo with correct link', () => {
    render(<Header />)

    const logoLink = screen.getByTitle('Dev Store Home')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders search input', () => {
    render(<Header />)

    expect(screen.getByPlaceholderText('Buscar produto...')).toBeInTheDocument()
  })

  it('renders shopping cart with count', () => {
    render(<Header />)

    expect(screen.getByText('Carrinho (2)')).toBeInTheDocument()
  })

  it('renders account link with user image', () => {
    render(<Header />)

    expect(screen.getByText('Conta')).toBeInTheDocument()
    expect(screen.getByAltText('Bruce Wayne')).toBeInTheDocument()
  })
})
