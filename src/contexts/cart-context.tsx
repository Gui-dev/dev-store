'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'

interface ICartItem {
  productId: number
  quantity: number
}

interface ICartContextProps {
  items: ICartItem[]
  addToCart: (productId: number) => void
}

interface ICartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as ICartContextProps)

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  const addToCart = (productId: number) => {
    setCartItems(state => {
      const productInCart = state.find(item => item.productId === productId)

      if (productInCart) {
        return state.map(item => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...state, { productId, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
