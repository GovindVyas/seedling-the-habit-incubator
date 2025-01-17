import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import HabitDetailPage from '@/components/HabitDetailPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-64" />}>
      <HabitDetailPage id={params.id} />
    </Suspense>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Habit Details - ${params.id}`,
  }
}