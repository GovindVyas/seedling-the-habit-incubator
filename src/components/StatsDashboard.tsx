'use client'

import React from 'react';
import { useHabits } from '@/contexts/HabitContext';
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const StatsDashboard: React.FC = () => {
  const { habits, getHabitStats } = useHabits();

  const totalHabits = habits.length;
  const totalCheckIns = habits.reduce((sum, habit) => sum + habit.checkIns.length, 0);
  const totalSuccessfulCheckIns = habits.reduce((sum, habit) => 
    sum + habit.checkIns.filter(ci => ci.completed).length, 0);
  const overallSuccessRate = totalCheckIns > 0 ? (totalSuccessfulCheckIns / totalCheckIns) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalHabits}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalCheckIns}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Overall Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={overallSuccessRate} className="mt-2" />
          <p className="text-right text-sm mt-1">{overallSuccessRate.toFixed(1)}%</p>
        </CardContent>
      </Card>
      {habits.map(habit => {
        const { totalCheckIns, successRate } = getHabitStats(habit.id);
        return (
          <Card key={habit.id}>
            <CardHeader>
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>Success Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={successRate} className="mt-2" />
              <p className="text-right text-sm mt-1">{successRate.toFixed(1)}%</p>
              <p className="mt-2">Total Check-ins: {totalCheckIns}</p>
              <p>Current Streak: {habit.streak} days</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsDashboard;