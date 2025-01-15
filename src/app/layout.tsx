import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HabitProvider } from '@/contexts/HabitContext'

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
    <html lang="en">
      <body className={inter.className}>
        <HabitProvider>
          {children}
        </HabitProvider>
      </body>
    </html>
  )
}