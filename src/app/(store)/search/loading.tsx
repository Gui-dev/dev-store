import { Skeleton } from '@/components/skeleton'

const SearchLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-5 w-64" />

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(id => (
          <div
            key={`search-skeleton-${id}`}
            className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
          >
            <Skeleton className="h-80 w-80" />

            <div className="absolute right-10 bottom-10 flex max-w-70 items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-full w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchLoading
