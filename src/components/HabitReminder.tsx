import React, { useEffect, useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components//ui/button"
import { X } from 'lucide-react'

const HabitReminder: React.FC = () => {
  const { habits, checkInHabit } = useHabits();
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const uncheckedHabits = habits.filter(habit => habit.lastCheckIn !== today);
    setReminders(uncheckedHabits.map(habit => habit.name));
  }, [habits]);

  const handleCheckIn = (habitName: string) => {
    const habit = habits.find(h => h.name === habitName);
    if (habit) {
      checkInHabit(habit.id);
      setReminders(reminders.filter(name => name !== habitName));
    }
  };

  const handleDismiss = (habitName: string) => {
    setReminders(reminders.filter(name => name !== habitName));
  };

  if (reminders.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {reminders.map((habitName) => (
        <Alert key={habitName}>
          <AlertTitle>Habit Reminder</AlertTitle>
          <AlertDescription>
            Do not forget to check in your habit: {habitName}
          </AlertDescription>
          <div className="mt-2 flex justify-end space-x-2">
            <Button onClick={() => handleCheckIn(habitName)} size="sm">
              Check-in
            </Button>
            <Button onClick={() => handleDismiss(habitName)} size="sm" variant="outline">
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default HabitReminder;