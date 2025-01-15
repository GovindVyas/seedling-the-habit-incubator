'use client'

import { useHabits } from '@/contexts/HabitContext'
import Plant from '@/components/Plant'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function GardenPage() {
  const { habits } = useHabits()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Your Habit Garden</h1>
      <p className="text-lg mb-8">Watch your habits grow into beautiful plants!</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden">
            <CardHeader className="bg-green-50">
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>{habit.frequency}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
              <div className="w-32 h-32 mb-4">
                <Plant stage={habit.plantStage} size={128} />
              </div>
              <p className="text-sm text-gray-600">Streak: {habit.streak} days</p>
              <p className="text-sm text-gray-600">Plant Stage: {habit.plantStage}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}