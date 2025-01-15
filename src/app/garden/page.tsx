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
  const { habits } = useHabits();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Your Habit Garden</h1>
      <p className="text-lg mb-8">Watch your habits grow into beautiful plants!</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader>
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>{habit.frequency}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Plant stage={habit.plantStage} size={100} />
              <p className="mt-4">Streak: {habit.streak} days</p>
              <p>Plant Stage: {habit.plantStage}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}