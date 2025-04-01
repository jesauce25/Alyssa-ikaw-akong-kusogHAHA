import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Cake, Gift, Wind } from 'lucide-react';
import gsap from 'gsap';
import Confetti from './Confetti';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface BirthdayCakeSectionProps {
  name: string;
}

// Birthday cake component with interactive blowing capability
const BirthdayCake: React.FC<{onAllCandlesBlown: () => void}> = ({ onAllCandlesBlown }) => {
  const [candlesLit, setCandlesLit] = useState(5);
  const [blowStrength, setBlowStrength] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const blowTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setIsBlowing(true);
    
    if (blowTimeout.current) {
      clearInterval(blowTimeout.current);
    }
    
    blowTimeout.current = setInterval(() => {
      setBlowStrength(prev => {
        const newStrength = Math.min(prev + 10, 100);
        if (newStrength === 100) {
          // Blow out a candle when strength reaches 100%
          setCandlesLit(prev => {
            const newCount = prev - 1;
            if (newCount <= 0) {
              // All candles blown
              setTimeout(() => {
                onAllCandlesBlown();
              }, 500);
            }
            return Math.max(newCount, 0);
          });
          
          // Create flame out effect
          if (canvasRef.current) {
            const flamePiece = document.createElement('div');
            flamePiece.className = 'absolute w-3 h-3 bg-amber-500 rounded-full';
            flamePiece.style.top = '0px';
            flamePiece.style.left = '50%';
            flamePiece.style.transform = 'translateX(-50%)';
            flamePiece.style.opacity = '1';
            canvasRef.current.appendChild(flamePiece);
            
            gsap.to(flamePiece, {
              y: -40,
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                flamePiece.remove();
              }
            });
          }
          
          return 0; // Reset strength after blowing
        }
        return newStrength;
      });
    }, 100);
  };

  const handleMouseUp = () => {
    setIsBlowing(false);
    if (blowTimeout.current) {
      clearInterval(blowTimeout.current);
      blowTimeout.current = null;
    }
    
    // Gradually decrease strength when not blowing
    const decreaseInterval = setInterval(() => {
      setBlowStrength(prev => {
        const newStrength = Math.max(prev - 5, 0);
        if (newStrength === 0) {
          clearInterval(decreaseInterval);
        }
        return newStrength;
      });
    }, 50);
  };
  
  useEffect(() => {
    return () => {
      if (blowTimeout.current) {
        clearInterval(blowTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative cursor-pointer select-none transform scale-125" 
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Cake base */}
      <div className="w-40 h-16 bg-gradient-to-r from-pink-300 to-rose-400 rounded-lg relative mx-auto">
        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-b-lg"></div>
        
        {/* Cake top with frosting */}
        <div className="absolute -top-8 left-0 w-full h-8 bg-gradient-to-r from-pink-200 to-rose-300 rounded-t-lg">
          <div className="absolute -top-2 left-0 w-full">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-4">
              <path d="M0,10 C30,0 70,0 100,10" fill="#FBCFE8" />
            </svg>
          </div>
        </div>
        
        {/* Candles */}
        <div ref={canvasRef} className="absolute -top-12 left-0 w-full flex justify-center items-end space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative w-2 h-12 flex flex-col items-center">
              <div className={`w-2 h-10 ${
                i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-purple-400'
              } rounded-sm ${i >= candlesLit ? 'opacity-60' : ''}`}></div>
              
              {/* Candle flame */}
              {i < candlesLit && (
                <div className="absolute -top-5 animate-flicker">
                  <div className="w-3 h-5 bg-amber-500 rounded-full blur-[1px]"></div>
                  <div className="w-2 h-3 bg-amber-300 rounded-full absolute top-1 left-0.5 blur-[1px]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Blow indicator */}
        {isBlowing && (
          <div className="absolute -right-12 top-0">
            <div className={`flex items-center justify-center`}>
              <Wind className={`w-6 h-6 text-blue-400 ${isBlowing ? 'animate-ping' : ''}`} />
              <span className="ml-1 text-xs font-bold text-white">{blowStrength}%</span>
            </div>
          </div>
        )}
        
        {/* Instruction text */}
        <div className="absolute -bottom-8 left-0 w-full text-center text-white text-xs">
          {candlesLit > 0 ? (
            <p className="animate-pulse">Click & hold to blow!</p>
          ) : (
            <p className="text-green-300">You did it! 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Wish modal component with persistence
const WishModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  persistent?: boolean;
}> = ({ isOpen, onClose, persistent = false }) => {
  const [wish, setWish] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle modal appearance and disappearance
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
      
      // Clear any existing timeout
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
    }
  }, [isOpen, closeTimeout]);
  
  // For persistent mode, reopen the modal after a delay
  useEffect(() => {
    if (persistent && !isOpen && !isClosing) {
      const timeout = setTimeout(() => {
        onClose(); // This function is actually toggling the modal in persistent mode
      }, 5000);
      
      setCloseTimeout(timeout);
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [isOpen, persistent, isClosing, onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      setHasSubmitted(true);
      
      // Trigger confetti celebration
      const confettiElements = Array.from({ length: 50 }).map(() => {
        const element = document.createElement('div');
        element.className = 'absolute rounded-full';
        element.style.width = `${Math.random() * 10 + 5}px`;
        element.style.height = `${Math.random() * 10 + 5}px`;
        element.style.backgroundColor = ['#FFC107', '#E91E63', '#2196F3', '#4CAF50'][Math.floor(Math.random() * 4)];
        element.style.left = `${50 + (Math.random() * 40 - 20)}%`;
        element.style.top = `${50 + (Math.random() * 40 - 20)}%`;
        modalRef.current?.appendChild(element);
        
        // Animate each piece
        gsap.to(element, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => element.remove()
        });
        
        return element;
      });
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          onClose();
          setIsClosing(false);
          
          // Reset form if closing from submitted state
          if (hasSubmitted) {
            setTimeout(() => {
              setHasSubmitted(false);
              setWish('');
            }, 500);
          }
        }
      });
    } else {
      onClose();
      setIsClosing(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-green-700 relative overflow-hidden"
      >
        {!hasSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-center text-white mb-6 font-birthday">Make A Birthday Wish</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="What's your birthday wish?"
                className="w-full p-3 rounded-lg bg-white/10 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                autoFocus
              />
              <div className="flex justify-between">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors font-medium"
                >
                  Make Wish ✨
                </button>
                <button 
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 bg-transparent text-green-300 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-3xl font-birthday text-white mb-3">Amazing Wish!</h2>
            <p className="text-green-200 mb-6">Your wish has been sent to the birthday stars. May it come true!</p>
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleClose}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors font-medium"
              >
                Continue the Celebration
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-3 right-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="absolute bottom-3 left-3">
              <Cake className="w-5 h-5 text-pink-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({ name }) => {
  const [showModal, setShowModal] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cakeContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll animations
    if (sectionRef.current && titleRef.current) {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reset"
        }
      });
      
      if (cakeContainerRef.current) {
        gsap.from(cakeContainerRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100", 
            toggleActions: "play none none reset"
          }
        });
      }
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleAllCandlesBlown = () => {
    setCandlesBlown(true);
    
    // Show the wish modal after all candles are blown
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };
  
  // Non-persistent modal toggle
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <section 
      ref={sectionRef}
      id="birthday-wish"
      className="relative py-24 px-6 bg-[#0F1A14] min-h-[90vh] flex flex-col items-center justify-center w-full"
    >
      {/* Background effects */}
      <Confetti  />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-birthday text-white mb-8"
        >
          Make a Birthday Wish!
        </h2>
        
        <p className="text-green-100 mb-12 text-xl max-w-2xl mx-auto">
          It's time for a special moment! Blow out the candles and make a birthday wish that will come true.
        </p>
        
        <div 
          ref={cakeContainerRef} 
          className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm border border-green-700/30 shadow-lg"
        >
          {!candlesBlown ? (
            <div className="text-center">
              <div className="mb-6 text-white text-lg font-semibold">
                <Sparkles className="inline-block mr-2 mb-1 text-yellow-400" size={20} />
                Blow out the candles!
              </div>
              <BirthdayCake onAllCandlesBlown={handleAllCandlesBlown} />
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-birthday text-pink-300 mb-4">Candles Blown!</h3>
              <p className="text-white mb-6">Now it's time to make a wish that will come true!</p>
              <button 
                onClick={toggleModal}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full shadow-lg transition-colors"
              >
                <Sparkles className="inline-block mr-2 text-yellow-300" size={16} />
                Make a Wish
              </button>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 hidden md:block">
          <div className="text-4xl animate-float">🎁</div>
        </div>
        <div className="absolute top-24 right-12 hidden md:block">
          <div className="text-4xl animate-float" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
            🎈
          </div>
        </div>
      </div>
      
      {/* Non-persistent wish modal */}
      <WishModal isOpen={showModal} onClose={toggleModal} persistent={false} />
    </section>
  );
};

export default BirthdayCakeSection; 