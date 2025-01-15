import React from 'react';
import Plant from './Plant';
import { useHabits } from '../contexts/HabitContext';

const GardenGrid: React.FC = () => {
  const { habits } = useHabits();

  const gridSize = Math.ceil(Math.sqrt(habits.length));
  const cellSize = 100;

  return (
    <div 
      className="grid gap-4" 
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        width: `${gridSize * cellSize}px`,
        maxWidth: '100%'
      }}
    >
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center justify-center">
          <Plant stage={habit.plantStage} size={cellSize} />
        </div>
      ))}
    </div>
  );
};

export default GardenGrid;