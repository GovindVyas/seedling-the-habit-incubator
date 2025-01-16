'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from 'lucide-react'

const KeyboardShortcuts = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey) {
        switch (event.key) {
          case 'h':
            router.push('/')
            break
          case 'b':
            router.push('/habits')
            break
          case 'g':
            router.push('/garden')
            break
          case '?':
            setIsOpen(true)
            break
          default:
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50">
          <Keyboard className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Keyboard Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to quickly navigate the app:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Ctrl + Alt + H</span>
            <span>Go to Home</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Ctrl + Alt + B</span>
            <span>Go to Habits</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Ctrl + Alt + G</span>
            <span>Go to Garden</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Ctrl + Alt + ?</span>
            <span>Open this help dialog</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default KeyboardShortcuts