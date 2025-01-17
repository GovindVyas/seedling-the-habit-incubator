import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import GardenPage from '@/components/GardenPage'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <GardenPage />
    </Suspense>
  )
}