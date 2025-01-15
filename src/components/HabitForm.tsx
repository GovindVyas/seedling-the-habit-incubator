'use client'

import React, { useState } from 'react';
import { useHabits } from '@/contexts/HabitContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const HabitForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const { addHabit } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit({ name, description, frequency });
    setName('');
    setDescription('');
    setFrequency('daily');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="habit-name">Habit Name</Label>
        <Input
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new habit"
          required
        />
      </div>
      <div>
        <Label htmlFor="habit-description">Description</Label>
        <Textarea
          id="habit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your habit"
        />
      </div>
      <div>
        <Label htmlFor="habit-frequency">Frequency</Label>
        <Select value={frequency} onValueChange={(value: 'daily' | 'weekly') => setFrequency(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Habit</Button>
    </form>
  );
};

export default HabitForm;