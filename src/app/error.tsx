'use client'

import { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">We are sorry for the inconvenience. Our team has been notified.</p>
      <Button
        onClick={() => reset()}
        className="mt-4"
      >
        Try again
      </Button>
    </div>
  )
}