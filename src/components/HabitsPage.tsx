'use client'

import React, { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { useHabits } from '@/contexts/HabitContext'
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageTransition from '@/components/PageTransition'
import dynamic from 'next/dynamic'

const DummyDataLoader = dynamic(() => import('@/components/DummyDataLoader'), {
  ssr: false,
})

const HabitForm = dynamic(() => import('@/components/HabitForm'), {
  ssr: false,
})

const HabitList = dynamic(() => import('@/components/HabitList'), {
  ssr: false,
})

const StatsDashboard = dynamic(() => import('@/components/StatsDashboard'), {
  ssr: false,
})

const Achievements = dynamic(() => import('@/components/Achievements'), {
  ssr: false,
})

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
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Your Habits</h1>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Habit List</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Add New Habit</h2>
              <Suspense fallback={<p>Loading habit form...</p>}>
                <HabitForm />
              </Suspense>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Habits</h2>
              <Suspense fallback={<p>Loading habits...</p>}>
                <HabitList />
              </Suspense>
            </div>
          </TabsContent>
          <TabsContent value="stats">
            <h2 className="text-2xl font-semibold mb-4">Habit Statistics</h2>
            <Suspense fallback={<p>Loading statistics...</p>}>
              <StatsDashboard />
            </Suspense>
          </TabsContent>
          <TabsContent value="achievements">
            <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
            <Suspense fallback={<p>Loading achievements...</p>}>
              <Achievements />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}