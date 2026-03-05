import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartWidget } from './cart-widget'

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" title="Dev Store Home">
          <h1 className="font-extrabold text-2xl text-white">Dev Store</h1>
        </Link>
        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          <Search className="size-5 text-zinc-500" />
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            placeholder="Buscar produto..."
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />
        <div className="h-4 w-px bg-zinc-700" />

        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span>Conta</span>
          <Image
            src={'https://github.com/BruceWayneX.png'}
            alt="Bruce Wayne"
            width={24}
            height={24}
            className="size-6 rounded-full"
          />
        </Link>
      </div>
    </header>
  )
}
