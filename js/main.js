// Main JavaScript for Birthday Celebration Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Initialize confetti
  initConfetti('confettiContainer');
  
  // ===== Hero Section =====
  initHeroSection();
  
  // ===== Timeline Section =====
  initTimelineSection();
  
  // ===== Personality Section =====
  initPersonalitySection();
  
  // ===== Encouragement Section =====
  initEncouragementSection();
  
  // ===== Gallery Section =====
  initGallerySection();

  // ===== Special Message Section =====
  initSpecialMessageSection();
  
  // ===== Footer =====
  initFooter();
  
  // ===== Smooth Scrolling =====
  initSmoothScrolling();
  
  // ===== Section Transitions =====
  initSectionTransitions();
  
  // Initialize balloon placement
  initBalloons();
});

// Function to initialize balloons with random positions
function initBalloons() {
  const balloons = document.querySelectorAll('.balloon');
  
  balloons.forEach((balloon, index) => {
    // Random starting position
    const randomLeft = 10 + Math.random() * 80; // between 10% and 90% of width
    balloon.style.left = `${randomLeft}%`;
    
    // Random translation and rotation
    const randomTranslate = (Math.random() * 100) - 50; // between -50px and 50px
    const randomRotate = (Math.random() * 40) - 20; // between -20deg and 20deg
    
    balloon.style.setProperty('--translate', `${randomTranslate}px`);
    balloon.style.setProperty('--rotate', `${randomRotate}deg`);
  });
}

// Function to initialize section transitions
function initSectionTransitions() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        section.classList.add('in-view');
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.2)'
        });
      },
      onLeaveBack: () => {
        section.classList.remove('in-view');
        gsap.to(section, {
          opacity: 0.7,
          y: 30,
          duration: 0.5
        });
      },
      once: true
    });
    
    gsap.set(section, {
      opacity: 0.7,
      y: 30
    });
  });
}

// Hero Section Initialization
function initHeroSection() {
  const showTraitsBtn = document.getElementById('showTraitsBtn');
  const personalityTraits = document.getElementById('personalityTraits');
  const traits = personalityTraits.querySelectorAll('.trait');
  
  // Set initial state for traits (hidden)
  let traitsVisible = false;
  
  // Hero section animation with GSAP
  const heroTl = gsap.timeline();
  
  heroTl.from('.hero-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.5")
  .from('.hero-buttons > *', {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.3");
  
  // Apply colors to traits
  traits.forEach(trait => {
    trait.style.backgroundColor = trait.getAttribute('data-color');
  });
  
  // Toggle traits visibility
  showTraitsBtn.addEventListener('click', function() {
    traitsVisible = !traitsVisible;
    
    if (traitsVisible) {
      showTraitsBtn.querySelector('.btn-text').textContent = "Hide Traits";
      
      // Show traits with staggered animation
      gsap.to(traits, {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(1.7)",
        visibility: "visible" // Make sure traits are visible
      });
    } else {
      showTraitsBtn.querySelector('.btn-text').textContent = "Show Your Traits";
      
      // Hide traits
      gsap.to(traits, {
        opacity: 0,
        scale: 0.95,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: function() {
          // Once animation completes, hide traits
          traits.forEach(trait => {
            trait.style.visibility = "hidden";
          });
        }
      });
    }
  });
  
  // Add floating animation to hero elements
  gsap.to('.cake-icon', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
}

// Timeline Section Initialization
function initTimelineSection() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Add timeline icons
  timelineItems.forEach(item => {
    const icon = item.querySelector('.timeline-icon');
    const iconName = item.getAttribute('data-icon');
    icon.innerHTML = iconName;
  });
  
  // Animate timeline items when scrolled into view
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
    
    // Add special animations to the last item
    if (index === timelineItems.length - 1) {
      gsap.to(item.querySelector('.timeline-content'), {
        boxShadow: "0 0 20px rgba(102, 187, 106, 0.3)",
        repeat: -1,
        yoyo: true,
        duration: 2
      });
    }
  });
}

// Personality Section Initialization
function initPersonalitySection() {
  const personalityCards = document.querySelectorAll('.personality-card');
  
  // Add icons to personality cards
  personalityCards.forEach(card => {
    const icon = card.querySelector('.card-icon');
    const iconName = card.getAttribute('data-icon');
    icon.innerHTML = iconName;
  });
  
  // Set initial state for cards
  gsap.set(personalityCards, { 
    rotationY: -10,
    opacity: 0,
    transformPerspective: 1000
  });
  
  // Create flip animation for each card
  personalityCards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=50",
      onEnter: () => {
        gsap.to(card, {
          rotationY: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "elastic.out(1, 0.75)"
        });
      },
      once: true
    });
    
    // Add hover effects with GSAP
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
        duration: 0.3
      });
      
      gsap.to(card.querySelector('.card-heart'), {
        scale: 1.3,
        rotation: 15,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.5)"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        duration: 0.3
      });
      
      gsap.to(card.querySelector('.card-heart'), {
        scale: 1,
        rotation: 0,
        duration: 0.3
      });
    });
  });
}

// Encouragement Section Initialization
function initEncouragementSection() {
  const quoteBox = document.getElementById('quoteBox');
  const quoteButton = document.getElementById('quoteButton');
  const bibleVerseBox = document.getElementById('bibleVerseBox');
  
  let animating = false;
  
  // Initialize with a random Bible verse
  updateBibleVerse();
  
  // Quote button click handler
  quoteButton.addEventListener('click', function() {
    if (animating) return;
    
    animating = true;
    
    // Get a new quote
    const newQuote = getRandomQuote();
    const quoteText = quoteBox.querySelector('p');
    
    // Animate quote transition with GSAP
    if (quoteText.textContent !== 'Click the button below for a special message') {
      // If we already have a quote, animate it out then in with new quote
      gsap.to(quoteText, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          quoteText.textContent = newQuote;
          // Animate new quote in
          gsap.fromTo(quoteText,
            { y: -20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.4,
              onComplete: () => animating = false
            }
          );
          
          // Add sparkle effect
          createSparkles(quoteBox);
        }
      });
    } else {
      // First quote, just animate in
      quoteText.textContent = newQuote;
      gsap.fromTo(quoteText,
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4,
          onComplete: () => animating = false
        }
      );
      
      // Add sparkle effect
      createSparkles(quoteBox);
    }
  });
  
  // Button hover animation
  quoteButton.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out"
    });
    
    gsap.to(this.querySelector('.btn-icon'), {
      x: 0,
      opacity: 1,
      duration: 0.3
    });
    
    gsap.to(this.querySelector('.btn-text'), {
      x: -10,
      duration: 0.3
    });
  });
  
  quoteButton.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out"
    });
    
    gsap.to(this.querySelector('.btn-icon'), {
      x: '100%',
      opacity: 0,
      duration: 0.3
    });
    
    gsap.to(this.querySelector('.btn-text'), {
      x: 0,
      duration: 0.3
    });
  });
  
  // Section entrance animation
  gsap.from('.encouragement-section .section-header', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.encouragement-section',
      start: "top bottom-=100px",
      toggleActions: "play none none reset"
    }
  });
  
  // Animate Bible verse box
  gsap.from(bibleVerseBox, {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: '.encouragement-section',
      start: "top bottom-=100px",
      toggleActions: "play none none reset"
    }
  });
  
  // Animate quote box shadow
  gsap.to(quoteBox, {
    boxShadow: "0 8px 30px rgba(102, 187, 106, 0.15)",
    repeat: -1,
    yoyo: true,
    duration: 3,
    ease: "sine.inOut"
  });
  
  function updateBibleVerse() {
    const verse = getRandomBibleVerse();
    const verseText = bibleVerseBox.querySelector('.verse-text');
    const verseReference = bibleVerseBox.querySelector('.verse-reference');
    
    verseText.textContent = `"${verse.verse}"`;
    verseReference.textContent = `- ${verse.reference}`;
  }
  
  // Create sparkle effect
  function createSparkles(container) {
    // Create 20 sparkles
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.width = Math.random() * 10 + 5 + 'px';
      sparkle.style.height = sparkle.style.width;
      sparkle.style.backgroundColor = `hsl(${Math.random() * 60 + 80}, 100%, 70%)`;
      sparkle.style.position = 'absolute';
      sparkle.style.borderRadius = '50%';
      sparkle.style.zIndex = '5';
      container.appendChild(sparkle);
      
      // Animate sparkle
      gsap.to(sparkle, {
        scale: 0,
        opacity: 0,
        duration: Math.random() * 1 + 0.5,
        onComplete: () => sparkle.remove()
      });
    }
  }
}

// Gallery Section Initialization
function initGallerySection() {
  // Gallery media items data
  const galleryMedia = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1485872299829-c673f5194813',
      caption: 'Always radiating beauty and warmth wherever you go'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672',
      caption: 'Your voice is a gift that touches hearts'
    },
    {
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-friends-with-colored-smoke-bombs-4556-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672',
      caption: 'Creating beautiful memories that last forever'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1471967183320-ee018f6e114a',
      caption: 'Your intelligence and wit make every conversation special'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      caption: 'That gorgeous smile that lights up every room'
    },
    {
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-between-flying-balloons-34553-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59',
      caption: 'Celebrating every beautiful moment of your journey'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59',
      caption: 'Your fighting spirit is truly inspiring'
    },
  ];
  
  // Initialize gallery carousel
  const carouselContent = document.querySelector('.carousel-content');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!carouselContent || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = galleryMedia.length;
  
  // Clear existing content if any
  carouselContent.innerHTML = '';
  
  // Add items to carousel
  galleryMedia.forEach((item, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    
    carouselItem.appendChild(createGalleryItem(item));
    carouselContent.appendChild(carouselItem);
  });
  
  // Initialize desktop gallery grid
  const galleryGrid = document.querySelector('.gallery-grid');
  
  if (galleryGrid) {
    // Clear existing content if any
    galleryGrid.innerHTML = '';
    
    // Add items to grid
    galleryMedia.forEach(item => {
      galleryGrid.appendChild(createGalleryItem(item));
    });
  }
  
  // Set up carousel controls
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });
  
  // Update carousel position
  function updateCarousel() {
    gsap.to(carouselContent, {
      x: `-${currentSlide * 100}%`,
      duration: 0.5,
      ease: "power2.out"
    });
  }
  
  // Initial carousel setup
  updateCarousel();
  
  // Animate gallery items with GSAP
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    gsap.from(item, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      rotation: gsap.utils.random(-3, 3),
      duration: 0.8,
      delay: index * 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=100",
        toggleActions: "play none none reset"
      }
    });
    
    // Add float animation to gallery items
    gsap.to(item, {
      y: -10,
      duration: gsap.utils.random(2, 3),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.1
    });
  });
  
  // Gallery header animation
  gsap.from('.gallery-section .section-header', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.gallery-section',
      start: "top bottom-=100",
      toggleActions: "play none none reset"
    }
  });
  
  // Helper function to create gallery items
  function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    const itemInner = document.createElement('div');
    itemInner.className = 'gallery-item-inner';
    
    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.caption;
      img.loading = 'lazy';
      itemInner.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.controls = true;
      if (item.thumbnail) {
        video.poster = item.thumbnail;
      }
      
      const source = document.createElement('source');
      source.src = item.url;
      source.type = 'video/mp4';
      
      video.appendChild(source);
      itemInner.appendChild(video);
      
      const videoIndicator = document.createElement('div');
      videoIndicator.className = 'video-indicator';
      videoIndicator.textContent = '🎬';
      itemInner.appendChild(videoIndicator);
    }
    
    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    
    const captionText = document.createElement('p');
    captionText.className = 'caption-text';
    captionText.innerHTML = `<span class="caption-heart">❤️</span> ${item.caption}`;
    
    caption.appendChild(captionText);
    itemInner.appendChild(caption);
    
    galleryItem.appendChild(itemInner);
    return galleryItem;
  }
}

// Special Message Section Initialization
function initSpecialMessageSection() {
  const messageSection = document.getElementById('special-message');
  if (!messageSection) return;
  
  const messageContainer = messageSection.querySelector('.special-message-container');
  const messageText = messageSection.querySelector('.message-text');
  const revealBtn = messageSection.querySelector('.reveal-message-btn');
  const hearts = messageSection.querySelectorAll('.floating-heart');
  
  // Initialize timeline
  const messageTl = gsap.timeline({ paused: true });
  
  // Set up animations
  messageTl
    .from(messageContainer, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    })
    .from(messageText, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    .from(hearts, {
      scale: 0,
      opacity: 0,
      rotation: 45,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(2)"
    }, "-=0.7");
  
  // Create scroll trigger to play animation
  ScrollTrigger.create({
    trigger: messageSection,
    start: "top center",
    onEnter: () => messageTl.play(),
    once: true
  });
  
  // Add click interaction
  let isExpanded = false;
  
  revealBtn.addEventListener('click', function() {
    if (!isExpanded) {
      // Expand the message with animation
      gsap.to(messageContainer, {
        maxHeight: "none",
        duration: 0.8,
        ease: "power2.out"
      });
      
      gsap.to(messageText, {
        opacity: 1,
        height: "auto",
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Create heart burst animation
      createHeartBurst(messageContainer);
      
      // Update button
      revealBtn.textContent = "Close Message";
      isExpanded = true;
      messageContainer.classList.add('expanded');
    } else {
      // Collapse the message
      gsap.to(messageContainer, {
        maxHeight: "100px",
        duration: 0.6,
        ease: "power2.inOut"
      });
      
      gsap.to(messageText, {
        opacity: 0.4,
        height: "2.5em",
        duration: 0.6,
        ease: "power2.inOut"
      });
      
      // Update button
      revealBtn.textContent = "Read Full Message";
      isExpanded = false;
      messageContainer.classList.remove('expanded');
    }
  });
  
  // Create floating animation for hearts
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
  
  // Function to create heart burst animation
  function createHeartBurst(container) {
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'burst-heart';
      heart.innerHTML = '❤️';
      heart.style.position = 'absolute';
      heart.style.top = '50%';
      heart.style.left = '50%';
      heart.style.fontSize = Math.random() * 10 + 15 + 'px';
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.zIndex = '5';
      heart.style.pointerEvents = 'none';
      heart.style.opacity = '0';
      container.appendChild(heart);
      
      // Animate heart
      gsap.to(heart, {
        x: gsap.utils.random(-150, 150),
        y: gsap.utils.random(-150, 150),
        rotation: gsap.utils.random(-180, 180),
        scale: gsap.utils.random(0.5, 1.5),
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heart, {
            opacity: 0,
            y: '+=30',
            duration: 0.8,
            delay: 0.5,
            ease: "power2.in",
            onComplete: () => heart.remove()
          });
        }
      });
    }
  }
}

// Footer initialization
function initFooter() {
  const backToTop = document.querySelector('.back-to-top');
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
        autoKill: false
      },
      ease: "power3.inOut"
    });
  });
  
  // Animate the heart with GSAP
  gsap.to('.heart', {
    scale: 1.2,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Smooth Scrolling Initialization
function initSmoothScrolling() {
  // Add event listeners for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 0,
              autoKill: false
            },
            ease: "power3.inOut"
          });
        }
      }
    });
  });
  
  // Initialize ScrollTrigger for each section
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    // Skip the hero section as it's already in view on load
    if (index === 0) return;
    
    // Create scroll trigger for each content section
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(section, { 
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.2)'
        });
      },
      once: true
    });
    
    // Set initial state
    gsap.set(section, { 
      opacity: 0.7,
      y: 30
    });
  });
}
