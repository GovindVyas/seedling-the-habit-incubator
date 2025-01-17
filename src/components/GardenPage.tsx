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
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function GardenPage() {
  const { habits } = useHabits()
  const [selectedHabit, setSelectedHabit] = useState<any>(null)

  const gridColumns = Math.ceil(Math.sqrt(habits.length))

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-primary">Your Habit Garden</h1>
        <p className="text-lg mb-8">Watch your habits grow into beautiful plants!</p>
        <div 
          className="grid gap-6" 
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
          }}
        >
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer" 
                onClick={() => setSelectedHabit(habit)}
              >
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
      <Dialog open={!!selectedHabit} onOpenChange={() => setSelectedHabit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedHabit?.name}</DialogTitle>
            <DialogDescription>
              Frequency: {selectedHabit?.frequency}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Plant stage={selectedHabit?.plantStage || 0} size={200} />
            <p className="mt-4">Streak: {selectedHabit?.streak} days</p>
            <p>Plant Stage: {selectedHabit?.plantStage}</p>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  )
}