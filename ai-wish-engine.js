/**
 * WishCraft Dynamic Multi-Page AI Engine
 * Standalone compilation & structured AI generation for multi-chapter cinematic keepsakes.
 * Features:
 * - 5 Distinct Layout Archetypes (Birthday Gala, Golden Truce, Romantic Sanctuary, Obsidian Cyber Vault, Classical Royal)
 * - Real interactive Digital Vault Keypad (Never exposes passcode to receiver)
 * - Web Audio synthesized chimes and clicks
 * - Interactive Finale Actions (Cake candles, Peace truce seal, Forever love lock)
 * - Responsive Mobile & Desktop presentation
 */
(function(global) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 10 Luxury Theme Color Palettes
  const THEME_PALETTES = {
    'royal-velvet': {
      bg: '#0B0914',
      cardBg: 'rgba(18, 14, 28, 0.82)',
      primary: '#D4AF6A',
      secondary: '#F5E6C8',
      accent: '#8A2B43',
      border: 'rgba(212, 175, 106, 0.3)',
      glow: 'rgba(212, 175, 106, 0.15)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', -apple-system, sans-serif"
    },
    'velvet-plum': {
      bg: '#140711',
      cardBg: 'linear-gradient(145deg, rgba(32, 12, 28, 0.90), rgba(16, 6, 14, 0.95))',
      primary: '#DF8FA5',
      secondary: '#FCE7F3',
      accent: '#C084FC',
      border: 'rgba(223, 143, 165, 0.38)',
      glow: 'rgba(223, 143, 165, 0.20)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    },
    'obsidian-gold': {
      bg: '#050507',
      cardBg: 'rgba(14, 14, 18, 0.85)',
      primary: '#E5C158',
      secondary: '#FFFFFF',
      accent: '#C5A059',
      border: 'rgba(229, 193, 88, 0.28)',
      glow: 'rgba(229, 193, 88, 0.18)',
      fontSerif: "'Cinzel', 'Playfair Display', Georgia, serif",
      fontSans: "'Space Grotesk', 'Montserrat', sans-serif"
    },
    'midnight-sapphire': {
      bg: '#040A18',
      cardBg: 'rgba(7, 18, 38, 0.85)',
      primary: '#64B5F6',
      secondary: '#E3F2FD',
      accent: '#D4AF6A',
      border: 'rgba(100, 181, 246, 0.32)',
      glow: 'rgba(100, 181, 246, 0.2)',
      fontSerif: "'Cinzel', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    },
    'emerald-noir': {
      bg: '#02140D',
      cardBg: 'rgba(4, 26, 18, 0.85)',
      primary: '#3FCF8E',
      secondary: '#E8F5E9',
      accent: '#E5C158',
      border: 'rgba(63, 207, 142, 0.3)',
      glow: 'rgba(63, 207, 142, 0.18)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    },
    'sunset-peach': {
      bg: '#160B14',
      cardBg: 'rgba(32, 14, 28, 0.85)',
      primary: '#FF9E9D',
      secondary: '#FFF0F5',
      accent: '#FFD166',
      border: 'rgba(255, 158, 157, 0.32)',
      glow: 'rgba(255, 158, 157, 0.18)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    },
    'golden-truce': {
      bg: '#0A0908',
      cardBg: 'rgba(20, 18, 14, 0.85)',
      primary: '#E6C280',
      secondary: '#FAF6EE',
      accent: '#A68A56',
      border: 'rgba(230, 194, 128, 0.32)',
      glow: 'rgba(230, 194, 128, 0.16)',
      fontSerif: "'Cinzel', Georgia, serif",
      fontSans: "'Space Grotesk', sans-serif"
    },
    'arctic-frost': {
      bg: '#061019',
      cardBg: 'linear-gradient(145deg, rgba(10, 26, 42, 0.90), rgba(6, 16, 26, 0.95))',
      primary: '#8FD8E8',
      secondary: '#E0F7FA',
      accent: '#4DD0E1',
      border: 'rgba(143, 216, 232, 0.40)',
      glow: 'rgba(143, 216, 232, 0.25)',
      fontSerif: "'Cinzel', 'Playfair Display', Georgia, serif",
      fontSans: "'Space Grotesk', 'Montserrat', sans-serif"
    },
    'blush-romance': {
      bg: '#160A12',
      cardBg: 'linear-gradient(145deg, rgba(38, 16, 28, 0.90), rgba(18, 8, 14, 0.95))',
      primary: '#E8A6B0',
      secondary: '#FFF0F5',
      accent: '#FF758F',
      border: 'rgba(232, 166, 176, 0.40)',
      glow: 'rgba(232, 166, 176, 0.22)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    },
    'midnight-arcade': {
      bg: '#090216',
      cardBg: 'linear-gradient(145deg, rgba(20, 6, 45, 0.90), rgba(9, 2, 22, 0.95))',
      primary: '#00F5D4',
      secondary: '#F15BB5',
      accent: '#9B5DE5',
      border: 'rgba(0, 245, 212, 0.45)',
      glow: 'rgba(0, 245, 212, 0.28)',
      fontSerif: "'Space Grotesk', sans-serif",
      fontSans: "'Space Grotesk', monospace"
    },
    'lavender-dream': {
      bg: '#0E0818',
      cardBg: 'linear-gradient(145deg, rgba(28, 14, 48, 0.90), rgba(12, 6, 22, 0.95))',
      primary: '#C9A6FF',
      secondary: '#F3E8FF',
      accent: '#B794F4',
      border: 'rgba(201, 166, 255, 0.40)',
      glow: 'rgba(201, 166, 255, 0.24)',
      fontSerif: "'Cinzel', 'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif"
    }
  };

  // 5 Distinct Layout Archetypes
  const ARCHETYPES = {
    'birthday': {
      id: 'birthday',
      name: 'Celebratory Birthday Gala',
      icon: '👑',
      tagline: 'Festive Milestones, Crown Badge & Confetti Celebration',
      defaultTheme: 'obsidian-gold',
      bg: '#0C0A06',
      cardBg: 'linear-gradient(145deg, rgba(28, 22, 12, 0.92), rgba(12, 10, 8, 0.96))',
      primary: '#FFD32A',
      secondary: '#FFA801',
      accent: '#FF5722',
      border: 'rgba(255, 211, 42, 0.38)',
      glow: 'rgba(255, 211, 42, 0.22)',
      fontSerif: "'Cinzel', 'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', -apple-system, sans-serif",
      cardBorder: '1.5px solid rgba(255, 211, 42, 0.45)',
      cardRadius: '26px',
      particleType: 'birthday_sparkles',
      cardAccentIcon: '🎂',
      finaleEmoji: '🎂 🥂 ✨ 🎁 👑',
      finaleBtnText: '🎂 Make a Birthday Wish & Blow Candles!',
      finaleSuccessText: '✨ Wish Manifested! Happy Birthday! ✨'
    },
    'truce': {
      id: 'truce',
      name: 'Golden Truce Peace Treaty',
      icon: '🕊️',
      tagline: 'Diplomatic Treaty, Sincere Clauses & Reconciliation Seal',
      defaultTheme: 'golden-truce',
      bg: '#0A0908',
      cardBg: 'linear-gradient(145deg, rgba(20, 18, 14, 0.92), rgba(10, 9, 8, 0.96))',
      primary: '#E6C280',
      secondary: '#FAF6EE',
      accent: '#A68A56',
      border: 'rgba(230, 194, 128, 0.38)',
      glow: 'rgba(230, 194, 128, 0.18)',
      fontSerif: "'Cinzel', 'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif",
      cardBorder: '1px solid rgba(230, 194, 128, 0.4)',
      cardRadius: '20px',
      particleType: 'golden_leaves',
      cardAccentIcon: '🕊️',
      finaleEmoji: '🕊️ 🤍 📜 🕊️ ✨',
      finaleBtnText: '🕊️ Accept Peace Treaty & Seal Truce',
      finaleSuccessText: '🤍 Truce Sealed. All is Forgiven. 🤍'
    },
    'romance': {
      id: 'romance',
      name: 'Velvet Romantic Sanctuary',
      icon: '💖',
      tagline: 'Floating Rose Hearts, Love Letters & Forever Lock',
      defaultTheme: 'sunset-peach',
      bg: '#14050D',
      cardBg: 'linear-gradient(145deg, rgba(34, 10, 22, 0.92), rgba(16, 4, 10, 0.96))',
      primary: '#FF6B81',
      secondary: '#FFA8BA',
      accent: '#FF7EB3',
      border: 'rgba(255, 107, 129, 0.42)',
      glow: 'rgba(255, 107, 129, 0.28)',
      fontSerif: "'Playfair Display', Georgia, serif",
      fontSans: "'Montserrat', sans-serif",
      cardBorder: '1.5px solid rgba(255, 107, 129, 0.45)',
      cardRadius: '28px',
      particleType: 'rose_hearts',
      cardAccentIcon: '💖',
      finaleEmoji: '💖 🌹 💍 ✨ ❤️',
      finaleBtnText: '💖 Seal Our Forever Lock ❤️',
      finaleSuccessText: '🔒 Forever Locked in My Heart.'
    },
    'obsidian': {
      id: 'obsidian',
      name: 'Cyberpunk Obsidian Vault',
      icon: '⚡',
      tagline: 'High-Tech Terminal HUD, AES-256 Protocol & Cipher Keypad',
      defaultTheme: 'obsidian-gold',
      bg: '#020508',
      cardBg: 'linear-gradient(180deg, rgba(4, 16, 22, 0.95), rgba(2, 7, 12, 0.98))',
      primary: '#00F5D4',
      secondary: '#70A1FF',
      accent: '#0BE881',
      border: 'rgba(0, 245, 212, 0.45)',
      glow: 'rgba(0, 245, 212, 0.22)',
      fontSerif: "'Space Grotesk', monospace",
      fontSans: "'Space Grotesk', monospace",
      cardBorder: '1.5px solid #00F5D4',
      cardRadius: '10px',
      particleType: 'cyber_grid',
      cardAccentIcon: '⚡',
      finaleEmoji: '⚡ 🛰️ 🔒 🌐 💻',
      finaleBtnText: '⚡ Authenticate Master Key',
      finaleSuccessText: '🔓 ACCESS GRANTED // ARCHIVE DECRYPTED'
    },
    'classic': {
      id: 'classic',
      name: 'Royal Velvet Classical Luxury',
      icon: '✨',
      tagline: 'Museum-Grade Serif Typography, Gold Foil & Star Stardust',
      defaultTheme: 'royal-velvet',
      bg: '#090814',
      cardBg: 'linear-gradient(145deg, rgba(18, 14, 28, 0.92), rgba(8, 7, 16, 0.96))',
      primary: '#D4AF37',
      secondary: '#F5E6C8',
      accent: '#A29BFE',
      border: 'rgba(212, 175, 106, 0.38)',
      glow: 'rgba(212, 175, 106, 0.2)',
      fontSerif: "'Cinzel', Georgia, serif",
      fontSans: "'Montserrat', sans-serif",
      cardBorder: '1.5px solid rgba(212, 175, 106, 0.4)',
      cardRadius: '22px',
      particleType: 'stardust',
      cardAccentIcon: '👑',
      finaleEmoji: '👑 🥂 ✨ 🌟 🏛️',
      finaleBtnText: '🥂 Raise a Toast to the Journey',
      finaleSuccessText: '🌟 Cheers to an Unstoppable Future! 🌟'
    }
  };

  /**
   * Helper to deduce archetype from user intake
   */
  function determineArchetype(userData = {}) {
    if (userData.archetype && ARCHETYPES[userData.archetype]) {
      return userData.archetype;
    }
    const occ = (userData.occasion || '').toLowerCase();
    const theme = (userData.themeName || '').toLowerCase();

    if (occ.includes('apol') || occ.includes('truce') || occ.includes('sorr') || occ.includes('forgiv') || occ.includes('pardon')) {
      return 'truce';
    }
    if (occ.includes('birth') || occ.includes('bday')) {
      return 'birthday';
    }
    if (occ.includes('love') || occ.includes('roman') || occ.includes('anniv') || occ.includes('valen') || occ.includes('propos')) {
      return 'romance';
    }
    if (theme.includes('obsidian') || theme.includes('neon') || theme.includes('arcade')) {
      return 'obsidian';
    }
    return 'classic';
  }

  /**
   * Generates default / fallback 5-chapter wish data when API is unavailable
   */
  function getDefaultWishData(userData = {}) {
    const recName = userData.recipientName || "Someone Truly Special";
    const sender = userData.senderName || "Forever a Friend";
    const occ = userData.occasion || "Birthday Celebration";
    const pass = (userData.passcode || "2026").trim();
    // Default hint NEVER leaks the passcode
    const hint = (userData.passcodeHint || "A memorable number or secret key known to us").trim();
    const archetypeKey = determineArchetype(userData);
    const archetypeObj = ARCHETYPES[archetypeKey] || ARCHETYPES['classic'];
    const themeKey = userData.themeName && THEME_PALETTES[userData.themeName] ? userData.themeName : (archetypeObj.defaultTheme || 'royal-velvet');
    const themeColor = userData.themeColor || archetypeObj.primary;

    let chapters = [];

    if (archetypeKey === 'truce') {
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Sincere Truce",
          badge: "CHAPTER 01 // DIPLOMATIC TREATY",
          title: `For ${recName}`,
          subtitle: "A heartfelt wish to clear the air & make things right.",
          intro: "Some bonds are far too precious to ever let misunderstandings or thoughtless moments stand between them.",
          ctaText: "Hear My Truth →"
        },
        {
          id: "chap_2",
          type: "memories",
          navTitle: "02. Reflection",
          badge: "CHAPTER 02 // REFLECTION",
          title: "What You Truly Mean To Me",
          subtitle: "Honoring our shared laughter & trust",
          body: `From every conversation we have shared to every milestone along the way, your presence brings warmth, kindness, and honest joy. I value you more than words can express.`,
          quote: "True bonds aren't measured by perfection, but by the sincerity with which we mend them."
        },
        {
          id: "chap_3",
          type: "interactive_reveal",
          navTitle: "03. Confession",
          badge: "CHAPTER 03 // SINCERE TRUTH VAULT",
          title: "The Unfiltered Confession",
          subtitle: "Enter the security passcode to unlock this private archive",
          secretHeading: `To ${recName},`,
          secretMessage: "I am genuinely sorry for hurting you or causing any distance between us. My intentions were never to make you feel unheard. You deserve only kindness, respect, and honesty.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. The Promise",
          badge: "CHAPTER 04 // HONEST CLAUSES",
          title: "My Promises Moving Forward",
          subtitle: "A commitment to open conversations & mutual care",
          p1: "No excuses, no defenses—just an honest realization that I should have been more mindful, patient, and understanding.",
          p2: "My heart holds only the deepest respect and gratitude for your presence. I hate knowing that I caused you a moment of sorrow.",
          p3: "I promise to listen more deeply, communicate with warmth, and protect the trust we have built together with everything I have."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Fresh Start",
          badge: "CHAPTER 05 // THE TRUCE",
          title: "Can We Hit Reset?",
          subtitle: "Forever grateful for you",
          wishMessage: "Thank you for taking the time to read this. Whenever you are ready, I hope we can start fresh with open hearts.",
          signature: `With deep sincerity & care,\n${sender}`
        }
      ];
    } else if (archetypeKey === 'romance') {
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Arrival",
          badge: "CHAPTER 01 // OUR PREMIERE",
          title: `For My Beloved ${recName}`,
          subtitle: "A private digital archive celebrating our story.",
          intro: "In a world of fleeting moments, every second spent in your orbit has been an absolute wonder.",
          ctaText: "Enter Our Sanctuary →"
        },
        {
          id: "chap_2",
          type: "memories",
          navTitle: "02. Milestones",
          badge: "CHAPTER 02 // SHARED ORBITS",
          title: "Echoes of Shared Adventures",
          subtitle: "Every quiet glance and shared laugh",
          body: `Every adventure we embark upon, every shared sunrise, and every quiet evening in between is etched into my heart. With you, time feels both boundless and wonderfully sacred.`,
          quote: "To the world you may be one person, but to me, you make everything warmer, brighter, and deeply whole."
        },
        {
          id: "chap_3",
          type: "interactive_reveal",
          navTitle: "03. Heart Chamber",
          badge: "CHAPTER 03 // RESERVED ARCHIVE",
          title: "The Reserved Heart Chamber",
          subtitle: "Enter the security passcode to unlock this private archive",
          secretHeading: "A Timeless Truth",
          secretMessage: "I fell in love with your mind, your kindness, and the gentle grace with which you walk through life. Loving you is the easiest and greatest joy I know.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. The Letter",
          badge: "CHAPTER 04 // FROM THE SOUL",
          title: "A Sovereign Letter to My Love",
          subtitle: "Written for today, tomorrow, and eternity",
          p1: "I wanted to create something truly magical and permanent for you today. A simple card could never hold the depth of what you mean to me.",
          p2: "From the very first day our paths crossed, my world shifted into warmer, brighter colors. Your laughter brings peace to the loudest days, and your kindness is a steady anchor.",
          p3: "May our journey continue to unfold with fearless adventures, deep peace, and boundless love. You are, and will always be, my greatest treasure."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Eternity",
          badge: "CHAPTER 05 // FOREVER & ALWAYS",
          title: "FOREVER & ALWAYS",
          subtitle: "Our infinite story continues",
          wishMessage: "Here is to a lifetime of shared dreams, unstoppable laughter, and quiet moments that mean everything.",
          signature: `With all my heart & soul,\n${sender}`
        }
      ];
    } else if (archetypeKey === 'birthday') {
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Arrival",
          badge: "CHAPTER 01 // BIRTHDAY PROTOCOL",
          title: `Celebrating ${recName}`,
          subtitle: "An interactive, multi-chapter digital birthday keepsake.",
          intro: "Some souls bring a light into the world so brilliant that ordinary celebrations could never suffice. Today demands an entire experience.",
          ctaText: "Begin The Celebration →"
        },
        {
          id: "chap_2",
          type: "memories",
          navTitle: "02. Milestones",
          badge: "CHAPTER 02 // MEMORY CAPSULE",
          title: "Echoes of Laughter & Milestones",
          subtitle: "The extraordinary journey that brought you here",
          body: `From quiet victories to shared milestones that turned into unforgettable stories, your resilience and spirit inspire everyone fortunate enough to know you.`,
          quote: "Count your life by smiles, not tears. Count your age by the radiant stars you illuminate along the way."
        },
        {
          id: "chap_3",
          type: "interactive_reveal",
          navTitle: "03. Secret Vault",
          badge: "CHAPTER 03 // BIRTHDAY VAULT",
          title: "The Birthday Gift Chamber",
          subtitle: "Enter the security passcode to unlock your confidential gift note",
          secretHeading: `Hey ${recName},`,
          secretMessage: "Happiest Birthday! Never doubt the quiet power of your warmth and intellect. You have an extraordinary way of making everyone around you feel valued, inspired, and deeply at home.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. Birthday Letter",
          badge: "CHAPTER 04 // SOVEREIGN TRIBUTE",
          title: "A Letter of Admiration",
          subtitle: "Crafted with immense admiration and care",
          p1: "I wanted to create something truly magical and permanent for you today. A simple text could never capture how much your presence means to everyone around you.",
          p2: "Your laughter brings warmth to the coldest days, and your perseverance in moments of uncertainty is a steady anchor. You navigate life with rare authenticity and grace.",
          p3: "May the year ahead open doors to your wildest dreams, shower you with breathtaking adventures, and remind you every single day how profoundly treasured you are."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Grand Finale",
          badge: "CHAPTER 05 // THE CELEBRATION",
          title: `HAPPY BIRTHDAY ${recName.toUpperCase()}!`,
          subtitle: "May every aspiration you carry take flight.",
          wishMessage: "Here is to another orbit of radiant victories, boundless laughter, and unforgettable joy.",
          signature: `With endless admiration & love,\n${sender}`
        }
      ];
    } else if (archetypeKey === 'obsidian') {
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Terminal",
          badge: "// TERMINAL 01 // BIO-LINK",
          title: `CIPHER // ${recName.toUpperCase()}`,
          subtitle: "Encrypted Quantum Kept Data Protocol v4.2",
          intro: "Direct point-to-point transmission established. All data blocks compiled with permanent loyalty and unyielding respect.",
          ctaText: "ACCESS CIPHER STREAM [ENTER] →"
        },
        {
          id: "chap_2",
          type: "memories",
          navTitle: "02. Matrix",
          badge: "// TELEMETRY // CORE MATRIX",
          title: "NEURAL MEMORY ARCHIVE",
          subtitle: "Historical milestones decrypted",
          body: `Through high-bandwidth triumphs and unscripted missions conquered, your frequency remains unmatched. A permanent constant in an ever-shifting simulation.`,
          quote: "In a universe of transient noise, authentic loyalty is hard-coded into the bedrock."
        },
        {
          id: "chap_3",
          type: "interactive_reveal",
          navTitle: "03. Vault Node",
          badge: "// SECURITY // RESTRICTED DOSSIER",
          title: "ENCRYPTED VAULT NODE",
          subtitle: "Enter security passcode to decrypt classified payload",
          secretHeading: `SECURE TRANSMISSION // FOR ${recName.toUpperCase()}:`,
          secretMessage: "You operate on an entirely different echelon of brilliance and integrity. Never compromise your core values. The future belongs to those who build it with conviction.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. Source Code",
          badge: "// UNCOMPRESSED // RAW COMM",
          title: "TRANSMISSION ARCHIVE",
          subtitle: "Unfiltered sovereign tribute",
          p1: "No standard algorithm could ever quantify the sheer impact of your presence. Real trust cannot be simulated; it is forged through shared battles and conviction.",
          p2: "You navigate complex challenges with effortless clarity and sharp instincts. Watching you execute your vision is a masterclass in relentless execution.",
          p3: "May your momentum never stall, your firewalls remain impenetrable, and your next chapter exceed every historical precedent."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Uplink",
          badge: "// PROTOCOL 05 // MISSION SUCCESS",
          title: `MISSION SUCCESS: ${recName.toUpperCase()}`,
          subtitle: "All operational milestones cleared with honors.",
          wishMessage: "System operational. Uplink permanent. Stand tall and conquer every horizon ahead.",
          signature: `// SENDER VERIFIED //\n${sender}`
        }
      ];
    } else {
      // Classic Royal
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Arrival",
          badge: "CHAPTER 01 // ARRIVAL",
          title: `A Keepsake For ${recName}`,
          subtitle: "An interactive, multi-chapter digital archive.",
          intro: "Some moments deserve to be preserved with ceremony, elegance, and permanent care.",
          ctaText: "Open Archive →"
        },
        {
          id: "chap_2",
          type: "memories",
          navTitle: "02. Milestones",
          badge: "CHAPTER 02 // ARCHIVE RETROSPECTIVE",
          title: "Timeless Moments & Milestones",
          subtitle: "The journey that defined where we are today",
          body: "Every shared triumph, every quiet conversation, and every unscripted laugh remains an enduring chapter in our story.",
          quote: "True memories do not fade with time; they deepen into legends."
        },
        {
          id: "chap_3",
          type: "interactive_reveal",
          navTitle: "03. Secret Chamber",
          badge: "CHAPTER 03 // CLASSIFIED ARCHIVE",
          title: "The Reserved Chamber",
          subtitle: "Enter the security passcode to unlock this private archive",
          secretHeading: `For ${recName},`,
          secretMessage: "In all things, you carry yourself with unmatched integrity and grace. Thank you for being such an immovable pillar of inspiration.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. Sovereign Letter",
          badge: "CHAPTER 04 // SOVEREIGN LETTER",
          title: "A Letter of Reflection",
          subtitle: "Written with reverence and sincere admiration",
          p1: "Taking a moment to pause and honor someone who constantly gives their best to the world is the truest gift.",
          p2: "May your path continue to be illuminated by the strength of your convictions and the joy of your discoveries.",
          p3: "Whatever heights you aspire to conquer next, know that you have unwavering belief and support behind you."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Grand Finale",
          badge: "CHAPTER 05 // THE TOAST",
          title: `HONORING ${recName.toUpperCase()}`,
          subtitle: "May your future shine brighter than the stars.",
          wishMessage: "Here is to limitless horizons, profound peace, and memories yet to be created.",
          signature: `With deepest respect & care,\n${sender}`
        }
      ];
    }

    return {
      archetype: archetypeKey,
      theme: themeKey,
      themeColor: themeColor || THEME_PALETTES[themeKey]?.primary || "#D4AF6A",
      occasion: occ,
      recipientName: recName,
      senderName: sender,
      passcode: pass,
      passcodeHint: hint,
      chapters: chapters
    };
  }

  /**
   * Builds the System Prompt instructing Gemini to return a structured multi-chapter wish
   */
  function getSystemPrompt(userData = {}) {
    const occ = userData.occasion || 'Birthday';
    const recName = userData.recipientName || 'Someone Special';
    const sender = userData.senderName || '';
    const relationship = userData.relationship || 'friend';
    const tone = userData.tone || 'Cinematic & Deeply Moving';
    const themeName = userData.themeName || 'royal-velvet';
    const userMessage = userData.userMessage || '';
    const aspirations = userData.aspirations || '';
    const passcode = userData.passcode || '2026';
    const passcodeHint = userData.passcodeHint || '';

    return `You are an elite poetic copywriter and sentiment architect for WishCraft, an ultra-luxury digital keepsake studio.
Your mission is to write a 100% original, deeply touching, multi-chapter cinematic keepsake experience.

CRITICAL INTAKE DETAILS:
- RECIPIENT: "${recName}" (${relationship})
- SENDER: "${sender || 'A sincere lifelong friend'}"
- OCCASION: "${occ}"
- TONE: "${tone}"
- REQUESTED PALETTE: "${themeName}"
- PERSONAL NOTES / MEMORIES FROM USER: ${userMessage ? `"${userMessage}"` : 'None provided — invent emotionally resonant, genuine details celebrating their bond.'}
- ASPIRATIONS & HOPES: ${aspirations ? `"${aspirations}"` : 'None provided — craft meaningful, moving aspirations tailored to them.'}
- SECRET VAULT PASSCODE: "${passcode}"
- PASSCODE HINT: "${passcodeHint || 'A clever mystery riddle known to both of them'}"

OCCASION & ARCHETYPE RULES:
1. If occasion is Apology / Truce / Forgiveness / Reconciliation:
   - "archetype": "truce"
   - Write with genuine vulnerability, emotional maturity, and sincere regret from ${sender} to ${recName}.
   - Chapter 1: Sincere invitation to clear the air, acknowledging how valuable their connection is.
   - Chapter 2: Fond reflection on the irreplaceable moments and shared trust that make this bond worth protecting.
   - Chapter 3 (Secret Chamber): The unlocked message must be an authentic, humble, heartfelt apology admitting mistakes and expressing pure care.
   - Chapter 4 (Letter): 3 deep, emotional paragraphs (p1, p2, p3) about listening better, prioritizing their feelings over pride, and making things right.
   - Chapter 5 (Finale): A gentle, pressure-free invitation to hit reset and seal a peace treaty whenever they are ready.
2. If occasion is Birthday / Celebration:
   - "archetype": "birthday"
   - Joyful, majestic, celebrating milestones, laughter, and their radiant future.
3. If occasion is Romance / Love / Anniversary / Proposal:
   - "archetype": "romance"
   - Intimate, cinematic, timeless poetry celebrating two hearts intertwined.
4. If theme is "midnight-arcade" or "obsidian-gold":
   - "archetype": "obsidian" (unless occasion is specifically apology, birthday, or romance).
5. Otherwise:
   - "archetype": "classic"

CRITICAL RULES:
- THEME: Set "theme": "${themeName}".
- PASSCODE & HINT: Set "passcode": "${passcode}". The "passcodeHint" MUST NEVER reveal the actual numbers! It must be a mystery riddle for ${recName}.
- NO GENERIC TEMPLATE PHRASES: Every title, badge, subtitle, intro, and letter paragraph MUST BE 100% ORIGINAL, specific, and crafted exclusively for ${recName} and ${sender}.

You MUST return ONLY a strict, valid JSON object with the following schema:
{
  "archetype": "birthday" | "truce" | "romance" | "obsidian" | "classic",
  "theme": "${themeName}",
  "themeColor": "#HexColor matching the ${themeName} palette",
  "occasion": "${occ}",
  "recipientName": "${recName}",
  "senderName": "${sender}",
  "passcode": "${passcode}",
  "passcodeHint": "Clever mystery riddle without exposing numbers",
  "chapters": [
    {
      "id": "chap_1",
      "type": "cover",
      "navTitle": "01. Arrival",
      "badge": "CHAPTER 01 // [Creative Badge, e.g. THE EMBERS OF TRUTH]",
      "title": "[Bespoke Poetic Headline dedicated to ${recName}]",
      "subtitle": "[Evocative, cinema-grade one-line subtitle]",
      "intro": "[2 warm, stirring sentences welcoming ${recName} into this experience]",
      "ctaText": "Begin Experience →"
    },
    {
      "id": "chap_2",
      "type": "memories",
      "navTitle": "02. Footprints",
      "badge": "CHAPTER 02 // [Creative Badge, e.g. UNWRITTEN CONSTELLATIONS]",
      "title": "[Poetic chapter title honoring their shared memories]",
      "subtitle": "[A subtitle celebrating their laughter and character]",
      "body": "[Rich 3-sentence narrative weaving their qualities, laughs, and adventures]",
      "quote": "[Timeless 1-sentence keepsake quote about them]"
    },
    {
      "id": "chap_3",
      "type": "interactive_reveal",
      "navTitle": "03. Vault",
      "badge": "CHAPTER 03 // [Creative Badge, e.g. CLASSIFIED VAULT]",
      "title": "[Intriguing chapter title, e.g. The Encrypted Confession]",
      "subtitle": "Enter your private key to decrypt this message",
      "secretHeading": "To ${recName}, From the Heart",
      "secretMessage": "[2-3 deeply sincere, vulnerable or delightful sentences revealed upon unlocking]",
      "passcode": "${passcode}",
      "passcodeHint": "[Riddle or clue that never mentions the passcode digits]"
    },
    {
      "id": "chap_4",
      "type": "letter",
      "navTitle": "04. The Letter",
      "badge": "CHAPTER 04 // [Creative Badge, e.g. SINCERE CLAUSES]",
      "title": "[Poetic Title for the tribute letter]",
      "subtitle": "Written with reverence, fondness, and unwavering sincerity",
      "p1": "[Paragraph 1: Celebrating who ${recName} is, their qualities, and their importance]",
      "p2": "[Paragraph 2: Weaving personal reflections, heartfelt truths, and honest emotions]",
      "p3": "[Paragraph 3: Deep hopes for the future, commitments moving forward, and blessings]"
    },
    {
      "id": "chap_5",
      "type": "finale",
      "navTitle": "05. Finale",
      "badge": "CHAPTER 05 // [Creative Badge, e.g. THE TRUCE SEAL]",
      "title": "[Grand high-impact celebration title dedicated to ${recName}]",
      "subtitle": "[A moving one-line wish or invitation to connect]",
      "wishMessage": "[Stirring 2-sentence closing statement celebrating their bond]",
      "signature": "With sincere care & respect,\\n${sender || 'Forever your friend'}"
    }
  ]
}

Output ONLY the raw JSON object. Do not enclose in markdown fences.`;
  }

  /**
   * Builds the User Intake Message for Gemini
   */
  function buildIntakeMessage(userData = {}) {
    return `Generate a luxury 5-chapter bespoke wish experience in JSON for:
{
  "recipientName": "${userData.recipientName || 'Someone Special'}",
  "senderName": ${userData.senderName ? JSON.stringify(userData.senderName) : 'null'},
  "relationship": "${userData.relationship || 'friend'}",
  "occasion": "${userData.occasion || 'Birthday'}",
  "tone": "${userData.tone || 'heartfelt'}",
  "themeName": "${userData.themeName || 'royal-velvet'}",
  "personalMemoriesAndInsideJokes": ${userData.aspirations ? JSON.stringify(userData.aspirations) : 'null'},
  "userPersonalNote": ${userData.userMessage ? JSON.stringify(userData.userMessage) : 'null'},
  "passcode": "${userData.passcode || '2026'}",
  "passcodeHint": "${userData.passcodeHint || 'A memorable secret key'}"
}`;
  }

  /**
   * Compiles the multi-page wish JSON into a self-contained, standalone HTML document
   */
  function compileMultiPageWish(wishData, options = {}) {
    const data = wishData || getDefaultWishData();
    
    // Determine Archetype
    const archetypeKey = (data.archetype && ARCHETYPES[data.archetype]) ? data.archetype : determineArchetype(data);
    const archetype = ARCHETYPES[archetypeKey] || ARCHETYPES['classic'];

    // Theme resolution: prioritize user-picked theme if provided; fallback to data.theme or archetype default
    const userTheme = options.themeName || data.theme || archetype.defaultTheme || 'royal-velvet';
    const basePalette = THEME_PALETTES[userTheme] || (data.theme && THEME_PALETTES[data.theme]) || THEME_PALETTES['royal-velvet'];

    const theme = {
      bg: basePalette.bg,
      cardBg: basePalette.cardBg,
      primary: basePalette.primary,
      secondary: basePalette.secondary,
      accent: basePalette.accent,
      border: basePalette.border,
      glow: basePalette.glow,
      fontSerif: basePalette.fontSerif,
      fontSans: basePalette.fontSans,
      cardBorder: archetype.cardBorder || ('1px solid ' + basePalette.border),
      cardRadius: archetype.cardRadius || '24px'
    };
    const primaryColor = theme.primary;
    const recName = data.recipientName || "Someone Special";
    const sender = data.senderName || "Forever a Friend";
    const showWatermark = typeof options.showWatermark === 'boolean' ? options.showWatermark : true;
    const userPhotos = Array.isArray(options.photos) && options.photos.length > 0 ? options.photos : [];

    const defaultFallbacks = [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953eb1f5ff?w=600&q=80",
      "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=600&q=80"
    ];
    const displayPhotos = userPhotos.length > 0 ? userPhotos : defaultFallbacks;

    // Filter out disabled/skipped chapters if any
    const rawChapters = Array.isArray(data.chapters) ? data.chapters : [];
    const activeChapters = rawChapters.filter(ch => !ch.disabled);
    const chaptersToRender = activeChapters.length > 0 ? activeChapters : rawChapters;

    // Render Chapters HTML
    const chaptersHtml = chaptersToRender.map((ch, idx) => {
      const isFirst = (idx === 0);
      const isLast = (idx === chaptersToRender.length - 1);

      let innerContentHtml = '';

      if (ch.type === 'cover') {
        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // ARRIVAL`)}</div>
          <h1 class="wc-hero-title">${escapeHtml(ch.title)}</h1>
          <div class="wc-gold-divider"></div>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          ${ch.intro ? `<p class="wc-body-text" style="margin-top:16px;">${escapeHtml(ch.intro)}</p>` : ''}
          <div class="wc-action-row" style="margin-top:28px;">
            <button type="button" class="wc-btn-primary" onclick="wcNextChapter()">${escapeHtml(ch.ctaText || 'Begin Journey →')}</button>
          </div>
        `;
      } else if (ch.type === 'memories') {
        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // MEMORIES`)}</div>
          <h2 class="wc-chapter-title">${escapeHtml(ch.title)}</h2>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <div class="wc-gold-divider"></div>
          <p class="wc-body-text">${escapeHtml(ch.body)}</p>
          ${ch.quote ? `
          <div class="wc-quote-box">
            <span class="wc-quote-mark">“</span>
            <p class="wc-quote-text">${escapeHtml(ch.quote)}</p>
          </div>
          ` : ''}
          <div class="wc-photo-cards-row">
            ${displayPhotos.slice(0, 3).map((p, pIdx) => `
              <div class="wc-photo-card" style="transform: rotate(${pIdx === 0 ? '-2deg' : pIdx === 1 ? '1.5deg' : '-1.5deg'});">
                <img src="${escapeHtml(p)}" alt="Memory" onerror="this.parentElement.style.display='none'">
              </div>
            `).join('')}
          </div>
          <div class="wc-nav-btns">
            <button type="button" class="wc-btn-ghost" onclick="wcPrevChapter()">← Previous</button>
            <button type="button" class="wc-btn-primary" onclick="wcNextChapter()">Continue →</button>
          </div>
        `;
      } else if (ch.type === 'interactive_reveal') {
        const pass = String(ch.passcode || data.passcode || '2026').trim();
        // Clean hint: NEVER leak the passcode
        let rawHint = String(ch.passcodeHint || data.passcodeHint || '').trim();
        // Remove any auto-concatenated password leaks
        rawHint = rawHint.replace(new RegExp(pass, 'gi'), '••••').replace(/key:s*••••/gi, '').replace(/passcode:s*••••/gi, '').trim();
        const displayHint = rawHint || 'A secret number or memorable year known between us.';

        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // CONFIDENTIAL`)}</div>
          <h2 class="wc-chapter-title">${escapeHtml(ch.title)}</h2>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <div class="wc-gold-divider"></div>
          
          <!-- REAL INTERACTIVE SECURITY VAULT KEYPAD -->
          <div class="wc-vault-lock-box" id="wcVaultBox_${idx}">
            <div class="wc-vault-header-compact">
              <span class="wc-vault-icon-badge" id="wcVaultIcon_${idx}">🔒</span>
              <span class="wc-vault-lock-title">Passcode Protected Vault</span>
            </div>

            <!-- PIN Dots Display -->
            <div class="wc-pin-input-container">
              <div class="wc-pin-dots" id="wcPinDots_${idx}">
                <span class="wc-pin-dot"></span>
                <span class="wc-pin-dot"></span>
                <span class="wc-pin-dot"></span>
                <span class="wc-pin-dot"></span>
              </div>
              <input type="text" id="wcPinInput_${idx}" class="wc-pin-hidden-input" maxlength="12" autocomplete="off" spellcheck="false" onkeydown="wcHandleKeydown(event, ${idx})" placeholder="Click to type code...">
            </div>

            <!-- Clue: Protected from leaking code -->
            <div class="wc-pass-hint-pill" id="wcPassHint_${idx}">
              <span>🔑 Clue:</span> <em>${escapeHtml(displayHint)}</em>
            </div>
            <div class="wc-vault-error-msg" id="wcVaultError_${idx}" style="display:none;"></div>

            <!-- On-Screen Numeric Keypad -->
            <div class="wc-keypad-grid" id="wcKeypad_${idx}">
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '1')">1</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '2')">2</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '3')">3</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '4')">4</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '5')">5</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '6')">6</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '7')">7</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '8')">8</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '9')">9</button>
              <button type="button" class="wc-key-btn clear" onclick="wcKeypadClear(${idx})" title="Clear">C</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '0')">0</button>
              <button type="button" class="wc-key-btn enter" onclick="wcAttemptUnlock(${idx})" title="Unlock">⏎</button>
            </div>
          </div>

          <!-- Secret Note Revealed Area (Hidden until unlocked) -->
          <div class="wc-secret-underneath" id="wcSecretNote_${idx}" style="display:none;">
            <div class="wc-unlocked-badge">
              <span>🔓 ACCESS GRANTED // DECRYPTED ARCHIVE</span>
            </div>
            <div class="wc-secret-salutation">${escapeHtml(ch.secretHeading || `For ${recName}`)}</div>
            <p class="wc-secret-text">${escapeHtml(ch.secretMessage)}</p>
            <div class="wc-secret-stamp">✦ AUTHENTICATED WITH IMMENSE CARE ✦</div>
          </div>

          <div class="wc-nav-btns" style="margin-top:24px;">
            <button type="button" class="wc-btn-ghost" onclick="wcPrevChapter()">← Previous</button>
            <button type="button" class="wc-btn-primary" onclick="wcNextChapter()">Continue →</button>
          </div>
        `;
      } else if (ch.type === 'letter') {
        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // THE LETTER`)}</div>
          <h2 class="wc-chapter-title">${escapeHtml(ch.title)}</h2>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <div class="wc-gold-divider"></div>
          
          <div class="wc-letter-scroll">
            ${ch.p1 ? `<p class="wc-letter-p">${escapeHtml(ch.p1)}</p>` : ''}
            ${ch.p2 ? `<p class="wc-letter-p">${escapeHtml(ch.p2)}</p>` : ''}
            ${ch.p3 ? `<p class="wc-letter-p">${escapeHtml(ch.p3)}</p>` : ''}
            ${ch.p4 ? `<p class="wc-letter-p">${escapeHtml(ch.p4)}</p>` : ''}
          </div>

          <div class="wc-nav-btns" style="margin-top:24px;">
            <button type="button" class="wc-btn-ghost" onclick="wcPrevChapter()">← Previous</button>
            <button type="button" class="wc-btn-primary" onclick="wcNextChapter()">Continue to Finale →</button>
          </div>
        `;
      } else {
        // Finale (Tailored to Archetype with Bespoke Interactive Widgets)
        let archetypeWidgetHtml = '';

        if (archetype.id === 'birthday') {
          archetypeWidgetHtml = `
            <div class="wc-interactive-cake-stage" id="wcCakeStage" onclick="wcBlowCandles()">
              <div class="wc-cake-candles">
                <div class="wc-candle"><div class="wc-flame" id="wcFlame1"></div></div>
                <div class="wc-candle center"><div class="wc-flame" id="wcFlame2"></div></div>
                <div class="wc-candle"><div class="wc-flame" id="wcFlame3"></div></div>
              </div>
              <div class="wc-cake-icon">🎂</div>
              <div class="wc-widget-prompt" id="wcCakePrompt">🎂 Tap the Cake to Blow Candles & Make a Wish! ✨</div>
            </div>
          `;
        } else if (archetype.id === 'truce') {
          archetypeWidgetHtml = `
            <div class="wc-truce-hold-container">
              <div class="wc-truce-seal-circle" id="wcTruceSealBtn" role="button" tabindex="0" aria-label="Hold to forgive">
                <svg class="wc-truce-ring-svg" viewBox="0 0 100 100">
                  <circle class="wc-truce-bg-circle" cx="50" cy="50" r="44"></circle>
                  <circle class="wc-truce-progress-circle" id="wcTruceProgressCircle" cx="50" cy="50" r="44"></circle>
                </svg>
                <div class="wc-truce-seal-inner">
                  <span class="wc-truce-seal-icon" id="wcTruceSealIcon">🕊️</span>
                  <span class="wc-truce-seal-label" id="wcTruceSealLabel">HOLD TO FORGIVE</span>
                  <span class="wc-truce-seal-percent" id="wcTruceSealPercent" style="display:none; font-size:9px; font-weight:700; color:var(--primary); margin-top:2px;">0%</span>
                </div>
              </div>
              <div class="wc-truce-sub-hint" id="wcTruceSubHint">Press & hold for 1.2s (or tap) to accept sincere peace treaty</div>
            </div>
          `;
        } else if (archetype.id === 'romance') {
          archetypeWidgetHtml = `
            <div class="wc-love-lock-widget" onclick="wcEngraveLoveLock()">
              <div class="wc-lock-visual">
                <div class="wc-lock-shackle" id="wcLockShackle"></div>
                <div class="wc-lock-body">
                  <span class="wc-lock-body-icon">💖</span>
                </div>
              </div>
              <div class="wc-lock-engraving" id="wcLockEngraving">${escapeHtml(recName)} & ${escapeHtml(sender)}</div>
              <div class="wc-widget-prompt" id="wcLockPrompt">Tap to Lock Our Love in Eternity 🔒</div>
            </div>
          `;
        } else if (archetype.id === 'obsidian') {
          archetypeWidgetHtml = `
            <div class="wc-cyber-terminal-widget" onclick="wcAuthorizeCyberMasterKey()">
              <div class="wc-cyber-scanner">
                <div class="wc-cyber-laser"></div>
                <span style="font-size:22px;">⚡</span>
              </div>
              <div class="wc-cyber-status" id="wcCyberStatus">[ READY: TAP TO AUTHORIZE CIPHER ]</div>
              <div class="wc-cyber-hash">SHA-256: 0x9f8b...41c2 // ARMED</div>
            </div>
          `;
        } else {
          // classic royal
          archetypeWidgetHtml = `
            <div class="wc-royal-toast-widget" onclick="wcRoyalToastClink()">
              <div class="wc-toast-glasses">🥂</div>
              <div class="wc-widget-prompt" id="wcToastPrompt">Raise Your Glass — Tap to Clink the Royal Toast 👑</div>
            </div>
          `;
        }

        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // THE FINALE`)}</div>
          <div class="wc-finale-emojis">${archetype.finaleEmoji}</div>
          <h1 class="wc-hero-title" style="font-size:clamp(1.9rem, 7vw, 2.8rem);">${escapeHtml(ch.title)}</h1>
          <div class="wc-gold-divider"></div>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <p class="wc-body-text" style="font-size:1.02rem; margin-top:14px;">${escapeHtml(ch.wishMessage)}</p>
          
          <!-- Bespoke Interactive Archetype Widget -->
          ${archetypeWidgetHtml}

          <div class="wc-signature-block">
            <div class="wc-sig-line"></div>
            <div class="wc-sig-text">${escapeHtml(ch.signature || `With all my heart,\n${sender}`).replace(/\\n|\n/g, '<br>')}</div>
          </div>

          <div class="wc-action-row" style="margin-top:24px;">
            <button type="button" class="wc-btn-ghost" onclick="wcPrevChapter()">← Previous</button>
            <button type="button" class="wc-btn-primary" onclick="wcReplayExperience()">↺ Replay Experience</button>
          </div>
        `;
      }

      return `
        <section class="wc-chapter-scene" id="wcScene_${idx}" style="${isFirst ? 'display:flex; opacity:1;' : 'display:none; opacity:0;'}">
          <div class="wc-glass-card ${archetype.id}">
            ${innerContentHtml}
          </div>
        </section>
      `;
    }).join('\n');

    // Bottom Navigation Indicators
    const indicatorsHtml = chaptersToRender.map((ch, idx) => `
      <button type="button" class="wc-pill-indicator ${idx === 0 ? 'active' : ''}" id="wcPill_${idx}" onclick="wcGoToChapter(${idx})" title="${escapeHtml(ch.navTitle || `Chapter ${idx+1}`)}">
        <span>0${idx+1}</span>
      </button>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${escapeHtml(data.occasion)} // ${escapeHtml(recName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${theme.bg};
      --card-bg: ${theme.cardBg};
      --primary: ${primaryColor};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --border: ${theme.border};
      --glow: ${theme.glow};
      --font-serif: ${theme.fontSerif};
      --font-sans: ${theme.fontSans};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%; height: 100%; min-height: 100%;
      background: var(--bg);
      color: #fff;
      font-family: var(--font-sans);
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-font-smoothing: antialiased;
    }
    body {
      background: radial-gradient(ellipse 1000px 600px at 50% 10%, var(--glow) 0%, transparent 75%), var(--bg);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 100vh;
      padding: clamp(44px, 7vh, 60px) 16px clamp(65px, 9vh, 85px);
      box-sizing: border-box;
    }
    canvas#wcBgParticles {
      position: fixed; inset: 0; pointer-events: none; z-index: 0; width: 100%; height: 100%;
    }
    canvas#wcConfettiCanvas {
      position: fixed; inset: 0; pointer-events: none; z-index: 99999; width: 100%; height: 100%;
    }
    .wc-container {
      position: relative; z-index: 10; width: 100%; max-width: 640px; margin: auto 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .wc-chapter-scene {
      width: 100%;
      flex-direction: column; align-items: center; justify-content: center;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .wc-glass-card {
      width: 100%;
      background: var(--card-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border);
      border-radius: var(--card-radius, 24px);
      padding: clamp(20px, 4.5vw, 36px) clamp(16px, 3.5vw, 28px);
      box-shadow: 0 25px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08);
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    /* Archetype specific flair */
    .wc-glass-card.birthday {
      border: 1.5px solid var(--border);
      border-radius: 26px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 45px var(--glow), inset 0 0 20px var(--glow);
    }
    .wc-glass-card.truce {
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), inset 0 0 35px var(--glow);
      background: radial-gradient(circle at 50% 0%, var(--glow) 0%, var(--card-bg) 70%);
    }
    .wc-glass-card.romance {
      border: 1.5px solid var(--border);
      border-radius: 28px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 50px var(--glow), inset 0 0 25px var(--glow);
      background: radial-gradient(circle at 50% 0%, var(--glow) 0%, var(--card-bg) 70%);
    }
    .wc-glass-card.obsidian {
      border: 1.5px solid var(--primary);
      border-radius: 12px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.95), 0 0 35px var(--glow), inset 0 0 20px var(--glow);
      background: var(--card-bg);
    }
    .wc-glass-card.classic {
      border: 1.5px solid var(--border);
      border-radius: 22px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), 0 0 35px var(--glow);
    }
    .wc-badge {
      display: inline-block;
      font-size: 10.5px;
      font-family: 'Space Grotesk', var(--font-sans);
      letter-spacing: 2.5px;
      color: var(--primary);
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      border-radius: 99px;
      padding: 4px 14px;
      margin-bottom: 18px;
      text-transform: uppercase;
    }
    .wc-hero-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 7vw, 2.9rem);
      line-height: 1.18;
      font-weight: 700;
      color: #fff;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #FFFFFF 30%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .wc-chapter-title {
      font-family: var(--font-serif);
      font-size: clamp(1.5rem, 5.5vw, 2.1rem);
      color: #fff;
      line-height: 1.25;
      margin-bottom: 8px;
    }
    .wc-subtitle {
      font-size: 13.5px;
      color: rgba(255,255,255,0.72);
      font-style: italic;
      font-family: var(--font-serif);
      line-height: 1.5;
    }
    .wc-gold-divider {
      width: 48px;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      margin: 16px auto;
    }
    .wc-body-text {
      font-size: 14px;
      line-height: 1.7;
      color: rgba(255,255,255,0.82);
    }
    .wc-quote-box {
      margin: 20px 0 16px;
      padding: 16px 20px;
      background: rgba(255,255,255,0.03);
      border-left: 2px solid var(--primary);
      border-radius: 4px 12px 12px 4px;
      text-align: left;
      position: relative;
    }
    .wc-quote-mark {
      font-family: var(--font-serif);
      font-size: 30px;
      color: var(--primary);
      line-height: 1;
      opacity: 0.6;
      display: block;
      margin-bottom: -6px;
    }
    .wc-quote-text {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 14px;
      line-height: 1.6;
      color: rgba(255,255,255,0.9);
    }
    .wc-photo-cards-row {
      display: flex; justify-content: center; gap: 12px; margin: 20px auto 10px;
      flex-wrap: wrap; max-width: 400px;
    }
    .wc-photo-card {
      width: 95px; height: 115px; border-radius: 12px;
      background: rgba(0,0,0,0.6); border: 1px solid var(--border);
      padding: 4px; box-shadow: 0 10px 24px rgba(0,0,0,0.7);
      transition: transform 0.25s ease;
    }
    .wc-photo-card:hover { transform: scale(1.05) rotate(0deg) !important; z-index: 2; }
    .wc-photo-card img {
      width: 100%; height: 100%; object-fit: cover; border-radius: 8px; display: block;
    }

    /* DIGITAL VAULT KEYPAD INTERFACE */
    .wc-vault-lock-box {
      width: 100%; max-width: 360px; margin: 10px auto;
      background: rgba(0, 0, 0, 0.5); border: 1px solid var(--border);
      border-radius: 16px; padding: 14px 12px;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      transition: all 0.3s ease;
    }
    .wc-vault-header-compact {
      display: flex; align-items: center; gap: 8px;
    }
    .wc-vault-icon-badge {
      font-size: 18px; line-height: 1;
    }
    .wc-vault-lock-title {
      font-family: var(--font-serif); font-size: 13px; color: #fff; font-weight: 600; letter-spacing: 0.5px;
    }
    .wc-pin-input-container {
      display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; width: 100%;
    }
    .wc-pin-dots {
      display: flex; gap: 10px; padding: 7px 14px;
      background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 10px;
    }
    .wc-pin-dot {
      width: 10px; height: 10px; border-radius: 50%;
      border: 1.5px solid var(--border); background: transparent;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .wc-pin-dot.filled {
      background: var(--primary); border-color: var(--primary);
      box-shadow: 0 0 10px var(--primary); transform: scale(1.15);
    }
    .wc-pin-hidden-input {
      position: absolute; opacity: 0; width: 100%; height: 100%; top: 0; left: 0; cursor: pointer;
    }
    .wc-keypad-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
      width: 100%; max-width: 210px; margin-top: 2px;
    }
    .wc-key-btn {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff; font-family: 'Space Grotesk', var(--font-sans);
      font-size: 15px; font-weight: 600; height: 38px; border-radius: 8px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s ease; user-select: none; -webkit-tap-highlight-color: transparent;
    }
    .wc-key-btn:hover {
      background: rgba(255, 255, 255, 0.14); border-color: var(--primary); transform: translateY(-1px);
    }
    .wc-key-btn:active {
      transform: scale(0.94); background: var(--primary); color: #000;
    }
    .wc-key-btn.clear { color: #ff7675; font-size: 13px; }
    .wc-key-btn.enter { color: var(--primary); font-size: 15px; }
    .wc-vault-error-msg {
      font-size: 11px; color: #ff6b6b; font-weight: 500;
      background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.3);
      padding: 4px 10px; border-radius: 6px; animation: wcShake 0.4s ease;
    }
    .wc-pass-hint-pill {
      font-size: 11px; font-family: var(--font-sans); color: var(--secondary);
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 8px; padding: 4px 10px; max-width: 320px; text-align: center;
    }
    .wc-pass-hint-pill span { color: var(--primary); font-weight: 600; }
    .wc-secret-underneath {
      width: 100%; background: radial-gradient(circle at center, rgba(212,175,106,0.15) 0%, rgba(12, 13, 18, 0.95) 85%);
      border: 1px solid var(--border); border-radius: 20px; padding: 28px 22px;
      text-align: center; animation: wcFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 30px var(--glow);
    }
    @keyframes wcFadeInUp {
      from { opacity: 0; transform: translateY(15px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .wc-unlocked-badge {
      display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-family: monospace;
      color: #2ed573; background: rgba(46, 213, 115, 0.1); border: 1px solid rgba(46, 213, 115, 0.3);
      padding: 4px 12px; border-radius: 99px; margin-bottom: 14px; letter-spacing: 1px;
    }
    .wc-secret-salutation {
      font-family: var(--font-serif); font-size: 17px; font-weight: 600; color: var(--primary); margin-bottom: 10px;
    }
    .wc-secret-text {
      font-size: 14px; line-height: 1.7; color: #fff;
    }
    .wc-secret-stamp {
      font-size: 10.5px; color: var(--primary); margin-top: 18px; font-family: var(--font-sans);
      letter-spacing: 1.5px; opacity: 0.85;
    }

    .wc-letter-scroll {
      text-align: left; margin: 16px 0; max-height: 260px; overflow-y: auto; padding-right: 8px;
    }
    .wc-letter-p {
      font-size: 13.5px; line-height: 1.75; color: rgba(255,255,255,0.88); margin-bottom: 14px;
    }
    .wc-finale-emojis {
      font-size: 2.2rem; margin-bottom: 12px; letter-spacing: 6px;
      animation: floatHop 3s infinite ease-in-out;
    }
    @keyframes floatHop {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .wc-finale-action-btn {
      padding: 13px 26px !important;
      font-size: 13.5px !important;
      letter-spacing: 0.5px;
      cursor: pointer;
    }
    .wc-signature-block {
      margin-top: 22px; text-align: right;
    }
    .wc-sig-line {
      width: 60px; height: 1px; background: var(--primary); margin: 0 0 8px auto; opacity: 0.5;
    }
    .wc-sig-text {
      font-family: var(--font-serif); font-size: 13px; color: var(--primary); line-height: 1.4;
      font-style: italic;
    }
    .wc-action-row, .wc-nav-btns {
      display: flex; justify-content: center; gap: 12px; width: 100%;
    }
    .wc-btn-primary {
      background: linear-gradient(135deg, var(--primary), #a68444);
      color: #0b0914; font-family: var(--font-serif); font-weight: 700;
      font-size: 13.5px; border: none; border-radius: 99px; padding: 12px 28px;
      cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .wc-btn-primary:hover {
      transform: translateY(-1px); box-shadow: 0 10px 30px rgba(212,175,106,0.35);
    }
    .wc-btn-ghost {
      background: transparent; color: rgba(255,255,255,0.75);
      font-family: var(--font-sans); font-size: 12.5px; border: 1px solid var(--border);
      border-radius: 99px; padding: 12px 22px; cursor: pointer;
      transition: all 0.15s ease;
    }
    .wc-btn-ghost:hover {
      color: #fff; border-color: var(--primary); background: rgba(255,255,255,0.05);
    }
    /* Fixed Bottom Chapter Bar */
    .wc-bottom-chapter-bar {
      position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%);
      z-index: 9999; display: flex; align-items: center; gap: 6px;
      background: rgba(11, 12, 16, 0.94); backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px); border: 1px solid var(--border);
      border-radius: 999px; padding: 4px 12px; box-shadow: 0 10px 35px rgba(0,0,0,0.85);
      max-width: 90vw; overflow-x: auto;
    }
    .wc-pill-indicator {
      border: none; background: transparent; color: rgba(255,255,255,0.5);
      font-family: monospace; font-size: 11px; padding: 4px 10px; border-radius: 999px;
      cursor: pointer; transition: all 0.2s; white-space: nowrap;
    }
    .wc-pill-indicator:hover { color: #fff; }
    .wc-pill-indicator.active {
      background: var(--primary); color: #000; font-weight: 700;
      box-shadow: 0 0 12px var(--primary);
    }
    /* Watermark - Moved to Top Right to NEVER overlap bottom timeline */
    .wc-wm-badge {
      position: fixed; top: 12px; right: 14px; z-index: 9999;
      display: inline-flex; align-items: center; gap: 5px;
      background: rgba(8, 10, 14, 0.85); backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid var(--border); border-radius: 999px;
      padding: 4px 11px; font-size: 10px; color: rgba(255,255,255,0.75);
      text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: all 0.2s ease;
    }
    .wc-wm-badge:hover { color: #fff; border-color: var(--primary); }

    /* --- INTERACTIVE FINALE WIDGETS --- */
    /* 1. Birthday Cake & Candles */
    .wc-interactive-cake-stage {
      margin: 18px auto 14px; padding: 16px 18px;
      background: rgba(255, 215, 0, 0.05); border: 1.5px dashed rgba(255, 215, 0, 0.35);
      border-radius: 20px; cursor: pointer; transition: all 0.25s ease;
      display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 320px;
      user-select: none;
    }
    .wc-interactive-cake-stage:hover {
      background: rgba(255, 215, 0, 0.1); border-color: #FFD32A; transform: scale(1.02);
    }
    .wc-cake-candles {
      display: flex; gap: 14px; align-items: flex-end; height: 32px;
    }
    .wc-candle {
      width: 8px; height: 22px; background: linear-gradient(to top, #fff, #ffd32a);
      border-radius: 4px; position: relative;
    }
    .wc-candle.center { height: 26px; }
    .wc-flame {
      width: 10px; height: 14px; background: radial-gradient(ellipse at bottom, #fff 0%, #ff9f1a 50%, #ff3838 100%);
      border-radius: 50% 50% 35% 35%; position: absolute; top: -14px; left: -1px;
      animation: wcFlameFlicker 0.4s infinite alternate ease-in-out;
      box-shadow: 0 0 12px #ff9f1a;
      transition: all 0.3s ease;
    }
    .wc-flame.blown {
      opacity: 0; transform: translateY(-8px) scale(0);
    }
    @keyframes wcFlameFlicker {
      0% { transform: scale(1) rotate(-2deg); }
      100% { transform: scale(1.15) rotate(3deg); }
    }
    .wc-cake-icon { font-size: 34px; line-height: 1; }
    .wc-widget-prompt {
      font-size: 12px; font-weight: 600; color: var(--primary); text-align: center;
      letter-spacing: 0.3px;
    }

    /* 2. Truce Hold-to-Forgive Circular Progress Seal */
    .wc-truce-hold-container {
      margin: 18px auto 14px; display: flex; flex-direction: column; align-items: center; gap: 10px;
      user-select: none; -webkit-user-select: none; max-width: 320px;
    }
    .wc-truce-seal-circle {
      width: 96px; height: 96px; position: relative; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      border-radius: 50%; -webkit-tap-highlight-color: transparent;
      touch-action: none; -webkit-touch-callout: none;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.4) 100%);
      box-shadow: 0 8px 25px rgba(0,0,0,0.6);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
    }
    .wc-truce-seal-circle:hover {
      transform: scale(1.03);
      box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 20px var(--glow);
    }
    .wc-truce-seal-circle.holding {
      transform: scale(1.08);
      box-shadow: 0 12px 35px rgba(0,0,0,0.8), 0 0 35px var(--glow);
    }
    .wc-truce-seal-circle.sealed {
      transform: scale(1.05);
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(46, 213, 115, 0.4);
      cursor: default;
    }
    .wc-truce-ring-svg {
      width: 100%; height: 100%; transform: rotate(-90deg); position: absolute; inset: 0; pointer-events: none;
    }
    .wc-truce-bg-circle {
      fill: none; stroke: var(--border); stroke-width: 6; opacity: 0.4;
    }
    .wc-truce-progress-circle {
      fill: none; stroke: var(--primary); stroke-width: 6;
      stroke-dasharray: 276.46; stroke-dashoffset: 276.46;
      stroke-linecap: round; transition: stroke-dashoffset 0.05s linear;
      filter: drop-shadow(0 0 6px var(--primary));
    }
    .wc-truce-seal-circle.sealed .wc-truce-progress-circle {
      stroke: #2ed573;
      filter: drop-shadow(0 0 8px #2ed573);
    }
    .wc-truce-seal-inner {
      position: relative; z-index: 2; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      pointer-events: none; user-select: none; -webkit-user-select: none;
    }
    .wc-truce-seal-icon { font-size: 26px; transition: transform 0.2s ease; }
    .wc-truce-seal-circle.holding .wc-truce-seal-icon { transform: scale(1.15); }
    .wc-truce-seal-label {
      font-size: 8px; font-weight: 700; letter-spacing: 1px; color: var(--primary); margin-top: 2px;
      transition: color 0.2s ease;
    }
    .wc-truce-seal-circle.sealed .wc-truce-seal-label { color: #2ed573; }
    .wc-truce-sub-hint { font-size: 11.5px; color: rgba(255,255,255,0.7); text-align: center; font-style: italic; min-height: 18px; }

    /* 3. Romance Metallic Love Lock */
    .wc-love-lock-widget {
      margin: 18px auto 14px; padding: 14px 18px;
      background: radial-gradient(circle at 50% 0%, rgba(255, 107, 129, 0.15) 0%, rgba(20, 5, 12, 0.8) 100%);
      border: 1.5px solid rgba(255, 107, 129, 0.4); border-radius: 20px;
      cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px;
      max-width: 320px; user-select: none; transition: all 0.25s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }
    .wc-love-lock-widget:hover {
      border-color: #FF7EB3; transform: scale(1.02);
    }
    .wc-lock-visual {
      display: flex; flex-direction: column; align-items: center; position: relative;
    }
    .wc-lock-shackle {
      width: 34px; height: 26px; border: 4px solid var(--primary);
      border-bottom: none; border-radius: 20px 20px 0 0;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: translateY(-4px);
    }
    .wc-lock-shackle.locked {
      transform: translateY(4px);
    }
    .wc-lock-body {
      width: 52px; height: 42px; background: linear-gradient(135deg, var(--primary), #a6344d);
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 16px rgba(0,0,0,0.5);
    }
    .wc-lock-body-icon { font-size: 20px; }
    .wc-lock-engraving {
      font-size: 11px; font-family: var(--font-serif); font-style: italic; color: #fff;
    }

    /* 4. Obsidian Cybernetic Scanner */
    .wc-cyber-terminal-widget {
      margin: 18px auto 14px; padding: 14px 16px;
      background: rgba(0, 245, 212, 0.04); border: 1.5px solid rgba(0, 245, 212, 0.4);
      border-radius: 10px; cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 8px; max-width: 320px; font-family: 'Space Grotesk', monospace;
      user-select: none; transition: all 0.2s ease;
    }
    .wc-cyber-terminal-widget:hover {
      border-color: #00F5D4; box-shadow: 0 0 20px rgba(0, 245, 212, 0.25);
    }
    .wc-cyber-scanner {
      width: 50px; height: 50px; border: 1px solid var(--primary);
      display: flex; align-items: center; justify-content: center; position: relative;
      background: rgba(0, 245, 212, 0.08); border-radius: 6px; overflow: hidden;
    }
    .wc-cyber-laser {
      position: absolute; width: 100%; height: 2px; background: #00F5D4;
      box-shadow: 0 0 8px #00F5D4; top: 0; left: 0;
      animation: wcCyberScan 1.6s infinite ease-in-out;
    }
    @keyframes wcCyberScan {
      0% { top: 0; }
      50% { top: 96%; }
      100% { top: 0; }
    }
    .wc-cyber-status {
      font-size: 11px; color: var(--primary); letter-spacing: 1px; font-weight: 600;
    }
    .wc-cyber-hash {
      font-size: 9px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px;
    }

    /* 5. Classical Royal Toast */
    .wc-royal-toast-widget {
      margin: 18px auto 14px; padding: 16px 18px;
      background: rgba(212, 175, 106, 0.05); border: 1.5px solid rgba(212, 175, 106, 0.35);
      border-radius: 20px; cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 8px; max-width: 320px; user-select: none;
      transition: all 0.25s ease;
    }
    .wc-royal-toast-widget:hover {
      border-color: #D4AF37; transform: scale(1.02);
    }
    .wc-toast-glasses { font-size: 34px; line-height: 1; }

    @media (max-width: 600px) {
      body {
        padding: 50px 12px 75px;
        justify-content: center;
        min-height: 100vh;
      }
      .wc-container {
        margin: auto 0;
        width: 100%;
      }
      .wc-glass-card {
        padding: 18px 14px;
        border-radius: 20px;
        max-height: calc(100vh - 105px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      .wc-hero-title { font-size: 1.6rem; }
      .wc-chapter-title { font-size: 1.25rem; margin-bottom: 4px; }
      .wc-subtitle { font-size: 11.5px; }
      .wc-gold-divider { margin: 8px auto; width: 36px; }
      .wc-vault-lock-box { padding: 10px 8px; gap: 6px; margin: 4px auto; }
      .wc-keypad-grid { max-width: 190px; gap: 5px; }
      .wc-key-btn { height: 34px; font-size: 14px; border-radius: 8px; }
      .wc-pin-dots { padding: 6px 12px; gap: 8px; }
      .wc-pin-dot { width: 9px; height: 9px; }
      .wc-nav-btns { margin-top: 10px !important; }
      .wc-btn-primary, .wc-btn-ghost { padding: 8px 18px; font-size: 12px; }
      .wc-bottom-chapter-bar { bottom: 8px; padding: 3px 8px; gap: 4px; }
      .wc-pill-indicator { padding: 3px 7px; font-size: 9.5px; }
      .wc-wm-badge { top: 8px; right: 8px; font-size: 9px; padding: 3px 8px; }
    }
  </style>
</head>
<body>
  <canvas id="wcBgParticles"></canvas>
  <canvas id="wcConfettiCanvas"></canvas>

  <main class="wc-container">
    ${chaptersHtml}
  </main>

  <!-- Bottom Navigation Pills -->
  <nav class="wc-bottom-chapter-bar">
    ${indicatorsHtml}
  </nav>

  ${showWatermark ? `
  <a class="wc-wm-badge" href="https://wishcraft.in" target="_blank" rel="noopener">
    <span style="color:var(--primary)">✦</span> Crafted with WishCraft
  </a>` : ''}

  <script>
    // Chapter Navigation Engine
    let currentChapter = 0;
    const totalChapters = ${chaptersToRender.length};
    const _authVaultKey = ${JSON.stringify(typeof Buffer !== 'undefined' ? Buffer.from(String(data.passcode || '2026').trim().toLowerCase()).toString('base64') : btoa(unescape(encodeURIComponent(String(data.passcode || '2026').trim().toLowerCase()))))};
    const _vaultKeyLen = ${String(data.passcode || '2026').trim().length};
    let enteredPins = {};

    function playTone(freq = 440, duration = 0.08, type = 'sine') {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch(_) {}
    }

    window.wcGoToChapter = function(targetIdx) {
      if (targetIdx < 0 || targetIdx >= totalChapters) return;
      
      const currentEl = document.getElementById('wcScene_' + currentChapter);
      const targetEl = document.getElementById('wcScene_' + targetIdx);

      if (currentEl) {
        currentEl.style.opacity = '0';
        currentEl.style.transform = targetIdx > currentChapter ? 'translateY(-15px)' : 'translateY(15px)';
        setTimeout(() => {
          currentEl.style.display = 'none';
          if (targetEl) {
            targetEl.style.display = 'flex';
            targetEl.style.opacity = '0';
            targetEl.style.transform = targetIdx > currentChapter ? 'translateY(15px)' : 'translateY(-15px)';
            requestAnimationFrame(() => {
              targetEl.style.opacity = '1';
              targetEl.style.transform = 'translateY(0)';
            });
          }
        }, 220);
      }

      // Update pills
      document.querySelectorAll('.wc-pill-indicator').forEach((p, idx) => {
        p.classList.toggle('active', idx === targetIdx);
      });

      currentChapter = targetIdx;
      playTone(380 + targetIdx * 45, 0.08);

      // Trigger confetti on finale
      if (targetIdx === totalChapters - 1) {
        setTimeout(launchConfetti, 350);
      }
    };

    window.wcNextChapter = function() {
      if (currentChapter < totalChapters - 1) {
        wcGoToChapter(currentChapter + 1);
      }
    };

    window.wcPrevChapter = function() {
      if (currentChapter > 0) {
        wcGoToChapter(currentChapter - 1);
      }
    };

    window.wcReplayExperience = function() {
      wcGoToChapter(0);
    };

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        wcNextChapter();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        wcPrevChapter();
      }
    });

    // Touch swipe navigation
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
    window.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (diff < -50) wcNextChapter();
      else if (diff > 50) wcPrevChapter();
    }, {passive:true});

    // Vault Keypad Logic
    function updatePinDots(idx) {
      const pin = enteredPins[idx] || '';
      const dotsWrap = document.getElementById('wcPinDots_' + idx);
      if (!dotsWrap) return;
      
      const dots = dotsWrap.querySelectorAll('.wc-pin-dot');
      dots.forEach((dot, dotIdx) => {
        dot.classList.toggle('filled', dotIdx < pin.length);
      });
    }

    window.wcKeypadPress = function(idx, digit) {
      if (!enteredPins[idx]) enteredPins[idx] = '';
      if (enteredPins[idx].length < 8) {
        enteredPins[idx] += String(digit);
        playTone(520 + enteredPins[idx].length * 30, 0.05, 'triangle');
        updatePinDots(idx);
        
        // Hide error message
        const err = document.getElementById('wcVaultError_' + idx);
        if (err) err.style.display = 'none';

        // Auto attempt unlock if reached expected length
        if (enteredPins[idx].length === _vaultKeyLen) {
          setTimeout(() => wcAttemptUnlock(idx), 200);
        }
      }
    };

    window.wcKeypadClear = function(idx) {
      enteredPins[idx] = '';
      updatePinDots(idx);
      playTone(280, 0.06);
      const err = document.getElementById('wcVaultError_' + idx);
      if (err) err.style.display = 'none';
    };

    window.wcHandleKeydown = function(e, idx) {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        wcKeypadPress(idx, e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (enteredPins[idx] && enteredPins[idx].length > 0) {
          enteredPins[idx] = enteredPins[idx].slice(0, -1);
          updatePinDots(idx);
          playTone(320, 0.05);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        wcAttemptUnlock(idx);
      }
    };

    window.wcAttemptUnlock = function(idx) {
      const pin = (enteredPins[idx] || '').trim();
      const vaultBox = document.getElementById('wcVaultBox_' + idx);
      const secretCard = document.getElementById('wcSecretNote_' + idx);
      const vaultIcon = document.getElementById('wcVaultIcon_' + idx);
      const err = document.getElementById('wcVaultError_' + idx);

      if (!pin) {
        if (err) {
          err.textContent = 'Please enter the security passcode.';
          err.style.display = 'block';
        }
        return;
      }

      let isCorrect = false;
      try {
        isCorrect = (btoa(unescape(encodeURIComponent(pin.toLowerCase()))) === _authVaultKey);
      } catch(_) {
        isCorrect = false;
      }
      if (isCorrect) {
        // SUCCESSFUL UNLOCK
        playTone(660, 0.12);
        setTimeout(() => playTone(880, 0.18), 120);
        setTimeout(() => playTone(1100, 0.25), 240);

        if (vaultIcon) vaultIcon.textContent = '🔓';
        if (vaultBox) {
          vaultBox.style.borderColor = 'rgba(46, 213, 115, 0.8)';
          vaultBox.style.boxShadow = '0 0 35px rgba(46, 213, 115, 0.3)';
          setTimeout(() => {
            vaultBox.style.opacity = '0';
            vaultBox.style.transform = 'scale(0.95)';
            setTimeout(() => {
              vaultBox.style.display = 'none';
              if (secretCard) {
                secretCard.style.display = 'block';
                launchConfetti();
              }
            }, 300);
          }, 450);
        }
      } else {
        // INCORRECT PIN
        playTone(180, 0.22, 'sawtooth');
        if (vaultBox) {
          vaultBox.style.animation = 'none';
          void vaultBox.offsetWidth;
          vaultBox.style.animation = 'wcShake 0.4s ease';
        }
        if (err) {
          err.textContent = '⛔ Incorrect Passcode. Please check the clue and try again.';
          err.style.display = 'block';
        }
        enteredPins[idx] = '';
        updatePinDots(idx);
      }
    };

    // --- BESPOKE INTERACTIVE FINALE ACTIONS ---
    // 1. Birthday Candle Blow
    window.wcBlowCandles = function() {
      const f1 = document.getElementById('wcFlame1');
      const f2 = document.getElementById('wcFlame2');
      const f3 = document.getElementById('wcFlame3');
      const prompt = document.getElementById('wcCakePrompt');
      
      if (f1 && !f1.classList.contains('blown')) {
        f1.classList.add('blown');
        setTimeout(() => f2 && f2.classList.add('blown'), 90);
        setTimeout(() => f3 && f3.classList.add('blown'), 180);

        playTone(523, 0.15, 'triangle');
        setTimeout(() => playTone(659, 0.18, 'triangle'), 120);
        setTimeout(() => playTone(784, 0.35, 'sine'), 240);

        if (prompt) prompt.innerHTML = '✨ Wish Sent to the Universe! Happy Birthday! ✨';
        launchConfetti();
      }
    };

    // 2. Truce Hold to Forgive
    let truceHoldInterval = null;
    let truceDrainInterval = null;
    let truceHoldProgress = 0;
    let isTruceSealed = false;
    let truceHoldStartTime = 0;

    function updateTruceUI(prog) {
      const circle = document.getElementById('wcTruceProgressCircle');
      const label = document.getElementById('wcTruceSealLabel');
      const percent = document.getElementById('wcTruceSealPercent');
      const hint = document.getElementById('wcTruceSubHint');

      if (circle) {
        const offset = 276.46 - (276.46 * (Math.min(100, Math.max(0, prog)) / 100));
        circle.style.strokeDashoffset = offset;
      }

      if (percent) {
        if (prog > 4 && prog < 100) {
          percent.style.display = 'block';
          percent.textContent = Math.floor(prog) + '%';
        } else {
          percent.style.display = 'none';
        }
      }

      if (prog < 35) {
        if (label) label.textContent = 'HOLDING...';
        if (hint) hint.textContent = 'Keep holding to clear the air... 🕊️';
      } else if (prog < 70) {
        if (label) label.textContent = 'MELTING...';
        if (hint) hint.textContent = 'Reconciliation in progress... ✨';
      } else if (prog < 100) {
        if (label) label.textContent = 'ALMOST!';
        if (hint) hint.textContent = 'Almost sealed, please don\'t let go... ❤️';
      }
    }

    function completeTruceForgiveness() {
      if (isTruceSealed) return;
      isTruceSealed = true;
      clearInterval(truceHoldInterval);
      clearInterval(truceDrainInterval);
      truceHoldProgress = 100;

      const circle = document.getElementById('wcTruceProgressCircle');
      const label = document.getElementById('wcTruceSealLabel');
      const percent = document.getElementById('wcTruceSealPercent');
      const hint = document.getElementById('wcTruceSubHint');
      const icon = document.getElementById('wcTruceSealIcon');
      const btn = document.getElementById('wcTruceSealBtn');

      if (circle) {
        circle.setAttribute('data-sealed', 'true');
        circle.style.strokeDashoffset = '0';
      }
      if (btn) {
        btn.classList.remove('holding');
        btn.classList.add('sealed');
      }
      if (label) label.textContent = 'TRUCE SEALED';
      if (percent) percent.style.display = 'none';
      if (icon) icon.textContent = '🤍';
      if (hint) hint.innerHTML = '❤️ <strong>Truce sealed. All is forgiven.</strong> Thank you for your sincerity.';

      playTone(440, 0.15, 'sine');
      setTimeout(() => playTone(554, 0.18, 'sine'), 120);
      setTimeout(() => playTone(659, 0.35, 'sine'), 250);
      if (navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch(_) {}
      launchConfetti();
    }

    function autoCompleteTruceHold() {
      if (isTruceSealed) return;
      clearInterval(truceDrainInterval);
      clearInterval(truceHoldInterval);

      const btn = document.getElementById('wcTruceSealBtn');
      if (btn) btn.classList.add('holding');

      playTone(320, 0.1, 'sine');

      truceHoldInterval = setInterval(() => {
        truceHoldProgress += 4;
        updateTruceUI(truceHoldProgress);

        if (Math.floor(truceHoldProgress) % 20 === 0) {
          playTone(280 + truceHoldProgress * 3, 0.05, 'sine');
          if (navigator.vibrate) try { navigator.vibrate(15); } catch(_) {}
        }

        if (truceHoldProgress >= 100) {
          completeTruceForgiveness();
        }
      }, 25);
    }

    window.wcStartTruceHold = function(e) {
      if (isTruceSealed) return;
      truceHoldStartTime = Date.now();

      clearInterval(truceDrainInterval);
      clearInterval(truceHoldInterval);

      const btn = document.getElementById('wcTruceSealBtn');
      if (btn) {
        btn.classList.add('holding');
        if (e && e.pointerId !== undefined && btn.setPointerCapture) {
          try { btn.setPointerCapture(e.pointerId); } catch(_) {}
        }
      }

      playTone(280, 0.08, 'sine');

      truceHoldInterval = setInterval(() => {
        truceHoldProgress += 4;
        updateTruceUI(truceHoldProgress);

        if (Math.floor(truceHoldProgress) % 20 === 0) {
          playTone(280 + truceHoldProgress * 3, 0.05, 'sine');
          if (navigator.vibrate) try { navigator.vibrate(15); } catch(_) {}
        }

        if (truceHoldProgress >= 100) {
          completeTruceForgiveness();
        }
      }, 35);
    };

    window.wcEndTruceHold = function(e) {
      if (isTruceSealed) return;
      clearInterval(truceHoldInterval);

      const btn = document.getElementById('wcTruceSealBtn');
      if (btn) {
        btn.classList.remove('holding');
        if (e && e.pointerId !== undefined && btn.releasePointerCapture) {
          try { btn.releasePointerCapture(e.pointerId); } catch(_) {}
        }
      }

      const label = document.getElementById('wcTruceSealLabel');
      const percent = document.getElementById('wcTruceSealPercent');
      const hint = document.getElementById('wcTruceSubHint');

      const holdDuration = Date.now() - truceHoldStartTime;
      if (holdDuration < 250 && truceHoldProgress < 100) {
        autoCompleteTruceHold();
        return;
      }

      if (truceHoldProgress < 100) {
        if (label) label.textContent = 'HOLD TO FORGIVE';
        if (percent) percent.style.display = 'none';
        if (hint) hint.textContent = 'Press & hold (or tap) to accept sincere peace treaty';

        clearInterval(truceDrainInterval);
        truceDrainInterval = setInterval(() => {
          truceHoldProgress -= 5;
          if (truceHoldProgress <= 0) {
            truceHoldProgress = 0;
            clearInterval(truceDrainInterval);
          }
          updateTruceUI(truceHoldProgress);
        }, 25);
      }
    };

    // Auto-bind Truce Seal event listeners cleanly
    (function initTruceListeners() {
      const btn = document.getElementById('wcTruceSealBtn');
      if (!btn) return;

      btn.addEventListener('pointerdown', window.wcStartTruceHold);
      btn.addEventListener('pointerup', window.wcEndTruceHold);
      btn.addEventListener('pointercancel', window.wcEndTruceHold);

      // Fallback for touch devices where PointerEvent might behave differently
      btn.addEventListener('touchstart', (e) => {
        if (!window.PointerEvent) window.wcStartTruceHold(e);
      }, { passive: true });
      btn.addEventListener('touchend', (e) => {
        if (!window.PointerEvent) window.wcEndTruceHold(e);
      });
      btn.addEventListener('click', (e) => {
        if (!isTruceSealed && truceHoldProgress < 100) {
          autoCompleteTruceHold();
        }
      });
      btn.addEventListener('contextmenu', (e) => e.preventDefault());
    })();

    // 3. Romance Love Lock
    window.wcEngraveLoveLock = function() {
      const shackle = document.getElementById('wcLockShackle');
      const prompt = document.getElementById('wcLockPrompt');
      if (shackle && !shackle.classList.contains('locked')) {
        shackle.classList.add('locked');
        playTone(320, 0.06, 'square');
        setTimeout(() => playTone(640, 0.15, 'triangle'), 80);
        if (prompt) prompt.innerHTML = '🔒 Locked Forever in Our Hearts. Never to be Undone. ❤️';
        launchConfetti();
      }
    };

    // 4. Obsidian Cyber Master Key
    window.wcAuthorizeCyberMasterKey = function() {
      const status = document.getElementById('wcCyberStatus');
      if (status && !status.getAttribute('data-auth')) {
        status.setAttribute('data-auth', 'true');
        playTone(440, 0.06, 'sawtooth');
        setTimeout(() => playTone(880, 0.08, 'sawtooth'), 80);
        setTimeout(() => playTone(1760, 0.25, 'sine'), 160);
        status.innerHTML = '🔓 ACCESS GRANTED // PERMANENT CIPHER LOGGED';
        status.style.color = '#2ed573';
        launchConfetti();
      }
    };

    // 5. Classic Royal Toast
    window.wcRoyalToastClink = function() {
      const prompt = document.getElementById('wcToastPrompt');
      playTone(2093, 0.45, 'sine');
      setTimeout(() => playTone(2637, 0.6, 'sine'), 100);
      if (prompt) prompt.innerHTML = '🌟 A Toast to an Unstoppable, Radiant Future! Cheers! 🌟';
      launchConfetti();
    };

    // Fallback button action
    window.wcTriggerFinaleAction = function(archetypeId) {
      if (archetypeId === 'birthday') wcBlowCandles();
      else if (archetypeId === 'truce') wcStartTruceHold();
      else if (archetypeId === 'romance') wcEngraveLoveLock();
      else if (archetypeId === 'obsidian') wcAuthorizeCyberMasterKey();
      else wcRoyalToastClink();
    };

    // Dynamic background particles tuned to Archetype
    (function initParticles() {
      const cvs = document.getElementById('wcBgParticles');
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      let w = cvs.width = window.innerWidth;
      let h = cvs.height = window.innerHeight;
      window.addEventListener('resize', () => { w = cvs.width = window.innerWidth; h = cvs.height = window.innerHeight; });

      const userTheme = ${JSON.stringify(userTheme)};
      let pType = ${JSON.stringify(archetype.particleType || 'stardust')};
      if (userTheme === 'arctic-frost') pType = 'frost_crystals';
      else if (userTheme === 'midnight-arcade') pType = 'cyber_grid';
      else if (userTheme === 'blush-romance') pType = 'rose_hearts';
      else if (userTheme === 'lavender-dream') pType = 'lavender_stars';
      const pColor = ${JSON.stringify(primaryColor)};

      const count = pType === 'cyber_grid' ? 50 : (pType === 'rose_hearts' ? 32 : (pType === 'frost_crystals' ? 38 : 45));
      const pts = Array.from({length: count}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.04
      }));

      function drawHeart(x, y, size, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 6, size / 6);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -5, -10, 2, 0, 10);
        ctx.bezierCurveTo(10, 2, 5, -5, 0, 0);
        ctx.fillStyle = 'rgba(255, 107, 129, ' + (alpha * 0.7) + ')';
        ctx.fill();
        ctx.restore();
      }

      function loop() {
        ctx.clearRect(0, 0, w, h);
        pts.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          if (pType === 'frost_crystals') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.strokeStyle = 'rgba(143, 216, 232, ' + (p.alpha * 0.88) + ')';
            ctx.lineWidth = 1.2;
            for (let i = 0; i < 3; i++) {
              ctx.rotate(Math.PI / 3);
              ctx.beginPath();
              ctx.moveTo(0, -p.r * 2.5);
              ctx.lineTo(0, p.r * 2.5);
              ctx.stroke();
            }
            ctx.restore();
          } else if (pType === 'lavender_stars') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 1.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 166, 255, ' + p.alpha + ')';
            ctx.fill();
          } else if (pType === 'rose_hearts') {
            drawHeart(p.x, p.y, p.r * 3.5, p.alpha);
          } else if (pType === 'cyber_grid') {
            ctx.fillStyle = 'rgba(0, 245, 212, ' + p.alpha + ')';
            ctx.fillRect(p.x, p.y, p.r * 1.5, p.r * 3.5);
          } else if (pType === 'birthday_sparkles') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = (p.x % 2 === 0) ? 'rgba(255, 211, 42, ' + p.alpha + ')' : 'rgba(255, 120, 100, ' + p.alpha + ')';
            ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
            ctx.restore();
          } else if (pType === 'golden_leaves') {
            ctx.fillStyle = 'rgba(230, 194, 128, ' + p.alpha + ')';
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.r * 2, p.r, p.rot, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // stardust
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 175, 106, ' + p.alpha + ')';
            ctx.fill();
          }
        });
        requestAnimationFrame(loop);
      }
      loop();
    })();

    // Confetti cannon
    function launchConfetti() {
      const cvs = document.getElementById('wcConfettiCanvas');
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      let w = cvs.width = window.innerWidth;
      let h = cvs.height = window.innerHeight;

      const colors = ['#D4AF6A', '#F3E5AB', '#FFFFFF', '#E056FD', '#FF9E9D', '#2ED573'];
      const conf = Array.from({length: 90}, () => ({
        x: w / 2,
        y: h / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        alpha: 1
      }));

      let frames = 0;
      function render() {
        ctx.clearRect(0, 0, w, h);
        let active = false;
        conf.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35; // gravity
          p.rotation += p.vr;
          p.alpha -= 0.008;

          if (p.alpha > 0) {
            active = true;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
            ctx.restore();
          }
        });

        frames++;
        if (active && frames < 240) {
          requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, w, h);
        }
      }
      render();
    }
  </script>
</body>
</html>`;
  }

  // Export WishCraftAiEngine to Global Scope
  global.WishCraftAiEngine = {
    THEME_PALETTES,
    ARCHETYPES,
    getDefaultWishData,
    getSystemPrompt,
    buildIntakeMessage,
    compileMultiPageWish,
    determineArchetype
  };

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
