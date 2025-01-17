import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const DynamicHome = dynamic(() => import('@/components/Home'), {
  loading: () => <Skeleton className="w-full h-64" />,
})

export default function HomePage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <DynamicHome />
    </Suspense>
  )
}