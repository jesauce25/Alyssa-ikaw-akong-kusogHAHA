
// Inspiring quotes for the birthday celebration

const birthdayQuotes = [
  "Your smile could light up the darkest room. Never stop shining!",
  "Your kindness and warmth make everyone around you feel special.",
  "The world is a better place because you're in it. Happy birthday!",
  "May your journey ahead be filled with joy, success, and beautiful memories.",
  "Your strength through challenges has been truly inspiring.",
  "You bring so much joy to everyone around you. Never change!",
  "Behind that beautiful smile lies a heart of gold and a spirit of steel.",
  "Your passion and determination are your superpowers. Use them wisely!",
  "Your energy and enthusiasm for life are absolutely contagious.",
  "You have a gift for making ordinary moments extraordinary.",
  "The way you care for others shows the depth of your beautiful heart.",
  "Your laugh is the soundtrack to many happy memories. Keep smiling!",
  "Your ambition and drive will take you to incredible places.",
  "You face challenges with grace and emerge stronger every time.",
  "Never underestimate the positive impact you have on those around you.",
  "Your creativity and imagination know no bounds. Keep dreaming big!",
  "You have a natural ability to find joy in the simplest things. That's rare.",
  "The best is yet to come for someone as incredible as you.",
  "Your courage to be uniquely yourself inspires everyone around you.",
  "Your journey so far has been amazing, but your future will be even brighter!"
];

const bibleVerses = [
  {
    verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    verse: "This is the day the LORD has made; let us rejoice and be glad in it.",
    reference: "Psalm 118:24"
  },
  {
    verse: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    reference: "Numbers 6:24-26"
  },
  {
    verse: "May he give you the desire of your heart and make all your plans succeed.",
    reference: "Psalm 20:4"
  },
  {
    verse: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
    reference: "James 1:17"
  },
  {
    verse: "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever.",
    reference: "Psalm 37:18"
  }
];

// Get a random quote from the array
function getRandomQuote() {
  return birthdayQuotes[Math.floor(Math.random() * birthdayQuotes.length)];
}

// Get a random Bible verse
function getRandomBibleVerse() {
  return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
}
