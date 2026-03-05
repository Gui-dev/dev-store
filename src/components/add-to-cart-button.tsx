'use client'

import { useCart } from '@/contexts/cart-context'

interface AddToCartButtonProps {
  productId: number
}

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-colors hover:bg-emerald-700"
      onClick={handleAddToCart}
    >
      Adicionar ao carrinho
    </button>
  )
}
