import React from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import StatsDashboard from '../components/StatsDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const Habits: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Manage Your Habits</h1>
      <Tabs defaultValue="list" className="mb-8">
        <TabsList>
          <TabsTrigger value="list">Habit List</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <HabitForm />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Habits</h2>
            <HabitList />
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <h2 className="text-2xl font-bold mb-4">Habit Statistics</h2>
          <StatsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Habits;