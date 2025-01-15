'use client'

import React from 'react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AccessibilityControls: React.FC = () => {
  const { highContrast, colorBlindMode, toggleHighContrast, setColorBlindMode } = useAccessibility()

  return (
    <div className="space-y-4">
      <div>
        <Button onClick={toggleHighContrast} variant={highContrast ? "default" : "outline"}>
          {highContrast ? "Disable" : "Enable"} High Contrast
        </Button>
      </div>
      <div>
        <label htmlFor="color-blind-mode" className="block text-sm font-medium mb-1">Color Blind Mode</label>
        <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
          <SelectTrigger id="color-blind-mode">
            <SelectValue placeholder="Select color blind mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="protanopia">Protanopia</SelectItem>
            <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
            <SelectItem value="tritanopia">Tritanopia</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default AccessibilityControls