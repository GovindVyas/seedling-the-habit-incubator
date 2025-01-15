'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, ListTodo, Home } from 'lucide-react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-600">Seedling</h1>
        </div>
        <nav className="mt-8">
          <Link href="/" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/' ? 'bg-green-100' : ''}`}>
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link href="/habits" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/habits' ? 'bg-green-100' : ''}`}>
            <ListTodo className="mr-3 h-5 w-5" />
            Habits
          </Link>
          <Link href="/garden" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/garden' ? 'bg-green-100' : ''}`}>
            <Leaf className="mr-3 h-5 w-5" />
            Garden
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default Layout