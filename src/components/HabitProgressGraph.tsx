'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useHabits } from '@/contexts/HabitContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface HabitProgressGraphProps {
  habitId: string
}

const HabitProgressGraph: React.FC<HabitProgressGraphProps> = ({ habitId }) => {
  const { habits } = useHabits()
  const habit = habits.find(h => h.id === habitId)

  if (!habit) return null

  const checkInDates = habit.checkIns.map(ci => new Date(ci.date))
  const sortedDates = checkInDates.sort((a, b) => a.getTime() - b.getTime())
  const labels = sortedDates.map(date => date.toLocaleDateString())

  const data = {
    labels,
    datasets: [
      {
        label: 'Check-ins',
        data: sortedDates.map((_, index) => index + 1),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Habit Progress Over Time',
      },
    },
  }

  return <Line options={options} data={data} />
}

export default HabitProgressGraph