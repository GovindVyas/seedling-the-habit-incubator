import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HabitProvider } from '@/contexts/HabitContext'
import { AchievementProvider } from '@/contexts/AchievementContext'
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '@/components/Sidebar'
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seedling - The Habit Incubator',
  description: 'Grow your habits into beautiful plants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HabitProvider>
            <AchievementProvider>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                  {children}
                </main>
              </div>
              <Toaster />
            </AchievementProvider>
          </HabitProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}