'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, ListTodo, Home, Sun, Moon } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const Sidebar = () => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <aside className="w-64 bg-background border-r border-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">Seedling</h1>
      </div>
      <nav className="mt-8 flex-grow">
        <Link href="/" className={`flex items-center px-4 py-2 text-foreground ${pathname === '/' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
          <Home className="mr-3 h-5 w-5" aria-hidden="true" />
          <span>Home</span>
        </Link>
        <Link href="/habits" className={`flex items-center px-4 py-2 text-foreground ${pathname === '/habits' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
          <ListTodo className="mr-3 h-5 w-5" aria-hidden="true" />
          <span>Habits</span>
        </Link>
        <Link href="/garden" className={`flex items-center px-4 py-2 text-foreground ${pathname === '/garden' ? 'bg-accent' : 'hover:bg-accent/50'}`}>
          <Leaf className="mr-3 h-5 w-5" aria-hidden="true" />
          <span>Garden</span>
        </Link>
      </nav>
      <div className="p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar