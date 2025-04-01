import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Camera, ChevronLeft, ChevronRight, Heart, Video, UserRound, MessageCircle, Star, X } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption: string;
  thumbnail?: string; // For video
  name?: string; // Name of the person
  relationship?: string; // Relationship to Alyssa
}

interface GalleryProps {
  photos?: MediaItem[];
}

// Photos for the main gallery
const galleryPhotos = [
  {
    type: 'image' as const,
    url: '/assets/Bday/us.jpg',
    caption: 'APIL KOS BEAUTIFUL MEMORIES DYUD! AHHAHA'
  },
  {
    type: 'image' as const,
    url: '/assets/Bday/family.JPG',
    caption: "Cherished moments, a lifetime of love."  
  },
  {
    type: 'image' as const,
    url: '/assets/Bday/barkada1.PNG',
    caption: "Daughters of the Lord, shining in His love and grace."  
  },
  {
    type: 'image' as const,
    url: '/assets/Bday/barkada2.jpg',
    caption: 'Precious memories with special people'
  },
  {
    type: 'image' as const,
    url: '/assets/Bday/joji.PNG',
    caption: "I’ll never forget the way your eyes lit up this night."  
  },
  {
    type: 'image' as const,
    url: '/assets/Bday/barkada.jpeg',
    thumbnail: 'frens.jpg',
    caption: "Unforgettable moments with my favorite people in the perfect place."  
  }
];

// People who love Alyssa the most
const lovedOnes: MediaItem[] = [
  {
    type: 'image',
    url: '/assets/Bday/dad.PNG',
    caption: 'Forever your biggest supporter and protector.',
    name: 'Dad',
    relationship: 'Father'
  },
  {
    type: 'image',
    url: '/assets/Bday/mom.PNG',
    caption: 'The one who knows your heart better than anyone else.',
    name: 'Mom',
    relationship: 'Mother'
  },
  {
    type: 'image',
    url: '/assets/Bday/atehug.PNG',
    caption: 'Your sister, your friend, your lifelong companion.',
    name: 'Ate',
    relationship: 'Sister'
  },
  {
    type: 'image',
    url: '/assets/Bday/me.jpeg',
    caption: 'AHAHAHAHAHAHAHAHAHAHHAAHAHAHAHAHAHAHAHAHAHAHAHAHAHAH',
    name: 'Secret Superduper Ultra Omega Admirer!',
    relationship: 'Special Person'
  }
];

const Gallery: React.FC<GalleryProps> = ({ photos = galleryPhotos }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showLovedOnes, setShowLovedOnes] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lovedOnesRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lovedOnes.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + lovedOnes.length) % lovedOnes.length);
  };

  const toggleLovedOnes = () => {
    setShowLovedOnes(!showLovedOnes);
    if (!showLovedOnes) {
      // Reset to first slide when opening
      setCurrentSlide(0);
    }
  };
  
  useEffect(() => {
    // Enhanced birthday-themed animations
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom-=100px",
          toggleActions: "play none none reset"
        }
      });
    }
    
    // Animate grid items with a staggered reveal and birthday balloon effect
    if (gridRef.current) {
      const gridItems = gridRef.current.querySelectorAll('.media-item');
      
      gridItems.forEach((item, index) => {
        // Create a more playful entrance animation
        gsap.fromTo(item, 
          { 
            y: 80, 
            opacity: 0, 
            scale: 0.8, 
            rotation: gsap.utils.random(-5, 5) 
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom-=100px",
              toggleActions: "play none none reset"
            },
            onComplete: () => {
              // Add a subtle floating animation after items appear
              gsap.to(item, {
                y: gsap.utils.random(-8, -15),
                rotation: gsap.utils.random(-3, 3),
                duration: gsap.utils.random(2, 3),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: gsap.utils.random(0, 1)
              });
            }
          }
        );
      });
    }
    
    // Animate modal when shown with a more impressive entrance
    if (showLovedOnes && modalRef.current) {
      // Background overlay fade in
      gsap.fromTo(
        modalRef.current.parentElement,
        { backgroundColor: "rgba(0,0,0,0)" },
        { backgroundColor: "rgba(0,0,0,0.8)", duration: 0.4, ease: "power2.out" }
      );
      
      // Modal container animation
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add subtle pulsing glow effect to the border
            gsap.to(modalRef.current, {
              boxShadow: "0 0 30px rgba(134, 239, 172, 0.3)",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
      
      // Staggered entrance for modal elements
      const modalElements = modalRef.current.querySelectorAll('h3, .carousel-inner, button');
      gsap.fromTo(
        modalElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2 }
      );
    }
  }, [showLovedOnes, photos.length]);

  // Effect for carousel slides
  useEffect(() => {
    if (showLovedOnes && carouselRef.current) {
      // Enhanced carousel functionality - improved transitions
      const carouselInner = carouselRef.current.querySelector('.carousel-inner');
      if (carouselInner) {
        // Clear any previous animations
        gsap.killTweensOf(carouselInner.children);
        
        // Create a new GSAP timeline with better sequencing
        const tl = gsap.timeline();
        
        // Prep all slides - hide them but keep them in the DOM flow
        gsap.set(carouselInner.children, { 
          opacity: 0, 
          display: 'none',
          scale: 0.9,
          x: '+=20'
        });
        
        // Get active slide and previous active slide
        const activeSlide = carouselInner.children[currentSlide] as HTMLElement;
        
        if (activeSlide) {
          // Set the active slide to be visible first
          gsap.set(activeSlide, { display: 'block' });
          
          // Animate in with more appealing effects
          tl.to(activeSlide, { 
            opacity: 1, 
            scale: 1,
            x: 0,
            duration: 0.5, 
            ease: "back.out(1.3)",
            clearProps: "scale,x" // Clear these props after animation
          });
          
          // Preload next and previous slides for smoother transitions
          const nextIndex = (currentSlide + 1) % lovedOnes.length;
          const prevIndex = (currentSlide - 1 + lovedOnes.length) % lovedOnes.length;
          
          const nextSlide = carouselInner.children[nextIndex] as HTMLElement;
          const prevSlide = carouselInner.children[prevIndex] as HTMLElement;
          
          if (nextSlide && prevSlide) {
            // Preload but keep invisible
            gsap.set([nextSlide, prevSlide], { 
              display: 'block', 
              opacity: 0, 
              scale: 0.9,
              x: 0,
              zIndex: -1 
            });
          }
          
          // Fix dots animation to make it more prominent
          const dots = document.querySelectorAll('.carousel-dot');
          gsap.fromTo(
            dots[currentSlide],
            { scale: 0.5 },
            { scale: 1.2, duration: 0.3, ease: "back.out(2)", yoyo: true, repeat: 1 }
          );
        }
      }
    }
  }, [currentSlide, showLovedOnes, lovedOnes.length]);

  // Effect to handle keydown events for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLovedOnes) return;
      
      if (e.key === 'Escape') {
        setShowLovedOnes(false);
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLovedOnes]);

  const renderMediaItem = (item: MediaItem, index: number) => {
    if (item.type === 'image') {
      return (
        <img 
          src={item.url}
          alt={item.name || `Image ${index + 1}`}
          className="h-full w-full object-cover transform transition-all duration-500"
          loading="lazy"
        />
      );
    } else {
      return (
        <div className="relative">
          <video 
            className="h-full w-full object-cover transform transition-all duration-500"
            controls
            autoPlay
            muted
            loop
            playsInline
            poster={item.thumbnail}
            onError={(e) => {
              console.error('Error loading video:', e);
              const video = e.target as HTMLVideoElement;
              video.style.display = 'none';
              // Show a fallback message
              const fallback = document.createElement('div');
              fallback.className = 'absolute inset-0 flex items-center justify-center bg-black/50 text-white';
              fallback.textContent = 'Video not available';
              video.parentElement?.appendChild(fallback);
            }}
            onLoadedData={(e) => {
              console.log('Video loaded successfully');
            }}
          >
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full">
            <Video className="h-4 w-4" />
          </div>
        </div>
      );
    }
  };

  return (
    <section id="gallery" className="py-16 relative bg-transparent text-white">
  


      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center" ref={headerRef}>
          <Camera className="inline-block h-8 w-8 text-green-300 mb-4" />
          <h2 className="text-4xl font-bold text-white font-birthday overflow-visible">Beautiful Memories</h2>
          <p className="mt-4 text-xl text-green-100 font-handwritten">
            Snapshots of special moments that tell your story
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" ref={gridRef}>
          {photos.slice(0, 6).map((photo, index) => (
            <div 
              key={index} 
              className="media-item relative rounded-xl overflow-hidden shadow-md transition-all duration-300 aspect-square"
              style={{ backgroundColor: "rgba(30, 58, 43, 0.4)" }}
            >
              <img 
                src={photo.url} 
                alt={photo.caption || "Birthday memory"} 
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold font-birthday">{photo.caption || "Precious Memory"}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => setShowLovedOnes(true)}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            <span>People Who Love You Most</span>
          </button>
        </div>
      </div>
      
      {/* Modal for loved ones gallery */}
      {showLovedOnes && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4 overflow-hidden" onClick={toggleLovedOnes}>
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#132218] rounded-xl p-6 max-w-2xl w-full shadow-2xl border border-green-500/30 max-h-[90vh] overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ aspectRatio: "1/1" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white font-birthday">People Who Love You Most</h3>
              <button 
                onClick={toggleLovedOnes}
                className="text-green-300 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div ref={carouselRef} className="carousel-container relative h-[calc(100%-5rem)] overflow-hidden">
              <div className="carousel-inner h-full overflow-hidden rounded-lg flex">
                {lovedOnes.map((person, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 h-full absolute inset-0"
                    style={{ display: index === currentSlide ? 'block' : 'none' }}
                  >
                    <div className="relative h-full">
                      {/* Background image */}
                      <div className="absolute inset-0 overflow-hidden">
                        {renderMediaItem(person, index)}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-2">
                              <UserRound size={16} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white font-birthday">{person.name}</h3>
                          </div>
                          
                          <p className="text-sm text-green-100 font-handwritten mb-2">{person.relationship}</p>
                          
                          <p className="text-white text-sm">{person.caption}</p>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <Heart size={16} className="text-pink-400 mr-1" fill="currentColor" />
                              <Star size={16} className="text-yellow-400" fill="currentColor" />
                            </div>
                            <div className="text-xs text-green-200 flex items-center">
                              <MessageCircle size={14} className="mr-1" /> Forever Love
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons - MOVED INSIDE the modal */}
              <div className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="bg-green-700/60 hover:bg-green-700/80 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 shadow-lg"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="bg-green-700/60 hover:bg-green-700/80 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 shadow-lg"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
              
              {/* Dots navigation */}
              <div className="absolute bottom-2 inset-x-0 flex justify-center pb-2">
                {lovedOnes.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`carousel-dot h-3 w-3 rounded-full mx-1.5 transition-all shadow-md ${
                      index === currentSlide 
                        ? 'bg-green-400 scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
