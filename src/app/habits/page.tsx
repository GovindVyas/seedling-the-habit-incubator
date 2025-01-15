'use client'

import React from 'react'
import HabitForm from '@/components/HabitForm'
import HabitList from '@/components/HabitList'
import StatsDashboard from '@/components/StatsDashboard'
import DummyDataLoader from '@/components/DummyDataLoader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useHabits } from '@/contexts/HabitContext'
import { useToast } from "@/hooks/use-toast"

export default function HabitsPage() {
  const { habits, deleteHabit } = useHabits()
  const { toast } = useToast()

  const clearAllData = () => {
    habits.forEach(habit => deleteHabit(habit.id))
    toast({
      title: "All data cleared",
      description: "All habits and their data have been removed.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-green-600">Manage Your Habits</h1>
      <div className="flex space-x-4 mb-8">
        <DummyDataLoader />
        <Button 
          onClick={clearAllData}
          variant="destructive"
        >
          Clear All Data
        </Button>
      </div>
      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Habit List</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Add New Habit</h2>
            <HabitForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Habits</h2>
            <HabitList />
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <h2 className="text-2xl font-semibold mb-4">Habit Statistics</h2>
          <StatsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}