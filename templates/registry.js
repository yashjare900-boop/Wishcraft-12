/**
 * WishCraft Template Registry & Injection Engine
 * 
 * Maps AI copywriting categories to pre-tested, luxury responsive HTML templates.
 * Enforces strict XSS sanitization and provides instant fallback copy.
 */

(function(global) {
  'use strict';

  // 1. Safe HTML Entity Escaping (Prevents XSS attacks)
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
    // Split on double newlines or single newlines
    const paragraphs = clean.split(/\n\s*\n/);
    return paragraphs
      .map(p => `<p class="wc-prose-p">${escapeHtml(p.trim())}</p>`)
      .join('\n');
  }

  // 3. Fallback AI Copy (Instant offline reliability)
  const FALLBACK_COPY = {
    birthday: {
      category: 'birthday',
      title: 'A Constellation of Joy For You ✨',
      subtitle: 'Celebrating the incredible milestone of your journey',
      body_text: 'Another chapter begins today, written in starlight and infinite possibility.\n\nMay this year unfold with quiet triumphs, fearless adventures, and all the laughter your heart can hold. You bring a rare and radiant warmth into the lives around you.',
      quote: 'Count your age by stars, not years. Count your life by smiles, not tears.',
      theme_color: '#D4AF6A'
    },
    anniversary: {
      category: 'anniversary',
      title: 'A Love That Grows Timeless 💎',
      subtitle: 'Honoring every step, glance, and shared memory',
      body_text: 'Two souls walking through time together, weaving ordinary moments into an extraordinary tapestry.\n\nHappy Anniversary. Through every storm and sunrise, the bond you share continues to shine like liquid gold. Here is to all that was, all that is, and the forever still waiting.',
      quote: 'The best thing to hold onto in life is each other.',
      theme_color: '#C5A059'
    },
    romantic: {
      category: 'romantic',
      title: 'You Are My Favorite Story 🌹',
      subtitle: 'In a world full of noise, you are my harmony',
      body_text: 'Out of all the billions of stars in the cosmos, somehow I found you.\n\nEvery day with you feels like discovering a secret room filled with wonder. Thank you for being my anchor, my spark, and the warmth that turns everywhere into home.',
      quote: 'I loved you yesterday, I love you still, I always have, I always will.',
      theme_color: '#E056FD'
    },
    farewell: {
      category: 'farewell',
      title: 'To New Horizons & Grand Adventures 🌅',
      subtitle: 'Not a goodbye, but the start of your next great chapter',
      body_text: 'Few people leave a mark as indelible and inspiring as you have.\n\nAs you embark on this next path, take pride in how far you have come and have faith in how far you can go. The best is truly yet to come.',
      quote: 'Every new beginning comes from some other beginning\'s end.',
      theme_color: '#00D2D3'
    },
    funny: {
      category: 'funny',
      title: 'Older, Wiser, & Still Questionable 🍕',
      subtitle: 'Certified legend, occasionally functioning adult',
      body_text: 'Scientists confirmed it: you are officially one year closer to yelling at clouds and having a favorite stove burner.\n\nHere\'s to celebrating another year of survival, questionable decisions, and still looking suspiciously good. Keep shining!',
      quote: 'Age is merely the number of years the world has been enjoying you.',
      theme_color: '#FF6B6B'
    },
    celebration: {
      category: 'celebration',
      title: 'Victory In The Making 🏆',
      subtitle: 'Hard work meets well-deserved triumph',
      body_text: 'You dreamed it, fought for it, and conquered it.\n\nThis victory is a testament to your grit, passion, and unwavering heart. Take a moment to stand tall and savor this milestone — you earned every single ounce of it.',
      quote: 'Success isn\'t just about what you accomplish, it\'s about what you inspire others to do.',
      theme_color: '#F9CA24'
    }
  };

  // 4. Category Normalizer
  function normalizeCategory(cat) {
    if (!cat) return 'birthday';
    const c = String(cat).toLowerCase().trim();
    if (c.includes('birth') || c.includes('bday')) return 'birthday';
    if (c.includes('anniv') || c.includes('wedding')) return 'anniversary';
    if (c.includes('roman') || c.includes('love') || c.includes('propos') || c.includes('crush')) return 'romantic';
    if (c.includes('fare') || c.includes('goodbye') || c.includes('retire') || c.includes('leave')) return 'farewell';
    if (c.includes('fun') || c.includes('humor') || c.includes('roast') || c.includes('joke')) return 'funny';
    if (c.includes('celeb') || c.includes('congrat') || c.includes('promot') || c.includes('grad') || c.includes('fest')) return 'celebration';
    return 'birthday';
  }

  // 5. Template Registry Map
  const TEMPLATE_REGISTRY = {
    birthday: 'templates/birthday.html',
    anniversary: 'templates/anniversary.html',
    romantic: 'templates/romantic.html',
    farewell: 'templates/farewell.html',
    funny: 'templates/funny.html',
    celebration: 'templates/celebration.html'
  };

  // Cache template HTML strings in memory to prevent refetching
  const templateCache = {};

  // 6. Template Fetcher
  async function fetchTemplate(category) {
    if (templateCache[category]) return templateCache[category];

    const relPath = TEMPLATE_REGISTRY[category] || TEMPLATE_REGISTRY.birthday;
    
    // Resolve relative path against window.location or baseUrl
    let fetchUrl = relPath;
    if (typeof window !== 'undefined' && window.location) {
      const base = window.location.href.split('?')[0].split('#')[0];
      const dir = base.substring(0, base.lastIndexOf('/') + 1);
      fetchUrl = dir + relPath;
    }

    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error(`Template fetch returned HTTP ${res.status}`);
      const text = await res.text();
      templateCache[category] = text;
      return text;
    } catch (err) {
      console.warn(`[Template Engine] Failed to fetch ${fetchUrl}, attempting relative fallback:`, err.message);
      const resFallback = await fetch('/' + relPath);
      const text = await resFallback.text();
      templateCache[category] = text;
      return text;
    }
  }

  // 7. Core Injection Engine
  async function buildWishFromTemplate(aiData, userData = {}) {
    const rawCategory = aiData?.category || userData?.occasion || 'birthday';
    const category = normalizeCategory(rawCategory);
    const fallback = FALLBACK_COPY[category] || FALLBACK_COPY.birthday;

    // Merge AI output with safe fallbacks
    const title = aiData?.title || fallback.title;
    const subtitle = aiData?.subtitle || fallback.subtitle;
    const bodyText = aiData?.body_text || fallback.body_text;
    const quote = aiData?.quote || fallback.quote;
    const themeColor = aiData?.theme_color || fallback.theme_color;

    const recipientName = userData.recipientName || 'You';
    const senderName = userData.senderName || '';
    const passcode = userData.passcode || '';
    const dayOfBirth = userData.dayOfBirth || userData.countdownTarget || '';

    // Fetch the pre-built template HTML
    let templateHtml = await fetchTemplate(category);

    // Prepare photos JSON safely
    let photosArray = [];
    if (Array.isArray(userData.photos)) {
      photosArray = userData.photos;
    } else if (Array.isArray(userData.photoDataUrls)) {
      photosArray = userData.photoDataUrls;
    }
    const safePhotosJson = JSON.stringify(photosArray);

    // Semantic Token Replacements
    const tokenMap = {
      '{{WISH_TITLE}}': escapeHtml(title),
      '{{WISH_SUBTITLE}}': escapeHtml(subtitle),
      '{{WISH_BODY}}': formatBodyText(bodyText),
      '{{WISH_QUOTE}}': escapeHtml(quote),
      '{{THEME_COLOR}}': escapeHtml(themeColor),
      '{{RECIPIENT_NAME}}': escapeHtml(recipientName),
      '{{SENDER_NAME}}': escapeHtml(senderName),
      '{{CATEGORY}}': escapeHtml(category),
      '{{PASSPHRASE}}': escapeHtml(passcode),
      '{{DAY_OF_BIRTH}}': escapeHtml(dayOfBirth),
      '{{CURRENT_YEAR}}': String(new Date().getFullYear()),
      '{{USER_PHOTOS_JSON}}': safePhotosJson
    };

    for (const [token, value] of Object.entries(tokenMap)) {
      templateHtml = templateHtml.split(token).join(value);
    }

    return {
      html: templateHtml,
      category,
      title,
      themeColor
    };
  }

  const WishCraftTemplateEngine = Object.freeze({
    escapeHtml,
    formatBodyText,
    normalizeCategory,
    buildWishFromTemplate,
    fetchTemplate,
    FALLBACK_COPY,
    TEMPLATE_REGISTRY
  });

  if (typeof globalThis !== 'undefined') {
    globalThis.WishCraftTemplateEngine = WishCraftTemplateEngine;
  }
  if (typeof window !== 'undefined') {
    window.WishCraftTemplateEngine = WishCraftTemplateEngine;
  }
  global.WishCraftTemplateEngine = WishCraftTemplateEngine;

})(typeof window !== 'undefined' ? window : globalThis);
