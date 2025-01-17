import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from "@/components/ui/toaster"
import Sidebar from '@/components/Sidebar'
import ErrorBoundary from '@/components/ErrorBoundary'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import AccessibilityMenu from '@/components/AccessibilityMenu'
import { register as registerServiceWorker } from '../utils/serviceWorkerRegistration'

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
        <Providers>
          <KeyboardShortcuts />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
            Skip to main content
          </a>
          <div className="flex">
            <Sidebar />
            <main id="main-content" className="flex-1 ml-64 p-8" tabIndex={-1}>
              <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
                {children}
              </ErrorBoundary>
            </main>
          </div>
          <AccessibilityMenu />
          <Toaster />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${registerServiceWorker.toString()})();`,
          }}
        />
        {/* SVG Filters for Color Blindness */}
        <svg className="sr-only">
          <defs>
            <filter id="protanopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.567, 0.433, 0,     0, 0
                        0.558, 0.442, 0,     0, 0
                        0,     0.242, 0.758, 0, 0
                        0,     0,     0,     1, 0"
              />
            </filter>
            <filter id="deuteranopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.625, 0.375, 0,   0, 0
                        0.7,   0.3,   0,   0, 0
                        0,     0.3,   0.7, 0, 0
                        0,     0,     0,   1, 0"
              />
            </filter>
            <filter id="tritanopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.95, 0.05,  0,     0, 0
                        0,    0.433, 0.567, 0, 0
                        0,    0.475, 0.525, 0, 0
                        0,    0,     0,     1, 0"
              />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  )
}