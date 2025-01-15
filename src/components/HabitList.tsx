'use client'

import React from 'react';
import { useHabits } from '@/contexts/HabitContext';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, XCircle } from 'lucide-react'

const HabitList: React.FC = () => {
  const { habits, deleteHabit, checkInHabit, getHabitStats } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => {
        const { totalCheckIns, successRate } = getHabitStats(habit.id);
        const checkedInToday = habit.checkIns.some(ci => ci.date === today);

        return (
          <Card key={habit.id}>
            <CardHeader>
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>{habit.frequency}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{habit.description}</p>
              <div className="mt-4">
                <p>Streak: {habit.streak} days</p>
                <p>Plant Stage: {habit.plantStage}</p>
                <p>Total Check-ins: {totalCheckIns}</p>
                <div className="mt-2">
                  <p>Success Rate:</p>
                  <Progress value={successRate} className="mt-1" />
                  <p className="text-right text-sm">{successRate.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {!checkedInToday && (
                <>
                  <Button 
                    onClick={() => checkInHabit(habit.id, true)}
                    className="flex items-center"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                  <Button 
                    onClick={() => checkInHabit(habit.id, false)}
                    variant="outline"
                    className="flex items-center"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Skip
                  </Button>
                </>
              )}
              {checkedInToday && (
                <p>Already checked in today</p>
              )}
              <Button variant="destructive" onClick={() => deleteHabit(habit.id)}>Delete</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default HabitList;