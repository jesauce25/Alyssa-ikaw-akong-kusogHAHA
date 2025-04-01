import React, { useEffect, useRef, useState } from 'react';
import { Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

const Encouragement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorationsRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  
  // Split content for read more functionality
  const initialContent = "On this special day, I want you to know how truly amazing you are. Believe in yourself, even when the journey gets tough. You have the strength to overcome any challenge that comes your way.";
  
  const extendedContent = "Your beautiful spirit brightens everyone's day, and your kindness leaves a lasting impact. Remember, you are capable of achieving anything you set your mind to. Keep being your wonderful self, and know that you're surrounded by people who love and support you. Your determination and resilience inspire us all, and I can't wait to see all the amazing things you'll accomplish in the coming year.";
  
  const toggleReadMore = () => {
    setShowMore(!showMore);
    
    // Animate the content container
    if (textRef.current) {
      if (!showMore) {
        // Expanding
        gsap.fromTo(
          textRef.current.querySelector('.extended-content'),
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        // Collapsing
        gsap.to(
          textRef.current.querySelector('.extended-content'),
          { height: 0, opacity: 0, duration: 0.4, ease: "power2.in" }
        );
      }
    }
  };
  
  useEffect(() => {
    // Animate section elements
    if (textRef.current) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(textRef.current, 
            { y: 30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: "power3.out"
            }
          );
        }
      });
    }
    
    // Add entrance animation for the buttons
    const buttons = document.querySelectorAll('.animate-button');
    buttons.forEach((button, index) => {
      ScrollTrigger.create({
        trigger: button,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(button,
            { scale: 0.9, opacity: 0, y: 20 },
            { 
              scale: 1, 
              opacity: 1, 
              y: 0, 
              duration: 0.6, 
              delay: index * 0.2,
              ease: "elastic.out(1, 0.5)",
              onComplete: () => {
                // Add a subtle pulse animation after the entrance
                gsap.to(button, {
                  scale: 1.05,
                  duration: 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut"
                });
              }
            }
          );
        }
      });
    });
    
    // Create animated floating background decoration
    if (decorationsRef.current) {
      const decorations = decorationsRef.current.querySelectorAll('.decoration');
      
      decorations.forEach((el, index) => {
        // Set random initial positions
        gsap.set(el, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          rotation: gsap.utils.random(-15, 15),
          scale: gsap.utils.random(0.7, 1.3)
        });
        
        // Create floating animations with different timings
        gsap.to(el, {
          x: `+=${gsap.utils.random(-50, 50)}`,
          y: `+=${gsap.utils.random(-50, 50)}`,
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(10, 20),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }
    
    return () => {
      // Clean up all scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="encouragement" 
      className="py-20 relative bg-[#0F1A14] text-white overflow-visible"
    >
      {/* Background decorations */}
      <div ref={decorationsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="decoration absolute w-32 h-32 opacity-10">
          <Heart fill="rgba(245, 169, 184, 0.5)" size={120} />
        </div>
        <div className="decoration absolute w-24 h-24 opacity-10">
          <Star fill="rgba(255, 213, 79, 0.5)" size={90} />
        </div>
        <div className="decoration absolute w-20 h-20 opacity-10">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <path d="M50 0 L63 38 L100 38 L69 59 L81 100 L50 75 L19 100 L31 59 L0 38 L37 38 Z" fill="rgba(134, 239, 172, 0.5)" />
          </svg>
        </div>
        <div className="decoration absolute w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" width="160" height="160">
            <circle cx="50" cy="50" r="50" fill="rgba(167, 139, 250, 0.5)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="inline-block h-8 w-8 text-yellow-300 mb-4" fill="rgba(253, 224, 71, 0.2)" />
          <h2 className="text-4xl font-bold mb-8 font-birthday text-white overflow-visible">Words of Encouragement</h2>
          
          <div className="bg-gradient-to-br from-green-900/30 to-green-700/20 rounded-xl p-6 md:p-8 shadow-lg backdrop-blur-sm border border-green-500/20 overflow-visible">
            <div 
              ref={textRef} 
              className="text-xl md:text-2xl leading-relaxed font-handwritten text-green-50 mb-8 overflow-visible whitespace-normal break-words cursor-pointer"
              onClick={toggleReadMore}
            >
              <p className="initial-content">{initialContent}</p>
              
              <div className="extended-content overflow-hidden" style={{ height: showMore ? 'auto' : '0px', opacity: showMore ? 1 : 0 }}>
                <p className="mt-4">{extendedContent}</p>
              </div>
              
              <div className="read-more-container mt-4 flex justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the container's onClick from being triggered
                    toggleReadMore();
                  }}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-full text-white font-birthday text-sm transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg border border-green-400/40"
                >
                  {showMore ? (
                    <>
                      <span>Read Less</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <button
              ref={buttonRef}
              className="animate-button px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 font-birthday text-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the container's onClick from being triggered
                // Scroll to birthday cake section
                document.getElementById('birthday-wish')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Make a Birthday Wish
            </button>
          </div>
          
          {/* Inspirational quote */}
          <div className="mt-12 max-w-xl mx-auto">
            <blockquote className="italic text-green-200 font-handwritten text-lg relative overflow-visible">
              <span className="absolute -top-6 -left-4 text-4xl text-green-500/30">"</span>
              The best is yet to come. Your journey is just beginning, and the world is waiting for all the wonderful things you'll accomplish.
              <span className="absolute -bottom-6 -right-4 text-4xl text-green-500/30">"</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Encouragement;
