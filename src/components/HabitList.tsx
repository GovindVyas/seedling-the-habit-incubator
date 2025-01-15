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
import { CheckCircle, XCircle, Trash2 } from 'lucide-react'

const HabitList: React.FC = () => {
  const { habits, deleteHabit, checkInHabit, getHabitStats } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {habits.map((habit) => {
        const { totalCheckIns, successRate } = getHabitStats(habit.id);
        const checkedInToday = habit.checkIns.some(ci => ci.date === today);

        return (
          <Card key={habit.id} className="overflow-hidden">
            <CardHeader className="bg-green-50">
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>{habit.frequency}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-2">{habit.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium">Streak: {habit.streak} days</p>
                <p className="text-sm font-medium">Plant Stage: {habit.plantStage}</p>
                <p className="text-sm font-medium">Total Check-ins: {totalCheckIns}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium">Success Rate:</p>
                <Progress value={successRate} className="mt-1" />
                <p className="text-right text-sm">{successRate.toFixed(1)}%</p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-between">
              {!checkedInToday && (
                <>
                  <Button 
                    onClick={() => checkInHabit(habit.id, true)}
                    className="flex items-center"
                    size="sm"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                  <Button 
                    onClick={() => checkInHabit(habit.id, false)}
                    variant="outline"
                    className="flex items-center"
                    size="sm"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Skip
                  </Button>
                </>
              )}
              {checkedInToday && (
                <p className="text-sm text-gray-600">Already checked in today</p>
              )}
              <Button 
                variant="destructive" 
                onClick={() => deleteHabit(habit.id)}
                size="sm"
                className="flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default HabitList;