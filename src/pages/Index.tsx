import React, { useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Confetti from "../components/Confetti";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import Personality from "../components/Personality";
import Encouragement from "../components/Encouragement";
import SpecialMessage from "../components/SpecialMessage";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import BirthdayCakeSection from "../components/BirthdayCakeSection";
import { User, Award, Heart, Smile, Star, Clock, Music, Mountain, PenTool, Users, ArrowUp } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Customized for Alyssa
const birthdayPersonName = "Alyssa";
const creatorName = "Your Secret Admirer";

// Timeline events for Alyssa's life journey
const timelineEvents = [
  {
    year: "",
    title: "A Star is Born",
    description: "The world welcomed a beautiful baby girl who would grow up to brighten the lives of everyone around her.",
    icon: "Star"
  },
  {
    year: "",
    title: "Barbie Dreams Begin",
    description: "Discovered the magical world of Barbie that would inspire creativity and imagination for years to come.",
    icon: "Heart"
  },
  {
    year: "",
    title: "High School Adventures",
    description: "Made lifelong friendships and discovered new interests while navigating the exciting high school years.",
    icon: "Users"
  },
  {
    year: "",
    title: "Philippines Journey",
    description: "Left everything behind to pursue education in the Philippines, showing incredible courage and determination.",
    icon: "Plane"
  },
  {
    year: "",
    title: "OJT Experience",
    description: "Getting a taste of the real world through On-the-Job Training, learning valuable skills for your future.",
    icon: "Briefcase"
  },
  {
    year: "",
    title: "Graduation Triumph",
    description: "Successfully graduated, overcoming every obstacle with determination and hard work.",
    icon: "Award"
  },
  {
    year: "Present",
    title: "Serving the Lord",
    description: "Dedicated to serving God with all your heart, spreading love and kindness to everyone around you.",
    icon: "Heart"
  },
  {
    year: "Future",
    title: "Beautiful Journey Continues",
    description: "Your story continues to unfold with endless possibilities and beautiful moments ahead.",
    icon: "Sparkles"
  }
];

// Special messages from loved ones
const specialMessages = [
  // {
  //   id: 1,
  //   message: "You bring so much joy to our lives. Your kindness and spirit light up every room!",
  //   sender: "Mom & Dad",
  //   relation: "Parents"
  // },
  // {
  //   id: 2,
  //   message: "To my amazing sister - I'm so proud of the person you've become. Happy Birthday!",
  //   sender: "Your Ate",
  //   relation: "Sister"
  // },
  // {
  //   id: 3,
  //   message: "Your friendship means the world to me. Thank you for always being there!",
  //   sender: "Best Friend",
  //   relation: "Friend"
  // }
];

// Personality traits
const personalityTraits = [
  {
    id: 1,
    trait: "Creative",
    description: "Always thinking outside the box with imaginative ideas",
    icon: <PenTool className="w-6 h-6 text-pink-400" />
  },
  {
    id: 2,
    trait: "Kind",
    description: "Showing compassion and kindness to everyone you meet",
    icon: <Heart className="w-6 h-6 text-pink-400" />
  },
  {
    id: 3,
    trait: "Patient",
    description: "Taking time to understand others and never rushing to judgment",
    icon: <Clock className="w-6 h-6 text-pink-400" />
  },
  {
    id: 4,
    trait: "Adventurous",
    description: "Always ready to try new things and explore the world",
    icon: <Mountain className="w-6 h-6 text-pink-400" />
  },
  {
    id: 5,
    trait: "Funny",
    description: "Bringing laughter and joy wherever you go",
    icon: <Smile className="w-6 h-6 text-pink-400" />
  },
  {
    id: 6,
    trait: "Loyal",
    description: "A dedicated friend who's always there when needed",
    icon: <User className="w-6 h-6 text-pink-400" />
  }
];

// Reusable section transition component
const SectionTransition: React.FC<{from: string; to: string}> = ({ from, to }) => {
  return (
    <div className="relative z-10 py-2 -mb-1 -mt-1">
      <svg
        className="w-full h-16 sm:h-24 md:h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          style={{
            fill: 'url(#gradient)',
            filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))'
          }}
        ></path>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Starburst decorative element for section transitions
const StarBurst: React.FC<{position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'}> = ({ position }) => {
  const positionClass = 
    position === 'top-left' ? 'top-0 left-0' :
    position === 'top-right' ? 'top-0 right-0' :
    position === 'bottom-left' ? 'bottom-0 left-0' :
    position === 'bottom-right' ? 'bottom-0 right-0' :
    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    
  return (
    <div className={`absolute ${positionClass} w-32 h-32 opacity-20 z-10`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 0 L63 38 L100 38 L69 59 L81 100 L50 75 L19 100 L31 59 L0 38 L37 38 Z" fill="#FFC107"/>
      </svg>
    </div>
  );
};

// Floating decorative elements for section backgrounds
const FloatingElements: React.FC<{count: number; color: string | string[]; type?: 'circle' | 'square' | 'mixed' | 'birthday'; section?: string}> = 
  ({ count = 10, color = "#43A047", type = 'mixed', section = '' }) => {
  
  // Create an array of elements with randomized properties
  const elements = Array.from({ length: count }).map((_, index) => {
    const size = 20 + Math.random() * 60;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const opacity = 0.03 + Math.random() * 0.07;
    const delay = Math.random() * 5;
    const duration = 15 + Math.random() * 20;
    
    // Handle color variation
    const backgroundColor = Array.isArray(color) 
      ? color[Math.floor(Math.random() * color.length)]
      : color;
    
    // Birthday-themed elements
    if (type === 'birthday') {
      // Choose from birthday-themed emojis
      const birthdayEmojis = ["🎂", "🎁", "🎊", "🎉", "🎈", "✨", "💖", "🌟"];
      const emoji = birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)];
      
      return (
        <div
          key={index}
          className="absolute text-2xl sm:text-3xl md:text-4xl transform"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            opacity: 0.2 + Math.random() * 0.4,
            animation: `float ${duration}s ease-in-out infinite, spin ${30 + Math.random() * 20}s linear infinite`,
            animationDelay: `${delay}s`,
            zIndex: 0,
            filter: 'blur(1px)',
            transform: 'rotate(0deg) translateZ(0)',
            willChange: 'transform',
            textShadow: '0 0 15px rgba(255,255,255,0.3)'
          }}
          data-section={section}
        >
          {emoji}
        </div>
      );
    }
    
    // Select shape based on type or random if mixed
    const shape = type === 'mixed' 
      ? Math.random() > 0.5 ? 'rounded-full' : 'rounded-md' 
      : type === 'circle' ? 'rounded-full' : 'rounded-md';
    
    return (
      <div
        key={index}
        className={`absolute ${shape}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          backgroundColor,
          opacity,
          animation: `float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          filter: 'blur(8px)',
          transform: 'translateZ(0)',
          willChange: 'transform',
          zIndex: 0
        }}
        data-section={section}
      />
    );
  });
  
  return <>{elements}</>;
};

// Update the helper function to handle text animation more reliably
const splitTextForAnimation = (element: Element) => {
  // Skip processing if element is already processed
  if (element.classList.contains('split-text-processed')) return;
  
  // Store original content for fallback
  const originalContent = element.innerHTML;
  
  try {
    // Clear the element and mark as processed
    element.innerHTML = '';
    element.classList.add('split-text-processed');
    
    // Create a wrapper for the content
    const wrapper = document.createElement('span');
    wrapper.className = 'stagger-wrapper inline-block';
    wrapper.innerHTML = originalContent;
    element.appendChild(wrapper);
    
    // Apply animation to the wrapper
    gsap.fromTo(wrapper, 
      { y: 15, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "back.out(1.7)",
        delay: 0.1
      }
    );
  } catch (error) {
    // Fallback in case of error - restore original content
    console.error('Error in text animation, restoring content', error);
    element.innerHTML = originalContent;
    element.classList.remove('split-text-processed');
  }
};

const Index: React.FC = () => {
  const [birthdayPersonName, setBirthdayPersonName] = useState("Alyssa");
  const [specialMessagesToShow, setSpecialMessagesToShow] = useState(specialMessages);
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    // Set document title
    document.title = "Happy Birthday Alyssa";
    
    // Initialize GSAP animations for sections and elements - WITHOUT text animation
    const sections = document.querySelectorAll('section');
    
    // Create a master timeline
    const masterTimeline = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.8
      }
    });
    
    // Remove all p tag and heading tag animations completely, only animate components
    sections.forEach((section, i) => {
      // Only target cards and buttons
      const buttons = section.querySelectorAll('button, a.btn');
      const cards = section.querySelectorAll('.card, .media-item, .timeline-item, .personality-card');
      
      // Fix: Make sure all text elements are visible
      section.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(el => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
        (el as HTMLElement).style.overflow = "visible";
      });
      
      // Create a timeline for each section
      const sectionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true // Set to true to prevent re-triggering animations
        }
      });
      
      // Improved button animations with spring effect
      sectionTimeline.fromTo(buttons,
        { y: 20, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          stagger: 0.15, 
          duration: 0.5, 
          ease: "elastic.out(1.2, 0.5)" 
        },
        0
      );
      
      // Card animations with cleaner staggering
      sectionTimeline.fromTo(cards,
        { 
          y: 30, 
          opacity: 0, 
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.08,
          duration: 0.6, 
          ease: "back.out(1.7)",
          onComplete: () => {
            // More natural floating animation for cards
            gsap.to(cards, {
              y: (i, el) => gsap.utils.random(-5, -10),
              duration: (i, el) => gsap.utils.random(2, 4),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.2
            });
          }
        },
        "-=0.2"
      );
      
      // Add section timeline to master timeline
      masterTimeline.add(sectionTimeline, i * 0.1);
    });
    
    // Enhanced parallax effect for floating elements with less extreme movement
    const floatingElements = document.querySelectorAll('[data-section]');
    
    floatingElements.forEach(element => {
      const section = element.getAttribute('data-section');
      if (section) {
        const sectionEl = document.querySelector(`#${section}`);
        if (sectionEl) {
          ScrollTrigger.create({
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              // Reduce values to prevent elements from moving too far off-screen
              const yPos = progress * 30 - 15; // Less dramatic movement
              const xPos = (progress - 0.5) * 8; // Very subtle horizontal movement
              
              gsap.to(element, {
                y: yPos,
                x: xPos,
                duration: 0.5,
                ease: "none"
              });
            }
          });
        }
      }
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Top floating elements with layered appearance */}
      <FloatingElements 
        count={10}
        color={["#FFDCF3", "#C9F0FF", "#E1FFE2"]} 
        type="mixed" 
      />

      {/* Main content - Removed opacity animation from main content */}
      <div ref={mainRef} className="relative z-10 overflow-visible">
        {/* Hero section with birthday message */}
        <Hero 
          name={birthdayPersonName}
          specialMessages={specialMessages.map(msg => msg.message)}
        />

        {/* Timeline section with Alyssa's journey */}
        <div className="relative overflow-visible">
          <FloatingElements 
            count={8}
            color={["#DCFCE7", "#A5D6A7", "#66BB6A"]} 
            type="mixed" 
            section="timeline"
          />
          <Timeline 
            events={timelineEvents}
          />
        </div>

        {/* Personality section highlighting Alyssa's traits */}
        <div className="relative overflow-visible">
          <FloatingElements 
            count={10}
            color={["#A5D6A7", "#4CAF50", "#2E7D32"]} 
            type="birthday" 
            section="personality"
          />
          <Personality />
        </div>

        {/* Gallery section */}
        <div className="relative overflow-visible">
          <FloatingElements 
            count={8}
            color={["#D8B4FE", "#C084FC", "#A855F7"]} 
            type="circle"
            section="gallery" 
          />
          <Gallery />
        </div>

       
        <div className="relative overflow-visible">
          <FloatingElements 
            count={8}
            color={["#BBF7D0", "#86EFAC", "#4ADE80"]} 
            type="birthday"
            section="special-message" 
          />
          <SpecialMessage />
        </div>
      
        {/* Encouragement section */}
        <div className="relative overflow-visible">
          <FloatingElements 
            count={10}
            color={["#FBCFE8", "#F9A8D4", "#F472B6"]} 
            type="mixed"
            section="encouragement" 
          />
          <Encouragement />
        </div>

        {/* Birthday cake section */}
        <div className="relative overflow-visible">
          <FloatingElements 
            count={12}
            color={["#FFC107", "#FFECB3", "#FFD54F"]} 
            type="birthday"
            section="birthday-wish" 
          />
          <BirthdayCakeSection name={birthdayPersonName} />
        </div>

        {/* Footer */}
        <Footer creatorName={creatorName} />

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Add smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Card hover effects */
        .card, .media-item, .timeline-item, .personality-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          overflow: visible !important;
        }
        
        .card:hover, .media-item:hover, .timeline-item:hover, .personality-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        /* Container animation styles */
        .heading-container, .paragraph-container {
          display: block;
          overflow: visible !important;
        }
        
        /* Fix for hidden content */
        h1, h2, h3, h4, h5, h6, p, div {
          overflow: visible !important;
        }
        
        /* Fix text overflow in containers */
        .text-wrapper, .content-wrapper {
          overflow: visible !important;
          word-break: normal;
          overflow-wrap: break-word;
        }
        
        /* Improved focus styles for accessibility */
        button:focus-visible, a:focus-visible {
          outline: 2px solid #86EFAC;
          outline-offset: 2px;
        }

        /* Ensure section containers are visible */
        section {
          overflow: visible !important;
        }
        
        /* Fix timeline paragraphs */
        .timeline-item p {
          display: block !important;
          visibility: visible !important;
          white-space: normal !important;
        }
        
        /* Line segment animation for paragraphs */
        .line-segment {
          display: block;
          margin-bottom: 0.5em;
        }

        /* Fix mobile margin issue */
        @media (max-width: 640px) {
          body, html {
            overflow-x: hidden;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          section {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
