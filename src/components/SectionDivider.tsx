
import React from 'react';

interface SectionDividerProps {
  type?: 'left' | 'right' | 'middle';
  color?: string;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  type = 'left', 
  color = '#43A047',
  className = '' 
}) => {
  // Determine the appropriate style based on the type
  const getStyle = () => {
    let baseStyle = 'h-8 w-full overflow-hidden relative';
    
    if (type === 'left') {
      return `${baseStyle} bg-gradient-to-r from-transparent to-${color}`;
    } else if (type === 'right') {
      return `${baseStyle} bg-gradient-to-l from-transparent to-${color}`;
    } else {
      return `${baseStyle} bg-gradient-to-lr from-transparent via-${color} to-transparent`;
    }
  };
  
  return (
    <div className={`section-divider ${type} ${className} w-full`}>
      <div 
        className="section-divider-inner w-full h-full"
        style={{ 
          background: type === 'left' 
            ? `linear-gradient(to right, transparent, ${color})` 
            : type === 'right' 
              ? `linear-gradient(to left, transparent, ${color})` 
              : `linear-gradient(to right, transparent, ${color}, transparent)` 
        }}
      ></div>
    </div>
  );
};

export default SectionDivider;
