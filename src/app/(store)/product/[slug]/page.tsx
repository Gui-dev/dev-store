import Image from 'next/image'
import { getProduct } from '@/http/get-product'

interface ProductProps {
  params: Promise<{ slug: string }>
}

const Product = async ({ params }: ProductProps) => {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <div className="relative grid max-h-215 grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          width={1000}
          height={1000}
          quality={100}
          alt="Camiseta doWhile 2022"
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="truncate font-bold text-3xl leading-tight">
          {product.title}
        </h1>
        <p className="mt-2 text-zinc-400 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12 x sem juros de
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              GG
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default Product
