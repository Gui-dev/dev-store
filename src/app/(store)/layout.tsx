import type { ReactNode } from 'react'
import { Header } from '@/components/header'

interface StoreLayoutProps {
  children: ReactNode
}

const StoreLayout = ({ children }: StoreLayoutProps) => {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-400 grid-rows-[min-content_max-content] gap-5 p-8">
      <Header />
      {children}
    </div>
  )
}

export default StoreLayout
