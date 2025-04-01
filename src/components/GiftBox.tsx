
import React from 'react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  position?: 'left' | 'right' | 'center';
  size?: number;
  color?: string;
  ribbonColor?: string;
  bounceEffect?: boolean;
}

const GiftBox: React.FC<GiftBoxProps> = ({ 
  position = 'center', 
  size = 60, 
  color = '#43A047', 
  ribbonColor = '#FFC107',
  bounceEffect = true
}) => {
  const positionClass = position === 'left' 
    ? 'left-10' 
    : position === 'right' 
      ? 'right-10' 
      : 'left-1/2 -translate-x-1/2';

  return (
    <div 
      className={`absolute ${positionClass} bottom-10 z-10 ${bounceEffect ? 'animate-bounce' : ''}`}
      style={{ animationDuration: '3s' }}
    >
      <div className="relative">
        <Gift
          size={size}
          fill={color}
          stroke={ribbonColor}
          strokeWidth={2}
          className="drop-shadow-lg"
        />
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="text-xl">🎂</span>
        </div>
      </div>
    </div>
  );
};

export default GiftBox;
