'use client'

import { ThemeProvider } from "@/components/ThemeProvider"
import { HabitProvider } from '@/contexts/HabitContext'
import { AchievementProvider } from '@/contexts/AchievementContext'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AccessibilityProvider>
        <HabitProvider>
          <AchievementProvider>
            {children}
          </AchievementProvider>
        </HabitProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  )
}