import type { ReactNode } from 'react'
import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'

interface StoreLayoutProps {
  children: ReactNode
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-400 grid-rows-[min-content_max-content] gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}

export default StoreLayout
