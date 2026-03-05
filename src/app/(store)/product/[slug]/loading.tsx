import { Skeleton } from '@/components/skeleton'

const LoadingProductDetails = () => {
  return (
    <div className="relative grid max-h-215 grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col justify-center space-y-6 px-12">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-14 rounded-full" />
            <Skeleton className="h-9 w-14 rounded-full" />
            <Skeleton className="h-9 w-14 rounded-full" />
            <Skeleton className="h-9 w-14 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-14 w-full rounded-full" />
      </div>
    </div>
  )
}

export default LoadingProductDetails
