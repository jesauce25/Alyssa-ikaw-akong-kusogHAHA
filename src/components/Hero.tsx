import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Cake, Gift } from 'lucide-react';
import gsap from 'gsap';
import Balloons from './Balloons';
import Confetti from './Confetti';

interface HeroProps {
  name: string;
  specialMessages?: string[];
}

const Hero: React.FC<HeroProps> = ({ name, specialMessages = [] }) => {
  const [showPersonality, setShowPersonality] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const personalityTraits = [
    'Brave',      // For leaving everything to study in Philippines
    'Determined', // For overcoming challenges in her journey
    'Faithful',   // For serving the Lord with all her heart
    'Creative',   // For her artistic and imaginative nature
    'Caring',     // For her selfless nature in helping others
    'Resilient',
    'SUBRA KA GWAPA!!!!'   // For facing challenges with strength,
  ];

  useEffect(() => {
    // Fix for the scrolling issue - properly set up smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetElement,
                offsetY: 0
              },
              ease: "power3.inOut"
            });
          }
        }
      }
    };
    
    // Add event listeners for all anchor links
    document.addEventListener('click', handleAnchorClick);

    // Create a staggered animation sequence with GSAP
    const tl = gsap.timeline();
    
    if (titleRef.current && subtitleRef.current) {
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");
      
      // Remove button animations
    }

    // Add cake animation
    if (cakeRef.current) {
      gsap.to(cakeRef.current, {
        y: -10,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Show confetti after initial animations
    setShowConfetti(true);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      // Split the text into spans for animation
      const title = titleRef.current;
      const text = title.textContent || "";
      
      // Only process if not already done
      if (!title.classList.contains('processed')) {
        title.innerHTML = "";
        title.classList.add('processed');
        
        [...text].forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "inline-block opacity-0 transform -translate-y-4";
          title.appendChild(span);
        });
      }
      
      // Animate each letter
      const characters = title.querySelectorAll('span');
      gsap.to(characters, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: 0.2,
        onComplete: () => {
          // Show confetti after title animation
          setShowConfetti(true);
        }
      });
    }
  }, []);
  
  useEffect(() => {
    const decorations = heroRef.current?.querySelectorAll('.decoration');
    
    if (decorations?.length) {
      decorations.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -15 : -20,
          x: i % 3 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 10 : -10,
          duration: 3 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    }
  }, []);
  
  useEffect(() => {
    if (specialMessages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % specialMessages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [specialMessages]);
  
  useEffect(() => {
    if (subtitleRef.current && specialMessages.length > 0) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [currentMessageIndex, specialMessages]);

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen relative flex flex-col items-center justify-center overflow-visible px-0 w-full bg-gradient-to-br from-[#132218] via-[#1E3A2B] to-[#2E7D32]"
    >
      {/* Hero Confetti contained within this section */}
      {showConfetti && (
        <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ zIndex: 20 }}>
          <Confetti 
            particleCount={300}
            spread={200}
            origin={{ x: 0.5, y: 0.5 }}
            colors={['#ffb6c1', '#ff69b4', '#ffc0cb', '#ff1493', '#db7093']}
            gravity={0.7}
            ticks={400}
            startVelocity={30}
          />
        </div>
      )}
      
      {/* Decorative balloons with better positioning */}
      <Balloons position="scattered" count={5} />
      
      {/* Birthday text and effects container - now integrated with the hero background */}
      <div 
        ref={contentRef} 
        className="relative z-20 text-center w-full max-w-4xl mx-auto px-6"
      >
        <div className="animate-float overflow-visible">
          <div ref={cakeRef} className="inline-block mb-6 overflow-visible">
            <Cake className="h-20 w-20 mx-auto text-[#FFC107] drop-shadow-glow" />
          </div>
        </div>
        
        <h1 
          ref={titleRef} 
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl drop-shadow-lg font-birthday overflow-visible"
        >
          Happy Birthday, <br />
          <span className="mt-3 block bg-gradient-to-r from-green-300 to-teal-200 bg-clip-text text-transparent filter drop-shadow-md overflow-visible">
            {name}!
          </span>
        </h1>
        
        <p 
          ref={subtitleRef} 
          className="mx-auto mt-6 max-w-2xl text-xl text-green-100 md:text-2xl drop-shadow-md overflow-visible"
        >
          You're amazing—here's why!
        </p>
        
        {/* Special message carousel - randomly selects from provided messages */}
        {specialMessages.length > 0 && (
          <div className="mt-8 mb-10 min-h-[80px] relative overflow-visible">
            <div 
              className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-green-500/20 overflow-visible"
            >
              <p className="text-lg text-green-100 italic font-handwritten overflow-visible">
                "{specialMessages[currentMessageIndex]}"
              </p>
            </div>
          </div>
        )}
        
        {/* Personality Traits with improved animation */}
        <div 
          className="mt-8 flex flex-wrap justify-center gap-3 overflow-visible"
        >
          {personalityTraits.map((trait, index) => (
            <span
              key={index}
              className={`inline-block rounded-full px-4 py-2 text-sm font-medium shadow-lg overflow-visible ${
                showPersonality ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                backgroundColor: 
                  index % 6 === 0 ? '#43A047' : 
                  index % 6 === 1 ? '#2E7D32' : 
                  index % 6 === 2 ? '#66BB6A' : 
                  index % 6 === 3 ? '#1E3A2B' :
                  index % 6 === 4 ? '#388E3C' :
                  '#FFC107',
                color: index % 6 === 5 ? '#1E3A2B' : '#fff',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                opacity: showPersonality ? 1 : 0,
                transform: showPersonality ? 'scale(1)' : 'scale(0.95)'
              }}
            >
              {trait}
            </span>
          ))}
        </div>
        
        <div 
          ref={buttonsRef} 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-5 overflow-visible"
        >
          <button
            onClick={() => setShowPersonality(!showPersonality)}
            className="group relative inline-flex items-center overflow-visible rounded-full bg-green-600 px-8 py-4 text-lg font-medium text-white transition-all duration-300 ease-out hover:bg-green-700 hover:shadow-xl shadow-md"
          >
            <span className="flex items-center overflow-visible">
              {showPersonality ? "Hide Traits" : "Show Your Traits"}
              <Sparkles className="h-5 w-5 ml-2" />
            </span>
          </button>
          
          <button
            onClick={() => navigateToSection('journey')}
            className="group relative inline-flex items-center overflow-visible rounded-full bg-white border border-green-300 px-8 py-4 text-lg font-medium text-green-900 transition-all duration-300 ease-out hover:bg-green-50 hover:shadow-xl shadow-md"
          >
            <span className="flex items-center overflow-visible">
              Your Journey
              <Gift className="h-5 w-5 ml-2 text-emerald-500" />
            </span>
          </button>
        </div>
      </div>
      
      {/* Gift decoration at bottom */}
      <div className="absolute bottom-10 right-10 z-10 overflow-visible">
        <Gift className="h-16 w-16 text-[#FFC107] animate-bounce filter drop-shadow-glow" style={{ animationDuration: '3s' }} />
      </div>
      
      {/* Heart decorations */}
      <div className="absolute top-10 left-10 z-10 overflow-visible">
        <Heart className="h-12 w-12 text-pink-400 animate-pulse filter drop-shadow-glow" style={{ animationDuration: '2s' }} />
      </div>
      <div className="absolute top-20 right-16 z-10 overflow-visible">
        <Heart className="h-8 w-8 text-pink-300 animate-pulse filter drop-shadow-glow" style={{ animationDuration: '3s' }} />
      </div>
      
      {/* Custom hero bottom decoration instead of wave */}
      <div className="absolute bottom-0 left-0 w-full z-30 overflow-visible" >
        
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-24 w-full"
        >
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            fill="#132218"
            className="drop-shadow-md"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
