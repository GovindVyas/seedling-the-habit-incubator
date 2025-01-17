'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Leaf, ListTodo } from 'lucide-react'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-5xl font-bold mb-8 text-primary">Welcome to Seedling</h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Cultivate your habits and watch them grow into a beautiful garden. 
          Start your journey to personal growth today!
        </p>
        <div className="flex space-x-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="/habits" className="flex items-center">
              <ListTodo className="mr-2 h-5 w-5" />
              Manage Habits
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href="/garden" className="flex items-center">
              <Leaf className="mr-2 h-5 w-5" />
              View Garden
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}