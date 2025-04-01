
import React from 'react';

interface WaveDecorationProps {
  position: 'top' | 'bottom';
  style?: 'wave' | 'zigzag' | 'diagonal' | 'curves' | 'triangles' | 'simple';
  color?: string;
  height?: number;
  className?: string;
}

const WaveDecoration: React.FC<WaveDecorationProps> = ({ 
  position, 
  style = 'wave',
  color = '#1E3A2B', 
  height = 24,
  className = '' 
}) => {
  
  const getPathByStyle = () => {
    switch(style) {
      case 'zigzag':
        return "M0,0 L20,40 L40,0 L60,40 L80,0 L100,40 L120,0 L140,40 L160,0 L180,40 L200,0 L220,40 L240,0 L260,40 L280,0 L300,40 L320,0 L340,40 L360,0 L380,40 L400,0 L420,40 L440,0 L460,40 L480,0 L500,40 L520,0 L540,40 L560,0 L580,40 L600,0 L620,40 L640,0 L660,40 L680,0 L700,40 L720,0 L740,40 L760,0 L780,40 L800,0 L820,40 L840,0 L860,40 L880,0 L900,40 L920,0 L940,40 L960,0 L980,40 L1000,0 L1020,40 L1040,0 L1060,40 L1080,0 L1100,40 L1120,0 L1140,40 L1160,0 L1180,40 L1200,0 V120 H0 Z";
      case 'diagonal':
        return "M0,120 L1200,0 V120 H0 Z";
      case 'curves':
        return "M0,120 C200,60 400,120 600,60 C800,0 1000,60 1200,30 V120 H0 Z";
      case 'triangles':
        return "M0,0 L80,60 L160,0 L240,60 L320,0 L400,60 L480,0 L560,60 L640,0 L720,60 L800,0 L880,60 L960,0 L1040,60 L1120,0 L1200,60 V120 H0 Z";
      case 'simple':
        return "M0,0 L1200,60 V120 H0 Z";
      case 'wave':
      default:
        return "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";
    }
  };
  
  return (
    <div 
      className={`absolute ${position === 'top' ? 'top-0 transform rotate-180' : 'bottom-0'} left-0 w-full overflow-hidden line-height-0 ${className}`}
    >
      <svg 
        className={`relative block w-full h-${height} md:h-${height * 1.5}`} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d={getPathByStyle()}
          fill={color}
          className="transition-transform duration-1000 ease-in-out hover:scale-y-110"
        ></path>
      </svg>
    </div>
  );
};

export default WaveDecoration;
