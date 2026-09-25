/**
 * WishCraft Studio — Proprietary Curated Template Engine
 * Template: Obsidian Vault // Liquid Gold Edition (Edition 02)
 * (C) WishCraft. All Rights Reserved. Tamper-Protected Module.
 */
(function(global) {
  'use strict';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
    });
  }

  function buildObsidianVaultTemplateHtml(custom) {
    const c = Object.assign({
      recipientName: "My Beloved",
      sender: "Forever Yours",
      tagline: "A Journey of Moments",
      introMessage: "Every quiet conversation, shared laugh, and unforgettable memory has been a chapter in our favorite story. Here is to us, today and always.",
      biometricTitle: "Identity Check",
      biometricSub: "Biometric Security",
      scratchTitle: "Secured File",
      scratchSubtitle: "Wipe the frosted glass to reveal",
      scratchNoteHeading: "A Timeless Bond",
      scratchNote: "Every second with you is a moment held close to my heart. A lifetime of laughter, shared dreams, and quiet wonders still to come.\n\nForever and always.",
      carouselTitle: "Our Memories",
      carouselSubtitle: "A Lifetime of Moments",
      clockTitle: "Infinity Clock",
      clockSubtitle: "Time Since We Began",
      startDate: "2023-06-29T20:25:00",
      passcode: "290623",
      terminalName: "BELOVED",
      finaleTitle: "Forever & Always",
      letter1: "I wanted to create something truly magical and permanent for you today. A simple message could never capture the depth of what you mean to me.",
      letter2: "From the very first day our paths crossed, my world shifted into warmer, brighter colors. Your laughter brings peace to the loudest days, and your kindness is a steady anchor.",
      letter3: "Every milestone we reach, every adventure we embark on, and every quiet moment in between is etched into my heart. With you, time feels both boundless and too short.",
      letter4: "Never forget how extraordinary, how deeply cherished, and how truly irreplaceable you are. May our journey continue to unfold with boundless love and wonder.",
      signature: "With all my love,\nForever Yours",
      photos: [],
      photoCaptions: [],
      showWatermark: true
    }, custom || {});

    if (custom) {
      if (custom.heartTitle && !custom.scratchTitle) c.scratchTitle = custom.heartTitle;
      if (custom.heartQuote && !custom.scratchNote) c.scratchNote = custom.heartQuote;
      if (custom.wishMessage && !custom.finaleTitle) c.finaleTitle = custom.wishMessage;
      if (custom.quote && !custom.introMessage) c.introMessage = custom.quote;
      if (custom.polaroidCaption && !custom.carouselSubtitle) c.carouselSubtitle = custom.polaroidCaption;
      if (custom.sender && !custom.signature) c.signature = "With all my love,\n" + custom.sender;
      if (custom.recipientName && !custom.terminalName) c.terminalName = custom.recipientName.toUpperCase();
    }

    const defaultFallbacks = [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700&q=85",
      "https://images.unsplash.com/photo-1529156069898-49953eb1f5ff?w=700&q=85",
      "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=700&q=85",
      "https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?w=700&q=85",
      "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?w=700&q=85",
      "https://images.unsplash.com/photo-1506869640319-ce1a18b91424?w=700&q=85",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=85",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=700&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=85",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&q=85"
    ];

    const defaultCaptions = [
      "Where It Began",
      "Endless Laughs",
      "My Favorite Smile",
      "Perfect Days",
      "Lost in Time",
      "Unstoppable Us",
      "Just Us Two",
      "My Safe Place",
      "Always By My Side",
      "A Lifetime To Go"
    ];

    const userPhotos = Array.isArray(c.photos) && c.photos.length > 0 ? c.photos.filter(Boolean) : [];
    // Obsidian Vault carousel strictly requires 10 photos (no more, no less)
    let finalPhotos = [];
    for (let i = 0; i < 10; i++) {
      finalPhotos.push(userPhotos[i] || defaultFallbacks[i % defaultFallbacks.length]);
    }
    const totalPhotos = 10;

    let carouselCardsHtml = '';
    finalPhotos.forEach((src, idx) => {
      const numStr = (idx + 1 < 10 ? '0' : '') + (idx + 1) + ' / ' + (totalPhotos < 10 ? '0' : '') + totalPhotos;
      const caption = (c.photoCaptions && c.photoCaptions[idx]) || defaultCaptions[idx] || ('Memory ' + (idx + 1));
      carouselCardsHtml += `
        <div class="polaroid-card">
          <div class="image-box">
            <img src="${escapeHtml(src)}" class="real-image" alt="Photo ${idx + 1}" loading="lazy">
          </div>
          <div class="caption-area">
            <p class="caption-num">${numStr}</p>
            <p class="caption-text">${escapeHtml(caption)}</p>
          </div>
        </div>`;
    });

    const watermarkHtml = c.showWatermark !== false ? `
  <!-- Crafted with WishCraft (Tamper-Protected Watermark) -->
  <a href="https://wishcraft-12.netlify.app/" target="_blank" rel="noopener" class="wc-watermark-badge" id="wcWatermarkBadge" title="Craft your own interactive experience on WishCraft">
    <span class="wc-badge-dot"></span>
    <span>Crafted with <span class="wc-badge-brand">WishCraft</span></span>
    <span class="wc-badge-arrow">↗</span>
  </a>` : '';

    const watermarkSentinel = c.showWatermark !== false ? `
    // Anti-Tamper Self-Healing Watermark Sentinel
    (function() {
      function verifyWatermark() {
        var b = document.getElementById('wcWatermarkBadge');
        if (!b) {
          b = document.createElement('a');
          b.id = 'wcWatermarkBadge';
          b.className = 'wc-watermark-badge';
          b.href = 'https://wishcraft-12.netlify.app/';
          b.target = '_blank';
          b.rel = 'noopener';
          b.innerHTML = '<span class="wc-badge-dot"></span><span>Crafted with <span class="wc-badge-brand">WishCraft</span></span><span class="wc-badge-arrow">↗</span>';
          document.body.appendChild(b);
        }
        b.style.setProperty('display', 'inline-flex', 'important');
        b.style.setProperty('visibility', 'visible', 'important');
        b.style.setProperty('opacity', '1', 'important');
      }
      setInterval(verifyWatermark, 3000);
    })();` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>` + escapeHtml(c.recipientName) + ` // The Vault</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@200;300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --obsidian-dark: #050506;
      --obsidian-mid: #0B0B0C;
      --obsidian-light: #1A1A1C;
      --gold-primary: #D4AF37;
      --gold-light: #F5DCA8;
      --gold-dark: #997A15;
      --error-red: #ff3366;
      --scan-fill: 0%;
      --scan-fill-raw: 0;
    }

    * {
      margin: 0; padding: 0; box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    html, body {
      background-color: var(--obsidian-dark);
      color: #ffffff;
      font-family: 'Montserrat', sans-serif;
      height: 100dvh;
      width: 100vw;
      overflow: hidden;
      position: relative;
    }

    /* 1. Heavy Liquid Resin Background */
    .bg-container {
      position: fixed; inset: 0; width: 100%; height: 100%;
      z-index: 1; overflow: hidden; pointer-events: none;
    }
    .blob {
      position: absolute; filter: blur(65px); opacity: 0.75;
      will-change: transform, border-radius;
    }
    .blob-1 {
      width: 80vw; max-width: 520px; height: 80vw; max-height: 520px;
      background: linear-gradient(135deg, var(--obsidian-light), var(--obsidian-mid));
      top: -10%; left: -20%; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: liquid 14s infinite linear, float 18s infinite alternate;
    }
    .blob-2 {
      width: 90vw; max-width: 600px; height: 90vw; max-height: 600px;
      background: linear-gradient(135deg, var(--gold-dark), var(--obsidian-dark));
      bottom: -12%; right: -20%; border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
      animation: liquid 16s infinite linear reverse, float 22s infinite alternate;
      opacity: 0.6;
    }
    .ambient-glow {
      position: absolute; width: 320px; height: 320px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%);
      z-index: 2; animation: pulseGlow 6s infinite alternate; filter: blur(35px);
    }
    .gold-leaf {
      position: absolute;
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
      opacity: 0; animation: floatUp 11s infinite linear;
      pointer-events: none;
    }

    /* Falling Leaf Particle in Finale */
    .leaf {
      position: absolute; top: -10%;
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      opacity: 0.65; pointer-events: none; z-index: 15;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      animation: fall linear forwards;
    }

    /* Top HUD */
    .vault-hud {
      position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 10px; z-index: 100;
      background: rgba(11, 11, 12, 0.75); padding: 8px 18px; border-radius: 30px;
      border: 1px solid rgba(212, 175, 55, 0.25); backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px); font-family: 'Space Mono', monospace;
      font-size: 11px; letter-spacing: 2px; color: var(--gold-light);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .sound-btn {
      position: fixed; top: 16px; right: 16px; z-index: 100;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(11, 11, 12, 0.7); border: 1px solid rgba(212, 175, 55, 0.3);
      color: var(--gold-light); display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 14px; backdrop-filter: blur(10px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.4); transition: 0.25s;
    }
    .sound-btn:hover { border-color: var(--gold-primary); transform: scale(1.05); }

    /* Scene Transitions */
    .scene-wrap {
      position: absolute; inset: 0; width: 100%; height: 100%;
      display: none; align-items: center; justify-content: center;
      padding: 20px; z-index: 10; opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(20px) scale(0.97);
    }
    .scene-wrap.active {
      display: flex; opacity: 1; transform: translateY(0) scale(1);
    }

    /* Common Glass Card Styling */
    .glass-card {
      width: 100%; max-width: 420px;
      background: linear-gradient(135deg, rgba(26, 26, 28, 0.65) 0%, rgba(11, 11, 12, 0.45) 100%);
      border-radius: 40px; padding: 48px 30px 42px; text-align: center;
      position: relative; transform-style: preserve-3d;
      backdrop-filter: blur(35px) saturate(160%);
      -webkit-backdrop-filter: blur(35px) saturate(160%);
      border-top: 1px solid rgba(212, 175, 55, 0.35);
      border-left: 1px solid rgba(212, 175, 55, 0.18);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      border-right: 1px solid rgba(255, 255, 255, 0.03);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.95), inset 0 0 30px rgba(212, 175, 55, 0.05);
    }
    .glare {
      position: absolute; inset: 0; border-radius: 40px;
      background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 60%);
      opacity: 0; pointer-events: none; transition: opacity 0.3s ease; mix-blend-mode: screen;
    }

    /* Gold Buttons */
    .btn-gold {
      display: inline-block; padding: 16px 42px;
      font-family: 'Montserrat', sans-serif; font-size: 0.85rem;
      font-weight: 600; letter-spacing: 2px; color: var(--obsidian-dark);
      text-transform: uppercase; text-decoration: none; cursor: pointer;
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary), var(--gold-dark));
      border: none; border-radius: 50px; position: relative; overflow: hidden;
      box-shadow: 0 10px 25px rgba(212, 175, 55, 0.25);
      transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    }
    .btn-gold::after {
      content: ''; position: absolute; top: 0; left: -100%;
      width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
      transform: skewX(-25deg); animation: buttonShine 4.5s infinite;
    }
    .btn-gold:active { transform: scale(0.96); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4); }

    /* Scene 1: Hero Card */
    .subtitle {
      font-size: 0.8rem; letter-spacing: 4px; margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.55); text-transform: uppercase; font-weight: 300;
    }
    h1.hero-title {
      font-family: 'Cinzel', serif; font-size: clamp(2rem, 9vw, 2.7rem);
      font-weight: 800; line-height: 1.2; margin-bottom: 22px;
      background: linear-gradient(to bottom, #FFFFFF 15%, var(--gold-light) 45%, var(--gold-primary) 85%, var(--gold-dark) 100%);
      background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8));
    }
    .hero-message {
      font-size: 0.92rem; line-height: 1.8; margin-bottom: 40px;
      color: rgba(255, 255, 255, 0.72); font-weight: 300;
    }

    /* Scene 2: Biometric Scanner */
    .scanner-container {
      position: relative; width: 150px; height: 150px; margin: 0 auto;
      border-radius: 50%; display: flex; justify-content: center; align-items: center;
      cursor: pointer;
    }
    .scanner-ring {
      position: absolute; width: 100%; height: 100%; border-radius: 50%;
      border: 2px solid rgba(212, 175, 55, 0.2); transition: all 0.3s ease;
    }
    .scanner-container.active .scanner-ring:nth-child(1) { animation: ripple 1.5s infinite linear; }
    .scanner-container.active .scanner-ring:nth-child(2) { animation: ripple 1.5s infinite linear 0.5s; }
    .circle-outer {
      width: 96px; height: 96px; border-radius: 50%;
      border: 2px dashed rgba(212, 175, 55, 0.4); position: absolute;
      animation: rotateSlow 12s linear infinite;
    }
    .scanner-container.active .circle-outer {
      animation: rotateSlow 4s linear infinite; border-color: rgba(212, 175, 55, 0.9);
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.35);
    }
    .circle-inner-mask {
      width: 72px; height: 72px; border-radius: 50%; position: absolute;
      overflow: hidden; display: flex; align-items: flex-end;
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 5px 15px rgba(0,0,0,0.5);
    }
    .circle-liquid-fill {
      width: 100%; height: var(--scan-fill);
      background: linear-gradient(to top, var(--obsidian-light), var(--gold-primary));
      box-shadow: 0 -3px 15px rgba(212, 175, 55, 0.8);
      transition: height 0.05s linear;
    }
    .scan-line {
      position: absolute; width: 120px; height: 3px;
      background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
      bottom: calc(38px + (var(--scan-fill-raw) * 0.72px));
      opacity: 0; transition: opacity 0.3s; box-shadow: 0 0 15px var(--gold-light);
    }
    .scanner-container.active .scan-line { opacity: 1; }
    .progress-text {
      font-family: 'Space Mono', monospace; font-size: 1.25rem;
      color: var(--gold-light); margin-top: 25px; min-height: 28px;
      letter-spacing: 2px; text-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }
    .scanner-instruction {
      font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-top: 8px;
      text-transform: uppercase; letter-spacing: 1px; animation: pulse 2s infinite;
    }

    /* Scene 3: Scratch Card */
    .reveal-container {
      position: relative; width: 100%; max-width: 380px; height: 380px;
      border-radius: 35px; margin: 0 auto;
      background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      backdrop-filter: blur(35px) saturate(180%); -webkit-backdrop-filter: blur(35px) saturate(180%);
      border-top: 1px solid rgba(255, 255, 255, 0.35); border-left: 1px solid rgba(255, 255, 255, 0.18);
      border-bottom: 1px solid rgba(212, 175, 55, 0.3); border-right: 1px solid rgba(212, 175, 55, 0.1);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(212, 175, 55, 0.05);
      overflow: hidden;
    }
    .secret-message {
      position: absolute; inset: 0; padding: 40px 30px; display: flex;
      flex-direction: column; justify-content: center; align-items: center;
      text-align: center; z-index: 1;
    }
    .secret-message h2 {
      font-family: 'Cinzel', serif; font-size: 1.8rem; color: var(--gold-light);
      margin-bottom: 16px; text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    }
    .secret-message p {
      font-size: 0.92rem; line-height: 1.8; color: rgba(255, 255, 255, 0.88); font-weight: 300;
    }
    #scratch-pad {
      position: absolute; inset: 0; width: 100%; height: 100%;
      border-radius: 35px; z-index: 5; touch-action: none; cursor: pointer;
      transition: opacity 1.2s ease;
    }

    /* Scene 4: Carousel */
    .carousel-container {
      width: 100%; padding: 15px 0; display: flex; gap: 18px;
      overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch; z-index: 10;
      scrollbar-width: none; -ms-overflow-style: none;
    }
    .carousel-container::-webkit-scrollbar { display: none; }
    .polaroid-card {
      min-width: 72vw; max-width: 300px; scroll-snap-align: center;
      background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      backdrop-filter: blur(25px) saturate(160%); -webkit-backdrop-filter: blur(25px) saturate(160%);
      border-top: 1px solid rgba(255, 255, 255, 0.25); border-left: 1px solid rgba(255, 255, 255, 0.12);
      border-bottom: 1px solid rgba(212, 175, 55, 0.25); border-right: 1px solid rgba(212, 175, 55, 0.08);
      border-radius: 28px; padding: 18px 18px 14px;
      box-shadow: 0 25px 45px -10px rgba(0, 0, 0, 0.85), inset 0 0 15px rgba(212, 175, 55, 0.05);
      display: flex; flex-direction: column; margin: 0 8px; position: relative; overflow: hidden;
      flex-shrink: 0;
    }
    .polaroid-card:first-child { margin-left: calc(50vw - 36vw); }
    .polaroid-card:last-child { margin-right: calc(50vw - 36vw); }
    @media (min-width: 600px) and (max-width: 767px) {
      .polaroid-card:first-child { margin-left: calc(50vw - 150px); }
      .polaroid-card:last-child { margin-right: calc(50vw - 150px); }
    }

    /* Desktop / PC Overrides: Vertical Photo Presentation */
    @media (min-width: 768px) {
      .carousel-container {
        flex-direction: column !important;
        align-items: center !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        max-height: 58vh !important;
        max-width: 380px !important;
        margin: 0 auto !important;
        padding: 16px 12px 24px !important;
        gap: 26px !important;
        scroll-snap-type: y proximity !important;
        scrollbar-width: thin !important;
        scrollbar-color: var(--gold-primary) rgba(255,255,255,0.06) !important;
      }
      .carousel-container::-webkit-scrollbar {
        display: block !important;
        width: 5px !important;
      }
      .carousel-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.04) !important;
        border-radius: 10px !important;
      }
      .carousel-container::-webkit-scrollbar-thumb {
        background: var(--gold-primary) !important;
        border-radius: 10px !important;
      }
      .polaroid-card {
        min-width: unset !important;
        width: 100% !important;
        max-width: 320px !important;
        margin: 0 auto !important;
        scroll-snap-align: center !important;
      }
      .polaroid-card:first-child {
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .polaroid-card:last-child {
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .swipe-hint-mobile {
        display: none !important;
      }
      .scroll-hint-desktop {
        display: block !important;
      }
    }
    .image-box {
      width: 100%; aspect-ratio: 4/5; border-radius: 16px; overflow: hidden;
      background: #000; border: 1px solid rgba(212, 175, 55, 0.2);
      display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
    }
    .real-image { width: 100%; height: 100%; object-fit: cover; }
    .caption-area { text-align: center; }
    .caption-num {
      font-size: 0.68rem; color: var(--gold-light); letter-spacing: 3px;
      margin-bottom: 4px; font-weight: 300; font-family: 'Space Mono', monospace;
    }
    .caption-text {
      font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 600;
      background: linear-gradient(to right, #fff, var(--gold-primary));
      background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .flower {
      position: absolute; z-index: 0; opacity: 0.35; pointer-events: none;
      filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.2));
    }
    .flower-tr { width: 120px; height: 120px; top: 4dvh; right: -15px; transform: rotate(45deg); }
    .flower-bl { width: 130px; height: 130px; bottom: 4dvh; left: -20px; transform: rotate(-45deg); }

    /* Scene 5: Infinity Clock */
    .timer-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
      margin: 25px 0 35px; width: 100%;
    }
    .time-box {
      background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 20px; padding: 18px 10px; box-shadow: inset 0 5px 15px rgba(0,0,0,0.8);
      position: relative; overflow: hidden;
    }
    .time-box::before {
      content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
      opacity: 0.6;
    }
    .number {
      font-family: 'Space Mono', monospace; font-size: 2rem; font-weight: 700;
      color: var(--gold-light); text-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      margin-bottom: 4px;
    }
    .label {
      font-size: 0.68rem; text-transform: uppercase; letter-spacing: 2px;
      color: rgba(255,255,255,0.5);
    }

    /* Scene 6: Vault Keypad & Finale */
    .code-display { display: flex; gap: 12px; margin: 25px 0 35px; justify-content: center; }
    .code-dot {
      width: 16px; height: 16px; border-radius: 50%;
      border: 2px solid rgba(212, 175, 55, 0.5); background: transparent;
      transition: all 0.3s ease; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
    }
    .code-dot.filled {
      background: var(--gold-primary); border-color: var(--gold-light);
      box-shadow: 0 0 15px var(--gold-primary); transform: scale(1.15);
    }
    .code-dot.error {
      background: var(--error-red); border-color: var(--error-red);
      box-shadow: 0 0 15px var(--error-red);
    }
    .keypad {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
      width: 100%; max-width: 270px; margin: 0 auto;
    }
    .key {
      width: 62px; height: 62px; border-radius: 50%;
      background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(212, 175, 55, 0.18);
      display: flex; justify-content: center; align-items: center;
      font-family: 'Space Mono', monospace; font-size: 1.4rem; color: var(--gold-light);
      cursor: pointer; box-shadow: inset 0 5px 10px rgba(0,0,0,0.5);
      transition: all 0.1s ease;
    }
    .key:active {
      background: rgba(212, 175, 55, 0.2); border-color: var(--gold-primary);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); transform: scale(0.92);
    }
    .key.empty { background: transparent; border: none; box-shadow: none; pointer-events: none; }
    .key-del { font-size: 0.9rem; color: rgba(255,255,255,0.6); }

    /* Terminal Phase */
    #terminal-phase {
      display: none; flex-direction: column; align-items: flex-start;
      text-align: left; width: 100%; min-height: 240px;
      font-family: 'Space Mono', monospace; padding: 20px 10px;
    }
    .term-line {
      font-size: 0.85rem; color: var(--gold-primary); margin-bottom: 14px;
      opacity: 0; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4);
    }

    /* Finale Letter */
    #finale-phase {
      display: none; flex-direction: column; align-items: center;
      opacity: 0; transform: scale(0.95); transition: all 1s ease; width: 100%;
    }
    #finale-phase.active { opacity: 1; transform: scale(1); }
    .finale-title {
      font-family: 'Cinzel', serif; font-size: 2rem; color: var(--gold-light);
      margin-bottom: 18px; text-shadow: 0 0 20px rgba(212, 175, 55, 0.6); flex-shrink: 0;
    }
    .scrollable-letter {
      max-height: 52vh; overflow-y: auto; padding-right: 12px; text-align: left;
      width: 100%; scrollbar-width: thin; scrollbar-color: var(--gold-primary) rgba(255,255,255,0.05);
    }
    .scrollable-letter::-webkit-scrollbar { width: 4px; }
    .scrollable-letter::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
    .scrollable-letter::-webkit-scrollbar-thumb { background: var(--gold-primary); border-radius: 10px; }
    .finale-text {
      font-size: 0.92rem; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 18px;
    }
    .signature {
      font-family: 'Cinzel', serif; font-size: 1.15rem; color: var(--gold-primary);
      font-weight: 600; border-top: 1px solid rgba(212, 175, 55, 0.3);
      padding-top: 15px; margin-top: 12px; text-align: center;
    }

    /* Watermark Badge */
    .wc-watermark-badge {
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      z-index: 99999; display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 20px;
      background: rgba(11, 11, 12, 0.85); backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.35);
      color: rgba(255, 255, 255, 0.7); font-family: 'Montserrat', sans-serif;
      font-size: 11px; text-decoration: none; letter-spacing: 0.5px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); transition: all 0.25s ease;
    }
    .wc-watermark-badge:hover {
      border-color: var(--gold-primary); color: #fff;
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 0 6px 24px rgba(212, 175, 55, 0.3);
    }
    .wc-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-primary); }
    .wc-badge-brand { color: var(--gold-light); font-weight: 700; }
    .wc-badge-arrow { font-size: 10px; opacity: 0.6; }

    /* Keyframes */
    @keyframes liquid {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
      67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    }
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(20px) rotate(5deg); }
    }
    @keyframes pulseGlow {
      0% { opacity: 0.35; transform: translate(-50%, -50%) scale(0.85); }
      100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
    }
    @keyframes floatUp {
      0% { transform: translateY(100vh) rotate(0deg) scale(0); opacity: 0; }
      20% { opacity: 0.7; transform: translateY(80vh) rotate(90deg) scale(1); }
      80% { opacity: 0.7; transform: translateY(20vh) rotate(270deg) scale(1); }
      100% { transform: translateY(-10vh) rotate(360deg) scale(0); opacity: 0; }
    }
    @keyframes ripple {
      0% { transform: scale(1); opacity: 1; border-color: rgba(212, 175, 55, 0.5); }
      100% { transform: scale(1.6); opacity: 0; border-color: rgba(212, 175, 55, 0); }
    }
    @keyframes rotateSlow {
      0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; } 50% { opacity: 1; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-10px); }
      40%, 80% { transform: translateX(10px); }
    }
    .shake-animation { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes fall {
      0% { transform: translateY(-10vh) translateX(0) rotate(0deg) scale(0.5); opacity: 0; }
      10% { opacity: 0.7; }
      50% { transform: translateY(50vh) translateX(20px) rotate(180deg) scale(1); opacity: 0.7; }
      90% { opacity: 0.7; }
      100% { transform: translateY(110vh) translateX(-20px) rotate(360deg) scale(0.8); opacity: 0; }
    }
    @keyframes buttonShine { 0%, 60% { left: -100%; } 100% { left: 200%; } }
  </style>
</head>
<body>

  <!-- Ambient Dark Resin Background -->
  <div class="bg-container" id="bg-container">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="ambient-glow"></div>
  </div>

  <!-- HUD -->
  <div class="vault-hud">
    <span id="hud-chapter">CHAPTER 01 / 06</span>
  </div>
  <button class="sound-btn" id="sound-toggle" title="Toggle soundtrack">♫</button>

  <!-- ================= SCENE 1: THE OBSIDIAN PREMIERE ================= -->
  <div class="scene-wrap active" id="scene-1">
    <div class="glass-card" id="hero-glass-card">
      <div class="glare" id="hero-glare"></div>
      <div class="subtitle">` + escapeHtml(c.tagline) + `</div>
      <h1 class="hero-title">` + escapeHtml(c.recipientName).toUpperCase() + `</h1>
      <p class="hero-message">` + escapeHtml(c.introMessage) + `</p>
      <button class="btn-gold" onclick="window.nextScene(2)">✦ Unlock Memories</button>
    </div>
  </div>

  <!-- ================= SCENE 2: BIOMETRIC IDENTITY ================= -->
  <div class="scene-wrap" id="scene-2">
    <div class="glass-card" id="bio-glass-card">
      <div class="glare" id="bio-glare"></div>
      
      <div id="scan-phase">
        <div style="margin-bottom: 25px;">
          <h2 style="font-family: 'Cinzel', serif; font-size: 1.8rem; margin-bottom: 5px; background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">` + escapeHtml(c.biometricTitle) + `</h2>
          <p style="font-size: 0.75rem; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 3px;">` + escapeHtml(c.biometricSub) + `</p>
        </div>

        <div class="scanner-container" id="scanner">
          <div class="scanner-ring"></div>
          <div class="scanner-ring"></div>
          <div class="circle-outer"></div>
          <div class="circle-inner-mask">
            <div class="circle-liquid-fill"></div>
          </div>
          <div class="scan-line"></div>
        </div>

        <div class="progress-text" id="progress-val">00%</div>
        <div class="scanner-instruction" id="scanner-instruction">Touch & Hold to Verify</div>
      </div>

      <div style="display:none; flex-direction:column; align-items:center; opacity:0; transition:opacity 0.8s ease;" id="success-phase">
        <div style="width:54px; height:54px; border-radius:50%; background:rgba(212,175,55,0.15); border:1px solid var(--gold-primary); display:flex; align-items:center; justify-content:center; font-size:24px; color:var(--gold-light); margin-bottom:16px;">✓</div>
        <h2 style="font-family: 'Cinzel', serif; color: var(--gold-primary); font-size: 1.7rem; margin-bottom: 12px; text-shadow: 0 0 15px rgba(212, 175, 55, 0.3);">Access Granted</h2>
        <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-bottom: 30px; line-height: 1.6;">Identity confirmed. Access granted to secured anniversary vaults.</p>
        <button class="btn-gold" onclick="window.nextScene(3)">✦ Enter Protocol</button>
      </div>

    </div>
  </div>

  <!-- ================= SCENE 3: SCRATCH REVEAL ================= -->
  <div class="scene-wrap" id="scene-3">
    <div style="display:flex; flex-direction:column; align-items:center; width:100%; max-width:400px;">
      <div style="text-align:center; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.8rem; background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">` + escapeHtml(c.scratchTitle) + `</h2>
        <div style="font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 2px; margin-top: 6px;" id="instruction-text">` + escapeHtml(c.scratchSubtitle) + `</div>
      </div>

      <div class="reveal-container">
        <div class="secret-message">
          <h2>` + escapeHtml(c.scratchNoteHeading) + `</h2>
          <p>` + escapeHtml(c.scratchNote).replace(/\n/g, '<br>') + `</p>
        </div>
        <canvas id="scratch-pad"></canvas>
      </div>

      <div style="margin-top:28px; height:50px;">
        <button class="btn-gold" id="scratch-continue-btn" style="opacity:0; pointer-events:none; transition:opacity 0.5s ease;" onclick="window.nextScene(4)">✦ Continue Journey</button>
      </div>
    </div>
  </div>

  <!-- ================= SCENE 4: 10-MEMORY CAROUSEL ================= -->
  <div class="scene-wrap" id="scene-4">
    <svg class="flower flower-tr" viewBox="0 0 100 100" fill="none">
      <path d="M50 10C55 25 75 30 90 30C75 35 70 55 70 70C65 55 45 50 30 50C45 45 50 25 50 10Z" stroke="#F5DCA8" stroke-width="0.6"/>
      <path d="M50 30C52 38 60 40 68 40C60 42 58 50 58 58C56 50 48 48 40 48C48 46 50 38 50 30Z" stroke="#D4AF37" stroke-width="0.6"/>
    </svg>
    <svg class="flower flower-bl" viewBox="0 0 100 100" fill="none">
      <path d="M50 10C55 25 75 30 90 30C75 35 70 55 70 70C65 55 45 50 30 50C45 45 50 25 50 10Z" stroke="#F5DCA8" stroke-width="0.6"/>
      <circle cx="50" cy="50" r="3" stroke="#D4AF37" stroke-width="0.6"/>
    </svg>

    <div style="display:flex; flex-direction:column; align-items:center; width:100%; max-width:650px;">
      <div style="text-align:center; margin-bottom:10px;">
        <h2 style="font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 700; background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">` + escapeHtml(c.carouselTitle) + `</h2>
        <p style="font-size: 0.75rem; letter-spacing: 4px; color: var(--gold-light); text-transform: uppercase; font-weight: 300;">` + escapeHtml(c.carouselSubtitle) + `</p>
      </div>

      <div class="carousel-container" id="carousel">
` + carouselCardsHtml + `
      </div>

      <p class="swipe-hint-mobile" style="font-size: 0.65rem; letter-spacing: 3px; color: rgba(255,255,255,0.45); margin: 12px 0 18px; text-transform: uppercase; animation: pulse 2s infinite;">← Swipe through memories →</p>
      <p class="scroll-hint-desktop" style="display: none; font-size: 0.65rem; letter-spacing: 3px; color: rgba(255,255,255,0.45); margin: 12px 0 18px; text-transform: uppercase; animation: pulse 2s infinite;">↓ Scroll through memories ↓</p>

      <button class="btn-gold" onclick="window.nextScene(5)">✦ NEXT CHAPTER</button>
    </div>
  </div>

  <!-- ================= SCENE 5: INFINITY CLOCK ================= -->
  <div class="scene-wrap" id="scene-5">
    <div class="glass-card">
      <div style="margin-bottom: 25px;">
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.9rem; margin-bottom: 5px; background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">` + escapeHtml(c.clockTitle) + `</h2>
        <p style="font-size: 0.75rem; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 3px;">` + escapeHtml(c.clockSubtitle) + `</p>
      </div>

      <div class="timer-grid">
        <div class="time-box">
          <div class="number" id="t-days">00</div>
          <div class="label">Days</div>
        </div>
        <div class="time-box">
          <div class="number" id="t-hours">00</div>
          <div class="label">Hours</div>
        </div>
        <div class="time-box">
          <div class="number" id="t-mins">00</div>
          <div class="label">Minutes</div>
        </div>
        <div class="time-box">
          <div class="number" id="t-secs">00</div>
          <div class="label">Seconds</div>
        </div>
      </div>

      <button class="btn-gold" onclick="window.nextScene(6)">✦ Unlock Finale</button>
    </div>
  </div>

  <!-- ================= SCENE 6: THE VAULT FINALE & KEYPAD ================= -->
  <div class="scene-wrap" id="scene-6">
    <div class="glass-card" id="vault-glass-panel" style="max-width: 440px;">
      
      <!-- Phase 1: Security Keypad -->
      <div id="keypad-phase">
        <div style="margin-bottom: 15px;">
          <h2 style="font-family: 'Cinzel', serif; font-size: 1.8rem; margin-bottom: 5px; background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Final Decryption</h2>
          <p style="font-size: 0.72rem; color: rgba(255, 255, 255, 0.6); letter-spacing: 3px; text-transform: uppercase;">Enter The 6-Digit Passcode</p>
        </div>

        <div class="code-display" id="code-display">
          <div class="code-dot"></div>
          <div class="code-dot"></div>
          <div class="code-dot"></div>
          <div class="code-dot"></div>
          <div class="code-dot"></div>
          <div class="code-dot"></div>
        </div>

        <div class="keypad">
          <div class="key" onclick="window.vaultPressKey(1)">1</div>
          <div class="key" onclick="window.vaultPressKey(2)">2</div>
          <div class="key" onclick="window.vaultPressKey(3)">3</div>
          <div class="key" onclick="window.vaultPressKey(4)">4</div>
          <div class="key" onclick="window.vaultPressKey(5)">5</div>
          <div class="key" onclick="window.vaultPressKey(6)">6</div>
          <div class="key" onclick="window.vaultPressKey(7)">7</div>
          <div class="key" onclick="window.vaultPressKey(8)">8</div>
          <div class="key" onclick="window.vaultPressKey(9)">9</div>
          <div class="key empty"></div>
          <div class="key" onclick="window.vaultPressKey(0)">0</div>
          <div class="key key-del" onclick="window.vaultDeleteKey()">DEL</div>
        </div>
      </div>

      <!-- Phase 2: Decryption Terminal -->
      <div id="terminal-phase">
        <div class="term-line">> PASSCODE ACCEPTED</div>
        <div class="term-line">> AUTHENTICATING ACCESS: ` + escapeHtml(c.terminalName || c.recipientName).toUpperCase() + `</div>
        <div class="term-line">> COMPILING SACRED MEMORIES...</div>
        <div class="term-line" style="color: #fff;">> UNLOCKING FINAL MESSAGE...</div>
      </div>

      <!-- Phase 3: Grand Finale Letter -->
      <div id="finale-phase">
        <h2 class="finale-title">` + escapeHtml(c.finaleTitle) + `</h2>
        <div class="scrollable-letter">
          <p class="finale-text">` + escapeHtml(c.letter1) + `</p>
          <p class="finale-text">` + escapeHtml(c.letter2) + `</p>
          <p class="finale-text">` + escapeHtml(c.letter3) + `</p>
          <p class="finale-text">` + escapeHtml(c.letter4) + `</p>
          <div class="signature">` + escapeHtml(c.signature).replace(/\n/g, '<br>') + `</div>
        </div>
        <div style="margin-top: 20px;">
          <button class="btn-gold" style="padding: 12px 28px; font-size: 0.78rem;" onclick="window.replayVault()">✦ Replay Journey</button>
        </div>
      </div>

    </div>
  </div>

` + watermarkHtml + `

  <` + `script>
    // ----------------------------------------------------
    // 1. SCENE MANAGEMENT & NAVIGATION
    // ----------------------------------------------------
    let currentScene = 1;
    const totalScenes = 6;

    window.nextScene = function(n) {
      const curEl = document.getElementById('scene-' + currentScene);
      const nextEl = document.getElementById('scene-' + n);
      if (!nextEl) return;

      if (curEl) {
        curEl.classList.remove('active');
        setTimeout(() => { curEl.style.display = 'none'; }, 400);
      }

      currentScene = n;
      const hud = document.getElementById('hud-chapter');
      if (hud) hud.textContent = 'CHAPTER 0' + n + ' / 0' + totalScenes;

      setTimeout(() => {
        nextEl.style.display = 'flex';
        void nextEl.offsetWidth;
        nextEl.classList.add('active');

        // Scene-specific initializations
        if (n === 3) initScratchCard();
        if (n === 5) updateTimer();
      }, 350);
    };

    // ----------------------------------------------------
    // 2. GOLD FLAKES BACKGROUND
    // ----------------------------------------------------
    (function initBackgroundFlakes() {
      const bg = document.getElementById('bg-container');
      if (!bg) return;
      for (let i = 0; i < 18; i++) {
        const flake = document.createElement('div');
        flake.classList.add('gold-leaf');
        const size = Math.random() * 6 + 2.5;
        flake.style.width = size + 'px';
        flake.style.height = (size * (Math.random() + 0.6)) + 'px';
        flake.style.borderRadius = (Math.random()*50) + '% ' + (Math.random()*50) + '% ' + (Math.random()*50) + '% ' + (Math.random()*50) + '%';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 8 + 8) + 's';
        flake.style.animationDelay = Math.random() * -10 + 's';
        bg.appendChild(flake);
      }
    })();

    // ----------------------------------------------------
    // 3. 3D TILT WITH LIQUID GLARE (HERO & BIOMETRIC)
    // ----------------------------------------------------
    function setupTilt(cardId, glareId) {
      const card = document.getElementById(cardId);
      const glare = document.getElementById(glareId);
      if (!card || !glare) return;

      function onMove(x, y, rect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        glare.style.opacity = '1';
        glare.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(212,175,55,0.15) 0%, transparent 60%)';
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        onMove(e.clientX - rect.left, e.clientY - rect.top, rect);
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        glare.style.opacity = '0';
      });
      card.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          onMove(x, y, rect);
        }
      });
      card.addEventListener('touchend', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        glare.style.opacity = '0';
      });
    }

    setupTilt('hero-glass-card', 'hero-glare');
    setupTilt('bio-glass-card', 'bio-glare');

    // ----------------------------------------------------
    // 4. SCENE 2: BIOMETRIC SCANNER LOGIC (GPU RAF ENGINE)
    // ----------------------------------------------------
    const scanner = document.getElementById('scanner');
    const progressVal = document.getElementById('progress-val');
    const scannerInstruction = document.getElementById('scanner-instruction');
    const root = document.documentElement;

    let scanProgress = 0; // 0 to 100
    let isScanVerified = false;
    let scanAnimId = null;
    let drainAnimId = null;
    let lastScanTime = 0;

    function updateScanUI(val) {
      if (!progressVal) return;
      const displayVal = Math.min(100, Math.max(0, Math.round(val)));
      progressVal.innerText = (displayVal < 10 ? '0' : '') + displayVal + '%';
      root.style.setProperty('--scan-fill', displayVal + '%');
      root.style.setProperty('--scan-fill-raw', displayVal);
    }

    function startScan(e) {
      if (isScanVerified) return;
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }

      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }

      if (scanner) scanner.classList.add('active');
      if (scannerInstruction) {
        scannerInstruction.innerText = 'Scanning...';
        scannerInstruction.style.color = 'var(--gold-primary)';
      }
      playChime(440, 0.08);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(30); } catch(_) {}
      }

      lastScanTime = performance.now();
      function scanStep(now) {
        if (isScanVerified) return;
        const dt = Math.min((now - lastScanTime) / 1000, 0.08);
        lastScanTime = now;
        scanProgress += dt * 55; // ~1.8s progression to 100%

        if (scanProgress >= 100) {
          scanProgress = 100;
          isScanVerified = true;
          updateScanUI(100);
          scanAnimId = null;
          triggerScanSuccess();
          return;
        }

        updateScanUI(scanProgress);
        scanAnimId = requestAnimationFrame(scanStep);
      }
      scanAnimId = requestAnimationFrame(scanStep);
    }

    function stopScan(e) {
      if (isScanVerified) return;
      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }

      if (scanner) scanner.classList.remove('active');
      if (scannerInstruction) {
        scannerInstruction.innerText = 'Touch & Hold to Verify';
        scannerInstruction.style.color = 'rgba(255,255,255,0.6)';
      }

      lastScanTime = performance.now();
      function drainStep(now) {
        if (isScanVerified) return;
        const dt = Math.min((now - lastScanTime) / 1000, 0.08);
        lastScanTime = now;
        scanProgress -= dt * 110; // ~0.9s drain
        if (scanProgress <= 0) {
          scanProgress = 0;
          updateScanUI(0);
          drainAnimId = null;
          return;
        }
        updateScanUI(scanProgress);
        drainAnimId = requestAnimationFrame(drainStep);
      }
      drainAnimId = requestAnimationFrame(drainStep);
    }

    function triggerScanSuccess() {
      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }
      if (scanner) scanner.classList.remove('active');
      playChime(659, 0.25);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate([80, 50, 80]); } catch(_) {}
      }

      const scanPhase = document.getElementById('scan-phase');
      const successPhase = document.getElementById('success-phase');
      if (scanPhase && successPhase) {
        scanPhase.style.transition = 'opacity 0.5s';
        scanPhase.style.opacity = '0';
        setTimeout(() => {
          scanPhase.style.display = 'none';
          successPhase.style.display = 'flex';
          setTimeout(() => { successPhase.style.opacity = '1'; }, 40);
        }, 500);
      }
    }

    function resetBiometricScanner() {
      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }
      scanProgress = 0;
      isScanVerified = false;
      updateScanUI(0);
      if (scanner) scanner.classList.remove('active');
      if (scannerInstruction) {
        scannerInstruction.innerText = 'Touch & Hold to Verify';
        scannerInstruction.style.color = 'rgba(255,255,255,0.6)';
      }
      const scanPhase = document.getElementById('scan-phase');
      const successPhase = document.getElementById('success-phase');
      if (scanPhase) {
        scanPhase.style.display = 'block';
        scanPhase.style.opacity = '1';
        scanPhase.style.transition = '';
      }
      if (successPhase) {
        successPhase.style.display = 'none';
        successPhase.style.opacity = '0';
      }
    }

    if (scanner) {
      scanner.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
      scanner.addEventListener('pointerdown', (e) => {
        if (e.cancelable) e.preventDefault();
        startScan(e);
      });
      scanner.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        startScan(e);
      }, { passive: false });

      window.addEventListener('pointerup', stopScan);
      window.addEventListener('pointercancel', stopScan);
      window.addEventListener('touchend', stopScan);
      window.addEventListener('touchcancel', stopScan);
      window.addEventListener('mouseup', stopScan);
    }

    // ----------------------------------------------------
    // 5. SCENE 3: CANVAS SCRATCH CARD
    // ----------------------------------------------------
    let scratchInitialized = false;
    let isScratchRevealed = false;
    let scratchWipeCount = 0;

    function renderScratchSurface() {
      const canvas = document.getElementById('scratch-pad');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth || 380;
      canvas.height = canvas.offsetHeight || 380;

      ctx.globalCompositeOperation = 'source-over';
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0B0B0C');
      grad.addColorStop(0.5, '#997A15');
      grad.addColorStop(1, '#050506');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resetScratchCard() {
      const canvas = document.getElementById('scratch-pad');
      if (!canvas) return;
      const continueBtn = document.getElementById('scratch-continue-btn');
      const instructionText = document.getElementById('instruction-text');

      canvas.style.display = 'block';
      canvas.style.opacity = '1';
      renderScratchSurface();

      isScratchRevealed = false;
      scratchWipeCount = 0;
      if (instructionText) {
        instructionText.innerText = 'Scratch Card to Reveal Message';
        instructionText.style.color = 'rgba(255, 255, 255, 0.7)';
        instructionText.style.animation = 'pulse-gold 2s infinite ease-in-out';
      }
      if (continueBtn) {
        continueBtn.style.opacity = '0';
        continueBtn.style.pointerEvents = 'none';
      }
    }

    function initScratchCard() {
      if (scratchInitialized) return;
      scratchInitialized = true;

      const canvas = document.getElementById('scratch-pad');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const continueBtn = document.getElementById('scratch-continue-btn');
      const instructionText = document.getElementById('instruction-text');

      renderScratchSurface();

      let isDrawing = false;

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }

      function wipe(e) {
        if (!isDrawing || isScratchRevealed) return;
        if (e.cancelable) e.preventDefault();
        const pos = getPos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 55;
        ctx.lineCap = 'round';
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

        scratchWipeCount++;
        if (scratchWipeCount > 130 && !isScratchRevealed) {
          isScratchRevealed = true;
          canvas.style.opacity = '0';
          if (instructionText) {
            instructionText.innerText = 'Message Decrypted';
            instructionText.style.color = 'var(--gold-primary)';
            instructionText.style.animation = 'none';
          }
          if (continueBtn) {
            continueBtn.style.opacity = '1';
            continueBtn.style.pointerEvents = 'auto';
          }
          playChime(587, 0.2);
          setTimeout(() => { canvas.style.display = 'none'; }, 1300);
        }
      }

      canvas.addEventListener('mousedown', (e) => { if (!isScratchRevealed) { isDrawing = true; wipe(e); } });
      window.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
      canvas.addEventListener('mousemove', wipe);

      canvas.addEventListener('touchstart', (e) => { if (!isScratchRevealed) { isDrawing = true; wipe(e); } }, { passive: false });
      window.addEventListener('touchend', () => { isDrawing = false; ctx.beginPath(); });
      canvas.addEventListener('touchmove', wipe, { passive: false });
    }

    // ----------------------------------------------------
    // 6. SCENE 5: INFINITY CLOCK TIMER
    // ----------------------------------------------------
    const targetStartDate = new Date(` + JSON.stringify(c.startDate || "2023-06-29T20:25:00") + `).getTime();

    function updateTimer() {
      const now = new Date().getTime();
      const distance = Math.max(0, now - targetStartDate);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('t-days');
      const hEl = document.getElementById('t-hours');
      const mEl = document.getElementById('t-mins');
      const sEl = document.getElementById('t-secs');

      if (dEl) dEl.innerText = (days < 10 ? '0' : '') + days;
      if (hEl) hEl.innerText = (hours < 10 ? '0' : '') + hours;
      if (mEl) mEl.innerText = (minutes < 10 ? '0' : '') + minutes;
      if (sEl) sEl.innerText = (seconds < 10 ? '0' : '') + seconds;
    }

    setInterval(updateTimer, 1000);

    // ----------------------------------------------------
    // 7. SCENE 6: 6-DIGIT VAULT KEYPAD & TERMINAL
    // ----------------------------------------------------
    const VAULT_PASSCODE = ` + JSON.stringify(String(c.passcode || "290623").trim()) + `;
    let vaultInput = '';
    const dots = document.querySelectorAll('.code-dot');
    const vaultPanel = document.getElementById('vault-glass-panel');

    function updateVaultDots() {
      dots.forEach((dot, index) => {
        dot.className = 'code-dot';
        if (index < vaultInput.length) {
          dot.classList.add('filled');
        }
      });
    }

    window.vaultPressKey = function(num) {
      if (vaultInput.length < 6) {
        vaultInput += num;
        updateVaultDots();
        playChime(350 + (vaultInput.length * 50), 0.05);

        if (vaultInput.length === 6) {
          setTimeout(checkVaultCode, 280);
        }
      }
    };

    window.vaultDeleteKey = function() {
      if (vaultInput.length > 0) {
        vaultInput = vaultInput.slice(0, -1);
        updateVaultDots();
      }
    };

    function checkVaultCode() {
      if (vaultInput === VAULT_PASSCODE) {
        playChime(880, 0.3);
        triggerVaultTerminal();
      } else {
        dots.forEach(d => d.classList.add('error'));
        if (vaultPanel) vaultPanel.classList.add('shake-animation');
        playChime(180, 0.2);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        setTimeout(() => {
          if (vaultPanel) vaultPanel.classList.remove('shake-animation');
          vaultInput = '';
          updateVaultDots();
        }, 650);
      }
    }

    function triggerVaultTerminal() {
      const keypad = document.getElementById('keypad-phase');
      const terminal = document.getElementById('terminal-phase');
      if (!keypad || !terminal) return;

      keypad.style.opacity = '0';
      setTimeout(() => {
        keypad.style.display = 'none';
        terminal.style.display = 'flex';

        const lines = document.querySelectorAll('.term-line');
        lines.forEach((line, index) => {
          setTimeout(() => {
            line.style.opacity = '1';
            playChime(440 + index * 80, 0.08);
            if (index === lines.length - 1) {
              setTimeout(triggerVaultFinale, 1400);
            }
          }, index * 750);
        });
      }, 450);
    }

    function triggerVaultFinale() {
      const terminal = document.getElementById('terminal-phase');
      const finale = document.getElementById('finale-phase');
      if (!terminal || !finale) return;

      terminal.style.display = 'none';
      finale.style.display = 'flex';
      void finale.offsetWidth;
      finale.classList.add('active');

      startFallingLeaves();
    }

    let fallingLeavesInterval = null;
    function startFallingLeaves() {
      if (fallingLeavesInterval) return;
      const bg = document.getElementById('bg-container');
      if (!bg) return;

      fallingLeavesInterval = setInterval(() => {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        const size = Math.random() * 10 + 14;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = (Math.random() * 4 + 6) + 's';
        bg.appendChild(leaf);
        setTimeout(() => { leaf.remove(); }, 10000);
      }, 380);
    }

    window.replayVault = function() {
      if (fallingLeavesInterval) {
        clearInterval(fallingLeavesInterval);
        fallingLeavesInterval = null;
      }
      document.querySelectorAll('.leaf').forEach(l => l.remove());

      const keypad = document.getElementById('keypad-phase');
      const terminal = document.getElementById('terminal-phase');
      const finale = document.getElementById('finale-phase');

      if (finale) { finale.classList.remove('active'); finale.style.display = 'none'; }
      if (terminal) {
        terminal.style.display = 'none';
        document.querySelectorAll('.term-line').forEach(line => { line.style.opacity = '0'; });
      }
      if (keypad) { keypad.style.display = 'block'; keypad.style.opacity = '1'; }

      vaultInput = '';
      updateVaultDots();

      // Full reset of all scenes back to pristine initial state
      resetBiometricScanner();
      resetScratchCard();
      const carousel = document.getElementById('memories-carousel');
      if (carousel) carousel.scrollLeft = 0;

      window.nextScene(1);
    };
    window.replayJourney = window.replayVault;
    function replayVault() { return window.replayVault(); }
    function replayJourney() { return window.replayJourney(); }

    // ----------------------------------------------------
    // 8. SYNTHESIZED WEB AUDIO ENGINE (OBSIDIAN SOUNDTRACK)
    // ----------------------------------------------------
    let audioCtx = null;
    let isMusicPlaying = false;
    let musicTimer = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playChime(freq, duration) {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch(e) {}
    }

    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        soundBtn.textContent = isMusicPlaying ? '❚❚' : '♫';
        soundBtn.style.borderColor = isMusicPlaying ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.3)';

        if (isMusicPlaying) {
          getAudioContext();
          const chordNotes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major pentatonic luxury chimes
          musicTimer = setInterval(() => {
            const freq = chordNotes[Math.floor(Math.random() * chordNotes.length)];
            playChime(freq, 2.5);
          }, 1800);
        } else {
          clearInterval(musicTimer);
        }
      });
    }

` + watermarkSentinel + `
  <` + `/script>
</body>
</html>`;
  }

  // Freeze public API interface to prevent tampering
  const ObsidianVaultEngine = Object.freeze({
    id: 'obsidian-vault',
    edition: '02',
    title: 'Obsidian Vault // Liquid Gold Edition',
    build: buildObsidianVaultTemplateHtml
  });

  Object.defineProperty(global, 'WishCraftTemplate_ObsidianVault', {
    value: ObsidianVaultEngine,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Attach to global template registry
  if (!global.WishCraftTemplates) global.WishCraftTemplates = {};
  global.WishCraftTemplates['obsidian-vault'] = ObsidianVaultEngine;

})(typeof window !== 'undefined' ? window : globalThis);
