// Images generated for the memory gallery
import featuredSunset from '../assets/images/gallery_featured_sunset_1790769926403.jpg';
import coffeeDate from '../assets/images/gallery_coffee_date_1790769939676.jpg';
import rosesBouquet from '../assets/images/gallery_roses_bouquet_1790769950689.jpg';
import starlitNight from '../assets/images/gallery_starlit_night_1790769963984.jpg';
import beachStroll from '../assets/images/gallery_beach_stroll_1790769975450.jpg';

export interface MemoryItem {
  id: string;
  url: string;
  caption: string;
  isFeatured?: boolean;
  date?: string;
  note?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  sweetNote: string;
}

export const ROMANTIC_DATA = {
  girlfriendName: "BINITA",
  
  welcome: {
    greeting: "Hey, My Beautiful Binita ❤️",
    subtext1: "I made something special just for you...",
    subtext2: "Because you deserve to feel loved every single day.",
    cta: "OPEN YOUR SURPRISE 💌",
    toastWelcome: "Welcome to my little world of love, Binita.",
  },

  loveLetter: {
    heading: "To The Girl Who Has My Heart 💗",
    paragraphs: [
      "My dearest Binita,",
      "I don't think words will ever be enough to explain how much you mean to me, but I still want to try.",
      "You have become such a beautiful part of my life. Your smile, your personality, your presence, and all the little things that make you who you are mean more to me than you probably know.",
      "I love the happiness you bring into my days. I love having someone like you to care about, think about, and share my feelings with. Even the smallest moments feel special when they involve you.",
      "I know I'm not perfect, and I might not always find the right words, but I want you to know that my feelings for you are real. I want to keep learning about you, supporting you, making you smile, and creating memories with you.",
      "If I could give you one thing, it would be the chance to see yourself through my eyes, even for a moment. Then you'd understand how beautiful and precious you are to me.",
      "Thank you for being you. Thank you for being my Binita.",
    ],
    closing: "With all my love,",
    signature: "Your favorite person ❤️",
    reReadButton: "READ MY LETTER AGAIN",
  },

  tenThings: {
    heading: "10 Little Things I Adore About You",
    subtitle: "Just ten of the million reasons why my heart beats for you, Binita.",
    items: [
      {
        number: "01",
        title: "YOUR SMILE",
        quote: "Your smile makes even my ordinary days feel extraordinary.",
        icon: "sparkles",
      },
      {
        number: "02",
        title: "YOUR EYES",
        quote: "There's something beautiful about the way your eyes light up.",
        icon: "eye",
      },
      {
        number: "03",
        title: "YOUR HEART",
        quote: "Your heart is one of the things I treasure most.",
        icon: "heart",
      },
      {
        number: "04",
        title: "YOUR PERSONALITY",
        quote: "I love the little things that make you uniquely you.",
        icon: "sun",
      },
      {
        number: "05",
        title: "YOUR LAUGHTER",
        quote: "Your laughter is a sound I could never get tired of.",
        icon: "music",
      },
      {
        number: "06",
        title: "YOUR BEAUTY",
        quote: "You are beautiful in ways that go far beyond appearances.",
        icon: "gem",
      },
      {
        number: "07",
        title: "YOUR KINDNESS",
        quote: "The warmth you bring into my life means so much to me.",
        icon: "flame",
      },
      {
        number: "08",
        title: "YOUR PRESENCE",
        quote: "Just having you around makes everything feel a little sweeter.",
        icon: "coffee",
      },
      {
        number: "09",
        title: "YOUR UNIQUENESS",
        quote: "There is nobody else in the world quite like you.",
        icon: "star",
      },
      {
        number: "10",
        title: "SIMPLY YOU",
        quote: "I don't need a reason to love you. Being you is enough.",
        icon: "infinity",
      },
    ],
  },

  gallery: {
    heading: "Our Little World Together 📸",
    subtitle: "Every picture holds a special place in my heart. You can replace or upload our favorite photos anytime.",
    defaultPhotos: [
      {
        id: "feat-1",
        url: featuredSunset,
        caption: "A moment I wish I could relive.",
        isFeatured: true,
        note: "Golden hour and timeless serenity with you",
      },
      {
        id: "mem-2",
        url: coffeeDate,
        caption: "My favorite person, my favorite memories.",
        note: "Cozy conversations that I never want to end",
      },
      {
        id: "mem-3",
        url: rosesBouquet,
        caption: "A little moment, a big place in my heart.",
        note: "Flowers just like the sweetness you bring into my world",
      },
      {
        id: "mem-4",
        url: starlitNight,
        caption: "Every picture tells a story.",
        note: "Under the starlight, always wishing for your happiness",
      },
      {
        id: "mem-5",
        url: beachStroll,
        caption: "More beautiful memories to come.",
        note: "Walking together through every gentle tomorrow",
      },
    ] as MemoryItem[],
  },

  whyIChooseYou: {
    heading: "A Thousand Reasons, One Beautiful Girl",
    subtitle: "Click the heart button to reveal each tender reason from my heart to yours, Binita.",
    cta: "GIVE ME A REASON ❤️",
    reasons: [
      "Because you make my days brighter.",
      "Because I love who you are.",
      "Because your happiness matters to me.",
      "Because I want to keep discovering new things about you.",
      "Because talking to you can make everything feel better.",
      "Because I want to be part of your beautiful memories.",
      "Because I appreciate the little things about you.",
      "Because you're my favorite person to make smile.",
      "Because I want to keep choosing love and kindness with you.",
      "Because you're Binita, and that's already a beautiful reason.",
    ],
  },

  quiz: {
    heading: "Let's See How Well You Know Our Love Story 💞",
    subtitle: "A sweet little game just for you. Answer each question to unlock a special celebration!",
    finalMessage: "Whether you got every answer right or not, you're still my favorite girl. I love you, Binita! ❤️",
    questions: [
      {
        id: 1,
        question: "What's one thing I absolutely adore about you?",
        options: [
          "Your beautiful radiant smile that lights up my whole day",
          "The genuine kindness and warmth in your tender heart",
          "Your lovely laughter that never fails to cheer me up",
          "Everything single thing about you, from head to toe",
        ],
        correctIndex: 3,
        sweetNote: "You know it! There isn't just one thing—I adore everything that makes you Binita.",
      },
      {
        id: 2,
        question: "What's one of my favorite things to do with you?",
        options: [
          "Getting lost in long, heartwarming talks with you",
          "Sharing sweet quiet moments where time stands still",
          "Making you laugh until your eyes crinkle with joy",
          "All of the above and every moment we share",
        ],
        correctIndex: 3,
        sweetNote: "Spot on! Every single second spent with you is my favorite time.",
      },
      {
        id: 3,
        question: "What's one beautiful memory I want us to keep making?",
        options: [
          "Exploring new places and hand-in-hand adventures",
          "Supporting each other through all our big dreams",
          "Creating countless cozy, laughter-filled evenings",
          "Growing closer every single day with endless love",
        ],
        correctIndex: 3,
        sweetNote: "Every chapter with you is a dream come true, my dearest Binita.",
      },
    ] as QuizQuestion[],
  },

  promises: {
    heading: "Promises From My Heart",
    subtitle: "Written in my heart, sworn by my soul, dedicated only to Binita.",
    items: [
      "I promise to appreciate you, even in the smallest moments.",
      "I promise to listen to you and respect your feelings.",
      "I promise to be honest with you.",
      "I promise to support your dreams and celebrate your happiness.",
      "I promise to keep making an effort through my actions.",
      "I promise to communicate with care, even when things are difficult.",
      "I promise to keep making room for laughter, affection, and beautiful memories.",
    ],
    conclusion: "I can't promise every day will be perfect, but I can promise to keep showing up with love, honesty, and care.",
  },

  envelope: {
    heading: "Binita, I Have One More Thing To Tell You...",
    invitation: "There's a little message waiting inside. Open it, my love.",
    openButton: "OPEN MY HEART 💌",
    kissButton: "SEND YOU A KISS 😘",
    kissResponse: "MWAHHH! One kiss for my beautiful Binita. ❤️",
    letterTitle: "MY BEAUTIFUL BINITA ❤️",
    paragraphs: [
      "If I could give you one thing in this world, I'd give you the ability to see yourself through my eyes.",
      "You would see how beautiful you are, how much your smile means to me, and how special your presence is in my life.",
      "I don't just want pretty words. I want real moments, honest conversations, silly laughter, mutual respect, warm hugs, and memories we can look back on with happy hearts.",
      "I want to keep learning about you, appreciating you, and reminding you that you matter.",
      "Thank you for being part of my life.",
    ],
    declaration: "I LOVE YOU, BINITA. ❤️",
  },

  closing: {
    lines: [
      "MY FAVORITE HELLO,",
      "MY SWEETEST THOUGHT,",
      "MY BEAUTIFUL BINITA. ❤️",
    ],
    subtext: "Thank you for being you. I hope this little website made you smile, because your smile means so much to me.",
    signature: "Made with love, especially for Binita. ♡",
    restartButton: "LET'S START AGAIN ❤️",
  },
};
