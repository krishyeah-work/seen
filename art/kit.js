/* Picto illustration kit: palette, helpers, word props, UI icons, small decorations.
   Every art file is an IIFE that adds to window.ART. Load order: kit, glo, people, scenes, map. */
(function () {
  const C = {
    INK: '#0B0B0B', BLUE: '#3A5AFF', BLUE_DEEP: '#2238C9', LIME: '#C6F432', LIME_DEEP: '#A5D31C', PINK: '#FF6FB5', WHITE: '#FFFFFF',
    SKIN: '#C98B5E', SKIN2: '#8D5A3B', TAN: '#E8B26A', TOMATO: '#FF4D3D', ORANGE: '#FFA62B', LEAF: '#3B8F2E'
  };
  const { INK, BLUE, LIME, PINK, WHITE, TAN, TOMATO, ORANGE } = C;
  const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const T3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;

  let uid = 0;
  const nextId = (p = 'a') => p + (++uid);
  // Darken (amt < 0) or lighten (amt > 0) a hex colour. One shade and one highlight per shape is the house rule.
  function shade(hex, amt = -0.18) {
    const n = parseInt(hex.slice(1), 16);
    const f = (c) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
    return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((c) => f(c).toString(16).padStart(2, '0')).join('');
  }
  function starPts(cx, cy, r) {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      p.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
    }
    return p.join(' ');
  }

  /* ---------- Word & scene props (100 x 100) ---------- */
  const P = {
    glass: `<path d="M30 18 H70 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="#DDF1FF"/><path d="M32.4 44 H67.6 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="#6CC4FF"/><rect x="40" y="26" width="5" height="40" rx="2.5" fill="#fff"/><path d="M30 18 H70 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="none" ${S}/>`,
    cup: `<ellipse cx="48" cy="80" rx="36" ry="8" fill="#fff" ${S}/><path d="M22 36 H70 V56 Q70 74 52 74 H40 Q22 74 22 56 Z" fill="#fff" ${S}/><rect x="24" y="46" width="44" height="8" fill="${PINK}"/><path d="M70 42 Q86 42 85 53 Q84 64 70 62" fill="none" ${S}/><path d="M36 26 q-5 -6 0 -12 q5 -6 0 -12 M54 26 q-5 -6 0 -12 q5 -6 0 -12" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    bread: `<ellipse cx="50" cy="82" rx="36" ry="5" fill="${INK}" opacity=".12"/><path d="M14 66 C10 42 30 30 50 30 C70 30 90 42 86 66 Q86 74 78 74 H22 Q14 74 14 66 Z" fill="${TAN}" ${S}/><path d="M34 40 L40 56 M50 36 L56 54 M66 40 L70 54" stroke="#B9822F" stroke-width="4" stroke-linecap="round"/>`,
    table: `<rect x="46" y="44" width="8" height="38" fill="${INK}"/><ellipse cx="50" cy="84" rx="20" ry="5" fill="${INK}"/><ellipse cx="50" cy="44" rx="40" ry="11" fill="#93C21A" ${S}/><ellipse cx="50" cy="39" rx="40" ry="11" fill="${LIME}" ${S}/>`,
    receipt: `<path d="M28 12 H72 V86 L66 81 L60 86 L54 81 L48 86 L42 81 L36 86 L28 81 Z" fill="#fff" ${S}/><rect x="36" y="22" width="28" height="6" rx="3" fill="${INK}"/><rect x="36" y="35" width="18" height="4" rx="2" fill="#B5B5B0"/><rect x="58" y="35" width="6" height="4" rx="2" fill="#B5B5B0"/><rect x="36" y="45" width="22" height="4" rx="2" fill="#B5B5B0"/><rect x="60" y="45" width="4" height="4" rx="2" fill="#B5B5B0"/><rect x="36" y="56" width="28" height="3" fill="${INK}"/><text x="64" y="72" text-anchor="end" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="12" fill="${INK}">5,00€</text>`,
    menucard: `<rect x="24" y="14" width="52" height="72" rx="8" fill="${PINK}" ${S}/><rect x="34" y="26" width="32" height="7" rx="3.5" fill="${INK}"/><rect x="34" y="44" width="32" height="4" rx="2" fill="#fff"/><rect x="34" y="54" width="26" height="4" rx="2" fill="#fff"/><rect x="34" y="64" width="30" height="4" rx="2" fill="#fff"/>`,
    coins: `<ellipse cx="44" cy="76" rx="26" ry="9" fill="${LIME}" ${S}/><ellipse cx="44" cy="66" rx="26" ry="9" fill="${LIME}" ${S}/><ellipse cx="44" cy="56" rx="26" ry="9" fill="${LIME}" ${S}/><circle cx="74" cy="34" r="14" fill="${LIME}" ${S}/><path d="M74 28 V40" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    juice: `<path d="M58 6 L50 44" stroke="${PINK}" stroke-width="6" stroke-linecap="round"/><path d="M30 22 H70 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="#FFE2B3"/><path d="M31.6 38 H68.4 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="${ORANGE}"/><path d="M30 22 H70 L64 84 Q63.5 88 59 88 H41 Q36.5 88 36 84 Z" fill="none" ${S}/><circle cx="70" cy="24" r="11" fill="${ORANGE}" ${S}/><path d="M70 17 V31 M63 24 H77" stroke="#FFE2B3" stroke-width="2.5"/>`,
    suitcase: `<path d="M40 30 V22 Q40 17 45 17 H55 Q60 17 60 22 V30" fill="none" ${S}/><rect x="20" y="30" width="60" height="50" rx="10" fill="${BLUE}"/><rect x="33" y="30" width="8" height="50" fill="${LIME}"/><rect x="59" y="30" width="8" height="50" fill="${LIME}"/><rect x="20" y="30" width="60" height="50" rx="10" fill="none" ${S}/><circle cx="31" cy="86" r="4" fill="${INK}"/><circle cx="69" cy="86" r="4" fill="${INK}"/>`,
    hand: `<g fill="#F2C29B" ${S}><rect x="30" y="22" width="10" height="34" rx="5"/><rect x="41" y="15" width="10" height="40" rx="5"/><rect x="52" y="17" width="10" height="40" rx="5"/><rect x="63" y="25" width="10" height="33" rx="5"/><rect x="13" y="46" width="11" height="28" rx="5.5" transform="rotate(-38 18.5 60)"/><path d="M28 48 Q27 84 51 84 Q74 84 74 56 V48 Z"/></g><path d="M16 20 q-7 8 0 16 M86 18 q7 8 0 16" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    heart: `<path d="M50 84 C22 66 12 48 20 34 C28 20 44 22 50 34 C56 22 72 20 80 34 C88 48 78 66 50 84 Z" fill="${PINK}" ${S}/><path d="M30 38 q4 -7 11 -5" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    orange: `<circle cx="50" cy="56" r="30" fill="${ORANGE}" ${S}/><path d="M50 26 q4 -12 16 -12 q-2 12 -16 12" fill="#3B8F2E" ${S}/><circle cx="60" cy="46" r="5" fill="#FFD08A"/>`,
    plane: `<path d="M44 44 L60 44 L50 20 L42 20 Z" fill="${BLUE}" ${S}/><path d="M44 56 L62 56 L48 82 L38 82 Z" fill="${BLUE}" ${S}/><path d="M12 50 Q12 42 22 42 H76 Q92 42 94 50 Q92 58 76 58 H22 Q12 58 12 50 Z" fill="#fff" ${S}/><path d="M15 44 L24 44 L18 24 L10 24 Z" fill="${BLUE}" ${S}/><circle cx="58" cy="50" r="3" fill="${INK}"/><circle cx="68" cy="50" r="3" fill="${INK}"/><circle cx="78" cy="50" r="3" fill="${INK}"/>`,
    taxi: `<rect x="40" y="15" width="20" height="10" rx="3" fill="${INK}"/><path d="M12 66 V54 Q12 46 22 45 L30 30 Q33 25 40 25 H60 Q67 25 70 30 L78 45 Q88 46 88 54 V66 Z" fill="${LIME}" ${S}/><path d="M34 44 L39 33 H48 V44 Z M52 44 V33 H61 L66 44 Z" fill="#fff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><circle cx="30" cy="68" r="9" fill="${INK}"/><circle cx="70" cy="68" r="9" fill="${INK}"/><circle cx="30" cy="68" r="3.5" fill="#fff"/><circle cx="70" cy="68" r="3.5" fill="#fff"/>`,
    cart: `<rect x="56" y="14" width="13" height="22" rx="3" fill="${LIME}" ${S}/><circle cx="44" cy="28" r="9" fill="${PINK}" ${S}/><path d="M24 34 H86 L76 64 H33 Z" fill="#fff" ${S}/><path d="M8 22 H20 L33 64" fill="none" ${S}/><circle cx="38" cy="78" r="6" fill="${INK}"/><circle cx="72" cy="78" r="6" fill="${INK}"/>`,
    scissors: `<path d="M30 14 L64 62 M70 14 L36 62" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="74" r="12" fill="${PINK}" ${S}/><circle cx="68" cy="74" r="12" fill="${PINK}" ${S}/><circle cx="50" cy="41" r="3.5" fill="#fff" stroke="${INK}" stroke-width="2"/>`,
    plate: `<circle cx="50" cy="52" r="28" fill="#fff" ${S}/><circle cx="50" cy="52" r="17" fill="#FFE3F1" stroke="${INK}" stroke-width="3"/><path d="M12 24 V42 Q12 48 16 48 V82 M16 24 V42 M20 24 V42 Q20 48 16 48" fill="none" ${S}/><path d="M86 24 Q77 36 79 52 H86 V82" fill="none" ${S}/>`,
    // Foods: every option in a food question is a food, drawn the way it's served.
    pantomate: `<ellipse cx="46" cy="76" rx="40" ry="9" fill="#fff" ${S}/><path d="M14 66 Q10 44 24 40 Q30 32 44 34 H66 Q80 34 80 48 V66 Q80 72 74 72 H20 Q14 72 14 66 Z" fill="${TAN}" ${S}/><path d="M22 62 Q20 48 30 46 Q34 40 44 42 H64 Q72 42 72 50 V62 Z" fill="${TOMATO}"/><path d="M30 52 q6 -3 10 1 M50 50 q6 -3 12 1 M36 60 q6 -2 12 0" stroke="#C42A1E" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="44" cy="55" r="2.2" fill="#FFD23F"/><circle cx="60" cy="58" r="1.8" fill="#FFD23F"/><circle cx="84" cy="66" r="11" fill="${TOMATO}" ${S}/><path d="M80 57 q4 -5 8 0" stroke="#3B8F2E" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    croissant: `<ellipse cx="50" cy="80" rx="36" ry="5" fill="${INK}" opacity=".12"/><path d="M12 68 Q10 44 34 36 Q50 30 66 36 Q90 44 88 68 Q80 62 72 64 Q64 52 50 52 Q36 52 28 64 Q20 62 12 68 Z" fill="#E9A84C" ${S}/><path d="M34 37 Q38 48 34 62 M50 32 V52 M66 37 Q62 48 66 62" fill="none" stroke="#B8761F" stroke-width="3.2" stroke-linecap="round"/><path d="M40 40 q4 -3 8 -2" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    churros: `<path d="M58 60 h28 v14 q0 12 -14 12 q-14 0 -14 -12 z" fill="#7A3E1C" ${S}/><path d="M60 66 h24" stroke="#A65A2E" stroke-width="3"/>${[[14, 22, -24], [24, 18, -12], [36, 20, 4]].map(([x, y, r]) => `<g transform="rotate(${r} ${x + 6} ${y + 30})"><rect x="${x}" y="${y}" width="12" height="62" rx="6" fill="#D99A3E" ${S}/><path d="M${x + 4} ${y + 6} V${y + 56} M${x + 8} ${y + 6} V${y + 56}" stroke="#B8761F" stroke-width="1.8"/></g>`).join('')}<circle cx="22" cy="40" r="1.6" fill="#fff"/><circle cx="34" cy="56" r="1.6" fill="#fff"/><circle cx="44" cy="34" r="1.6" fill="#fff"/>`,
    eggs: `<path d="M10 58 H90 L84 82 Q83 86 79 86 H21 Q17 86 16 82 Z" fill="#C9B79C" ${S}/><path d="M28 58 V84 M50 58 V84 M72 58 V84" stroke="#A8957A" stroke-width="2"/><ellipse cx="28" cy="52" rx="11" ry="14" fill="#FFF6E6" ${S}/><ellipse cx="50" cy="48" rx="11" ry="14" fill="#F4E2C4" ${S}/><ellipse cx="72" cy="52" rx="11" ry="14" fill="#FFF6E6" ${S}/><path d="M24 44 q2 -4 6 -5 M46 40 q2 -4 6 -5" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    // Hair styles and colours (salon choices)
    hairShort: `<path d="M24 92 Q24 70 50 68 Q76 70 76 92 Z" fill="${BLUE}" ${S}/><rect x="44" y="56" width="12" height="14" fill="#C98B5E"/><ellipse cx="50" cy="42" rx="20" ry="23" fill="#C98B5E" ${S}/><path d="M30 38 Q30 16 50 16 Q70 16 70 38 Q64 28 50 28 Q36 28 30 38 Z" fill="${INK}"/><circle cx="43" cy="44" r="2.4" fill="${INK}"/><circle cx="57" cy="44" r="2.4" fill="${INK}"/><path d="M45 53 Q50 57 55 53" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    hairLong: `<path d="M26 34 Q26 12 50 12 Q74 12 74 34 L78 80 Q66 86 60 72 H40 Q34 86 22 80 Z" fill="${INK}"/><path d="M24 92 Q24 70 50 68 Q76 70 76 92 Z" fill="${PINK}" ${S}/><rect x="44" y="56" width="12" height="14" fill="#C98B5E"/><ellipse cx="50" cy="42" rx="20" ry="23" fill="#C98B5E" ${S}/><path d="M30 40 Q30 18 50 18 Q70 18 70 40 Q62 26 50 28 Q38 26 30 40 Z" fill="${INK}"/><path d="M30 36 Q26 60 30 78 M70 36 Q74 60 70 78" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="43" cy="44" r="2.4" fill="${INK}"/><circle cx="57" cy="44" r="2.4" fill="${INK}"/><path d="M45 53 Q50 57 55 53" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    // Haircut photos come in pairs that match the learner's avatar: a man's short and longer cut, a woman's bob and long hair.
    hairShortF: `<path d="M26 36 Q26 12 50 12 Q74 12 74 36 L76 60 Q76 66 70 66 H30 Q24 66 24 60 Z" fill="${INK}"/><path d="M24 92 Q24 70 50 68 Q76 70 76 92 Z" fill="${PINK}" ${S}/><rect x="44" y="56" width="12" height="14" fill="#E0A77E"/><ellipse cx="50" cy="42" rx="20" ry="23" fill="#E0A77E" ${S}/><path d="M30 40 Q30 18 50 18 Q70 18 70 40 Q62 26 50 28 Q38 26 30 40 Z" fill="${INK}"/><path d="M30 36 Q27 50 30 62 M70 36 Q73 50 70 62" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="29" cy="69" r="3" fill="#F5C542" stroke="${INK}" stroke-width="2"/><circle cx="71" cy="69" r="3" fill="#F5C542" stroke="${INK}" stroke-width="2"/><circle cx="43" cy="44" r="2.4" fill="${INK}"/><circle cx="57" cy="44" r="2.4" fill="${INK}"/><path d="M45 53 Q50 57 55 53" stroke="#C2405A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    hairLongM: `<path d="M27 38 Q26 12 50 12 Q74 12 73 38 L73 50 Q70 54 66 50 H34 Q30 54 27 50 Z" fill="${INK}"/><path d="M24 92 Q24 70 50 68 Q76 70 76 92 Z" fill="${BLUE}" ${S}/><rect x="44" y="56" width="12" height="14" fill="#C98B5E"/><ellipse cx="50" cy="42" rx="20" ry="23" fill="#C98B5E" ${S}/><path d="M30.4 46 Q31 66 50 67 Q69 66 69.6 46 Q66 59 50 59 Q34 59 30.4 46 Z" fill="${INK}"/><path d="M30 42 Q28 16 50 16 Q72 16 70 40 Q66 27 54 26 Q44 30 30 42 Z" fill="${INK}"/><path d="M30 38 Q29 44 30.4 50 M70 38 Q71 44 69.6 50" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><circle cx="43" cy="44" r="2.4" fill="${INK}"/><circle cx="57" cy="44" r="2.4" fill="${INK}"/><path d="M45 53 Q50 56.4 55 53" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    // A booking: calendar page and a clock.
    appointment: `<rect x="12" y="20" width="64" height="64" rx="10" fill="#fff" ${S}/><path d="M12 30 Q12 20 22 20 H66 Q76 20 76 30 V38 H12 Z" fill="${PINK}" ${S}/><rect x="26" y="10" width="7" height="18" rx="3.5" fill="${INK}"/><rect x="55" y="10" width="7" height="18" rx="3.5" fill="${INK}"/>${[[24, 50], [38, 50], [52, 50], [24, 64], [38, 64]].map(([x, y]) => `<rect x="${x}" y="${y}" width="9" height="8" rx="2" fill="${INK}" opacity=".18"/>`).join('')}<circle cx="70" cy="72" r="19" fill="${LIME}" ${S}/><path d="M70 61 V72 L78 77" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    dyePink: `<rect x="40" y="8" width="20" height="12" rx="4" fill="${INK}"/><path d="M50 20 C70 22 74 44 68 64 C64 80 56 90 50 90 C44 90 36 80 32 64 C26 44 30 22 50 20 Z" fill="#E64C9A" ${S}/><path d="M42 30 Q38 52 44 76 M52 28 Q50 54 54 82 M60 32 Q64 52 58 74" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    dyeBlue: `<rect x="40" y="8" width="20" height="12" rx="4" fill="${INK}"/><path d="M50 20 C70 22 74 44 68 64 C64 80 56 90 50 90 C44 90 36 80 32 64 C26 44 30 22 50 20 Z" fill="${BLUE}" ${S}/><path d="M42 30 Q38 52 44 76 M52 28 Q50 54 54 82 M60 32 Q64 52 58 74" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    // Salon
    mirror: `<rect x="44" y="80" width="12" height="10" fill="${INK}"/><ellipse cx="50" cy="92" rx="22" ry="5" fill="${INK}"/><ellipse cx="50" cy="44" rx="30" ry="38" fill="${PINK}" ${S}/><ellipse cx="50" cy="44" rx="22" ry="30" fill="#CFE9FF" ${S}/><path d="M36 34 L52 18 M38 48 L60 26" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
    towel: `<rect x="14" y="54" width="72" height="26" rx="8" fill="${BLUE}" ${S}/><path d="M14 70 H86" stroke="#fff" stroke-width="4"/><rect x="20" y="30" width="62" height="26" rx="8" fill="${PINK}" ${S}/><path d="M20 46 H82" stroke="#fff" stroke-width="4"/><path d="M28 36 q8 -4 16 0" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    shampoo: `<path d="M44 10 H60 V18 H66" fill="none" ${S}/><rect x="42" y="18" width="18" height="12" rx="3" fill="${INK}"/><path d="M32 36 Q32 30 40 30 H62 Q70 30 70 36 V82 Q70 88 64 88 H38 Q32 88 32 82 Z" fill="${LIME}" ${S}/><rect x="38" y="48" width="26" height="24" rx="5" fill="#fff" ${S}/><circle cx="51" cy="60" r="6" fill="${ORANGE}"/><path d="M36 40 V66" stroke="#fff" stroke-opacity=".6" stroke-width="3.5" stroke-linecap="round"/>`,
    tooth: `<path d="M22 30 C22 16 36 12 50 20 C64 12 78 16 78 30 C78 44 72 50 70 62 C68 76 64 88 58 88 C52 88 54 68 50 68 C46 68 48 88 42 88 C36 88 32 76 30 62 C28 50 22 44 22 30 Z" fill="#fff" ${S}/><path d="M34 28 q6 -6 14 -2" stroke="${BLUE}" stroke-width="4" fill="none" stroke-linecap="round"/>`
  };
  const prop = (k) => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${P[k] || ''}</svg>`;

  /* ---------- UI icons (24, stroke) ---------- */
  const I = {
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    volume: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    volumeOff: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    home: '<path d="M4 11l8-7 8 7v8.5a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19.5z"/>',
    cards: '<rect x="4" y="7" width="13" height="13" rx="2.5"/><path d="M8 4h9.5A2.5 2.5 0 0 1 20 6.5V16"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    turtle: '<path d="M4 15c0-4 3.6-7 8-7s8 3 8 7H4z"/><path d="M20 13.5h1.5a1.5 1.5 0 0 0 0-3H19M7 15v2.5M17 15v2.5"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    sparkle: '<path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.4"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    chat: '<path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-7l-4.5 3.5V16.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z"/>',
    bag: '<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2M3.5 12.5h17"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>',
    plane: '<path d="M10.5 13.5L4 11l1.5-1.5 7 1 3.5-3.5a2 2 0 0 1 3 3l-3.5 3.5 1 7L15 22l-2.5-6.5-3 3V21l-1.5 1-1-3.5L3.5 17.5l1-1.5H7z"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.5a6.5 6.5 0 0 1 3 5.5"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.5-1.3 1-1.3 2M12 17v.3"/>',
    hand: '<path d="M9 11.5V5.2a1.6 1.6 0 0 1 3.2 0V11l5 1.1a2.2 2.2 0 0 1 1.7 2.5l-.6 3.6A3.4 3.4 0 0 1 15 21h-2.6a3.4 3.4 0 0 1-2.7-1.3L6 15.2a1.5 1.5 0 0 1 2.2-2z"/>',
    ear: '<path d="M7 9.5a5 5 0 0 1 10 0c0 3-2.6 3.6-3.2 5.6-.5 1.8-1.5 3.4-3.6 3.4A2.8 2.8 0 0 1 7.4 16"/><path d="M10 10a2 2 0 0 1 4 0c0 1.2-1 1.6-1.6 2.4"/>',
    flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.4 3.6-8.3.3 1.9 1.2 3 2.4 3.6-.1-2.6.9-5.2 3.1-7.1-.2 3.6 3.9 6.1 3.9 11.6 0 3.6-2.6 6.4-6.5 6.4z"/>'
  };
  const icon = (k, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${I[k] || ''}</svg>`;

  /* ---------- Road decorations ---------- */
  const deco = {
    grass: `<svg class="grass" viewBox="0 0 30 22" aria-hidden="true" focusable="false"><path d="M6 22 Q7 12 3 5 M13 22 Q13 9 16 2 M20 22 Q21 13 27 8" fill="none" stroke="#3B8F2E" stroke-width="3.2" stroke-linecap="round"/></svg>`,
    flower: (c) => `<svg class="flower" viewBox="0 0 24 34" aria-hidden="true" focusable="false"><path d="M12 34 V15 M12 26 Q6 23 5 18" fill="none" stroke="#3B8F2E" stroke-width="3" stroke-linecap="round"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(12 + Math.cos((a * Math.PI) / 180) * 5).toFixed(1)}" cy="${(10 + Math.sin((a * Math.PI) / 180) * 5).toFixed(1)}" r="4.2" fill="${c}" stroke="${INK}" stroke-width="1.6"/>`).join('')}<circle cx="12" cy="10" r="3.6" fill="#FFD23F" stroke="${INK}" stroke-width="1.6"/></svg>`,
    flag: (on) => `<svg class="flag" viewBox="0 0 24 40" aria-hidden="true" focusable="false"><path d="M5 40 V4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M6 5 H21 L17 11 L21 17 H6 Z" fill="${on ? LIME : '#fff'}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
    sign: (txt) => `<svg class="sign" viewBox="0 0 100 74" aria-hidden="true" focusable="false"><path d="M44 74 V30" stroke="${INK}" stroke-width="4"/><path d="M6 6 H82 L94 19 L82 32 H6 Z" fill="${BLUE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><text x="46" y="24.5" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" fill="#fff">${txt}</text></svg>`
  };

  window.ART = { C, S, T3, P, nextId, shade, starPts, prop, icon, deco };
})();
