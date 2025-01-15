'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useHabits } from '@/contexts/HabitContext'
import { useToast } from "@/hooks/use-toast"

export default function DummyDataLoader() {
  const { addMultipleHabits, checkInHabit } = useHabits()
  const { toast } = useToast()

  const loadDummyData = () => {
    const dummyHabits = [
      {
        name: "Meditation",
        description: "Daily morning meditation practice",
        frequency: "daily" as const
      },
      {
        name: "Reading",
        description: "Read for 30 minutes",
        frequency: "daily" as const
      },
      {
        name: "Exercise",
        description: "30 minutes workout",
        frequency: "daily" as const
      },
      {
        name: "Drink Water",
        description: "Drink 8 glasses of water",
        frequency: "daily" as const
      }
    ];

    addMultipleHabits(dummyHabits);

    setTimeout(() => {
      const habits = JSON.parse(localStorage.getItem('habits') || '[]');
      const today = new Date();

      habits.forEach((habit: { id: string, name: string }) => {
        let checkInDays = 0;
        switch (habit.name) {
          case "Meditation":
            checkInDays = 10;
            break;
          case "Reading":
            checkInDays = 5;
            break;
          case "Exercise":
            checkInDays = 3;
            break;
          case "Drink Water":
            checkInDays = 1;
            break;
        }

        for (let i = 0; i < checkInDays; i++) {
          const checkInDate = new Date(today);
          checkInDate.setDate(checkInDate.getDate() - i);
          const dateString = checkInDate.toISOString().split('T')[0];
          checkInHabit(habit.id, true, dateString);
        }
      });

      toast({
        title: "Example data loaded",
        description: "4 habits with various streaks have been added.",
      })
    }, 500);
  }

  return (
    <Button 
      onClick={loadDummyData}
      variant="outline"
      className="mb-4"
    >
      Load Example Data
    </Button>
  )
}