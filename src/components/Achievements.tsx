'use client'

import React from 'react'
import { useAchievements } from '@/contexts/AchievementContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Achievements: React.FC = () => {
  const { achievements } = useAchievements()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Achievements