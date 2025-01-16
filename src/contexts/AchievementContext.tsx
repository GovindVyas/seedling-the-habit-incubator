'use client'

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useHabits } from './HabitContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AchievementContextType {
  achievements: Achievement[];
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

interface Habit {
  streak: number;
  checkIns: CheckIn[];
}

interface CheckIn {
  date: string;
  completed: boolean;
}

const initialAchievements: Achievement[] = [
  { id: '1', title: 'First Habit', description: 'Create your first habit', unlocked: false },
  { id: '2', title: 'Streak Master', description: 'Maintain a 7-day streak', unlocked: false },
  { id: '3', title: 'Habit Enthusiast', description: 'Create 5 habits', unlocked: false },
  { id: '4', title: 'Perfect Week', description: 'Complete all habits for a week', unlocked: false },
];

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { habits } = useHabits();
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    if (typeof window !== 'undefined') {
      const savedAchievements = localStorage.getItem('achievements');
      return savedAchievements ? JSON.parse(savedAchievements) : initialAchievements;
    }
    return initialAchievements;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const checkAchievements = useCallback((updatedHabits: Habit[]) => {
    const newAchievements = achievements.map(achievement => {
      switch (achievement.id) {
        case '1':
          return { ...achievement, unlocked: updatedHabits.length > 0 };
        case '2':
          return { ...achievement, unlocked: updatedHabits.some(habit => habit.streak >= 7) };
        case '3':
          return { ...achievement, unlocked: updatedHabits.length >= 5 };
        case '4':
          const today = new Date();
          const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          const perfectWeek = updatedHabits.every(habit => 
            habit.checkIns.filter((ci) => new Date(ci.date) >= lastWeek && ci.completed).length === 7
          );
          return { ...achievement, unlocked: perfectWeek };
        default:
          return achievement;
      }
    });

    setAchievements(newAchievements);
  }, [achievements]);

  useEffect(() => {
    checkAchievements(habits);
  }, [habits, checkAchievements]);

  return (
    <AchievementContext.Provider value={{ achievements }}>
      {children}
    </AchievementContext.Provider>
  );
};