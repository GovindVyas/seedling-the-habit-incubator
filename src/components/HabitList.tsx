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
import { CheckCircle, XCircle, Trash2, Info } from 'lucide-react'
import Link from 'next/link'

const HabitList: React.FC = () => {
  const { habits, deleteHabit, checkInHabit, getHabitStats } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  return (
    <ul className="grid gap-6 md:grid-cols-2" role="list">
      {habits.map((habit) => {
        const { totalCheckIns, successRate } = getHabitStats(habit.id);
        const checkedInToday = habit.checkIns.some(ci => ci.date === today);

        return (
          <li key={habit.id}>
            <Card className="overflow-hidden h-full">
              <CardHeader className="bg-secondary">
                <CardTitle>{habit.name}</CardTitle>
                <CardDescription>{habit.frequency}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
                <dl className="mb-4">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Streak:</dt>
                    <dd className="text-sm text-muted-foreground">{habit.streak} days</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Plant Stage:</dt>
                    <dd className="text-sm text-muted-foreground">{habit.plantStage}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium">Total Check-ins:</dt>
                    <dd className="text-sm text-muted-foreground">{totalCheckIns}</dd>
                  </div>
                </dl>
                <div className="mb-2">
                  <p className="text-sm font-medium">Success Rate:</p>
                  <Progress value={successRate} className="mt-1" aria-label={`Success rate: ${successRate.toFixed(1)}%`} />
                  <p className="text-right text-sm">{successRate.toFixed(1)}%</p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted flex justify-between">
                {!checkedInToday && (
                  <>
                    <Button 
                      onClick={() => checkInHabit(habit.id, true)}
                      className="flex items-center"
                      size="sm"
                      aria-label={`Complete ${habit.name}`}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      Complete
                    </Button>
                    <Button 
                      onClick={() => checkInHabit(habit.id, false)}
                      variant="outline"
                      className="flex items-center"
                      size="sm"
                      aria-label={`Skip ${habit.name}`}
                    >
                      <XCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      Skip
                    </Button>
                  </>
                )}
                {checkedInToday && (
                  <p className="text-sm text-muted-foreground">Already checked in today</p>
                )}
                <Button 
                  variant="destructive" 
                  onClick={() => deleteHabit(habit.id)}
                  size="sm"
                  className="flex items-center"
                  aria-label={`Delete ${habit.name}`}
                >
                  <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  asChild
                >
                  <Link href={`/habits/${habit.id}`} aria-label={`View details for ${habit.name}`}>
                    <Info className="mr-2 h-4 w-4" aria-hidden="true" />
                    Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default HabitList;