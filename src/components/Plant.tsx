'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface PlantProps {
  stage: number;
  size: number;
}

const Plant: React.FC<PlantProps> = ({ stage, size }) => {
  const colors = {
    soil: '#8B4513',
    stem: '#2F855A',
    leaf: '#48BB78',
    flower: '#F6E05E',
  };

  const stemHeight = size * (0.3 + stage * 0.1);
  const leafSize = size * (0.2 + stage * 0.05);
  const flowerSize = stage >= 4 ? size * 0.2 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Sky background */}
      <rect x={0} y={0} width={size} height={size} fill="#E6F6FE" />
      
      {/* Sun */}
      <motion.circle 
        cx={size * 0.8} 
        cy={size * 0.2} 
        r={size * 0.1} 
        fill="#FDB813"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Soil */}
      <rect x={0} y={size * 0.8} width={size} height={size * 0.2} fill={colors.soil} />
      
      {/* Stem */}
      {stage > 0 && (
        <motion.line
          x1={size / 2}
          y1={size * 0.8}
          x2={size / 2}
          y2={size * 0.8 - stemHeight}
          stroke={colors.stem}
          strokeWidth={4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      
      {/* Leaves */}
      {stage >= 2 && (
        <>
          <motion.path
            d={`M ${size / 2} ${size * 0.8 - stemHeight * 0.7} 
               C ${size / 2 - leafSize} ${size * 0.8 - stemHeight * 0.7 - leafSize} 
                 ${size / 2 - leafSize} ${size * 0.8 - stemHeight * 0.7 + leafSize} 
                 ${size / 2} ${size * 0.8 - stemHeight * 0.7 + leafSize}`}
            fill={colors.leaf}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d={`M ${size / 2} ${size * 0.8 - stemHeight * 0.7} 
               C ${size / 2 + leafSize} ${size * 0.8 - stemHeight * 0.7 - leafSize} 
                 ${size / 2 + leafSize} ${size * 0.8 - stemHeight * 0.7 + leafSize} 
                 ${size / 2} ${size * 0.8 - stemHeight * 0.7 + leafSize}`}
            fill={colors.leaf}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
          />
        </>
      )}
      
      {/* Flower */}
      {stage >= 4 && (
        <motion.circle
          cx={size / 2}
          cy={size * 0.8 - stemHeight}
          r={flowerSize}
          fill={colors.flower}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      )}
    </svg>
  );
};

export default Plant;