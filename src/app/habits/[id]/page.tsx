'use client'

import { useParams } from 'next/navigation'
import { useHabits } from '@/contexts/HabitContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Plant from '@/components/Plant'
import HabitProgressGraph from '@/components/HabitProgressGraph'
import PageTransition from '@/components/PageTransition'

export default function HabitDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const { habits, getHabitStats } = useHabits()
  const habit = habits.find(h => h.id === id)

  if (!habit) {
    return <div>Habit not found</div>
  }

  const { totalCheckIns, successRate } = getHabitStats(habit.id)

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">{habit.name}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Habit Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Description:</strong> {habit.description}</p>
              <p><strong>Frequency:</strong> {habit.frequency}</p>
              <p><strong>Streak:</strong> {habit.streak} days</p>
              <p><strong>Total Check-ins:</strong> {totalCheckIns}</p>
              <div className="mt-4">
                <p><strong>Success Rate:</strong></p>
                <Progress value={successRate} className="mt-2" />
                <p className="text-right text-sm mt-1">{successRate.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plant Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Plant stage={habit.plantStage} size={200} />
              <p className="mt-4"><strong>Plant Stage:</strong> {habit.plantStage}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitProgressGraph habitId={habit.id} />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}