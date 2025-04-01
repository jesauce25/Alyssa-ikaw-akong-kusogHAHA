
import React from 'react';
import { Circle } from 'lucide-react';

interface BalloonsProps {
  count?: number;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'scattered';
}

const Balloons: React.FC<BalloonsProps> = ({ count = 7, position = 'scattered' }) => {
  // Generate balloon positions
  const generateBalloons = () => {
    const balloons = [];
    const colors = ['#43A047', '#66BB6A', '#1E3A2B', '#2E7D32', '#FFC107', '#B39DDB', '#E57373'];
    
    for (let i = 0; i < count; i++) {
      // Calculate position based on the chosen layout
      let positionStyle: React.CSSProperties = {};
      
      if (position === 'scattered') {
        positionStyle = {
          left: `${10 + (i * 80 / count)}%`,
          top: `${Math.random() * 30}%`,
          animationDelay: `${i * 0.3}s`,
        };
      } else if (position === 'top') {
        positionStyle = {
          left: `${10 + (i * 80 / count)}%`,
          top: '5%',
          animationDelay: `${i * 0.2}s`,
        };
      } else if (position === 'bottom') {
        positionStyle = {
          left: `${10 + (i * 80 / count)}%`,
          bottom: '5%',
          animationDelay: `${i * 0.2}s`,
        };
      }
      
      // Calculate size for visual variety
      const size = 40 + Math.floor(Math.random() * 30);
      
      // Add each balloon
      balloons.push(
        <div 
          key={`balloon-${i}`}
          className="absolute balloon-float"
          style={positionStyle}
        >
          <div className="relative">
            <Circle 
              size={size} 
              className="balloon-shadow" 
              fill={colors[i % colors.length]}
              stroke={colors[i % colors.length]}
              strokeWidth={1}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="balloon-string h-10 w-px bg-gray-300 mx-auto mt-1"></div>
            </div>
          </div>
        </div>
      );
    }
    
    return balloons;
  };

  return (
    <div className="balloons-container pointer-events-none">
      {generateBalloons()}
    </div>
  );
};

export default Balloons;
