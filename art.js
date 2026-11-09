/* Seen — illustration kit. Flat, bold-pop shapes drawn as inline SVG. */
(function () {
  const INK = '#0B0B0B', BLUE = '#3A5AFF', LIME = '#C6F432', PINK = '#FF6FB5', WHITE = '#FFFFFF';
  const SKIN = '#C98B5E', SKIN2 = '#8D5A3B', TAN = '#E8B26A', TOMATO = '#FF4D3D', ORANGE = '#FFA62B';
  const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

  /* ---------- Scene cast (same character system as the traveller) ---------- */
  const CAST = {
    lucia: { skin: SKIN, hair: 'bun', hairC: '#1F1A17', fem: true, top: 'tee', topC: INK, apron: LIME, pack: 'none' },
    paco: { skin: SKIN2, hair: 'short', hairC: '#2A1A10', tache: true, top: 'tee', topC: LIME, apron: WHITE, pack: 'none' }
  };
  const castFig = (cfg, x, y, s, legs) => avatarFull(cfg, 'scene-fig', { legs }).replace('<svg ', `<svg x="${x}" y="${y}" width="${120 * s}" height="${200 * s}" `);

  /* ---------- Café La Plaza (800 x 500) ---------- */
  function cafe() {
    let stripes = '';
    for (let i = 0; i < 30; i++) stripes += `<rect x="${352 + i * 44}" y="316" width="18" height="100" fill="#FF8DC4"/>`;
    return `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" overflow="visible" role="img" aria-label="Café La Plaza: Lucía behind the counter, a menu board on the wall and a small table by the window">
    <g class="cam">
      <rect x="-900" y="-700" width="2600" height="1100" fill="${BLUE}"/>
      <rect x="-900" y="400" width="2600" height="800" fill="#2238C9"/>
      <rect x="-900" y="400" width="2600" height="8" fill="#1A2DA8"/>
      <g>
        <rect x="560" y="48" width="196" height="150" rx="18" fill="${WHITE}"/>
        <rect x="572" y="60" width="172" height="126" rx="10" fill="#FFC4E1"/>
        <circle cx="704" cy="98" r="20" fill="${LIME}"/>
        <path d="M572 186 V150 H600 V132 H628 V150 H648 V124 L664 110 L680 124 V150 H706 V140 H744 V186 Z" fill="${INK}"/>
        <rect x="655" y="60" width="6" height="126" fill="${WHITE}"/>
      </g>
      <line x1="420" y1="-700" x2="420" y2="42" stroke="${INK}" stroke-width="3"/>
      <path d="M396 66 A24 24 0 0 1 444 66 Z" fill="${LIME}"/>
      <line x1="520" y1="-700" x2="520" y2="26" stroke="${INK}" stroke-width="3"/>
      <path d="M500 46 A20 20 0 0 1 540 46 Z" fill="${PINK}"/>
      <g class="menu">
        <rect x="48" y="48" width="270" height="196" rx="18" fill="${INK}"/>
        <text x="74" y="94" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="28" fill="${LIME}" letter-spacing="1">MENÚ</text>
        <g font-family="Space Grotesk, sans-serif" font-weight="500" font-size="20" fill="${WHITE}">
          <text x="74" y="140">Café</text><text x="294" y="140" text-anchor="end">1,50 €</text>
          <text x="74" y="178">Pan con tomate</text><text x="294" y="178" text-anchor="end">2,50 €</text>
          <text x="74" y="216">Agua</text><text x="294" y="216" text-anchor="end">1,00 €</text>
        </g>
        <rect class="hot" data-hot="menu-cafe" x="62" y="114" width="244" height="36" rx="8" tabindex="-1" role="button" aria-label="Menu line 1"/>
        <rect class="hot" data-hot="menu-pan" x="62" y="152" width="244" height="36" rx="8" tabindex="-1" role="button" aria-label="Menu line 2"/>
        <rect class="hot" data-hot="menu-agua" x="62" y="190" width="244" height="36" rx="8" tabindex="-1" role="button" aria-label="Menu line 3"/>
      </g>
      <g class="lucia" data-who="lucia">${castFig(CAST.lucia, 332, 103, 2.3, false)}</g>
      <rect class="hot" data-hot="lucia" x="400" y="116" width="144" height="180" rx="20" tabindex="-1" role="button" aria-label="Lucía"/>
      <g class="counter">
        <rect x="330" y="296" width="1400" height="20" rx="4" fill="${INK}"/>
        <rect x="340" y="316" width="1380" height="100" fill="${PINK}"/>
        ${stripes}
      </g>
      <g class="machine">
        <rect x="640" y="214" width="120" height="82" rx="12" fill="${WHITE}"/>
        <rect x="640" y="214" width="120" height="22" rx="10" fill="${INK}"/>
        <circle cx="738" cy="258" r="9" fill="${LIME}"/>
        <rect x="666" y="248" width="30" height="14" rx="4" fill="${INK}"/>
        <rect x="672" y="274" width="18" height="22" rx="3" fill="${PINK}"/>
      </g>
      <g class="chair">
        <rect x="34" y="318" width="14" height="140" rx="6" fill="${PINK}"/>
        <rect x="34" y="384" width="78" height="14" rx="6" fill="${PINK}"/>
        <rect x="98" y="396" width="10" height="62" rx="4" fill="${PINK}"/>
      </g>
      <rect class="hot" data-hot="chair" x="22" y="306" width="44" height="156" rx="12" tabindex="-1" role="button" aria-label="Chair"/>
      <g class="table">
        <rect x="166" y="364" width="16" height="88" fill="${INK}"/>
        <ellipse cx="174" cy="456" rx="44" ry="9" fill="${INK}"/>
        <ellipse cx="174" cy="362" rx="104" ry="20" fill="#93C21A"/>
        <ellipse cx="174" cy="354" rx="104" ry="20" fill="${LIME}"/>
      </g>
      <g class="prop" data-prop="cup">
        <ellipse cx="114" cy="350" rx="26" ry="6" fill="${WHITE}"/>
        <path d="M96 320 H130 V334 Q130 348 116 348 H110 Q96 348 96 334 Z" fill="${WHITE}"/>
        <path d="M130 326 Q142 326 141 334 Q140 341 130 340" stroke="${WHITE}" stroke-width="5" fill="none"/>
        <rect x="96" y="328" width="34" height="6" fill="${PINK}"/>
        <g class="steam"><path d="M106 312 q-6 -8 0 -16 q6 -8 0 -16" stroke="${WHITE}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M121 312 q-6 -8 0 -16 q6 -8 0 -16" stroke="${WHITE}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
      </g>
      <g class="prop" data-prop="bread">
        <ellipse cx="176" cy="348" rx="36" ry="8" fill="${WHITE}"/>
        <g class="food"><rect x="150" y="328" width="52" height="17" rx="8" fill="${TAN}"/><circle cx="162" cy="334" r="4.5" fill="${TOMATO}"/><circle cx="177" cy="332" r="5.5" fill="${TOMATO}"/><circle cx="191" cy="336" r="4" fill="${TOMATO}"/></g>
        <g class="crumbs"><circle cx="166" cy="345" r="2" fill="${TAN}"/><circle cx="184" cy="346" r="2.5" fill="${TAN}"/><circle cx="174" cy="343" r="1.8" fill="${TOMATO}"/></g>
      </g>
      <g class="prop" data-prop="glass">
        <path d="M222 312 H248 L244 350 H226 Z" fill="#DDF1FF"/>
        <path d="M223.6 328 H246.4 L244 350 H226 Z" fill="#6CC4FF"/>
        <rect x="228" y="317" width="3.5" height="27" rx="1.75" fill="${WHITE}" opacity=".85"/>
      </g>
      <g class="prop" data-prop="receipt">
        <path d="M148 334 L196 326 L201 352 L153 360 Z" fill="${WHITE}"/>
        <path d="M156 338 L182 334 M158 346 L176 343" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <path d="M184 344 L194 342" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      </g>
      <ellipse class="hot" data-hot="table" cx="180" cy="384" rx="112" ry="74" tabindex="-1" role="button" aria-label="Table"/>
      <ellipse class="hot" data-hot="cup" cx="116" cy="330" rx="28" ry="26" tabindex="-1" role="button" aria-label="Item on the table 1"/>
      <ellipse class="hot" data-hot="bread" cx="176" cy="338" rx="32" ry="20" tabindex="-1" role="button" aria-label="Item on the table 2"/>
      <ellipse class="hot" data-hot="glass" cx="235" cy="331" rx="22" ry="26" tabindex="-1" role="button" aria-label="Item on the table 3"/>
    </g>
    </svg>`;
  }

  /* ---------- El mercado (800 x 500) ---------- */
  function mercado(opts = {}) {
    let awning = '';
    for (let i = 0; i < 24; i++) {
      const x = -280 + i * 60;
      awning += `<rect x="${x}" y="-700" width="60" height="760" fill="${i % 2 ? WHITE : LIME}"/><circle cx="${x + 30}" cy="60" r="30" fill="${i % 2 ? WHITE : LIME}"/>`;
    }
    const bottle = (x) => `<g><rect x="${x + 8}" y="128" width="12" height="10" rx="3" fill="${BLUE}"/><path d="M${x} 152 Q${x} 138 ${x + 14} 138 Q${x + 28} 138 ${x + 28} 152 V196 Q${x + 28} 200 ${x + 24} 200 H${x + 4} Q${x} 200 ${x} 196 Z" fill="#BDE5FF"/><rect x="${x}" y="164" width="28" height="14" fill="${WHITE}"/><rect x="${x + 5}" y="146" width="4" height="16" rx="2" fill="${WHITE}" opacity=".8"/></g>`;
    const carton = (x) => `<g><path d="M${x} 150 L${x + 15} 136 L${x + 30} 150 Z" fill="#FFD08A"/><rect x="${x}" y="150" width="30" height="50" rx="3" fill="${ORANGE}"/><circle cx="${x + 15}" cy="172" r="8" fill="${WHITE}"/><circle cx="${x + 15}" cy="172" r="4.5" fill="${ORANGE}"/></g>`;
    return `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" overflow="visible" role="img" aria-label="El mercado: a shelf with bottles, cartons, bread and oranges, and Paco the shopkeeper">
    <g class="cam">
      <rect x="-900" y="-700" width="2600" height="1100" fill="${PINK}"/>
      <rect x="-900" y="400" width="2600" height="800" fill="${BLUE}"/>
      ${awning}
      <rect x="56" y="104" width="560" height="300" rx="16" fill="${WHITE}"/>
      <rect x="56" y="200" width="560" height="10" fill="${INK}"/>
      <rect x="56" y="302" width="560" height="10" fill="${INK}"/>
      <rect x="56" y="396" width="560" height="10" fill="${INK}"/>
      ${bottle(86)}${bottle(124)}${bottle(162)}
      ${carton(232)}${carton(270)}${carton(308)}
      ${[386, 426].map((x) => `<g><path d="M${x} 200 V151 L${x + 4} 141 H${x + 32} L${x + 36} 151 V200 Z" fill="#9A6234"/><path d="M${x + 4} 141 L${x + 7} 133 H${x + 29} L${x + 32} 141 Z" fill="#6E4220"/><path d="M${x + 10} 137 H${x + 26}" stroke="#F7E7CE" stroke-width="2" stroke-linecap="round"/><rect x="${x + 6}" y="158" width="24" height="28" rx="5" fill="#F7E7CE"/><ellipse cx="${x + 18}" cy="172" rx="6" ry="8.4" fill="#5A3519" transform="rotate(22 ${x + 18} 172)"/><path d="M${x + 15.5} 165.5 Q${x + 20.5} 171.5 ${x + 17} 178.5" stroke="#F7E7CE" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>`).join('')}
      <g><rect x="490" y="146" width="104" height="54" rx="10" fill="${BLUE}"/><rect x="502" y="160" width="80" height="10" rx="5" fill="${WHITE}"/><rect x="502" y="178" width="52" height="8" rx="4" fill="${LIME}"/></g>
      <g><path d="M82 298 C78 270 100 256 132 256 C164 256 186 270 182 298 Z" fill="${TAN}"/><path d="M110 266 L116 284 M134 262 L140 282 M158 266 L162 284" stroke="#B9822F" stroke-width="4" stroke-linecap="round"/><path d="M196 298 C192 276 210 264 236 264 C262 264 280 276 276 298 Z" fill="${TAN}"/><path d="M220 272 L225 288 M244 270 L248 288" stroke="#B9822F" stroke-width="4" stroke-linecap="round"/></g>
      <g>${[[330,282],[358,282],[386,282],[414,282],[344,258],[372,258],[400,258],[372,236]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="15" fill="${ORANGE}"/><circle cx="${x+4}" cy="${y-6}" r="3" fill="#FFD08A"/>`).join('')}</g>
      ${[474, 522].map((x) => `<g><rect x="${x}" y="252" width="36" height="46" rx="9" fill="#E4F2CF"/><rect x="${x - 2}" y="243" width="40" height="11" rx="3.5" fill="${INK}"/><circle cx="${x + 11}" cy="270" r="5.4" fill="#6B8E23"/><circle cx="${x + 24}" cy="279" r="5.4" fill="#4E6B22"/><circle cx="${x + 13}" cy="288" r="5.4" fill="#6B8E23"/><circle cx="${x + 26}" cy="264" r="5" fill="#4E6B22"/></g>`).join('')}
      <g><path d="M90 392 Q86 340 120 336 Q156 334 150 392 Z" fill="${TOMATO}"/><path d="M174 392 Q170 344 204 340 Q238 340 234 392 Z" fill="${TOMATO}"/><path d="M112 336 q6 -10 14 -6 M196 340 q6 -10 14 -6" stroke="#3B8F2E" stroke-width="5" fill="none" stroke-linecap="round"/></g>
      <g><rect x="300" y="344" width="172" height="48" rx="10" fill="${BLUE}"/><text x="386" y="375" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="19" fill="${WHITE}" letter-spacing="2">MERCADO</text></g>
      <g><path d="M484 392 V364 H592 V392 Z" fill="#C98F3E"/><path d="M484 376 H592" stroke="#9C6A26" stroke-width="3"/>${[[500, 356], [522, 354], [544, 356], [566, 354], [511, 345], [533, 344], [555, 345]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#FFE04A"/><circle cx="${x + 9}" cy="${y}" r="2" fill="#E8C42A"/>`).join('')}</g>
      <g class="paco" data-who="paco">${castFig(CAST.paco, 568, 143, 2.3, false)}</g>
      <rect x="640" y="372" width="200" height="40" rx="8" fill="${INK}"/>
      ${opts.friend ? `<g class="friend-fig" data-who="${opts.friendId || 'friend'}">${castFig(opts.friend, 412, 143, 2.3, true)}</g>` : ''}
      <rect class="hot" data-hot="cafe" x="380" y="126" width="90" height="80" rx="10" tabindex="-1" role="button" aria-label="Shelf item: bags"/>
      <rect class="hot" data-hot="agua" x="78" y="120" width="120" height="86" rx="10" tabindex="-1" role="button" aria-label="Shelf item: bottles"/>
      <rect class="hot" data-hot="zumo" x="224" y="126" width="122" height="80" rx="10" tabindex="-1" role="button" aria-label="Shelf item: cartons"/>
      <rect class="hot" data-hot="pan" x="74" y="248" width="210" height="58" rx="10" tabindex="-1" role="button" aria-label="Shelf item: loaves"/>
      <rect class="hot" data-hot="naranja" x="306" y="214" width="134" height="92" rx="10" tabindex="-1" role="button" aria-label="Shelf item: round fruit"/>
    </g>
    </svg>`;
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
    flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.4 3.6-8.3.3 1.9 1.2 3 2.4 3.6-.1-2.6.9-5.2 3.1-7.1-.2 3.6 3.9 6.1 3.9 11.6 0 3.6-2.6 6.4-6.5 6.4z"/>'
  };
  const icon = (k, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${I[k] || ''}</svg>`;

  /* ---------- Ola, the learning buddy ---------- */
  function ola(cls = '') {
    return `<svg class="ola-svg ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M46 16 C46 4 60 0 68 7 C62 7 58 11 60 17" fill="${BLUE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M60 14 C88 14 108 33 108 60 C108 87 88 105 60 105 C52 105 45 104 39 101 L17 111 L24 91 C16 82 12 71 12 60 C12 33 32 14 60 14 Z" fill="${LIME}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <g class="ola-eyes"><ellipse cx="45" cy="55" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="76" cy="55" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <g class="ola-pupils"><circle cx="47" cy="57" r="5.5" fill="${INK}"/><circle cx="78" cy="57" r="5.5" fill="${INK}"/></g></g>
      <ellipse cx="34" cy="75" rx="7" ry="4.5" fill="${PINK}"/><ellipse cx="87" cy="75" rx="7" ry="4.5" fill="${PINK}"/>
      <path class="ola-mouth" d="M51 77 Q60 86 69 77" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  /* ---------- Traveller avatars: one character, swappable items ----------
     Adult proportions (~4.5 heads), expressive faces (neutral / joy / thinking),
     two-part arms that can wave once, legs that can walk. viewBox 120 x 200. */
  let uid = 0;
  function shade(hex, amt = -0.18) {
    const n = parseInt(hex.slice(1), 16);
    const f = (c) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
    return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((c) => f(c).toString(16).padStart(2, '0')).join('');
  }
  const AV_DEFAULT = { skin: SKIN, hair: 'short', hairC: '#1F1A17', fem: false, beard: false, tache: false, cap: 'none', capC: PINK, top: 'tee', topC: BLUE, pants: '#2E3A73', pack: 'pack', packC: PINK, badge: 'none', eyes: 'none', apron: null, bg: 'lime' };
  const T3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round"`;
  const TB = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const TF = `stroke="${INK}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"`;
  const FACE = 'M44 33 C44 20 51 13 60 13 C69 13 76 20 76 33 C76 46 70 54.5 60 54.5 C50 54.5 44 46 44 33 Z';
  const TORSO = 'M40 72 Q40 59.5 52 58.5 H68 Q80 59.5 80 72 L78.5 113 Q78.5 116 75.5 116 H44.5 Q41.5 116 41.5 113 Z';

  function avBack(c) {
    let s = '';
    if (c.pack !== 'none') s += `<path d="M53.5 58 V52 Q60 46.5 66.5 52 V58" fill="none" stroke="${INK}" stroke-width="2.4"/><rect x="30.5" y="57" width="59" height="52" rx="15" fill="${c.packC}" ${TB}/><rect x="30.5" y="57" width="59" height="13" rx="6.5" fill="${shade(c.packC, -0.12)}" ${TB}/>`;
    if (c.hair === 'long') s += `<path d="M42 30 C40 14 52 8 60 8 C68 8 80 14 78 30 L79 60 Q79 64.5 74 64.5 H70 Q68.4 56 66 52 H54 Q51.6 56 50 64.5 H46 Q41 64.5 41 60 Z" fill="${c.hairC}" ${TB}/>`;
    if (c.hair === 'bun' && c.cap === 'none') s += `<circle cx="60" cy="9.5" r="7.2" fill="${c.hairC}" ${TB}/>`;
    if (c.top === 'hoodie') s += `<path d="M45 64 Q42 50 52 48.5 H68 Q78 50 75 64 Z" fill="${shade(c.topC, 0.18)}" ${TB}/>`;
    return s;
  }
  function avLegs(c) {
    return `<g class="leg-l" style="transform-origin:51px 112px"><path d="M43.5 108 H59 L57 183 H46.5 Z" fill="${c.pants}" ${TB}/><path d="M45.5 180.5 H57.6 Q59.6 180.5 59.6 183 V187.6 Q59.6 191 56.4 191 H41.4 Q37.6 191 38.2 187.8 Q39.4 181.8 45.5 180.5 Z" fill="${INK}"/><path d="M41 188.4 H57" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></g>
      <g class="leg-r" style="transform-origin:69px 112px"><path d="M61 108 H76.5 L73.5 183 H63 Z" fill="${c.pants}" ${TB}/><path d="M74.5 180.5 H62.4 Q60.4 180.5 60.4 183 V187.6 Q60.4 191 63.6 191 H78.6 Q82.4 191 81.8 187.8 Q80.6 181.8 74.5 180.5 Z" fill="${INK}"/><path d="M63 188.4 H79" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></g>
      <path d="M43 105 H77 V116.5 Q60 119.5 43 116.5 Z" fill="${c.pants}" ${TB}/>`;
  }
  function avTorso(c, id) {
    const sk2 = shade(c.skin, -0.2);
    let s = `<rect x="55" y="46" width="10" height="15" fill="${c.skin}" ${TB}/><path d="M55.6 50.5 Q60 55.5 64.4 50.5 V55.5 Q60 59 55.6 55.5 Z" fill="${sk2}"/>`;
    s += `<path d="${TORSO}" fill="${c.topC}"/><path d="M71 59.4 Q80 61 80 72 L78.5 113 Q78.5 116 75.5 116 H71 Q73.6 92 71 59.4 Z" fill="${INK}" opacity=".13"/><path d="${TORSO}" fill="none" ${TB}/>`;
    if (c.top === 'stripes') s += `<clipPath id="${id}t"><path d="${TORSO}"/></clipPath><g clip-path="url(#${id}t)">${[67, 77, 87, 97, 107].map((y) => `<rect x="38" y="${y}" width="44" height="4.6" fill="#fff"/>`).join('')}</g><path d="${TORSO}" fill="none" ${TB}/>`;
    if (c.top === 'tee' || c.top === 'stripes') s += `<path d="M53.4 58.7 Q60 64.8 66.6 58.7" fill="${c.skin}" ${TF}/>`;
    if (c.top === 'hoodie') s += `<path d="M51 58.6 Q60 69 69 58.6" fill="${shade(c.topC, 0.18)}" ${TF}/><path d="M56 64.5 V76 M64 64.5 V76" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="M48 97 H72 L70.5 107 Q60 109 49.5 107 Z" fill="${shade(c.topC, 0.1)}" ${TF}/>`;
    if (c.top === 'jacket') s += `<path d="M53 58.7 L60 81 L67 58.7 Z" fill="#fff" ${TF}/><path d="M60 81 V116" stroke="${INK}" stroke-width="1.8"/><path d="M52.6 59 L56.6 70 L51.6 74.6 M67.4 59 L63.4 70 L68.4 74.6" fill="none" ${TF}/><circle cx="64" cy="92" r="1.3" fill="${INK}"/><circle cx="64" cy="102" r="1.3" fill="${INK}"/>`;
    if (c.apron) s += `<path d="M47.6 70 H72.4 L73.6 116 H46.4 Z" fill="${c.apron}" ${TF}/><path d="M49.4 70.5 L54 59.2 M70.6 70.5 L66 59.2" stroke="${INK}" stroke-width="1.7" fill="none"/><rect x="53.5" y="84" width="13" height="9" rx="2.5" fill="none" ${TF}/>`;
    if (c.pack !== 'none' && !c.apron) {
      const strap = (x1, x2) => `<path d="M${x1} 59.6 L${x2} 99" stroke="${INK}" stroke-width="7.6" stroke-linecap="round"/><path d="M${x1} 59.6 L${x2} 99" stroke="${c.packC}" stroke-width="3.8" stroke-linecap="round"/>`;
      s += strap(48.6, 47.6) + strap(71.4, 72.4);
    }
    const bx = 60, by = 86;
    if (c.badge === 'star') s += `<circle cx="${bx}" cy="${by}" r="5.2" fill="${LIME}" ${TF}/><polygon points="${starPts(bx, by, 3.6)}" fill="${INK}"/>`;
    if (c.badge === 'heart') s += `<circle cx="${bx}" cy="${by}" r="5.2" fill="#fff" ${TF}/><path d="M60 89 C56.6 86.6 56.4 84.6 57.7 83.7 C58.7 83 59.6 83.6 60 84.4 C60.4 83.6 61.3 83 62.3 83.7 C63.6 84.6 63.4 86.6 60 89 Z" fill="${PINK}"/>`;
    if (c.badge === 'spain') s += `<circle cx="${bx}" cy="${by}" r="5.2" fill="#C60B1E"/><rect x="54.8" y="83.7" width="10.4" height="4.6" fill="#FFC400"/><circle cx="${bx}" cy="${by}" r="5.2" fill="none" ${TF}/>`;
    return s;
  }
  function avArm(c, side, wave) {
    const l = side === 'l';
    const sx = l ? 43.5 : 76.5, ex = l ? 38.2 : 81.8, wx = l ? 40 : 80, sy = 63, ey = 87, wy = 107;
    const long = c.top === 'hoodie' || c.top === 'jacket';
    return `<g class="arm-${side}${wave ? ' waving' : ''}" style="transform-origin:${sx}px ${sy}px">
        <g class="fore" style="transform-origin:${ex}px ${ey}px">
          <path d="M${ex} ${ey} L${wx} ${wy}" stroke="${INK}" stroke-width="10.6" stroke-linecap="round"/>
          <path d="M${ex} ${ey} L${wx} ${wy}" stroke="${long ? c.topC : c.skin}" stroke-width="6.2" stroke-linecap="round"/>
          <ellipse cx="${wx}" cy="${wy + 4.4}" rx="4.4" ry="4.9" fill="${c.skin}" ${TF}/>
        </g>
        <path d="M${sx} ${sy} L${ex} ${ey}" stroke="${INK}" stroke-width="11.8" stroke-linecap="round"/>
        <path d="M${sx} ${sy} L${ex} ${ey}" stroke="${c.topC}" stroke-width="7.4" stroke-linecap="round"/>
      </g>`;
  }
  function avFace(c) {
    const br = c.hairC, lash = c.fem ? `<path d="M49.3 33.4 L47.2 31.7 M70.7 33.4 L72.8 31.7" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` : '';
    const lips = c.fem ? '#B8324F' : '#7A2330';
    const delay = (uid % 7) * 0.7;
    return `<g class="f-n">
        <g class="av-eyes" style="transform-origin:60px 35px;animation-delay:-${delay}s">
          <ellipse cx="53" cy="35" rx="3.9" ry="4.5" fill="#fff" ${TF}/><ellipse cx="67" cy="35" rx="3.9" ry="4.5" fill="#fff" ${TF}/>
          <circle cx="53.6" cy="35.6" r="2.45" fill="${INK}"/><circle cx="67.6" cy="35.6" r="2.45" fill="${INK}"/>
          <circle cx="54.4" cy="34.6" r=".85" fill="#fff"/><circle cx="68.4" cy="34.6" r=".85" fill="#fff"/>
        </g>${lash}
        <path d="M48.6 29.8 Q52.6 27.4 57 28.9 M63 28.9 Q67.4 27.4 71.4 29.8" fill="none" stroke="${br}" stroke-width="2.3" stroke-linecap="round"/>
        <g class="mouth" style="transform-origin:60px 46.4px"><path d="M54.8 45.2 Q60 51.8 65.2 45.2 Q60 46.6 54.8 45.2 Z" fill="${lips}" ${TF}/><path d="M56 45.8 Q60 46.9 64 45.8 L63.4 47 Q60 47.8 56.6 47 Z" fill="#fff"/></g>
      </g>
      <g class="f-j">
        <path d="M49 36.4 Q53 31 57 36.4 M63 36.4 Q67 31 71 36.4" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round"/>${lash}
        <path d="M48.6 27.4 Q52.6 24.8 57 26.4 M63 26.4 Q67.4 24.8 71.4 27.4" fill="none" stroke="${br}" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M53.4 44.4 Q60 55.6 66.6 44.4 Z" fill="${lips}" ${TF}/><path d="M54.6 45 H65.4 L64.6 46.9 H55.4 Z" fill="#fff"/><path d="M56.8 49.3 Q60 47.6 63.2 49.3 Q60 50.9 56.8 49.3 Z" fill="#FF8FA3"/>
      </g>
      <g class="f-h">
        <ellipse cx="53" cy="35" rx="3.9" ry="4.5" fill="#fff" ${TF}/><ellipse cx="67" cy="35" rx="3.9" ry="4.5" fill="#fff" ${TF}/>
        <circle cx="52" cy="33.6" r="2.45" fill="${INK}"/><circle cx="66" cy="33.6" r="2.45" fill="${INK}"/>${lash}
        <path d="M48.6 27.2 Q52.6 24.6 57 27 M63 29.8 Q67.4 29.2 71.4 30.4" fill="none" stroke="${br}" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M55.4 47.6 Q57.8 46 60.2 47.2 Q62.6 48.4 64.6 46.6" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      </g>`;
  }
  function avHead(c) {
    const hc = c.hairC, hat = c.cap !== 'none', sk2 = shade(c.skin, -0.2);
    let s = `<g class="av-head" style="transform-origin:60px 56px">`;
    s += `<ellipse cx="44.6" cy="36" rx="3.6" ry="4.8" fill="${c.skin}" ${TF}/><ellipse cx="75.4" cy="36" rx="3.6" ry="4.8" fill="${c.skin}" ${TF}/>`;
    if (c.fem) s += `<circle cx="44.3" cy="42.8" r="1.9" fill="#F5C542" stroke="${INK}" stroke-width="1.1"/><circle cx="75.7" cy="42.8" r="1.9" fill="#F5C542" stroke="${INK}" stroke-width="1.1"/>`;
    s += `<path class="head" d="${FACE}" fill="${c.skin}" ${TB}/>`;
    if (c.beard) s += `<path d="M44.4 36 C44.6 48.6 51 55.6 60 55.6 C69 55.6 75.4 48.6 75.6 36 C73.4 43 69.4 45.6 65.2 45 Q60 43.2 54.8 45 C50.6 45.6 46.6 43 44.4 36 Z" fill="${hc}" ${TF}/>`;
    s += `<ellipse cx="48.4" cy="42.8" rx="3.3" ry="2" fill="${PINK}" opacity=".5"/><ellipse cx="71.6" cy="42.8" rx="3.3" ry="2" fill="${PINK}" opacity=".5"/>`;
    s += `<path d="M60.6 37.4 Q58.2 41.6 61.2 42.2" fill="none" stroke="${sk2}" stroke-width="1.8" stroke-linecap="round"/>`;
    s += avFace(c);
    if (c.tache) s += `<path d="M53.6 44 Q56.8 41.4 60 43.2 Q63.2 41.4 66.4 44 Q63.4 46.4 60 45 Q56.6 46.4 53.6 44 Z" fill="${hc}" ${TF}/>`;
    const locks = `<path d="M45.2 24 C40 33 41.6 50 40.4 62.4 Q44.6 66.6 49.2 62.4 C47.4 52 46.6 41 47.8 29 Z" fill="${hc}" ${TB}/><path d="M74.8 24 C80 33 78.4 50 79.6 62.4 Q75.4 66.6 70.8 62.4 C72.6 52 73.4 41 72.2 29 Z" fill="${hc}" ${TB}/>`;
    const shine = `<path d="M52 14.8 Q58 12.6 65 13.8" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>`;
    if (!hat) {
      if (c.hair === 'short') s += `<path d="M43.2 34 C41 18 50.5 9.6 61 10 C72 10.4 79.4 18 77 33.4 C75.4 26.2 72.2 22.4 67.2 21.4 C62 24.6 53 24.8 47.2 22.8 C45.2 26 44.2 29.4 43.2 34 Z" fill="${hc}" ${TB}/>${shine}`;
      if (c.hair === 'buzz') s += `<path d="M44.4 31 C44 17.6 51 11.6 60 11.6 C69 11.6 76 17.6 75.6 31 C72.6 24.4 67 21.6 60 21.6 C53 21.6 47.4 24.4 44.4 31 Z" fill="${hc}" ${TF}/>`;
      if (c.hair === 'curly') s += `<path d="M42.6 34 C37.6 29 40 20.4 46 19.4 C46.4 12.4 54 8.6 59.4 11.8 C64.6 8 72.6 10.4 73.8 16.6 C79.8 18 82.4 26 78 32.6 C75.6 26.6 70.6 24.4 65.6 25.4 C60.6 22.4 54 23.4 50.2 26.4 C46.8 26.6 44.2 29 42.6 34 Z" fill="${hc}" ${TB}/>`;
      if (c.hair === 'bun') s += `<path d="M43.2 34 C41.4 17.6 50 10.2 60 10.2 C70 10.2 78.6 17.6 76.8 34 C75 25.4 70.4 20.4 63.4 19.6 Q60 22.4 56.6 19.6 C49.6 20.4 45 25.4 43.2 34 Z" fill="${hc}" ${TB}/>${shine}`;
      if (c.hair === 'long') s += `${locks}<path d="M43 34 C41 16.4 51 9.6 61 10 C71 10.4 79 17 77 34 C74.4 24.6 68.4 19.8 60.4 19.2 C55 22.2 49 26.4 43 34 Z" fill="${hc}" ${TB}/>${shine}`;
    } else if (c.hair === 'long') s += locks;
    if (c.cap === 'cap') s += `<path d="M43.6 24 C43.6 11 51 4.6 60 4.6 C69 4.6 76.4 11 76.4 24 Z" fill="${c.capC}" ${TB}/><path d="M60 5.2 V23" stroke="${INK}" stroke-width="1.4" opacity=".3"/><path d="M41.6 20.6 Q60 25.4 78.4 20.6 Q81.2 23 78.4 25.4 Q60 30 41.6 25.4 Q38.8 23 41.6 20.6 Z" fill="${shade(c.capC)}" ${TB}/><circle cx="60" cy="5" r="2.2" fill="${c.capC}" ${TF}/>`;
    if (c.cap === 'beanie') s += `<path d="M44 25 C43.6 11 51 5.4 60 5.4 C69 5.4 76.4 11 76 25 Z" fill="${c.capC}" ${TB}/><rect x="42" y="19.4" width="36" height="7.4" rx="3.7" fill="${shade(c.capC)}" ${TB}/><circle cx="60" cy="4.6" r="4.2" fill="#fff" ${TF}/>`;
    if (c.cap === 'sunhat') s += `<ellipse cx="60" cy="21.5" rx="29" ry="5.6" fill="${c.capC}" ${TB}/><path d="M47.4 22 C47.4 9 53 4.4 60 4.4 C67 4.4 72.6 9 72.6 22 Z" fill="${c.capC}" ${TB}/><rect x="47.8" y="16.2" width="24.4" height="4.4" fill="${PINK}"/>`;
    if (c.eyes === 'glasses') s += `<g fill="none" stroke="${INK}" stroke-width="1.9"><rect x="47.4" y="30.4" width="11.2" height="9.6" rx="4"/><rect x="61.4" y="30.4" width="11.2" height="9.6" rx="4"/><path d="M58.6 34 Q60 33 61.4 34"/></g><path d="M49.6 32.6 l2 -1 M63.6 32.6 l2 -1" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`;
    if (c.eyes === 'shades') s += `<rect x="46.6" y="30.6" width="12.4" height="9.2" rx="4" fill="${INK}"/><rect x="61" y="30.6" width="12.4" height="9.2" rx="4" fill="${INK}"/><path d="M59 34 H61" stroke="${INK}" stroke-width="1.9"/><path d="M49.2 33.2 h4 M63.6 33.2 h4" stroke="${LIME}" stroke-width="1.6" stroke-linecap="round"/>`;
    if (c.eyes === 'goggles') s += `<rect x="43" y="19.6" width="34" height="3.6" rx="1.8" fill="${INK}"/><circle cx="52.4" cy="21.4" r="5" fill="#A8E6FF" ${TF}/><circle cx="67.6" cy="21.4" r="5" fill="#A8E6FF" ${TF}/><path d="M50.4 19.8 l2 -1.4 M65.6 19.8 l2 -1.4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`;
    return s + '</g>';
  }
  function figure(c, id, o = {}) {
    return `<g class="av-fig" style="transform-origin:60px 191px">${avBack(c)}${o.legs === false ? '' : avLegs(c)}${avTorso(c, id)}${avArm(c, 'l', false)}${avArm(c, 'r', o.wave)}${avHead(c)}</g>`;
  }
  function starPts(cx, cy, r) {
    const p = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      p.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
    }
    return p.join(' ');
  }

  /* Backdrops: muted illustrations behind the traveller (box w x h). */
  const BG_SPOTS = [[0.13, 0.4, 1], [0.87, 0.34, 0.85], [0.24, 0.13, 0.7], [0.78, 0.11, 0.6], [0.1, 0.75, 0.75], [0.9, 0.72, 0.95]];
  function bgArt(kind, id, w = 120, h = 120) {
    if (!kind || kind[0] === '#') return `<rect width="${w}" height="${h}" fill="${kind || '#F4FCDD'}"/>`;
    const k = w / 120;
    const at = (fn) => BG_SPOTS.map(([x, y, s], i) => `<g transform="translate(${(x * w).toFixed(1)} ${(y * h).toFixed(1)}) scale(${(s * k).toFixed(2)}) rotate(${(i % 2 ? 18 : -14) * (i % 3 ? 1 : -1)})">${fn(i)}</g>`).join('');
    if (kind === 'lime') return `<rect width="${w}" height="${h}" fill="#F4FCDD"/>${at((i) => i % 3 === 2
      ? `<circle r="7" fill="#EAF6C2" stroke="#D2E78F" stroke-width="1.4"/><path d="M0 -7 V7 M-7 0 H7 M-5 -5 L5 5 M5 -5 L-5 5" stroke="#D2E78F" stroke-width="1"/>`
      : `<ellipse rx="10" ry="7.4" fill="#EAF6C2" stroke="#D2E78F" stroke-width="1.4"/><path d="M-10 0 h-2.6 M10 0 h2.6" stroke="#D2E78F" stroke-width="2.4" stroke-linecap="round"/><path d="M-1 -7 Q4 -13 10 -10 Q5 -5 -1 -7 Z" fill="#DCEDA2" stroke="#D2E78F" stroke-width="1"/>`)}`;
    if (kind === 'sky') return `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0FF"/><stop offset="1" stop-color="#F2F6FF"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id}s)"/>${at((i) => i === 3
      ? `<path d="M-6 0 Q-3 -3 0 0 Q3 -3 6 0" fill="none" stroke="#9FB5E8" stroke-width="1.4" stroke-linecap="round"/>`
      : `<path d="M-15 5 Q-15 -3 -7 -3 Q-5 -10 3 -8.5 Q10 -11 12.5 -3 Q19 -3 19 5 Z" fill="#fff" stroke="#BCD0F5" stroke-width="1.4" stroke-linejoin="round" transform="rotate(${i % 2 ? -18 : 14})"/>`)}`;
    if (kind === 'pink') return `<rect width="${w}" height="${h}" fill="#FFEDF6"/>${at((i) => i % 2
      ? `<path d="M0 6 C-8 0 -8.6 -5 -5.4 -7 C-3 -8.4 -0.8 -7 0 -5 C0.8 -7 3 -8.4 5.4 -7 C8.6 -5 8 0 0 6 Z" fill="#FFD3E8" stroke="#FFB8DA" stroke-width="1.3"/>`
      : `${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a * Math.PI) / 180) * 4.6).toFixed(1)}" cy="${(Math.sin((a * Math.PI) / 180) * 4.6).toFixed(1)}" r="3.6" fill="#FFD3E8" stroke="#FFB8DA" stroke-width="1"/>`).join('')}<circle r="2.6" fill="#FFE9A8"/>`)}`;
    if (kind === 'sunset') {
      const cx = w / 2, cy = h * 0.52, r = w * 0.34;
      return `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD0E3"/><stop offset=".62" stop-color="#FFC796"/><stop offset="1" stop-color="#FFE3B0"/></linearGradient><clipPath id="${id}u"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
        <rect width="${w}" height="${h}" fill="url(#${id}s)"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFE7A6"/>
        <g clip-path="url(#${id}u)">${[0.62, 0.74, 0.86].map((t, i) => `<rect x="0" y="${(cy - r + 2 * r * t).toFixed(1)}" width="${w}" height="${(2 + i * 1.6) * k}" fill="#FFC796"/>`).join('')}</g>
        <path d="M0 ${h * 0.8} Q${w * 0.25} ${h * 0.7} ${w * 0.5} ${h * 0.78} T${w} ${h * 0.74} V${h} H0 Z" fill="#F7B08C" opacity=".55"/>
        ${[[0.18, 0.2], [0.8, 0.26]].map(([x, y]) => `<path d="M${x * w - 5 * k} ${y * h} q${2.5 * k} ${-3 * k} ${5 * k} 0 q${2.5 * k} ${-3 * k} ${5 * k} 0" fill="none" stroke="#E89A7A" stroke-width="${1.4 * k}" stroke-linecap="round"/>`).join('')}`;
    }
    return `<rect width="${w}" height="${h}" fill="#F4FCDD"/>`;
  }
  function bgPanel(kind) {
    const id = 'bgp' + (++uid);
    return `<svg class="bg-panel" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${bgArt(kind, id, 400, 400)}</svg>`;
  }
  function avatarBust(cfg, cls = '') {
    const c = Object.assign({}, AV_DEFAULT, cfg || {});
    const id = 'av' + (++uid);
    return `<svg class="avatar ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><clipPath id="${id}c"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#${id}c)">${bgArt(c.bg, id)}<g transform="translate(-48 -3) scale(1.8)">${figure(c, id, { legs: false })}</g></g></svg>`;
  }
  // o: true = wave once; or { wave, legs }
  function avatarFull(cfg, cls = '', o = false) {
    const c = Object.assign({}, AV_DEFAULT, cfg || {});
    const opt = typeof o === 'object' ? o : { wave: !!o };
    const id = 'av' + (++uid);
    return `<svg class="avatar-full ${cls}" viewBox="0 0 120 200" aria-hidden="true" focusable="false">${figure(c, id, opt)}</svg>`;
  }

  /* ---------- Glo moods (streak) ---------- */
  const BUBBLE = 'M60 14 C88 14 108 33 108 60 C108 87 88 105 60 105 C52 105 45 104 39 101 L17 111 L24 91 C16 82 12 71 12 60 C12 33 32 14 60 14 Z';
  function glo(mood = 'ok', cls = '') {
    if (mood === 'future') return `<svg class="ola-svg ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="${BUBBLE}" fill="#fff" stroke="#C9C9C2" stroke-width="4" stroke-dasharray="7 7" stroke-linejoin="round"/></svg>`;
    const sleep = mood === 'sleep';
    const eyes = sleep
      ? `<path d="M35 58 Q45 65 55 58 M66 58 Q76 65 86 58" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`
      : mood === 'star'
        ? `<polygon points="${starPts(45, 56, 13)}" fill="#fff" ${T3}/><polygon points="${starPts(76, 56, 13)}" fill="#fff" ${T3}/>`
        : `<ellipse cx="45" cy="55" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="76" cy="55" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="47" cy="57" r="5.5" fill="${INK}"/><circle cx="78" cy="57" r="5.5" fill="${INK}"/>`;
    const mouth = sleep ? `<path d="M54 81 H67" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`
      : mood === 'ok' ? `<path d="M51 77 Q60 86 69 77" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`
        : `<path d="M48 75 Q60 96 72 75 Z" fill="${INK}"/>`;
    const extra = sleep ? `<text x="92" y="32" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="24" fill="#9A9A92">z</text>`
      : mood === 'star' ? `<path d="M104 18 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="${PINK}" stroke="${INK}" stroke-width="2"/><path d="M14 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="${BLUE}" stroke="${INK}" stroke-width="2"/>` : '';
    return `<svg class="ola-svg ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M46 16 C46 4 60 0 68 7 C62 7 58 11 60 17" fill="${sleep ? '#C9C9C2' : BLUE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="${BUBBLE}" fill="${sleep ? '#E7E7E1' : LIME}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      ${eyes}<ellipse cx="34" cy="75" rx="7" ry="4.5" fill="${PINK}" opacity="${sleep ? 0.35 : 1}"/><ellipse cx="87" cy="75" rx="7" ry="4.5" fill="${PINK}" opacity="${sleep ? 0.35 : 1}"/>${mouth}${extra}
    </svg>`;
  }

  /* ---------- Road decorations ---------- */
  const deco = {
    grass: `<svg class="grass" viewBox="0 0 30 22" aria-hidden="true" focusable="false"><path d="M6 22 Q7 12 3 5 M13 22 Q13 9 16 2 M20 22 Q21 13 27 8" fill="none" stroke="#3B8F2E" stroke-width="3.2" stroke-linecap="round"/></svg>`,
    flower: (c) => `<svg class="flower" viewBox="0 0 24 34" aria-hidden="true" focusable="false"><path d="M12 34 V15 M12 26 Q6 23 5 18" fill="none" stroke="#3B8F2E" stroke-width="3" stroke-linecap="round"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(12 + Math.cos((a * Math.PI) / 180) * 5).toFixed(1)}" cy="${(10 + Math.sin((a * Math.PI) / 180) * 5).toFixed(1)}" r="4.2" fill="${c}" stroke="${INK}" stroke-width="1.6"/>`).join('')}<circle cx="12" cy="10" r="3.6" fill="#FFD23F" stroke="${INK}" stroke-width="1.6"/></svg>`,
    flag: (on) => `<svg class="flag" viewBox="0 0 24 40" aria-hidden="true" focusable="false"><path d="M5 40 V4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M6 5 H21 L17 11 L21 17 H6 Z" fill="${on ? LIME : '#fff'}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
    sign: (txt) => `<svg class="sign" viewBox="0 0 100 74" aria-hidden="true" focusable="false"><path d="M44 74 V30" stroke="${INK}" stroke-width="4"/><path d="M6 6 H82 L94 19 L82 32 H6 Z" fill="${BLUE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><text x="46" y="24.5" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" fill="#fff">${txt}</text></svg>`
  };

  /* ---------- Arrival splash: landing in Spain ---------- */
  function arrival(me) {
    const house = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" ${T3}/><path d="M${x - 6} ${y} L${x + w / 2} ${y - h * 0.55} L${x + w + 6} ${y} Z" fill="#E8743B" ${T3}/><rect x="${x + w * 0.35}" y="${y + h * 0.45}" width="${w * 0.3}" height="${h * 0.55}" fill="${BLUE}"/>`;
    const mill = (x, y) => `<g><path d="M${x - 26} ${y + 120} L${x - 16} ${y} H${x + 16} L${x + 26} ${y + 120} Z" fill="#fff" ${T3}/><path d="M${x - 22} ${y + 4} Q${x} ${y - 34} ${x + 22} ${y + 4} Z" fill="${INK}"/>
      <g class="a-blades" style="transform-origin:${x}px ${y - 6}px">${[0, 90, 180, 270].map((a) => `<rect x="${x - 7}" y="${y - 96}" width="14" height="90" rx="3" fill="#fff" ${T3} transform="rotate(${a} ${x} ${y - 6})"/>`).join('')}<circle cx="${x}" cy="${y - 6}" r="7" fill="${INK}"/></g></g>`;
    const tree = (x, y, r) => `<rect x="${x - 4}" y="${y}" width="8" height="${r}" fill="#6B4A2B"/><circle cx="${x}" cy="${y}" r="${r}" fill="#5E8C31" ${T3}/>`;
    const cloud = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 40 Q0 18 24 18 Q30 0 54 4 Q78 -4 86 18 Q110 16 110 40 Z" fill="#fff" ${T3}/></g>`;
    return `<svg class="arrive-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="1600" height="900" fill="${BLUE}"/>
      <g class="a-sun"><circle cx="1230" cy="290" r="120" fill="${LIME}" ${T3}/></g>
      <g class="a-cloud1">${cloud(200, 150, 1.4)}${cloud(1380, 120, 1)}</g>
      <g class="a-cloud2">${cloud(760, 210, 0.9)}</g>
      <g class="a-plane"><path d="M-400 360 Q300 160 1000 240" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="4 18" stroke-linecap="round" opacity=".7"/><g transform="translate(980 170) scale(1.9)">${P.plane}</g></g>
      <path d="M0 560 Q200 470 420 540 T860 520 T1300 540 T1600 500 V900 H0 Z" fill="#FF8DC4" ${T3}/>
      ${house(1030, 500, 60, 46)}${house(1110, 486, 70, 60)}${house(1200, 506, 54, 40)}<rect x="1088" y="410" width="22" height="80" fill="#fff" ${T3}/><path d="M1084 410 L1099 380 L1114 410 Z" fill="#E8743B" ${T3}/>
      ${mill(330, 470)}${mill(470, 500)}
      <path d="M0 640 Q300 580 640 630 T1280 610 T1600 620 V900 H0 Z" fill="#F5B83D" ${T3}/>
      <path d="M80 700 Q500 660 900 690 M120 740 Q560 700 1020 730 M700 680 Q1100 650 1560 680" fill="none" stroke="#D99A22" stroke-width="5" stroke-linecap="round"/>
      ${tree(160, 650, 26)}${tree(240, 640, 20)}${tree(1300, 640, 24)}${tree(1390, 652, 30)}${tree(1480, 640, 20)}
      <rect x="-10" y="742" width="1620" height="30" fill="${LIME}" ${T3}/>
      <rect x="-10" y="770" width="1620" height="140" fill="#2B2B2B"/>
      <path d="M0 838 H1600" stroke="${LIME}" stroke-width="8" stroke-dasharray="46 34"/>
      <g class="a-walker"><g class="a-bob">${me.replace('<svg ', '<svg x="-140" y="566" width="130" height="217" ')}</g></g>
    </svg>`;
  }

  /* ---------- Pastel map of Spain (cities = levels) ---------- */
  const SPAIN = 'M57 9.5 L117 17 L174 20.5 L201 22.8 L234 24.7 L246 36 L288 49.4 L309 43.7 L330 53 L348 59 L387 64.6 L384 79.8 L354 98.8 L325.5 110 L313.5 125 L288 152 L277.5 173 L294 199.5 L273 214.7 L258 243 L222 275.5 L156 277 L120 304 L99 285 L79.5 258 L66 258 L63 243 L78 220 L69 197.6 L78 175 L63 163 L81 140.6 L84 114 L102 91 L90 78 L72 80 L45 83.6 L21 80 L25.5 66.5 L9 41.8 L36 24 Z';
  const PORTUGAL = 'M21 80 L28.5 108 L25.5 129 L3 198 L13.5 201 L22.5 230 L18 266 L49.5 266 L66 258 L63 243 L78 220 L69 197.6 L78 175 L63 163 L81 140.6 L84 114 L102 91 L90 78 L72 80 L45 83.6 Z';
  function spain(cities, sel, me, fs = 13) {
    const route = 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172 Q205 222 108.6 251 Q140 282 180 259';
    const reach = Math.max(cities.findIndex((c) => c.state === 'now'), cities.map((c) => c.state).lastIndexOf('done'));
    const doneRoute = ['', 'M352.5 99 Q262 86 177 136', 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172', 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172 Q205 222 108.6 251', route][Math.max(0, reach)] || '';
    const marks = cities.map((c) => {
      const txt = `${c.nm} · L${c.lvl}`;
      const w = Math.round(txt.length * fs * 0.54 + 20);
      const [lx, ly, an] = c.lbl;
      const rx = an === 'start' ? lx : an === 'end' ? lx - w : lx - w / 2;
      let dot;
      if (c.state === 'done') dot = `<circle r="11" fill="${LIME}" stroke="${INK}" stroke-width="2.5"/><path d="M-4.5 0.5 L-1 4 L5 -3" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      else if (c.state === 'now') dot = `<circle class="pulse" r="12" fill="${BLUE}"/><circle r="12" fill="${BLUE}" stroke="${INK}" stroke-width="2.5"/><circle r="4" fill="#fff"/>`;
      else dot = `<circle r="9" fill="#fff" stroke="${INK}" stroke-width="2.2"/>`;
      const pinAv = c.state === 'now' && me ? me.replace('<svg ', `<svg x="${c.x - 17}" y="${c.y - 52}" width="34" height="34" `) : '';
      return `<g class="city ${c.state}${sel === c.id ? ' sel' : ''}" data-action="city" data-id="${c.id}" role="button" tabindex="0" aria-label="${c.nm}, level ${c.lvl}, ${c.state === 'done' ? 'completed' : c.state === 'now' ? 'you are here' : 'locked'}">
        <circle cx="${c.x}" cy="${c.y}" r="24" fill="transparent"/>
        <g transform="translate(${c.x} ${c.y})">${dot}</g>
        ${pinAv}
        <rect class="lbl-bg" x="${rx}" y="${ly - fs}" width="${w}" height="${fs * 2}" rx="${fs}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
        <text x="${rx + w / 2}" y="${(ly + fs * 0.36).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="${fs}" fill="${INK}">${txt}</text>
      </g>`;
    }).join('');
    return `<svg class="spain" viewBox="0 0 432 332" role="group" aria-label="Map of Spain showing your route from Barcelona to Granada">
      <g transform="translate(14 12)">
        <text x="290" y="16" font-family="Inter, sans-serif" font-size="12" fill="#8A8A82">Francia</text>
        <text x="300" y="282" font-family="Inter, sans-serif" font-style="italic" font-size="13" fill="#6474C9">Mediterráneo</text>
        <text x="-4" y="306" font-family="Inter, sans-serif" font-style="italic" font-size="13" fill="#6474C9">Atlántico</text>
        <path d="${PORTUGAL}" fill="#F7F5EF" stroke="#C9C7BE" stroke-width="1.5" stroke-dasharray="4 4" stroke-linejoin="round"/>
        <text x="22" y="176" font-family="Inter, sans-serif" font-size="12" fill="#8A8A82">Portugal</text>
        <path d="${SPAIN}" fill="#FFF4DF" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <ellipse cx="378" cy="168" rx="13" ry="7.5" transform="rotate(-18 378 168)" fill="#FFF4DF" stroke="${INK}" stroke-width="2"/>
        <ellipse cx="401" cy="155" rx="6" ry="3.5" fill="#FFF4DF" stroke="${INK}" stroke-width="2"/>
        <ellipse cx="334" cy="192" rx="5" ry="4" fill="#FFF4DF" stroke="${INK}" stroke-width="2"/>
        <path d="${route}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="2 8" stroke-linecap="round" opacity=".55"/>
        ${doneRoute ? `<path d="${doneRoute}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>` : ''}
        ${marks}
      </g>
    </svg>`;
  }

  window.ART = { scene: { cafe, mercado }, prop, icon, ola, avatarBust, avatarFull, bgPanel, glo, deco, arrival, spain, AV_DEFAULT, CAST, shade };
})();
