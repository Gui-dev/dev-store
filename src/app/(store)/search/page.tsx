import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { searchProductsByQuery } from '@/http/search-products-by-query'

interface ISearchProps {
  searchParams: Promise<{ q: string }>
}

const Search = async ({ searchParams }: ISearchProps) => {
  const { q } = await searchParams
  const query = z.string().parse(q)

  if (!query) {
    redirect('/')
  }

  const products = await searchProductsByQuery(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para busca por:{' '}
        <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map(product => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
            >
              <Image
                src={product.image}
                width={480}
                height={480}
                quality={100}
                alt={product.title}
                className="transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute right-10 bottom-10 flex h-12 max-w-70 items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span
                  className="truncate text-sm"
                  title="Camiseta doWhile 2022"
                >
                  {product.title}
                </span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Search
