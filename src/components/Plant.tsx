'use client'

import React from 'react';

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
      <circle cx={size * 0.8} cy={size * 0.2} r={size * 0.1} fill="#FDB813" />
      
      {/* Soil */}
      <rect x={0} y={size * 0.8} width={size} height={size * 0.2} fill={colors.soil} />
      
      {/* Stem */}
      {stage > 0 && (
        <line
          x1={size / 2}
          y1={size * 0.8}
          x2={size / 2}
          y2={size * 0.8 - stemHeight}
          stroke={colors.stem}
          strokeWidth={4}
          className="transition-all duration-1000 ease-in-out"
        />
      )}
      
      {/* Leaves */}
      {stage >= 2 && (
        <>
          <path
            d={`M ${size / 2} ${size * 0.8 - stemHeight * 0.7} 
               C ${size / 2 - leafSize} ${size * 0.8 - stemHeight * 0.7 - leafSize} 
                 ${size / 2 - leafSize} ${size * 0.8 - stemHeight * 0.7 + leafSize} 
                 ${size / 2} ${size * 0.8 - stemHeight * 0.7 + leafSize}`}
            fill={colors.leaf}
            className="transition-all duration-1000 ease-in-out"
          />
          <path
            d={`M ${size / 2} ${size * 0.8 - stemHeight * 0.7} 
               C ${size / 2 + leafSize} ${size * 0.8 - stemHeight * 0.7 - leafSize} 
                 ${size / 2 + leafSize} ${size * 0.8 - stemHeight * 0.7 + leafSize} 
                 ${size / 2} ${size * 0.8 - stemHeight * 0.7 + leafSize}`}
            fill={colors.leaf}
            className="transition-all duration-1000 ease-in-out"
          />
        </>
      )}
      
      {/* Flower */}
      {stage >= 4 && (
        <circle
          cx={size / 2}
          cy={size * 0.8 - stemHeight}
          r={flowerSize}
          fill={colors.flower}
          className="transition-all duration-1000 ease-in-out"
        />
      )}
    </svg>
  );
};

export default Plant;