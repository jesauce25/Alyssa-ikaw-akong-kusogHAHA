
// Birthday quotes and encouragements for Alyssa

interface Quote {
  text: string;
}

interface BibleVerse {
  verse: string;
  reference: string;
}

// Birthday quotes specifically for Alyssa
export const birthdayQuotes: Quote[] = [
  {
    text: "Your unwavering spirit and beautiful heart inspire everyone around you. Happy Birthday, Alyssa!"
  },
  {
    text: "Your courage in facing challenges shows the amazing strength within you. Celebrate your incredible journey today!"
  },
  {
    text: "The way you overcome obstacles with grace and determination is truly inspiring. You deserve all the happiness today!"
  },
  {
    text: "Your kindness and gentle spirit make the world a better place. Never stop being the amazing person you are!"
  },
  {
    text: "The journey ahead has so many wonderful possibilities waiting for someone as special as you!"
  },
  {
    text: "You bring joy to everyone lucky enough to know you. Today, may that joy return to you multiplied!"
  },
  {
    text: "Your beautiful voice is just one of the many gifts you share with the world. Keep shining brightly!"
  },
  {
    text: "Remember how far you've come, not just how far you have to go. You've achieved so much already!"
  },
  {
    text: "Your dream to work on a cruise ship will come true - you have the determination and talent to make it happen!"
  },
  {
    text: "Never forget that you are braver than you believe, stronger than you seem, and loved more than you know."
  }
];

// Bible verses for encouragement
export const bibleVerses: BibleVerse[] = [
  {
    verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    verse: "She is clothed with strength and dignity; she can laugh at the days to come.",
    reference: "Proverbs 31:25"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    verse: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    reference: "Romans 15:13"
  }
];

// Get a random quote
export function getRandomQuote(): string {
  const randomIndex = Math.floor(Math.random() * birthdayQuotes.length);
  return birthdayQuotes[randomIndex].text;
}

// Get a random Bible verse
export function getRandomBibleVerse(): BibleVerse {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
}
