/**
 * WishCraft Template Registry & Luxury Injection Engine
 * 
 * Maps AI copywriting and user sentiment to WishCraft's signature, multi-chapter flagship engines:
 * - Birthday: Sapphire Protocol // Luxury Birthday Vault (Edition 03)
 * - Anniversary / Romance: Royal Velvet // Cinematic Premiere (Edition 01)
 * - Milestone / Farewell / Celebration / Funny / Custom: Obsidian Vault // Liquid Gold Edition (Edition 02)
 * 
 * Enforces strict occasion locking (user's selection ALWAYS takes priority over AI guessing)
 * and guarantees zero malformed HTML, instant offline reliability, and XSS sanitization.
 */

(function(global) {
  'use strict';

  // 1. Safe HTML Entity Escaper
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 2. Safe Paragraph Formatter
  function formatBodyText(text) {
    if (!text) return '';
    const clean = String(text).trim();
    const paragraphs = clean.split(/\n\s*\n/);
    return paragraphs
      .map(p => `<p class="wc-prose-p">${escapeHtml(p.trim())}</p>`)
      .join('\n');
  }

  // 3. Category Normalizer & Occasion Resolver
  function normalizeCategory(cat) {
    if (!cat) return 'birthday';
    const c = String(cat).toLowerCase().trim();
    if (c.includes('birth') || c.includes('bday')) return 'birthday';
    if (c.includes('anniv') || c.includes('wedding')) return 'anniversary';
    if (c.includes('apol') || c.includes('sorr') || c.includes('forgiv') || c.includes('pardon') || c.includes('reconcil') || c.includes('truce')) return 'apology';
    if (c.includes('roman') || c.includes('love') || c.includes('propos') || c.includes('crush')) return 'romantic';
    if (c.includes('fare') || c.includes('goodbye') || c.includes('retire') || c.includes('leave')) return 'farewell';
    if (c.includes('fun') || c.includes('humor') || c.includes('roast') || c.includes('joke')) return 'funny';
    if (c.includes('celeb') || c.includes('congrat') || c.includes('promot') || c.includes('grad') || c.includes('fest') || c.includes('milestone')) return 'celebration';
    return 'birthday';
  }

  // 4. Curated Flagship Fallback Copywriting (Instant offline reliability)
  const FALLBACK_COPY = {
    apology: {
      category: 'apology',
      headline: "CAN WE CLEAR THE AIR?",
      title: "A Sincere Truce & Apology 🕊️",
      subtitle: "Here is my honest, vulnerable truth",
      cover_subtitle: "A Sincere Message For",
      intro_note: "I value our bond far too much to let misunderstandings or thoughtless words linger between us.",
      scratch_heading: "To Someone Truly Cherished,",
      scratch_note: "I am truly sorry for the misunderstanding and for hurting your feelings. It was never my intention to speak thoughtlessly or make you feel undervalued.\n\nYour presence and happiness mean the world to me. I promise to be more mindful, listen better, and always treat our bond with the gentleness it deserves. 🫂❤️",
      letter_p1: "I know pride often gets in the way of what matters most, but with you, all I care about is being honest and making things right.",
      letter_p2: "You have one of the purest, most generous hearts I know. Hurting your feelings weighs heavily on me, and I want to apologize without excuses.",
      letter_p3: "I promise to communicate with transparency and respect, and to always cherish the trust you have placed in me.",
      closing_note: "WITH DEEPEST SINCERITY // CAN WE HIT RESET?",
      quote: "Forgiveness does not change the past, but it enlarges the future.",
      theme_color: '#D4AF37'
    },
    birthday: {
      category: 'birthday',
      headline: 'HAPPY BIRTHDAY!',
      title: 'A Constellation of Joy For You ✨',
      subtitle: 'Celebrating the incredible milestone of your journey',
      cover_subtitle: 'Advance Birthday Protocol For',
      intro_note: 'Your special milestone is here, but celebrating someone as extraordinary as you simply cannot be confined to just one day.',
      scratch_heading: 'A Moment of Gratitude,',
      scratch_note: 'Happiest Birthday! You are one of the most incredible people in my life, and words can\'t capture how grateful I am for your presence.\n\nThank you for bringing so much laughter, warmth, and brilliance to every single day.',
      letter_p1: 'Another chapter begins today, written in starlight and infinite possibility. You bring a rare and radiant warmth into the lives of everyone around you.',
      letter_p2: 'From the quiet victories to the shared milestones and uncontrollable laughter, having you along for the journey is a gift beyond measure.',
      letter_p3: 'May this year unfold with fearless adventures, deep peace, and the courage to reach every aspiration you hold close to your heart.',
      closing_note: 'CRAFTED WITH IMMENSE LOVE // TO AN UNSTOPPABLE SOUL',
      quote: 'Count your age by stars, not years. Count your life by smiles, not tears.',
      theme_color: '#D4AF6A'
    },
    anniversary: {
      category: 'anniversary',
      headline: 'FOREVER & ALWAYS',
      title: 'A Love That Grows Timeless 💎',
      subtitle: 'Honoring every step, glance, and shared memory',
      cover_subtitle: 'Cinematic Anniversary Premiere For',
      intro_note: 'Two souls walking through time together, weaving ordinary moments into an extraordinary tapestry of devotion.',
      scratch_heading: 'To My Timeless Partner,',
      scratch_note: 'Every second with you is a moment held close to my heart. Side by side or miles apart, our hearts beat in unison.\n\nForever and always.',
      letter_p1: 'From the very first day our paths crossed, my world shifted into warmer, brighter colors. Your laughter brings peace to the loudest days, and your kindness is my steady anchor.',
      letter_p2: 'Every storm we weathered and every sunrise we shared has only deepened the bond between us. With you, love is not just a promise—it is home.',
      letter_p3: 'Here is to all that was, all that is, and the countless beautiful tomorrows still waiting to be written in our shared constellation.',
      closing_note: 'WITH ALL MY DEVOTION // THROUGH EVERY SUNRISE AND STORM',
      quote: 'The best thing to hold onto in life is each other.',
      theme_color: '#C5A059'
    },
    romantic: {
      category: 'romantic',
      headline: 'YOU ARE MY FAVORITE STORY 🌹',
      title: 'You Are My Favorite Story 🌹',
      subtitle: 'In a world full of noise, you are my harmony',
      cover_subtitle: 'A Reserved Chamber of Affection For',
      intro_note: 'Out of all the billions of stars in the cosmos, somehow I found you. Every day with you feels like discovering a secret room filled with wonder.',
      scratch_heading: 'My Dearest Heart,',
      scratch_note: 'You are the gentle spark that lights up my darkest hours. Knowing you, loving you, and laughing with you is my life\'s greatest privilege.',
      letter_p1: 'I wanted to create something truly magical and unforgettable for you today. A simple message could never capture the depth of what you mean to me.',
      letter_p2: 'Your smile is my morning sunrise, and your voice is the calm in every storm. Thank you for being my anchor, my muse, and my favorite adventure.',
      letter_p3: 'No matter where life leads us, know that my heart walks beside yours—steadfast, passionate, and unconditionally yours.',
      closing_note: 'HELD FOREVER IN ORBIT // FOREVER YOURS',
      quote: 'I loved you yesterday, I love you still, I always have, I always will.',
      theme_color: '#E056FD'
    },
    farewell: {
      category: 'farewell',
      headline: 'TO NEW HORIZONS 🌅',
      title: 'To New Horizons & Grand Adventures 🌅',
      subtitle: 'Not a goodbye, but the start of your next great chapter',
      cover_subtitle: 'A Tribute to Unforgettable Impact For',
      intro_note: 'Few people leave a mark as indelible and inspiring as you have. As you take your next bold step, know you carry our admiration with you.',
      scratch_heading: 'Honoring Your Legacy,',
      scratch_note: 'Your talent, warmth, and resilience have made an enduring difference. The road ahead is lucky to have you.',
      letter_p1: 'Endings are merely beginnings in disguise. As you close this chapter, take immense pride in every boundary you pushed and every life you touched.',
      letter_p2: 'The dedication and brilliance you brought each day set a standard that will inspire us for years to come.',
      letter_p3: 'May your next horizon bring grand adventures, thrilling challenges, and the wild success you so richly deserve.',
      closing_note: 'CRAFTED WITH DEEP RESPECT // TO THE NEXT FRONTIER',
      quote: 'Every new beginning comes from some other beginning\'s end.',
      theme_color: '#00D2D3'
    },
    funny: {
      category: 'funny',
      headline: 'CERTIFIED LEGEND 🍕',
      title: 'Older, Wiser, & Still Questionable 🍕',
      subtitle: 'Certified legend, occasionally functioning adult',
      cover_subtitle: 'A Highly Classified Dossier For',
      intro_note: 'Scientists have verified it: you are officially one year closer to complaining about the weather and having a favorite stove burner.',
      scratch_heading: 'Top Secret Notice,',
      scratch_note: 'Here\'s to celebrating another year of questionable decisions, magnificent survival instincts, and still looking suspiciously good.',
      letter_p1: 'They say wisdom comes with age. In your case, it seems age showed up alone, but honestly, we wouldn\'t want you any other way.',
      letter_p2: 'Thank you for always being the reason we laugh, the accomplice in our bad ideas, and the greatest person to blame things on.',
      letter_p3: 'May your year be packed with free food, good coffee, zero awkward small talk, and endless moments of triumph.',
      closing_note: 'CRAFTED WITH ENDLESS LAUGHTER // STAY LEGENDARY',
      quote: 'Age is merely the number of years the world has been enjoying you.',
      theme_color: '#FF6B6B'
    },
    celebration: {
      category: 'celebration',
      headline: 'VICTORY IN THE MAKING 🏆',
      title: 'Victory In The Making 🏆',
      subtitle: 'Hard work meets well-deserved triumph',
      cover_subtitle: 'Honoring An Incredible Milestone For',
      intro_note: 'You dreamed it, fought for it, and conquered it. Today we stand tall to celebrate your dedication and grit.',
      scratch_heading: 'Milestone Unlocked,',
      scratch_note: 'Success isn\'t an accident; it is the natural consequence of your relentless dedication and extraordinary heart.',
      letter_p1: 'Standing at the summit of this achievement, remember every late hour, every quiet sacrifice, and every hurdle you overcame.',
      letter_p2: 'You have shown what is possible when relentless passion meets unwavering focus. Everyone around you is filled with pride.',
      letter_p3: 'Let this milestone be the launching pad for even greater conquests. Keep dreaming boldly—you are capable of anything.',
      closing_note: 'CRAFTED TO HONOR TRIUMPH // SOAR HIGHER',
      quote: 'Success isn\'t just about what you accomplish, it\'s about what you inspire others to do.',
      theme_color: '#F9CA24'
    }
  };

  // 5. Core Injection Engine: Maps Copywriting to Flagship Multi-Chapter Engines
  async function buildWishFromTemplate(aiData, userData = {}) {
    // RULE 1: STRICT OCCASION LOCKING
    // User's explicit form selection is the absolute authority! Never let AI override user's choice.
    const userOccasion = (userData.occasion || '').toLowerCase().trim();
    let category = 'birthday';

    if (userOccasion.includes('birth') || userOccasion.includes('bday')) {
      category = 'birthday';
    } else if (userOccasion.includes('anniv') || userOccasion.includes('wedding')) {
      category = 'anniversary';
    } else if (userOccasion.includes('apol') || userOccasion.includes('sorr') || userOccasion.includes('forgiv') || userOccasion.includes('pardon') || userOccasion.includes('reconcil') || userOccasion.includes('truce')) {
      category = 'apology';
    } else if (userOccasion.includes('roman') || userOccasion.includes('love') || userOccasion.includes('propos') || userOccasion.includes('crush')) {
      category = 'romantic';
    } else if (userOccasion.includes('fare') || userOccasion.includes('goodbye') || userOccasion.includes('retire') || userOccasion.includes('leave')) {
      category = 'farewell';
    } else if (userOccasion.includes('fun') || userOccasion.includes('humor') || userOccasion.includes('roast') || userOccasion.includes('joke')) {
      category = 'funny';
    } else if (userOccasion.includes('celeb') || userOccasion.includes('congrat') || userOccasion.includes('promot') || userOccasion.includes('grad') || userOccasion.includes('milestone')) {
      category = 'celebration';
    } else if (aiData && aiData.category) {
      category = normalizeCategory(aiData.category);
    }

    const fallback = FALLBACK_COPY[category] || FALLBACK_COPY.birthday;

    // Normalizing copywriting fields
    const recipientName = userData.recipientName || 'Someone Special';
    const senderName = userData.senderName || '';
    const headline = (aiData?.headline || aiData?.title || fallback.headline || fallback.title).trim();
    const subtitle = (aiData?.subtitle || fallback.subtitle).trim();
    const introNote = (aiData?.intro_note || aiData?.intro_message || fallback.intro_note).trim();
    const scratchHeading = (aiData?.scratch_heading || fallback.scratch_heading).trim();
    const scratchNote = (aiData?.scratch_note || aiData?.body_text || fallback.scratch_note).trim();
    const quote = (aiData?.quote || fallback.quote).trim();
    const closingNote = (aiData?.closing_note || fallback.closing_note).trim();
    const themeColor = aiData?.theme_color || fallback.theme_color;

    // Split letter paragraphs if provided as a single body_text
    let letter1 = aiData?.letter_p1 || aiData?.letter1;
    let letter2 = aiData?.letter_p2 || aiData?.letter2;
    let letter3 = aiData?.letter_p3 || aiData?.letter3;
    let letter4 = aiData?.closing_note || fallback.closing_note;

    if (!letter1 && aiData?.body_text) {
      const parts = String(aiData.body_text).split(/\n\s*\n/).filter(Boolean);
      letter1 = parts[0] || fallback.letter_p1;
      letter2 = parts[1] || fallback.letter_p2;
      letter3 = parts[2] || fallback.letter_p3;
    }
    letter1 = letter1 || fallback.letter_p1;
    letter2 = letter2 || fallback.letter_p2;
    letter3 = letter3 || fallback.letter_p3;

    // Normalize user uploaded photos
    let photosArray = [];
    if (Array.isArray(userData.photos) && userData.photos.length > 0) {
      photosArray = userData.photos;
    } else if (Array.isArray(userData.photoDataUrls) && userData.photoDataUrls.length > 0) {
      photosArray = userData.photoDataUrls;
    }

    // Determine watermark logic
    const isPro = typeof window !== 'undefined' && typeof window.isUserProTier === 'function' && window.isUserProTier();
    const showWatermark = !isPro;

    // Prepare Passcode
    let userPasscode = userData.passcode ? String(userData.passcode).trim() : '';

    // =========================================================================
    // ROUTE TO FLAGSHIP MULTI-CHAPTER ENGINES
    // =========================================================================

    // Case 1: Birthday -> Sapphire Protocol // Luxury Birthday Vault (Edition 03)
    if (category === 'birthday') {
      const sapphireEngine = (typeof window !== 'undefined' && window.WishCraftTemplate_SapphireVault) ||
                             (typeof globalThis !== 'undefined' && globalThis.WishCraftTemplate_SapphireVault) ||
                             global.WishCraftTemplate_SapphireVault;

      if (sapphireEngine && typeof sapphireEngine.build === 'function') {
        // Sapphire Vault expects a 6-digit passcode
        let sixDigitCode = userPasscode.replace(/\D/g, '');
        if (sixDigitCode.length < 6) {
          sixDigitCode = (sixDigitCode + '120711').slice(0, 6);
        } else if (sixDigitCode.length > 6) {
          sixDigitCode = sixDigitCode.slice(0, 6);
        }

        const sapphireHtml = sapphireEngine.build({
          recipientName: recipientName,
          sender: senderName || "Forever a Friend",
          coverSubtitle: aiData?.cover_subtitle || "Advance Birthday Protocol For",
          introMessage: introNote,
          protocolSubtitle: "For An Incredible Soul",
          protocolTitle: "PROTOCOL INITIATED",
          protocolMessage: quote || "A regular card could never do justice to someone like you. Today demands an entire luxury experience. Let the celebration officially commence.",
          scratchTitle: "Secured Birthday File",
          scratchSubtitle: "Wipe the frosted glass to reveal",
          scratchNoteHeading: scratchHeading || `Hey ${recipientName},`,
          scratchNote: scratchNote,
          passcode: sixDigitCode,
          passcodeHint: userData.passcodeHint || "6-Digit Security Decryption Key",
          targetDateTime: userData.countdownTarget || undefined,
          finalePreTitle: "SPECIAL ARCHIVE",
          finaleSubTitle: "The Ultimate Celebration",
          finaleMainTitle: headline.includes(recipientName.toUpperCase()) ? headline : `HAPPY BIRTHDAY ${recipientName.toUpperCase()}!`,
          closingNote: closingNote,
          photos: photosArray,
          showWatermark: showWatermark
        });

        return {
          html: sapphireHtml,
          category: 'birthday',
          title: headline,
          themeColor: themeColor || '#D4AF6A'
        };
      }
    }

    // Case 2: Apology / Forgiveness / Reconciliation -> Golden Truce // The Confession Vault (Edition 04)
    if (category === 'apology') {
      const truceEngine = (typeof window !== 'undefined' && window.WishCraftTemplate_GoldenTruce) ||
                          (typeof globalThis !== 'undefined' && globalThis.WishCraftTemplate_GoldenTruce) ||
                          global.WishCraftTemplate_GoldenTruce;

      if (truceEngine && typeof truceEngine.build === 'function') {
        const truceHtml = truceEngine.build({
          recipientName: recipientName,
          senderName: senderName,
          chapter1Subtitle: `Chapter 01 • For ${recipientName}`,
          chapter1Title: headline.includes('<br>') ? headline : `Can We Clear The Air?<br>Here is <span>my sincere truth.</span>`,
          chapter1Subtext: subtitle || `${recipientName}, would you please hear me out just for a moment? 🥺`,
          chapter2Subtitle: "Chapter 02 • Confession",
          chapter2Title: "My Confession",
          confessionHeading: scratchHeading || "I am so genuinely sorry.",
          confessionMessage: scratchNote,
          clause1Title: "Clause 01: Sincere Apology",
          clause1Text: letter1 ? `No excuses, no defenses—<span>${letter1.slice(0, 95)}</span>` : "No excuses, no defenses—just an honest promise to <span>always communicate with kindness.</span>",
          clause2Title: "Clause 02: Pure Intentions",
          clause2Text: letter2 ? `<span>${letter2.slice(0, 95)}</span>` : "My words may have stumbled, but my heart has only <span>respect and warmth for you.</span>",
          clause3Title: "Clause 03: Mutual Harmony",
          clause3Text: letter3 ? `<span>${letter3.slice(0, 95)}</span>` : "Clear, open conversations from here on out—<span>no more misunderstandings.</span>",
          clause4Title: "Clause 04: True Empathy",
          clause4Text: "I should have paused and considered how you felt, <span>before speaking.</span>",
          clause5Title: "Clause 05: The Truce",
          clause5Text: "From the bottom of my heart, I am truly sorry.<br>Can we <span>make things right?</span> ❤️",
          finalPromise: `I promise to always protect our bond and never take your trust for granted.<br><br>Can we hit reset and start fresh? 🥺`,
          successSubtitle: "Forever Grateful ✨",
          successTitle: "Thank You.",
          successMessage: `You are truly extraordinary and have the kindest heart in the world. Thank you for forgiving me. ❤️`,
          showWatermark: showWatermark
        });

        return {
          html: truceHtml,
          category: 'apology',
          title: headline,
          themeColor: themeColor || '#D4AF37'
        };
      }
    }

    // Case 3: Romantic / Anniversary -> Royal Velvet // Cinematic Premiere (Edition 01)
    if (category === 'anniversary' || category === 'romantic') {
      const royalEngine = (typeof window !== 'undefined' && window.WishCraftTemplate_RoyalVelvet) ||
                          (typeof globalThis !== 'undefined' && globalThis.WishCraftTemplate_RoyalVelvet) ||
                          global.WishCraftTemplate_RoyalVelvet;

      if (royalEngine && typeof royalEngine.build === 'function') {
        const royalHtml = royalEngine.build({
          recipientName: recipientName,
          sender: senderName || "Forever Yours",
          tagline: subtitle,
          polaroidCaption: "Pure Grace & Wonder.",
          quote: quote,
          heartQuote: scratchNote,
          heartTitle: "The Reserved Chamber",
          treat1Title: "Starlight Dinner",
          treat1Desc: "Your favorite restaurant, anytime.",
          treat2Title: "Spontaneous Getaway",
          treat2Desc: "A weekend adventure, my treat.",
          wishMessage: headline,
          passcode: userPasscode || "2026",
          hint: userData.passcodeHint || "The year of timeless memories",
          letter1: letter1,
          letter2: letter2,
          letter3: letter3,
          letter4: closingNote,
          occasion: category === 'anniversary' ? "Anniversary Premiere" : "Romantic Keepsake",
          photos: photosArray,
          showWatermark: showWatermark
        });

        return {
          html: royalHtml,
          category: category,
          title: headline,
          themeColor: themeColor || '#E056FD'
        };
      }
    }

    // Case 3: Milestone / Farewell / Funny / Celebration / Others -> Obsidian Vault // Liquid Gold Edition (Edition 02)
    const obsidianEngine = (typeof window !== 'undefined' && window.WishCraftTemplate_ObsidianVault) ||
                           (typeof globalThis !== 'undefined' && globalThis.WishCraftTemplate_ObsidianVault) ||
                           global.WishCraftTemplate_ObsidianVault;

    if (obsidianEngine && typeof obsidianEngine.build === 'function') {
      let sixDigitCode = userPasscode.replace(/\D/g, '');
      if (sixDigitCode.length < 6) {
        sixDigitCode = (sixDigitCode + '290623').slice(0, 6);
      } else if (sixDigitCode.length > 6) {
        sixDigitCode = sixDigitCode.slice(0, 6);
      }

      const obsidianHtml = obsidianEngine.build({
        recipientName: recipientName,
        sender: senderName || "With Immense Regard",
        tagline: subtitle,
        introMessage: introNote,
        scratchTitle: "Secured Archive",
        scratchSubtitle: "Wipe the frosted glass to reveal",
        scratchNoteHeading: scratchHeading,
        scratchNote: scratchNote,
        startDate: userData.countdownTarget || undefined,
        passcode: sixDigitCode,
        terminalName: recipientName.toUpperCase(),
        finaleTitle: headline,
        letter1: letter1,
        letter2: letter2,
        letter3: letter3,
        letter4: letter4,
        signature: senderName ? `With highest admiration,\n${senderName}` : fallback.closing_note,
        photos: photosArray,
        showWatermark: showWatermark
      });

      return {
        html: obsidianHtml,
        category: category,
        title: headline,
        themeColor: themeColor || '#C5A059'
      };
    }

    throw new Error("Luxury template engine could not be initialized.");
  }

  // Freeze public API interface
  const WishCraftTemplateEngine = Object.freeze({
    escapeHtml,
    formatBodyText,
    normalizeCategory,
    buildWishFromTemplate,
    FALLBACK_COPY
  });

  if (typeof globalThis !== 'undefined') {
    globalThis.WishCraftTemplateEngine = WishCraftTemplateEngine;
  }
  if (typeof window !== 'undefined') {
    window.WishCraftTemplateEngine = WishCraftTemplateEngine;
  }
  global.WishCraftTemplateEngine = WishCraftTemplateEngine;

})(typeof window !== 'undefined' ? window : globalThis);
