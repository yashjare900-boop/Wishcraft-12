/**
 * WishCraft Studio — Proprietary Curated Template Engine
 * Template: Sapphire Protocol // Luxury Birthday Vault (Edition 03)
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

  function buildSapphireVaultTemplateHtml(custom) {
    const c = Object.assign({
      recipientName: "Alex",
      sender: "Forever Yours",
      coverSubtitle: "Advance Wish For",
      introMessage: "Your special milestone is almost here, but celebrating someone as extraordinary as you simply cannot be confined to just one day.",
      protocolSubtitle: "For An Incredible Soul",
      protocolTitle: "PROTOCOL INITIATED",
      protocolMessage: "A regular text could never do justice to someone like you. Today demands an entire experience. Let the celebration officially commence.",
      biometricTitle: "Identity Check",
      biometricSub: "Biometric Security Verification",
      verifiedTitle: "Status Confirmed",
      verifiedMessage: "Identity authenticated. Access granted to secured celebration files.",
      scratchTitle: "Secured File",
      scratchSubtitle: "Wipe the frosted glass to read",
      scratchNoteHeading: "Hey There,",
      scratchNote: "Happiest Birthday! You are one of the most incredible people in my life, and words can't capture how grateful I am for your presence.\n\nThank you for bringing so much laughter, warmth, and brilliance to every single day.",
      timelineTitle: "DAY OF BIRTH",
      timelineSubtitle: "The Moment You Arrived",
      birthdayMonth: "JULY",
      birthdayDay: 12,
      birthdayYear: 2011,
      targetDateTime: "2011-07-12T00:00:00",
      countdownTitle: "Time Spent in This Beautiful World",
      vaultTitle: "SECURITY OVERRIDE",
      vaultSubtitle: "Enter 6-Digit Decryption Code",
      passcode: "120711",
      passcodeHint: "Day of Birth (DDMMYY)",
      finalePreTitle: "SPECIAL ARCHIVE",
      finaleSubTitle: "The Ultimate Celebration",
      finaleMainTitle: "HAPPY BIRTHDAY!",
      closingNote: "CRAFTED WITH IMMENSE LOVE // TO AN UNSTOPPABLE SOUL",
      photos: [],
      showWatermark: true
    }, custom || {});

    // Adapt fields from generic WishCraft inputs if provided
    if (custom) {
      if (custom.recipientName) {
        c.recipientName = custom.recipientName;
      }
      if (custom.tagline && !custom.introMessage) c.introMessage = custom.tagline;
      if (custom.quote && !custom.protocolMessage) c.protocolMessage = custom.quote;
      if (custom.heartTitle && !custom.scratchTitle) c.scratchTitle = custom.heartTitle;
      if (custom.heartQuote && !custom.scratchNote) c.scratchNote = custom.heartQuote;
      if (custom.wishMessage && !custom.finaleMainTitle) c.finaleMainTitle = custom.wishMessage;
      if (custom.startDate && !custom.targetDateTime) c.targetDateTime = custom.startDate;
      if (custom.hint && !custom.passcodeHint) c.passcodeHint = custom.hint;
      if (Array.isArray(custom.photos) && custom.photos.length > 0) c.photos = custom.photos;
      else if (Array.isArray(custom.photoDataUrls) && custom.photoDataUrls.length > 0) c.photos = custom.photoDataUrls;
    }

    // Ensure passcode is strictly 6 characters
    if (!c.passcode || String(c.passcode).length !== 6) {
      c.passcode = "120711";
    }

    // Flexible date parser supporting ISO strings and DD/MM/YY formats
    function parseDateString(raw) {
      if (!raw) return null;
      if (typeof raw !== 'string') return new Date(raw);
      raw = raw.trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
        const d = new Date(raw);
        if (!isNaN(d.getTime())) return d;
      }
      const m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
      if (m) {
        let day = parseInt(m[1], 10);
        let month = parseInt(m[2], 10) - 1;
        let year = parseInt(m[3], 10);
        if (year < 100) year += (year < 50 ? 2000 : 1900);
        let hh = m[4] ? parseInt(m[4], 10) : 0;
        let mm = m[5] ? parseInt(m[5], 10) : 0;
        let ss = m[6] ? parseInt(m[6], 10) : 0;
        const d = new Date(year, month, day, hh, mm, ss);
        if (!isNaN(d.getTime())) return d;
      }
      const generic = new Date(raw);
      return !isNaN(generic.getTime()) ? generic : null;
    }

    // Parse month, day & year from targetDateTime if available
    let bMonth = c.birthdayMonth || "JULY";
    let bDay = parseInt(c.birthdayDay, 10) || 12;
    let bYear = parseInt(c.birthdayYear, 10) || 2011;
    if (c.targetDateTime) {
      const d = parseDateString(c.targetDateTime);
      if (d) {
        const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        bMonth = monthNames[d.getMonth()];
        bDay = d.getDate();
        bYear = d.getFullYear();
        c.targetDateTime = d.toISOString();
      }
    }
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const monthIndex = monthNames.indexOf(bMonth);
    const mIdx = monthIndex >= 0 ? monthIndex : 6;

    const watermarkHtml = c.showWatermark !== false ? `
  <!-- Crafted with WishCraft (Tamper-Protected Watermark) -->
  <a href="https://wishcraft-12.netlify.app/" target="_blank" rel="noopener" class="wc-watermark-badge" id="wcWatermarkBadge" title="Craft your own interactive experience on WishCraft">
    <span class="wc-badge-dot"></span>
    <span>Crafted with <span class="wc-badge-brand">WishCraft</span></span>
    <span class="wc-badge-arrow">↗</span>
  </a>` : '';

    const watermarkSentinel = c.showWatermark !== false ? `
    // Watermark persistence sentinel
    (function enforceWatermark() {
      const b = document.getElementById('wcWatermarkBadge');
      if (!b) return;
      b.style.display = 'inline-flex';
      b.style.visibility = 'visible';
      b.style.opacity = '1';
    })();` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${escapeHtml(c.recipientName)} | Sapphire Protocol</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Montserrat:wght@200;300;400;600&family=Space+Mono:wght@400;700&display=swap');

    :root {
      --sapphire-dark: #02050B;
      --sapphire-mid: #0B192C; 
      --sapphire-light: #1A365D; 
      
      --gold-primary: #E5C158; 
      --gold-light: #FCE698;
      --gold-dark: #B38F36;

      --error-red: #ff3366;
      --success-green: #4ade80;

      --scan-fill: 0%;      
      --scan-fill-raw: 0;   
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    body {
      min-height: 100dvh;
      background-color: var(--sapphire-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      position: relative;
      padding: 16px;
      color: #ffffff;
    }

    /* ---------------------------------
       1. Liquid Resin Background
    --------------------------------- */
    .bg-container {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
    }

    .blob {
      position: absolute;
      filter: blur(70px);
      opacity: 0.8;
      will-change: transform, border-radius;
    }

    .blob-1 {
      width: 80vw; max-width: 550px;
      height: 80vw; max-height: 550px;
      background: linear-gradient(135deg, var(--sapphire-light), var(--sapphire-mid));
      top: -10%; left: -15%;
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      animation: liquid 14s infinite linear, float 20s infinite alternate;
    }

    .blob-2 {
      width: 70vw; max-width: 450px;
      height: 70vw; max-height: 450px;
      background: linear-gradient(135deg, var(--gold-dark), var(--sapphire-dark));
      bottom: -10%; right: -10%;
      border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
      animation: liquid 18s infinite linear reverse, float 24s infinite alternate;
      opacity: 0.6;
    }

    .ambient-glow {
      position: absolute;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(229,193,88,0.2) 0%, transparent 70%);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      animation: pulseGlow 8s infinite alternate;
    }

    .gold-leaf {
      position: absolute;
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
      box-shadow: 0 0 10px rgba(229,193,88,0.4);
      opacity: 0;
      animation: floatUp 10s infinite linear;
    }

    /* ---------------------------------
       2. Thick Liquid Glass Slab & Cards
    --------------------------------- */
    .stage-wrapper {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 440px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .experience-scene {
      width: 100%;
      display: none;
      opacity: 0;
      transform: translateY(20px) scale(0.97);
      transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
      perspective: 2000px;
    }

    .experience-scene.active {
      display: block;
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .glass-card {
      width: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      border-radius: 36px;
      padding: 48px 30px 40px;
      text-align: center;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      
      backdrop-filter: blur(35px) saturate(180%);
      -webkit-backdrop-filter: blur(35px) saturate(180%);
      
      border-top: 1px solid rgba(255, 255, 255, 0.4);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(229, 193, 88, 0.3);
      border-right: 1px solid rgba(229, 193, 88, 0.1);
      
      box-shadow: 
        0 30px 60px -15px rgba(0, 0, 0, 0.9), 
        inset 0 0 30px rgba(229, 193, 88, 0.05),
        inset 0 2px 2px rgba(255, 255, 255, 0.2); 
    }

    .glare {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 36px;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      mix-blend-mode: overlay;
      z-index: 20;
    }

    /* ---------------------------------
       3. Typography & Buttons
    --------------------------------- */
    .subtitle {
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      font-size: 0.8rem;
      letter-spacing: 4px;
      margin-bottom: 12px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      transform: translateZ(30px);
    }

    h1.hero-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(2.4rem, 10vw, 3.6rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 24px;
      
      background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
      transform: translateZ(50px);
    }

    .message {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.92rem;
      line-height: 1.8;
      margin-bottom: 36px;
      color: rgba(255, 255, 255, 0.82);
      font-weight: 300;
      transform: translateZ(20px);
    }

    .btn {
      display: inline-block;
      padding: 16px 42px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      letter-spacing: 2px;
      color: var(--sapphire-dark);
      text-transform: uppercase;
      text-decoration: none;
      border: none;
      cursor: pointer;
      
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
      border-radius: 50px;
      transition: all 0.35s cubic-bezier(0.23, 1, 0.320, 1);
      transform: translateZ(40px);
      box-shadow: 0 15px 30px rgba(229, 193, 88, 0.2);
      position: relative;
      overflow: hidden;
    }

    .btn::after {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-25deg);
      animation: buttonShine 4s infinite;
    }

    .btn:hover {
      box-shadow: 0 20px 40px rgba(229, 193, 88, 0.4);
      transform: translateZ(50px) translateY(-2px);
    }
    .btn:active {
      transform: translateZ(30px) translateY(1px);
    }

    /* ---------------------------------
       4. Scene 3: Biometric Scanner
    --------------------------------- */
    .scanner-container {
      position: relative;
      width: 150px;
      height: 150px;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transform: translateZ(30px);
      touch-action: none;
    }

    .ring {
      position: absolute;
      width: 100%; height: 100%;
      border-radius: 50%;
      border: 2px solid rgba(229, 193, 88, 0.2);
      transition: all 0.3s ease;
    }

    .scanner-container.active .ring:nth-child(1) { animation: ripple 1.5s infinite linear; }
    .scanner-container.active .ring:nth-child(2) { animation: ripple 1.5s infinite linear 0.5s; }

    .circle-outer {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 2px dashed rgba(229, 193, 88, 0.4);
      position: absolute;
      animation: rotateSlow 12s linear infinite;
    }

    .scanner-container.active .circle-outer {
      animation: rotateSlow 4s linear infinite; 
      border-color: rgba(229, 193, 88, 0.9);
      box-shadow: 0 0 15px rgba(229, 193, 88, 0.3);
    }

    .circle-inner-mask {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      position: absolute;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 5px 15px rgba(0,0,0,0.5);
    }

    .circle-liquid-fill {
      width: 100%;
      height: var(--scan-fill);
      background: linear-gradient(to top, var(--sapphire-light), var(--gold-primary));
      box-shadow: 0 -3px 15px rgba(229, 193, 88, 0.8);
      transition: height 0.05s linear;
    }

    .scan-line {
      position: absolute;
      width: 120px;
      height: 3px;
      background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
      bottom: calc(39px + (var(--scan-fill-raw) * 0.72px));
      opacity: 0;
      transition: opacity 0.3s;
      box-shadow: 0 0 15px var(--gold-light);
    }

    .scanner-container.active .scan-line { opacity: 1; }

    .progress-text {
      font-family: 'Space Mono', monospace;
      font-size: 1.25rem;
      color: var(--gold-light);
      margin-top: 24px;
      min-height: 28px;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(229, 193, 88, 0.4);
    }

    .instruction {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.6);
      margin-top: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
      animation: pulse 2s infinite;
    }

    /* ---------------------------------
       5. Scene 4: Scratch-Off Card
    --------------------------------- */
    .scratch-card-box {
      position: relative;
      width: 100%;
      height: 360px;
      border-radius: 28px;
      overflow: hidden;
      margin: 10px auto 24px;
      background: rgba(11, 25, 44, 0.4);
      border: 1px solid rgba(229, 193, 88, 0.2);
      box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }

    .secret-message {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      padding: 30px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 1;
      overflow-y: auto;
    }

    .secret-message h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      color: var(--gold-light);
      margin-bottom: 14px;
      text-shadow: 0 0 15px rgba(229, 193, 88, 0.3);
    }

    .secret-message p {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.88rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.88);
      font-weight: 300;
      white-space: pre-line;
    }

    #scratch-pad {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border-radius: 28px;
      z-index: 5;
      touch-action: none;
      cursor: crosshair;
      transition: opacity 1.2s ease;
    }

    /* ---------------------------------
       6. Scene 5: Timeline & Countdown
    --------------------------------- */
    .month-title {
      font-family: 'Cinzel', serif;
      font-size: 1.4rem;
      color: var(--gold-light);
      margin-bottom: 12px;
      letter-spacing: 2px;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
      font-size: 0.68rem;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
    }

    .day {
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.8);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255,255,255,0.05);
      transition: all 0.25s ease;
    }

    .day.empty {
      background: transparent;
      border-color: transparent;
      pointer-events: none;
    }

    .day.target {
      background: linear-gradient(135deg, rgba(229,193,88,0.25), rgba(11,25,44,0.6));
      border: 1px solid var(--gold-primary);
      color: var(--gold-light);
      font-weight: 700;
      box-shadow: 0 0 15px rgba(229, 193, 88, 0.5), inset 0 0 10px rgba(229, 193, 88, 0.25);
      cursor: pointer;
      animation: pulseTarget 2s infinite;
    }

    .day.target:active {
      transform: scale(0.92);
      background: rgba(229, 193, 88, 0.45);
    }

    .timer-row {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 24px 0 20px;
      flex-wrap: wrap;
    }

    .time-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(229, 193, 88, 0.3);
      border-radius: 12px;
      padding: 12px 10px;
      min-width: 72px;
      box-shadow: inset 0 0 15px rgba(229, 193, 88, 0.1), 0 8px 16px rgba(0,0,0,0.4);
    }

    .time-val {
      font-family: 'Space Mono', monospace;
      font-size: clamp(1.15rem, 3.8vw, 1.45rem);
      font-weight: 700;
      color: var(--gold-light);
      text-shadow: 0 0 12px rgba(229, 193, 88, 0.5);
      line-height: 1;
      margin-bottom: 4px;
      white-space: nowrap;
    }

    .time-label {
      font-size: 0.62rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255,255,255,0.6);
    }

    /* ---------------------------------
       7. Scene 6: Vault Passcode & Finale
    --------------------------------- */
    .code-display {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .code-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.25);
      transition: all 0.2s;
    }

    .code-dot.filled {
      border-color: var(--gold-primary);
      background: var(--gold-primary);
      box-shadow: 0 0 14px rgba(229, 193, 88, 0.7);
    }

    .vault-card.error {
      border-color: var(--error-red) !important;
      box-shadow: 0 0 30px rgba(255, 51, 102, 0.35) !important;
      animation: shake 0.4s ease;
    }
    .vault-card.error .code-dot.filled {
      background: var(--error-red);
      border-color: var(--error-red);
      box-shadow: 0 0 14px rgba(255, 51, 102, 0.7);
    }

    .keypad-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding: 0 14px;
      margin-bottom: 10px;
    }

    .key {
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Space Mono', monospace;
      font-size: 1.35rem;
      color: #fff;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(229, 193, 88, 0.2);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: inset 0 2px 5px rgba(255,255,255,0.05);
      transition: all 0.15s;
    }
    .key:active { 
      transform: scale(0.92); 
      background: rgba(229, 193, 88, 0.25); 
      border-color: var(--gold-primary);
    }
    .key.action-key { 
      font-size: 0.85rem; 
      color: rgba(255,255,255,0.6); 
      border: none; 
      background: transparent; 
      box-shadow: none; 
    }

    .terminal-box {
      display: none;
      flex-direction: column;
      text-align: left;
      padding: 18px 12px;
      font-family: 'Space Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.8;
      color: var(--gold-light);
      text-shadow: 0 0 5px rgba(229, 193, 88, 0.3);
      min-height: 220px;
    }
    .term-line { opacity: 0; margin-bottom: 6px; transition: opacity 0.4s; }

    /* Grand Finale Card */
    .finale-box {
      display: none;
      opacity: 0;
      transition: opacity 1s ease;
      flex-direction: column;
      align-items: center;
    }
    .finale-box.active {
      display: flex;
      opacity: 1;
    }

    .finale-pre {
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      font-size: 0.85rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      margin-bottom: 8px;
    }

    .finale-sub {
      font-family: 'Cinzel', serif;
      font-style: italic;
      font-size: 1.3rem;
      color: var(--gold-light);
      margin-bottom: 18px;
    }

    .finale-main {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: clamp(2.2rem, 9vw, 3.4rem);
      line-height: 1.15;
      background: linear-gradient(to bottom, #FFFFFF 20%, var(--gold-light) 50%, var(--gold-dark) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
      margin-bottom: 24px;
    }

    .finale-emojis {
      font-size: 2.8rem;
      margin-bottom: 24px;
      animation: float 4s infinite ease-in-out;
      display: flex;
      justify-content: center;
      gap: 16px;
      filter: drop-shadow(0 5px 10px rgba(0,0,0,0.4));
    }

    .gold-divider {
      width: 60%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(229,193,88,0.5), transparent);
      margin: 0 auto 20px;
    }

    .closing-text {
      font-family: 'Space Mono', monospace;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .sound-btn {
      position: fixed;
      top: 18px; right: 18px;
      width: 40px; height: 40px;
      border-radius: 50%;
      background: rgba(11,25,44,0.65);
      border: 1px solid rgba(229,193,88,0.3);
      color: var(--gold-primary);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 99999;
      backdrop-filter: blur(10px);
      font-size: 15px;
      transition: all 0.2s;
    }
    .sound-btn:hover {
      border-color: var(--gold-light);
      box-shadow: 0 0 15px rgba(229,193,88,0.3);
    }

    /* Watermark Badge */
    .wc-watermark-badge {
      position: fixed; bottom: 14px; right: 16px;
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(2,5,11,0.85); backdrop-filter: blur(10px);
      border: 1px solid rgba(229,193,88,0.3); border-radius: 999px;
      padding: 5px 12px; font-size: 10.5px; color: rgba(255,255,255,0.7);
      text-decoration: none; z-index: 999999; font-family: 'Montserrat', sans-serif;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      transition: 0.2s;
    }
    .wc-watermark-badge:hover {
      border-color: var(--gold-primary);
      color: #fff;
      transform: translateY(-2px);
    }
    .wc-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold-primary); box-shadow: 0 0 6px var(--gold-primary); }
    .wc-badge-brand { color: var(--gold-light); font-weight: 600; }
    .wc-badge-arrow { font-size: 10px; color: var(--gold-primary); }

    /* ---------------------------------
       Keyframe Animations
    --------------------------------- */
    @keyframes liquid {
      0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
      67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(16px) rotate(3deg); }
    }
    @keyframes floatUp {
      0% { transform: translateY(100vh) rotate(0deg) scale(0); opacity: 0; }
      20% { opacity: 0.8; transform: translateY(80vh) rotate(90deg) scale(1); }
      80% { opacity: 0.8; transform: translateY(20vh) rotate(270deg) scale(1); }
      100% { transform: translateY(-10vh) rotate(360deg) scale(0); opacity: 0; }
    }
    @keyframes pulseGlow {
      0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.85); }
      100% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.15); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 1; text-shadow: 0 0 10px var(--gold-light); }
    }
    @keyframes pulseTarget {
      0%, 100% { box-shadow: 0 0 10px rgba(229,193,88,0.4); }
      50% { box-shadow: 0 0 25px rgba(229,193,88,0.85); }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes ripple {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-10px); }
      40%, 80% { transform: translateX(10px); }
    }
    @keyframes buttonShine {
      0%, 50% { left: -100%; }
      100% { left: 200%; }
    }

    @media (max-width: 480px) {
      body { padding: 12px; }
      .glass-card { padding: 36px 20px 30px; border-radius: 28px; }
      .glare { border-radius: 28px; }
      h1.hero-title { font-size: 2.2rem; margin-bottom: 18px; }
      .message { font-size: 0.88rem; line-height: 1.65; margin-bottom: 28px; }
      .btn { padding: 14px 34px; font-size: 0.82rem; }
      .scratch-card-box { height: 320px; }
      .key { font-size: 1.2rem; }
      .timer-row { gap: 6px; }
      .time-box { width: 62px; padding: 10px 4px; }
      .time-val { font-size: 1.3rem; }
    }
  </style>
</head>
<body>

  <!-- Floating Audio Chimes Button -->
  <button class="sound-btn" id="soundToggle" title="Toggle Ambience Music">♫</button>

  <!-- Heavy Liquid Resin Background -->
  <div class="bg-container" id="bgContainer">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="ambient-glow"></div>
  </div>

  <main class="stage-wrapper">

    <!-- SCENE 1: Cover Advance Wish -->
    <section class="experience-scene active" id="scene1">
      <div class="glass-card" id="card1">
        <div class="glare"></div>
        <div class="subtitle">${escapeHtml(c.coverSubtitle)}</div>
        <h1 class="hero-title">${escapeHtml(c.recipientName).toUpperCase()}</h1>
        <p class="message">${escapeHtml(c.introMessage)}</p>
        <button type="button" class="btn" id="toScene2Btn">Open The Vault</button>
      </div>
    </section>

    <!-- SCENE 2: Protocol Initiated -->
    <section class="experience-scene" id="scene2">
      <div class="glass-card" id="card2">
        <div class="glare"></div>
        <div class="subtitle">${escapeHtml(c.protocolSubtitle)}</div>
        <h1 class="hero-title" style="font-size:clamp(1.9rem,8vw,2.8rem);">${escapeHtml(c.protocolTitle)}</h1>
        <p class="message">${escapeHtml(c.protocolMessage)}</p>
        <button type="button" class="btn" id="toScene3Btn">Proceed to Security</button>
      </div>
    </section>

    <!-- SCENE 3: Biometric Identity Verification -->
    <section class="experience-scene" id="scene3">
      <div class="glass-card" id="card3">
        <div class="glare"></div>
        
        <div id="scanPhase">
          <div class="subtitle">${escapeHtml(c.biometricSub)}</div>
          <h1 class="hero-title" style="font-size:clamp(1.9rem,8vw,2.6rem); margin-bottom:12px;">${escapeHtml(c.biometricTitle)}</h1>
          
          <div class="scanner-container" id="biometricScanner">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="circle-outer"></div>
            <div class="circle-inner-mask">
              <div class="circle-liquid-fill"></div>
            </div>
            <div class="scan-line"></div>
          </div>

          <div class="progress-text" id="scanProgressText">00%</div>
          <div class="instruction" id="scanInstruction">Touch & Hold to Verify</div>
        </div>

        <div id="scanSuccessPhase" style="display:none; flex-direction:column; align-items:center; opacity:0; transition:opacity 0.6s;">
          <div style="font-size:36px; margin-bottom:12px;">✨</div>
          <h2 style="font-family:'Cinzel',serif; color:var(--gold-primary); font-size:1.6rem; margin-bottom:12px; text-shadow:0 0 15px rgba(229,193,88,0.4);">${escapeHtml(c.verifiedTitle)}</h2>
          <p style="font-size:0.9rem; color:rgba(255,255,255,0.8); line-height:1.7; margin-bottom:28px;">${escapeHtml(c.verifiedMessage)}</p>
          <button type="button" class="btn" id="toScene4Btn">Enter Protocol</button>
        </div>
      </div>
    </section>

    <!-- SCENE 4: Secured File (Scratch-Off Wipe Reveal) -->
    <section class="experience-scene" id="scene4">
      <div class="glass-card" id="card4">
        <div class="glare"></div>
        <div class="subtitle">${escapeHtml(c.scratchTitle)}</div>
        <div class="instruction" id="scratchInstructionText" style="margin-bottom:14px;">${escapeHtml(c.scratchSubtitle)}</div>

        <div class="scratch-card-box">
          <div class="secret-message">
            ${Array.isArray(c.photos) && c.photos.length > 0 ? `
            <div style="margin: 0 auto 12px; width: 72px; height: 72px; border-radius: 50%; overflow: hidden; border: 2px solid var(--gold-primary); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
              <img src="${escapeHtml(c.photos[0])}" alt="Memory" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.style.display='none'">
            </div>` : ''}
            <h2>${escapeHtml(c.scratchNoteHeading)}</h2>
            <p>${escapeHtml(c.scratchNote)}</p>
          </div>
          <canvas id="scratch-pad"></canvas>
        </div>

        <div style="min-height:56px; display:flex; align-items:center; justify-content:center;">
          <button type="button" class="btn" id="toScene5Btn" style="opacity:0; pointer-events:none; transition:all 0.5s;">Continue to Timeline</button>
        </div>
      </div>
    </section>

    <!-- SCENE 5: Day of Birth & Live Lifetime Counter -->
    <section class="experience-scene" id="scene5">
      <div class="glass-card" id="card5">
        <div class="glare"></div>
        
        <div id="calendarPhase">
          <div class="subtitle">${escapeHtml(c.timelineSubtitle)}</div>
          <h1 class="hero-title" style="font-size:clamp(1.8rem,7vw,2.5rem); margin-bottom:10px;">${escapeHtml(c.timelineTitle)}</h1>
          
          <div class="month-title">${escapeHtml(bMonth)} ${bYear}</div>
          <div class="weekdays">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div class="days-grid" id="daysGrid"></div>

          <div class="instruction" style="margin-top:20px;">Tap your highlighted day of birth to reveal your journey</div>
        </div>

        <div id="countdownPhase" style="display:none; opacity:0; flex-direction:column; align-items:center; transition:opacity 0.6s;">
          <div class="subtitle">${escapeHtml(c.recipientName)}'s Beautiful Journey</div>
          <h2 style="font-family:'Cinzel',serif; color:var(--gold-light); font-size:1.4rem; margin-bottom:16px;">${escapeHtml(c.countdownTitle)}</h2>

          <div class="timer-row">
            <div class="time-box">
              <span class="time-val" id="cntDays">0</span>
              <span class="time-label">Days</span>
            </div>
            <div class="time-box">
              <span class="time-val" id="cntHours">00</span>
              <span class="time-label">Hours</span>
            </div>
            <div class="time-box">
              <span class="time-val" id="cntMins">00</span>
              <span class="time-label">Mins</span>
            </div>
            <div class="time-box">
              <span class="time-val" id="cntSecs">00</span>
              <span class="time-label">Secs</span>
            </div>
          </div>

          <p style="font-size:0.85rem; color:rgba(255,255,255,0.75); margin-bottom:24px; line-height:1.6; text-align:center;">Every single second you have spent bringing light, laughter, and joy to this beautiful world.</p>

          <button type="button" class="btn" id="toScene6Btn">Proceed to Final Protocol</button>
        </div>
      </div>
    </section>

    <!-- SCENE 6: Security Override Keypad & Grand Finale -->
    <section class="experience-scene" id="scene6">
      <div class="glass-card vault-card" id="card6">
        <div class="glare"></div>
        
        <!-- Keypad Phase -->
        <div id="keypadPhase">
          <div class="subtitle" id="vaultStatusSubtitle">${escapeHtml(c.vaultSubtitle)}</div>
          <h1 class="hero-title" style="font-size:clamp(1.6rem,6vw,2.2rem); margin-bottom:16px;">${escapeHtml(c.vaultTitle)}</h1>
          
          <div class="code-display" id="codeDots">
            <div class="code-dot"></div>
            <div class="code-dot"></div>
            <div class="code-dot"></div>
            <div class="code-dot"></div>
            <div class="code-dot"></div>
            <div class="code-dot"></div>
          </div>

          <div class="keypad-grid">
            <button type="button" class="key" data-num="1">1</button>
            <button type="button" class="key" data-num="2">2</button>
            <button type="button" class="key" data-num="3">3</button>
            <button type="button" class="key" data-num="4">4</button>
            <button type="button" class="key" data-num="5">5</button>
            <button type="button" class="key" data-num="6">6</button>
            <button type="button" class="key" data-num="7">7</button>
            <button type="button" class="key" data-num="8">8</button>
            <button type="button" class="key" data-num="9">9</button>
            <button type="button" class="key action-key" id="keyClear">CLEAR</button>
            <button type="button" class="key" data-num="0">0</button>
            <button type="button" class="key action-key" id="keyBack">⌫</button>
          </div>

          <div style="font-size:11.5px; color:var(--gold-light); font-family:'Space Mono',monospace; margin-top:10px; background:rgba(229,193,88,0.1); border:1px solid rgba(229,193,88,0.3); border-radius:6px; padding:6px 12px; display:inline-block;">
            🔑 Hint: ${escapeHtml(c.passcodeHint && c.passcodeHint.includes(c.passcode) ? c.passcodeHint : (c.passcodeHint ? `${c.passcodeHint} — Key: ${c.passcode}` : `Key: ${c.passcode}`))}
          </div>
        </div>

        <!-- Terminal Decryption Animation -->
        <div class="terminal-box" id="terminalPhase">
          <div class="term-line">> INITIALIZING DECRYPTION PROTOCOL...</div>
          <div class="term-line">> BYPASSING 4096-BIT RESIN CIPHER...</div>
          <div class="term-line">> MATCHING BIOMETRIC SIGNATURE FOR ${escapeHtml(c.recipientName).toUpperCase()}...</div>
          <div class="term-line">> STATUS: AUTHENTICATION ACCEPTED.</div>
          <div class="term-line">> ACCESS GRANTED // UNLOCKING VAULT...</div>
        </div>

        <!-- Finale Phase -->
        <div class="finale-box" id="finalePhase">
          <div class="finale-pre">${escapeHtml(c.finalePreTitle)}</div>
          <div class="finale-sub">${escapeHtml(c.finaleSubTitle)}</div>
          <h1 class="finale-main">${escapeHtml(c.finaleMainTitle)}</h1>
          
          <div class="finale-emojis">
            <span>👑</span><span>🎂</span><span>🥂</span><span>✨</span>
          </div>

          <div class="gold-divider"></div>
          ${Array.isArray(c.photos) && c.photos.length > 0 ? `
          <div class="finale-memory-photos" style="display:flex; justify-content:center; gap:10px; margin:16px auto 14px; flex-wrap:wrap; max-width:380px;">
            ${c.photos.slice(0, 3).map((p, idx) => `
              <div style="width:96px; height:116px; background:rgba(255,255,255,0.06); border:1px solid rgba(229,193,88,0.45); border-radius:12px; padding:5px; box-shadow:0 8px 20px rgba(0,0,0,0.6); transform:rotate(${idx % 2 === 0 ? '-3deg' : '3deg'}); transition:transform 0.3s ease;">
                <img src="${escapeHtml(p)}" alt="Memory" style="width:100%; height:100%; object-fit:cover; border-radius:8px; display:block;" onerror="this.parentElement.style.display='none'">
              </div>
            `).join('')}
          </div>
          ` : ''}
          <div class="closing-text">${escapeHtml(c.closingNote)}</div>
          <div style="font-family:'Cinzel',serif; font-size:1.1rem; color:var(--gold-primary); margin-bottom:24px;">— ${escapeHtml(c.sender)}</div>

          <button type="button" class="btn" id="replayBtn" onclick="window.replayVault()" style="padding:14px 32px; font-size:0.8rem; background:transparent; border:1px solid var(--gold-primary); color:var(--gold-light);">↺ Replay Experience</button>
        </div>

      </div>
    </section>

  </main>

  ${watermarkHtml}

  <script>
    // 1. Generate Floating Gold Leaf Flakes
    (function createGoldFlakes() {
      const bg = document.getElementById('bgContainer');
      if (!bg) return;
      for (let i = 0; i < 22; i++) {
        const flake = document.createElement('div');
        flake.classList.add('gold-leaf');
        const size = Math.random() * 8 + 3;
        flake.style.width = size + 'px';
        flake.style.height = (size * (Math.random() + 0.5)) + 'px';
        flake.style.borderRadius = (Math.random() * 50) + '% ' + (Math.random() * 50) + '% ' + (Math.random() * 50) + '% ' + (Math.random() * 50) + '%';
        flake.style.left = (Math.random() * 100) + 'vw';
        flake.style.animationDuration = (Math.random() * 8 + 8) + 's';
        flake.style.animationDelay = (Math.random() * -10) + 's';
        bg.appendChild(flake);
      }
    })();

    // 2. 3D Tilt Card Engine
    function initCardTilt(cardEl, glareEl) {
      if (!cardEl) return;
      function handleMove(clientX, clientY) {
        const rect = cardEl.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = ((y - centerY) / centerY) * -12;
        const rotY = ((x - centerX) / centerX) * 12;
        cardEl.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
        if (glareEl) {
          glareEl.style.opacity = '1';
          glareEl.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.2) 0%, transparent 60%)';
        }
      }
      function handleReset() {
        cardEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
        if (glareEl) glareEl.style.opacity = '0';
      }
      cardEl.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
      cardEl.addEventListener('mouseleave', handleReset);
      cardEl.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
      cardEl.addEventListener('touchend', handleReset);
    }

    document.querySelectorAll('.glass-card').forEach(card => {
      const glare = card.querySelector('.glare');
      initCardTilt(card, glare);
    });

    // 3. Scene Switcher Engine
    const scenes = {
      1: document.getElementById('scene1'),
      2: document.getElementById('scene2'),
      3: document.getElementById('scene3'),
      4: document.getElementById('scene4'),
      5: document.getElementById('scene5'),
      6: document.getElementById('scene6')
    };

    const disabledScenes = ` + JSON.stringify(Array.isArray(c.disabledScenes) ? c.disabledScenes.map(Number) : []) + `;
    function showScene(sceneNum) {
      while (disabledScenes.includes(sceneNum) && sceneNum < 6) {
        sceneNum++;
      }
      Object.keys(scenes).forEach(key => {
        if (scenes[key]) scenes[key].classList.remove('active');
      });
      if (scenes[sceneNum]) {
        scenes[sceneNum].classList.add('active');
        if (sceneNum === 4) initScratchPad();
        if (sceneNum === 5) initCalendar();
      }
    }

    const toScene2Btn = document.getElementById('toScene2Btn');
    if (toScene2Btn) toScene2Btn.addEventListener('click', () => showScene(2));

    const toScene3Btn = document.getElementById('toScene3Btn');
    if (toScene3Btn) toScene3Btn.addEventListener('click', () => showScene(3));

    const toScene4Btn = document.getElementById('toScene4Btn');
    if (toScene4Btn) toScene4Btn.addEventListener('click', () => showScene(4));

    const toScene5Btn = document.getElementById('toScene5Btn');
    if (toScene5Btn) toScene5Btn.addEventListener('click', () => showScene(5));

    const toScene6Btn = document.getElementById('toScene6Btn');
    if (toScene6Btn) toScene6Btn.addEventListener('click', () => showScene(6));

    // 4. Biometric Scanner (Fixed Pointer Events with Zero Stuck Bugs)
    const scanner = document.getElementById('biometricScanner');
    const scanProgressText = document.getElementById('scanProgressText');
    const scanInstruction = document.getElementById('scanInstruction');
    const scanPhase = document.getElementById('scanPhase');
    const scanSuccessPhase = document.getElementById('scanSuccessPhase');
    const root = document.documentElement;

    let scanProgress = 0;
    let holdTimer = null;
    let drainTimer = null;
    let isScanVerified = false;

    function updateScanUI() {
      const p = Math.floor(scanProgress);
      if (scanProgressText) {
        scanProgressText.textContent = (p < 10 ? '0' : '') + p + '%';
      }
      root.style.setProperty('--scan-fill', scanProgress + '%');
      root.style.setProperty('--scan-fill-raw', scanProgress);

      if (scanProgress >= 100 && !isScanVerified) {
        isScanVerified = true;
        finishScan();
      }
    }

    function startBiometricScan(e) {
      if (isScanVerified) return;
      if (e) { e.preventDefault(); e.stopPropagation(); }
      
      clearInterval(holdTimer);
      clearInterval(drainTimer);

      if (scanner) scanner.classList.add('active');
      if (scanInstruction) {
        scanInstruction.textContent = "Scanning Biometrics...";
        scanInstruction.style.color = "var(--gold-primary)";
      }

      holdTimer = setInterval(() => {
        scanProgress += 1.4;
        if (scanProgress >= 100) scanProgress = 100;
        updateScanUI();
      }, 30);
    }

    function stopBiometricScan() {
      if (isScanVerified) return;
      clearInterval(holdTimer);
      clearInterval(drainTimer);

      if (scanner) scanner.classList.remove('active');
      if (scanInstruction) {
        scanInstruction.textContent = "Touch & Hold to Verify";
        scanInstruction.style.color = "rgba(255,255,255,0.6)";
      }

      drainTimer = setInterval(() => {
        scanProgress -= 2.6;
        if (scanProgress <= 0) {
          scanProgress = 0;
          clearInterval(drainTimer);
        }
        updateScanUI();
      }, 30);
    }

    function finishScan() {
      clearInterval(holdTimer);
      clearInterval(drainTimer);
      if (scanner) scanner.classList.remove('active');

      if (scanPhase) {
        scanPhase.style.transition = 'opacity 0.4s';
        scanPhase.style.opacity = '0';
        setTimeout(() => {
          scanPhase.style.display = 'none';
          if (scanSuccessPhase) {
            scanSuccessPhase.style.display = 'flex';
            setTimeout(() => { scanSuccessPhase.style.opacity = '1'; }, 40);
          }
        }, 400);
      }
    }

    if (scanner) {
      // Modern unified pointer events with setPointerCapture for bulletproof touch & mouse
      scanner.addEventListener('pointerdown', (e) => {
        try { scanner.setPointerCapture(e.pointerId); } catch(_) {}
        startBiometricScan(e);
      });
      scanner.addEventListener('pointerup', stopBiometricScan);
      scanner.addEventListener('pointercancel', stopBiometricScan);
      scanner.addEventListener('pointerleave', stopBiometricScan);
      scanner.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    function resetBiometricScanner() {
      clearInterval(holdTimer);
      clearInterval(drainTimer);
      holdTimer = null;
      drainTimer = null;
      scanProgress = 0;
      isScanVerified = false;
      updateScanUI();

      if (scanner) scanner.classList.remove('active');
      if (scanInstruction) {
        scanInstruction.textContent = "Touch & Hold to Verify";
        scanInstruction.style.color = "rgba(255,255,255,0.6)";
      }

      if (scanPhase) {
        scanPhase.style.display = 'block';
        scanPhase.style.opacity = '1';
        scanPhase.style.transition = '';
      }
      if (scanSuccessPhase) {
        scanSuccessPhase.style.display = 'none';
        scanSuccessPhase.style.opacity = '0';
        scanSuccessPhase.style.transition = '';
      }
    }

    // 5. Scratch-Off Frosted Glass Pad
    let isScratchInitialized = false;
    let isRevealed = false;
    let scratchedPixels = 0;
    let isDrawing = false;

    function renderScratchCanvas() {
      const canvas = document.getElementById('scratch-pad');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const box = canvas.parentElement;

      canvas.width = box.offsetWidth || 340;
      canvas.height = box.offsetHeight || 360;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw thick frosted glass texture
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#102238');
      grad.addColorStop(0.5, '#0B192C');
      grad.addColorStop(1, '#070F1C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add gold dust flecks on the frost
      ctx.fillStyle = 'rgba(229,193,88,0.25)';
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 2.5 + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '600 13px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦ WIPE FROSTED GLASS TO READ ✦', canvas.width / 2, canvas.height / 2);
    }

    function resetScratchPad() {
      const canvas = document.getElementById('scratch-pad');
      const nextBtn = document.getElementById('toScene5Btn');
      const instruction = document.getElementById('scratchInstructionText');

      isRevealed = false;
      scratchedPixels = 0;
      isDrawing = false;

      if (canvas) {
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
        canvas.style.transition = 'none';
        renderScratchCanvas();
      }
      if (nextBtn) {
        nextBtn.style.opacity = '0';
        nextBtn.style.pointerEvents = 'none';
        nextBtn.style.transform = 'translateY(10px)';
      }
      if (instruction) {
        instruction.textContent = "${escapeHtml(c.scratchSubtitle)}";
      }
    }

    function initScratchPad() {
      if (isScratchInitialized) return;
      const canvas = document.getElementById('scratch-pad');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const nextBtn = document.getElementById('toScene5Btn');
      const instruction = document.getElementById('scratchInstructionText');

      renderScratchCanvas();

      function scratchAt(x, y) {
        if (isRevealed) return;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();

        scratchedPixels++;
        if (scratchedPixels > 28 && !isRevealed) {
          isRevealed = true;
          canvas.style.transition = 'opacity 1s ease';
          canvas.style.opacity = '0';
          setTimeout(() => {
            if (isRevealed) canvas.style.display = 'none';
          }, 1000);
          if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.transform = 'translateY(0)';
          }
          if (instruction) instruction.textContent = 'Decryption Complete // Message Revealed';
        }
      }

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }

      canvas.addEventListener('mousedown', (e) => { isDrawing = true; const p = getPos(e); scratchAt(p.x, p.y); });
      window.addEventListener('mouseup', () => { isDrawing = false; });
      canvas.addEventListener('mousemove', (e) => { if (!isDrawing) return; const p = getPos(e); scratchAt(p.x, p.y); });

      canvas.addEventListener('touchstart', (e) => { isDrawing = true; const p = getPos(e); scratchAt(p.x, p.y); }, { passive: true });
      window.addEventListener('touchend', () => { isDrawing = false; });
      canvas.addEventListener('touchmove', (e) => { if (!isDrawing) return; const p = getPos(e); scratchAt(p.x, p.y); }, { passive: true });

      isScratchInitialized = true;
    }

    // 6. Interactive Calendar & Live Countdown Engine
    let isCalendarInit = false;
    let countdownInterval = null;

    function resetCalendar() {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      const calPhase = document.getElementById('calendarPhase');
      const cntPhase = document.getElementById('countdownPhase');
      if (calPhase) {
        calPhase.style.display = 'block';
        calPhase.style.opacity = '1';
        calPhase.style.transition = '';
      }
      if (cntPhase) {
        cntPhase.style.display = 'none';
        cntPhase.style.opacity = '0';
        cntPhase.style.transition = '';
      }
    }

    function initCalendar() {
      if (isCalendarInit) return;
      const daysGrid = document.getElementById('daysGrid');
      if (!daysGrid) return;
      daysGrid.innerHTML = '';

      const targetDay = ${bDay};
      const targetMonth = "${bMonth}";
      const targetYear = ${bYear};

      // Determine days in month and starting day of week
      const monthIndex = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"].indexOf(targetMonth);
      const mIdx = monthIndex >= 0 ? monthIndex : ${mIdx};
      const firstDay = new Date(targetYear, mIdx, 1).getDay();
      const totalDays = new Date(targetYear, mIdx + 1, 0).getDate();

      for (let e = 0; e < firstDay; e++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day empty';
        daysGrid.appendChild(emptyCell);
      }

      for (let d = 1; d <= totalDays; d++) {
        const cell = document.createElement('div');
        cell.className = 'day' + (d === targetDay ? ' target' : '');
        cell.textContent = d;

        if (d === targetDay) {
          cell.setAttribute('title', 'Your Day of Birth!');
          cell.addEventListener('click', () => {
            const calPhase = document.getElementById('calendarPhase');
            const cntPhase = document.getElementById('countdownPhase');
            if (calPhase && cntPhase) {
              calPhase.style.transition = 'opacity 0.4s';
              calPhase.style.opacity = '0';
              setTimeout(() => {
                calPhase.style.display = 'none';
                cntPhase.style.display = 'flex';
                setTimeout(() => { cntPhase.style.opacity = '1'; }, 40);
                startLiveCountdown();
              }, 400);
            }
          });
        }
        daysGrid.appendChild(cell);
      }
      isCalendarInit = true;
    }

    // Live Lifetime Counter Engine (Time Spent in This Beautiful World)
    function startLiveCountdown() {
      if (countdownInterval) clearInterval(countdownInterval);

      const dEl = document.getElementById('cntDays');
      const hEl = document.getElementById('cntHours');
      const mEl = document.getElementById('cntMins');
      const sEl = document.getElementById('cntSecs');

      let birthTime = new Date("${c.targetDateTime}").getTime();
      if (isNaN(birthTime)) {
        birthTime = new Date(${bYear}, ${mIdx}, ${bDay}, 0, 0, 0).getTime();
      }

      function tick() {
        const now = new Date().getTime();
        const diff = Math.max(0, now - birthTime);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (dEl) dEl.textContent = days.toLocaleString();
        if (hEl) hEl.textContent = (hours < 10 ? '0' : '') + hours;
        if (mEl) mEl.textContent = (mins < 10 ? '0' : '') + mins;
        if (sEl) sEl.textContent = (secs < 10 ? '0' : '') + secs;
      }

      tick();
      countdownInterval = setInterval(tick, 1000);
    }

    // 7. Security Override Keypad & Decryption
    const correctCode = "${c.passcode}";
    let enteredCode = "";
    const dots = document.querySelectorAll('.code-dot');
    const card6 = document.getElementById('card6');
    const keypadPhase = document.getElementById('keypadPhase');
    const terminalPhase = document.getElementById('terminalPhase');
    const finalePhase = document.getElementById('finalePhase');
    const vaultStatusSubtitle = document.getElementById('vaultStatusSubtitle');
    let terminalTimeouts = [];

    function updateDots() {
      dots.forEach((dot, idx) => {
        if (idx < enteredCode.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
      });
    }

    function appendDigit(digit) {
      if (enteredCode.length < 6) {
        enteredCode += digit;
        updateDots();
        if (enteredCode.length === 6) verifyEnteredCode();
      }
    }

    function clearDigits() {
      enteredCode = "";
      updateDots();
    }

    function backspaceDigit() {
      if (enteredCode.length > 0) {
        enteredCode = enteredCode.slice(0, -1);
        updateDots();
      }
    }

    document.querySelectorAll('.key[data-num]').forEach(k => {
      k.addEventListener('click', (e) => {
        appendDigit(e.currentTarget.getAttribute('data-num'));
      });
    });

    const keyClear = document.getElementById('keyClear');
    if (keyClear) keyClear.addEventListener('click', clearDigits);

    const keyBack = document.getElementById('keyBack');
    if (keyBack) keyBack.addEventListener('click', backspaceDigit);

    function verifyEnteredCode() {
      if (enteredCode === correctCode) {
        triggerTerminalDecryption();
      } else {
        if (card6) card6.classList.add('error');
        if (vaultStatusSubtitle) {
          vaultStatusSubtitle.textContent = "ACCESS DENIED // INVALID CODE";
          vaultStatusSubtitle.style.color = "var(--error-red)";
        }
        setTimeout(() => {
          if (card6) card6.classList.remove('error');
          if (vaultStatusSubtitle) {
            vaultStatusSubtitle.textContent = "${escapeHtml(c.vaultSubtitle)}";
            vaultStatusSubtitle.style.color = "rgba(255,255,255,0.6)";
          }
          clearDigits();
        }, 800);
      }
    }

    function triggerTerminalDecryption() {
      if (keypadPhase) {
        keypadPhase.style.opacity = '0';
        keypadPhase.style.transition = 'opacity 0.4s';
        const t1 = setTimeout(() => {
          keypadPhase.style.display = 'none';
          if (terminalPhase) {
            terminalPhase.style.display = 'flex';
            const lines = terminalPhase.querySelectorAll('.term-line');
            lines.forEach((line, idx) => {
              const t2 = setTimeout(() => {
                line.style.opacity = '1';
                if (idx === lines.length - 1) {
                  const t3 = setTimeout(showGrandFinale, 1400);
                  terminalTimeouts.push(t3);
                }
              }, idx * 550);
              terminalTimeouts.push(t2);
            });
          }
        }, 400);
        terminalTimeouts.push(t1);
      }
    }

    function showGrandFinale() {
      if (terminalPhase) {
        terminalPhase.style.opacity = '0';
        terminalPhase.style.transition = 'opacity 0.5s';
        const t4 = setTimeout(() => {
          terminalPhase.style.display = 'none';
          if (finalePhase) {
            finalePhase.style.display = 'flex';
            finalePhase.classList.add('active');
            triggerConfetti();
          }
        }, 500);
        terminalTimeouts.push(t4);
      }
    }

    // Confetti Burst Effect
    function triggerConfetti() {
      try {
        const colors = ['#E5C158', '#FCE698', '#1A365D', '#ffffff', '#B38F36'];
        for (let i = 0; i < 70; i++) {
          const conf = document.createElement('div');
          conf.className = 'sapphire-confetti';
          conf.style.cssText = "position:fixed; z-index:99999; pointer-events:none; border-radius:2px;";
          conf.style.width = (Math.random() * 8 + 4) + 'px';
          conf.style.height = (Math.random() * 6 + 4) + 'px';
          conf.style.background = colors[Math.floor(Math.random() * colors.length)];
          conf.style.left = (window.innerWidth / 2) + 'px';
          conf.style.top = (window.innerHeight / 2) + 'px';
          document.body.appendChild(conf);

          const angle = Math.random() * Math.PI * 2;
          const velocity = Math.random() * 260 + 80;
          const vx = Math.cos(angle) * velocity;
          const vy = Math.sin(angle) * velocity - 100;

          conf.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + vx + 'px, ' + (vy + 400) + 'px) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
          ], {
            duration: Math.random() * 1500 + 1500,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'forwards'
          });

          setTimeout(() => conf.remove(), 3200);
        }
      } catch(_) {}
    }

    function resetVaultKeypadAndFinale() {
      terminalTimeouts.forEach(t => clearTimeout(t));
      terminalTimeouts = [];

      clearDigits();
      if (card6) card6.classList.remove('error');
      if (vaultStatusSubtitle) {
        vaultStatusSubtitle.textContent = "${escapeHtml(c.vaultSubtitle)}";
        vaultStatusSubtitle.style.color = "rgba(255,255,255,0.6)";
      }

      if (finalePhase) {
        finalePhase.classList.remove('active');
        finalePhase.style.display = 'none';
      }
      if (terminalPhase) {
        terminalPhase.style.display = 'none';
        terminalPhase.style.opacity = '1';
        terminalPhase.querySelectorAll('.term-line').forEach(l => {
          l.style.opacity = '0';
        });
      }
      if (keypadPhase) {
        keypadPhase.style.display = 'block';
        keypadPhase.style.opacity = '1';
      }

      document.querySelectorAll('.sapphire-confetti').forEach(el => el.remove());
    }

    // 8. Replay Experience Engine
    window.replayVault = function() {
      // 1. Reset Biometric Scanner (Scene 3)
      resetBiometricScanner();

      // 2. Reset Scratch Pad (Scene 4)
      resetScratchPad();

      // 3. Reset Calendar & Countdown (Scene 5)
      resetCalendar();

      // 4. Reset Keypad, Terminal & Finale (Scene 6)
      resetVaultKeypadAndFinale();

      // 5. Reset all Card 3D tilt effects & glares
      document.querySelectorAll('.glass-card').forEach(card => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        const glare = card.querySelector('.glare');
        if (glare) glare.style.opacity = '0';
      });

      // 6. Return smoothly to Scene 1
      showScene(1);
    };

    window.replayJourney = window.replayVault;
    window.replayExperience = window.replayVault;
    function replayVault() { return window.replayVault(); }
    function replayJourney() { return window.replayJourney(); }
    function replayExperience() { return window.replayExperience(); }

    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) {
      replayBtn.addEventListener('click', window.replayVault);
    }

    // 9. Ambient Pentatonic Luxury Chimes Audio
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

    function playLuxuryChime(freq, duration) {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch(_) {}
    }

    const soundBtn = document.getElementById('soundToggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        soundBtn.textContent = isMusicPlaying ? '❚❚' : '♫';
        soundBtn.style.borderColor = isMusicPlaying ? 'var(--gold-primary)' : 'rgba(229,193,88,0.3)';

        if (isMusicPlaying) {
          getAudioContext();
          const chordNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
          musicTimer = setInterval(() => {
            const freq = chordNotes[Math.floor(Math.random() * chordNotes.length)];
            playLuxuryChime(freq, 2.5);
          }, 1600);
        } else {
          clearInterval(musicTimer);
        }
      });
    }

${watermarkSentinel}
  </script>
</body>
</html>`;
  }

  // Freeze public API interface to prevent tampering
  const SapphireVaultEngine = Object.freeze({
    id: 'sapphire-vault',
    edition: '03',
    title: 'Sapphire Protocol // Luxury Birthday Vault',
    build: buildSapphireVaultTemplateHtml
  });

  Object.defineProperty(global, 'WishCraftTemplate_SapphireVault', {
    value: SapphireVaultEngine,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Attach to global template registry
  if (!global.WishCraftTemplates) global.WishCraftTemplates = {};
  global.WishCraftTemplates['sapphire-vault'] = SapphireVaultEngine;

})(typeof window !== 'undefined' ? window : globalThis);
