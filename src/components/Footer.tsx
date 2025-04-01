import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sparkle from 'react-sparkle';

interface FooterProps {
  creatorName?: string;
}

const Footer: React.FC<FooterProps> = ({ creatorName = "Your Secret Admirer" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCloud, setShowCloud] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('src/assets/Bday/greet.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Preload the audio
    audioRef.current.load();

    // Create ScrollTrigger for footer
    if (footerRef.current && !hasAnimated) {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top center",
        onEnter: () => {
          // Show cloud message when footer enters viewport
          setTimeout(() => {
            setShowCloud(true);
          }, 1000);
        }
      });
    }

    if (showCloud && cloudRef.current && !hasAnimated) {
      gsap.fromTo(
        cloudRef.current,
        { 
          opacity: 0, 
          scale: 0.5,
          y: 20
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Hide cloud after 3 seconds
            setTimeout(() => {
              gsap.to(cloudRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                  setShowCloud(false);
                  setHasAnimated(true);
                }
              });
            }, 3000);
          }
        }
      );
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [showCloud, hasAnimated]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play music
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-8 bg-gradient-to-b from-[#0f1a14] to-[#071505] text-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <Sparkle
          color={"#ffb6c1"}
          count={20}
          minSize={5}
          maxSize={10}
          overflowPx={0}
          fadeOutSpeed={10}
        />
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10">
        {/* Cloud message */}
        <div className="mb-8 relative">
          <div className="bg-white/90 rounded-full px-8 py-4 shadow-lg relative">
            <p className="text-green-800 font-handwritten text-xl whitespace-nowrap">
              I know you're smiling rn HAHAHAHAHAHAH
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white/90"></div>
          </div>
          <div className="absolute -top-4 -right-4">
            <Sparkle
              color={"#ffb6c1"}
              count={5}
              minSize={3}
              maxSize={6}
              overflowPx={0}
              fadeOutSpeed={5}
            />
          </div>
        </div>

        <div className="mb-4 text-center">
          <p className="text-xl md:text-2xl font-handwritten text-center mb-6 text-green-200">
            "Hai kamusta ni kaon naka?"
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={toggleAudio}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 transition-colors shadow-lg"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            <Music size={28} className="text-white" />
          </button>
          
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-green-700 hover:bg-green-600 transition-colors shadow-lg"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX size={28} className="text-white" />
              ) : (
                <Volume2 size={28} className="text-white" />
              )}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
