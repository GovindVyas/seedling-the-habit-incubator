'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AccessibleIcon } from "@radix-ui/react-accessible-icon"
import { Settings } from 'lucide-react'
import AccessibilityControls from '@/components/AccessibilityControls'

const AccessibilityMenu: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50"
          aria-label="Open accessibility menu"
        >
          <AccessibleIcon label="Accessibility settings">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </AccessibleIcon>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Accessibility Settings</SheetTitle>
          <SheetDescription>
            Customize your experience with these accessibility options.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <AccessibilityControls />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AccessibilityMenu