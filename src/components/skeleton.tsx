import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ISkeletonProps extends ComponentProps<'div'> {}

export const Skeleton = ({ className, ...rest }: ISkeletonProps) => {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-zinc-50/10', className)}
      {...rest}
    />
  )
}
