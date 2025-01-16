'use client'

import React from 'react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AccessibilityControls: React.FC = () => {
  const { 
    highContrast, 
    textScale, 
    colorBlindMode, 
    toggleHighContrast, 
    setTextScale, 
    setColorBlindMode 
  } = useAccessibility()

  return (
    <div className="space-y-4" role="group" aria-label="Accessibility Controls">
      <div className="flex flex-col gap-2">
        <label id="high-contrast-label" className="block text-sm font-medium">High Contrast Mode</label>
        <Button 
          onClick={toggleHighContrast} 
          variant={highContrast ? "default" : "outline"}
          aria-pressed={highContrast}
          aria-labelledby="high-contrast-label"
        >
          {highContrast ? "Disable" : "Enable"} High Contrast
        </Button>
      </div>
      <div>
        <label htmlFor="text-scale" className="block text-sm font-medium mb-1">Text Scale</label>
        <Slider
          id="text-scale"
          min={1}
          max={1.5}
          step={0.1}
          value={[textScale]}
          onValueChange={(value) => setTextScale(value[0])}
          aria-valuemin={1}
          aria-valuemax={1.5}
          aria-valuenow={textScale}
          aria-valuetext={`Text scale: ${textScale.toFixed(1)}`}
        />
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