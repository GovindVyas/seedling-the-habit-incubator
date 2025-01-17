import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import HabitDetailPage from '@/components/HabitDetailPage'

export const dynamic = 'force-dynamic'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <HabitDetailPage id={params.id} />
    </Suspense>
  )
}