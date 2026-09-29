/**
 * WishCraft Dynamic Multi-Page AI Engine
 * Standalone compilation & structured AI generation for multi-chapter cinematic keepsakes.
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

  // Preset Theme Palettes for AI Generation
  const THEME_PALETTES = {
    'royal-velvet': {
      bg: '#0B0914',
      cardBg: 'rgba(18, 14, 28, 0.78)',
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
      cardBg: 'rgba(14, 14, 18, 0.82)',
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
      cardBg: 'rgba(7, 18, 38, 0.82)',
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
      cardBg: 'rgba(5, 26, 18, 0.82)',
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
      cardBg: 'rgba(32, 14, 28, 0.82)',
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
      cardBg: 'rgba(20, 18, 14, 0.82)',
      primary: '#E6C280',
      secondary: '#FAF6EE',
      accent: '#A68A56',
      border: 'rgba(230, 194, 128, 0.32)',
      glow: 'rgba(230, 194, 128, 0.16)',
      fontSerif: "'Cinzel', Georgia, serif",
      fontSans: "'Space Grotesk', sans-serif"
    }
  };

  /**
   * Generates default / fallback 5-chapter wish data when API is unavailable
   */
  function getDefaultWishData(userData = {}) {
    const recName = userData.recipientName || "Someone Truly Special";
    const sender = userData.senderName || "Forever a Friend";
    const occ = userData.occasion || "Birthday Celebration";
    const rel = userData.relationship || "friend";
    const tone = userData.tone || "heartfelt";
    const pass = userData.passcode || "2026";
    const hint = userData.passcodeHint || "The year of magic";
    const themeKey = userData.themeName && THEME_PALETTES[userData.themeName] ? userData.themeName : 'royal-velvet';

    const isBirthday = occ.toLowerCase().includes('birthday');
    const isApology = occ.toLowerCase().includes('apology') || occ.toLowerCase().includes('truce');
    const isRomantic = occ.toLowerCase().includes('anniversary') || occ.toLowerCase().includes('romance') || occ.toLowerCase().includes('love');

    let chapters = [];

    if (isApology) {
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Sincere Truce",
          badge: "CHAPTER 01 // CAN WE TALK?",
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
          badge: "CHAPTER 03 // MY SINCERE TRUTH",
          title: "The Unfiltered Confession",
          subtitle: "Wipe the frosted glass to reveal my promise",
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
    } else if (isRomantic) {
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
          navTitle: "03. Private Vault",
          badge: "CHAPTER 03 // RESTRICTED ACCESS",
          title: "The Reserved Chamber",
          subtitle: "Wipe frosted glass or enter cipher to decrypt",
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
    } else {
      // Celebratory / Birthday / General Keepsake
      chapters = [
        {
          id: "chap_1",
          type: "cover",
          navTitle: "01. Arrival",
          badge: "CHAPTER 01 // ARRIVAL",
          title: `Celebrating ${recName}`,
          subtitle: "An interactive, multi-chapter digital keepsake.",
          intro: `Some souls bring a light into the world so brilliant that ordinary celebrations could never suffice. Today demands an entire experience.`,
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
          badge: "CHAPTER 03 // PRIVATE ARCHIVE",
          title: "The Reserved Chamber",
          subtitle: "Wipe frosted glass or enter cipher to decrypt",
          secretHeading: `Hey ${recName},`,
          secretMessage: "Never doubt the quiet power of your warmth and intellect. You have an extraordinary way of making everyone around you feel valued, inspired, and deeply at home.",
          passcode: pass,
          passcodeHint: hint
        },
        {
          id: "chap_4",
          type: "letter",
          navTitle: "04. Tribute Letter",
          badge: "CHAPTER 04 // SOVEREIGN SCROLL",
          title: "A Heartfelt Letter From The Heart",
          subtitle: "Crafted with immense admiration and care",
          p1: "I wanted to create something truly magical and permanent for you today. A simple text could never capture how much your presence means to everyone around you.",
          p2: "Your laughter brings warmth to the coldest days, and your perseverance in moments of uncertainty is a steady anchor. You navigate life with rare authenticity and grace.",
          p3: "May the year ahead open doors to your wildest dreams, shower you with breathtaking adventures, and remind you every single day how profoundly treasured you are."
        },
        {
          id: "chap_5",
          type: "finale",
          navTitle: "05. Grand Finale",
          badge: "CHAPTER 05 // CELEBRATION",
          title: isBirthday ? `HAPPY BIRTHDAY ${recName.toUpperCase()}!` : `CELEBRATING ${recName.toUpperCase()}!`,
          subtitle: "May every aspiration you carry take flight.",
          wishMessage: "Here is to another orbit of radiant victories, boundless laughter, and unforgettable joy.",
          signature: `With endless admiration & love,\n${sender}`
        }
      ];
    }

    return {
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

CRITICAL OCCASION GUARDRAILS:
The user selected occasion: "${occ}".
You MUST strictly write copy honoring this exact occasion.
If the occasion is "Birthday", write exclusively a celebratory birthday tribute for ${recName}.
If the occasion is "Sincere Apology & Truce", write deeply vulnerable, humble reconciliation copy with zero defenses.
If the occasion is "Anniversary" or "Romantic", write deeply romantic, devoted vows and memories.
If the occasion is "Sister & Family", honor kinship, shared childhood roots, and unbreakable bonds.
NEVER confuse friendship or family with romantic love unless the occasion explicitly dictates it.

You MUST return ONLY a strict, valid JSON object with the following schema:
{
  "theme": "royal-velvet" | "obsidian-gold" | "midnight-sapphire" | "emerald-noir" | "sunset-peach" | "golden-truce",
  "themeColor": "#HexColor matching occasion",
  "occasion": "${occ}",
  "recipientName": "${recName}",
  "senderName": "Sender name or signature",
  "passcode": "4-to-6 digit secret code or memorable year (e.g. 2026)",
  "passcodeHint": "Short hint showing the key on screen (e.g. Key: 2026)",
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
      "subtitle": "Wipe frosted glass or enter cipher to reveal",
      "secretHeading": "Short salutation greeting",
      "secretMessage": "The heartfelt secret note (2-3 sentences) revealed upon unlocking",
      "passcode": "2026",
      "passcodeHint": "Short passcode hint with code visible"
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
      const prevIdx = idx - 1;
      const nextIdx = idx + 1;

      let innerContentHtml = '';

      if (ch.type === 'cover') {
        innerContentHtml = `
          <div class="wc-badge">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // ARRIVAL`)}</div>
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
          <div class="wc-badge">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // MEMORIES`)}</div>
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
              <div class="wc-photo-card" style="transform: rotate(${pIdx === 0 ? '-2deg' : pIdx === 1 ? '1deg' : '-1deg'});">
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
        const pass = ch.passcode || data.passcode || '2026';
        const hint = ch.passcodeHint || data.passcodeHint || `Key: ${pass}`;
        innerContentHtml = `
          <div class="wc-badge">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // CONFIDENTIAL`)}</div>
          <h2 class="wc-chapter-title">${escapeHtml(ch.title)}</h2>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <div class="wc-gold-divider"></div>
          
          <div class="wc-scratch-container" id="wcScratchContainer_${idx}">
            <!-- Scratch Canvas Area -->
            <div class="wc-scratch-card-wrap">
              <div class="wc-secret-underneath" id="wcSecretNote_${idx}">
                <div class="wc-secret-salutation">${escapeHtml(ch.secretHeading || `For ${recName}`)}</div>
                <p class="wc-secret-text">${escapeHtml(ch.secretMessage)}</p>
                <div style="font-size:11px; color:var(--primary); margin-top:10px; font-family:var(--font-sans); letter-spacing:1px;">✦ DECRYPTED WITH LOVE ✦</div>
              </div>
              <canvas class="wc-scratch-canvas" id="wcScratchCanvas_${idx}" width="380" height="200"></canvas>
            </div>
            
            <div class="wc-scratch-hint-bar">
              <span>🔒 Tap or wipe to reveal secret note</span>
              <button type="button" class="wc-reveal-btn" onclick="wcForceRevealScratch(${idx})">Wipe All ✦</button>
            </div>
            <div class="wc-pass-hint-pill">🔑 Hint: ${escapeHtml(hint.includes(pass) ? hint : `${hint} — Key: ${pass}`)}</div>
          </div>

          <div class="wc-nav-btns" style="margin-top:24px;">
            <button type="button" class="wc-btn-ghost" onclick="wcPrevChapter()">← Previous</button>
            <button type="button" class="wc-btn-primary" onclick="wcNextChapter()">Continue →</button>
          </div>
        `;
      } else if (ch.type === 'letter') {
        innerContentHtml = `
          <div class="wc-badge">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // THE LETTER`)}</div>
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
        // Finale
        innerContentHtml = `
          <div class="wc-badge">${escapeHtml(ch.badge || `CHAPTER 0${idx+1} // THE FINALE`)}</div>
          <div class="wc-finale-emojis">👑 ✨ 🥂 🎉</div>
          <h1 class="wc-hero-title" style="font-size:clamp(1.9rem, 7vw, 2.8rem);">${escapeHtml(ch.title)}</h1>
          <div class="wc-gold-divider"></div>
          <p class="wc-subtitle">${escapeHtml(ch.subtitle)}</p>
          <p class="wc-body-text" style="font-size:1.05rem; margin-top:16px;">${escapeHtml(ch.wishMessage)}</p>
          
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
          <div class="wc-glass-card">
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
    .wc-scratch-container {
      margin: 18px 0 10px; display: flex; flex-direction: column; align-items: center;
    }
    .wc-scratch-card-wrap {
      position: relative; width: min(380px, 90vw); height: 180px;
      border-radius: 14px; overflow: hidden; border: 1px solid var(--border);
      background: #000; box-shadow: 0 12px 30px rgba(0,0,0,0.8);
    }
    .wc-secret-underneath {
      position: absolute; inset: 0; padding: 18px 20px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: radial-gradient(circle at center, rgba(212,175,106,0.12) 0%, #0c0d12 85%);
      text-align: center;
    }
    .wc-secret-salutation {
      font-family: var(--font-serif); font-size: 15px; font-weight: 600; color: var(--primary);
      margin-bottom: 6px;
    }
    .wc-secret-text {
      font-size: 13px; line-height: 1.55; color: #fff;
    }
    .wc-scratch-canvas {
      position: absolute; inset: 0; width: 100%; height: 100%; cursor: pointer;
      touch-action: none;
    }
    .wc-scratch-hint-bar {
      display: flex; justify-content: space-between; align-items: center; width: min(380px, 90vw);
      font-size: 11px; color: rgba(255,255,255,0.6); margin-top: 8px;
    }
    .wc-reveal-btn {
      background: none; border: 1px dashed var(--border); border-radius: 6px; color: var(--primary);
      padding: 3px 8px; font-size: 10.5px; cursor: pointer; transition: 0.2s;
    }
    .wc-reveal-btn:hover { background: rgba(212,175,106,0.15); color: #fff; }
    .wc-pass-hint-pill {
      margin-top: 10px; font-size: 11px; font-family: monospace; color: var(--primary);
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      border-radius: 6px; padding: 4px 10px;
    }
    .wc-letter-scroll {
      text-align: left; margin: 16px 0; max-height: 260px; overflow-y: auto;
      padding-right: 8px;
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

    function playTone(freq = 440, duration = 0.08) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
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

    // Interactive Scratch Card Canvas Initializer
    document.querySelectorAll('.wc-scratch-canvas').forEach(canvas => {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      // Draw frosted glass veil
      ctx.fillStyle = '#1c1d24';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(212,175,106,0.25)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(212,175,106,0.8)';
      ctx.font = "13px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText("✦ WIPE TO REVEAL CONFIDENTIAL NOTE ✦", w / 2, h / 2 + 5);

      let isDrawing = false;
      function scratch(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * (w / rect.width);
        const y = (clientY - rect.top) * (h / rect.height);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();
      }

      canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
      window.addEventListener('mouseup', () => { isDrawing = false; });
      canvas.addEventListener('mousemove', (e) => { if (isDrawing) scratch(e); });
      canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive:true});
      window.addEventListener('touchend', () => { isDrawing = false; });
      canvas.addEventListener('touchmove', (e) => { if (isDrawing) scratch(e); }, {passive:true});
    });

    window.wcForceRevealScratch = function(idx) {
      const canvas = document.getElementById('wcScratchCanvas_' + idx);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        playTone(580, 0.15);
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

      const colors = ['#D4AF6A', '#F3E5AB', '#FFFFFF', '#E056FD', '#FF9E9D'];
      const conf = Array.from({length: 80}, () => ({
        x: w / 2,
        y: h / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1
      }));

      playTone(520, 0.2);

      let start = performance.now();
      function renderConf(now) {
        ctx.clearRect(0, 0, w, h);
        let alive = false;
        conf.forEach(c => {
          c.x += c.vx;
          c.y += c.vy;
          c.vy += 0.35; // gravity
          c.rotation += c.vr;
          c.alpha = Math.max(0, 1 - (now - start) / 2500);
          if (c.alpha > 0) alive = true;

          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rotation * Math.PI / 180);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = c.alpha;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
          ctx.restore();
        });

        if (alive) requestAnimationFrame(renderConf);
        else ctx.clearRect(0, 0, w, h);
      }
      requestAnimationFrame(renderConf);
    }
  </script>
</body>
</html>`;
  }

  // Export public API
  const WishCraftAiEngine = Object.freeze({
    escapeHtml,
    THEME_PALETTES,
    getDefaultWishData,
    getSystemPrompt,
    buildIntakeMessage,
    compileMultiPageWish
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WishCraftAiEngine;
  }
  if (typeof window !== 'undefined') {
    window.WishCraftAiEngine = WishCraftAiEngine;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.WishCraftAiEngine = WishCraftAiEngine;
  }

})(typeof window !== 'undefined' ? window : globalThis);
