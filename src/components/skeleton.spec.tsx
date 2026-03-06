import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('should render skeleton element', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('div')
    expect(skeleton).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.querySelector('div')
    expect(skeleton).toHaveClass('custom-class')
  })

  it('should apply default animation class', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('div')
    expect(skeleton).toHaveClass('animate-pulse')
  })
})
