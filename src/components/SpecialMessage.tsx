import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

const SpecialMessage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelector('h2'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      });
    }

    if (heartsRef.current) {
      const hearts = heartsRef.current.querySelectorAll('.floating-heart');
      hearts.forEach((heart, index) => {
        gsap.to(heart, {
          y: "-20px",
          x: gsap.utils.random(-5, 5),
          rotation: gsap.utils.random(-15, 15),
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      });
    }
  }, []);
  
  const handleExpandMessage = () => {
    setExpanded(!expanded);
    
    if (messageRef.current) {
      if (!expanded) {
        // Expanding
        gsap.to(messageRef.current, {
          height: 'auto',
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            createHeartBurst();
          }
        });
      } else {
        // Collapsing
        gsap.to(messageRef.current, {
          height: '4.5rem',
          duration: 0.5,
          ease: "power2.in"
        });
      }
    }
  };
  
  const createHeartBurst = () => {
    if (!messageRef.current) return;
    
    const container = messageRef.current;
    const hearts = [];
    const colors = ['#f44336', '#e91e63', '#ff4081', '#ff80ab'];
    
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'absolute text-sm';
      heart.style.top = '50%';
      heart.style.left = '50%';
      heart.style.opacity = '0';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(heart);
      hearts.push(heart);
      
      gsap.to(heart, {
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 150,
        opacity: 1,
        scale: 0.5 + Math.random(),
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heart, {
            y: '+=30',
            opacity: 0,
            duration: 0.8,
            delay: Math.random(),
            onComplete: () => heart.remove()
          });
        }
      });
    }
  };

  return (
    <section 
      className="py-16 relative bg-transparent text-white"
      id="special-message"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div ref={headerRef} className="mb-12 text-center">
          <MessageCircle className="inline-block h-8 w-8 text-green-300 mb-4" />
          <h2 className="text-4xl font-bold text-white font-birthday">A Promise to Remember</h2>
          <p className="mt-4 text-xl text-green-100 font-handwritten">
            Some special words just for you on your special day
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div 
            className="relative max-w-xl mx-auto bg-green-50 p-6 rounded-xl border-2 border-green-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={handleExpandMessage}
          >
            <div 
              ref={heartsRef}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              <div className="floating-heart absolute top-0 left-5 text-red-500">❤️</div>
              <div className="floating-heart absolute top-10 right-10 text-red-500 text-sm">❤️</div>
              <div className="floating-heart absolute top-20 left-20 text-red-500 text-xs">❤️</div>
              <div className="floating-heart absolute bottom-10 right-5 text-red-500 text-sm">❤️</div>
              <div className="floating-heart absolute bottom-5 left-16 text-red-500 text-2xl">❤️</div>
            </div>
            
            <div 
              ref={messageRef}
              className="relative message-container overflow-hidden transition-all duration-500"
              style={{ height: expanded ? 'auto' : '4.5rem' }}
            >
              <p className="text-gray-700 leading-relaxed">
                Hey Alyssa, I want you to know that you are never alone. 
                <br /><br />
                In moments when life feels overwhelming, remember that your strength has already carried you through so much. 
                Your resilience is inspiring, and your heart is full of courage.
                <br /><br />
                No matter what challenges come your way, I believe in you. 
                Take each day one step at a time("DaybyDay"), and be gentle with yourself along the journey.
                <br /><br />
                You deserve all the happiness in the world!
                <br /><br />
                And remember, "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent container click from firing twice
                handleExpandMessage();
              }}
              className="mt-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full flex items-center justify-center mx-auto transition-colors duration-300 shadow-md"
            >
              <span>{expanded ? "Read less" : "Read more"}</span>
              <Heart className="ml-1 h-4 w-4" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0F1A14"></path>
        </svg>
      </div>
    </section>
  );
};

export default SpecialMessage;
