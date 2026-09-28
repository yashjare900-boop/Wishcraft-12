/**
 * WishCraft Studio — Proprietary Curated Template Engine
 * Template: Royal Velvet // Cinematic Premiere (Edition 01)
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

  function buildRoyalVelvetTemplateHtml(custom) {
    const c = Object.assign({
      recipientName: "My Dearest",
      sender: "Forever Yours",
      tagline: "A celebration of grace, laughter, and timeless memories.",
      polaroidCaption: "Pure Grace.",
      quote: "To the world you may be one person, but to me you make everything better.",
      heartQuote: "Side by side or miles apart,\nwe are always connected by the heart.",
      heartTitle: "The Reserved Chamber",
      treat1Title: "Shopping Spree!",
      treat1Desc: "My treat. Pick your favorites.",
      treat2Title: "Royal Dinner!",
      treat2Desc: "Your favorite restaurant, anytime.",
      wishMessage: "May Every Dream Flourish",
      passcode: "2026",
      hint: "The year of magic",
      letter1: "I wanted to create something truly magical and unforgettable for you today. A regular card could never capture how much you mean to everyone around you.",
      letter2: "From every quiet conversation to every milestone along the way, your presence brings warmth and inspiration to everything you touch. You have an extraordinary spirit that lifts everyone around you.",
      letter3: "Whether reaching for tomorrow's boldest dreams or celebrating today's simplest joys, know that you are held in the highest regard, always admired, supported, and loved.",
      letter4: "Never stop exploring. Never settle for the ordinary. May this year shower you with laughter, boundless success, and unforgettable moments.",
      occasion: "Birthday Premiere",
      photos: []
    }, custom || {});

    const nameParts = c.recipientName.split(' ');
    const firstName = nameParts[0] || "Special";
    const restName = nameParts.slice(1).join(' ') || "One";

    const defaultFallbacks = [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953eb1f5ff?w=600&q=80",
      "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=600&q=80",
      "https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?w=600&q=80",
      "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?w=600&q=80",
      "https://images.unsplash.com/photo-1506869640319-ce1a18b91424?w=600&q=80"
    ];

    const userPhotos = Array.isArray(c.photos) && c.photos.length > 0 ? c.photos : [];
    const primaryPhoto = userPhotos.length > 0 ? userPhotos[0] : defaultFallbacks[0];
    // Strictly 6 memory photos (no more, no less)
    let finalPhotos = userPhotos.slice(0, 6);
    let fbIdx = 0;
    while (finalPhotos.length < 6) {
      finalPhotos.push(defaultFallbacks[fbIdx % defaultFallbacks.length]);
      fbIdx++;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>` + escapeHtml(c.recipientName) + ` // Premiere Experience</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <` + `script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><` + `/script>
  <` + `script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><` + `/script>
  <style>
    :root {
      --primary-pink: #ff758c;
      --secondary-pink: #ff7eb3;
      --accent-gold: #ffb199;
      --bg-deep: #1a0b12;
      --success-green: #4ade80;
      --error-red: #ff3366;
      --scan-fill: 0%;
      --scan-fill-raw: 0;
      --glass-bg: rgba(255, 255, 255, 0.03);
    }
    * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
    html, body {
      background-color: var(--bg-deep); color: #fff; font-family: 'Poppins', sans-serif;
      overflow: hidden; height: 100%; width: 100%; position: relative;
    }
    .bg-container {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 1; overflow: hidden; pointer-events: none;
    }
    .blob {
      position: absolute; filter: blur(50px); opacity: 0.6;
      animation: float 15s infinite alternate ease-in-out; will-change: transform, border-radius;
    }
    .blob-1 {
      width: 80vw; max-width: 500px; height: 80vw; max-height: 500px;
      background: linear-gradient(135deg, var(--secondary-pink), #ff0844);
      top: -10%; left: -20%; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: liquid 12s infinite linear, float 18s infinite alternate;
    }
    .blob-2 {
      width: 90vw; max-width: 600px; height: 90vw; max-height: 600px;
      background: linear-gradient(135deg, var(--accent-gold), var(--primary-pink));
      bottom: -15%; right: -20%; border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
      animation: liquid 15s infinite linear reverse, float 22s infinite alternate; animation-delay: -3s;
    }
    .particles {
      position: absolute; width: 2px; height: 2px; background: #fff; border-radius: 50%; opacity: 0;
      animation: particleUp 5s infinite linear;
    }
    .flower {
      position: fixed; z-index: 5; opacity: 0.65; pointer-events: none;
      filter: drop-shadow(0 0 12px rgba(255,177,153,0.3));
    }
    .flower-tl { width: 130px; height: 130px; top: 2dvh; left: -15px; transform: rotate(-15deg); }
    .flower-br { width: 150px; height: 150px; bottom: 2dvh; right: -25px; transform: rotate(160deg); }

    /* Scene Transitions */
    .scene-wrap {
      position: absolute; inset: 0; width: 100%; height: 100%;
      display: none; align-items: center; justify-content: center;
      padding: 20px; z-index: 10; opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(20px) scale(0.97);
    }
    .scene-wrap.active { display: flex; opacity: 1; transform: translateY(0) scale(1); }

    /* Glass Cards */
    .glass-card {
      width: 100%; max-width: 440px; background: rgba(255, 255, 255, 0.035);
      border-radius: 35px; padding: 48px 30px 42px; text-align: center;
      position: relative; overflow: hidden;
      backdrop-filter: blur(25px) saturate(160%); -webkit-backdrop-filter: blur(25px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65), inset 0 0 15px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }
    .glass-card::before {
      content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,117,140,0.05) 30%, transparent 70%);
      animation: liquidSheen 10s infinite linear; pointer-events: none; z-index: -1;
    }
    .top-label {
      font-size: 0.68rem; letter-spacing: 5px; color: rgba(255, 255, 255, 0.6);
      margin-bottom: 20px; text-transform: uppercase;
    }
    .glass-title {
      font-family: 'Playfair Display', serif; font-size: clamp(3.2rem, 13vw, 4.4rem);
      font-style: italic; font-weight: 700; line-height: 0.95; margin-bottom: 22px;
      background: linear-gradient(160deg, #ffffff 30%, rgba(255,255,255,0.5) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
    }
    .glass-title span {
      background: linear-gradient(to right, var(--accent-gold), var(--primary-pink));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .separator {
      width: 50px; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
      margin: 0 auto 22px;
    }
    .sub-text {
      font-size: 0.85rem; letter-spacing: 3px; font-weight: 300;
      color: rgba(255, 255, 255, 0.82); margin-bottom: 38px;
      text-transform: uppercase; line-height: 1.5;
    }
    .nav-btn {
      display: inline-block; padding: 15px 36px; color: #fff; text-decoration: none;
      font-size: 0.82rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 50px; position: relative; overflow: hidden; cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .nav-btn:hover {
      transform: translateY(-2px); border-color: rgba(255,255,255,0.7);
      box-shadow: 0 14px 30px rgba(255,117,140,0.35); background: rgba(255,255,255,0.12);
    }

    /* HUD & Audio */
    .chapter-hud {
      position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 8px; z-index: 100;
      background: rgba(14, 8, 12, 0.65); padding: 7px 16px; border-radius: 30px;
      border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px);
      font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold);
    }
    .music-ctrl {
      position: fixed; top: 18px; right: 18px; z-index: 100;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      font-size: 14px; backdrop-filter: blur(10px); transition: 0.2s;
    }

    /* Polaroid */
    .polaroid-glass {
      width: 100%; max-width: 380px; background: rgba(255, 255, 255, 0.035);
      border-radius: 35px; padding: 22px 22px 28px; text-align: center;
      position: relative; backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.14);
    }
    .polaroid-img-wrap {
      width: 100%; aspect-ratio: 4/5; border-radius: 24px; overflow: hidden; position: relative;
      background: #000;
    }
    .polaroid-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .glass-frost {
      position: absolute; inset: 0; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.1); transition: all 1.8s ease; pointer-events: none;
    }

    /* 3D Heart */
    #heartCanvasContainer { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: auto; }
    .heart-ui { position: absolute; top: 12%; width: 100%; text-align: center; z-index: 10; pointer-events: none; padding: 0 20px; }
    .heart-ui .quote { font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; color: #e8c3bc; margin-bottom: 8px; line-height: 1.4; }
    .heart-ui h1 { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 500; letter-spacing: 2px; }
    .heart-ui h1 span { color: #dfaa9c; font-style: italic; }
    .heart-ui p { color: #a88b9a; font-size: 11.5px; margin-top: 6px; letter-spacing: 3px; text-transform: uppercase; }
    .heart-nav { position: absolute; bottom: 8%; left: 50%; transform: translateX(-50%); z-index: 20; }

    /* Scanner (Concentric Radar Rings - GPU Hardware Accelerated) */
    .scanner-container {
      position: relative; width: 160px; height: 160px; margin: 15px auto;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      user-select: none; -webkit-user-select: none;
      transform: translateZ(0);
    }
    .ring-pulse {
      position: absolute; border-radius: 50%;
      border: 1px solid rgba(255, 177, 153, 0.25);
      transform: translateZ(0);
      will-change: transform;
      pointer-events: none;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .ring-pulse.r1 { width: 156px; height: 156px; border-style: dashed; animation: rotateSlow 20s linear infinite; }
    .ring-pulse.r2 { width: 128px; height: 128px; border: 1px solid rgba(212, 175, 106, 0.3); animation: rotateSlow 14s linear infinite reverse; }
    .ring-pulse.r3 { width: 108px; height: 108px; border: 1px dashed rgba(255, 117, 140, 0.35); }
    
    .scanner-container.active .ring-pulse.r1 { border-color: rgba(255, 177, 153, 0.7); box-shadow: 0 0 16px rgba(255, 177, 153, 0.25); }
    .scanner-container.active .ring-pulse.r2 { border-color: var(--accent-gold); box-shadow: 0 0 16px rgba(212, 175, 106, 0.25); }
    .scanner-container.active .ring-pulse.r3 { border-color: var(--primary-pink); }

    .circle-outer {
      width: 138px; height: 138px; border-radius: 50%; border: 1.5px dashed rgba(255, 177, 153, 0.45);
      position: absolute; animation: rotateSlow 16s linear infinite; pointer-events: none;
      transform: translateZ(0); will-change: transform;
    }
    .scanner-container.active .circle-outer { border-color: rgba(255, 117, 140, 0.9); }
    
    .circle-inner-mask {
      width: 86px; height: 86px; border-radius: 50%; position: absolute; overflow: hidden;
      background: rgba(255, 255, 255, 0.04);
      border: 1.5px solid rgba(255, 255, 255, 0.25); pointer-events: none;
      box-shadow: inset 0 0 16px rgba(0,0,0,0.6);
      transform: translateZ(0);
    }
    .circle-liquid-fill {
      width: 100%; height: 100%;
      background: linear-gradient(to top, var(--primary-pink), var(--accent-gold));
      transform-origin: bottom center;
      transform: translateZ(0) scaleY(var(--scan-scale, 0));
      will-change: transform;
    }
    .scan-target-core {
      position: absolute; width: 44px; height: 44px; border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.4); pointer-events: none;
      box-shadow: 0 0 12px rgba(255, 177, 153, 0.3);
      transform: translateZ(0);
      transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
    .scanner-container.active .scan-target-core {
      border-color: #fff;
      box-shadow: 0 0 20px rgba(255, 177, 153, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.4);
      transform: translateZ(0) scale(1.1);
    }
    .scan-line {
      position: absolute; width: 130px; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
      bottom: 34px; opacity: 0; pointer-events: none;
      transform: translateZ(0) translateY(calc(var(--scan-scale, 0) * -72px));
      will-change: transform, opacity;
      transition: opacity 0.2s ease;
    }
    .scanner-container.active .scan-line { opacity: 1; }
    .progress-text { font-family: 'Space Mono', monospace; font-size: 1.3rem; color: var(--accent-gold); letter-spacing: 2px; margin-top: 14px; user-select:none; -webkit-user-select:none; }
    .instruction { font-size: 0.82rem; color: rgba(255,255,255,0.7); margin-top: 8px; letter-spacing: 2px; text-transform: uppercase; animation: pulse 2s infinite; user-select:none; -webkit-user-select:none; }

    /* Scratch Cards (Choose 1 Only with Lockout) */
    .stack-scratch { display: flex; flex-direction: column; gap: 16px; width: 100%; margin: 20px 0 25px; }
    .promise-card {
      position: relative; width: 100%; height: 130px; border-radius: 22px;
      background: rgba(255, 255, 255, 0.04); backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12); overflow: hidden;
      transition: transform 0.3s ease, border-color 0.3s ease, opacity 0.4s ease, filter 0.4s ease, box-shadow 0.3s ease;
    }
    .promise-card.chosen {
      border-color: rgba(212, 175, 106, 0.85);
      box-shadow: 0 0 25px rgba(212, 175, 106, 0.3);
      transform: scale(1.02);
    }
    .promise-card.disabled {
      opacity: 0.38;
      pointer-events: none;
      filter: grayscale(85%);
      transform: scale(0.96);
    }
    .gift-content {
      position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 16px;
    }
    .scratch-pad { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 10; touch-action: none; border-radius: 22px; }
    .card-lock-overlay {
      position: absolute; inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center;
      gap: 4px; z-index: 20; background: rgba(11, 12, 16, 0.82); backdrop-filter: blur(8px);
      color: rgba(255, 255, 255, 0.85); font-weight: 600; pointer-events: none;
      border-radius: 22px;
    }
    .promise-card.disabled .card-lock-overlay {
      display: flex;
    }

    /* 3D Carousel (Enhanced Smooth Rotation Physics & Navigation) */
    .carousel-wrap-3d {
      width: 100%; height: 100%; position: absolute; inset: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .carousel-scene {
      width: 180px; height: 260px; perspective: 1100px; position: relative; z-index: 5; margin-top: -20px;
      cursor: grab; user-select: none; -webkit-user-select: none; touch-action: pan-y;
    }
    .carousel-scene:active { cursor: grabbing; }
    .carousel-3d {
      width: 100%; height: 100%; position: absolute; transform-style: preserve-3d;
      transition: transform 0.15s ease-out;
    }
    .carousel-cell {
      position: absolute; width: 170px; height: 250px; left: 5px; top: 5px;
      border-radius: 18px; overflow: hidden; border: 1px solid rgba(223, 170, 156, 0.3);
      border-top: 1px solid rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px);
      box-shadow: 0 12px 35px rgba(0,0,0,0.85); opacity: 0.65; transition: opacity 0.4s ease, border-color 0.4s ease;
      user-select: none; -webkit-user-select: none; pointer-events: none;
    }
    .carousel-cell.active { opacity: 1; border-color: var(--accent-gold); box-shadow: 0 15px 45px rgba(255,177,153,0.3); }
    .carousel-cell img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      pointer-events: none; -webkit-user-drag: none; user-select: none;
    }
    .car-nav-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 42px; height: 42px; border-radius: 50%;
      background: rgba(20, 10, 16, 0.75); border: 1px solid rgba(255, 177, 153, 0.4);
      color: #fff; font-size: 24px; line-height: 1; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s ease; z-index: 30; backdrop-filter: blur(12px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }
    .car-nav-btn:hover {
      background: rgba(255, 177, 153, 0.25);
      border-color: var(--accent-gold);
      transform: translateY(-50%) scale(1.12);
    }
    .car-nav-btn.car-prev { left: -75px; }
    .car-nav-btn.car-next { right: -75px; }
    @media (max-width: 480px) {
      .car-nav-btn.car-prev { left: -52px; width: 38px; height: 38px; font-size: 20px; }
      .car-nav-btn.car-next { right: -52px; width: 38px; height: 38px; font-size: 20px; }
    }

    /* Candle */
    .candle-scene { display: flex; flex-direction: column; align-items: center; position: relative; margin: 20px 0; }
    .flame-box { position: relative; width: 40px; height: 60px; cursor: pointer; }
    .flame {
      width: 24px; height: 42px;
      background: linear-gradient(to top, #ff3300 0%, #ff9900 40%, #ffffcc 85%);
      border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%;
      position: absolute; bottom: 0; left: 8px; filter: drop-shadow(0 0 15px #ff6600);
      transform-origin: bottom center; animation: flicker 0.12s infinite alternate; transition: all 0.4s ease;
    }
    .wick { position: absolute; bottom: -8px; left: 18px; width: 4px; height: 12px; background: #222; }
    .stick { width: 34px; height: 120px; background: linear-gradient(to right, #e6e6e6, #fff, #ccc); border-radius: 4px 4px 0 0; margin-top: 8px; }

    /* Passcode */
    .terminal-card {
      width: 100%; max-width: 400px; background: rgba(10, 5, 8, 0.85);
      border-radius: 28px; padding: 40px 26px; border: 1px solid rgba(255, 255, 255, 0.15);
      text-align: center; position: relative;
    }
    .pass-input {
      width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 177, 153, 0.35);
      border-radius: 14px; padding: 14px; color: #fff; font-family: 'Space Mono', monospace;
      font-size: 1.2rem; text-align: center; letter-spacing: 6px; outline: none; margin: 18px 0;
    }

    /* Scene 10: The Masterpiece Glass Letter (from page9.html) */
    #sc10 {
      padding: 0; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth;
      align-items: stretch; justify-content: flex-start; flex-direction: column;
    }
    #petal-container {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 2; overflow: hidden;
    }
    .petal {
      position: absolute; top: -20px;
      background: linear-gradient(135deg, rgba(255, 177, 153, 0.4), rgba(255, 117, 140, 0.1));
      backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 15px 0px 15px 0px;
      box-shadow: 0 0 15px rgba(255, 117, 140, 0.2); animation: fall linear forwards;
    }
    @keyframes fall {
      to { transform: translateY(110vh) rotate(720deg) translateX(50px); }
    }
    .intro-screen {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 20px; position: relative; z-index: 10; flex-shrink: 0;
    }
    .intro-title {
      font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 12vw, 4.8rem);
      font-style: italic; font-weight: 700;
      background: linear-gradient(to right, #fff, var(--accent-gold));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 20px rgba(255, 177, 153, 0.4)); margin-bottom: 20px;
      opacity: 0; animation: slowFadeIn 2s ease forwards 0.5s;
    }
    .intro-sub {
      font-family: 'Space Mono', monospace; font-size: 0.8rem;
      letter-spacing: 6px; color: var(--primary-pink); text-transform: uppercase;
      opacity: 0; animation: slowFadeIn 2s ease forwards 1.2s;
    }
    .scroll-indicator {
      position: absolute; bottom: 40px; display: flex;
      flex-direction: column; align-items: center;
      opacity: 0; animation: slowFadeIn 2s ease forwards 2s;
    }
    .scroll-text {
      font-size: 0.6rem; letter-spacing: 5px; margin-bottom: 15px;
      color: rgba(255, 255, 255, 0.5); text-transform: uppercase;
    }
    .scroll-line {
      width: 1px; height: 50px;
      background: linear-gradient(to bottom, var(--accent-gold), transparent);
      animation: stretch 2s infinite ease-in-out;
    }
    .letter-wrapper {
      padding: 20px 20px 100px; position: relative; z-index: 10;
      width: 100%; display: flex; justify-content: center;
    }
    .glass-letter {
      max-width: 620px; width: 100%; background: var(--glass-bg);
      backdrop-filter: blur(25px) saturate(160%); -webkit-backdrop-filter: blur(25px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 40px;
      padding: 70px 32px 60px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 0 20px rgba(255,255,255,0.02);
      position: relative; overflow: hidden;
    }
    .glass-letter::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
      transform: skewX(-20deg); pointer-events: none;
    }
    .letter-block {
      margin-bottom: 45px; opacity: 1; transform: translateY(0);
      transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .letter-text {
      font-size: 1.05rem; line-height: 2; color: rgba(255, 255, 255, 0.88);
      font-weight: 300; text-align: center;
    }
    .letter-highlight {
      font-family: 'Playfair Display', serif; font-size: 1.25rem; font-style: italic; font-weight: 700;
      background: linear-gradient(to right, var(--accent-gold), var(--primary-pink));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 0 4px;
    }
    .signature-block {
      text-align: center; margin-top: 60px; padding-top: 45px;
      display: flex; flex-direction: column; align-items: center; position: relative;
    }
    .signature-block::before {
      content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 60px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
    }
    .flower-icon {
      width: 46px; height: 46px; margin-bottom: 22px;
      filter: drop-shadow(0 0 10px rgba(255, 177, 153, 0.45));
    }
    .signature-text {
      font-family: 'Playfair Display', serif; font-size: 2.3rem; font-style: italic; font-weight: 700;
      background: linear-gradient(160deg, #ffffff 30%, var(--primary-pink) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;
    }
    .signature-sub {
      font-size: 0.72rem; letter-spacing: 5px; color: rgba(255,255,255,0.45);
      text-transform: uppercase; margin-bottom: 25px;
    }

    @keyframes stretch {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      50.1% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
    @keyframes slowFadeIn { to { opacity: 1; } }

    @keyframes liquid {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
      67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    }
    @keyframes float { 0% { transform: translateY(0px); } 100% { transform: translateY(20px); } }
    @keyframes liquidSheen { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
    @keyframes rotateSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
    @keyframes flicker { 0% { transform: scale(1) rotate(-1deg); } 100% { transform: scale(1.05) rotate(2deg); } }
    @keyframes particleUp {
      0% { transform: translateY(100vh) scale(0); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateY(-10dvh) scale(0); opacity: 0; }
    }

    /* Floating Luxury Watermark Badge */
    .wc-watermark-badge {
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      z-index: 9999; display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 99px;
      background: rgba(11, 12, 16, 0.75);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(212, 175, 106, 0.35);
      color: rgba(245, 240, 230, 0.85); text-decoration: none;
      font-size: 11px; letter-spacing: 0.4px; font-weight: 500;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none; -webkit-user-select: none;
    }
    .wc-watermark-badge:hover {
      background: rgba(11, 12, 16, 0.92);
      border-color: var(--accent-gold);
      color: #fff;
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6), 0 0 16px rgba(212, 175, 106, 0.3);
    }
    .wc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--accent-gold);
      box-shadow: 0 0 8px var(--accent-gold);
      animation: pulse 2s ease-in-out infinite;
    }
    .wc-badge-brand {
      font-weight: 700; color: var(--accent-gold); letter-spacing: 0.5px;
    }
    .wc-badge-arrow {
      font-size: 10px; opacity: 0.6; transition: transform 0.2s ease;
    }
    .wc-watermark-badge:hover .wc-badge-arrow {
      transform: translate(1px, -1px);
      opacity: 1;
    }
    @media (max-width: 480px) {
      .wc-watermark-badge { bottom: 12px; font-size: 10.5px; padding: 5px 12px; }
    }


    /* Floating Luxury Watermark Badge */
    .wc-watermark-badge {
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      z-index: 9999; display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 99px;
      background: rgba(11, 12, 16, 0.75);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(212, 175, 106, 0.35);
      color: rgba(245, 240, 230, 0.85); text-decoration: none;
      font-size: 11px; letter-spacing: 0.4px; font-weight: 500;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none; -webkit-user-select: none;
    }
    .wc-watermark-badge:hover {
      background: rgba(11, 12, 16, 0.92);
      border-color: var(--accent-gold);
      color: #fff;
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6), 0 0 16px rgba(212, 175, 106, 0.3);
    }
    .wc-badge-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--accent-gold);
      box-shadow: 0 0 8px var(--accent-gold);
      animation: pulse 2s ease-in-out infinite;
    }
    .wc-badge-brand {
      font-weight: 700; color: var(--accent-gold); letter-spacing: 0.5px;
    }
    .wc-badge-arrow {
      font-size: 10px; opacity: 0.6; transition: transform 0.2s ease;
    }
    .wc-watermark-badge:hover .wc-badge-arrow {
      transform: translate(1px, -1px);
      opacity: 1;
    }
    @media (max-width: 480px) {
      .wc-watermark-badge { bottom: 12px; font-size: 10.5px; padding: 5px 12px; }
    }

  </style>
</head>
<body>
  <div class="bg-container" id="bgLayer">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </div>

  <audio id="bgAudio" loop src="Blackmagic Resolve/freesound_community-heart-beat-6797.mp3"></audio>
  <div class="music-ctrl" id="musicToggle" title="Sound">🎵</div>

  <div class="chapter-hud" id="chapterHud">
    <span>EDITION 01</span> // <span id="chapterName">PREMIERE</span>
  </div>

  <!-- Scene 1: Premiere Intro -->
  <div class="scene-wrap active" id="sc1">
    <div class="glass-card">
      <p class="top-label">EDITION 01 // PREMIERE</p>
      <h1 class="glass-title">` + escapeHtml(firstName) + `<br><span>` + escapeHtml(restName) + `.</span></h1>
      <div class="separator"></div>
      <p class="sub-text">` + escapeHtml(c.tagline) + `</p>
      <button class="nav-btn" onclick="nextScene(2)">START JOURNEY →</button>
    </div>
  </div>

  <!-- Scene 2: Polaroid Memory -->
  <div class="scene-wrap" id="sc2">
    <div class="polaroid-glass">
      <div class="polaroid-img-wrap">
        <img src="` + escapeHtml(primaryPhoto) + `" alt="Memory" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80'">
        <div class="glass-frost" id="frost"></div>
      </div>
      <div class="caption-area" style="margin:16px 0;">
        <p style="font-size:0.7rem; letter-spacing:3px; color:var(--accent-gold); text-transform:uppercase;">Chapter 02 // Memory</p>
        <h2 style="font-family:'Playfair Display',serif; font-size:1.8rem; font-style:italic;">` + escapeHtml(c.polaroidCaption || "Pure Grace.") + `</h2>
      </div>
      <button class="nav-btn" onclick="nextScene(3)">Continue →</button>
    </div>
  </div>

  <!-- Scene 3: Affection Quote -->
  <div class="scene-wrap" id="sc3">
    <div class="glass-card">
      <p class="top-label">Chapter 03 // Affection</p>
      <div style="font-family:'Playfair Display',serif; font-size:4rem; color:rgba(255,177,153,0.35); line-height:0.5; margin:10px 0 20px;">“</div>
      <h2 style="font-family:'Playfair Display',serif; font-size:1.6rem; font-style:italic; line-height:1.5; margin-bottom:20px;">
        ` + escapeHtml(c.quote) + `
      </h2>
      <div class="separator"></div>
      <button class="nav-btn" onclick="nextScene(4)">Step Deeper →</button>
    </div>
  </div>

  <!-- Scene 4: 3D Heart Chamber -->
  <div class="scene-wrap" id="sc4">
    <div id="heartCanvasContainer"></div>
    <div class="heart-ui">
      <div class="quote">` + escapeHtml(c.heartQuote || "Side by side or miles apart,\nwe are always connected by the heart.").replace(/\n/g, '<br>') + `</div>
      <h1><span class="highlight">` + escapeHtml(c.heartTitle || "The Reserved Chamber") + `</span></h1>
      <p>Held forever in orbit</p>
    </div>
    <div class="heart-nav">
      <button class="nav-btn" onclick="nextScene(5)">Enter The Gate →</button>
    </div>
  </div>

  <!-- Scene 5: Biometric Scanner (Concentric Rings) -->
  <div class="scene-wrap" id="sc5">
    <div class="glass-card">
      <p class="top-label">Security // Biometric Identity</p>
      <div class="scanner-container" id="scanner" style="touch-action:none; -webkit-touch-callout:none; -webkit-user-select:none; user-select:none;">
        <div class="ring-pulse r1"></div>
        <div class="ring-pulse r2"></div>
        <div class="ring-pulse r3"></div>
        <div class="circle-outer"></div>
        <div class="circle-inner-mask">
          <div class="circle-liquid-fill"></div>
        </div>
        <div class="scan-target-core"></div>
        <div class="scan-line"></div>
      </div>
      <div class="progress-text" id="bioProg">00%</div>
      <div class="instruction" id="bioInst">HOLD THUMB TO CONFIRM</div>
      <div id="bioSuccess" style="display:none; margin-top:18px;">
        <button class="nav-btn" onclick="nextScene(6)">Access Granted →</button>
      </div>
    </div>
  </div>

  <!-- Scene 6: Scratch Cards (Choose 1 Treat) -->
  <div class="scene-wrap" id="sc6">
    <div class="glass-card">
      <p class="top-label">Interactive // A Promise</p>
      <h2 style="font-family:'Playfair Display',serif; font-style:italic; font-size:1.7rem; margin-bottom:4px;">Unveil Your Treat</h2>
      <p style="font-size:11px; color:rgba(255,255,255,0.7); letter-spacing:2px; text-transform:uppercase;" id="scratchInst">Scratch to choose 1 of the 2 treats</p>
      <div class="stack-scratch">
        <div class="promise-card" id="card1">
          <div class="gift-content">
            <div style="font-size:24px; margin-bottom:2px;">🛍️</div>
            <div style="font-family:'Playfair Display',serif; font-weight:700; font-size:1.25rem; color:#ffb199;">` + escapeHtml(c.treat1Title || "Shopping Spree!") + `</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.75);">` + escapeHtml(c.treat1Desc || "My treat. Pick your favorites.") + `</div>
            <div class="card-status-badge" id="badge1" style="display:none; margin-top:6px; font-size:10px; font-weight:700; letter-spacing:2px; color:var(--accent-gold); text-transform:uppercase;">✨ Chosen Treat ✨</div>
          </div>
          <canvas class="scratch-pad" id="canv1"></canvas>
          <div class="card-lock-overlay" id="lock1">
            <span style="font-size:22px;">🔒</span>
            <span style="font-size:11px; letter-spacing:2px;">OPTION LOCKED</span>
            <span style="font-size:9.5px; opacity:0.7; letter-spacing:1px; text-transform:none;">(Only 1 treat can be chosen)</span>
          </div>
        </div>
        <div class="promise-card" id="card2">
          <div class="gift-content">
            <div style="font-size:24px; margin-bottom:2px;">🍽️</div>
            <div style="font-family:'Playfair Display',serif; font-weight:700; font-size:1.25rem; color:#ffb199;">` + escapeHtml(c.treat2Title || "Royal Dinner!") + `</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.75);">` + escapeHtml(c.treat2Desc || "Your favorite restaurant, anytime.") + `</div>
            <div class="card-status-badge" id="badge2" style="display:none; margin-top:6px; font-size:10px; font-weight:700; letter-spacing:2px; color:var(--accent-gold); text-transform:uppercase;">✨ Chosen Treat ✨</div>
          </div>
          <canvas class="scratch-pad" id="canv2"></canvas>
          <div class="card-lock-overlay" id="lock2">
            <span style="font-size:22px;">🔒</span>
            <span style="font-size:11px; letter-spacing:2px;">OPTION LOCKED</span>
            <span style="font-size:9.5px; opacity:0.7; letter-spacing:1px; text-transform:none;">(Only 1 treat can be chosen)</span>
          </div>
        </div>
      </div>
      <button class="nav-btn" onclick="nextScene(7)">View Gallery →</button>
    </div>
  </div>

  <!-- Scene 7: 3D Memory Carousel -->
  <div class="scene-wrap" id="sc7">
    <div class="carousel-wrap-3d">
      <div style="text-align:center; z-index:10; margin-bottom:16px;">
        <p class="top-label">Chapter 07 // Archives</p>
        <h2 style="font-family:'Playfair Display',serif; font-size:2rem; font-style:italic;">Living Moments</h2>
        <p style="font-size:11px; color:var(--accent-gold); letter-spacing:3px; text-transform:uppercase;">Drag or use arrows to explore memories</p>
      </div>
      <div class="carousel-scene" id="carScene">
        <button class="car-nav-btn car-prev" id="carPrevBtn" title="Previous memory" aria-label="Previous memory">‹</button>
        <div class="carousel-3d" id="carousel3D"></div>
        <button class="car-nav-btn car-next" id="carNextBtn" title="Next memory" aria-label="Next memory">›</button>
      </div>
      <div style="z-index:20; margin-top:28px;">
        <button class="nav-btn" onclick="nextScene(8)">Make A Wish →</button>
      </div>
    </div>
  </div>

  <!-- Scene 8: Candle Blowout -->
  <div class="scene-wrap" id="sc8">
    <div class="glass-card">
      <p class="top-label">Chapter 08 // Ceremony</p>
      <h2 style="font-family:'Playfair Display',serif; font-size:1.7rem; font-style:italic; margin-bottom:6px;">Make A Silent Wish</h2>
      <p style="font-size:11px; color:rgba(255,255,255,0.7); letter-spacing:2px; text-transform:uppercase;">Tap flame or swipe down</p>
      <div class="candle-scene">
        <div class="flame-box" id="candleBox">
          <div class="flame" id="flameEl"></div>
          <div class="wick"></div>
        </div>
        <div class="stick"></div>
      </div>
      <div id="candleSuccess" style="display:none; margin-top:14px;">
        <h1 style="font-family:'Playfair Display',serif; font-style:italic; font-size:2rem; background:linear-gradient(to right,#fff,var(--primary-pink)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:10px;">` + escapeHtml(c.wishMessage || "May Every Dream Flourish") + `</h1>
        <button class="nav-btn" onclick="nextScene(9)">Unlock Vault Gate →</button>
      </div>
    </div>
  </div>

  <!-- Scene 9: Terminal Passcode -->
  <div class="scene-wrap" id="sc9">
    <div class="terminal-card" id="termBox">
      <p class="top-label">Chapter 09 // Vault Access</p>
      <h2 style="font-family:'Playfair Display',serif; font-size:1.6rem; font-style:italic;">Secret Passcode</h2>
      <p style="font-size:11px; color:rgba(255,255,255,0.65); margin-top:6px;">Hint: ` + escapeHtml(c.hint || "The secret key") + `</p>
      <input type="password" id="passInp" class="pass-input" placeholder="PASSCODE" maxlength="12" autocomplete="off">
      <div id="passStat" style="font-size:12px; min-height:18px; margin-bottom:12px; color:var(--accent-gold); letter-spacing:2px;"></div>
      <button class="nav-btn" onclick="checkPass()">Verify & Decrypt →</button>
    </div>
  </div>

  <!-- Scene 10: Letter Scroll (Fidelity to page9.html) -->
  <div class="scene-wrap" id="sc10">
    <div id="petal-container"></div>

    <section class="intro-screen">
      <h1 class="intro-title">Dear ` + escapeHtml(firstName) + `,</h1>
      <p class="intro-sub">Access Granted</p>
      <div class="scroll-indicator">
        <span class="scroll-text">SCROLL</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <div class="letter-wrapper">
      <main class="glass-letter">
        <div class="letter-block">
          <p class="letter-text">` + escapeHtml(c.letter1) + `</p>
        </div>
        <div class="letter-block">
          <p class="letter-text">` + escapeHtml(c.letter2) + `</p>
        </div>
        <div class="letter-block">
          <p class="letter-text">` + escapeHtml(c.letter3) + `</p>
        </div>
        <div class="letter-block">
          <p class="letter-text">` + escapeHtml(c.letter4) + `</p>
        </div>
        <div class="letter-block signature-block">
          <svg class="flower-icon" viewBox="0 0 24 24" fill="none" stroke="url(#goldPink)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <defs>
              <linearGradient id="goldPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffb199" />
                <stop offset="100%" stop-color="#ff758c" />
              </linearGradient>
            </defs>
            <path d="M12 22c-4-4-8-9-8-14a8 8 0 1 1 16 0c0 5-4 10-8 14z"></path>
            <path d="M12 22c-2-4-4-9-4-14a4 4 0 1 1 8 0c0 5-2 10-4 14z"></path>
            <path d="M12 14c-1-2-2-4-2-6a2 2 0 1 1 4 0c0 2-1 4-2 6z"></path>
          </svg>
          <h2 class="signature-text">` + escapeHtml(c.occasion) + `</h2>
          <p class="signature-sub">` + escapeHtml(c.sender || "Forever Yours") + `</p>
          <button class="nav-btn" style="margin-top: 15px;" onclick="replayJourney()">↺ Replay Journey</button>
        </div>
      </main>
    </div>
  </div>

  ` + (c.showWatermark !== false ? `
  <!-- WishCraft Watermark Sentinel (Self-Healing Anti-Tamper Guard) -->
  <a href="https://wishcraft-12.netlify.app/" target="_blank" rel="noopener" class="wc-watermark-badge" id="wcWatermarkBadge" title="Craft your own interactive experience on WishCraft">
    <span class="wc-badge-dot"></span>
    <span>Crafted with <span class="wc-badge-brand">WishCraft</span></span>
    <span class="wc-badge-arrow">↗</span>
  </a>` : '') + `

  <` + `script>
    ` + (c.showWatermark !== false ? `
    // Anti-Tamper Self-Healing Watermark Sentinel
    (function() {
      const BADGE_ID = 'wcWatermarkBadge';
      const BRAND_URL = 'https://wishcraft-12.netlify.app/';
      function createBadgeEl() {
        const b = document.createElement('a');
        b.id = BADGE_ID;
        b.href = BRAND_URL;
        b.target = '_blank';
        b.rel = 'noopener';
        b.className = 'wc-watermark-badge';
        b.title = 'Craft your own interactive experience on WishCraft';
        b.innerHTML = '<span class="wc-badge-dot"></span><span>Crafted with <span class="wc-badge-brand">WishCraft</span></span><span class="wc-badge-arrow">↗</span>';
        return b;
      }
      function verifyWatermark() {
        let b = document.getElementById(BADGE_ID) || document.querySelector('.wc-watermark-badge');
        if (!b) {
          b = createBadgeEl();
          document.body.appendChild(b);
        }
        try {
          const comp = window.getComputedStyle(b);
          if (comp.display === 'none' || comp.visibility === 'hidden' || parseFloat(comp.opacity || '1') < 0.2) {
            b.style.setProperty('display', 'inline-flex', 'important');
            b.style.setProperty('visibility', 'visible', 'important');
            b.style.setProperty('opacity', '1', 'important');
            b.style.setProperty('position', 'fixed', 'important');
            b.style.setProperty('bottom', '16px', 'important');
            b.style.setProperty('z-index', '999999', 'important');
          }
        } catch(e) {}
      }
      if (typeof MutationObserver !== 'undefined') {
        const obs = new MutationObserver(() => verifyWatermark());
        obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'] });
      }
      setInterval(verifyWatermark, 3000);
    })();
    ` : '') + `
    const CORRECT_CODE = "` + escapeHtml(c.passcode || "2026") + `";
    const CHAPTER_NAMES = {1:"PREMIERE", 2:"MEMORY", 3:"AFFECTION", 4:"VENTRICLE", 5:"BIOMETRIC", 6:"PROMISES", 7:"ARCHIVES", 8:"WISH", 9:"SECURITY", 10:"THE LETTER"};
    let cur = 1;

    window.nextScene = function(n) {
      try {
        const oldSc = document.getElementById('sc' + cur);
        const newSc = document.getElementById('sc' + n);
        if(!newSc) return;
        if(oldSc) oldSc.classList.remove('active');
        newSc.classList.add('active');
        cur = n;
        const chName = document.getElementById('chapterName');
        if (chName) chName.textContent = CHAPTER_NAMES[n] || "JOURNEY";
        trySound();

        if(n === 2) {
          setTimeout(() => {
            const f = document.getElementById('frost');
            if(f) { f.style.backdropFilter = 'blur(0px)'; f.style.webkitBackdropFilter = 'blur(0px)'; f.style.background = 'transparent'; }
          }, 500);
        }
        if(n === 4 && typeof initHeart === 'function') initHeart();
        if(n === 6 && typeof initScratch === 'function') initScratch();
        if(n === 7 && typeof initCar === 'function') initCar();
        if(n === 10 && typeof initScene10Petals === 'function') initScene10Petals();
      } catch (err) {
        console.warn("Scene transition warning:", err);
      }
    };
    function nextScene(n) { return window.nextScene(n); }

    // Audio
    const aud = document.getElementById('bgAudio');
    const mBtn = document.getElementById('musicToggle');
    let audOn = false;
    function trySound() {
      try {
        if(!audOn && aud && typeof aud.play === 'function') {
          const p = aud.play();
          if(p && typeof p.then === 'function') {
            p.then(() => { audOn = true; if(mBtn) mBtn.textContent = '🔊'; }).catch(() => {});
          }
        }
      } catch(e) {}
    }
    if(mBtn && aud) {
      mBtn.addEventListener('click', () => {
        if(aud.paused) { aud.play(); mBtn.textContent = '🔊'; audOn = true; }
        else { aud.pause(); mBtn.textContent = '🔈'; }
      });
    }

    // Background particles
    const bg = document.getElementById('bgLayer');
    for(let i=0; i<16; i++){
      const p = document.createElement('div');
      p.className = 'particles';
      p.style.left = (Math.random()*100) + 'vw';
      p.style.animationDuration = (Math.random()*4 + 4) + 's';
      p.style.animationDelay = (Math.random()*5) + 's';
      bg.appendChild(p);
    }

    // Scanner logic (High-Performance GPU-Driven RAF Engine)
    let bVal = 0; // 0 to 100
    let bDone = false;
    let scanAnimId = null;
    let drainAnimId = null;
    let lastScanTime = 0;

    const bProg = document.getElementById('bioProg');
    const bInst = document.getElementById('bioInst');
    const bSucc = document.getElementById('bioSuccess');
    const scan = document.getElementById('scanner');

    function updateScanVisuals(val) {
      if (bProg) bProg.textContent = Math.round(val).toString().padStart(2, '0') + '%';
      if (scan) {
        const scale = (val / 100).toFixed(4);
        scan.style.setProperty('--scan-scale', scale);
      }
    }

    function doScan(e) {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      if (bDone) return;

      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }

      trySound();
      if (scan) scan.classList.add('active');
      if (bInst) {
        bInst.textContent = "SCANNING BIOMETRICS...";
        bInst.style.color = "var(--accent-gold)";
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(30); } catch(_) {}
      }

      lastScanTime = performance.now();
      function scanStep(now) {
        const dt = Math.min((now - lastScanTime) / 1000, 0.08);
        lastScanTime = now;
        bVal += dt * 58; // Smooth ~1.7s progression to 100%

        if (bVal >= 100) {
          bVal = 100;
          bDone = true;
          updateScanVisuals(100);
          if (scan) scan.classList.remove('active');
          if (bInst) {
            bInst.textContent = "IDENTITY CONFIRMED // ACCESS GRANTED";
            bInst.style.color = "var(--success-green)";
          }
          if (bSucc) bSucc.style.display = 'block';
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate([40, 30, 80]); } catch(_) {}
          }
          scanAnimId = null;
          return;
        }

        updateScanVisuals(bVal);
        scanAnimId = requestAnimationFrame(scanStep);
      }
      scanAnimId = requestAnimationFrame(scanStep);
    }

    function stopScan(e) {
      if (bDone) return;
      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }

      if (scan) scan.classList.remove('active');
      if (bInst) {
        bInst.textContent = "HOLD THUMB TO CONFIRM";
        bInst.style.color = "rgba(255,255,255,0.7)";
      }

      lastScanTime = performance.now();
      function drainStep(now) {
        const dt = Math.min((now - lastScanTime) / 1000, 0.08);
        lastScanTime = now;
        bVal -= dt * 110; // Smooth ~0.9s drain
        if (bVal <= 0) {
          bVal = 0;
          updateScanVisuals(0);
          drainAnimId = null;
          return;
        }
        updateScanVisuals(bVal);
        drainAnimId = requestAnimationFrame(drainStep);
      }
      drainAnimId = requestAnimationFrame(drainStep);
    }

    if (scan) {
      scan.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });

      scan.addEventListener('pointerdown', (e) => {
        if (e.cancelable) e.preventDefault();
        doScan(e);
      });

      scan.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        doScan(e);
      }, { passive: false });

      window.addEventListener('pointerup', stopScan);
      window.addEventListener('pointercancel', stopScan);
      window.addEventListener('touchend', stopScan);
      window.addEventListener('touchcancel', stopScan);
      window.addEventListener('mouseup', stopScan);
    }

    // 3D Heart
    let hInited = false;
    function initHeart() {
      if(hInited) return; hInited = true;
      const wrap = document.getElementById('heartCanvasContainer');
      if(!wrap || typeof THREE === 'undefined') return;
      const sc = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
      cam.position.set(0, 0, 4.8);
      const ren = new THREE.WebGLRenderer({ antialias:true, alpha:true });
      ren.setSize(window.innerWidth, window.innerHeight);
      wrap.appendChild(ren.domElement);
      const ctrl = new THREE.OrbitControls(cam, ren.domElement);
      ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 1.4;

      const nVerts = [], gVerts = [];
      for(let i=0; i<45000; i++){
        let x = (Math.random()-0.5)*2.8, y = (Math.random()-0.5)*2.8, z = (Math.random()-0.5)*2.8;
        let a = x*x + 2.25*y*y + z*z - 1;
        if(a*a*a - x*x*z*z*z - 0.1125*y*y*z*z*z < 0){
          if(x>0 && y<0) gVerts.push(x,z,y); else nVerts.push(x,z,y);
        }
      }
      const nG = new THREE.BufferGeometry(); nG.setAttribute('position', new THREE.Float32BufferAttribute(nVerts,3));
      const gG = new THREE.BufferGeometry(); gG.setAttribute('position', new THREE.Float32BufferAttribute(gVerts,3));
      const nHeart = new THREE.Points(nG, new THREE.PointsMaterial({color:0x9b4d6e, size:0.015, transparent:true, opacity:0.55}));
      const gHeart = new THREE.Points(gG, new THREE.PointsMaterial({color:0xffb199, size:0.026, transparent:true, opacity:1.0}));
      const grp = new THREE.Group(); grp.add(nHeart); grp.add(gHeart); sc.add(grp);

      const clk = new THREE.Clock();
      function animH() {
        requestAnimationFrame(animH);
        const t = clk.getElapsedTime();
        const ph = t % 1.0;
        const p = Math.exp(-Math.pow((ph-0.1)*20, 2)) + Math.exp(-Math.pow((ph-0.35)*20, 2))*0.5;
        nHeart.scale.setScalar(1.3 + p*0.03); gHeart.scale.setScalar(1.3 + p*0.12);
        grp.position.y = -0.4 + Math.sin(t*1.5)*0.08;
        ctrl.update(); ren.render(sc, cam);
      }
      animH();
    }

    // Scratch (Choose 1 Treat with Auto-Lockout of Second Option)
    let chosenCard = null; // 1 or 2
    let scratchInited = false;

    function initScratch() {
      if (scratchInited) return;
      scratchInited = true;

      ['canv1', 'canv2'].forEach((id, idx) => {
        const cardNum = idx + 1; // 1 or 2
        const otherCardNum = cardNum === 1 ? 2 : 1;
        const c = document.getElementById(id);
        const cardEl = document.getElementById('card' + cardNum);
        const otherCardEl = document.getElementById('card' + otherCardNum);
        const badge = document.getElementById('badge' + cardNum);
        if (!c) return;

        const ctx = c.getContext('2d');
        if (!ctx) return;

        function renderCover() {
          const w = c.clientWidth || 320;
          const h = c.clientHeight || 130;
          c.width = w;
          c.height = h;

          ctx.globalCompositeOperation = 'source-over';
          const gr = ctx.createLinearGradient(0, 0, w, h);
          gr.addColorStop(0, "rgba(235, 210, 220, 0.96)");
          gr.addColorStop(0.5, "rgba(215, 175, 195, 0.96)");
          gr.addColorStop(1, "rgba(180, 140, 160, 0.96)");
          ctx.fillStyle = gr;
          ctx.fillRect(0, 0, w, h);

          // Subtle decorative pinstripes
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1;
          if (typeof ctx.moveTo === 'function') {
            for (let x = -h; x < w + h; x += 18) {
              ctx.beginPath();
              ctx.moveTo(x, 0);
              ctx.lineTo(x + h, h);
              ctx.stroke();
            }
          }

          if (typeof ctx.fillText === 'function') {
            ctx.fillStyle = "#5a3a46";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("✦ SCRATCH TO CLAIM ✦", w / 2, h / 2 + 4);
          }
        }

        renderCover();
        c.__drawCover = renderCover;
        c.__scratchedCount = 0;
        c.__cleared = false;

        let scratching = false;

        function pickThisCard() {
          if (chosenCard === null) {
            chosenCard = cardNum;
            if (cardEl) cardEl.classList.add('chosen');
            if (badge) badge.style.display = 'block';
            if (otherCardEl) otherCardEl.classList.add('disabled');
            const sInst = document.getElementById('scratchInst');
            if (sInst) sInst.textContent = "You chose Option " + cardNum + " — scratch to reveal!";
          }
        }

        function scratch(e) {
          if (!scratching) return;
          if (chosenCard !== null && chosenCard !== cardNum) return; // Disallow scratching disabled card

          pickThisCard();

          const r = c.getBoundingClientRect();
          const clientX = e.clientX || (e.touches && e.touches[0].clientX);
          const clientY = e.clientY || (e.touches && e.touches[0].clientY);
          if (clientX === undefined || clientY === undefined) return;

          const x = clientX - r.left;
          const y = clientY - r.top;

          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(x, y, 22, 0, Math.PI * 2);
          ctx.fill();

          c.__scratchedCount++;
          if (c.__scratchedCount > 24 && !c.__cleared) {
            c.__cleared = true;
            c.style.transition = 'opacity 0.45s ease';
            c.style.opacity = '0';
            setTimeout(() => { c.style.pointerEvents = 'none'; }, 450);
            if (badge) {
              badge.textContent = "✨ REVEALED & CLAIMED ✨";
              badge.style.color = "var(--success-green)";
            }
          }
        }

        function onStart(e) {
          if (chosenCard !== null && chosenCard !== cardNum) return;
          if (e.cancelable) e.preventDefault();
          scratching = true;
          pickThisCard();
          scratch(e);
        }

        function onEnd() {
          scratching = false;
        }

        c.addEventListener('mousedown', onStart);
        c.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', onEnd);

        c.addEventListener('touchstart', onStart, { passive: false });
        c.addEventListener('touchmove', scratch, { passive: false });
        window.addEventListener('touchend', onEnd);
      });
    }

    // Carousel 3D
    function initCar() {
    // 3D Carousel (Strict 6 Memory Slots with Smooth Physics & Auto-Orbit)
    const car = document.getElementById("carousel3D");
    if (car) {
      const imgs = ` + JSON.stringify(finalPhotos) + `;
      const count = 6;
      const radius = 230; // Optimal 3D depth for 6 cards

      imgs.forEach((src, idx) => {
        const d = document.createElement("div");
        d.className = "carousel-cell" + (idx === 0 ? " active" : "");
        const ang = (360 / count) * idx;
        d.style.transform = "rotateY(" + ang + "deg) translateZ(" + radius + "px)";
        const cellImg = document.createElement("img");
        cellImg.src = src;
        cellImg.alt = "Memory";
        d.appendChild(cellImg);
        car.appendChild(d);
      });

      let a = 0, sx = 0, drag = false, autoSpin = true;
      function upd() {
        const norm = ((-a % 360) + 360) % 360;
        const act = Math.round(norm / (360 / count)) % count;
        car.querySelectorAll(".carousel-cell").forEach((el, i) => el.classList.toggle("active", i === act));
      }
      function applyAngle(deg) {
        window.__carApplyAngle = applyAngle;
        a = deg;
        car.style.transform = "translateZ(-" + radius + "px) rotateY(" + a + "deg)";
        upd();
      }

      const sceneEl = document.getElementById("carScene") || car.parentElement;
      sceneEl.addEventListener("mousedown", e => {
        if (e.target.closest(".car-nav-btn")) return;
        drag = true; sx = e.clientX; autoSpin = false;
      });
      window.addEventListener("mousemove", e => {
        if (!drag) return;
        a += (e.clientX - sx) * 0.75;
        sx = e.clientX;
        applyAngle(a);
      });
      window.addEventListener("mouseup", () => {
        if (drag) {
          drag = false;
          setTimeout(() => { autoSpin = true; }, 2500);
        }
      });
      sceneEl.addEventListener("touchstart", e => {
        if (e.target.closest(".car-nav-btn")) return;
        drag = true; sx = e.touches[0].clientX; autoSpin = false;
      }, { passive: true });
      window.addEventListener("touchmove", e => {
        if (!drag) return;
        a += (e.touches[0].clientX - sx) * 0.75;
        sx = e.touches[0].clientX;
        applyAngle(a);
      }, { passive: true });
      window.addEventListener("touchend", () => {
        if (drag) {
          drag = false;
          setTimeout(() => { autoSpin = true; }, 2500);
        }
      });

      const prevBtn = document.getElementById("carPrevBtn");
      const nextBtn = document.getElementById("carNextBtn");
      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          autoSpin = false;
          applyAngle(a + 60);
          setTimeout(() => { autoSpin = true; }, 3000);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          autoSpin = false;
          applyAngle(a - 60);
          setTimeout(() => { autoSpin = true; }, 3000);
        });
      }

      // Smooth idle floating auto-orbit
      let lastTime = performance.now();
      function spinLoop(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        if (cur === 7 && autoSpin && !drag) {
          a -= 8 * dt; // Gentle 8 degrees per second continuous rotation
          car.style.transform = "translateZ(-" + radius + "px) rotateY(" + a + "deg)";
          upd();
        }
        requestAnimationFrame(spinLoop);
      }
      requestAnimationFrame(spinLoop);
      applyAngle(0);
    }
  }

    // Candle
    const cBox = document.getElementById('candleBox');
    const fl = document.getElementById('flameEl');
    const cSucc = document.getElementById('candleSuccess');
    let blown = false;
    window.blow = function() {
      if(blown) return; blown = true;
      if(fl) { fl.style.transform = 'scale(0)'; fl.style.opacity = '0'; }
      setTimeout(() => { if(cSucc) cSucc.style.display = 'block'; }, 400);
    };
    function blow() { return window.blow(); }
    if(cBox) cBox.addEventListener('click', blow);
    let sy = 0;
    window.addEventListener('touchstart', e => sy = e.touches[0].clientY, {passive:true});
    window.addEventListener('touchend', e => { if(cur === 8 && !blown && e.changedTouches[0].clientY - sy > 50) blow(); });

    // Passcode
    window.checkPass = function() {
      const inp = document.getElementById('passInp');
      const st = document.getElementById('passStat');
      const bx = document.getElementById('termBox');
      if(!inp || !st) return;
      if(inp.value.trim() === CORRECT_CODE) {
        st.style.color = "var(--success-green)";
        st.textContent = "ACCESS GRANTED // DECRYPTING...";
        setTimeout(() => window.nextScene(10), 900);
      } else {
        st.style.color = "var(--error-red)";
        st.textContent = "ACCESS DENIED";
        if (bx && typeof bx.animate === 'function') {
          bx.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}], {duration:300});
        }
      }
    };
    function checkPass() { return window.checkPass(); }
    const pInp = document.getElementById('passInp');
    if(pInp) pInp.addEventListener('keydown', e => { if(e.key === 'Enter') checkPass(); });

    // Scene 10 Falling Glass Petals (from page9.html)
    let petalInterval = null;
    function initScene10Petals() {
      const container = document.getElementById('petal-container');
      if (!container || petalInterval) return;
      function createPetal() {
        if (cur !== 10) return;
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 10 + 10;
        petal.style.width = size + 'px';
        petal.style.height = (size * 1.2) + 'px';
        petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
        petal.style.opacity = Math.random() * 0.4 + 0.2;
        container.appendChild(petal);
        setTimeout(() => { petal.remove(); }, 12000);
      }
      petalInterval = setInterval(createPetal, 500);
    }

    // Full Journey Replay & State Reset
    window.replayJourney = function() {
      // 1. Reset Biometric Scanner (Scene 5)
      bDone = false;
      bVal = 0;
      if (scanAnimId) { cancelAnimationFrame(scanAnimId); scanAnimId = null; }
      if (drainAnimId) { cancelAnimationFrame(drainAnimId); drainAnimId = null; }
      updateScanVisuals(0);
      if (scan) scan.classList.remove('active');
      if (bProg) bProg.textContent = '00%';
      if (bInst) {
        bInst.textContent = "HOLD THUMB TO CONFIRM";
        bInst.style.color = "rgba(255,255,255,0.7)";
      }
      if (bSucc) bSucc.style.display = 'none';

      // 2. Reset Scratch Cards (Scene 6)
      chosenCard = null;
      ['card1', 'card2'].forEach(cid => {
        const el = document.getElementById(cid);
        if (el) el.classList.remove('chosen', 'disabled');
      });
      ['badge1', 'badge2'].forEach(bid => {
        const b = document.getElementById(bid);
        if (b) {
          b.style.display = 'none';
          b.textContent = "✨ Chosen Treat ✨";
          b.style.color = "var(--accent-gold)";
        }
      });
      const sInst = document.getElementById('scratchInst');
      if (sInst) sInst.textContent = "Scratch to choose 1 of the 2 treats";
      ['canv1', 'canv2'].forEach(id => {
        const c = document.getElementById(id);
        if (c) {
          c.style.transition = 'none';
          c.style.opacity = '1';
          c.style.pointerEvents = 'auto';
          c.__cleared = false;
          c.__scratchedCount = 0;
          if (typeof c.__drawCover === 'function') c.__drawCover();
        }
      });

      // 3. Reset 3D Carousel (Scene 7)
      if (typeof window.__carApplyAngle === 'function') {
        window.__carApplyAngle(0);
      }

      // 4. Reset Candle (Scene 8)
      blown = false;
      if (fl) {
        fl.style.transform = '';
        fl.style.opacity = '';
      }
      if (cSucc) cSucc.style.display = 'none';

      // 5. Reset Passcode (Scene 9)
      const passInp = document.getElementById('passInp');
      const passStat = document.getElementById('passStat');
      if (passInp) passInp.value = '';
      if (passStat) {
        passStat.textContent = "AWAITING AUTHENTICATION...";
        passStat.style.color = "rgba(255,255,255,0.6)";
      }

      // 6. Reset Scene 2 Frost
      const frost = document.getElementById('frost');
      if (frost) {
        frost.style.backdropFilter = '';
        frost.style.webkitBackdropFilter = '';
        frost.style.background = '';
      }

      // 7. Reset scene 10 petals
      if (petalInterval) {
        clearInterval(petalInterval);
        petalInterval = null;
      }
      const petContainer = document.getElementById('petal-container');
      if (petContainer) petContainer.innerHTML = '';

      // 8. Transition back to Scene 1
      window.nextScene(1);
    };
    function replayJourney() { return window.replayJourney(); }
  <` + `/script>
</body>
</html>`;
  }
  // Freeze public API interface to prevent tampering
  const RoyalVelvetEngine = Object.freeze({
    id: 'royal-velvet',
    edition: '01',
    title: 'Royal Velvet // Cinematic Premiere',
    build: buildRoyalVelvetTemplateHtml
  });

  Object.defineProperty(global, 'WishCraftTemplate_RoyalVelvet', {
    value: RoyalVelvetEngine,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Global builder bridge
  global.buildCuratedTemplateHtml = function(custom) {
    return RoyalVelvetEngine.build(custom);
  };

})(typeof window !== 'undefined' ? window : globalThis);
