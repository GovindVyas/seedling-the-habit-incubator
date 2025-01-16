'use client'

import React, { createContext, useState, useEffect, useContext } from 'react';

interface CheckIn {
  date: string;
  completed: boolean;
}

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  plantStage: number;
  streak: number;
  checkIns: CheckIn[];
  progress: number;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'plantStage' | 'streak' | 'checkIns' | 'progress'>) => void;
  addMultipleHabits: (habits: Omit<Habit, 'id' | 'plantStage' | 'streak' | 'checkIns' | 'progress'>[]) => void;
  deleteHabit: (id: string) => void;
  checkInHabit: (id: string, completed: boolean, date?: string) => void;
  getHabitStats: (id: string) => { totalCheckIns: number; successRate: number };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHabits = localStorage.getItem('habits');
      return savedHabits ? JSON.parse(savedHabits) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'plantStage' | 'streak' | 'checkIns' | 'progress'>) => {
    const newHabit = { 
      ...habit, 
      id: Date.now().toString(), 
      plantStage: 0, 
      streak: 0,
      checkIns: [],
      progress: 0
    };
    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  const addMultipleHabits = (newHabits: Omit<Habit, 'id' | 'plantStage' | 'streak' | 'checkIns' | 'progress'>[]) => {
    const habitsToAdd = newHabits.map(habit => ({
      ...habit,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      plantStage: 0,
      streak: 0,
      checkIns: [],
      progress: 0
    }));
    setHabits(prevHabits => [...prevHabits, ...habitsToAdd]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
  };

  const checkInHabit = (id: string, completed: boolean, date?: string) => {
    const checkInDate = date ? new Date(date) : new Date();
    const dateString = checkInDate.toISOString().split('T')[0];

    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === id) {
          const newCheckIns = [...habit.checkIns, { date: dateString, completed }];
          const consecutiveCheckIns = getConsecutiveCheckIns(newCheckIns);
          const newStreak = completed ? consecutiveCheckIns : 0;
          const newProgress = calculateProgress(newCheckIns);
          const newPlantStage = calculatePlantStage(newProgress);

          return { 
            ...habit, 
            checkIns: newCheckIns,
            streak: newStreak,
            progress: newProgress,
            plantStage: newPlantStage
          };
        }
        return habit;
      });
    });
  };

  const getConsecutiveCheckIns = (checkIns: CheckIn[]): number => {
    let streak = 0;
    for (let i = checkIns.length - 1; i >= 0; i--) {
      if (checkIns[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const calculateProgress = (checkIns: CheckIn[]): number => {
    const totalCheckIns = checkIns.length;
    const successfulCheckIns = checkIns.filter(ci => ci.completed).length;
    return totalCheckIns > 0 ? (successfulCheckIns / totalCheckIns) * 100 : 0;
  };

  const calculatePlantStage = (progress: number): number => {
    if (progress >= 90) return 5;
    if (progress >= 70) return 4;
    if (progress >= 50) return 3;
    if (progress >= 30) return 2;
    if (progress >= 10) return 1;
    return 0;
  };

  const getHabitStats = (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return { totalCheckIns: 0, successRate: 0 };

    const totalCheckIns = habit.checkIns.length;
    const successfulCheckIns = habit.checkIns.filter(ci => ci.completed).length;
    const successRate = totalCheckIns > 0 ? (successfulCheckIns / totalCheckIns) * 100 : 0;

    return { totalCheckIns, successRate };
  };

  return (
    <HabitContext.Provider value={{ 
      habits, 
      addHabit, 
      addMultipleHabits, 
      deleteHabit, 
      checkInHabit, 
      getHabitStats 
    }}>
      {children}
    </HabitContext.Provider>
  );
};