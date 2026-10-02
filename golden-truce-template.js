/**
 * WishCraft Studio — Proprietary Curated Template Engine
 * Template: Golden Truce // The Confession & Reconciliation Vault (Edition 04)
 * Category: Apology / Forgiveness / Heartfelt Reconciliation
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

  function buildGoldenTruceTemplateHtml(custom) {
    const c = Object.assign({
      recipientName: "Someone Special",
      senderName: "",
      
      // Chapter 1: The Opening
      chapter1Subtitle: "",
      chapter1Title: "",
      chapter1Subtext: "",
      chapter1BtnText: "HEAR ME OUT",

      // Chapter 2: The Confession (Scratch Card)
      chapter2Subtitle: "Chapter 02 • Confession",
      chapter2Title: "My Confession",
      chapter2ScratchPrompt: "Wipe & scratch the mist",
      confessionHeading: "I am so genuinely sorry.",
      confessionMessage: "",
      chapter2BtnText: "NEXT TRUTH",

      // Chapter 3: The Truth (Ripple Pond)
      chapter3Subtitle: "Chapter 03 • Deep Truth",
      chapter3Title: "The Truth",
      clause1Title: "Clause 01: Sincere Apology",
      clause1Text: "No excuses, no defenses—just an honest promise to <span>always communicate with kindness.</span>",
      clause2Title: "Clause 02: Pure Intentions",
      clause2Text: "My words may have stumbled, but my heart has only <span>respect and warmth for you.</span>",
      clause3Title: "Clause 03: Mutual Harmony",
      clause3Text: "Clear, open conversations from here on out—<span>no more misunderstandings.</span>",
      clause4Title: "Clause 04: True Empathy",
      clause4Text: "I should have paused and considered how you felt, <span>before speaking.</span>",
      clause5Title: "Clause 05: The Truce",
      clause5Text: "From the bottom of my heart, I am truly sorry.<br>Can we <span>make things right?</span> ❤️",
      chapter3BtnText: "HOW TO FIX THIS",

      // Chapter 4: The Reset (Hold to Forgive)
      chapter4Subtitle: "Final Chapter • Reset",
      chapter4Title: "I'm <span>Sorry.</span>",
      finalPromise: "I promise to always protect our bond and never take your trust for granted.<br><br>Can we hit reset and start fresh? 🥺",
      holdBtnText: "HOLD TO FORGIVE",
      successSubtitle: "Forever Grateful ✨",
      successTitle: "Thank You.",
      successMessage: "You are truly extraordinary and have the kindest heart in the world. Thank you for forgiving me. ❤️",

      musicUrl: "",
      showWatermark: true
    }, custom || {});

    // Intelligent fallbacks and mapping
    const recName = escapeHtml(c.recipientName || "Someone Special");
    const sndName = escapeHtml(c.senderName || "");
    
    const ch1Sub = c.chapter1Subtitle ? escapeHtml(c.chapter1Subtitle) : (sndName ? `Chapter 01 • From ${sndName} to ${recName}` : `Chapter 01 • For ${recName}`);
    const ch1Title = c.chapter1Title || `Can We Clear The Air?<br>Here is <span>my sincere truth.</span>`;
    const ch1Subtext = c.chapter1Subtext ? escapeHtml(c.chapter1Subtext) : `${recName}, would you please hear me out just for a moment? 🥺`;

    let confMsg = c.confessionMessage;
    if (!confMsg) {
      if (custom && custom.scratchNote) {
        confMsg = custom.scratchNote;
      } else if (custom && custom.userMessage) {
        confMsg = custom.userMessage;
      } else {
        confMsg = `I am truly sorry for the misunderstanding and for hurting your feelings. It was never my intention to speak thoughtlessly or make you feel undervalued.\n\nYour presence and happiness mean the world to me, and I never want pride or words spoken in haste to stand between us. You deserve total respect, honesty, and care. I promise to be more mindful, listen better, and always treat our bond with the gentleness it deserves. 🫂❤️`;
      }
    }

    const confMsgHtml = confMsg.replace(/\n\s*\n/g, '<br><br>').replace(/\n/g, '<br>');
    const confHeading = escapeHtml(c.confessionHeading || "I am so genuinely sorry.");

    // Watermark HTML
    const watermarkHtml = c.showWatermark ? `
      <div class="wc-watermark" style="position:fixed; bottom:12px; left:50%; transform:translateX(-50%); z-index:9999; font-size:10.5px; letter-spacing:2px; text-transform:uppercase; color:rgba(212,175,55,0.7); background:rgba(6,6,8,0.75); border:1px solid rgba(212,175,55,0.25); border-radius:30px; padding:4px 14px; backdrop-filter:blur(10px); pointer-events:none;">
        Crafted with WishCraft ✦
      </div>
    ` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>A Message For ${recName} 👑</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold-primary: #d4af37;
            --gold-light: #fbe285;
            --gold-dark: #8a5a12;
            --gold-accent: #f3ce65;
            --gold-glow: rgba(212, 175, 55, 0.35);
            --bg-deep: #060608;
            --glass-bg: rgba(18, 18, 24, 0.68);
            --glass-border: rgba(212, 175, 55, 0.3);
            --glass-highlight: rgba(255, 255, 255, 0.18);
            --fill-progress: 0%;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        body {
            background-color: var(--bg-deep);
            color: #ffffff;
            font-family: 'Poppins', sans-serif;
            overflow: hidden;
            height: 100dvh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            user-select: none;
        }

        /* ---------------------------------
           1. Dynamic Ambient Background & Stardust
        --------------------------------- */
        .bg-container {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: -2;
            overflow: hidden;
            pointer-events: none;
        }

        #star-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: -1;
        }

        .blob {
            position: absolute;
            filter: blur(85px);
            opacity: 0.32;
            border-radius: 50%;
            pointer-events: none;
        }

        .blob-1 {
            width: 80vw; max-width: 500px; height: 80vw; max-height: 500px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(138, 90, 18, 0.4), transparent 70%);
            top: 15%; left: -15%;
            animation: floatSlow 22s infinite alternate ease-in-out, liquidMorph 18s infinite ease-in-out;
        }

        .blob-2 {
            width: 70vw; max-width: 450px; height: 70vw; max-height: 450px;
            background: radial-gradient(circle, rgba(243, 206, 101, 0.5), rgba(70, 45, 10, 0.3), transparent 70%);
            bottom: 5%; right: -15%;
            animation: floatSlow 26s infinite alternate-reverse ease-in-out;
        }

        /* Falling Golden Leaves Container */
        #petal-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            pointer-events: none; z-index: 30; overflow: hidden;
        }
        
        .golden-leaf {
            position: absolute;
            top: -35px;
            background: linear-gradient(135deg, #fff2a8 0%, #e6ca65 45%, #8a5a12 100%);
            border-radius: 2px 24px 2px 24px;
            box-shadow: 0 0 16px rgba(212, 175, 55, 0.45), inset 0 0 6px rgba(255, 255, 255, 0.5);
            border: 0.5px solid rgba(255, 240, 150, 0.6);
            pointer-events: none;
            z-index: 30;
            animation: leafDrift linear forwards;
            transform-origin: center;
        }

        .golden-leaf::after {
            content: '';
            position: absolute;
            top: 10%; left: 50%;
            width: 1px; height: 80%;
            background: rgba(255, 255, 255, 0.35);
            transform: rotate(-15deg);
        }

        @keyframes leafDrift {
            0% { transform: translateY(0) rotate(0deg) rotateY(0deg) translateX(0px); opacity: 0; }
            12% { opacity: 0.95; }
            88% { opacity: 0.95; }
            100% { transform: translateY(115vh) rotate(540deg) rotateY(720deg) translateX(70px); opacity: 0; }
        }

        /* ---------------------------------
           Scene Master Controller
        --------------------------------- */
        .stage-wrapper {
            position: relative;
            width: 100%;
            max-width: 440px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }

        .scene-block {
            width: 100%;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scene-block.active {
            display: flex;
            opacity: 1;
            transform: translateY(0);
        }

        /* ---------------------------------
           Universal Glass Card Styling
        --------------------------------- */
        .glass-card {
            position: relative;
            width: 100%;
            background: var(--glass-bg);
            backdrop-filter: blur(40px) saturate(160%);
            -webkit-backdrop-filter: blur(40px) saturate(160%);
            border: 1px solid var(--glass-border);
            border-radius: 40px;
            padding: 50px 30px 45px;
            text-align: center;
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 
                        inset 0 1.5px 1.5px var(--glass-highlight), 
                        inset 0 0 30px rgba(212, 175, 55, 0.08),
                        0 0 45px rgba(212, 175, 55, 0.15);
            overflow: hidden;
        }

        .glass-card::after {
            content: '';
            position: absolute;
            top: 0; left: 10%; right: 10%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
            box-shadow: 0 0 15px var(--gold-primary);
        }

        .subtitle-pill {
            display: inline-block;
            font-size: 0.72rem;
            letter-spacing: 4px;
            color: var(--gold-light);
            text-transform: uppercase;
            padding: 5px 18px;
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 50px;
            margin-bottom: 20px;
            font-weight: 500;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        .title {
            font-family: 'Playfair Display', serif;
            font-size: 2.3rem;
            font-style: italic;
            font-weight: 700;
            line-height: 1.25;
            margin-bottom: 28px;
            color: #ffffff;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8));
        }

        .title span {
            background: linear-gradient(120deg, #fff2a8 0%, #e6ca65 40%, #c59732 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
            font-weight: 700;
        }

        .subtext {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.78);
            font-weight: 300;
            margin-bottom: 32px;
            line-height: 1.6;
        }

        .floating-crown {
            font-size: 2.8rem;
            margin-bottom: 12px;
            display: inline-block;
            filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.6));
            animation: floatIcon 3.5s infinite ease-in-out;
        }

        /* ---------------------------------
           Universal Liquid Gold Buttons
        --------------------------------- */
        .btn-continue {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 15px 42px;
            color: #ffffff;
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 600;
            letter-spacing: 3.5px;
            text-transform: uppercase;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.22), rgba(18, 18, 24, 0.85));
            border: 1px solid rgba(251, 226, 133, 0.5);
            border-radius: 50px;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 
                        inset 0 1px 1px rgba(255, 255, 255, 0.25), 
                        0 0 25px rgba(212, 175, 55, 0.25);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(251, 226, 133, 0.5);
        }

        .btn-continue::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transform: skewX(-20deg);
            animation: btnShimmer 3.5s infinite;
        }

        .btn-continue:hover {
            transform: translateY(-2px) scale(1.03);
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(30, 26, 15, 0.9));
            border-color: rgba(251, 226, 133, 0.8);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.5);
            color: #ffffff;
        }

        .btn-continue:active { transform: scale(0.96); }

        .btn-sparkle {
            font-size: 1.1rem;
            animation: spinSparkle 4s linear infinite;
        }

        /* ---------------------------------
           Scene 2: Scratch Mist Reveal
        --------------------------------- */
        .scene2-header {
            text-align: center; margin-bottom: 12px; z-index: 10;
        }
        .scene2-header h1 {
            font-family: 'Playfair Display', serif; font-size: 1.85rem; font-style: italic; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .instruction-box {
            display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 3px;
        }
        .instruction-txt {
            font-size: 0.72rem; color: rgba(212, 175, 55, 0.95); letter-spacing: 2px; text-transform: uppercase; animation: pulse 2s infinite; font-weight: 600;
        }

        .reveal-wrapper {
            position: relative;
            width: 100%;
            height: min(490px, 64vh);
            z-index: 10;
        }

        .reveal-container {
            position: relative;
            width: 100%; height: 100%;
            border-radius: 36px;
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 
                        inset 0 1.5px 1.5px var(--glass-highlight), 
                        inset 0 0 30px rgba(212, 175, 55, 0.08),
                        0 0 45px rgba(212, 175, 55, 0.15);
            background: var(--glass-bg);
            backdrop-filter: blur(40px) saturate(160%);
            -webkit-backdrop-filter: blur(40px) saturate(160%);
            border: 1px solid var(--glass-border);
            overflow: hidden;
            transition: border-color 0.8s ease, box-shadow 0.8s ease;
        }

        .reveal-container.unlocked {
            border-color: rgba(251, 226, 133, 0.6);
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.35);
        }

        .secret-message {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            padding: 24px 22px;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            overflow-y: auto; overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            z-index: 1;
            scrollbar-width: thin;
            scrollbar-color: rgba(212, 175, 55, 0.4) transparent;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .reveal-container.canvas-ready .secret-message { opacity: 1; }

        .secret-message::-webkit-scrollbar { width: 4px; }
        .secret-message::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.4); border-radius: 4px; }

        .message-content-inner {
            margin: auto 0;
            width: 100%;
            display: flex; flex-direction: column; align-items: center;
        }

        .quote-badge {
            font-size: 2rem; margin-bottom: 6px; filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.5)); animation: floatIcon 3s infinite ease-in-out;
        }

        .secret-message h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.4rem, 3.8vw, 1.75rem);
            font-style: italic;
            background: linear-gradient(120deg, #fff2a8 0%, #e6ca65 40%, #c59732 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
            line-height: 1.3;
        }

        .secret-message p {
            font-size: clamp(0.82rem, 2.4vw, 0.9rem);
            line-height: 1.75;
            color: rgba(255, 255, 255, 0.92);
            font-weight: 300;
        }

        canvas#scratch-pad {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            border-radius: 36px; z-index: 5; cursor: pointer; touch-action: none;
        }

        #sparkle-canvas {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 6; border-radius: 36px;
        }

        .btn-holder-s2 {
            margin-top: 14px; height: 50px; z-index: 10;
        }

        .btn-step2 {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 13px 38px; font-size: 0.8rem; font-weight: 600; color: #fff;
            text-decoration: none; letter-spacing: 3px; text-transform: uppercase;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(18, 18, 24, 0.9));
            border: 1px solid rgba(251, 226, 133, 0.55);
            border-radius: 50px; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 0 25px rgba(212, 175, 55, 0.3);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 0; transform: translateY(20px) scale(0.95); pointer-events: none;
            cursor: pointer;
        }

        .btn-step2.active {
            opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; animation: pulseBtn 2.5s infinite;
        }

        .btn-step2:hover {
            transform: translateY(-2px) scale(1.03);
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.38), rgba(30, 26, 15, 0.95));
            border-color: rgba(251, 226, 133, 0.85);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.6);
            color: #ffffff;
        }

        /* ---------------------------------
           Scene 3: Ripple Glass Pond
        --------------------------------- */
        .ripple-glass {
            position: relative;
            width: 100%; height: 440px;
            background: var(--glass-bg); 
            backdrop-filter: blur(40px) saturate(160%); 
            -webkit-backdrop-filter: blur(40px) saturate(160%);
            border: 1px solid var(--glass-border); 
            border-radius: 38px;
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 
                        inset 0 1.5px 1.5px var(--glass-highlight), 
                        inset 0 0 30px rgba(212, 175, 55, 0.08),
                        0 0 45px rgba(212, 175, 55, 0.15);
            overflow: hidden; 
            cursor: pointer;
            display: flex; flex-direction: column; align-items: center; justify-content: space-between;
            padding: 35px 26px 28px; text-align: center;
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ripple-glass:active { transform: scale(0.985); }

        .ripple {
            position: absolute; border-radius: 50%;
            background: radial-gradient(circle, rgba(251, 226, 133, 0.6) 0%, rgba(212, 175, 55, 0.3) 30%, transparent 70%);
            box-shadow: inset 0 0 30px rgba(251, 226, 133, 0.5), 0 0 20px rgba(212, 175, 55, 0.4);
            transform: translate(-50%, -50%) scale(0);
            animation: ripple-spread 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
            pointer-events: none; z-index: 1;
        }

        @keyframes ripple-spread {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(16); opacity: 0; }
        }

        .clause-badge {
            display: inline-flex; align-items: center; gap: 6px; font-size: 0.7rem; letter-spacing: 2px;
            color: var(--gold-light); text-transform: uppercase; padding: 5px 14px;
            background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 30px;
            font-weight: 600; z-index: 2; pointer-events: none; transition: all 0.4s ease;
        }

        .text-layer {
            position: relative; z-index: 2; pointer-events: none;
            transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            margin: auto 0;
        }

        .quote-icon {
            font-family: 'Playfair Display', serif; font-size: 3.2rem; color: var(--gold-primary); opacity: 0.6; line-height: 0; display: block; margin-bottom: 20px; filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.5));
        }

        .card-text { 
            font-family: 'Playfair Display', serif; font-size: 1.45rem; font-style: italic; line-height: 1.55; color: rgba(255,255,255,0.95); 
        }

        .card-text span {
            background: linear-gradient(120deg, #fff2a8 0%, #e6ca65 40%, #c59732 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; text-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
        }

        .instruction-tap {
            font-size: 0.72rem; letter-spacing: 3px; color: var(--gold-light); text-transform: uppercase; animation: pulse 2s infinite; pointer-events: none; z-index: 2; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        .progress-dots {
            display: flex; gap: 10px; margin-top: 18px; z-index: 10;
        }

        .dot {
            width: 8px; height: 8px; border-radius: 50%; background: rgba(212, 175, 55, 0.25); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dot.active {
            background: var(--gold-light); box-shadow: 0 0 15px var(--gold-primary); transform: scale(1.4); border: 1px solid #fff;
        }

        .btn-continue-s3 {
            margin-top: 18px;
            display: none;
            padding: 15px 42px; color: #fff; text-decoration: none; font-size: 0.82rem; font-weight: 600;
            letter-spacing: 3.5px; text-transform: uppercase;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(18, 18, 24, 0.9));
            border: 1px solid rgba(251, 226, 133, 0.6); border-radius: 50px; z-index: 25;
            backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 175, 55, 0.4);
            cursor: pointer; transition: all 0.4s ease;
        }

        .btn-continue-s3:hover {
            transform: translateY(-2px) scale(1.03);
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.4), rgba(30, 26, 15, 0.9));
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.6);
        }

        /* ---------------------------------
           Scene 4: Hold to Forgive & Celebration
        --------------------------------- */
        .glass-card-s4 {
            width: 100%; min-height: 460px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: var(--glass-bg); backdrop-filter: blur(40px) saturate(160%); -webkit-backdrop-filter: blur(40px) saturate(160%);
            border: 1px solid var(--glass-border); border-radius: 40px; padding: 46px 26px; text-align: center;
            position: relative; z-index: 10;
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 
                        inset 0 1.5px 1.5px var(--glass-highlight), 
                        inset 0 0 30px rgba(212, 175, 55, 0.08),
                        0 0 45px rgba(212, 175, 55, 0.15);
            overflow: hidden;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.8s ease, box-shadow 0.8s ease;
        }

        .glass-card-s4.holding {
            transform: scale(1.02);
            border-color: rgba(251, 226, 133, 0.65);
            box-shadow: 0 45px 95px rgba(0, 0, 0, 0.95), 0 0 60px rgba(212, 175, 55, 0.45);
        }

        #apology-phase {
            width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #success-phase {
            width: 100%; display: none; flex-direction: column; align-items: center; justify-content: center;
            opacity: 0; transform: translateY(15px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hold-btn-wrapper { position: relative; width: 100%; }

        .hold-btn {
            position: relative; display: inline-flex; align-items: center; justify-content: center;
            width: 100%; padding: 19px 0; border-radius: 50px; border: 1px solid rgba(251, 226, 133, 0.45);
            background: rgba(212, 175, 55, 0.08); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            overflow: hidden; cursor: pointer; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            touch-action: none; -webkit-touch-callout: none; user-select: none; -webkit-user-select: none;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .hold-btn::before {
            content: ''; position: absolute; top: 0; left: 0; height: 100%; width: var(--fill-progress);
            background: linear-gradient(90deg, #8a5a12, var(--gold-primary), var(--gold-light));
            z-index: 1; transition: width 0.05s linear; box-shadow: 0 0 25px rgba(212, 175, 55, 0.7);
        }

        .btn-text {
            position: relative; z-index: 2; font-family: 'Poppins', sans-serif; font-size: 0.84rem; font-weight: 700;
            letter-spacing: 3.5px; color: #fff; text-transform: uppercase; pointer-events: none;
            text-shadow: 0 2px 6px rgba(0,0,0,0.8); display: flex; align-items: center; gap: 8px;
        }

        .hold-btn:active { transform: scale(0.97); }

        .instruction-s4 {
            margin-top: 15px; font-size: 0.72rem; letter-spacing: 3px; color: var(--gold-light); text-transform: uppercase; animation: pulse 2s infinite; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px;
        }

        .tap-prompt {
            font-size: 0.72rem; letter-spacing: 2.5px; color: var(--gold-light); text-transform: uppercase; animation: pulse 2s infinite; font-weight: 500;
        }

        /* ---------------------------------
           Responsive Breakpoints
        --------------------------------- */
        @media (max-width: 480px) {
            body { padding: 12px; }
            .glass-card { padding: 42px 20px 36px; border-radius: 34px; }
            .title { font-size: 2.05rem; margin-bottom: 22px; }
            .subtext { font-size: 0.84rem; margin-bottom: 26px; }
            .btn-continue { padding: 14px 34px; font-size: 0.78rem; letter-spacing: 2.5px; }
            .reveal-wrapper { height: min(460px, 60vh); }
            .secret-message { padding: 18px 14px; }
            .ripple-glass { height: 400px; padding: 28px 18px 22px; }
            .card-text { font-size: 1.25rem; }
            .glass-card-s4 { padding: 36px 18px; border-radius: 34px; min-height: 430px; }
            .hold-btn { padding: 16px 0; }
            .btn-text { font-size: 0.76rem; letter-spacing: 2.5px; }
        }

        /* ---------------------------------
           Keyframe Animations
        --------------------------------- */
        @keyframes floatIcon { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(4deg); } }
        @keyframes floatSlow { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(40px) rotate(15deg); } }
        @keyframes liquidMorph { 0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } 50% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; } 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } }
        @keyframes btnShimmer { 0%, 20% { left: -100%; } 50%, 100% { left: 200%; } }
        @keyframes spinSparkle { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes pulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @keyframes pulseBtn { 0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.3); } 50% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.7); } }
    </style>
</head>
<body>

    <div class="bg-container">
        <canvas id="star-canvas"></canvas>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </div>

    <div id="petal-container"></div>

    <div class="stage-wrapper">

        <!-- ================= SCENE 1: THE OPENING CROWN CARD ================= -->
        <section class="scene-block active" id="scene1">
            <main class="glass-card">
                <div class="floating-crown">👑</div>
                <br>
                <div class="subtitle-pill">${ch1Sub}</div>
                
                <h1 class="title">${ch1Title}</h1>

                <p class="subtext">${ch1Subtext}</p>

                <div class="btn-wrapper">
                    <button type="button" class="btn-continue" id="btnToScene2">
                        <span class="btn-sparkle">✨</span>
                        <span>${escapeHtml(c.chapter1BtnText)}</span>
                        <span class="btn-sparkle">✨</span>
                    </button>
                </div>
            </main>
        </section>

        <!-- ================= SCENE 2: THE CONFESSION SCRATCH MIST ================= -->
        <section class="scene-block" id="scene2">
            <div class="scene2-header">
                <div class="subtitle-pill">${escapeHtml(c.chapter2Subtitle)}</div>
                <h1>${escapeHtml(c.chapter2Title)}</h1>
                <div class="instruction-box">
                    <span style="font-size: 0.9rem;">✨</span>
                    <div class="instruction-txt" id="s2-instruction">${escapeHtml(c.chapter2ScratchPrompt)}</div>
                    <span style="font-size: 0.9rem;">✨</span>
                </div>
            </div>

            <div class="reveal-wrapper">
                <div class="reveal-container" id="revealContainer">
                    <div class="secret-message">
                        <div class="message-content-inner">
                            <div class="quote-badge">🥺👉👈</div>
                            <h2>${confHeading}</h2>
                            <p>${confMsgHtml}</p>
                        </div>
                    </div>
                    
                    <canvas id="scratch-pad"></canvas>
                    <canvas id="sparkle-canvas"></canvas>
                </div>
            </div>

            <div class="btn-holder-s2">
                <button type="button" class="btn-step2" id="btnToScene3">
                    <span>${escapeHtml(c.chapter2BtnText)}</span>
                    <span>&rarr;</span>
                </button>
            </div>
        </section>

        <!-- ================= SCENE 3: THE RIPPLE GLASS POND ================= -->
        <section class="scene-block" id="scene3">
            <div class="scene2-header" style="margin-bottom: 14px;">
                <div class="subtitle-pill">${escapeHtml(c.chapter3Subtitle)}</div>
                <h1>${escapeHtml(c.chapter3Title)}</h1>
            </div>

            <div style="width: 100%; position: relative;">
                <main class="ripple-glass" id="glass-pond">
                    <div class="clause-badge" id="clauseBadge">
                        <span>🕊️</span>
                        <span id="clauseText">${escapeHtml(c.clause1Title)}</span>
                    </div>

                    <div class="text-layer" id="text-layer">
                        <span class="quote-icon">“</span>
                        <p class="card-text" id="dynamic-text">${c.clause1Text}</p>
                    </div>

                    <div class="instruction-tap" id="pond-instruction">
                        <span>🌊</span>
                        <span>Tap the glass pond</span>
                        <span>🌊</span>
                    </div>
                </main>
            </div>

            <div class="progress-dots" id="dots-container">
                <div class="dot active"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>

            <button type="button" class="btn-continue-s3" id="btnToScene4">
                <span>✨ ${escapeHtml(c.chapter3BtnText)} ✨</span>
            </button>
        </section>

        <!-- ================= SCENE 4: HOLD TO FORGIVE & RESET ================= -->
        <section class="scene-block" id="scene4">
            <main class="glass-card-s4" id="mainCardS4">
                
                <div id="apology-phase">
                    <div class="subtitle-pill">${escapeHtml(c.chapter4Subtitle)}</div>
                    <h1 class="title">${c.chapter4Title}</h1>
                    
                    <p class="subtext" style="margin-bottom: 26px; line-height: 1.75;">${c.finalPromise}</p>

                    <div class="hold-btn-wrapper">
                        <div class="hold-btn" id="holdBtn">
                            <span class="btn-text" id="btnText">
                                <span>✨</span>
                                <span id="btnLabel">${escapeHtml(c.holdBtnText)}</span>
                                <span>✨</span>
                            </span>
                        </div>
                    </div>

                    <div class="instruction-s4" id="instructionS4">
                        <span>👇</span>
                        <span id="subLabel">Press &amp; hold tight</span>
                        <span>👇</span>
                    </div>
                </div>

                <div id="success-phase">
                    <div class="floating-crown" style="font-size: 2.4rem;">👑</div>
                    <div class="subtitle-pill">${escapeHtml(c.successSubtitle)}</div>
                    <h1 class="title" style="font-size: 2.6rem; margin-bottom: 14px;">
                        <span>${escapeHtml(c.successTitle)}</span>
                    </h1>

                    <p class="subtext" style="font-size: 0.96rem; color: rgba(255,255,255,0.95); margin-bottom: 22px; line-height: 1.8;">
                        ${escapeHtml(c.successMessage)}
                    </p>
                    ${sndName ? `<div style="font-size: 0.82rem; letter-spacing: 3px; text-transform: uppercase; color: var(--gold-light); margin-bottom: 18px; opacity: 0.9;">— With Deep Sincerity, ${sndName} —</div>` : ''}

                    <p class="tap-prompt">🍃 Tap anywhere for golden leaves 🍃</p>
                </div>

            </main>
        </section>

    </div>

    ${watermarkHtml}

    <script>
        // ---------------------------------
        // 1. Web Audio Synthesizer (Wipe tone, Heartbeat, Victory Fanfare)
        // ---------------------------------
        const AudioFX = {
            ctx: null,
            init() {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (AudioContext) this.ctx = new AudioContext();
                }
            },
            playWipeTone() {
                try {
                    this.init();
                    if (!this.ctx) return;
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(300 + Math.random() * 200, this.ctx.currentTime);
                    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.15);
                } catch(e) {}
            },
            playHeartbeatTone(progress) {
                try {
                    this.init();
                    if (!this.ctx) return;
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    const freq = 200 + (progress * 4);
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, this.ctx.currentTime + 0.15);
                    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.2);
                } catch(e) {}
            },
            playVictoryFanfare() {
                try {
                    this.init();
                    if (!this.ctx) return;
                    if (this.ctx.state === 'suspended') this.ctx.resume();
                    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
                    chord.forEach((freq, idx) => {
                        const osc = this.ctx.createOscillator();
                        const gain = this.ctx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
                        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.1);
                        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 1.2);
                        osc.connect(gain);
                        gain.connect(this.ctx.destination);
                        osc.start(this.ctx.currentTime + idx * 0.1);
                        osc.stop(this.ctx.currentTime + idx * 0.1 + 1.2);
                    });
                } catch(e) {}
            }
        };

        // ---------------------------------
        // 2. Stardust Particles Simulation
        // ---------------------------------
        const starCanvas = document.getElementById('star-canvas');
        const starCtx = starCanvas.getContext('2d');
        let stars = [];

        function resizeStars() {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
            stars = [];
            const count = Math.floor((starCanvas.width * starCanvas.height) / 14000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * starCanvas.width,
                    y: Math.random() * starCanvas.height,
                    radius: Math.random() * 1.6 + 0.4,
                    alpha: Math.random() * 0.7 + 0.2,
                    speed: Math.random() * 0.4 + 0.1,
                    glow: Math.random() > 0.6
                });
            }
        }

        function animateStars() {
            starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            stars.forEach(star => {
                starCtx.beginPath();
                starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                starCtx.fillStyle = star.glow 
                    ? \`rgba(251, 226, 133, \${star.alpha})\`
                    : \`rgba(212, 175, 55, \${star.alpha * 0.7})\`;
                if (star.glow) {
                    starCtx.shadowBlur = 8;
                    starCtx.shadowColor = 'rgba(212, 175, 55, 0.8)';
                } else {
                    starCtx.shadowBlur = 0;
                }
                starCtx.fill();

                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = starCanvas.height;
                    star.x = Math.random() * starCanvas.width;
                }
            });
            requestAnimationFrame(animateStars);
        }

        window.addEventListener('resize', resizeStars);
        resizeStars();
        animateStars();

        // ---------------------------------
        // 3. Scene Switcher Transitions
        // ---------------------------------
        let currentSceneNum = 1;
        const disabledScenes = ` + JSON.stringify(Array.isArray(c.disabledScenes) ? c.disabledScenes.map(Number) : []) + `;
        function transitionToScene(targetNum) {
            while (disabledScenes.includes(targetNum) && targetNum < 4) {
                targetNum++;
            }
            const currentEl = document.getElementById('scene' + currentSceneNum);
            const targetEl = document.getElementById('scene' + targetNum);
            if (!currentEl || !targetEl) return;

            currentEl.style.opacity = '0';
            currentEl.style.transform = 'translateY(-15px)';
            setTimeout(() => {
                currentEl.classList.remove('active');
                currentEl.style.display = 'none';
                
                targetEl.style.display = 'flex';
                void targetEl.offsetWidth; // Reflow
                targetEl.classList.add('active');
                targetEl.style.opacity = '1';
                targetEl.style.transform = 'translateY(0)';
                currentSceneNum = targetNum;

                if (targetNum === 2) {
                    initScratchPad();
                }
            }, 400);
        }

        document.getElementById('btnToScene2')?.addEventListener('click', () => transitionToScene(2));
        document.getElementById('btnToScene3')?.addEventListener('click', () => transitionToScene(3));
        document.getElementById('btnToScene4')?.addEventListener('click', () => transitionToScene(4));

        // ---------------------------------
        // 4. Scene 2: Scratch Mist Reveal Logic
        // ---------------------------------
        const scratchCanvas = document.getElementById('scratch-pad');
        const sCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
        const sparkleCanvas = document.getElementById('sparkle-canvas');
        const spCtx = sparkleCanvas.getContext('2d');
        const btnToScene3 = document.getElementById('btnToScene3');
        const s2Instruction = document.getElementById('s2-instruction');
        const revealContainer = document.getElementById('revealContainer');

        let isScratching = false;
        let isRevealedS2 = false;
        let scratchCount = 0;
        let sparkles = [];

        function initScratchPad() {
            const w = scratchCanvas.offsetWidth || revealContainer.offsetWidth || 380;
            const h = scratchCanvas.offsetHeight || revealContainer.offsetHeight || 480;
            scratchCanvas.width = w;
            scratchCanvas.height = h;
            sparkleCanvas.width = w;
            sparkleCanvas.height = h;
            
            const grad = sCtx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, "#1c1a16"); 
            grad.addColorStop(0.5, "#101014"); 
            grad.addColorStop(1, "#08080c"); 
            sCtx.fillStyle = grad;
            sCtx.fillRect(0, 0, w, h);

            for (let i = 0; i < 90; i++) {
                sCtx.beginPath();
                sCtx.arc(Math.random() * w, Math.random() * h, Math.random() * 2.2 + 0.8, 0, Math.PI * 2);
                sCtx.fillStyle = 'rgba(255, 255, 255, 0.08)';
                sCtx.fill();
            }

            sCtx.strokeStyle = "rgba(212, 175, 55, 0.25)";
            sCtx.lineWidth = 1.5;
            sCtx.strokeRect(12, 12, w - 24, h - 24);

            sCtx.font = "italic 600 16px 'Playfair Display', serif";
            sCtx.fillStyle = "rgba(251, 226, 133, 0.4)";
            sCtx.textAlign = "center";
            sCtx.fillText("✨ Wipe & scratch the glass ✨", w / 2, h / 2);

            revealContainer.classList.add('canvas-ready');
        }

        function getScratchPos(e) {
            const rect = scratchCanvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        }

        function spawnSparkle(x, y) {
            for (let i = 0; i < 4; i++) {
                sparkles.push({
                    x: x + (Math.random() - 0.5) * 16,
                    y: y + (Math.random() - 0.5) * 16,
                    vx: (Math.random() - 0.5) * 2.5,
                    vy: (Math.random() - 0.5) * 2.5,
                    radius: Math.random() * 2.5 + 1,
                    alpha: 1,
                    color: Math.random() > 0.5 ? '#fbe285' : '#d4af37'
                });
            }
        }

        function animateSparkles() {
            spCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
            for (let i = sparkles.length - 1; i >= 0; i--) {
                const p = sparkles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.035;
                if (p.alpha <= 0) {
                    sparkles.splice(i, 1);
                    continue;
                }
                spCtx.beginPath();
                spCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                spCtx.fillStyle = p.color;
                spCtx.globalAlpha = p.alpha;
                spCtx.shadowBlur = 6;
                spCtx.shadowColor = '#d4af37';
                spCtx.fill();
                spCtx.globalAlpha = 1;
            }
            requestAnimationFrame(animateSparkles);
        }
        animateSparkles();

        function wipeMist(e) {
            if (!isScratching) return;
            const pos = getScratchPos(e);

            sCtx.globalCompositeOperation = 'destination-out';
            sCtx.lineWidth = 50;
            sCtx.lineCap = 'round';
            sCtx.lineJoin = 'round';
            sCtx.lineTo(pos.x, pos.y);
            sCtx.stroke();
            sCtx.beginPath();
            sCtx.moveTo(pos.x, pos.y);

            spawnSparkle(pos.x, pos.y);
            
            if (scratchCount % 3 === 0) {
                AudioFX.playWipeTone();
            }

            scratchCount++;

            if (scratchCount >= 130 && !isRevealedS2) {
                isRevealedS2 = true;
                if (s2Instruction) s2Instruction.innerText = "✨ Confession Decrypted ✨";
                revealContainer.classList.add('unlocked');
                btnToScene3?.classList.add('active');
            }
        }

        scratchCanvas.addEventListener('mousedown', (e) => { 
            isScratching = true; 
            const pos = getScratchPos(e);
            sCtx.beginPath();
            sCtx.moveTo(pos.x, pos.y);
            wipeMist(e); 
        });
        window.addEventListener('mouseup', () => { isScratching = false; sCtx.beginPath(); });
        scratchCanvas.addEventListener('mousemove', wipeMist);
        
        scratchCanvas.addEventListener('touchstart', (e) => { 
            isScratching = true; 
            const pos = getScratchPos(e);
            sCtx.beginPath();
            sCtx.moveTo(pos.x, pos.y);
            wipeMist(e); 
        }, { passive: false });
        window.addEventListener('touchend', () => { isScratching = false; sCtx.beginPath(); });
        scratchCanvas.addEventListener('touchmove', wipeMist, { passive: false });

        // ---------------------------------
        // 5. Scene 3: Ripple Glass Pond Logic
        // ---------------------------------
        const glassPond = document.getElementById('glass-pond');
        const textLayer = document.getElementById('text-layer');
        const dynamicText = document.getElementById('dynamic-text');
        const pondInstruction = document.getElementById('pond-instruction');
        const btnToScene4 = document.getElementById('btnToScene4');
        const dots = document.querySelectorAll('#dots-container .dot');
        const clauseText = document.getElementById('clauseText');

        const stories = [
            { clause: "${escapeHtml(c.clause1Title)}", text: "${c.clause1Text.replace(/"/g, '\\"')}" },
            { clause: "${escapeHtml(c.clause2Title)}", text: "${c.clause2Text.replace(/"/g, '\\"')}" },
            { clause: "${escapeHtml(c.clause3Title)}", text: "${c.clause3Text.replace(/"/g, '\\"')}" },
            { clause: "${escapeHtml(c.clause4Title)}", text: "${c.clause4Text.replace(/"/g, '\\"')}" },
            { clause: "${escapeHtml(c.clause5Title)}", text: "${c.clause5Text.replace(/"/g, '\\"')}" }
        ];

        let currentClauseIdx = 0;
        let isClauseTransitioning = false;

        function createRipplePond(e) {
            const rect = glassPond.getBoundingClientRect();
            let x = (e.touches && e.touches.length > 0) ? (e.touches[0].clientX - rect.left) : (e.clientX - rect.left);
            let y = (e.touches && e.touches.length > 0) ? (e.touches[0].clientY - rect.top) : (e.clientY - rect.top);

            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = \`\${x}px\`;
            ripple.style.top = \`\${y}px\`;
            glassPond.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1600);
        }

        function advancePondStory(e) {
            if (isClauseTransitioning) return;
            createRipplePond(e);

            if (currentClauseIdx < stories.length - 1) {
                isClauseTransitioning = true;
                currentClauseIdx++;

                textLayer.style.opacity = '0';
                textLayer.style.transform = 'translateY(-15px) scale(0.95)';

                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[currentClauseIdx]) dots[currentClauseIdx].classList.add('active');

                setTimeout(() => {
                    clauseText.innerText = stories[currentClauseIdx].clause;
                    dynamicText.innerHTML = stories[currentClauseIdx].text;
                    textLayer.style.transform = 'translateY(15px) scale(0.95)';
                    void textLayer.offsetWidth; // Reflow
                    textLayer.style.opacity = '1';
                    textLayer.style.transform = 'translateY(0) scale(1)';
                    isClauseTransitioning = false;
                }, 400);

                if (currentClauseIdx === 1 && pondInstruction) {
                    pondInstruction.innerHTML = '<span>✨</span> Tap to continue <span>✨</span>';
                }
            } else if (currentClauseIdx === stories.length - 1) {
                if (pondInstruction) pondInstruction.style.display = 'none';
                if (btnToScene4) btnToScene4.style.display = 'inline-block';
            }
        }

        glassPond.addEventListener('mousedown', advancePondStory);
        glassPond.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            advancePondStory(e);
        }, { passive: false });

        // ---------------------------------
        // 6. Scene 4: Hold-to-Forgive & Golden Leaf Rain
        // ---------------------------------
        const holdBtn = document.getElementById('holdBtn');
        const btnLabel = document.getElementById('btnLabel');
        const subLabel = document.getElementById('subLabel');
        const mainCardS4 = document.getElementById('mainCardS4');
        const apologyPhase = document.getElementById('apology-phase');
        const successPhase = document.getElementById('success-phase');
        const petalContainer = document.getElementById('petal-container');
        const root = document.documentElement;

        let holdProgress = 0;
        let holdTimer = null;
        let drainTimer = null;
        let isForgiven = false;
        let beatCounter = 0;

        function updateHoldUI() {
            root.style.setProperty('--fill-progress', holdProgress + '%');

            if (holdProgress < 25) {
                btnLabel.innerText = \`HOLDING... \${Math.floor(holdProgress)}% 🥺\`;
                subLabel.innerText = "Keep holding...";
            } else if (holdProgress < 50) {
                btnLabel.innerText = \`MELTING... \${Math.floor(holdProgress)}% 🥺👉👈\`;
                subLabel.innerText = "I'm really really sorry...";
            } else if (holdProgress < 75) {
                btnLabel.innerText = \`SOFTER... \${Math.floor(holdProgress)}% 🥹\`;
                subLabel.innerText = "Almost there, please don't let go...";
            } else if (holdProgress < 100) {
                btnLabel.innerText = \`ALMOST! \${Math.floor(holdProgress)}% 🙏✨\`;
                subLabel.innerText = "Just 1 more second...";
            }

            beatCounter++;
            if (beatCounter % 4 === 0) {
                AudioFX.playHeartbeatTone(holdProgress);
                if (navigator.vibrate) navigator.vibrate(20);
            }

            if (holdProgress >= 100 && !isForgiven) {
                isForgiven = true;
                triggerForgiveness();
            }
        }

        let holdStartTime = 0;

        function autoCompleteHold() {
            if (isForgiven) return;
            clearInterval(drainTimer);
            clearInterval(holdTimer);
            mainCardS4.classList.add('holding');

            holdTimer = setInterval(() => {
                holdProgress += 2.5;
                if (holdProgress >= 100) holdProgress = 100;
                updateHoldUI();
            }, 25);
        }

        function startHold(e) {
            if (isForgiven) return;
            holdStartTime = Date.now();
            clearInterval(drainTimer);
            clearInterval(holdTimer);
            mainCardS4.classList.add('holding');

            if (e && e.pointerId !== undefined && holdBtn.setPointerCapture) {
                try { holdBtn.setPointerCapture(e.pointerId); } catch(_) {}
            }

            holdTimer = setInterval(() => {
                holdProgress += 1.6; 
                if (holdProgress >= 100) holdProgress = 100;
                updateHoldUI();
            }, 30);
        }

        function stopHold(e) {
            if (isForgiven) return;
            clearInterval(holdTimer);
            mainCardS4.classList.remove('holding');

            if (e && e.pointerId !== undefined && holdBtn.releasePointerCapture) {
                try { holdBtn.releasePointerCapture(e.pointerId); } catch(_) {}
            }

            const holdDuration = Date.now() - holdStartTime;
            if (holdDuration < 250 && holdProgress < 100) {
                autoCompleteHold();
                return;
            }

            btnLabel.innerText = "${escapeHtml(c.holdBtnText)}";
            subLabel.innerText = "Aww don't let go! Try again 🥺";

            drainTimer = setInterval(() => {
                holdProgress -= 3.5; 
                if (holdProgress <= 0) { holdProgress = 0; clearInterval(drainTimer); }
                root.style.setProperty('--fill-progress', holdProgress + '%');
            }, 30);
        }

        function spawnGoldenLeaf(x, y) {
            const leaf = document.createElement('div');
            leaf.classList.add('golden-leaf');
            const size = Math.random() * 10 + 16; 
            leaf.style.width = size + 'px';
            leaf.style.height = (size * 1.45) + 'px'; 
            leaf.style.left = (x !== undefined ? x : Math.random() * 100) + (x !== undefined ? 'px' : 'vw');
            if (y !== undefined) leaf.style.top = y + 'px';
            const duration = Math.random() * 3 + 4.5;
            leaf.style.animationDuration = duration + 's';
            petalContainer.appendChild(leaf);
            setTimeout(() => leaf.remove(), (duration + 0.5) * 1000);
        }

        function startLeavesRain() {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => spawnGoldenLeaf(), i * 120);
            }
            setInterval(() => spawnGoldenLeaf(), 400);
        }

        function triggerForgiveness() {
            clearInterval(holdTimer);
            mainCardS4.classList.remove('holding');
            AudioFX.playVictoryFanfare();
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

            apologyPhase.style.opacity = '0';
            apologyPhase.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                apologyPhase.style.display = 'none';
                successPhase.style.display = 'flex';
                void successPhase.offsetWidth;
                successPhase.style.opacity = '1';
                successPhase.style.transform = 'translateY(0)';
                startLeavesRain();
            }, 500);
        }

        window.addEventListener('click', (e) => {
            if (!isForgiven) return;
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offset = (Math.random() - 0.5) * 40;
                    spawnGoldenLeaf(e.clientX + offset, e.clientY - 20);
                }, i * 60);
            }
        });

        holdBtn.addEventListener('pointerdown', startHold);
        holdBtn.addEventListener('pointerup', stopHold);
        holdBtn.addEventListener('pointercancel', stopHold);
        holdBtn.addEventListener('touchstart', (e) => {
            if (!window.PointerEvent) startHold(e);
        }, { passive: true });
        holdBtn.addEventListener('touchend', (e) => {
            if (!window.PointerEvent) stopHold(e);
        });
        holdBtn.addEventListener('click', () => {
            if (!isForgiven && holdProgress < 100) {
                autoCompleteHold();
            }
        });
        holdBtn.addEventListener('contextmenu', e => e.preventDefault());
    </script>
</body>
</html>`;
  }

  // Freeze public API interface to prevent tampering
  const GoldenTruceEngine = Object.freeze({
    id: 'golden-truce',
    edition: '04',
    title: 'Golden Truce // The Confession Vault',
    category: 'apology',
    build: buildGoldenTruceTemplateHtml
  });

  Object.defineProperty(global, 'WishCraftTemplate_GoldenTruce', {
    value: GoldenTruceEngine,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Attach to global template registry
  if (!global.WishCraftTemplates) global.WishCraftTemplates = {};
  global.WishCraftTemplates['golden-truce'] = GoldenTruceEngine;

})(typeof window !== 'undefined' ? window : globalThis);
