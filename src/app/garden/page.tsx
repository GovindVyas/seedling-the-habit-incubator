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
import PageTransition from '@/components/PageTransition'
import { motion } from 'framer-motion'

export default function GardenPage() {
  const { habits } = useHabits()

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-primary">Your Habit Garden</h1>
        <p className="text-lg mb-8">Watch your habits grow into beautiful plants!</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-secondary">
                  <CardTitle>{habit.name}</CardTitle>
                  <CardDescription>{habit.frequency}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-6">
                  <div className="w-32 h-32 mb-4">
                    <Plant stage={habit.plantStage} size={128} />
                  </div>
                  <p className="text-sm text-muted-foreground">Streak: {habit.streak} days</p>
                  <p className="text-sm text-muted-foreground">Plant Stage: {habit.plantStage}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}