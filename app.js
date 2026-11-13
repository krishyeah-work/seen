/* Picto: the app. Vanilla JS, hash routing, no build step. Art comes from art/*.js (window.ART). */
(function () {
  'use strict';
  const { scene: SCENE_ART, prop, icon, ola, avatarBust, avatarFull, bgPanel, glo, gloDay, deco, arrival, spain, AV_DEFAULT } = window.ART;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = $('#app');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const BRAND = 'Picto';
  const DESIGNER = 'Krishna R';
  const REPO = 'https://github.com/krishyeah-work/seen';

  /* ================= Data ================= */
  const KNOWN = [
    { id: 'en', nm: 'English', nt: 'Used across the app' }, { id: 'hi', nm: 'Hindi', nt: 'हिन्दी' }, { id: 'te', nm: 'Telugu', nt: 'తెలుగు' },
    { id: 'ta', nm: 'Tamil', nt: 'தமிழ்' }, { id: 'kn', nm: 'Kannada', nt: 'ಕನ್ನಡ' }, { id: 'mr', nm: 'Marathi', nt: 'मराठी' },
    { id: 'bn', nm: 'Bengali', nt: 'বাংলা' }, { id: 'ml', nm: 'Malayalam', nt: 'മലയാളം' }, { id: 'pt', nm: 'Portuguese', nt: 'Português' },
    { id: 'fr', nm: 'French', nt: 'Français' }, { id: 'it', nm: 'Italian', nt: 'Italiano' }, { id: 'de', nm: 'German', nt: 'Deutsch' }
  ];
  const LANG = Object.fromEntries(KNOWN.map((l) => [l.id, l.nm]));
  const LEARN = [
    { id: 'es', nm: 'Spanish', nt: 'Español', flag: 'linear-gradient(#C60B1E 0 25%, #FFC400 25% 75%, #C60B1E 75%)', on: true },
    { id: 'fr', nm: 'French', nt: 'Français', flag: 'linear-gradient(90deg, #0055A4 0 33.3%, #fff 33.3% 66.6%, #EF4135 66.6%)' },
    { id: 'de', nm: 'German', nt: 'Deutsch', flag: 'linear-gradient(#111 0 33.3%, #DD0000 33.3% 66.6%, #FFCE00 66.6%)' },
    { id: 'it', nm: 'Italian', nt: 'Italiano', flag: 'linear-gradient(90deg, #009246 0 33.3%, #fff 33.3% 66.6%, #CE2B37 66.6%)' },
    { id: 'ja', nm: 'Japanese', nt: '日本語', flag: 'radial-gradient(circle, #BC002D 0 30%, #fff 31%)' },
    { id: 'pt', nm: 'Portuguese', nt: 'Português', flag: 'linear-gradient(90deg, #046A38 0 40%, #DA291C 40%)' },
    { id: 'ko', nm: 'Korean', nt: '한국어', flag: 'radial-gradient(circle, #CD2E3A 0 22%, #0047A0 23% 30%, #fff 31%)' },
    { id: 'nl', nm: 'Dutch', nt: 'Nederlands', flag: 'linear-gradient(#AE1C28 0 33.3%, #fff 33.3% 66.6%, #21468B 66.6%)' }
  ];
  const GOALS = [
    { id: 'everyday', nm: 'Everyday conversations', sub: 'Talk to people around you', pace: 'steady', ic: 'chat' },
    { id: 'travel', nm: 'Travelling soon', sub: 'Get ready quickly', pace: 'fast', ic: 'plane' },
    { id: 'work', nm: 'For work', sub: 'Colleagues, calls and meetings', pace: 'steady', ic: 'bag' },
    { id: 'weekend', nm: 'Weekends only', sub: 'Short on time during the week', pace: 'weekend', ic: 'sun' }
  ];

  // Sound bridges: how a Spanish word sounds in languages the learner already knows.
  const WORDS = {
    mesa: { es: 'mesa', en: 'table', art: 'table', tint: 't-lime', bridges: { hi: 'mez · मेज़', pt: 'mesa' } },
    cafe: { es: 'café', en: 'coffee', art: 'cup', tint: 't-pink', bridges: { en: 'café', hi: 'kaafi · कॉफ़ी', ta: 'kaapi · காப்பி', te: 'kaafi · కాఫీ', kn: 'kaafi · ಕಾಫಿ', ml: 'kaappi · കാപ്പി', fr: 'café', it: 'caffè', pt: 'café', de: 'Kaffee' } },
    pan: { es: 'pan', en: 'bread', art: 'bread', tint: 't-lime', bridges: { hi: 'pav · पाव', mr: 'pav · पाव', bn: 'pauruti · পাউরুটি', pt: 'pão', fr: 'pain', it: 'pane' }, falseFriend: { en: 'Not a frying pan' } },
    agua: { es: 'agua', en: 'water', art: 'glass', tint: 't-blue', bridges: { en: 'aqua', pt: 'água', it: 'acqua' } },
    cuenta: { es: 'la cuenta', en: 'the bill', art: 'receipt', tint: 't-pink', bridges: {} },
    naranja: { es: 'naranja', en: 'orange', art: 'orange', tint: 't-lime', bridges: { hi: 'narangi · नारंगी', te: 'narinja · నారింజ', pt: 'laranja', it: 'arancia' } }
  };
  const LINES = {
    mesa: { cafe: ['¡Hola! ¿Una mesa para uno?', 'Hi! A ___ for one?'] },
    cafe: { cafe: ['Aquí tiene su café.', 'Here’s your ___.'], mercado: ['Muy bien. ¿Y café para casa?', 'Very good. And ___ for home?'], colearn: ['¿Un café mañana?', 'A ___ tomorrow?'] },
    pan: { cafe: ['¿Qué tal el pan?', 'How’s the ___?'], mercado: ['¿Y pan? Está recién hecho.', 'And ___? It’s freshly baked.'], colearn: ['¿Y pan para el desayuno?', 'And ___ for breakfast?'] },
    agua: { cafe: ['¿Y para beber? ¿Agua?', 'And to drink? ___?'], mercado: ['Mira, aquí está el agua.', 'Look, here’s the ___.'], colearn: ['¿Compramos agua para el piso?', 'Shall we buy ___ for the flat?'] },
    cuenta: { cafe: ['Aquí tiene la cuenta.', 'Here’s ___.'], mercado: ['Aquí tiene la cuenta.', 'Here’s ___.'], colearn: ['Aquí tiene la cuenta, chicos.', 'Here’s ___, guys.'] },
    naranja: { colearn: ['Hoy tengo naranjas muy buenas.', 'Today I’ve got really good ___.'] }
  };
  const PLACES = {
    cafe: { nm: 'El café', art: 'cup', tint: 't-pink', what: 'Order breakfast' },
    mercado: { nm: 'El mercado', art: 'cart', tint: 't-lime', what: 'Review at Paco’s shop' },
    colearn: { nm: 'Shopping with Meera', art: 'cart', tint: 't-blue', what: 'Co-learn with Meera' },
    peluqueria: { nm: 'La peluquería', art: 'scissors', tint: 't-pink', what: 'Get a haircut' },
    restaurante: { nm: 'El restaurante', art: 'plate', tint: 't-blue', what: 'Eat out with friends' },
    dentista: { nm: 'El dentista', art: 'tooth', tint: 't-gray', what: 'Explain a toothache' }
  };
  const CITIES = [
    { id: 'barcelona', nm: 'Barcelona', lvl: 1, cefr: 'A1', theme: 'First week · everyday errands', x: 352.5, y: 99, lbl: [336, 128, 'end'], scenes: ['cafe', 'mercado', 'peluqueria', 'restaurante', 'dentista'] },
    { id: 'madrid', nm: 'Madrid', lvl: 2, cefr: 'A1', theme: 'City life', x: 177, y: 136, lbl: [177, 165, 'middle'], cost: 400, acts: ['Take the metro to Sol', 'Order tapas with friends', 'Buy tickets for the Prado'] },
    { id: 'valencia', nm: 'Valencia', lvl: 3, cefr: 'A2', theme: 'Food and the seaside', x: 276.6, y: 172, lbl: [292, 198, 'start'], cost: 900, acts: ['Order paella by the beach', 'Rent a bike for the day', 'Shop at the Mercado Central'] },
    { id: 'sevilla', nm: 'Sevilla', lvl: 4, cefr: 'A2', theme: 'Culture and getting around', x: 108.6, y: 251, lbl: [109, 224, 'middle'], cost: 1600, acts: ['Buy flamenco tickets', 'Ask for directions', 'Take the tram across town'] },
    { id: 'granada', nm: 'Granada', lvl: 5, cefr: 'B1', theme: 'Real conversations', x: 180, y: 259, lbl: [190, 292, 'middle'], cost: 2500, acts: ['Chat with your host family', 'Book a tour of the Alhambra', 'Bargain at a tea shop'] }
  ];
  const HOME_CITY = CITIES[0];
  const PACES = {
    steady: { label: 'Steady · daily', desc: 'One short scene a day', title: 'Your week in Barcelona', slots: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    weekend: { label: 'Weekend explorer', desc: 'Short on time? Live it all on Saturday and Sunday', title: 'Your weekend in Barcelona', slots: ['Sat · morning', 'Sat · afternoon', 'Sun · morning', 'Sun · lunch', 'Bonus scene'] },
    fast: { label: 'Fast track', desc: 'Two scenes a day', title: 'Your 3 days in Barcelona', slots: ['Day 1 · a.m.', 'Day 1 · p.m.', 'Day 2 · a.m.', 'Day 2 · p.m.', 'Day 3'] }
  };

  // Rep points: earned by doing, spent on travel and avatar items. Level follows lifetime Rep.
  const REP = { answer: 10, firstTry: 5, scene: 50, review: 30, colearn: 40, welcome: 60 };
  const LEVELS = [
    { id: 'newbie', nm: 'Newbie', min: 0, stars: 1 },
    { id: 'amateur', nm: 'Amateur', min: 150, stars: 2 },
    { id: 'advanced', nm: 'Advanced', min: 600, stars: 3 },
    { id: 'pro', nm: 'Pro', min: 1500, stars: 4 }
  ];
  const levelOf = (r) => LEVELS.filter((l) => r >= l.min).pop();
  const nextLevel = (r) => LEVELS.find((l) => l.min > r);

  const SHOP = {
    cap: { label: 'Hats', items: [
      { id: 'cap-none', nm: 'No hat', cost: 0, set: { cap: 'none' } },
      { id: 'cap-pink', nm: 'Pink cap', cost: 0, set: { cap: 'cap', capC: '#FF6FB5' } },
      { id: 'cap-blue', nm: 'Blue cap', cost: 40, set: { cap: 'cap', capC: '#3A5AFF' } },
      { id: 'beanie', nm: 'Lime beanie', cost: 60, set: { cap: 'beanie', capC: '#C6F432' } },
      { id: 'sunhat', nm: 'Sun hat', cost: 120, set: { cap: 'sunhat', capC: '#F5D76E' } }] },
    top: { label: 'Tops', items: [
      { id: 'tee-blue', nm: 'Blue tee', cost: 0, set: { top: 'tee', topC: '#3A5AFF' } },
      { id: 'tee-lime', nm: 'Lime tee', cost: 30, set: { top: 'tee', topC: '#C6F432' } },
      { id: 'stripes', nm: 'Stripes', cost: 70, set: { top: 'stripes', topC: '#FF6FB5' } },
      { id: 'hoodie', nm: 'Hoodie', cost: 90, set: { top: 'hoodie', topC: '#0B0B0B' } },
      { id: 'jacket', nm: 'Denim jacket', cost: 150, set: { top: 'jacket', topC: '#4B6CB7' } }] },
    pack: { label: 'Backpacks', items: [
      { id: 'pack-pink', nm: 'Pink pack', cost: 0, set: { pack: 'pack', packC: '#FF6FB5' } },
      { id: 'pack-lime', nm: 'Lime pack', cost: 30, set: { pack: 'pack', packC: '#C6F432' } },
      { id: 'pack-orange', nm: 'Orange pack', cost: 50, set: { pack: 'pack', packC: '#FFA62B' } },
      { id: 'pack-none', nm: 'No pack', cost: 0, set: { pack: 'none' } }] },
    badge: { label: 'Badges', items: [
      { id: 'badge-none', nm: 'No badge', cost: 0, set: { badge: 'none' } },
      { id: 'badge-star', nm: 'Star pin', cost: 20, set: { badge: 'star' } },
      { id: 'badge-heart', nm: 'Heart pin', cost: 30, set: { badge: 'heart' } },
      { id: 'badge-spain', nm: 'Spain pin', cost: 60, set: { badge: 'spain' } }] },
    eyes: { label: 'Eyewear', items: [
      { id: 'eyes-none', nm: 'None', cost: 0, set: { eyes: 'none' } },
      { id: 'glasses', nm: 'Glasses', cost: 40, set: { eyes: 'glasses' } },
      { id: 'shades', nm: 'Sunglasses', cost: 80, set: { eyes: 'shades' } },
      { id: 'goggles', nm: 'Goggles', cost: 150, set: { eyes: 'goggles' } }] },
    bg: { label: 'Background', items: [
      { id: 'bg-lime', nm: 'Lemons', cost: 0, set: { bg: 'lime' } },
      { id: 'bg-blue', nm: 'Sky', cost: 0, set: { bg: 'sky' } },
      { id: 'bg-pink', nm: 'Blossom', cost: 20, set: { bg: 'pink' } },
      { id: 'bg-sun', nm: 'Sunset', cost: 40, set: { bg: 'sunset' } }] }
  };
  const BASE_LOOK = { skin: '#C98B5E', hair: 'short', hairC: '#1F1A17' };

  const FRIENDS = [
    { id: 'meera', nm: 'Meera', lang: 'Spanish', city: 'barcelona', where: 'Barcelona', level: 'amateur', av: { skin: '#8D5A3B', hair: 'long', hairC: '#1A1A1A', fem: true, top: 'stripes', topC: '#FF6FB5', pack: 'pack', packC: '#C6F432', badge: 'heart', bg: 'pink' } },
    { id: 'daniel', nm: 'Daniel', lang: 'Spanish', city: 'madrid', where: 'Madrid', level: 'advanced', av: { skin: '#F2C29B', hair: 'short', hairC: '#7A4A22', beard: true, cap: 'cap', capC: '#3A5AFF', top: 'tee', topC: '#C6F432', pack: 'pack', packC: '#FFA62B', eyes: 'glasses', bg: 'sky' } },
    { id: 'sara', nm: 'Sara', lang: 'Spanish', city: 'sevilla', where: 'Sevilla', level: 'pro', av: { skin: '#C98B5E', hair: 'long', hairC: '#5A3418', fem: true, cap: 'sunhat', capC: '#F5D76E', top: 'jacket', topC: '#4B6CB7', pack: 'pack', packC: '#FF6FB5', badge: 'spain', eyes: 'shades', bg: 'sunset' } },
    { id: 'priya', nm: 'Priya', lang: 'Japanese', where: 'Kyoto', level: 'advanced', av: { skin: '#B07A52', hair: 'long', hairC: '#24160E', fem: true, cap: 'beanie', capC: '#FF6FB5', top: 'hoodie', topC: '#0B0B0B', pack: 'pack', packC: '#C6F432', bg: 'pink' } },
    { id: 'rohan', nm: 'Rohan', lang: 'German', where: 'Berlin', level: 'amateur', av: { skin: '#A86B45', hair: 'buzz', hairC: '#1A1A1A', top: 'tee', topC: '#FFA62B', pack: 'pack', packC: '#3A5AFF', badge: 'star', bg: 'lime' } },
    { id: 'arjun', nm: 'Arjun', lang: 'French', where: 'Lyon', level: 'newbie', av: { skin: '#E0A77E', hair: 'short', hairC: '#3A2414', top: 'tee', topC: '#3A5AFF', pack: 'pack', packC: '#C6F432', bg: 'sky' } }
  ];
  const friend = (id) => FRIENDS.find((f) => f.id === id);
  const CHARS = {
    lucia: { nm: 'Lucía', g: 'f' },
    paco: { nm: 'Paco', g: 'm' },
    meera: { nm: 'Meera', g: 'f' }
  };
  const CAMS = {
    cafe: { hero: { x: 330, y: 250, s: 0.85 }, wide: { x: 380, y: 250, s: 0.8 }, table: { x: 180, y: 345, s: 1.3 }, menuL: { x: 270, y: 170, s: 1.05 }, lucia: { x: 480, y: 200, s: 1.2 } },
    mercado: { hero: { x: 400, y: 250, s: 0.9 }, wide: { x: 400, y: 250, s: 0.85 }, shop: { x: 420, y: 250, s: 0.85 } }
  };
  const SHOP_LIVE = ['agua', 'zumo', 'pan', 'naranja', 'cafe'];
  const SHOP_WRONG = {
    agua: 'Those are bottles of agua. Look again.',
    zumo: 'Those cartons are juice. Look again.',
    pan: 'That’s pan, something to eat. Look again.',
    naranja: 'Those are fruit. Look again.',
    cafe: 'Those are coffee packets. Look again.'
  };

  const SCENES = {
    cafe: {
      id: 'cafe', art: 'cafe', place: 'cafe', title: 'Café La Plaza', where: 'Barrio Gótico, Barcelona', tag: 'Day 1 · Barcelona', mins: 5,
      activity: 'Order breakfast at Café La Plaza', speaker: 'lucia',
      acts: ['present-l', 'shrug', 'present-l', 'idea', 'present', 'hips', 'present', 'present-l', 'wave'],
      blurb: 'It’s 9 a.m. on your first morning in Barcelona. Lucía runs the little café on the corner. Find a table, order, chat and pay, all in Spanish.',
      meta: [['clock', '5 min'], ['cards', '5 new words'], ['chat', 'With Lucía']],
      whoLine: 'You’ll meet <b>Lucía</b>. She runs the café and speaks slowly for newcomers.',
      moments: [
        { word: 'mesa', who: 'lucia', cam: 'wide', line: '¡Hola! ¿Una mesa para uno?', gloss: 'Hi! A ___ for one?', type: 'tap', live: ['table', 'chair', 'lucia'], answer: 'table',
          prompt: 'Lucía is offering you a <b>mesa</b>.', sub: 'Tap it in the scene.', after: 'table', ok: 'You sit down by the window.',
          wrong: { chair: 'Close! That’s for sitting on. A mesa is where things go.', lucia: 'That’s Lucía. Look for the mesa she’s offering you.' } },
        { word: 'cafe', who: 'lucia', cam: 'menuL', line: '¿Qué le pongo?', gloss: 'What can I get you?', type: 'tap', live: ['menu-cafe', 'menu-pan', 'menu-agua'], answer: 'menu-cafe',
          prompt: 'Lucía asks what you’d like. You fancy a coffee.', sub: 'Find <b>café</b> on her menu.', props: ['cup'], after: 'table', ok: 'Un café, coming right up.',
          wrong: { 'menu-pan': 'That line is something to eat. Keep looking for café.', 'menu-agua': 'That one is a drink, but not café. Keep looking.' } },
        { word: 'cafe', who: 'lucia', cam: 'table', line: 'Aquí tiene su café.', gloss: 'Here’s your ___.', type: 'pick', options: ['glass', 'cup', 'bread'], answer: 'cup',
          prompt: 'Lucía puts something down on your table.', sub: 'Which one is your <b>café</b>?', ok: 'Smell that? Your first café in Barcelona.',
          wrong: { glass: 'That’s a drink too, but café is hot. Look for the steam.', bread: 'That’s something to eat. Your café is hot.' } },
        { word: 'pan', who: 'lucia', cam: 'lucia', line: '¿Y para comer? Hay pan con tomate.', gloss: 'And to eat? There’s ___ with tomato.', type: 'pick', options: ['cup', 'bread', 'glass'], answer: 'bread',
          prompt: 'Now Lucía suggests something to eat.', sub: 'Which one is <b>pan</b>?', props: ['bread'], after: 'table', ok: 'Pan con tomate: toast with tomato and olive oil.',
          wrong: { cup: 'That’s your café. Pan is something to eat.', glass: 'That’s for drinking. Pan is something to eat.' } },
        { word: 'agua', who: 'lucia', cam: 'lucia', line: '¿Y para beber? ¿Agua?', gloss: 'And to drink? ___?', type: 'reply',
          replies: [{ es: 'Sí, agua, por favor.', en: 'Yes, ___, please.', props: ['glass'], ok: 'Lucía brings you a glass of agua.' }, { es: 'No, gracias.', en: 'No, thanks.', props: ['glass'], ok: 'Lucía leaves a little agua anyway, just in case.' }],
          prompt: 'Lucía offers you something to drink.', sub: 'How do you answer?', after: 'table' },
        { word: 'pan', who: 'lucia', cam: 'table', later: 'Ten minutes later…', line: '¿Qué tal el pan?', gloss: 'How’s the ___?', type: 'tap', live: ['cup', 'bread', 'glass'], answer: 'bread',
          prompt: 'Lucía comes back to check on you.', sub: 'Tap the <b>pan</b> she’s asking about.', ok: '¡Muy rico! Lucía smiles.',
          wrong: { cup: 'That’s your café. Which one did you eat?', glass: 'That’s your drink. Which one did you eat?' } },
        { word: 'agua', who: 'lucia', cam: 'lucia', line: '¿Más agua?', gloss: 'More ___?', type: 'reply',
          replies: [{ es: 'Sí, más agua, por favor.', en: 'Yes, more ___, please.', ok: 'Lucía tops up your glass.' }, { es: 'No, gracias. Está bien.', en: 'No, thanks. I’m fine.', ok: 'You’re all set.' }],
          prompt: 'She notices your glass is nearly empty.', sub: 'Answer Lucía.', after: 'table' },
        { word: 'cuenta', who: 'lucia', cam: 'table', later: 'Twenty minutes later…', line: 'Aquí tiene la cuenta.', gloss: 'Here’s ___.', type: 'pick', options: ['menucard', 'receipt', 'coins'], answer: 'receipt',
          enter: { props: ['receipt'], eat: true }, noBridge: true, prompt: 'Breakfast is done. Lucía puts something on your table.', sub: 'What is <b>la cuenta</b>?', ok: 'Cinco euros. Breakfast: done.',
          wrong: { menucard: 'You’ve already ordered. Look at what’s on your table now.', coins: 'Close! You’ll need those to pay it. What did Lucía bring?' } },
        { word: 'mesa', who: 'lucia', cam: 'lucia', line: '¡Gracias! ¿Le guardo la mesa para mañana?', gloss: 'Thanks! Shall I keep the ___ for you tomorrow?', type: 'reply',
          replies: [{ es: '¡Sí, por favor!', en: 'Yes, please!', ok: 'Same table tomorrow. You’re a regular now.' }, { es: 'No, gracias.', en: 'No, thanks.', ok: 'No problem. See you around.' }],
          prompt: 'Lucía wants to save your spot.', sub: 'Answer her.' }
      ],
      outro: {
        who: 'lucia', line: '¡Hasta mañana!', gloss: 'See you tomorrow!', title: 'Breakfast, sorted', text: 'You found a table, ordered, chatted and paid, all in Spanish.',
        tryToday: 'Un café y pan con tomate, por favor.', tryEn: 'A ___ and ___ with tomato, please.',
        culture: 'In Spain, <b>pan con tomate</b> is a breakfast classic: toasted bread rubbed with ripe tomato, olive oil and a pinch of salt.',
        next: 'Tomorrow at Paco’s shop you’ll meet <b>agua</b>, <b>pan</b> and <b>café</b> again, in a new place.'
      }
    },
    mercado: {
      id: 'mercado', art: 'mercado', place: 'mercado', title: 'El mercado', where: 'Paco’s corner shop, Barcelona', tag: 'Day 2 · Review', mins: 3, review: true, requires: 'cafe',
      activity: 'Pick up groceries at Paco’s shop', speaker: 'paco',
      acts: ['hips', 'present-l', 'idea', 'present'],
      blurb: 'Paco runs the shop on your street. Find the words you met at the café on his shelves. No pictures to choose from this time: just the word and its sound.',
      meta: [['clock', '3 min'], ['refresh', 'Review'], ['chat', 'With Paco']],
      whoLine: 'You’ll meet <b>Paco</b>. He always has fresh bread.',
      moments: [
        { word: 'agua', who: 'paco', cam: 'shop', line: '¡Buenos días! ¿Qué necesita hoy?', gloss: 'Good morning! What do you need today?', type: 'tap', live: SHOP_LIVE, answer: 'agua', prompt: 'Remember this one from the café?', sub: 'Find the <b>agua</b> on Paco’s shelf.', ok: 'Agua: first at the café, now at the shop.', wrong: SHOP_WRONG },
        { word: 'cafe', who: 'paco', cam: 'shop', line: 'Muy bien. ¿Y café para casa?', gloss: 'Very good. And ___ for home?', type: 'tap', live: SHOP_LIVE, answer: 'cafe', prompt: 'Paco sells coffee to take home.', sub: 'Find the <b>café</b>.', ok: 'Café para casa. Lucía would approve.', wrong: SHOP_WRONG },
        { word: 'pan', who: 'paco', cam: 'shop', line: '¿Y pan? Está recién hecho.', gloss: 'And ___? It’s freshly baked.', type: 'tap', live: SHOP_LIVE, answer: 'pan', prompt: 'Paco’s favourite.', sub: 'Find the <b>pan</b>.', ok: 'Pan, from the café. Now it lives in two places.', wrong: SHOP_WRONG },
        { word: 'cuenta', who: 'paco', cam: 'shop', line: 'Aquí tiene la cuenta.', gloss: 'Here’s ___.', type: 'pick', options: ['receipt', 'menucard', 'coins'], answer: 'receipt', prompt: 'Time to pay.', sub: 'What does Paco hand you?', ok: 'Four euros. All done.',
          wrong: { menucard: 'That’s a menu. Paco is asking you to pay.', coins: 'You’ll pay with those. What does Paco hand you?' } }
      ],
      outro: {
        who: 'paco', line: '¡Gracias! ¡Hasta luego!', gloss: 'Thanks! See you later!', title: 'Words, stronger', text: 'Every word you found just picked up a new place to live.',
        tryToday: 'Agua y pan, por favor.', tryEn: '___ and ___, please.',
        culture: 'Spanish neighbourhood shops often sell <b>pan del día</b>, bread baked that morning.',
        next: 'Next: shopping with a friend. Find Meera on your map and co-learn together.'
      }
    },
    colearn: {
      id: 'colearn', art: 'mercado', artOpts: () => ({ friend: friend('meera').av, friendId: 'meera' }), place: 'colearn', title: 'Shopping with Meera', where: 'Paco’s shop, Barcelona', tag: 'Co-learn · Barcelona', mins: 4, requires: 'cafe', colearn: 'meera',
      activity: 'Go shopping with Meera', speaker: 'meera',
      acts: ['wave', 'idea', 'present-l', 'shrug', 'present', 'wave'],
      blurb: 'Meera is learning Spanish too. Meet her at Paco’s shop, help each other out and buy breakfast for tomorrow.',
      meta: [['clock', '4 min'], ['cards', '1 new word'], ['users', 'With Meera']],
      whoLine: 'You’re co-learning with <b>Meera</b>. She’s one level ahead of you.',
      moments: [
        { word: 'agua', who: 'meera', cam: 'shop', line: '¡Hola! ¿Compramos agua para el piso?', gloss: 'Hi! Shall we buy ___ for the flat?', type: 'reply',
          replies: [{ es: '¡Sí, agua!', en: 'Yes, ___!', ok: 'Meera grins. Teamwork.' }, { es: 'Sí, claro.', en: 'Yes, of course.', ok: 'Meera grins. Teamwork.' }], prompt: 'Meera waves you over.', sub: 'Answer her.' },
        { word: 'agua', who: 'meera', cam: 'shop', line: 'Mira, ahí está el agua.', gloss: 'Look, there’s the ___.', type: 'tap', live: SHOP_LIVE, answer: 'agua', prompt: 'Meera spotted it first.', sub: 'Tap the <b>agua</b>.', ok: 'Two bottles in the basket.', wrong: SHOP_WRONG },
        { word: 'naranja', who: 'paco', cam: 'shop', line: '¡Hola, chicos! Hoy tengo naranjas muy buenas.', gloss: 'Hi, guys! Today I’ve got really good ___.', type: 'tap', live: SHOP_LIVE, answer: 'naranja', prompt: 'Paco has something new for you both.', sub: 'Tap the <b>naranjas</b>.', ok: 'Naranjas: a new word, learned with a friend.',
          wrong: { agua: 'You already have agua. Paco means something new.', zumo: 'Close! Juice is made from them. Look for the fruit.', pan: 'That’s pan. Paco means the fruit.', cafe: 'Those are coffee packets. Look for the fruit.' } },
        { word: 'pan', who: 'meera', cam: 'shop', line: '¿Y pan para el desayuno?', gloss: 'And ___ for breakfast?', type: 'pick', options: ['orange', 'bread', 'cup'], answer: 'bread', prompt: 'Meera is planning breakfast.', sub: 'Which one is <b>pan</b>?', ok: 'Breakfast for tomorrow: sorted.',
          wrong: { orange: 'That’s a naranja. Pan is baked.', cup: 'That’s a café. Pan is baked.' } },
        { word: 'cuenta', who: 'paco', cam: 'shop', line: 'Aquí tiene la cuenta, chicos.', gloss: 'Here’s ___, guys.', type: 'pick', options: ['coins', 'receipt', 'menucard'], answer: 'receipt', prompt: 'Paco totals it up.', sub: 'What does he hand you?', ok: 'You split it with Meera.',
          wrong: { coins: 'You’ll pay with those. What does Paco hand you?', menucard: 'That’s a menu. Paco wants you to pay.' } },
        { word: 'cafe', who: 'meera', cam: 'shop', line: '¡Gracias por venir! ¿Un café mañana?', gloss: 'Thanks for coming! A ___ tomorrow?', type: 'reply',
          replies: [{ es: '¡Sí, un café!', en: 'Yes, a ___!', ok: 'See you at Café La Plaza.' }, { es: 'Mañana no, gracias.', en: 'Not tomorrow, thanks.', ok: 'Maybe another day.' }], prompt: 'Meera has an idea.', sub: 'Answer her.' }
      ],
      outro: {
        who: 'meera', line: '¡Hasta mañana!', gloss: 'See you tomorrow!', title: 'Better together', text: 'You and Meera shopped, chatted and split the bill, all in Spanish.',
        tryToday: '¿Un café mañana?', tryEn: 'A ___ tomorrow?',
        culture: 'Spanish markets often sell fruit by the kilo. Ask for <b>un kilo de naranjas</b>.',
        next: 'Co-learning earns bonus Rep for both of you.'
      }
    }
  };

  /* ================= State ================= */
  const KEY = 'picto-v1', OLD_KEY = 'seen-proto-v3';
  const INITIAL = () => ({
    v: 3, known: [], learning: null, goal: null, sound: true, rep: 0, repEarned: 0, pace: 'steady', arrived: false,
    words: {}, order: [], fresh: [], done: {}, last: null, greeted: {}, tours: {}, log: {}, stuck: null, colearn: {},
    eq: { cap: 'cap-none', top: 'tee-blue', pack: 'pack-pink', badge: 'badge-none', eyes: 'eyes-none', bg: 'bg-lime' }, owned: []
  });
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY)); if (s && s.v === 3) return Object.assign(INITIAL(), s); } catch (e) { /* storage unavailable */ }
    return INITIAL();
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }
  const UI = { filter: 'all', langSel: null, learn: null, city: 'barcelona', tab: 'cap', search: '', goal: null, ffilter: 'all' };
  if (state.learning) UI.learn = state.learning;
  const bankCount = () => Object.keys(state.words).length;
  const isMobile = () => window.innerWidth < 820;
  const inScene = () => document.body.classList.contains('in-scene');
  const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const shopItem = (tab, id) => SHOP[tab].items.find((i) => i.id === id);
  const owns = (it) => it.cost === 0 || state.owned.includes(it.id);
  function myLook() {
    const c = Object.assign({}, AV_DEFAULT, BASE_LOOK);
    Object.keys(SHOP).forEach((t) => { const it = shopItem(t, state.eq[t]); if (it) Object.assign(c, it.set); });
    return c;
  }
  const myBust = (cls) => avatarBust(myLook(), cls);
  const myFull = (cls, wave) => avatarFull(myLook(), cls, wave);
  function addRep(n) {
    state.rep += n;
    if (n > 0) state.repEarned += n;
    save();
    $$('[data-rep]').forEach((el) => {
      el.textContent = state.rep;
      const p = el.closest('.rep-pill');
      if (p) { p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); }
    });
  }
  const repPill = (asButton = true) => asButton
    ? `<button type="button" class="rep-pill" data-action="repInfo" aria-label="${state.rep} Rep points. What is Rep?">${icon('star')}<b data-rep>${state.rep}</b><span class="rp-l">Rep</span></button>`
    : `<span class="rep-pill" aria-label="Rep points">${icon('star')}<b data-rep>${state.rep}</b><span class="rp-l">Rep</span></span>`;
  function cityStates() {
    const homeDone = HOME_CITY.scenes.every((p) => state.done[p]);
    return CITIES.map((c, i) => Object.assign({}, c, { state: i === 0 ? (homeDone ? 'done' : 'now') : 'locked' }));
  }
  function logToday(patch) {
    const k = todayKey();
    const d = state.log[k] || { min: 0, words: [], scenes: [], rep: 0 };
    d.min += patch.min || 0;
    d.rep += patch.rep || 0;
    (patch.words || []).forEach((w) => { if (!d.words.includes(w)) d.words.push(w); });
    if (patch.scene) d.scenes.push(patch.scene);
    state.log[k] = d;
    save();
  }

  /* ================= Speech (female and male voices) ================= */
  const MALE = /pablo|alvaro|álvaro|jorge|diego|carlos|raul|raúl|enrique|dario|darío|gerardo|tomas|tomás|juan|andr[eé]s|male|hombre/i;
  const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const NOVELTY = /\b(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|kathy|fred|ralph)\b/i;
  const FEMALE = /helena|laura|elvira|luc[ií]a|m[oó]nica|paulina|sabina|ximena|dalia|elena|abril|conchita|pen[eé]lope|lupe|marisol|google|female|mujer/i;
  const Speech = {
    voices: [],
    init() {
      if (!('speechSynthesis' in window)) return;
      const pick = () => {
        // Novelty voices (Apple's Eddy, Flo, Grandpa, Zarvox and friends) sound robotic: never use them.
        const list = speechSynthesis.getVoices().filter((v) => /^es/i.test(v.lang) && !NOVELTY.test(v.name));
        // Desktop keeps the browser's own order (the setup learners liked); iPhone and iPad rank by quality.
        this.voices = IOS ? list.sort((a, b) => this.score(b) - this.score(a)) : list;
      };
      pick();
      speechSynthesis.onvoiceschanged = pick;
      [300, 1200, 3000].forEach((t) => setTimeout(pick, t)); // Safari fills the list late
      // iOS only lets a page speak after a user gesture: unlock speech on the first tap.
      const unlock = () => { try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) { /* ignore */ } document.removeEventListener('pointerdown', unlock, true); };
      document.addEventListener('pointerdown', unlock, true);
    },
    // Higher is better: natural or enhanced voices first, then Spain Spanish, then any Spanish.
    score(v) {
      let s = 0;
      if (/natural|neural|premium|enhanced|mejorada|online/i.test(v.name)) s += 8;
      if (/es[-_]ES/i.test(v.lang)) s += 3;
      if (/google/i.test(v.name)) s += 6;
      if (/m[oó]nica|paulina|marisol|jorge|juan|elvira|[aá]lvaro|dalia/i.test(v.name)) s += 2;
      if (v.localService === false) s += 1;
      return s;
    },
    voiceFor(g) {
      const list = IOS ? this.voices : this.voices.filter((v) => /es[-_]ES/i.test(v.lang)).concat(this.voices);
      if (g === 'm') return list.find((v) => MALE.test(v.name)) || null;
      return list.find((v) => FEMALE.test(v.name)) || list.find((v) => !MALE.test(v.name)) || null;
    },
    tok: 0,
    say(text, slow, btn, g = 'f', who) {
      if (!('speechSynthesis' in window)) { toast('Audio isn’t available in this browser'); if (who) timedTalk(who, text, slow); return; }
      speechSynthesis.cancel();
      const tok = ++this.tok;
      const u = new SpeechSynthesisUtterance(text.replace(/[¡¿]/g, ''));
      u.lang = 'es-ES';
      // The original desktop settings: Spain Spanish, a little slower than normal for learners, a touch brighter for women.
      // No male voice installed? Desktop lowers the default voice; iOS uses its best voice with a gentle drop, since a big one sounds robotic there.
      let v = this.voiceFor(g);
      const fallback = !v;
      if (!v && IOS) v = this.voices[0] || null;
      if (v) u.voice = v;
      u.pitch = g === 'm' ? (fallback ? (IOS ? 0.82 : 0.5) : 0.95) : 1.08;
      u.rate = slow ? 0.62 : 0.92;
      let started = false;
      // If the engine never starts (no voice, blocked audio), still animate for the line's length.
      const fb = who ? setTimeout(() => { if (!started) timedTalk(who, text, slow); }, 700) : 0;
      u.onstart = () => { started = true; clearTimeout(fb); if (tok === this.tok) talking(who, true); };
      u.onend = u.onerror = () => { clearTimeout(fb); if (btn) btn.classList.remove('playing'); if (tok === this.tok) talking(who, false); };
      if (btn) btn.classList.add('playing');
      speechSynthesis.speak(u);
    },
    stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
  };

  /* ================= Toast, fly, confetti ================= */
  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), Math.max(2600, msg.length * 55));
  }
  function bumpCount() { $$('.count').forEach((c) => { c.textContent = bankCount(); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }); }
  function flyToBank(text, fromEl) {
    const target = $('#bankCount');
    if (!target || !fromEl || reduced || !target.offsetParent) { bumpCount(); return; }
    const a = fromEl.getBoundingClientRect(), b = target.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'fly';
    el.textContent = text;
    document.body.appendChild(el);
    el.style.left = a.left + 'px';
    el.style.top = a.top + 'px';
    const dx = b.left + b.width / 2 - (a.left + el.offsetWidth / 2), dy = b.top + b.height / 2 - (a.top + el.offsetHeight / 2);
    el.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 70}px) scale(1.08)`, opacity: 1, offset: 0.5 }, { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0.3 }], { duration: 950, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => { el.remove(); bumpCount(); };
  }
  function confetti() {
    if (reduced) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const cols = ['#3A5AFF', '#C6F432', '#FF6FB5', '#0B0B0B'];
    for (let i = 0; i < 48; i++) {
      const p = document.createElement('i'), size = 8 + Math.random() * 12;
      Object.assign(p.style, { left: Math.random() * 100 + '%', width: size + 'px', height: (Math.random() < 0.5 ? size : size * 0.45) + 'px', background: cols[i % 4], borderRadius: Math.random() < 0.4 ? '50%' : '3px', animationDuration: 1.8 + Math.random() * 1.6 + 's', animationDelay: Math.random() * 0.5 + 's' });
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4400);
  }

  /* ================= Glo, the learning buddy ================= */
  const Glo = {
    el: null, timer: null, ctx: null, actions: null,
    mount() {
      const d = document.createElement('div');
      d.className = 'ola-dock';
      d.innerHTML = `<div class="ola-bubble" role="status" aria-live="polite"></div><button class="ola-btn" type="button" aria-label="Glo, your learning buddy. Ask for help">${glo({ cls: 'glo-dock' })}</button>`;
      document.body.appendChild(d);
      this.el = d;
      d.querySelector('.ola-btn').addEventListener('click', () => this.tap());
      document.addEventListener('click', (e) => {
        const b = e.target.closest('.ola-bubble button, .ola-inline button');
        if (!b) return;
        if (b.classList.contains('ola-x')) { this.hide(); return; }
        const a = this.actions && this.actions[+b.dataset.i];
        this.hide();
        if (a) a.fn();
      });
      document.addEventListener('pointermove', (e) => this.look(e), { passive: true });
      document.addEventListener('pointerdown', (e) => { if (this.el.classList.contains('talk') && !this.el.contains(e.target) && !e.target.closest('.tab-ola, .ola-mini')) this.hide(); });
    },
    // Glo's eyes follow the pointer.
    look(e) {
      const g = this.el.querySelector('.glo');
      if (!g || g.dataset.mood === 'think') return;
      const r = g.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.45, ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const d = Math.min(4.6, Math.hypot(e.clientX - cx, e.clientY - cy) / 46);
      g.style.setProperty('--gx', (Math.cos(ang) * d).toFixed(2) + 'px');
      g.style.setProperty('--gy', (Math.sin(ang) * d).toFixed(2) + 'px');
    },
    all() { return $$('.ola-dock .glo, .ola-mini .glo, .tab-ola .glo'); },
    say(html, opts = {}) {
      clearTimeout(this.timer);
      this.actions = opts.actions || null;
      const acts = this.actions ? `<div class="ola-acts">${this.actions.map((a, i) => `<button type="button" data-i="${i}">${a.icon ? icon(a.icon) : ''}${a.label}</button>`).join('')}</div>` : '';
      const x = `<button type="button" class="ola-x" aria-label="Close">${icon('x')}</button>`;
      if (inScene()) {
        const slot = $('#olaSlot');
        if (!slot) return;
        slot.innerHTML = `<div class="ola-inline" role="status">${ola('oi-face')}<div class="oi-body"><span class="nm">Glo</span><div>${html}</div>${acts}</div>${x}</div>`;
        this.jump();
        if (!this.actions) this.timer = setTimeout(() => this.hide(), opts.ms || 6500);
        return;
      }
      this.el.querySelector('.ola-bubble').innerHTML = `<span class="nm">Glo</span>${html}${acts}${x}`;
      this.el.classList.add('talk', 'up');
      this.mood('talk');
      if (!this.actions) this.timer = setTimeout(() => this.hide(), opts.ms || 5200);
    },
    hide() {
      clearTimeout(this.timer);
      this.el.classList.remove('talk', 'up');
      this.mood();
      const s = $('#olaSlot');
      if (s) s.innerHTML = '';
    },
    // Squash, jump, land. The mood turns to joy for the length of the jump.
    jump() {
      this.all().forEach((g) => { g.classList.remove('is-jump'); void g.getBoundingClientRect(); g.classList.add('is-jump'); });
      this.el.classList.add('hop');
      this.mood('joy');
      clearTimeout(this.jt);
      this.jt = setTimeout(() => { this.all().forEach((g) => g.classList.remove('is-jump')); this.el.classList.remove('hop'); this.mood(this.el.classList.contains('talk') ? 'talk' : ''); }, 1300);
    },
    wave() { this.all().forEach((g) => { g.classList.remove('is-wave'); void g.getBoundingClientRect(); g.classList.add('is-wave'); }); },
    // idle | happy | joy | talk | think | wow | soft | sleep
    mood(m) { this.all().forEach((g) => { g.dataset.mood = m || 'idle'; }); },
    // Tapping Glo always does something: it answers for the screen you're on, or says hello.
    tap() {
      if (Tour.id) Tour.end(true);
      if (this.el.classList.contains('talk') || ($('#olaSlot') && $('#olaSlot').innerHTML)) { this.hide(); return; }
      this.wave();
      if (typeof this.ctx === 'function') this.ctx();
      else this.say(this.ctx || 'Hi, I’m <b>Glo</b>. Tap me whenever you’re stuck and I’ll help.');
    },
    context(c) { this.ctx = c; },
    once(key, html, delay = 900) {
      if (state.greeted[key] || isMobile()) return;
      state.greeted[key] = true;
      save();
      later(() => this.say(html), delay);
    }
  };

  /* ================= Helpers ================= */
  let timers = [];
  function later(fn, ms) { const t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  const svgArt = (k, cls = 'art') => prop(k).replace('<svg ', `<svg class="${cls}" `);
  const blankify = (s) => esc(s).replace(/___/g, '<span class="blank" aria-label="the new word"></span>');
  function dots(n, grow) {
    let h = '';
    for (let i = 0; i < 5; i++) h += `<i class="${i < n ? 'on' : ''}${grow && i === n - 1 ? ' grow' : ''}"></i>`;
    return `<span class="dots" aria-label="Met in ${n} of 5 scenes">${h}</span>`;
  }
  function hl(line, word, interactive) {
    const i = word ? line.toLowerCase().indexOf(word.toLowerCase()) : -1;
    if (i < 0) return esc(line);
    const w = esc(line.slice(i, i + word.length));
    const span = interactive ? `<span class="nw" role="button" tabindex="0" data-action="sayWord" title="Hear it">${w}</span>` : `<span class="nw">${w}</span>`;
    return esc(line.slice(0, i)) + span + esc(line.slice(i + word.length));
  }
  function bridgeChips(id, opts = {}) {
    const w = WORDS[id], out = [];
    state.known.forEach((l) => { if (w.bridges[l]) out.push(`<span class="chip"><b>${esc(w.bridges[l])}</b><small>sounds alike · ${LANG[l]}</small></span>`); });
    if (w.falseFriend) state.known.forEach((l) => { if (w.falseFriend[l]) out.push(`<span class="chip false"><b>${esc(w.falseFriend[l])}</b><small>false friend · ${LANG[l]}</small></span>`); });
    if (!out.length && opts.noBridge) out.push('<span class="chip none">No sound-alike in your languages. The scene is your clue.</span>');
    return out.join('');
  }
  function firstBridge(id) {
    const w = WORDS[id];
    const l = state.known.find((x) => x !== 'en' && w.bridges[x]) || state.known.find((x) => w.bridges[x]);
    return l ? { lang: LANG[l], word: w.bridges[l].split(' · ')[0] } : null;
  }
  function learn(id, place) {
    const isNew = !state.words[id];
    const arr = state.words[id] || [];
    const grew = !arr.includes(place);
    if (grew) arr.push(place);
    state.words[id] = arr;
    if (isNew) { state.order.push(id); state.fresh.push(id); }
    save();
    return { isNew, grew, count: arr.length };
  }
  function setCam(el, key, instant) {
    if (!el) return;
    const cams = CAMS[el.dataset.scene], c = cams[key] || cams.wide, cam = el.querySelector('.cam');
    const box = (el.querySelector('.scene-svg') || el).getBoundingClientRect(), W = box.width, H = box.height;
    el.dataset.cam = key;
    if (!W || !H || !cam) return;
    const b = Math.min(W / 800, H / 500), hw = W / (2 * b), hh = H / (2 * b);
    const k = Math.max(1, Math.min(hh / 250, 1.3), Math.min(hw / 400, 1.3));
    const S = c.s * k, vw = hw / S, vh = hh / S;
    const fx = vw * 2 >= 800 ? 400 : Math.min(Math.max(c.x, vw), 800 - vw);
    const fy = vh * 2 >= 500 ? 250 : Math.min(Math.max(c.y, vh), 500 - vh);
    if (instant) el.classList.add('instant');
    cam.style.transform = `translate(${(400 - S * fx).toFixed(1)}px, ${(250 - S * fy).toFixed(1)}px) scale(${S.toFixed(3)})`;
    if (instant) setTimeout(() => el.classList.remove('instant'), 50);
  }
  // Desktop scenes: the bubble and the band above the picture scale with the picture, so browser zoom
  // or a small window keeps them in proportion with the characters instead of growing over them.
  function fitScene() {
    const st = $('#stage'), sc = $('.scene');
    if (!st || !sc) return;
    if (isMobile()) { st.style.removeProperty('--band'); sc.style.removeProperty('--k'); return; }
    const k = Math.max(0.55, Math.min(1.15, Math.min(st.clientWidth / 800, (st.clientHeight - 130) / 500)));
    st.style.setProperty('--band', Math.round(130 * k) + 'px');
    sc.style.setProperty('--k', k.toFixed(3));
  }
  function relayout() { fitScene(); $$('[data-scene]').forEach((el) => setCam(el, el.dataset.cam || 'wide', true)); placeSay(); }
  function propIn(root, key) { const p = root.querySelector(`[data-prop="${key}"]`); if (p) p.classList.add('in'); }
  function wave(root, who) {
    const arm = root.querySelector(`${who ? `[data-who="${who}"] ` : root.querySelector('[data-who]') ? '[data-who] ' : ''}.arm-r`);
    if (!arm) return;
    arm.classList.remove('waving');
    void arm.getBoundingClientRect();
    arm.classList.add('waving');
  }
  const whoEl = (who) => (who ? document.querySelector(`#stage [data-who="${who}"]`) : null);
  function talking(who, on) {
    const g = whoEl(who);
    if (!g) return;
    clearTimeout(g._tt);
    g.classList.toggle('x-talk', on);
  }
  function timedTalk(who, text, slow) {
    talking(who, true);
    const g = whoEl(who);
    if (g) g._tt = setTimeout(() => g.classList.remove('x-talk'), Math.max(900, (text.length * 70) / (slow ? 0.65 : 1)));
  }
  // Expression for a moment: joy | wow | think | soft | wink (see DESIGN.md, "People").
  const FACES = ['x-joy', 'x-wow', 'x-think', 'x-soft', 'x-wink'];
  function react(who, face, ms) {
    const g = whoEl(who);
    if (!g) return;
    g.classList.remove(...FACES);
    void g.getBoundingClientRect();
    g.classList.add('x-' + face);
    clearTimeout(g._rt);
    g._rt = setTimeout(() => g.classList.remove('x-' + face), ms);
  }
  // Body pose for a moment, then back to rest. The CSS springs between the two.
  const POSES = ['present', 'present-l', 'point-l', 'point-up-l', 'point-r', 'think', 'idea', 'cheer', 'hips', 'thumb', 'shrug'].map((n) => 'p-' + n);
  function pose(who, name, ms = 1800) {
    const g = whoEl(who);
    if (!g) return;
    clearTimeout(g._pt);
    g.classList.remove(...POSES);
    if (!name) return;
    g.classList.add('p-' + name);
    g._pt = setTimeout(() => g.classList.remove('p-' + name), ms);
  }
  // Eyes and a slight head turn toward something in the scene. No target = back to the learner.
  function gaze(who, el) {
    const g = whoEl(who), head = g && g.querySelector('.head');
    if (!g) return;
    if (!el || !head) { ['--gx', '--gy', '--hx'].forEach((v) => g.style.removeProperty(v)); return; }
    const h = head.getBoundingClientRect(), t = el.getBoundingClientRect();
    const dx = t.left + t.width / 2 - (h.left + h.width / 2), dy = t.top + t.height / 2 - (h.top + h.height / 2), d = Math.hypot(dx, dy) || 1;
    g.style.setProperty('--gx', ((dx / d) * 1.5).toFixed(2) + 'px');
    g.style.setProperty('--gy', ((dy / d) * 1.2).toFixed(2) + 'px');
    g.style.setProperty('--hx', ((dx / d) * 1.3).toFixed(2) + 'px');
  }
  // The speaker looks at you; everyone else in the scene looks at the speaker.
  function attend(who) {
    const sp = whoEl(who), head = sp && sp.querySelector('.head');
    $$('#stage [data-who]').forEach((g) => gaze(g.dataset.who, g.dataset.who === who ? null : head));
  }
  // A hint from the character: look and point at the answer.
  function pointAt(who, el) {
    const g = whoEl(who), head = g && g.querySelector('.head');
    if (!head) return;
    const h = head.getBoundingClientRect(), t = el.getBoundingClientRect();
    const dx = t.left + t.width / 2 - (h.left + h.width / 2), dy = t.top + t.height / 2 - (h.top + h.height / 2);
    gaze(who, el);
    pose(who, dx > 0 ? 'point-r' : dy < -h.height * 0.4 ? 'point-up-l' : 'point-l', 2800);
    setTimeout(() => gaze(who, null), 2800);
  }
  // What the speaker does with their hands on a line. Never a point at the answer: that is a hint.
  function gesture(m) {
    const acts = SC.def.acts || ['present', 'hips', 'present-l', 'idea', 'shrug'];
    const a = m.act || acts[SC.i % acts.length];
    if (a === 'wave') wave($('#stage'), m.who);
    else if (a && a !== 'none') pose(m.who, a, Math.max(2000, m.line.length * 80 + 800));
  }
  const metaRow = (meta) => meta.map(([i, t]) => `<span>${icon(i)}${t}</span>`).join('');
  const sceneOpen = (id) => { const d = SCENES[id]; return !d.requires || state.done[d.requires]; };

  /* ================= Shell & modals ================= */
  function shell(active, inner) {
    document.body.classList.remove('no-tabs');
    const links = (top) => `
      <a href="#/home" class="${active === 'home' ? 'active' : ''}"${active === 'home' ? ' aria-current="page"' : ''}>${icon('home')}<span>Home</span></a>
      <a href="#/today" class="${active === 'spanish' ? 'active' : ''}"${active === 'spanish' ? ' aria-current="page"' : ''}><span class="flag-dot" aria-hidden="true"></span><span>Spanish</span></a>
      <a href="#/words" class="${active === 'words' ? 'active' : ''}"${active === 'words' ? ' aria-current="page"' : ''}>${icon('cards')}<span>Word bank</span>${top ? ` <span class="count">${bankCount()}</span>` : ''}</a>`;
    return `<header class="top"><div class="wrap">
      <a class="logo" href="#/home" aria-label="${BRAND} home">${ola()}<span>${BRAND}</span></a>
      <nav class="nav" aria-label="Main">${links(true)}</nav>
      <div class="top-right">${repPill()}<a class="me-chip" href="#/profile" aria-label="Your profile and avatar">${myBust('av-36')}</a><button type="button" class="icon-btn round help-btn" data-action="help" aria-label="How it works">${icon('help')}</button><button type="button" class="about-btn" data-action="openAbout" aria-label="About this project">${icon('info')}<span>About this project</span></button></div>
    </div></header>
    <main class="view">${inner}</main>
    <nav class="tabs" aria-label="Main">${links(false)}<button type="button" class="tab-ola" data-action="gloTap" aria-label="Ask Glo, your learning buddy">${ola()}<span>Glo</span></button></nav>`;
  }

  let modalReturn = null;
  function openModal(html, labelId) {
    closeModal();
    modalReturn = document.activeElement;
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="${labelId}"><button type="button" class="modal-x" data-action="closeModal" aria-label="Close">${icon('x')}</button>${html}</div>`;
    document.body.appendChild(m);
    document.body.classList.add('modal-open');
    m.addEventListener('click', (e) => { if (e.target === m) closeModal(); });
    void m.offsetWidth;
    m.classList.add('show');
    $('.modal-x', m).focus();
  }
  function closeModal() {
    const m = $('.modal');
    if (!m) return;
    m.remove();
    document.body.classList.remove('modal-open');
    if (modalReturn && modalReturn.focus) modalReturn.focus();
  }
  function openAbout() {
    openModal(`<span class="eyebrow">Open source · made for adults 40+</span>
      <h2 id="aboutTitle">About ${BRAND}</h2>
      <p class="ab-lead">${BRAND} helps adults around 40 and up pick up a new language through short, real-life scenes instead of word lists and translation. This demo teaches Spanish.</p>
      <div class="ab-grid">
        <div class="ab t-pink"><h3>The problem</h3><p>“I can memorize vocabulary lists, but I forget them quickly and still translate every sentence in my head.”</p></div>
        <div class="ab t-lime"><h3>What I noticed</h3><p>I learn from people. I note new words down, try them on the same person next time, and words that sound familiar stick fastest.</p></div>
        <div class="ab t-blue"><h3>The idea</h3><p>Meet every word in a conversation, guess it from the scene, then meet it again somewhere new.</p></div>
      </div>
      <h3 class="ab-h">Key decisions</h3>
      <ul class="ab-list">
        <li><b>Scenes, not lists.</b> Words live inside real conversations with real people.</li>
        <li><b>The scene before English.</b> Lines come with an English gloss that leaves a blank where the new word goes.</li>
        <li><b>Familiar first.</b> Sound-alikes from the languages you already speak.</li>
        <li><b>Meet it again.</b> Words return within a scene and in new places.</li>
        <li><b>Travel as progress.</b> Each city is a level. Rep unlocks cities and avatar items.</li>
        <li><b>Learn together.</b> Co-learn scenes with friends who are on the same trip.</li>
      </ul>
      <div class="metric"><span class="eyebrow outline">How we’d measure it</span><p>Words recognised <b>7 days later</b>, in a scene never seen before.</p></div>
      <div class="modal-foot"><a class="text-link" href="${REPO}" target="_blank" rel="noopener">View the code on GitHub</a><button type="button" class="text-link" data-action="replayGuide">Replay the guide</button><button type="button" class="text-link" data-action="reset">Restart the demo</button><button type="button" class="btn btn-sm" data-action="closeModal">Back to the app</button></div>`, 'aboutTitle');
  }
  function openInvite() {
    openModal(`<span class="eyebrow pink">Invite</span>
      <h2 id="invTitle">Learn with a friend</h2>
      <p class="ab-lead">Send this link. When your friend joins, you can co-learn scenes together and both earn bonus Rep.</p>
      <div class="inv-row"><input type="text" readonly value="https://krishyeah-work.github.io/seen/?invite=krishna" aria-label="Invite link" id="invLink"><button type="button" class="btn btn-sm" data-action="copyInvite">${icon('copy')}Copy link</button></div>
      <div class="modal-foot"><button type="button" class="btn btn-ghost btn-sm" data-action="closeModal">Done</button></div>`, 'invTitle');
  }

  /* ================= Guide: first-time tours =================
     A tour is a short list of steps. Each step spotlights one thing on the page and Glo explains it in a sentence.
     Tours run once (state.tours), can be skipped, and can be replayed from the ? button. */
  const TOURS = {
    home: () => [
      { sel: '.me-av', title: 'This is you', text: 'Tap your traveller to change outfits. You unlock new items with the <b>Rep</b> you earn in scenes.' },
      { sel: '.streak-card', title: 'Your week', text: 'One Glo for each day. The more you learn, the happier it looks.' },
      { sel: '.lang-card .btn, a.btn[href="#/today"]', title: 'Carry on from here', text: 'This takes you back to your Spanish trip.' }
    ],
    today: () => [
      { sel: '.activity', title: 'Start here', text: 'Each scene is a short real-life moment, about 5 minutes. Tap <b>Let’s go</b> to play it.' },
      { sel: '.map-card', title: 'Your trip', text: 'Every city is a level. Finish Barcelona to unlock Madrid. Tap a city to see what’s ahead.' },
      { sel: '.qc-bank', title: 'Your word bank', text: 'Every word you learn is kept here, with its picture and the places you met it.' },
      { sel: isMobile() ? '.tab-ola' : '.ola-btn', title: 'I’m Glo', text: 'Stuck or curious? Tap me any time and I’ll help.', pad: 4 }
    ],
    scene: () => [
      { sel: '#say', title: 'Listen and read', text: 'They speak Spanish. Underneath is the same line in English, with a <b>blank</b> where the new word goes.' },
      { sel: '.word-row', title: 'The new word', text: 'This is the word to work out. Tap <b>Listen</b> to hear it again, or <b>Slower</b>.' },
      { sel: '#stage', title: 'Answer in the picture', text: 'Now tap the thing they mean, right in the scene. No translation needed.', pad: 0 },
      { sel: '.ola-mini', title: 'Need a hint?', text: 'Tap me. I can say it slower, show you where to look or, as a last resort, show the English.', pad: 4 }
    ]
  };
  const Tour = {
    id: null, steps: [], i: 0, el: null, t: 0,
    start(id, force) {
      if (this.id || !TOURS[id] || (!force && state.tours[id]) || $('.modal')) return false;
      const steps = TOURS[id]().filter((s) => { const t = $(s.sel); return t && t.getClientRects().length; });
      if (!steps.length) return false;
      Object.assign(this, { id, steps, i: 0 });
      Glo.hide();
      const el = document.createElement('div');
      el.className = 'tour';
      el.innerHTML = `<div class="tour-hole"></div>
        <div class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourT">
          <div class="tour-glo">${glo({ cls: 'still' })}</div>
          <div class="tour-body"><span class="tour-step"></span><h3 id="tourT"></h3><p></p></div>
          <div class="tour-foot"><button type="button" class="text-link" data-action="tourSkip">Skip</button><div class="tour-dots" aria-hidden="true"></div><button type="button" class="btn btn-sm" data-action="tourNext"></button></div>
        </div>`;
      el.addEventListener('click', (e) => {
        if (e.target.closest('.tour-card')) return;
        const r = $('.tour-hole', el).getBoundingClientRect(), x = e.clientX, y = e.clientY;
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) return;
        this.end(true);
        const t = document.elementFromPoint(x, y);
        if (t) t.click();
      });
      document.body.appendChild(el);
      document.body.classList.add('touring');
      this.el = el;
      this.show(true);
      return true;
    },
    show(first) {
      const s = this.steps[this.i], t = $(s.sel), card = $('.tour-card', this.el);
      if (!t) { this.next(); return; }
      card.classList.add('swap');
      // Jump-scroll (no smooth scroll): the spotlight glides instead, so the two never fight.
      const r0 = t.getBoundingClientRect();
      if (r0.top < 90 || r0.bottom > window.innerHeight - 40) t.scrollIntoView({ block: r0.height > window.innerHeight * 0.7 ? 'start' : 'center', behavior: 'auto' });
      clearTimeout(this.t);
      this.t = setTimeout(() => {
        $('.tour-step', card).textContent = `${this.i + 1} of ${this.steps.length}`;
        $('h3', card).textContent = s.title;
        $('p', card).innerHTML = s.text;
        $('[data-action="tourNext"]', card).innerHTML = this.i === this.steps.length - 1 ? 'Got it' : `Next ${icon('arrowRight')}`;
        $('.tour-dots', card).innerHTML = this.steps.map((_, k) => `<i class="${k === this.i ? 'on' : ''}"></i>`).join('');
        this.place();
        card.classList.remove('swap');
        this.el.classList.add('on');
        $('[data-action="tourNext"]', card).focus({ preventScroll: true });
      }, first ? 80 : 360);
    },
    // Put the spotlight on the target and the card beside it; Glo points back at the target.
    place(quiet) {
      if (!this.el) return;
      const s = this.steps[this.i], t = $(s.sel);
      if (!t) return;
      const r = t.getBoundingClientRect(), pad = s.pad == null ? 10 : s.pad, hole = $('.tour-hole', this.el), card = $('.tour-card', this.el);
      const vw = window.innerWidth, vh = window.innerHeight;
      const x = Math.max(6, r.left - pad), y = Math.max(6, r.top - pad), w = Math.min(vw - 6, r.right + pad) - x, h = Math.min(vh - 6, r.bottom + pad) - y;
      Object.assign(hole.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
      const cw = card.offsetWidth, ch = card.offsetHeight, gap = 26;
      let left = x + w / 2 - cw / 2, top, point;
      if (y + h + gap + ch < vh - 12) { top = y + h + gap; point = 'up'; }
      else if (y - gap - ch > 12) { top = y - gap - ch; point = 'down'; }
      else if (vw >= 720 && x + w + gap + cw < vw - 12) { left = x + w + gap; top = y + h / 2 - ch / 2; point = 'l'; }
      else if (vw >= 720 && x - gap - cw > 12) { left = x - gap - cw; top = y + h / 2 - ch / 2; point = 'r'; }
      else { top = y + h - ch - 16; point = 'up'; }
      left = Math.max(12, Math.min(vw - cw - 12, left));
      top = Math.max(70, Math.min(vh - ch - 12, top));
      Object.assign(card.style, { left: left + 'px', top: top + 'px' });
      const g = $('.glo', card);
      g.dataset.point = point;
      if (quiet) return;
      g.dataset.mood = 'talk';
      clearTimeout(this.mt);
      this.mt = setTimeout(() => { g.dataset.mood = 'happy'; }, 1500);
    },
    next() { if (!this.id) return; if (this.i >= this.steps.length - 1) { this.end(); return; } this.i++; this.show(); },
    back() { if (!this.id || !this.i) return; this.i--; this.show(); },
    end(quiet) {
      if (!this.id) return;
      state.tours[this.id] = true;
      save();
      clearTimeout(this.t);
      const el = this.el;
      el.classList.remove('on');
      setTimeout(() => el.remove(), quiet ? 0 : 280);
      document.body.classList.remove('touring');
      Object.assign(this, { id: null, el: null, steps: [] });
      if (!quiet) Glo.jump();
    }
  };
  // The idea in three steps, for pages that have no tour of their own.
  function openHow() {
    openModal(`<span class="eyebrow">How ${BRAND} works</span>
      <h2 id="howTitle">Words from scenes, not lists</h2>
      <ol class="how-steps">
        <li><span class="how-ic">${icon('ear')}</span><div><b>Listen</b><p>Someone says a line in Spanish, in a real situation.</p></div></li>
        <li><span class="how-ic">${icon('eye')}</span><div><b>Look</b><p>The picture and a small English hint tell you what’s going on. The new word is left blank.</p></div></li>
        <li><span class="how-ic">${icon('hand')}</span><div><b>Answer</b><p>Tap the thing in the scene, pick a picture or choose a reply.</p></div></li>
        <li><span class="how-ic">${icon('refresh')}</span><div><b>Meet it again</b><p>The word comes back in new places until it sticks. Glo is there if you need a hint.</p></div></li>
      </ol>
      <div class="modal-foot"><button type="button" class="btn btn-sm" data-action="closeModal">Got it</button></div>`, 'howTitle');
  }

  /* ================= Landing & notes ================= */
  const logoBar = (right) => `<div class="wrap ix-top"><a class="logo" href="#/" aria-label="${BRAND}">${ola()}<span>${BRAND}</span></a>${right || ''}</div>`;
  const footer = () => `<footer class="wrap foot"><span>Designed by ${DESIGNER} · <a class="text-link" href="${REPO}" target="_blank" rel="noopener">Open source on GitHub</a></span><button class="text-link" data-action="reset" type="button">Restart the demo</button></footer>`;

  function viewIndex() {
    document.body.classList.add('no-tabs');
    // The entrance plays the first time the page opens in a visit. After that it is a plain fade.
    let first = false;
    try { first = !sessionStorage.getItem('picto-intro'); sessionStorage.setItem('picto-intro', '1'); } catch (e) { /* ignore */ }
    first = first && !reduced;
    app.innerHTML = `<div class="view landing${first ? ' intro' : ''}">
      ${logoBar()}
      <section class="wrap hero hero-simple">
        <div class="hero-copy">
          <h1><span class="ln"><span>Learn a language</span></span><span class="ln"><span>by living it.</span></span></h1>
          <p class="hero-sub">Short real-life scenes teach you new words through pictures and context, not translation.</p>
          <div class="hero-cta"><a class="btn" href="#/start">Start learning ${icon('arrowRight')}</a><span class="hero-note">Free · no sign-up · made for adults 40 and up</span></div>
        </div>
        <div class="hero-art">
          <div class="hero-stage" data-scene="cafe" data-cam="hero">${SCENE_ART.cafe()}</div>
          <div class="float f1"><b>5-minute scenes</b>with real people</div>
          <div class="float f3"><b>No word lists</b>just pictures and context</div>
        </div>
      </section>
      ${footer()}
    </div>`;
    const hero = $('.hero-stage');
    ['cup', 'bread', 'glass'].forEach((p) => later(() => propIn(hero, p), first ? 900 : 0));
    setCam(hero, 'hero', true);
    later(() => wave(hero), first ? 1500 : 900);
  }

  // Design notes page (not linked from the product): #/notes
  function viewNotes() {
    document.body.classList.add('no-tabs');
    app.innerHTML = `<div class="view">
      ${logoBar(`<a class="btn btn-sm" href="#/">Back to the prototype</a>`)}
      <section class="wrap section"><span class="eyebrow pink">Design notes</span>
        <div class="section-head" style="margin-top:20px"><h2>The challenge, in one breath</h2><p>Help adults pick up vocabulary through comprehensible input, with less translation and better long-term memory.</p></div>
        <div class="gist">
          <div class="gist-card t-pink"><span class="eyebrow pink">The problem</span><p class="quote">“I can memorize vocabulary lists, but I forget them quickly and still translate every sentence in my head.”</p><span class="src">The learner problem we started from</span></div>
          <div class="gist-card t-lime"><span class="eyebrow">What I noticed</span><p>I learn languages from people: a friend, a shopkeeper, a song. I note new words down, try them on the same person next time, and words that sound like ones I already know stick fastest.</p></div>
          <div class="gist-card t-blue"><span class="eyebrow blue">The idea</span><p>Turn everyday conversations into short scenes. Every word is met in context, guessed from the scene and met again somewhere new.</p><div class="loop"><span>See</span><span>Guess</span><span>Meet again</span><span>Recall</span></div></div>
        </div>
      </section>
      <section class="wrap section">
        <div class="section-head"><h2>Key design decisions</h2><p>Designed for adults around 40 and up who want to talk to real people, not pass tests.</p></div>
        <div class="decisions">
          <div class="dec blue"><span class="n">01</span><h3>Scenes, not lists</h3><p>Every word lives inside a real moment with a real person: a waiter, a shopkeeper, a friend.</p></div>
          <div class="dec lime"><span class="n">02</span><h3>Gloss with a blank</h3><p>Each line has a small English gloss with a blank where the new word goes, so the scene stays understandable without translating the word.</p></div>
          <div class="dec pink"><span class="n">03</span><h3>Familiar first</h3><p>Sound-alikes from your languages: mesa and mez, pan and pav, agua and aqua, naranja and narangi.</p></div>
          <div class="dec ink"><span class="n">04</span><h3>Meet it again</h3><p>Each café word comes back two or three times in one scene, then again at the market and with a friend.</p></div>
          <div class="dec soft"><span class="n">05</span><h3>Travel as progress</h3><p>Barcelona to Granada, city by city. Rep unlocks cities and avatar items. Level follows lifetime Rep, so spending never lowers it.</p></div>
          <div class="dec outline"><span class="n">06</span><h3>Learn together</h3><p>Friends on the same trip appear on the map. Co-learn scenes put them inside the conversation with you.</p></div>
        </div>
        <div class="metric"><span class="eyebrow outline">How we’d measure it</span><p>Words recognised <b>7 days later</b>, in a scene the learner has never seen before.</p></div>
      </section>
      ${footer()}
    </div>`;
  }

  /* ================= Onboarding ================= */
  const steps = (n) => `<div class="steps" aria-label="Step ${n} of 3">${[1, 2, 3].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
  function viewStart() {
    document.body.classList.add('no-tabs');
    if (!UI.langSel) UI.langSel = new Set(state.learning ? state.known : []);
    app.innerHTML = `<div class="view">
      ${logoBar('<span class="hero-note">Step 1 of 3</span>')}
      <div class="start">
        ${steps(1)}
        <h1>Which languages do you already speak?</h1>
        <p class="lead">${BRAND} uses them to find words that sound similar in the language you’re about to learn. Pick all that apply.</p>
        <div class="lang-grid" role="group" aria-label="Languages you speak">
          ${KNOWN.map((l, i) => `<button type="button" class="lang" style="--i:${i}" aria-pressed="${UI.langSel.has(l.id)}" data-action="toggleLang" data-id="${l.id}"><span class="tick">${icon('check')}</span><span class="nm">${l.nm}</span><span class="nt">${l.nt}</span></button>`).join('')}
        </div>
      </div>
      <div class="start-foot"><div class="in"><span class="hint" id="langHint">${UI.langSel.size ? `${UI.langSel.size} selected` : 'Pick at least one to continue'}</span><button type="button" class="btn" data-action="toLearn"${UI.langSel.size ? '' : ' disabled'}>Continue ${icon('arrowRight')}</button></div></div>
    </div>`;
    Glo.context('Pick every language you speak, even a little. I’ll use them to find words that <b>sound like home</b>.');
  }
  function learnList() {
    const q = UI.search.trim().toLowerCase();
    const list = LEARN.filter((l) => !q || l.nm.toLowerCase().includes(q) || l.nt.toLowerCase().includes(q));
    if (!list.length) return `<p class="empty-note">No match for “${esc(UI.search)}”. More languages are on the way.</p>`;
    return list.map((l) => l.on
      ? `<button type="button" class="learn${UI.learn === 'es' ? ' active' : ''}" aria-pressed="${UI.learn === 'es'}" data-action="pickLearn"><span class="flag-lg" style="background:${l.flag}"></span><span><span class="nm">${l.nm}</span><br><span class="nt">${l.nt} · ready to try</span></span><span class="radio">${icon('check')}</span></button>`
      : `<button type="button" class="learn muted" aria-disabled="true" data-action="soon" data-nm="${l.nm}"><span class="flag-lg" style="background:${l.flag}"></span><span><span class="nm">${l.nm}</span><br><span class="nt">${l.nt}</span></span><span class="soon">Coming soon</span></button>`).join('');
  }
  function viewLearn() {
    document.body.classList.add('no-tabs');
    app.innerHTML = `<div class="view">
      ${logoBar('<span class="hero-note">Step 2 of 3</span>')}
      <div class="start">
        ${steps(2)}
        <h1>What would you like to learn?</h1>
        <p class="lead">This prototype shows one complete flow, in Spanish.</p>
        <label class="search">${icon('search')}<span class="sr-only">Search languages</span><input type="search" id="langSearch" placeholder="Search languages" value="${esc(UI.search)}" autocomplete="off"></label>
        <div class="learn-list" id="learnList">${learnList()}</div>
      </div>
      <div class="start-foot"><div class="in"><a class="text-link" href="#/start">Back</a><button type="button" class="btn" data-action="toGoal"${UI.learn ? '' : ' disabled'}>${UI.learn ? 'Continue with Spanish' : 'Choose a language'} ${icon('arrowRight')}</button></div></div>
    </div>`;
    Glo.context('Only Spanish is ready in this prototype. <b>¡Vamos!</b>');
  }
  function viewGoal() {
    document.body.classList.add('no-tabs');
    app.innerHTML = `<div class="view">
      ${logoBar('<span class="hero-note">Step 3 of 3</span>')}
      <div class="start">
        ${steps(3)}
        <h1>How would you like to learn?</h1>
        <p class="lead">Pick what fits. You can change it any time.</p>
        <div class="goal-list" role="radiogroup" aria-label="Learning goal">
          ${GOALS.map((g, i) => `<button type="button" role="radio" class="gopt${UI.goal === g.id ? ' on' : ''}" style="--i:${i}" aria-checked="${UI.goal === g.id}" data-action="pickGoal" data-id="${g.id}"><span class="goal-ic">${icon(g.ic)}</span><span><span class="nm">${g.nm}</span><span class="nt">${g.sub}</span></span><span class="radio">${icon('check')}</span></button>`).join('')}
        </div>
      </div>
      <div class="start-foot"><div class="in"><button type="button" class="text-link skip" data-action="skipGoal">Skip, just start<small>We’ll adjust the pace as you learn</small></button><button type="button" class="btn" data-action="startLearning"${UI.goal ? '' : ' disabled'}>Start learning Spanish ${icon('arrowRight')}</button></div></div>
    </div>`;
  }

  /* ================= Arrival splash ================= */
  function viewArrive() {
    document.body.classList.add('no-tabs', 'arriving');
    app.innerHTML = `<div class="arrive" role="dialog" aria-label="Welcome to Spain">
      ${arrival(avatarFull(myLook(), 'walking'))}
      <div class="arrive-txt"><span class="eyebrow white">Day 1 · Barcelona</span><h1>¡Bienvenido a España!</h1><p>Your trip through Spain starts now.</p><span class="arrive-rep">${icon('star')}+${REP.welcome} Rep welcome bonus</span></div>
      <button type="button" class="btn btn-white arrive-skip" data-action="arriveDone">Start exploring ${icon('arrowRight')}</button>
    </div>`;
    later(() => { const f = $('.arrive .avatar-full'); if (f) { f.classList.remove('walking'); later(() => wave(f), 200); } }, reduced ? 100 : 4300);
    later(() => { if (location.hash === '#/arrive') location.hash = '#/today'; }, reduced ? 2500 : 6600);
  }

  /* ================= Home (general) ================= */
  function weekDays() {
    const dow = (new Date().getDay() + 6) % 7;
    const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], short = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const base = new Date();
    base.setDate(base.getDate() - dow);
    return names.map((nm, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const log = state.log[k];
      const min = log ? log.min : 0;
      const mood = i > dow ? 'future' : !log && i < dow ? 'none' : min >= 10 ? 'star' : min >= 5 ? 'happy' : min > 0 ? 'ok' : 'sleep';
      return { nm, short: short[i], i, today: i === dow, min, log, mood };
    });
  }
  function streakCount() {
    let n = 0;
    const d = new Date();
    for (;;) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (state.log[k] && state.log[k].min > 0) { n++; d.setDate(d.getDate() - 1); } else break;
    }
    return n;
  }
  function streakRow(days) {
    return `<div class="streak">${days.map((d) => `<div class="sd${d.today ? ' today' : ''} m-${d.mood}" title="${d.nm}: ${d.mood === 'future' ? 'coming up' : d.mood === 'none' ? 'before you joined' : `${d.min} min`}">
      <span class="sd-glo">${gloDay(d.mood)}</span><span class="sd-d">${d.short}</span><span class="sd-m">${d.mood === 'future' || d.mood === 'none' ? '·' : `${d.min}m`}</span></div>`).join('')}</div>`;
  }
  function ring(pct) {
    const c = 2 * Math.PI * 40;
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="none" stroke="#DDE2F7" stroke-width="12"/><circle cx="50" cy="50" r="40" fill="none" stroke="#3A5AFF" stroke-width="12" stroke-linecap="round" stroke-dasharray="${((c * pct) / 100).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/></svg>`;
  }
  function heroArt() {
    const L = '#6F86FF', F = '#4F6DFF', D = '#3150F0';
    const spire = (x, h, w) => `<path d="M${x} 236 V${236 - h} Q${x + w / 2} ${236 - h - w * 1.6} ${x + w} ${236 - h} V236 Z" fill="${F}" stroke="${L}" stroke-width="2.5"/><circle cx="${x + w / 2}" cy="${236 - h + 16}" r="${w * 0.18}" fill="${D}"/>`;
    return `<svg viewBox="0 0 520 280" preserveAspectRatio="xMaxYMax meet">
      <circle cx="446" cy="66" r="34" fill="#C6F432" opacity=".22"/><circle cx="446" cy="66" r="34" fill="none" stroke="${L}" stroke-width="2.5"/>
      <path d="M150 128 C210 74 270 62 336 74" fill="none" stroke="${L}" stroke-width="2.5" stroke-dasharray="3 11" stroke-linecap="round"/>
      <g transform="translate(338 74) rotate(10)"><path d="M-14 0 L14 -2 Q20 0 14 2 Z M-2 -1 L-8 -12 L-3 -12 L6 -1 Z M-2 1 L-8 12 L-3 12 L6 1 Z M-12 -1 L-16 -7 L-13 -7 L-8 -1 Z" fill="${L}"/></g>
      <path d="M0 256 Q130 228 260 238 T520 226 V280 H0 Z" fill="${D}"/>
      <g><path d="M218 238 L228 152 H248 L258 238 Z" fill="${F}" stroke="${L}" stroke-width="2.5"/><path d="M224 154 Q238 130 252 154 Z" fill="${L}"/>
        <g class="me-blades" style="transform-origin:238px 148px">${[0, 90, 180, 270].map((a) => `<rect x="234" y="98" width="8" height="50" rx="2" fill="${F}" stroke="${L}" stroke-width="2" transform="rotate(${a} 238 148)"/>`).join('')}<circle cx="238" cy="148" r="5" fill="${L}"/></g></g>
      ${spire(300, 108, 22)}${spire(326, 148, 24)}${spire(354, 140, 24)}${spire(382, 100, 22)}
      <path d="M292 236 H412 V210 Q352 188 292 210 Z" fill="${F}" stroke="${L}" stroke-width="2.5"/>
      <g><path d="M470 240 Q462 196 474 150" fill="none" stroke="${L}" stroke-width="6" stroke-linecap="round"/>
        <path d="M474 150 Q446 136 428 150 M474 150 Q498 136 514 148 M474 150 Q458 122 440 120 M474 150 Q490 122 508 118 M474 150 Q474 128 468 112" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/></g>
      <path d="M190 40 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z M404 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="${L}"/>
    </svg>`;
  }
  function viewHome() {
    const lvl = levelOf(state.repEarned), nx = nextLevel(state.repEarned);
    const words = bankCount();
    const scenes = Object.values(state.done).filter(Boolean).length;
    const days = weekDays();
    const weekMin = days.reduce((a, d) => a + d.min, 0);
    const pctL = nx ? Math.round(((state.repEarned - lvl.min) / (nx.min - lvl.min)) * 100) : 100;
    const course = Math.round((HOME_CITY.scenes.filter((p) => state.done[p]).length / 17) * 100);
    const streak = streakCount();
    app.innerHTML = shell('home', `<div class="wrap home">
      <section class="me">
        <div class="me-art" aria-hidden="true">${heroArt()}</div>
        <a class="me-av" href="#/profile" aria-label="Edit your avatar">${myBust('av-hero')}<span class="me-edit">${icon('edit')}</span></a>
        <div class="me-txt">
          <span class="eyebrow">${'★'.repeat(lvl.stars)} ${lvl.nm}</span>
          <h1>${scenes ? 'Welcome back' : 'Welcome'}</h1>
          <p>${scenes ? `You’ve picked up <b>${words} words</b> across <b>${scenes} real-life ${scenes === 1 ? 'scene' : 'scenes'}</b>.` : 'Your first scene is waiting in <b>Barcelona</b>.'}</p>
          <div class="lvl">
            <div class="lvl-top"><span><b>${state.repEarned}</b> Rep earned</span><span>${nx ? `${nx.min - state.repEarned} Rep to ${nx.nm}` : 'Top level reached'}</span></div>
            <div class="bar" role="progressbar" aria-label="Progress to the next level" aria-valuemin="${lvl.min}" aria-valuemax="${nx ? nx.min : state.repEarned}" aria-valuenow="${state.repEarned}"><i style="width:${pctL}%"></i></div>
          </div>
        </div>
      </section>
      <h2 class="h-sec">Your learning at a glance</h2>
      <section class="bento">
        <div class="bt t-lime">
          <span class="bt-l">Words learned</span>
          <span class="bt-n">${words}</span>
          <span class="bt-s">${words ? `in 1 language · from ${scenes} ${scenes === 1 ? 'scene' : 'scenes'}` : 'Your first words arrive at the café'}</span>
          <div class="bt-arts" aria-hidden="true">${state.order.slice(-6).reverse().map((w) => prop(WORDS[w].art)).join('')}</div>
        </div>
        <div class="bt t-blue">
          <span class="bt-l">Words that stuck</span>
          ${state.stuck == null ? `<div class="ring ring-empty">${ring(0)}<b>—</b></div><span class="bt-s">Shows up after your first review</span>` : `<div class="ring">${ring(state.stuck)}<b>${state.stuck}%</b></div><span class="bt-s">recognised again in a new scene, first try</span>`}
        </div>
        <a class="bt bt-wide streak-card" href="#/stats" aria-label="Your streak this week. Open detailed stats">
          <div class="bt-row"><span class="bt-l">Your streak ${icon('chevronRight', 'bt-go')}</span><span class="bt-k">${icon('flame', 'flame')}<b>${streak} ${streak === 1 ? 'day' : 'days'}</b> · ${weekMin} min this week</span></div>
          ${streakRow(days)}
        </a>
      </section>
      <div class="home-grid">
        <section class="pcard">
          <div class="pc-head"><h2>Your languages</h2></div>
          <div class="lang-row">
            <span class="flag-lg" style="background:${LEARN[0].flag}" aria-hidden="true"></span>
            <div class="lr-main"><b>Spanish</b><small>Level 1 · Barcelona · A1</small>
              <div class="bar" role="progressbar" aria-label="Spanish course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${course}"><i style="width:${Math.max(course, 2)}%"></i></div>
              <small>${course}% of the course · ${words} words</small>
            </div>
          </div>
          <a class="btn btn-block" href="#/today">Resume learning ${icon('arrowRight')}</a>
          <button type="button" class="add-lang" data-action="addLang">${icon('plus')}Add a language</button>
        </section>
        <section class="pcard">
          <a class="pc-head pc-link" href="#/friends"><h2>Friends ${icon('chevronRight', 'pc-go')}</h2><span>${FRIENDS.length} learning this week</span></a>
          <ul class="friends">${FRIENDS.slice(0, 4).map((f) => friendRow(f)).join('')}</ul>
        </section>
      </div>
    </div>`);
    Glo.context('This is your home base. Tap your avatar to dress it up with items you unlock with Rep.');
    later(() => Tour.start('home'), 700);
  }
  function friendRow(f, opts = {}) {
    const lv = LEVELS.find((l) => l.id === f.level);
    const inSpain = f.lang === 'Spanish';
    const added = state.colearn[f.id];
    const action = inSpain && opts.colearn !== false
      ? `<button type="button" class="icon-btn sm${added ? ' added' : ''}" data-action="colearn" data-id="${f.id}">${added ? `${icon('check')}Added` : 'Co-learn'}</button>`
      : `<button type="button" class="icon-btn sm" data-action="cheer" data-nm="${f.nm}">Cheer</button>`;
    return `<li>${avatarBust(f.av, 'av-44')}<div class="f-main"><b>${f.nm} <span class="lv-chip lv-${f.level}">${lv.nm}</span></b><small>${f.lang} · in ${f.where}</small></div>${action}</li>`;
  }

  /* ================= Stats (streak detail) ================= */
  function viewStats() {
    const days = weekDays();
    const total = days.reduce((a, d) => a + d.min, 0);
    const words = [...new Set(days.flatMap((d) => (d.log ? d.log.words : [])))];
    const scenes = days.reduce((a, d) => a + (d.log ? d.log.scenes.length : 0), 0);
    const rep = days.reduce((a, d) => a + (d.log ? d.log.rep : 0), 0);
    const max = Math.max(10, ...days.map((d) => d.min));
    app.innerHTML = shell('home', `<div class="wrap stats-page">
      <a class="back" href="#/home">${icon('arrowLeft')}Home</a>
      <div class="bank-head"><div><h1>This week</h1><p>Every day gets a Glo. The more you practise, the happier it looks.</p></div></div>
      <div class="sum">
        <div><span>${icon('clock')}Minutes</span><b>${total}</b></div>
        <div><span>${icon('cards')}New words</span><b>${words.length}</b></div>
        <div><span>${icon('chat')}Scenes</span><b>${scenes}</b></div>
        <div><span>${icon('star')}Rep earned</span><b>${rep}</b></div>
      </div>
      <section class="bt bt-wide stats-chart">
        <div class="bt-row"><span class="bt-l">Minutes per day</span><span class="bt-k">Goal · 10 min a day</span></div>
        <div class="plot" role="img" aria-label="Minutes per day this week: ${days.map((d) => `${d.nm} ${d.min}`).join(', ')}">
          <div class="goal" style="bottom:${((10 / max) * 100).toFixed(1)}%"></div>
          ${days.map((d) => `<div class="col${d.today ? ' today' : ''}" tabindex="0" data-tip="${d.nm} · ${d.min} min">${d.min ? `<em>${d.min}</em>` : ''}<i style="height:${d.min ? Math.max((d.min / max) * 100, 4).toFixed(1) : 0}%"></i></div>`).join('')}
          <div class="ch-tip" aria-hidden="true"></div>
        </div>
        <div class="xaxis" aria-hidden="true">${days.map((d) => `<span${d.today ? ' class="today"' : ''}>${d.nm}</span>`).join('')}</div>
        <div class="goal-key" aria-hidden="true"><i></i>Daily goal · 10 min</div>
      </section>
      <h2 class="h-sec">Day by day</h2>
      <div class="daylist">${days.map((d) => `<div class="day-row${d.mood === 'future' || d.mood === 'none' ? ' quiet' : ''}">
        <span class="dr-glo">${gloDay(d.mood)}</span>
        <div class="dr-main"><b>${d.today ? 'Today' : d.nm}</b><small>${d.mood === 'future' ? 'Coming up' : d.mood === 'none' ? 'Before you joined' : d.log ? `${d.log.min} min · Spanish · ${d.log.scenes.join(', ')}` : 'Rest day'}</small></div>
        <div class="dr-words">${d.log ? d.log.words.map((w) => `<span class="word-chip">${prop(WORDS[w].art)}${WORDS[w].es}</span>`).join('') : ''}</div>
        ${d.log ? `<span class="dr-rep">+${d.log.rep} Rep</span>` : ''}
      </div>`).join('')}</div>
    </div>`);
    wireChart();
    Glo.context('A sleepy Glo means a rest day. A starry Glo means you hit your daily goal.');
  }
  function wireChart() {
    const plot = $('.plot');
    if (!plot) return;
    const tip = $('.ch-tip', plot);
    const show = (col) => {
      tip.textContent = col.dataset.tip;
      tip.style.left = col.offsetLeft + col.offsetWidth / 2 + 'px';
      tip.style.bottom = `calc(${col.querySelector('i').style.height || '0%'} + 12px)`;
      tip.classList.add('show');
    };
    const hide = () => tip.classList.remove('show');
    plot.addEventListener('mouseover', (e) => { const c = e.target.closest('.col'); if (c) show(c); });
    plot.addEventListener('mouseleave', hide);
    plot.addEventListener('focusin', (e) => { const c = e.target.closest('.col'); if (c) show(c); });
    plot.addEventListener('focusout', hide);
  }

  /* ================= Profile: avatar editor ================= */
  function pfItemsHTML() {
    return SHOP[UI.tab].items.map((it) => {
      const own = owns(it), on = state.eq[UI.tab] === it.id;
      const look = Object.assign(myLook(), it.set);
      return `<button type="button" class="pf-item${on ? ' on' : ''}${own ? '' : ' locked'}" data-action="pfItem" data-id="${it.id}" aria-pressed="${on}">
        ${avatarBust(look, 'av-item')}<span class="pi-nm">${it.nm}</span>
        <span class="pi-st">${on ? `${icon('check')}Wearing` : own ? 'Owned' : `${icon('lock')}${it.cost} Rep`}</span></button>`;
    }).join('');
  }
  function pfRefresh(changed) {
    const items = $('#pfItems');
    if (!items) return;
    items.innerHTML = pfItemsHTML();
    $$('.pf-tab').forEach((t) => t.setAttribute('aria-selected', t.dataset.tab === UI.tab));
    if (!changed) return;
    const look = myLook(), prev = $('#pfPreview'), fig = $('#pfFig');
    const bg = prev.querySelector('.bg-panel');
    if (bg) bg.outerHTML = bgPanel(look.bg);
    fig.innerHTML = myFull('pf-full');
    fig.classList.remove('pop');
    void fig.offsetWidth;
    fig.classList.add('pop', 'x-joy', 'p-cheer');
    clearTimeout(fig._t);
    fig._t = setTimeout(() => fig.classList.remove('x-joy', 'p-cheer'), 1500);
    $$('.me-chip').forEach((el) => { el.innerHTML = myBust('av-36'); });
  }
  function viewProfile() {
    const lvl = levelOf(state.repEarned), nx = nextLevel(state.repEarned);
    app.innerHTML = shell('home', `<div class="wrap profile">
      <a class="back" href="#/home">${icon('arrowLeft')}Home</a>
      <div class="pf-grid">
        <section class="pf-preview" id="pfPreview">${bgPanel(myLook().bg)}
          <div class="pf-fig" id="pfFig">${myFull('pf-full', true)}</div>
          <div class="pf-id"><b>You</b><span class="lv-chip lv-${lvl.id}">${'★'.repeat(lvl.stars)} ${lvl.nm}</span></div>
          <div class="pf-wallet">${repPill(false)}<span>to spend</span></div>
        </section>
        <section class="pf-shop">
          <h1>Your traveller</h1>
          <p class="lead">Unlock new looks with Rep you earn in scenes. Spending Rep never lowers your level.</p>
          <div class="pf-tabs" role="tablist" aria-label="Avatar items">${Object.entries(SHOP).map(([k, t]) => `<button type="button" role="tab" aria-selected="${UI.tab === k}" class="pf-tab" data-action="pfTab" data-tab="${k}">${t.label}</button>`).join('')}</div>
          <div class="pf-items" role="tabpanel" id="pfItems">${pfItemsHTML()}</div>
          <div class="pf-levels">
            <h2>Traveller levels</h2>
            <p>Your level follows the Rep you’ve earned in total. ${nx ? `<b>${nx.min - state.repEarned} Rep</b> to ${nx.nm}.` : 'You’re at the top.'}</p>
            <ol class="lv-ladder">${LEVELS.map((l) => `<li class="${l.id === lvl.id ? 'cur' : state.repEarned >= l.min ? 'got' : ''}"><span class="lv-stars">${'★'.repeat(l.stars)}</span><b>${l.nm}</b><small>${l.min} Rep</small></li>`).join('')}</ol>
          </div>
        </section>
      </div>
    </div>`);
    Glo.context('Locked items show their price. Earn Rep in scenes, then come back to unlock them.');
  }

  /* ================= Friends ================= */
  function viewFriends() {
    const langs = ['all', ...new Set(FRIENDS.map((f) => f.lang))];
    const list = FRIENDS.filter((f) => UI.ffilter === 'all' || f.lang === UI.ffilter);
    const spain = FRIENDS.filter((f) => f.lang === 'Spanish' && (UI.ffilter === 'all' || UI.ffilter === 'Spanish'));
    app.innerHTML = shell('home', `<div class="wrap friends-page">
      <a class="back" href="#/home">${icon('arrowLeft')}Home</a>
      <div class="bank-head"><div><h1>Friends</h1><p>Learn together. Friends on the same trip can co-learn scenes with you.</p></div><button type="button" class="btn" data-action="invite">${icon('plus')}Invite friends</button></div>
      <div class="filters" role="group" aria-label="Sort by language">${langs.map((l) => `<button type="button" class="filter" data-action="ffilter" data-f="${l}" aria-pressed="${UI.ffilter === l}">${l === 'all' ? 'All' : l}</button>`).join('')}</div>
      ${spain.length ? `<h2 class="h-sec">Co-learn in Spain</h2>
      <div class="colearn-grid">${spain.map((f) => {
        const here = f.city === 'barcelona', added = state.colearn[f.id];
        return `<div class="cl-card ${f.city === 'barcelona' ? 't-pink' : 't-gray'}"><div class="cl-fig">${avatarFull(f.av, 'cl-full')}</div><div class="cl-txt"><b>${f.nm}</b><small>${here ? 'In Barcelona, like you' : `Ahead of you, in ${f.where}`}</small><span class="lv-chip lv-${f.level}">${LEVELS.find((l) => l.id === f.level).nm}</span></div>
          <button type="button" class="btn btn-sm${added ? ' btn-ghost' : ''}" data-action="colearn" data-id="${f.id}">${added ? `${icon('check')}In your week` : here ? 'Co-learn' : `Meet in ${f.where}`}</button></div>`;
      }).join('')}</div>` : ''}
      <h2 class="h-sec">All friends</h2>
      <ul class="friends big">${list.map((f) => friendRow(f)).join('')}</ul>
    </div>`);
    Glo.context('Co-learn puts your friend inside the scene with you. You both earn bonus Rep.');
  }

  /* ================= Spanish home ================= */
  function cityCard(id) {
    const c = cityStates().find((x) => x.id === id) || cityStates()[0];
    if (c.id === HOME_CITY.id) {
      return `<span class="eyebrow blue">Level ${c.lvl} · ${c.state === 'done' ? 'Completed' : 'You are here'}</span><h3>${c.nm}</h3><p class="cc-theme">${c.theme} · ${c.cefr}</p>
        <ul class="cc-list">${c.scenes.map((p) => `<li class="${state.done[p] ? 'ok' : ''}"><span class="cc-i">${state.done[p] ? icon('check') : svgArt(PLACES[p].art, 'cc-art')}</span><span>${PLACES[p].what}<small>${PLACES[p].nm}</small></span></li>`).join('')}</ul>
        <p class="cc-note">Next stop: <b>Madrid</b> · ${CITIES[1].cost} Rep to travel</p>`;
    }
    return `<span class="eyebrow outline">Level ${c.lvl} · Locked</span><h3>${c.nm}</h3><p class="cc-theme">${c.theme} · ${c.cefr}</p>
      <p class="cc-sub">What you’ll do there</p>
      <ul class="cc-list">${c.acts.map((a) => `<li><span class="cc-i">${icon('lock')}</span><span>${a}</span></li>`).join('')}</ul>
      ${travelBtn(c)}`;
  }
  // Travel unlocks in order: finish the city you're in, then have enough Rep.
  function travelBtn(c) {
    const homeDone = HOME_CITY.scenes.every((p) => state.done[p]);
    const why = c.lvl > 2 ? 'Reach Madrid first' : !homeDone ? 'Finish Barcelona first' : state.rep < c.cost ? `${c.cost - state.rep} more Rep needed` : '';
    return why
      ? `<span class="travel-lock">${icon('lock')}${why}<small>Travel costs ${c.cost} Rep</small></span>`
      : `<button type="button" class="btn btn-ghost btn-sm" data-action="travel" data-id="${c.id}">${icon('star')}Travel for ${c.cost} Rep</button>`;
  }
  function mapPins() {
    const pos = (x, y) => `left:${(((x + 14) / 432) * 100).toFixed(2)}%;top:${(((y + 12) / 332) * 100).toFixed(2)}%`;
    const me = HOME_CITY;
    const mine = `<div class="mpin you" style="${pos(me.x, me.y)}"><span class="mp-av">${myBust('av-pin')}</span><span class="mp-tag">You</span></div>`;
    const offsets = { meera: [26, 20], daniel: [4, -30] };
    const fr = FRIENDS.filter((f) => offsets[f.id]).map((f) => {
      const c = CITIES.find((x) => x.id === f.city), [ox, oy] = offsets[f.id] || [0, 0];
      return `<div class="mpin fr" style="${pos(c.x + ox, c.y + oy)}" tabindex="0" aria-label="${f.nm}, in ${f.where}">
        <span class="mp-pop" aria-hidden="true">${avatarFull(f.av, 'mp-full')}</span>
        <span class="mp-av">${avatarBust(f.av, 'av-pin sm')}</span>
        <span class="mp-card"><b>${f.nm}</b><small>${f.where} · ${LEVELS.find((l) => l.id === f.level).nm}</small><button type="button" class="btn btn-sm" data-action="colearn" data-id="${f.id}">${state.colearn[f.id] ? `${icon('check')}Added` : 'Co-learn'}</button></span>
      </div>`;
    }).join('');
    return mine + fr;
  }
  function paceDD() {
    const p = PACES[state.pace] || PACES.steady;
    return `<div class="dd" id="paceDD">
      <button type="button" class="dd-btn" data-action="ddToggle" aria-haspopup="listbox" aria-expanded="false"><span class="dd-l">Pace</span><span class="dd-v">${p.label}</span>${icon('chevronDown', 'dd-c')}</button>
      <ul class="dd-menu" role="listbox" aria-label="Learning pace">${Object.entries(PACES).map(([k, o]) => `<li role="option" aria-selected="${k === state.pace}" tabindex="-1" data-action="ddPick" data-v="${k}"><span><b>${o.label}</b><small>${o.desc}</small></span>${k === state.pace ? icon('check') : ''}</li>`).join('')}</ul>
    </div>`;
  }
  function journeyCards(pace) {
    const firstOpen = HOME_CITY.scenes.find((p) => state.done[p] !== true && (p === 'cafe' || sceneOpen(p) || !SCENES[p]));
    const cards = HOME_CITY.scenes.map((id, i) => {
      const p = PLACES[id], playable = !!SCENES[id];
      let cls = 'soon', st = `<span class="st">${icon('lock')}</span>`;
      if (state.done[id]) { cls = 'done'; st = `<span class="st">${icon('check')}</span>`; }
      else if (id === firstOpen) { cls = 'now'; st = '<span class="st pill">Today</span>'; }
      else if (playable && sceneOpen(id)) { cls = 'ready'; st = '<span class="st pill pink">Ready</span>'; }
      const open = playable && sceneOpen(id);
      const tag = open ? 'a' : 'button';
      const attrs = open ? `href="#/scene/${id}"` : `type="button" data-action="locked" data-msg="${playable ? 'Finish the café first. Its words come back here.' : `${esc(p.nm)} opens later this week. In this prototype the café, market and co-learn scenes are playable.`}"`;
      return `<${tag} class="jn ${cls}" ${attrs}>${st}${svgArt(p.art)}<span class="day">${pace.slots[i]}</span><span class="nm">${p.nm}</span><span class="what">${p.what}</span></${tag}>`;
    });
    Object.keys(state.colearn).filter((id) => state.colearn[id]).forEach((id) => {
      const f = friend(id);
      if (id !== 'meera') return;
      const open = sceneOpen('colearn'), done = state.done.colearn;
      cards.splice(2, 0, `<${open ? 'a href="#/scene/colearn"' : 'button type="button" data-action="locked" data-msg="Finish the café first, then shop with Meera."'} class="jn colearn ${done ? 'done' : ''}">
        <span class="st ${done ? '' : 'pill blue'}">${done ? icon('check') : 'With Meera'}</span>${svgArt('cart')}<span class="day">Anytime</span><span class="nm">Shopping with ${f.nm}</span><span class="what">Co-learn at Paco’s shop</span>
        <span class="jn-friend" aria-hidden="true">${avatarFull(f.av, 'jf-full')}</span></${open ? 'a' : 'button'}>`);
    });
    return cards.join('');
  }
  function roadStrip() {
    const doneN = HOME_CITY.scenes.filter((p) => state.done[p]).length, total = HOME_CITY.scenes.length;
    const pct = 12 + (doneN / total) * 74;
    const flowers = ['#FF6FB5', '#3A5AFF', '#FFFFFF', '#FF6FB5', '#C6F432'];
    return `<section class="road" aria-label="Road to Madrid: ${doneN} of ${total} Barcelona scenes done">
      <div class="road-head"><b>Road to Madrid</b><span>${doneN} of ${total} Barcelona scenes · ${state.rep} of ${CITIES[1].cost} Rep</span></div>
      <div class="road-scene">
        <span class="rd-start">${deco.sign('Barcelona')}</span>
        ${HOME_CITY.scenes.map((p, i) => { const x = 14 + ((i + 0.5) / total) * 72; return `<span class="ms${state.done[p] ? ' on' : ''}" style="left:${x}%">${deco.flag(state.done[p])}</span><span class="tuft" style="left:calc(${x}% + 16px)">${deco.grass}${i % 2 ? deco.flower(flowers[i]) : ''}</span>`; }).join('')}
        <span class="tuft" style="left:calc(100% - 128px)">${deco.flower('#FF6FB5')}${deco.grass}</span>
        <span class="rd-end">${deco.sign('Madrid')}</span>
        <div class="rd-road"><i></i></div>
        <span class="walker" id="walker" data-to="${pct.toFixed(1)}" style="left:12%">${myFull('walker-fig')}</span>
      </div>
    </section>`;
  }
  function walkRoad() {
    const w = $('#walker');
    if (!w) return;
    const to = parseFloat(w.dataset.to), dist = to - 12;
    const go = () => {
      const fig = w.querySelector('svg');
      if (dist < 1 || reduced) { w.style.left = to + '%'; later(() => wave(w), 300); return; }
      const dur = Math.max(1.4, dist * 0.085);
      w.style.setProperty('--walk', dur + 's');
      fig.classList.add('walking');
      w.style.left = to + '%';
      later(() => { fig.classList.remove('walking'); later(() => wave(w), 250); }, dur * 1000);
    };
    if (!('IntersectionObserver' in window)) { go(); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); go(); } }, { threshold: 0.6 });
    io.observe(w.parentElement);
  }
  function viewToday() {
    const cafeDone = !!state.done.cafe, reviewDone = !!state.done.mercado;
    const reviewWords = cafeDone ? ['agua', 'cafe', 'pan', 'cuenta'] : [];
    const places = new Set(Object.values(state.words).flat()).size;
    const pace = PACES[state.pace] || PACES.steady;
    const act = cafeDone && !reviewDone ? SCENES.mercado : SCENES.cafe;
    const actDone = !!state.done[act.id];
    const recent = state.order.slice(-3).reverse();
    app.innerHTML = shell('spanish', `<div class="wrap sp-page">
      <div class="sp-head">
        <div><span class="eyebrow blue">Spanish · Level 1 · Barcelona</span><h1>Buenos días</h1></div>
        <a class="sp-me" href="#/profile">${myBust('av-48')}<div><b>${levelOf(state.repEarned).nm}</b><small>Day ${cafeDone ? 2 : 1} of your trip</small></div></a>
      </div>
      <div class="top-grid">
        <section class="activity" aria-labelledby="actTitle">
          <div class="act-txt">
            <span class="eyebrow">${actDone ? 'Done today' : 'Today’s activity'}</span>
            <h2 id="actTitle">${act.activity}</h2>
            <div class="meta">${metaRow(act.meta)}</div>
            <a class="btn btn-lime" href="#/scene/${act.id}">${actDone ? 'Play it again' : 'Let’s go'} ${icon('arrowRight')}</a>
          </div>
          <a class="activity-art" href="#/scene/${act.id}" tabindex="-1" aria-hidden="true" data-scene="${act.art}" data-cam="hero">${act.art === 'cafe' ? SCENE_ART.cafe() : SCENE_ART.mercado()}</a>
        </section>
        <div class="quick">
          <a class="qcard qc-review" href="${cafeDone ? '#/scene/mercado' : '#/today'}" ${cafeDone ? '' : 'data-action="locked" data-msg="Review opens after today’s café. Its words come back at Paco’s shop."'}>
            <span class="qc-top"><span class="qc-ic">${icon('refresh')}</span><span class="qc-go">${icon('arrowRight')}</span></span>
            <span class="qc-t"><b>Review</b><small>${!cafeDone ? 'Opens after the café' : reviewDone ? 'Done · words stronger' : `${reviewWords.length} words due · 3 min`}</small></span>
            <span class="qc-fan">${(cafeDone ? reviewWords.slice(0, 3) : ['', '', '']).map((w) => `<span class="qc-tile">${w ? prop(WORDS[w].art) : '<i>?</i>'}</span>`).join('')}</span>
          </a>
          <a class="qcard qc-bank" href="#/words">
            <span class="qc-top"><span class="qc-ic">${icon('cards')}</span><span class="qc-go">${icon('arrowRight')}</span></span>
            <span class="qc-t"><b>Word bank</b><small>${bankCount() ? `${bankCount()} words · ${places} ${places === 1 ? 'place' : 'places'}` : 'Fills up as you live scenes'}</small></span>
            <span class="qc-fan">${(recent.length ? recent : ['', '', '']).map((w) => `<span class="qc-tile">${w ? prop(WORDS[w].art) : '<i>+</i>'}</span>`).join('')}</span>
          </a>
        </div>
      </div>
      <section class="trip">
        <div class="sec-head"><div><h2>Your trip through Spain</h2><p>Each city is a level. Finish its scenes, then spend Rep to travel on. Friends on the same trip show up too.</p></div></div>
        <div class="map-grid">
          <div class="map-card"><div class="map-box">${spain(cityStates(), UI.city, null, isMobile() ? 15 : 13)}${mapPins()}</div></div>
          <div class="city-card" id="cityCard" aria-live="polite">${cityCard(UI.city)}</div>
        </div>
      </section>
      <section class="week">
        <div class="sec-head"><div><h2>${pace.title}</h2><p>${pace.desc}</p></div>${paceDD()}</div>
        <div class="journey">${journeyCards(pace)}</div>
      </section>
      ${roadStrip()}
    </div>`);
    const art = $('.activity-art');
    if (act.art === 'cafe' && actDone) ['cup', 'bread', 'glass'].forEach((p) => propIn(art, p));
    setCam(art, 'hero', true);
    walkRoad();
    Glo.context(cafeDone ? 'Your words are waiting at <b>Paco’s shop</b>. Or find <b>Meera</b> on the map and co-learn.' : 'Your first morning in Barcelona. Tap <b>Let’s go</b> for breakfast with Lucía.');
    later(() => Tour.start('today'), 800);
  }

  function viewWords() {
    const f = UI.filter;
    const ids = state.order.slice().reverse().filter((id) => { const n = state.words[id].length; return f === 'all' || (f === 'visit' && n === 1) || (f === 'strong' && n >= 2); });
    const counts = { all: state.order.length, visit: state.order.filter((i) => state.words[i].length === 1).length, strong: state.order.filter((i) => state.words[i].length >= 2).length };
    app.innerHTML = shell('words', `<div class="wrap bank">
      <a class="back" href="#/today">${icon('arrowLeft')}Spanish</a>
      <div class="bank-head"><div><h1>Word bank</h1><p>Like a notes app, but every word keeps its picture and the places you met it. More places, stronger word.</p></div></div>
      ${state.order.length ? `<div class="filters" role="group" aria-label="Filter words">
        <button type="button" class="filter" data-action="filter" data-f="all" aria-pressed="${f === 'all'}">All · ${counts.all}</button>
        <button type="button" class="filter" data-action="filter" data-f="visit" aria-pressed="${f === 'visit'}">Needs another visit · ${counts.visit}</button>
        <button type="button" class="filter" data-action="filter" data-f="strong" aria-pressed="${f === 'strong'}">Getting strong · ${counts.strong}</button>
      </div>
      <div class="wgrid">${ids.map((id, i) => { const w = WORDS[id], pl = state.words[id]; return `<a class="wtile ${w.tint}" href="#/word/${id}" style="animation-delay:${Math.min(i, 10) * 0.04}s">${state.fresh.includes(id) ? '<span class="new">New</span>' : ''}${svgArt(w.art)}<span class="w">${w.es}</span><span class="s"><span>${PLACES[pl[pl.length - 1]].nm}</span>${dots(pl.length)}</span></a>`; }).join('') || '<p class="empty-note">No words in this filter yet.</p>'}</div>`
        : `<div class="empty"><div class="empty-tiles">${['', '', ''].map(() => '<span class="qc-tile"><i>+</i></span>').join('')}</div><h2>Your word bank is empty</h2><p>Words land here as you live scenes, each with its picture and the place you met it.</p><a class="btn" href="#/scene/cafe">Start at the café ${icon('arrowRight')}</a></div>`}
    </div>`);
    Glo.context('A word with <b>one dot</b> has only been met in one place. It needs another visit to stick.');
  }

  function viewWord(id) {
    const w = WORDS[id], pl = state.words[id];
    if (!w || !pl) { location.hash = '#/words'; return; }
    const chips = bridgeChips(id);
    app.innerHTML = shell('words', `<div class="wrap wd">
      <a class="back" href="#/words">${icon('arrowLeft')}Word bank</a>
      <div class="wd-grid">
        <div class="wd-art ${w.tint}">${prop(w.art)}</div>
        <div>
          <h1>${w.es}</h1>
          <div class="row">
            <button type="button" class="icon-btn" data-action="say" data-text="${esc(w.es)}">${icon('volume')}Listen</button>
            <button type="button" class="icon-btn" data-action="say" data-text="${esc(w.es)}" data-slow="1">${icon('turtle')}Slower</button>
          </div>
          ${chips ? `<div class="row bridges">${chips}</div>` : ''}
          <h2>Met in ${pl.length} ${pl.length === 1 ? 'scene' : 'scenes'}</h2>
          <div class="met">${pl.map((p) => { const L = (LINES[id] || {})[p] || [w.es, '']; return `<div class="met-row"><div class="th ${PLACES[p].tint}">${prop(PLACES[p].art)}</div><div><div class="pl">${PLACES[p].nm}</div><div class="ln">${hl(L[0], w.es)}</div>${L[1] ? `<div class="gl">${blankify(L[1])}</div>` : ''}</div><button type="button" class="icon-btn round" data-action="say" data-text="${esc(L[0])}" aria-label="Listen to the sentence">${icon('volume')}</button></div>`; }).join('')}</div>
          <div class="strength" style="margin-top:14px">${dots(pl.length)}<span>${pl.length >= 3 ? 'Strong. You’ve met it in lots of places.' : `Meet it in ${3 - pl.length} more ${3 - pl.length === 1 ? 'place' : 'places'} to make it strong.`}</span></div>
          <div class="reveal" id="reveal"><p>Stuck? Seeing it in English is the last resort.</p><button type="button" class="btn btn-ghost btn-sm" data-action="revealWord" data-id="${id}">Show in English</button></div>
        </div>
      </div>
    </div>`);
    Glo.context('Say it out loud a couple of times. <b>Your mouth remembers too.</b>');
  }

  /* ================= Scene engine ================= */
  let SC = null;
  const cur = () => SC && SC.moments[SC.i];
  const speakerG = (who) => (CHARS[who] || CHARS.lucia).g;

  function viewScene(id) {
    const def = SCENES[id];
    if (!def) { location.hash = '#/today'; return; }
    if (!sceneOpen(id)) { toast('Finish the café first. Its words come back in this scene.'); location.hash = '#/today'; return; }
    document.body.classList.add('in-scene', 'no-tabs');
    SC = { def, moments: def.moments, i: -1, solved: false, misses: 0, english: 0, rep: 0, firstTry: 0, lvlBefore: levelOf(state.repEarned).id, counts: {}, known0: new Set(Object.keys(state.words)), tipped: {} };
    const artHTML = def.art === 'cafe' ? SCENE_ART.cafe() : SCENE_ART.mercado(def.artOpts ? def.artOpts() : {});
    app.innerHTML = `<div class="scene view">
      <div class="scene-top">
        <a class="close" href="#/today" aria-label="Leave the scene">${icon('x')}</a>
        <div class="scene-title">${def.title}</div>
        <div class="progress" aria-hidden="true">${def.moments.map(() => '<i></i>').join('')}</div>
        <div class="top-right">
          <button type="button" class="ola-mini" data-action="gloTap" aria-label="Ask Glo for a hint">${ola()}</button>
          <button type="button" class="icon-btn round help-btn" data-action="help" aria-label="How a scene works">${icon('help')}</button>
          <button type="button" class="icon-btn round" data-action="toggleSound" aria-label="${state.sound ? 'Mute voices' : 'Turn voices on'}">${icon(state.sound ? 'volume' : 'volumeOff')}</button>
          ${repPill(false)}
          <div class="bank-btn" aria-label="Words in your bank">${icon('cards')}<span class="lbl">Word bank</span><span class="count" id="bankCount">${bankCount()}</span></div>
        </div>
      </div>
      <div class="stage" id="stage" data-scene="${def.art}" data-cam="wide">
        ${artHTML}
        <div class="coach-pill" aria-hidden="true">${icon('hand')}Tap the picture to answer</div>
        <div class="timeskip" id="later" aria-live="polite"></div>
        <div class="intro" id="intro"><div class="intro-t"><span class="eyebrow white">${def.tag}</span><h2>${def.title}</h2><p>${def.where}</p></div></div>
      </div>
      <div class="say" id="say" hidden></div>
      <section class="panel" id="panel" aria-live="polite"></section>
    </div>`;
    const stage = $('#stage');
    fitScene();
    setCam(stage, 'wide', true);
    stage.addEventListener('click', (e) => { const h = e.target.closest('.hot.live'); if (h) onTap(h.dataset.hot, h); else confused(); });
    $('#panel').addEventListener('click', (e) => { if (!e.target.closest('button, a, input, .word, .say')) confused(); });
    stage.addEventListener('keydown', (e) => { const h = e.target.closest('.hot.live'); if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onTap(h.dataset.hot, h); } });
    later(() => wave(stage, def.speaker), 700);
    $('#panel').innerHTML = `
      <div class="tagrow"><span class="eyebrow">${def.review ? 'Review' : def.colearn ? 'Co-learn' : 'Today’s activity'}</span></div>
      <h2 class="intro-title">${def.activity}</h2>
      <p class="intro-blurb">${def.blurb}</p>
      <div class="intro-meta">${metaRow(def.meta)}</div>
      <div class="who-card">${def.colearn ? avatarBust(friend(def.colearn).av, 'av-44') : avatarBust(window.ART.CAST[def.speaker], 'av-44')}<p>${def.whoLine}</p></div>
      ${state.tours.scene ? '' : `<ol class="howto" aria-label="How a scene works"><li>${icon('ear')}<span><b>Listen</b> to the line</span></li><li>${icon('eye')}<span><b>Look</b> at the scene</span></li><li>${icon('hand')}<span><b>Tap</b> your answer</span></li></ol>`}
      <div class="panel-foot"><button type="button" class="btn btn-block" data-action="sceneStart">Let’s go ${icon('arrowRight')}</button></div>`;
    Glo.context('Tap <b>Let’s go</b> when you’re ready. I’ll stay in this corner if you need a hand.');
  }

  function setProgress() {
    $$('.progress i').forEach((el, i) => {
      el.classList.toggle('on', i < SC.i || (i === SC.i && SC.solved));
      el.classList.toggle('cur', i === SC.i && !SC.solved);
    });
  }
  function moveCam(key, cb) {
    const st = $('#stage');
    if (!st) return;
    const same = st.dataset.cam === key;
    setCam(st, key);
    if (cb) later(cb, same || reduced ? 60 : 1150);
  }

  // Comic speech bubble: Spanish line, small English gloss with a blank for the new word.
  function showSay(who, line, word, gloss) {
    const say = $('#say');
    say.hidden = false;
    say.dataset.who = who;
    say.classList.add('fading');
    say.innerHTML = `<div class="say-body"><span class="say-nm">${(CHARS[who] || { nm: '' }).nm}</span><p class="line">${hl(line, word ? WORDS[word].es : null, true)}</p>${gloss ? `<p class="gloss">${blankify(gloss)}</p>` : ''}</div><button type="button" class="icon-btn round play" data-action="sayLine" aria-label="Hear it again">${icon('volume')}</button>`;
    placeSay();
    setTimeout(() => say.classList.remove('fading'), 30);
    if (!state.sound) timedTalk(who, line);
  }
  function placeSay() {
    const say = $('#say'), stage = $('#stage'), scene = $('.scene');
    if (!say || say.hidden || !stage || !scene) return;
    const who = say.dataset.who;
    const head = stage.querySelector(`[data-who="${who}"] .head`);
    const sr = stage.getBoundingClientRect();
    let mouth = null;
    if (head) {
      const hr = head.getBoundingClientRect();
      const m = { x: hr.left + hr.width * 0.5, y: hr.top + hr.height * 0.8 };
      if (m.x > sr.left + 16 && m.x < sr.right - 16 && m.y > sr.top + 16 && m.y < sr.bottom - 16) mouth = m;
    }
    if (isMobile()) {
      say.style.left = say.style.top = '';
      if (mouth) {
        const br = say.getBoundingClientRect();
        say.dataset.tail = 't';
        say.style.setProperty('--tx', Math.max(24, Math.min(br.width - 24, mouth.x - br.left)) + 'px');
      } else say.dataset.tail = '';
      return;
    }
    const k = parseFloat(scene.style.getPropertyValue('--k')) || 1;
    const scr = scene.getBoundingClientRect(), bw = say.offsetWidth * k, bh = say.offsetHeight * k;
    const put = (left, top, tail, tx) => {
      say.dataset.tail = tail;
      say.style.setProperty('--tx', tx / k + 'px');
      say.style.left = left - scr.left + 'px';
      say.style.top = top - scr.top + 'px';
    };
    // 1. Beside the speaker's mouth, like a comic: right or left of the head, else just above it.
    //    A spot is rejected if it would cover any tappable thing, another character or the speaker's face.
    if (mouth) {
      const hr = head.getBoundingClientRect();
      const avoid = [hr];
      $$('.hot', stage).forEach((h) => { if (h.dataset.hot !== who) avoid.push(h.getBoundingClientRect()); });
      $$('[data-who]', stage).forEach((g) => { if (g.dataset.who !== who) avoid.push(g.getBoundingClientRect()); });
      const y = mouth.y - 16 - bh;
      const right = { l: hr.right + 6, t: y, tail: 'bl', tx: 24 };
      const left = { l: hr.left - 6 - bw, t: y, tail: 'br', tx: bw - 24 };
      const above = { l: mouth.x - bw / 2, t: hr.top - bh - 18, tail: 'b', tx: bw / 2 };
      const order = mouth.x > (sr.left + sr.right) / 2 ? [left, right, above] : [right, left, above];
      const fits = (c) => {
        const r = { l: c.l, t: c.t, r: c.l + bw, b: c.t + bh + 12 };
        if (r.l < sr.left + 12 || r.r > sr.right - 12 || r.t < sr.top + 12 || r.b > sr.bottom - 12) return false;
        return !avoid.some((a) => a.width && r.l < a.right + 6 && r.r > a.left - 6 && r.t < a.bottom + 6 && r.b > a.top - 6);
      };
      const c = order.find(fits);
      if (c) { put(c.l, c.t, c.tail, c.tx); return; }
    }
    // 2. Nothing free near the mouth: the band at the top of the scene, tail pointing down at the speaker.
    let l = sr.left + 20;
    if (mouth) l = Math.max(sr.left + 16, Math.min(sr.right - 16 - bw, mouth.x - 96));
    put(l, sr.top + 14 * k, mouth ? 'b' : '', mouth ? Math.max(30 * k, Math.min(bw - 30 * k, mouth.x - l)) : 40 * k);
  }

  function nextMoment() {
    clearTimers();
    Glo.hide();
    SC.i++;
    if (SC.i >= SC.moments.length) { sceneOutro(); return; }
    const m = cur();
    SC.solved = false;
    SC.misses = 0;
    SC.confused = 0;
    setProgress();
    const stage = $('#stage'), say = $('#say');
    say.classList.add('fading');
    const go = () => {
      if (m.enter) {
        (m.enter.props || []).forEach((p) => later(() => propIn(stage, p), 500));
        if (m.enter.eat) { const b = stage.querySelector('[data-prop="bread"]'); if (b) b.classList.add('eaten'); }
      }
      $$('.hot', stage).forEach((h) => { h.classList.remove('live', 'hint', 'right', 'wrong'); h.setAttribute('tabindex', '-1'); });
      stage.classList.toggle('tappable', m.type === 'tap');
      stage.classList.toggle('coach', m.type === 'tap' && !state.tours.tapped);
      if (m.type === 'tap') m.live.forEach((k) => { const h = stage.querySelector(`[data-hot="${k}"]`); if (h) { h.classList.add('live'); h.setAttribute('tabindex', '0'); } });
      renderMoment(m);
      momentGlo(m);
      moveCam(m.cam, () => {
        attend(m.who);
        gesture(m);
        showSay(m.who, m.line, m.word, m.gloss);
        if (SC.i === 0) later(() => Tour.start('scene'), 900);
        if (state.sound) Speech.say(m.line, false, $('#say .play'), speakerG(m.who), m.who);
      });
    };
    if (m.later) {
      say.classList.add('fading');
      $('#panel').innerHTML = '';
      const l = $('#later');
      l.textContent = m.later;
      l.classList.add('show');
      later(() => { l.classList.remove('show'); go(); }, 1600);
    } else go();
  }

  function renderMoment(m) {
    const w = WORDS[m.word];
    const seenToday = SC.counts[m.word] || 0;
    let tag = '<span class="eyebrow">New word</span>';
    if (SC.def.review) tag = '<span class="eyebrow blue">Remember this?</span>';
    else if (seenToday) tag = `<span class="eyebrow pink">Again · ${seenToday + 1}${seenToday === 1 ? 'nd' : 'rd'} time in this scene</span>`;
    else if (SC.known0.has(m.word)) tag = '<span class="eyebrow pink">Met before · new place</span>';
    const chips = SC.def.review || seenToday || SC.known0.has(m.word) ? '' : bridgeChips(m.word, { noBridge: m.noBridge });
    let inter = '';
    if (m.type === 'tap') inter = `<div class="tapcue"><span class="hand">${icon('search')}</span><span>Tap your answer in the scene${isMobile() ? ' above' : ''}.</span></div>`;
    if (m.type === 'pick') inter = `<div class="tiles" role="group" aria-label="Choose a picture">${m.options.map((o, i) => `<button type="button" class="tile" data-action="pick" data-k="${o}" aria-label="Picture ${i + 1}">${prop(o)}</button>`).join('')}</div>`;
    if (m.type === 'reply') inter = `<div class="replies">${m.replies.map((r, i) => `<button type="button" class="reply" data-action="reply" data-i="${i}"><span><span class="r-es">${esc(r.es)}</span><span class="r-en">${blankify(r.en)}</span></span>${icon('volume')}</button>`).join('')}</div>`;
    $('#panel').classList.remove('solved');
    $('#panel').innerHTML = `
      <div class="tagrow">${tag}</div>
      <div class="word-row"><div class="word" id="panelWord">${w.es}</div>
      <div class="audio"><button type="button" class="icon-btn" data-action="sayWord" aria-label="Listen">${icon('volume')}<span class="lbl">Listen</span></button><button type="button" class="icon-btn" data-action="sayWordSlow" aria-label="Listen slower">${icon('turtle')}<span class="lbl">Slower</span></button></div></div>
      ${chips ? `<div class="bridges">${chips}</div>` : ''}
      <p class="prompt">${m.prompt}<small>${m.sub}</small></p>
      ${inter}
      <div id="olaSlot"></div>
      <div id="fb"></div>
      <div class="panel-foot" id="foot"></div>`;
  }

  function momentGlo(m) {
    const w = WORDS[m.word];
    const acts = gloActs(m);
    Glo.context(() => {
      if (SC.solved) { Glo.say('You’ve got it. Tap <b>Continue</b> when you’re ready.'); return; }
      Glo.say(`Stuck on <b>${w.es}</b>? Pick a hint. English is the last resort.`, { actions: acts });
    });
    if (SC.def.review || isMobile()) return;
    const seen = SC.counts[m.word];
    if (m.noBridge) later(() => Glo.say('No sound-alike for this one. <b>Let the scene be your clue.</b>'), 2600);
    else if (seen && !SC.tipped.repeat) { SC.tipped.repeat = true; later(() => Glo.say(`<b>${w.es}</b> again! Meeting a word more than once is how it sticks.`), 2600); }
    else if (!seen && !SC.known0.has(m.word) && !SC.tipped.bridge) {
      const fb = firstBridge(m.word);
      if (fb && fb.lang !== 'English') { SC.tipped.bridge = true; later(() => Glo.say(`Psst: <b>${w.es}</b> sounds like <b>${esc(fb.word)}</b> in ${fb.lang}.`), 2600); }
    }
  }

  function onTap(key, el) {
    if (SC.solved) return;
    if (key === cur().answer) correct(el); else wrong(key, el);
  }

  function correct(el, okText, props) {
    const m = cur();
    SC.solved = true;
    clearTimers();
    $('#panel').classList.add('solved');
    Glo.hide();
    const stage = $('#stage');
    stage.classList.remove('tappable');
    if (el) el.classList.add('right');
    const tapped = el && el.classList.contains('hot');
    if (tapped && !state.tours.tapped) { state.tours.tapped = true; save(); stage.classList.remove('coach'); }
    if (tapped) { gaze(m.who, el); later(() => gaze(m.who, null), 1300); }
    if (el && el.classList.contains('hot')) later(() => el.classList.remove('right'), 900);
    $$('.hot.hint', stage).forEach((h) => h.classList.remove('hint'));
    $$('.tile, .reply').forEach((t) => { if (t !== el) t.classList.add('dim'); });
    (props || m.props || []).forEach((p) => later(() => propIn(stage, p), 250));
    const res = learn(m.word, SC.def.place);
    SC.counts[m.word] = (SC.counts[m.word] || 0) + 1;
    if (SC.misses === 0) SC.firstTry++;
    const w = WORDS[m.word];
    const praise = ['¡Muy bien!', '¡Eso es!', '¡Perfecto!', '¡Genial!'][SC.i % 4];
    const sc = (n) => `${n} ${n === 1 ? 'scene' : 'scenes'}`;
    const times = SC.counts[m.word];
    const strengthText = res.isNew ? 'added to your word bank' : res.grew ? `now met in ${sc(res.count)}` : times === 1 ? 'already in your word bank' : `${times}${times === 2 ? 'nd' : times === 3 ? 'rd' : 'th'} time in this scene`;
    const gain = REP.answer + (SC.misses === 0 ? REP.firstTry : 0);
    SC.rep += gain;
    addRep(gain);
    $('#fb').innerHTML = `<div class="feedback"><span class="badge">${icon('check')}</span><div class="fb-txt"><b>${praise}</b><p>${okText || m.ok}</p></div><span class="rep-gain">+${gain} Rep</span></div>
      <div class="strength" style="margin-top:12px">${dots(res.count, res.grew)}<span><b>${w.es}</b> · ${strengthText}</span></div>`;
    const last = SC.i === SC.moments.length - 1;
    $('#foot').innerHTML = `<button type="button" class="btn btn-block" data-action="next">${last ? 'Finish' : 'Continue'} ${icon('arrowRight')}</button>`;
    setProgress();
    Glo.jump();
    react(m.who, 'joy', 1900);
    pose(m.who, SC.i % 2 ? 'cheer' : 'thumb', 1500);
    if (state.sound) later(() => Speech.say(w.es, false, null, speakerG(m.who), m.who), 350);
    if (res.isNew || res.grew) flyToBank(w.es, $('#panelWord'));
    if (m.after) later(() => moveCam(m.after, placeSay), 900);
    const btn = $('#foot .btn');
    if (btn && isMobile()) later(() => btn.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' }), 450);
  }

  function wrong(key, el) {
    const m = cur();
    SC.misses++;
    if (el) { el.classList.remove('wrong'); void el.getBoundingClientRect(); el.classList.add('wrong'); later(() => el.classList.remove('wrong'), 800); }
    const msg = (m.wrong && m.wrong[key]) || 'Not quite. Look at the scene again.';
    react(m.who, 'soft', 1700);
    pose(m.who, null);
    confused();
    const hintBtn = m.type !== 'reply' ? `<button type="button" class="link-btn" data-action="hint">${icon('search')}Show me where</button>` : '';
    $('#fb').innerHTML = `<div class="feedback soft"><span class="badge">${icon('eye')}</span><div class="fb-txt"><b>Not quite</b><p>${msg}</p>${hintBtn}</div></div>`;

  }

  /* Someone tapping around is looking for what to do. Help in steps, gently:
     3 confused taps: everything you can tap wiggles once.
     5: only the answer wiggles and glows once.
     9: Glo steps in and offers help. Counts reset on every new moment. */
  const HELP_AT = { all: 3, answer: 5, glo: 9 };
  function confused() {
    if (!SC || SC.solved || !cur() || SC.i < 0) return;
    SC.confused = (SC.confused || 0) + 1;
    const n = SC.confused;
    if (n === HELP_AT.all) nudge(false);
    else if (n === HELP_AT.answer) nudge(true);
    else if (n === HELP_AT.glo) offerHelp();
  }
  const artFor = (key) => $$(`#stage [data-art~="${key}"], #stage [data-prop="${key}"].in, #stage [data-who="${key}"]`);
  function once(el, cls, ms) { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); }
  function nudge(answerOnly) {
    const m = cur();
    if (m.type === 'tap') {
      const keys = answerOnly ? [m.answer] : m.live;
      keys.forEach((k, i) => setTimeout(() => {
        const art = artFor(k), h = $(`#stage [data-hot="${k}"]`);
        art.forEach((a) => once(a, 'wiggle', 800));
        if (h && (answerOnly || !art.length)) once(h, answerOnly ? 'nudge' : 'peek', 1400);
      }, i * 90));
      if (answerOnly) { const h = $(`#stage [data-hot="${m.answer}"]`); if (h) pointAt(m.who, h); }
    } else {
      const items = $$(m.type === 'pick' ? '.tile' : '.reply');
      const pick = answerOnly ? items.filter((t) => m.type === 'reply' || t.dataset.k === m.answer).slice(0, 1) : items;
      pick.forEach((t, i) => setTimeout(() => { once(t, 'wiggle', 800); if (answerOnly) once(t, 'glow', 1400); }, i * 90));
    }
  }
  function gloActs(m) {
    const w = WORDS[m.word];
    const acts = [{ label: 'Say it slower', icon: 'turtle', fn: () => Speech.say(w.es, true, null, speakerG(m.who), m.who) }];
    if (m.type !== 'reply') acts.push({ label: 'Show me where', icon: 'search', fn: hint });
    acts.push({ label: 'Show it in English', icon: 'eye', fn: revealEnglish });
    return acts;
  }
  function offerHelp() {
    const m = cur();
    Glo.jump();
    if (m.type === 'tap') { const h = $(`#stage [data-hot="${m.answer}"]`); if (h) { pointAt(m.who, h); once(h, 'nudge', 1400); } }
    Glo.say(m.type === 'tap' ? `Need a hand? You’re looking for <b>${WORDS[m.word].es}</b> in the picture.` : `Need a hand? Pick the answer below for <b>${WORDS[m.word].es}</b>.`, { actions: gloActs(m) });
  }

  function hint() {
    if (!SC || SC.solved) return;
    const m = cur();
    if (m.type === 'tap') {
      const h = $(`#stage [data-hot="${m.answer}"]`);
      if (h) { h.classList.add('hint'); pointAt(m.who, h); }
    } else if (m.type === 'pick') {
      const t = $(`.tile[data-k="${m.answer}"]`);
      if (t) { t.classList.remove('hint'); void t.offsetWidth; t.classList.add('hint'); }
    } else Glo.say('Either answer works here. Use the English gloss under each reply.');
  }

  function revealEnglish() {
    if (!SC || !cur() || $('#panel .english')) return;
    SC.english++;
    const box = document.createElement('div');
    box.className = 'english';
    box.innerHTML = `In English: <b>${WORDS[cur().word].en}</b>. Next time, try picturing the scene first.`;
    $('#fb').before(box);
  }

  function sceneOutro() {
    const def = SC.def, stage = $('#stage'), o = def.outro;
    SC.i = SC.moments.length;
    $$('.progress i').forEach((el) => { el.classList.add('on'); el.classList.remove('cur'); });
    stage.classList.remove('tappable');
    moveCam(def.art === 'cafe' ? 'lucia' : 'shop', () => {
      attend(o.who);
      wave(stage, o.who);
      showSay(o.who, o.line, null, o.gloss);
      if (state.sound) Speech.say(o.line, false, $('#say .play'), speakerG(o.who), o.who);
    });
    const bonus = def.review ? REP.review : def.colearn ? REP.colearn : REP.scene;
    SC.rep += bonus;
    addRep(bonus);
    state.done[def.place] = true;
    const newWords = [...new Set(def.moments.map((m) => m.word))].filter((w) => !SC.known0.has(w));
    logToday({ min: def.mins, rep: SC.rep, words: newWords, scene: def.title });
    if (def.review) state.stuck = Math.round((SC.firstTry / def.moments.length) * 100);
    state.last = { id: def.id, english: SC.english, rep: SC.rep, lvlBefore: SC.lvlBefore, lvlAfter: levelOf(state.repEarned).id, firstTry: SC.firstTry, total: def.moments.length };
    save();
    $('#panel').innerHTML = `
      <div class="tagrow"><span class="eyebrow">Scene complete</span></div>
      <h2 class="intro-title">${o.title}</h2>
      <p class="intro-blurb">${o.text}</p>
      <div class="feedback"><span class="badge">${icon('star')}</span><div class="fb-txt"><b>+${bonus} Rep · ${def.colearn ? 'co-learn bonus' : 'scene bonus'}</b><p>${SC.rep} Rep earned in this scene.</p></div></div>
      <div id="olaSlot"></div>
      <div class="panel-foot"><button type="button" class="btn btn-block" data-action="toDone">See what you picked up ${icon('arrowRight')}</button></div>`;
    Glo.jump();
    Glo.context('¡Fantástico! Let’s look at what you picked up.');
  }

  function viewDone(id) {
    const def = SCENES[id];
    if (!def) { location.hash = '#/today'; return; }
    const words = [...new Set(def.moments.map((m) => m.word))].filter((w) => state.words[w]);
    const L = state.last && state.last.id === id ? state.last : { english: 0, rep: 0 };
    const fresh = words.filter((w) => state.words[w].length === 1 && state.words[w][0] === def.place);
    const leveled = L.lvlAfter && L.lvlAfter !== L.lvlBefore;
    const newLvl = leveled ? LEVELS.find((l) => l.id === L.lvlAfter) : null;
    app.innerHTML = shell('spanish', `<div class="wrap done-page">
      <section class="done-hero">
        <div>
          <h1>${def.review ? '¡Genial!' : '¡Muy bien!'}</h1>
          <p>${def.outro.text}</p>
          <div class="stats">${def.review ? `<span>${words.length} words reviewed</span><span>${L.firstTry || 0} of ${L.total || words.length} first try</span>` : `<span>${fresh.length} new ${fresh.length === 1 ? 'word' : 'words'}</span><span>${def.moments.length} moments</span>`}<span>+${L.rep} Rep</span><span>${L.english} English ${L.english === 1 ? 'hint' : 'hints'}</span></div>
        </div>
        ${def.colearn ? avatarFull(friend(def.colearn).av, 'done-friend', { wave: true, mood: 'joy' }) : glo({ mood: 'joy', cls: 'done-glo is-jump' })}
      </section>
      ${newLvl ? `<section class="levelup">
        <div class="lu-avs">${myBust('av-96')}</div>
        <div><span class="eyebrow pink">Level up</span><h2>You’re now ${/^[AEIOU]/.test(newLvl.nm) ? 'an' : 'a'} ${newLvl.nm}</h2><p>You have <b>${state.rep} Rep</b> to spend. Unlock a new cap, top or badge for your traveller.</p><a class="btn btn-sm" href="#/profile">Customise your avatar ${icon('arrowRight')}</a></div>
      </section>` : ''}
      <h2>${def.review ? 'Stronger now' : 'Words from this scene'}</h2>
      <div class="wgrid">${words.map((wid, i) => { const w = WORDS[wid], pl = state.words[wid]; return `<a class="wtile ${w.tint}" href="#/word/${wid}" style="animation-delay:${i * 0.07}s">${fresh.includes(wid) ? '<span class="new">New</span>' : '<span class="new">+1 place</span>'}${svgArt(w.art)}<span class="w">${w.es}</span><span class="s"><span>${pl.length} ${pl.length === 1 ? 'scene' : 'scenes'}</span>${dots(pl.length)}</span></a>`; }).join('')}</div>
      <div class="grid-2" style="margin-top:32px">
        <div class="card lime"><span class="eyebrow">Try it today</span><div class="try"><div><p class="line">${def.outro.tryToday}</p><p class="gl">${blankify(def.outro.tryEn)}</p></div><div class="row" style="display:flex;gap:10px"><button type="button" class="icon-btn" data-action="say" data-text="${esc(def.outro.tryToday)}">${icon('volume')}Listen</button><button type="button" class="icon-btn" data-action="say" data-text="${esc(def.outro.tryToday)}" data-slow="1">${icon('turtle')}Slower</button></div></div><p>Say it out loud once, then use it next time you get the chance.</p></div>
        <div class="card pink"><span class="eyebrow pink">Culture note</span><p style="color:var(--ink);font-size:19px">${def.outro.culture}</p><p>${def.outro.next}</p></div>
      </div>
      <div class="done-actions"><a class="btn" href="#/today">Back to Spanish ${icon('arrowRight')}</a><a class="btn btn-ghost" href="#/words">Open word bank</a></div>
    </div>`);
    later(confetti, 250);
    later(() => Glo.jump(), 400);
    Glo.context(newLvl ? 'Level up! Visit your profile to spend Rep on a new look.' : 'Nice work. Your words are safe in the word bank.');
    if (!isMobile()) later(() => Glo.say(def.review ? 'Those words just got stronger. <b>¡Genial!</b>' : '<b>¡Fantástico!</b> That was a real conversation.'), 1200);
  }

  /* ================= Actions ================= */
  function closeDD() { const d = $('#paceDD'); if (d) { d.classList.remove('open'); $('.dd-btn', d).setAttribute('aria-expanded', 'false'); } }
  const actions = {
    noop() {},
    openAbout() { openAbout(); },
    closeModal() { closeModal(); },
    invite() { openInvite(); },
    copyInvite() {
      const i = $('#invLink');
      try { navigator.clipboard.writeText(i.value).then(() => toast('Invite link copied'), () => { i.select(); toast('Select and copy the link'); }); } catch (e) { i.select(); toast('Select and copy the link'); }
    },
    gloTap() { Glo.tap(); },
    tourNext() { Tour.next(); },
    tourSkip() { Tour.end(); },
    help() { const r = document.body.dataset.route; if (!Tour.start(r === 'spanish' ? 'today' : r, true)) openHow(); },
    replayGuide() { closeModal(); state.tours = {}; save(); if (!Tour.start(document.body.dataset.route === 'spanish' ? 'today' : document.body.dataset.route, true)) openHow(); },
    hint() { hint(); },
    repInfo() { toast('Rep is earned in every scene. Spend it to travel to new cities and unlock avatar items.'); },
    cheer(el) { toast(`You cheered ${el.dataset.nm} on`); },
    addLang() { toast('More languages are on the way. This prototype shows Spanish.'); },
    toggleLang(el) {
      const id = el.dataset.id;
      if (UI.langSel.has(id)) UI.langSel.delete(id); else UI.langSel.add(id);
      el.setAttribute('aria-pressed', UI.langSel.has(id));
      $('#langHint').textContent = UI.langSel.size ? `${UI.langSel.size} selected` : 'Pick at least one to continue';
      $('[data-action="toLearn"]').disabled = !UI.langSel.size;
    },
    toLearn() {
      if (!UI.langSel.size) { toast('Pick at least one language you speak'); return; }
      state.known = KNOWN.map((l) => l.id).filter((id) => UI.langSel.has(id));
      save();
      location.hash = '#/start/learn';
    },
    pickLearn() {
      UI.learn = UI.learn ? null : 'es';
      $('#learnList').innerHTML = learnList();
      const b = $('[data-action="toGoal"]');
      b.disabled = !UI.learn;
      b.innerHTML = `${UI.learn ? 'Continue with Spanish' : 'Choose a language'} ${icon('arrowRight')}`;
    },
    toGoal() { if (!UI.learn) { toast('Choose the language you want to learn'); return; } location.hash = '#/start/goal'; },
    soon(el) { toast(`${el.dataset.nm} is coming soon. This prototype shows the Spanish flow.`); },
    pickGoal(el) {
      UI.goal = el.dataset.id;
      $$('.gopt').forEach((g) => { const on = g.dataset.id === UI.goal; g.classList.toggle('on', on); g.setAttribute('aria-checked', on); });
      $('[data-action="startLearning"]').disabled = false;
    },
    skipGoal() { UI.goal = null; actions.startLearning(true); },
    startLearning(skipped) {
      if (skipped !== true && !UI.goal) { toast('Pick how you’d like to learn, or skip'); return; }
      if (!UI.learn) { location.hash = '#/start/learn'; return; }
      const g = GOALS.find((x) => x.id === UI.goal);
      state.goal = g ? g.id : null;
      state.pace = g ? g.pace : 'steady';
      state.learning = 'es';
      if (!state.arrived) { state.arrived = true; state.rep += REP.welcome; state.repEarned += REP.welcome; }
      save();
      location.hash = '#/arrive';
    },
    arriveDone() { location.hash = '#/today'; },
    locked(el) { toast(el.dataset.msg); },
    city(el) {
      UI.city = el.dataset.id;
      const box = $('.map-box');
      box.innerHTML = spain(cityStates(), UI.city, null, isMobile() ? 15 : 13) + mapPins();
      $('#cityCard').innerHTML = cityCard(UI.city);
      const again = $(`.city[data-id="${UI.city}"]`);
      if (again) again.focus({ preventScroll: true });
    },
    travel(el) {
      const c = CITIES.find((x) => x.id === el.dataset.id);
      const homeDone = HOME_CITY.scenes.every((p) => state.done[p]);
      if (c.lvl > 2) toast(`Cities open one at a time. Reach Madrid first, then ${c.nm}.`);
      else if (!homeDone) toast(`Finish your Barcelona scenes first. Then spend ${c.cost} Rep to travel to ${c.nm}.`);
      else if (state.rep < c.cost) toast(`You need ${c.cost - state.rep} more Rep to travel to ${c.nm}.`);
      else toast(`${c.nm} is coming soon in this prototype.`);
    },
    colearn(el) {
      const f = friend(el.dataset.id);
      if (f.city !== 'barcelona') { toast(`${f.nm} is in ${f.where}. You can co-learn together once you get there.`); return; }
      if (state.colearn[f.id]) { location.hash = sceneOpen('colearn') ? '#/scene/colearn' : '#/today'; if (!sceneOpen('colearn')) toast('Finish the café first, then shop with Meera.'); return; }
      state.colearn[f.id] = true;
      save();
      toast(`Shopping with ${f.nm} added to your week`);
      if (location.hash === '#/today') { viewToday(); const wk = $('.week'); if (wk) wk.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
      else router();
    },
    ffilter(el) { UI.ffilter = el.dataset.f; viewFriends(); },
    pfTab(el) { UI.tab = el.dataset.tab; pfRefresh(false); },
    pfItem(el) {
      const it = shopItem(UI.tab, el.dataset.id);
      if (!owns(it)) {
        if (state.rep < it.cost) { toast(`You need ${it.cost - state.rep} more Rep for the ${it.nm.toLowerCase()}. Earn it in scenes.`); return; }
        state.owned.push(it.id);
        addRep(-it.cost);
        toast(`Unlocked: ${it.nm} · −${it.cost} Rep`);
      }
      if (state.eq[UI.tab] === it.id) return;
      state.eq[UI.tab] = it.id;
      save();
      pfRefresh(true);
    },
    ddToggle() {
      const d = $('#paceDD');
      const open = !d.classList.contains('open');
      d.classList.toggle('open', open);
      $('.dd-btn', d).setAttribute('aria-expanded', open);
      if (open) { const sel = $('[aria-selected="true"]', d); if (sel) sel.focus({ preventScroll: true }); }
    },
    ddPick(el) {
      state.pace = el.dataset.v;
      save();
      closeDD();
      const y = window.scrollY;
      viewToday();
      window.scrollTo(0, y);
      toast(`Pace set to ${PACES[state.pace].label}`);
    },
    sceneStart() { $('#intro').classList.add('gone'); Glo.hide(); nextMoment(); },
    sayWord(el) { const m = cur(); if (m) Speech.say(WORDS[m.word].es, false, el.classList.contains('icon-btn') ? el : null, speakerG(m.who), m.who); },
    sayWordSlow(el) { const m = cur(); if (m) Speech.say(WORDS[m.word].es, true, el, speakerG(m.who), m.who); },
    sayLine(el) {
      if (!SC) return;
      const m = cur();
      if (m) Speech.say(m.line, false, el, speakerG(m.who), m.who); else Speech.say(SC.def.outro.line, false, el, speakerG(SC.def.outro.who), SC.def.outro.who);
    },
    pick(el) { if (SC.solved) return; if (el.dataset.k === cur().answer) correct(el); else wrong(el.dataset.k, el); },
    reply(el) {
      if (SC.solved) return;
      const r = cur().replies[+el.dataset.i];
      if (state.sound) Speech.say(r.es);
      correct(el, r.ok, r.props || []);
    },
    next() { nextMoment(); },
    toDone() { location.hash = '#/done/' + SC.def.id; },
    say(el) { Speech.say(el.dataset.text, el.dataset.slow === '1', el); },
    toggleSound(el) {
      state.sound = !state.sound;
      save();
      el.innerHTML = icon(state.sound ? 'volume' : 'volumeOff');
      el.setAttribute('aria-label', state.sound ? 'Mute voices' : 'Turn voices on');
      if (!state.sound) Speech.stop();
      toast(state.sound ? 'Voices on' : 'Voices off. Tap any speaker to listen.');
    },
    filter(el) { UI.filter = el.dataset.f; viewWords(); },
    revealWord(el) { $('#reveal').innerHTML = `<p>In English</p><span class="en">${WORDS[el.dataset.id].en}</span>`; },
    reset() {
      try { localStorage.removeItem(KEY); localStorage.removeItem(OLD_KEY); sessionStorage.removeItem('picto-intro'); } catch (e) { /* ignore */ }
      Tour.end(true);
      state = INITIAL();
      Object.assign(UI, { langSel: null, learn: null, goal: null, search: '', city: 'barcelona' });
      closeModal();
      toast('Demo restarted');
      if (location.hash === '#/' || !location.hash) router(); else location.hash = '#/';
    }
  };
  document.addEventListener('click', (e) => {
    const dd = $('#paceDD');
    if (dd && dd.classList.contains('open') && !dd.contains(e.target)) closeDD();
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const fn = actions[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (Tour.id) { Tour.end(); return; } if ($('.modal')) { closeModal(); return; } closeDD(); }
    if (Tour.id && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); if (e.key === 'ArrowRight') Tour.next(); else Tour.back(); return; }
    const dd = e.target.closest && e.target.closest('.dd-menu');
    if (dd && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const items = $$('li', dd), i = items.indexOf(e.target);
      const n = items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
      if (n) n.focus();
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('span[data-action], g[data-action], li[data-action]')) {
      e.preventDefault();
      e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
  document.addEventListener('input', (e) => {
    if (e.target.id === 'langSearch') { UI.search = e.target.value; $('#learnList').innerHTML = learnList(); }
  });

  /* ================= Router ================= */
  const routes = [
    [/^#?\/?$/, viewIndex, false, 'index'],
    [/^#\/notes$/, viewNotes, false, 'index'],
    [/^#\/start$/, viewStart, false, 'start'],
    [/^#\/start\/learn$/, viewLearn, false, 'start'],
    [/^#\/start\/goal$/, viewGoal, false, 'start'],
    [/^#\/arrive$/, viewArrive, true, 'arrive'],
    [/^#\/home$/, viewHome, true, 'home'],
    [/^#\/stats$/, viewStats, true, 'home'],
    [/^#\/profile$/, viewProfile, true, 'home'],
    [/^#\/friends$/, viewFriends, true, 'home'],
    [/^#\/today$/, viewToday, true, 'spanish'],
    [/^#\/words$/, viewWords, true, 'words'],
    [/^#\/word\/(\w+)$/, viewWord, true, 'words'],
    [/^#\/scene\/(\w+)$/, viewScene, true, 'scene'],
    [/^#\/done\/(\w+)$/, viewDone, true, 'done']
  ];
  function router() {
    const h = location.hash || '#/';
    clearTimers();
    Speech.stop();
    Glo.hide();
    Tour.end(true);
    closeModal();
    SC = null;
    document.body.classList.remove('in-scene', 'no-tabs', 'arriving');
    for (const [re, fn, needsSetup, name] of routes) {
      const m = h.match(re);
      if (m) {
        if (needsSetup && !state.learning) { location.hash = '#/start'; return; }
        document.body.dataset.route = name;
        window.scrollTo(0, 0);
        fn(...m.slice(1));
        return;
      }
    }
    location.hash = '#/';
  }

  let rz;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { relayout(); Tour.place(); }, 120); });
  window.addEventListener('scroll', () => Tour.place(true), { passive: true });
  window.addEventListener('hashchange', router);
  Speech.init();
  Glo.mount();
  router();
})();
