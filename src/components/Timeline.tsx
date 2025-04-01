import React, { useEffect, useRef } from 'react';
import { 
  Heart, GraduationCap, Book, 
  Star, Plane, Sparkles, Mountain, 
  Users, Clock, PenTool, Music, Award
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins if not registered in parent component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineEvent {
  title: string;
  description: string;
  icon: string;
  year?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
  description?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-6 w-6 text-pink-500" fill="currentColor" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-pink-500" />,
  Book: <Book className="h-6 w-6 text-green-500" />,
  Plane: <Plane className="h-6 w-6 text-teal-500" />,
  Star: <Star className="h-6 w-6 text-amber-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-emerald-500" />,
  Mountain: <Mountain className="h-6 w-6 text-green-500" />,
  Users: <Users className="h-6 w-6 text-purple-500" />,
  Clock: <Clock className="h-6 w-6 text-purple-500" />,
  PenTool: <PenTool className="h-6 w-6 text-rose-500" />,
  Music: <Music className="h-6 w-6 text-blue-500" />,
  Award: <Award className="h-6 w-6 text-yellow-500" />
};

// Images for each timeline event - using direct paths
const eventImages = [
  '/src/assets/Bday/baby.png',
  '/src/assets/Bday/baby.jpg',
  '/src/assets/Bday/highschool.jpg',
  '/src/assets/Bday/cousin.jpg',
  '/src/assets/Bday/barkada3.jpg',
  '/src/assets/Bday/graduate.png',
  '/src/assets/Bday/lord.png',
  '/src/assets/Bday/bff.jpg',
];

const defaultEvents: TimelineEvent[] = [
  {
    title: 'Went to Philippines for College',
    description: 'Left everything behind to pursue education, showing incredible courage and determination.',
    icon: 'Plane'
  },
  {
    title: 'Speaks Three Languages',
    description: 'Her dedication and talent enabled her to master multiple languages, bridging cultures effortlessly.',
    icon: 'Book'
  },
  {
    title: 'Graduated Despite Challenges',
    description: 'Overcame every obstacle, including many tearful nights, to earn her degree through sheer determination.',
    icon: 'GraduationCap'
  },
  {
    title: 'Lives with Passion',
    description: 'Approaches life with enthusiasm and genuine passion that inspires everyone around her.',
    icon: 'Heart'
  },
  {
    title: 'Gives 100% Effort',
    description: 'No matter the task, she always dedicates herself fully, never settling for less than her best.',
    icon: 'Star'
  },
  {
    title: 'The Journey Continues',
    description: 'Within you lies untapped potential waiting to bloom. Your story is still being written, with countless beautiful chapters ahead.',
    icon: 'Sparkles'
  }
];

const Timeline: React.FC<TimelineProps> = ({ 
  events = defaultEvents,
  title = "Your Amazing Journey",
  description = "A celebration of your achievements and growth"
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Animate the title with scroll trigger
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reset"
        }
      });
    }
    
    // Animate each timeline item with scroll trigger
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.set(item, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0
        });
        
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
            toggleActions: "play none none reset"
          },
          delay: index * 0.1
        });
      }
    });
    
    // Animate the floating images
    imagesRef.current.forEach((image, index) => {
      if (image) {
        // Set initial state
        gsap.set(image, {
          opacity: 0,
          y: 30,
          rotation: index % 2 === 0 ? -5 : 5
        });
        
        // Animate in when scrolled to
        gsap.to(image, {
          opacity: 0.9,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: itemsRef.current[index],
            start: "top bottom-=50",
            toggleActions: "play none none reset"
          },
          delay: index * 0.1 + 0.3
        });
        
        // Add floating animation
        gsap.to(image, {
          y: '-10px',
          rotation: index % 2 === 0 ? '3deg' : '-3deg',
          duration: 2 + index % 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      }
    });
    
    // Cleanup ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (timelineRef.current && itemsRef.current.filter(Boolean).length) {
      // Create a master timeline
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate timeline items one by one with staggered effect
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {
              // Highlight the active item
              gsap.to(item, {
                backgroundColor: "rgba(72, 187, 120, 0.1)",
                borderLeftColor: "#4ADE80",
                duration: 0.3
              });
              
              // Scale up the timeline dot
              const dot = item.querySelector('.timeline-dot');
              if (dot) {
                gsap.to(dot, {
                  scale: 1.5,
                  backgroundColor: "#4ADE80",
                  duration: 0.3
                });
              }
              
              // Animate the timeline icon
              const icon = item.querySelector('.timeline-icon');
              if (icon) {
                gsap.to(icon, {
                  rotation: 360,
                  scale: 1.2,
                  duration: 0.5,
                  ease: "back.out(1.7)"
                });
              }
            },
            onLeaveBack: () => {
              // Reset styles when scrolling back up
              gsap.to(item, {
                backgroundColor: "transparent",
                borderLeftColor: "rgba(167, 243, 208, 0.5)",
                duration: 0.3
              });
              
              const dot = item.querySelector('.timeline-dot');
              if (dot) {
                gsap.to(dot, {
                  scale: 1,
                  backgroundColor: "#48BB78",
                  duration: 0.3
                });
              }
              
              const icon = item.querySelector('.timeline-icon');
              if (icon) {
                gsap.to(icon, {
                  rotation: 0,
                  scale: 1,
                  duration: 0.3
                });
              }
            }
          }
        });
        
        // Add card reveal animation
        tl.fromTo(item.querySelector('.card'),
          { 
            y: 20, 
            opacity: 0, 
            scale: 0.95 
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.6,
            ease: "back.out(1.7)"
          }
        );
        
        // Add image reveal animation if available
        const imageEl = imagesRef.current[index];
        if (imageEl) {
          tl.fromTo(imageEl,
            { 
              x: index % 2 === 0 ? 50 : -50, 
              opacity: 0, 
              rotation: index % 2 === 0 ? 5 : -5 
            },
            { 
              x: 0, 
              opacity: 1, 
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.5)"
            },
            "-=0.4"
          );
        }
        
        // Add text reveal animations
        tl.from(item.querySelectorAll('h3, p, .year-badge'),
          { 
            y: 10, 
            opacity: 0, 
            stagger: 0.1,
            duration: 0.4 
          },
          "-=0.5"
        );
        
        // Add to master timeline
        masterTimeline.add(tl, index * 0.1);
      });
      
      // Animate the final star
      const finalStar = document.querySelector('.timeline-end-star');
      if (finalStar) {
        masterTimeline.fromTo(finalStar,
          { scale: 0, opacity: 0, rotation: -180 },
          { 
            scale: 1, 
            opacity: 1, 
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
          }
        );
      }
      
      return () => {
        // Clean up animations on unmount
        if (masterTimeline) masterTimeline.kill();
      };
    }
  }, [events.length]);

  return (
    <section id="journey" className="py-16 bg-transparent text-white relative overflow-visible">
      {/* Background pattern - subtle pattern instead of solid color */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="opacity-5">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#a7f3d0" />
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-12 text-center overflow-visible">
          <Star className="h-8 w-8 inline-block mb-4 text-green-300" />
          <h2 
            ref={titleRef} 
            className="text-4xl font-bold text-white font-birthday mb-4 overflow-visible"
          >
            {title}
          </h2>
          <p className="text-xl text-green-100 font-handwritten overflow-visible">{description}</p>
        </header>
        
        <div ref={timelineRef} className="relative max-w-4xl mx-auto overflow-visible">
          {/* Timeline events */}
          <div className="px-4 sm:px-0 overflow-visible">
            {events.map((event, index) => (
              <div 
                key={index}
                className="timeline-item group relative pl-10 pb-10 border-l-2 border-green-200/50 last:border-transparent overflow-visible "
                // ref={el => itemsRef.current[index] = el}
              >
                <div className="timeline-dot absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-green-400 ring-4 ring-green-900/50 transition-all duration-300"></div>
                <div className="timeline-icon absolute left-[-16px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-900 shadow-md transition-all duration-300">
                  {iconMap[event.icon] || <Star className="h-6 w-6 text-amber-500" />}
                </div>
                
                {/* Content container - keep green background */}
                <div className="card rounded-xl border border-green-200/20 bg-green-900/50 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-green-300/30 overflow-visible">
                  {event.year && (
                    <span className="year-badge inline-block bg-green-700/50 text-green-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 shadow-sm">
                      {event.year}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-white font-birthday overflow-visible">{event.title}</h3>
                  <p className="mt-2 text-green-100 font-handwritten overflow-visible">{event.description}</p>
                  
                  {/* Floating image related to the timeline event */}
                  <div 
                    ref={el => imagesRef.current[index] = el}
                    className={`absolute ${index % 2 === 0 ? 'right-[-180px]' : 'right-[-180px]'} top-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg border-2 border-green-900/50 hidden md:block transition-all duration-300 group-hover:border-green-500/50 z-10`}
                  >
                    {/* Show image for this event if available, otherwise use a color gradient */}
                    {eventImages[index] ? (
                      <img 
                        src={eventImages[index]} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                        <div className="text-white opacity-50">
                          {iconMap[event.icon] || <Star className="h-10 w-10" />}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Final animation element */}
            <div className="absolute -bottom-4 left-[-16px] timeline-end-star overflow-visible z-20">
              <div className="h-12 w-12 bg-green-900/70 rounded-full flex items-center justify-center shadow-lg border-2 border-green-400/50">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add a bottom margin to prevent content cutoff */}
      <div className="h-8 md:h-12"></div>
    </section>
  );
};

export default Timeline;
