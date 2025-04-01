// Basic confetti functionality for birthday celebration
export interface ConfettiPiece {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  shape: string;
  initialDelay?: number; // Added for staggered animation timing
}

// Confetti config options
export interface ConfettiOptions {
  yRange?: [number, number]; // Min and max y position range
  initialDelay?: number; // Delay before animation starts
}

// Confetti shapes and colors - improved theme with darker tones
const SHAPES = ['circle', 'square', 'heart', 'star', 'triangle', 'diamond', 'gift'];
const COLORS = [
  // Darker greens
  '#1E3A2B', // dark forest green
  '#2E7D32', // darker green
  '#388E3C', // medium dark green
  '#43A047', // medium green
  
  // Medium greens
  '#66BB6A', // vibrant green 
  '#4CAF50', // google green
  
  // Light accents
  '#A5D6A7', // fresh green
  '#C8E6C9', // mint
  
  // Gold/yellow accents
  '#FFC107', // amber
  '#FFD54F', // light amber
  
  // Neutral accent
  '#FFFFFF', // white
];

// Generate a unique confetti piece
export function generateConfettiPiece(id: string, options?: ConfettiOptions): ConfettiPiece {
  const yRange = options?.yRange || [-20, -10]; // Default to above viewport
  const randomY = yRange[0] + Math.random() * (yRange[1] - yRange[0]); // Random value in range
  
  return {
    id,
    x: Math.random() * 100, // random x position across the full viewport width (in % units)
    y: randomY, // position based on options range
    size: Math.random() * 0.5 + 0.7, // random size (0.7-1.2)
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 2 + 3, // falling speed (more consistent)
    rotation: Math.random() * 360, // random initial rotation
    rotationSpeed: Math.random() * 2 - 1, // rotation speed
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    initialDelay: options?.initialDelay || 0 // Use provided delay or 0
  };
}

// Generate multiple confetti pieces
export function generateConfetti(count: number = 100, options?: ConfettiOptions): ConfettiPiece[] {
  const pieces: ConfettiPiece[] = [];
  for (let i = 0; i < count; i++) {
    pieces.push(generateConfettiPiece(`confetti-${Date.now()}-${i}`, options));
  }
  return pieces;
}

// Get SVG for a confetti shape
export function getShapeSVG(shape: string, color: string): string {
  switch (shape) {
    case 'circle':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="${color}" />
      </svg>`;
    case 'square':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="${color}" />
      </svg>`;
    case 'heart':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 90 L15 55 A25 25 0 0 1 50 20 A25 25 0 0 1 85 55 Z" fill="${color}"/>
      </svg>`;
    case 'star':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 L63 38 L100 38 L69 59 L81 100 L50 75 L19 100 L31 59 L0 38 L37 38 Z" fill="${color}"/>
      </svg>`;
    case 'triangle':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 L100 100 L0 100 Z" fill="${color}"/>
      </svg>`;
    case 'diamond':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="${color}"/>
      </svg>`;
    case 'gift':
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="30" width="80" height="60" fill="${color}" />
        <rect x="40" y="30" width="20" height="60" fill="${color === '#FFFFFF' ? '#43A047' : '#FFFFFF'}" />
        <rect x="10" y="10" width="80" height="20" fill="${color === '#FFFFFF' ? '#43A047' : '#FFFFFF'}" />
        <rect x="40" y="10" width="20" height="20" fill="${color}" />
      </svg>`;
    default:
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="${color}" />
      </svg>`;
  }
}

// Animation function not needed here anymore - moved to component
