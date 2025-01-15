import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Seedling</h1>
        <p className="text-lg mb-8">Start growing your habits today!</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/habits">Manage Habits</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/garden">View Garden</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}