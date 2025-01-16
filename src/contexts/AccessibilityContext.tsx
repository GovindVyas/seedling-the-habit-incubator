'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  textScale: number;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  toggleHighContrast: () => void;
  setTextScale: (scale: number) => void;
  setColorBlindMode: (mode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('none');

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    root.style.setProperty('--text-scale', textScale.toString());
    root.setAttribute('data-color-blind-mode', colorBlindMode);
  }, [highContrast, textScale, colorBlindMode]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, 
      textScale, 
      colorBlindMode, 
      toggleHighContrast, 
      setTextScale, 
      setColorBlindMode 
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};