'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, ListTodo, Home } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-600">Seedling</h1>
      </div>
      <nav className="mt-8">
        <Link href="/" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/' ? 'bg-green-100' : 'hover:bg-gray-100'}`}>
          <Home className="mr-3 h-5 w-5" />
          Home
        </Link>
        <Link href="/habits" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/habits' ? 'bg-green-100' : 'hover:bg-gray-100'}`}>
          <ListTodo className="mr-3 h-5 w-5" />
          Habits
        </Link>
        <Link href="/garden" className={`flex items-center px-4 py-2 text-gray-700 ${pathname === '/garden' ? 'bg-green-100' : 'hover:bg-gray-100'}`}>
          <Leaf className="mr-3 h-5 w-5" />
          Garden
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar