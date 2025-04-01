import React, { useRef, useEffect } from 'react';
import { Heart, Fish, Leaf, Cross, Pizza, Beaker, Anchor, Cat, Mountain, Music, Shirt, Diamond, Sparkles, Film, Coffee, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PersonalityTrait {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const Personality: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  
  // Alyssa's personality traits 
  const personalityTraits: PersonalityTrait[] = [
    {
      icon: <Fish className="h-8 w-8 text-blue-500" />,
      title: "Milk Fish Lover",
      description: "Finds joy in this delicious fish, appreciating its unique flavor and cultural significance."
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Green Enthusiast",
      description: "Drawn to the color green for its calming effect and connection to nature and growth."
    },
    {
      icon: <Cross className="h-8 w-8 text-purple-500" />,
      title: "Jesus Follower",
      description: "Faith is a cornerstone of her life, providing guidance, comfort, and purpose."
    },
    {
      icon: <Pizza className="h-8 w-8 text-yellow-600" />,
      title: "Leylam Food Fan",
      description: "Samot nag naay itlog."
    },
    {
      icon: <Beaker className="h-8 w-8 text-teal-500" />,
      title: "Science Enthusiast",
      description: "Fascinated by the wonders of science and how it explains the world around us."
    },
    {
      icon: <Leaf className="h-8 w-8 text-pink-500" />,
      title: "Flower Lover",
      description: "Delights in the beauty and fragrance of flowers, finding joy in nature's colorful creations."
    },
    {
      icon: <Cat className="h-8 w-8 text-amber-500" />,
      title: "Cute Animal Lover",
      description: "Melts at the sight of adorable creatures, finding joy in their innocent beauty."
    },
    {
      icon: <Mountain className="h-8 w-8 text-emerald-600" />,
      title: "Nature Enthusiast",
      description: "Finds peace, inspiration, and beauty in the natural world and its wonders."
    },
    {
      icon: <Shirt className="h-8 w-8 text-pink-500" />,
      title: "Cute Dress Lover",
      description: "Appreciates beautiful, cute dresses that express personality and feminine style."
    },
    {
      icon: <Music className="h-8 w-8 text-indigo-500" />,
      title: "Music Aficionado",
      description: "Connects deeply with music that touches the soul and expresses emotions."
    },
    {
      icon: <Diamond className="h-8 w-8 text-purple-300" />,
      title: "Jewelry Lover",
      description: "Appreciates beautiful necklaces and shiny accessories that add elegance to any outfit."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-400" fill="currentColor" />,
      title: "Barbie Fan",
      description: "Loves all things Barbie, embracing the iconic doll's style, positivity, and endless possibilities."
    },
   
    {
      icon: <Film className="h-8 w-8 text-purple-400" />,
      title: "Movie Enthusiast",
      description: "Loves watching movies, finding joy in storytelling and getting lost in different worlds on screen."
    },
    {
      icon: <Coffee className="h-8 w-8 text-amber-600" />,
      title: "Birch Tree Milk Fan",
      description: "Enjoys the unique taste of Birch Tree milk, making it a special part of her daily routine."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-300" />,
      title: "Nail Art Lover",
      description: "Takes pride in her beautiful nail designs, expressing creativity through stunning manicures."
    },
    {
      icon: <Moon className="h-8 w-8 text-indigo-400" />,
      title: "Sleep Enthusiast",
      description: "Loves her peaceful moments of rest, finding comfort and energy in a good night's sleep."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-400" fill="currentColor" />,
      title: "Cuddle Master",
      description: "Enjoys warm, cozy cuddles that make everything feel better and more comforting."
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-400" fill="currentColor" />,
      title: "Sweet Kisses",
      description: "Spreads love and joy through her affectionate kisses, making moments extra special."
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-400" fill="currentColor" />,
      title: "Lovingly Clingy",
      description: "Shows her love through being close and connected, making her presence felt in the most endearing way."
    }, {
      icon: <Heart className="h-8 w-8 text-red-500" fill="currentColor" />,
      title: "Selfless Helper",
      description: "Always helps others with all of her heart, sometimes ignoring herself just to lift up someone else.",
      highlight: true
    },
  ];
  
  useEffect(() => {
    if (sectionRef.current && itemsRef.current.filter(Boolean).length) {
      // Fix: COMPLETELY remove stagger effects for headings and paragraph
      const heading = sectionRef.current.querySelector('h2');
      const subtitle = sectionRef.current.querySelector('p');
      
      // Create a simple timeline without text animations
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center center",
          toggleActions: "play none none none"
        }
      });
      
      // Stagger animation for personality trait cards only
      masterTimeline.fromTo(
        itemsRef.current.filter(Boolean),
        { 
          y: 50, 
          opacity: 0, 
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add subtle hover effect animation
            itemsRef.current.filter(Boolean).forEach((item, index) => {
              if (item) {
                gsap.to(item, {
                  y: -5,
                  duration: 2 + (index * 0.2),
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: index * 0.1
                });
              }
            });
          }
        }
      );
      
      // Cleanup
      return () => {
        masterTimeline.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="personality" 
      className="py-16 relative bg-transparent text-white overflow-visible"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <Heart className="inline-block h-8 w-8 text-green-300 mb-4" fill="rgba(255,255,255,0.2)" />
          <h2 className="text-4xl font-bold text-white font-birthday overflow-visible">What Makes Alyssa Special</h2>
          <p className="mt-4 text-xl text-green-100 font-handwritten overflow-visible">
            A wonderful person with these amazing traits
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0">
          {personalityTraits.map((trait, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className={`personality-card relative flex flex-col overflow-visible rounded-xl ${
                trait.highlight ? 'bg-green-800/60 border-2 border-green-400' : 'bg-[#1E3A2B]/70 backdrop-blur-sm border-2 border-dashed border-green-400/30'
              } shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-green-400 hover:-translate-y-2 hover:scale-105`}
              style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/10 transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 transform -translate-x-10 translate-y-10"></div>
              </div>
              
              <div className="p-6 relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    trait.highlight ? 'bg-gradient-to-br from-green-500 to-green-700' : 'bg-gradient-to-br from-green-600/50 to-green-800/50'
                  } shadow-md transition-transform duration-300 hover:scale-125 hover:rotate-12`}>
                    {trait.icon}
                    
                    {/* Sparkle accent for highlight */}
                    {trait.highlight && (
                      <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                        <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white ml-3 font-birthday transition-all duration-300 hover:text-yellow-300 truncate overflow-visible group-hover:text-green-300">
                    {trait.title}
                  </h3>
                </div>
                
                <p className="text-green-100 font-handwritten flex-grow overflow-visible whitespace-normal">
                  {trait.description}
                </p>
                
                <div className="mt-3 text-center opacity-70 hover:opacity-100 transition-opacity transform scale-100 hover:scale-125">
                  <Heart className="h-4 w-4 text-red-400 inline-block hover:text-pink-500 transition-colors" fill="currentColor" />
                </div>
              </div>
              
              {/* Add shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-700 transform -translate-x-full hover:translate-x-full -skew-x-12 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
      
     
    </section>
  );
};

export default Personality;
