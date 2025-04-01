
// Confetti Generator

// Confetti shapes and colors
const SHAPES = ['circle', 'square', 'heart', 'star'];
const COLORS = [
  '#E8F5E9', // light mint
  '#C8E6C9', // mint
  '#A5D6A7', // fresh green
  '#81C784', // leaf green
  '#66BB6A', // vibrant green
  '#DCEDC8', // pale green
  '#F1F8E9', // off-white green
  '#B2DFDB', // teal hint
  '#E0F2F1', // light teal
  '#FFF9C4', // light yellow (accent)
  '#FFECB3', // light amber (accent)
  '#F0F4C3', // lime hint
];

// Confetti piece class
class ConfettiPiece {
  constructor(id) {
    this.id = id;
    this.x = Math.random() * 100; // random x position (%)
    this.y = -(Math.random() * 20) - 10; // start above viewport
    this.size = Math.random() * 0.5 + 0.7; // random size (0.7-1.2)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.speed = Math.random() * 3 + 2; // falling speed
    this.rotation = Math.random() * 360; // random initial rotation
    this.rotationSpeed = Math.random() * 2 - 1; // rotation speed
    this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    this.element = null;
  }

  // Create SVG for the confetti shape
  getSVG() {
    switch (this.shape) {
      case 'circle':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="${this.color}" />
        </svg>`;
      case 'square':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="${this.color}" />
        </svg>`;
      case 'heart':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 L15 55 A25 25 0 0 1 50 20 A25 25 0 0 1 85 55 Z" fill="${this.color}"/>
        </svg>`;
      case 'star':
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L63 38 L100 38 L69 59 L81 100 L50 75 L19 100 L31 59 L0 38 L37 38 Z" fill="${this.color}"/>
        </svg>`;
      default:
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="${this.color}" />
        </svg>`;
    }
  }

  // Create DOM element
  createElement() {
    const element = document.createElement('div');
    element.className = 'confetti';
    element.id = this.id;
    element.style.width = `${this.size}rem`;
    element.style.height = `${this.size}rem`;
    element.style.left = `${this.x}%`;
    element.style.top = `${this.y}%`;
    element.innerHTML = this.getSVG();
    this.element = element;
    return element;
  }

  // Update confetti position
  update() {
    this.y += this.speed / 10;
    this.rotation += this.rotationSpeed;
    
    // If confetti goes off screen, reset it to the top
    if (this.y > 110) {
      this.y = -(Math.random() * 20) - 10;
      this.x = Math.random() * 100;
    }
    
    if (this.element) {
      this.element.style.top = `${this.y}%`;
      this.element.style.left = `${this.x}%`;
      this.element.style.transform = `rotate(${this.rotation}deg)`;
    }
  }
}

// Generate confetti pieces
function generateConfetti(count = 100) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push(new ConfettiPiece(`confetti-${i}`));
  }
  return pieces;
}

// Initialize and start confetti
function initConfetti(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  
  // Create confetti pieces
  const pieces = generateConfetti(150);
  
  // Add pieces to container
  pieces.forEach(piece => {
    container.appendChild(piece.createElement());
  });
  
  // Animate confetti with GSAP
  pieces.forEach((piece, index) => {
    // Create unique animation for each piece
    gsap.to(piece.element, {
      y: "110%",
      rotation: piece.rotation + gsap.utils.random(180, 360),
      duration: gsap.utils.random(3, 8),
      ease: "power1.inOut",
      repeat: -1,
      delay: index * 0.02
    });
  });
  
  // Add burst of confetti after initial animation
  setTimeout(() => {
    const burstPieces = generateConfetti(50);
    burstPieces.forEach(piece => {
      container.appendChild(piece.createElement());
      gsap.to(piece.element, {
        y: "110%",
        rotation: piece.rotation + gsap.utils.random(180, 360),
        duration: gsap.utils.random(3, 8),
        ease: "back.inOut(1.7)",
        repeat: -1,
        delay: gsap.utils.random(0, 0.5)
      });
    });
  }, 1500);
  
  return pieces;
}
