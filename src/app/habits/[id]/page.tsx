import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import HabitDetailPage from '@/components/HabitDetailPage'

export const dynamic = 'force-dynamic'

interface PageParams {
  id: string;
}

interface Props {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <HabitDetailPage id={params.id} />
    </Suspense>
  )
}