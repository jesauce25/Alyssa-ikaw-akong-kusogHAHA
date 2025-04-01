import React, { useEffect, useRef } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  origin?: { x: number; y: number };
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  gravity?: number;
  ticks?: number;
  colors?: string[];
  burstDelay?: number;
}

const Confetti: React.FC<ConfettiProps> = ({
  origin = { x: 0.5, y: 0.5 },
  particleCount = 200,
  spread = 150,
  startVelocity = 40,
  gravity = 0.5,
  ticks = 150,
  colors = ['#ff577f', '#ff884b', '#ffc764', '#cdff64', '#9bff64', '#64ffc7', '#64ffed', '#64c7ff', '#64a2ff', '#9b64ff', '#c764ff', '#ff64ed', '#ff64c7'],
  burstDelay = 0
}) => {
  const confettiRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  
  useEffect(() => {
    // Initial delay before starting the confetti
    const initialTimer = setTimeout(() => {
      setIsActive(true);
      
      // Set a timer to stop the confetti after it's done
      const completionTimer = setTimeout(() => {
        setIsDone(true);
      }, ticks * 20); // Reasonable time for confetti to complete
      
      return () => clearTimeout(completionTimer);
    }, burstDelay);
    
    return () => clearTimeout(initialTimer);
  }, [burstDelay, ticks]);
  
  // Don't render anything if we're done
  if (isDone) {
    return null;
  }
  
  return (
    <div 
      ref={confettiRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      {isActive && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={particleCount}
          confettiSource={{
            x: window.innerWidth * origin.x,
            y: window.innerHeight * origin.y,
            w: 0,
            h: 0
          }}
          initialVelocityX={startVelocity * 0.5}
          initialVelocityY={startVelocity}
          gravity={gravity}
          colors={colors}
          onConfettiComplete={() => setIsDone(true)}
          tweenDuration={ticks * 10}
        />
      )}
    </div>
  );
};

export default Confetti;
