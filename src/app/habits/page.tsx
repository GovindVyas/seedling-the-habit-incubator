import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import HabitsPage from '@/components/HabitsPage'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <HabitsPage />
    </Suspense>
  )
}