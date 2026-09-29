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

  // 6 Luxury Theme Color Palettes
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
      bg: '#03140E',
      cardBg: 'rgba(5, 26, 18, 0.85)',
      primary: '#4ECCA3',
      secondary: '#E8F5E9',
      accent: '#E5C158',
      border: 'rgba(78, 204, 163, 0.3)',
      glow: 'rgba(78, 204, 163, 0.18)',
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
    }
  };

  // 5 Distinct Layout Archetypes
  const ARCHETYPES = {
    'birthday': {
      id: 'birthday',
      name: 'Celebratory Birthday Gala',
      icon: '👑',
      tagline: 'Festive Milestones, Crown Badge & Confetti Celebration',
      particleType: 'birthday_sparkles',
      finaleBtnText: '🎂 Make a Birthday Wish & Blow Candles!',
      finaleSuccessText: '✨ Wish Manifested! Happy Birthday! ✨'
    },
    'truce': {
      id: 'truce',
      name: 'Golden Truce Peace Treaty',
      icon: '🕊️',
      tagline: 'Diplomatic Treaty, Sincere Clauses & Reconciliation Seal',
      particleType: 'golden_leaves',
      finaleBtnText: '🕊️ Accept Sincere Truce & Forgive',
      finaleSuccessText: '❤️ Truce Accepted. Thank You For Your Kindness.'
    },
    'romance': {
      id: 'romance',
      name: 'Velvet Romantic Sanctuary',
      icon: '💎',
      tagline: 'Floating Rose Hearts, Love Letters & Forever Lock',
      particleType: 'rose_hearts',
      finaleBtnText: '💖 Seal Our Forever Lock ❤️',
      finaleSuccessText: '🔒 Forever Locked in My Heart.'
    },
    'obsidian': {
      id: 'obsidian',
      name: 'Cyberpunk Obsidian Vault',
      icon: '🌌',
      tagline: 'High-Tech Terminal HUD, AES-256 Protocol & Cipher Keypad',
      particleType: 'cyber_grid',
      finaleBtnText: '⚡ Authenticate Master Key',
      finaleSuccessText: '🔓 ACCESS GRANTED // ARCHIVE DECRYPTED'
    },
    'classic': {
      id: 'classic',
      name: 'Royal Velvet Classical Luxury',
      icon: '✨',
      tagline: 'Museum-Grade Serif Typography, Gold Foil & Star Stardust',
      particleType: 'stardust',
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
    const themeKey = userData.themeName && THEME_PALETTES[userData.themeName] ? userData.themeName : 'royal-velvet';
    const archetypeKey = determineArchetype(userData);

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
    } else {
      // Classic Royal / Obsidian
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
      themeColor: THEME_PALETTES[themeKey]?.primary || "#D4AF6A",
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

    return `You are an elite poetic copywriter and sentiment architect for WishCraft, an ultra-luxury digital keepsake studio.
Your goal is to write a deeply moving, bespoke, multi-chapter cinematic keepsake experience based on user intake.

CRITICAL OCCASION & ARCHETYPE GUARDRAILS:
The user selected occasion: "${occ}".
You MUST choose the most fitting archetype from:
- "birthday": for birthdays, bdays, milestone ages
- "truce": for sincere apologies, reconciliations, clearing the air, forgiveness
- "romance": for anniversaries, love vows, romantic keepsakes, proposals
- "obsidian": for dark luxury, cyberpunk, dramatic tech vaults
- "classic": for family, siblings, graduation, general tributes, wholesome keepsakes

CRITICAL PASSCODE & HINT SECURITY RULE:
- "passcode": a 4-to-6 digit code or year (e.g. "2026")
- "passcodeHint": A clever mystery clue for the recipient to guess the code WITHOUT exposing the code itself! (e.g. "The memorable year we met" or "Your lucky birth date").
- NEVER EVER put the raw passcode inside passcodeHint! It must remain completely confidential between sender and recipient.

You MUST return ONLY a strict, valid JSON object with the following schema:
{
  "archetype": "birthday" | "truce" | "romance" | "obsidian" | "classic",
  "theme": "royal-velvet" | "obsidian-gold" | "midnight-sapphire" | "emerald-noir" | "sunset-peach" | "golden-truce",
  "themeColor": "#HexColor matching occasion",
  "occasion": "${occ}",
  "recipientName": "${recName}",
  "senderName": "Sender name or signature",
  "passcode": "2026",
  "passcodeHint": "Clever mystery clue without revealing the actual code",
  "chapters": [
    {
      "id": "chap_1",
      "type": "cover",
      "navTitle": "01. Arrival",
      "badge": "CHAPTER 01 // ARRIVAL",
      "title": "A grand, high-impact opening headline",
      "subtitle": "An evocative, poetic one-line subtitle",
      "intro": "1-2 stirring sentences welcoming the recipient into this luxury experience",
      "ctaText": "Open Your Keepsake →"
    },
    {
      "id": "chap_2",
      "type": "memories",
      "navTitle": "02. Memories",
      "badge": "CHAPTER 02 // SHARED JOURNEY",
      "title": "Poetic chapter title for memories & milestones",
      "subtitle": "Subtitle celebrating their journey",
      "body": "A rich 2-3 sentence narrative honoring their character, personal achievements, and shared laughs",
      "quote": "A timeless 1-sentence keepsake quote"
    },
    {
      "id": "chap_3",
      "type": "interactive_reveal",
      "navTitle": "03. Secret Chamber",
      "badge": "CHAPTER 03 // RESTRICTED ARCHIVE",
      "title": "The Reserved Chamber",
      "subtitle": "Enter the security passcode to unlock this private archive",
      "secretHeading": "Short salutation greeting",
      "secretMessage": "The heartfelt secret note (2-3 sentences) revealed upon unlocking",
      "passcode": "2026",
      "passcodeHint": "A mystery clue WITHOUT the password itself"
    },
    {
      "id": "chap_4",
      "type": "letter",
      "navTitle": "04. Sovereign Letter",
      "badge": "CHAPTER 04 // FROM THE HEART",
      "title": "A Sovereign Letter From The Heart",
      "subtitle": "Written with reverence and deep sincerity",
      "p1": "Paragraph 1 (celebrating who they are and their unique spirit)",
      "p2": "Paragraph 2 (weaving in personal anecdotes, shared milestones, inside jokes)",
      "p3": "Paragraph 3 (aspirations, hopes for the future, and unwavering support)"
    },
    {
      "id": "chap_5",
      "type": "finale",
      "navTitle": "05. Grand Finale",
      "badge": "CHAPTER 05 // CELEBRATION",
      "title": "Grand high-impact celebration title (e.g. HAPPY BIRTHDAY ${recName.toUpperCase()}!)",
      "subtitle": "May every dream you carry take flight",
      "wishMessage": "A stirring 1-2 sentence blessing and toast to their future",
      "signature": "With all my love and deepest admiration,\\n[Sender]"
    }
  ]
}

Do NOT wrap the output in markdown fences like \`\`\`json. Output ONLY the raw JSON object.`;
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
  "personalMemoriesAndInsideJokes": ${userData.aspirations ? JSON.stringify(userData.aspirations) : 'null'},
  "userPersonalNote": ${userData.userMessage ? JSON.stringify(userData.userMessage) : 'null'},
  "passcode": "${userData.passcode || '2026'}"
}`;
  }

  /**
   * Compiles the multi-page wish JSON into a self-contained, standalone HTML document
   */
  function compileMultiPageWish(wishData, options = {}) {
    const data = wishData || getDefaultWishData();
    const themeKey = data.theme && THEME_PALETTES[data.theme] ? data.theme : 'royal-velvet';
    const theme = THEME_PALETTES[themeKey] || THEME_PALETTES['royal-velvet'];
    const primaryColor = data.themeColor || theme.primary;
    const recName = data.recipientName || "Someone Special";
    const sender = data.senderName || "Forever a Friend";
    const showWatermark = typeof options.showWatermark === 'boolean' ? options.showWatermark : true;
    const userPhotos = Array.isArray(options.photos) && options.photos.length > 0 ? options.photos : [];
    
    // Determine Archetype
    const archetypeKey = (data.archetype && ARCHETYPES[data.archetype]) ? data.archetype : determineArchetype(data);
    const archetype = ARCHETYPES[archetypeKey] || ARCHETYPES['classic'];

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
            <div class="wc-vault-dial-ring">
              <div class="wc-vault-icon" id="wcVaultIcon_${idx}">🔒</div>
            </div>
            <div class="wc-vault-lock-title">Security Passcode Required</div>
            <p class="wc-vault-lock-sub">This private chapter is restricted. Enter the passcode set by ${escapeHtml(sender)} to decrypt.</p>

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
              <button type="button" class="wc-key-btn clear" onclick="wcKeypadClear(${idx})">C</button>
              <button type="button" class="wc-key-btn" onclick="wcKeypadPress(${idx}, '0')">0</button>
              <button type="button" class="wc-key-btn enter" onclick="wcAttemptUnlock(${idx})">⏎</button>
            </div>

            <div class="wc-vault-actions">
              <button type="button" class="wc-btn-primary wc-unlock-cta" onclick="wcAttemptUnlock(${idx})">
                <span>🔓 Decrypt Archive</span>
              </button>
            </div>

            <!-- Hint: Protected from leaking code -->
            <div class="wc-pass-hint-pill" id="wcPassHint_${idx}">
              <span>🔑 Clue:</span> <em>${escapeHtml(displayHint)}</em>
            </div>
            <div class="wc-vault-error-msg" id="wcVaultError_${idx}" style="display:none;"></div>
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
        // Finale (Tailored to Archetype)
        innerContentHtml = `
          <div class="wc-badge ${archetype.id}">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // THE FINALE`)}</div>
          <div class="wc-finale-emojis">${archetype.finaleEmoji}</div>
          <h1 class="wc-hero-title" style="font-size:clamp(1.9rem, 7vw, 2.8rem);">${escapeHtml(ch.title)}</h1>
          <div class="wc-gold-divider"></div>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <p class="wc-body-text" style="font-size:1.05rem; margin-top:16px;">${escapeHtml(ch.wishMessage)}</p>
          
          <!-- Archetype Interactive Finale Button -->
          <div style="margin: 22px auto 10px;">
            <button type="button" class="wc-btn-primary wc-finale-action-btn" id="wcFinaleActionBtn" onclick="wcTriggerFinaleAction('${archetype.id}')">
              <span>${escapeHtml(archetype.finaleBtnText)}</span>
            </button>
          </div>

          <div class="wc-signature-block">
            <div class="wc-sig-line"></div>
            <div class="wc-sig-text">${escapeHtml(ch.signature || `With all my heart,\n${sender}`).replace(/\\n|\n/g, '<br>')}</div>
          </div>

          <div class="wc-action-row" style="margin-top:28px;">
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
      display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
      padding: 16px 12px 70px;
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
      border-radius: 24px;
      padding: clamp(24px, 5vw, 42px) clamp(18px, 4vw, 32px);
      box-shadow: 0 25px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.1);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    /* Archetype specific flair */
    .wc-glass-card.birthday {
      border-color: rgba(255, 215, 0, 0.35);
      box-shadow: 0 25px 70px rgba(0,0,0,0.85), 0 0 40px rgba(255, 215, 0, 0.1);
    }
    .wc-glass-card.truce {
      border-color: rgba(230, 194, 128, 0.4);
      background: radial-gradient(circle at 50% 0%, rgba(230, 194, 128, 0.08) 0%, var(--card-bg) 70%);
    }
    .wc-glass-card.romance {
      border-color: rgba(255, 158, 157, 0.35);
      background: radial-gradient(circle at 50% 0%, rgba(255, 158, 157, 0.08) 0%, var(--card-bg) 70%);
    }
    .wc-glass-card.obsidian {
      border-color: rgba(0, 245, 212, 0.35);
      box-shadow: 0 25px 70px rgba(0,0,0,0.9), inset 0 0 30px rgba(0, 245, 212, 0.04);
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
      width: 100%; max-width: 420px; margin: 12px auto;
      background: rgba(0, 0, 0, 0.45); border: 1px solid var(--border);
      border-radius: 20px; padding: 22px 18px;
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(212,175,106,0.05);
      transition: all 0.3s ease;
    }
    .wc-vault-dial-ring {
      width: 68px; height: 68px; border-radius: 50%;
      border: 2px dashed var(--primary);
      display: flex; align-items: center; justify-content: center;
      animation: wcRotateDial 25s linear infinite;
    }
    @keyframes wcRotateDial {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .wc-vault-icon {
      font-size: 26px; animation: wcCounterRotate 25s linear infinite;
    }
    @keyframes wcCounterRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-360deg); }
    }
    .wc-vault-lock-title {
      font-family: var(--font-serif); font-size: 1.15rem; color: #fff; font-weight: 600;
    }
    .wc-vault-lock-sub {
      font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.45; text-align: center; max-width: 320px;
    }
    .wc-pin-input-container {
      display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; width: 100%;
    }
    .wc-pin-dots {
      display: flex; gap: 12px; padding: 10px 18px;
      background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px;
    }
    .wc-pin-dot {
      width: 14px; height: 14px; border-radius: 50%;
      border: 1.5px solid var(--border); background: transparent;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .wc-pin-dot.filled {
      background: var(--primary); border-color: var(--primary);
      box-shadow: 0 0 10px var(--primary); transform: scale(1.1);
    }
    .wc-pin-hidden-input {
      position: absolute; opacity: 0; width: 100%; height: 100%; top: 0; left: 0; cursor: pointer;
    }
    .wc-keypad-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
      width: 100%; max-width: 250px; margin-top: 4px;
    }
    .wc-key-btn {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff; font-family: 'Space Grotesk', var(--font-sans);
      font-size: 16px; font-weight: 600; height: 44px; border-radius: 10px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s ease; user-select: none;
    }
    .wc-key-btn:hover {
      background: rgba(255, 255, 255, 0.12); border-color: var(--primary); transform: translateY(-1px);
    }
    .wc-key-btn:active {
      transform: scale(0.95); background: var(--primary); color: #000;
    }
    .wc-key-btn.clear { color: #ff7675; font-size: 13px; }
    .wc-key-btn.enter { color: var(--primary); font-size: 15px; }
    .wc-unlock-cta {
      margin-top: 6px; padding: 10px 24px; font-size: 12.5px;
    }
    .wc-vault-error-msg {
      font-size: 11.5px; color: #ff6b6b; font-weight: 500;
      background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.3);
      padding: 5px 12px; border-radius: 6px; animation: wcShake 0.4s ease;
    }
    @keyframes wcShake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    .wc-pass-hint-pill {
      font-size: 11px; font-family: var(--font-sans); color: var(--secondary);
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 8px; padding: 6px 12px; max-width: 340px; text-align: center;
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
      background: rgba(11, 12, 16, 0.92); backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px); border: 1px solid var(--border);
      border-radius: 999px; padding: 5px 12px; box-shadow: 0 10px 35px rgba(0,0,0,0.8);
    }
    .wc-pill-indicator {
      border: none; background: transparent; color: rgba(255,255,255,0.5);
      font-family: monospace; font-size: 11px; padding: 4px 10px; border-radius: 999px;
      cursor: pointer; transition: all 0.2s;
    }
    .wc-pill-indicator:hover { color: #fff; }
    .wc-pill-indicator.active {
      background: var(--primary); color: #000; font-weight: 700;
      box-shadow: 0 0 12px var(--primary);
    }
    /* Watermark */
    .wc-wm-badge {
      position: fixed; bottom: 12px; right: 14px; z-index: 9999;
      display: inline-flex; align-items: center; gap: 5px;
      background: rgba(8, 10, 14, 0.85); backdrop-filter: blur(10px);
      border: 1px solid var(--border); border-radius: 999px;
      padding: 4px 10px; font-size: 10px; color: rgba(255,255,255,0.7);
      text-decoration: none; font-family: sans-serif;
    }
    .wc-wm-badge:hover { color: #fff; border-color: var(--primary); }
    @media (max-width: 600px) {
      .wc-glass-card { padding: 24px 18px; border-radius: 20px; }
      .wc-bottom-chapter-bar { bottom: 8px; padding: 4px 8px; }
      .wc-pill-indicator { padding: 4px 7px; font-size: 10px; }
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

    // Interactive Archetype Finale Button Action
    window.wcTriggerFinaleAction = function(archetypeId) {
      const btn = document.getElementById('wcFinaleActionBtn');
      launchConfetti();
      playTone(550, 0.1);
      setTimeout(() => playTone(880, 0.2), 120);
      
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.9';
        btn.style.transform = 'scale(1.03)';
        if (archetypeId === 'truce') {
          btn.innerHTML = '<span>❤️ Truce Accepted. Forever Grateful. ❤️</span>';
        } else if (archetypeId === 'romance') {
          btn.innerHTML = '<span>🔒 Sealed For Eternity In My Heart ❤️</span>';
        } else if (archetypeId === 'birthday') {
          btn.innerHTML = '<span>🎂 Wish Manifested! Happy Birthday! ✨</span>';
        } else {
          btn.innerHTML = '<span>🌟 Celebrated & Honored Forever 🌟</span>';
        }
      }
    };

    // Stardust background particles
    (function initParticles() {
      const cvs = document.getElementById('wcBgParticles');
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      let w = cvs.width = window.innerWidth;
      let h = cvs.height = window.innerHeight;
      window.addEventListener('resize', () => { w = cvs.width = window.innerWidth; h = cvs.height = window.innerHeight; });

      const count = 45;
      const pts = Array.from({length: count}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.7 + 0.2
      }));

      function loop() {
        ctx.clearRect(0, 0, w, h);
        pts.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212,175,106,' + p.alpha + ')';
          ctx.fill();
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

})(typeof window !== 'undefined' ? window : this);
