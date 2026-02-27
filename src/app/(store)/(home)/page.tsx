import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProduct } from '@/http/get-featured-product'

const Store = async () => {
  const [starProduct, ...otherProducts] = await getFeaturedProduct()

  return (
    <div className="grid max-h-215 grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/products/${starProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          src={starProduct.image}
          width={920}
          height={920}
          quality={100}
          alt={starProduct.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-28 bottom-28 flex h-12 max-w-70 items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="truncate text-sm" title="Camiseta doWhile 2022">
            {starProduct.title}
          </span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {starProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map(product => {
        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative col-span-3 row-span-3 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
          >
            <Image
              src={product.image}
              width={920}
              height={920}
              quality={100}
              alt={product.title}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute right-10 bottom-10 flex h-12 max-w-70 items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="truncate text-sm" title="Camiseta doWhile 2022">
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
  )
}

export default Store
