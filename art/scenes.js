/* Locations. Each scene is an 800 x 500 SVG whose content sits in <g class="cam"> so the app can move a camera over it.
   Layers, back to front: wall and floor, light, wall decor, cast, furniture, props, tap zones (.hot, always last).
   Ambient life uses the .sc-* classes animated in motion.css (slow, quiet, never near a tap target).
   See DESIGN.md, "Locations". */
(function () {
  const A = window.ART, { INK, BLUE, BLUE_DEEP, LIME, PINK, WHITE, TAN, TOMATO, ORANGE, LEAF } = A.C, { T3, P, CAST, castFig } = A;
  const hot = (shape, key, attrs, label) => `<${shape} class="hot" data-hot="${key}" ${attrs} tabindex="-1" role="button" aria-label="${label}"/>`;
  // A leafy plant in a pot. Leaves sway from the pot rim.
  const plant = (x, y, s = 1, pot = PINK) => `<g transform="translate(${x} ${y}) scale(${s})">
      <g class="sc sc-leaf" style="transform-origin:0px 0px"><path d="M0 0 C-6 -40 -34 -52 -44 -84 C-18 -76 -4 -52 0 0 Z" fill="${LEAF}"/><path d="M0 0 C2 -44 26 -64 30 -100 C4 -84 -6 -50 0 0 Z" fill="#4FA83D"/><path d="M0 0 C10 -30 40 -34 56 -58 C28 -60 8 -36 0 0 Z" fill="${LEAF}"/><path d="M0 0 C-10 -24 -40 -22 -56 -40 C-30 -48 -8 -30 0 0 Z" fill="#4FA83D"/></g>
      <path d="M-22 -2 H22 L17 40 Q16.5 44 12 44 H-12 Q-16.5 44 -17 40 Z" fill="${pot}"/><rect x="-25" y="-8" width="50" height="11" rx="4" fill="${pot}"/><rect x="-25" y="-8" width="50" height="11" rx="4" fill="${INK}" opacity=".12"/>
    </g>`;

  /* ---------- Café La Plaza ---------- */
  function cafe() {
    let stripes = '';
    for (let i = 0; i < 30; i++) stripes += `<rect x="${352 + i * 44}" y="316" width="18" height="100" fill="#FF8DC4"/>`;
    const lamp = (x, y, r, col, d) => `<g class="sc sc-sway" style="transform-origin:${x}px -700px;animation-delay:${d}s"><line x1="${x}" y1="-700" x2="${x}" y2="${y - r}" stroke="${INK}" stroke-width="3"/><path d="M${x - r * 1.5} ${y + 60} L${x - r} ${y} H${x + r} L${x + r * 1.5} ${y + 60} Z" fill="#fff" opacity=".07"/><circle cx="${x}" cy="${y + 1}" r="${r * 0.36}" fill="#FFF3B0"/><path d="M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y} Z" fill="${col}"/><path d="M${x - r * 0.62} ${y - r * 0.5} A${r * 0.8} ${r * 0.8} 0 0 1 ${x - r * 0.1} ${y - r * 0.86}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/></g>`;
    const id = A.nextId('cf');
    return `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" overflow="visible" role="img" aria-label="Café La Plaza: Lucía behind the counter, a menu board on the wall and a small table by the window">
    <defs><clipPath id="${id}w"><rect x="572" y="60" width="172" height="126" rx="10"/></clipPath></defs>
    <g class="cam">
      <rect x="-900" y="-700" width="2600" height="1100" fill="${BLUE}"/>
      <rect x="-900" y="306" width="2600" height="94" fill="#3350EE"/><rect x="-900" y="302" width="2600" height="5" fill="#fff" opacity=".18"/>
      <rect x="-900" y="400" width="2600" height="800" fill="${BLUE_DEEP}"/>
      <rect x="-900" y="400" width="2600" height="8" fill="#1A2DA8"/>
      <path d="M-900 440 H1700 M-900 482 H1700" stroke="#1A2DA8" stroke-width="2" opacity=".55"/>
      <path class="sc sc-shaft" d="M572 60 H744 L600 400 H330 Z" fill="#fff" opacity=".06"/>
      <g>
        <rect x="560" y="48" width="196" height="150" rx="18" fill="${WHITE}"/>
        <rect x="572" y="60" width="172" height="126" rx="10" fill="#FFC4E1"/>
        <g clip-path="url(#${id}w)">
          <circle class="sc sc-sun" cx="704" cy="98" r="20" fill="${LIME}" style="transform-origin:704px 98px"/>
          <g class="sc sc-cloud"><path d="M586 92 q0 -9 10 -9 q3 -8 13 -6 q9 -3 12 6 q9 0 9 9 z" fill="#fff"/><path d="M640 128 q0 -7 8 -7 q2 -6 10 -5 q7 -2 9 5 q7 0 7 7 z" fill="#fff" opacity=".85"/></g>
          <path d="M572 186 V150 H600 V132 H628 V150 H648 V124 L664 110 L680 124 V150 H706 V140 H744 V186 Z" fill="${INK}"/>
          <path d="M606 140 h6 v6 h-6z M616 140 h6 v6 h-6z M660 128 h6 v6 h-6z M714 150 h6 v6 h-6z M726 150 h6 v6 h-6z" fill="#FFE27A"/>
        </g>
        <rect x="655" y="60" width="6" height="126" fill="${WHITE}"/>
        <rect x="550" y="194" width="216" height="12" rx="5" fill="${WHITE}"/><rect x="550" y="202" width="216" height="4" rx="2" fill="${INK}" opacity=".14"/>
      </g>
      ${lamp(420, 66, 24, LIME, 0)}${lamp(520, 46, 20, PINK, -2.2)}
      <g>
        <circle cx="366" cy="98" r="24" fill="${WHITE}"/><circle cx="366" cy="98" r="24" fill="none" stroke="${INK}" stroke-width="5"/>
        <path d="M366 80 v4 M366 112 v4 M348 98 h4 M380 98 h4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <path d="M366 98 L358 90" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
        <path class="sc sc-min" d="M366 98 V82" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" style="transform-origin:366px 98px"/>
        <path class="sc sc-sec" d="M366 101 V83" stroke="${PINK}" stroke-width="2" stroke-linecap="round" style="transform-origin:366px 98px"/>
        <circle cx="366" cy="98" r="3" fill="${INK}"/>
      </g>
      <g class="menu">
        <path d="M110 48 L183 14 L256 48" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="183" cy="14" r="5" fill="${INK}"/>
        <rect x="48" y="48" width="270" height="196" rx="18" fill="${INK}"/>
        <rect x="56" y="56" width="254" height="180" rx="12" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
        <text x="74" y="94" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="28" fill="${LIME}" letter-spacing="1">MENÚ</text>
        <path d="M262 70 q-4 -6 0 -11 M274 70 q-4 -6 0 -11 M252 76 h32 v8 q0 12 -12 12 h-8 q-12 0 -12 -12 z M284 79 q9 0 8 7 q-1 6 -9 5" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <g font-family="Space Grotesk, sans-serif" font-weight="500" font-size="17.5" fill="${WHITE}">
          <g data-art="menu-cafe"><g transform="translate(66 118) scale(.27)">${P.cup.replace(/stroke="#0B0B0B"/g, 'stroke="#fff"')}</g><text x="94" y="139">Café</text><text x="306" y="139" text-anchor="end">1,50 €</text></g>
          <g data-art="menu-pan"><g transform="translate(66 156) scale(.27)">${P.pantomate.replace(/stroke="#0B0B0B"/g, 'stroke="#fff"')}</g><text x="94" y="177">Pan con tomate</text><text x="306" y="177" text-anchor="end">2,50 €</text></g>
          <g data-art="menu-agua"><g transform="translate(66 194) scale(.27)">${P.glass.replace(/stroke="#0B0B0B"/g, 'stroke="#fff"')}</g><text x="94" y="215">Agua</text><text x="306" y="215" text-anchor="end">1,00 €</text></g>
        </g>
        ${hot('rect', 'menu-cafe', 'x="62" y="114" width="244" height="36" rx="8"', 'Menu line 1')}
        ${hot('rect', 'menu-pan', 'x="62" y="152" width="244" height="36" rx="8"', 'Menu line 2')}
        ${hot('rect', 'menu-agua', 'x="62" y="190" width="244" height="36" rx="8"', 'Menu line 3')}
      </g>
      ${plant(-26, 414, 1.25, PINK)}
      <g class="lucia" data-who="lucia">${castFig(CAST.lucia, 332, 103, 2.3, false)}</g>
      ${hot('rect', 'lucia', 'x="400" y="116" width="144" height="180" rx="20"', 'Lucía')}
      <g class="counter">
        <rect x="330" y="296" width="1400" height="20" rx="4" fill="${INK}"/><rect x="338" y="299" width="1380" height="3" rx="1.5" fill="#fff" opacity=".22"/>
        <rect x="340" y="316" width="1380" height="100" fill="${PINK}"/>
        ${stripes}
        <rect x="340" y="316" width="1380" height="9" fill="${INK}" opacity=".14"/>
      </g>
      <g data-art="pastries">
        <ellipse cx="590" cy="293" rx="36" ry="5.5" fill="${WHITE}"/>
        <path d="M566 290 q4 -16 20 -13 q-10 4 -8 13 z" fill="${TAN}"/><path d="M588 290 q6 -18 24 -12 q-12 3 -10 12 z" fill="#D99A3E"/>
        <path d="M558 291 V272 Q558 246 590 246 Q622 246 622 272 V291 Z" fill="#fff" opacity=".2"/><path d="M558 291 V272 Q558 246 590 246 Q622 246 622 272 V291" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="3"/>
        <path d="M568 268 Q570 256 580 252" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/><circle cx="590" cy="242" r="5" fill="${WHITE}"/>
      </g>
      <g class="machine" data-art="machine">
        <path d="M652 214 v-12 h18 v12 M676 214 v-12 h18 v12 M664 202 v-10 h18 v10" fill="${WHITE}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <rect x="640" y="214" width="120" height="82" rx="12" fill="${WHITE}"/><rect x="744" y="236" width="16" height="60" fill="${INK}" opacity=".08"/>
        <rect x="640" y="214" width="120" height="22" rx="10" fill="${INK}"/>
        <circle class="sc sc-blink" cx="738" cy="258" r="9" fill="${LIME}"/>
        <rect x="666" y="248" width="30" height="14" rx="4" fill="${INK}"/>
        <rect x="672" y="274" width="18" height="22" rx="3" fill="${PINK}"/>
        <g class="steam"><path d="M677 268 q-5 -7 0 -14 q5 -7 0 -14" stroke="${WHITE}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M686 268 q-5 -7 0 -14 q5 -7 0 -14" stroke="${WHITE}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      </g>
      ${plant(822, 252, 0.8, LIME)}
      <g class="prop" data-prop="jug">
        <path d="M344 296 V262 Q344 254 352 252 L350 244 H372 L370 252 Q378 254 378 262 V296 Z" fill="#DDF1FF"/>
        <path d="M344 270 H378 V296 H344 Z" fill="#6CC4FF"/>
        <path d="M378 262 Q390 262 389 274 Q388 284 378 284" fill="none" stroke="#DDF1FF" stroke-width="5"/>
        <rect x="349" y="260" width="4" height="30" rx="2" fill="#fff" opacity=".85"/>
      </g>
      <g class="prop" data-prop="offer-pan">
        <ellipse cx="420" cy="294" rx="38" ry="6" fill="${WHITE}"/>
        <rect x="392" y="276" width="56" height="17" rx="8" fill="${TAN}"/>
        <path d="M396 284 Q396 279 402 279 H440 Q445 279 445 284 V288 H396 Z" fill="${TOMATO}"/>
        <circle cx="410" cy="283" r="1.8" fill="#FFD23F"/><circle cx="430" cy="284" r="1.6" fill="#FFD23F"/>
      </g>
      <ellipse cx="70" cy="462" rx="56" ry="8" fill="${INK}" opacity=".2"/><ellipse cx="176" cy="462" rx="74" ry="10" fill="${INK}" opacity=".2"/>
      <g class="chair" data-art="chair">
        <rect x="34" y="318" width="14" height="140" rx="6" fill="${PINK}"/><rect x="43" y="322" width="5" height="132" rx="2.5" fill="${INK}" opacity=".12"/>
        <rect x="34" y="384" width="78" height="14" rx="6" fill="${PINK}"/>
        <rect x="98" y="396" width="10" height="62" rx="4" fill="${PINK}"/>
      </g>
      ${hot('rect', 'chair', 'x="22" y="306" width="44" height="156" rx="12"', 'Chair')}
      <g class="table" data-art="table">
        <rect x="166" y="364" width="16" height="88" fill="${INK}"/>
        <ellipse cx="174" cy="456" rx="44" ry="9" fill="${INK}"/>
        <ellipse cx="174" cy="362" rx="104" ry="20" fill="#93C21A"/>
        <ellipse cx="174" cy="354" rx="104" ry="20" fill="${LIME}"/>
        <path d="M84 350 Q110 338 160 336" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
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
      ${hot('ellipse', 'table', 'cx="180" cy="384" rx="112" ry="74"', 'Table')}
      ${hot('ellipse', 'cup', 'cx="116" cy="330" rx="28" ry="26"', 'Item on the table 1')}
      ${hot('ellipse', 'bread', 'cx="176" cy="338" rx="32" ry="20"', 'Item on the table 2')}
      ${hot('ellipse', 'glass', 'cx="235" cy="331" rx="22" ry="26"', 'Item on the table 3')}
      ${hot('ellipse', 'receipt', 'cx="175" cy="343" rx="32" ry="22"', 'Paper on the table')}
      ${hot('ellipse', 'offer-pan', 'cx="420" cy="284" rx="42" ry="20"', 'Plate on the counter')}
      ${hot('rect', 'pastries', 'x="552" y="236" width="78" height="62" rx="12"', 'Glass dome on the counter')}
    </g>
    </svg>`;
  }

  /* ---------- El mercado ---------- */
  function mercado(opts = {}) {
    let awning = '', awnShade = '';
    for (let i = 0; i < 24; i++) {
      const x = -280 + i * 60;
      awnShade += `<circle cx="${x + 30}" cy="70" r="30" fill="${INK}" opacity=".12"/>`;
      awning += `<rect x="${x}" y="-700" width="60" height="760" fill="${i % 2 ? WHITE : LIME}"/><circle cx="${x + 30}" cy="60" r="30" fill="${i % 2 ? WHITE : LIME}"/>`;
    }
    const bottle = (x) => `<g><rect x="${x + 8}" y="128" width="12" height="10" rx="3" fill="${BLUE}"/><path d="M${x} 152 Q${x} 138 ${x + 14} 138 Q${x + 28} 138 ${x + 28} 152 V196 Q${x + 28} 200 ${x + 24} 200 H${x + 4} Q${x} 200 ${x} 196 Z" fill="#BDE5FF"/><rect x="${x}" y="164" width="28" height="14" fill="${WHITE}"/><rect x="${x + 5}" y="146" width="4" height="16" rx="2" fill="${WHITE}" opacity=".8"/></g>`;
    const carton = (x) => `<g><path d="M${x} 150 L${x + 15} 136 L${x + 30} 150 Z" fill="#FFD08A"/><rect x="${x}" y="150" width="30" height="50" rx="3" fill="${ORANGE}"/><rect x="${x + 23}" y="150" width="7" height="50" fill="${INK}" opacity=".1"/><circle cx="${x + 15}" cy="172" r="8" fill="${WHITE}"/><circle cx="${x + 15}" cy="172" r="4.5" fill="${ORANGE}"/></g>`;
    const tag = (x, y) => `<g><rect x="${x}" y="${y}" width="30" height="16" rx="4" fill="${WHITE}" stroke="${INK}" stroke-width="1.6"/><path d="M${x + 6} ${y + 6} h12 M${x + 6} ${y + 10.5} h18" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/></g>`;
    return `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" overflow="visible" role="img" aria-label="El mercado: a shelf with bottles, cartons, bread and oranges, and Paco the shopkeeper">
    <g class="cam">
      <rect x="-900" y="-700" width="2600" height="1100" fill="${PINK}"/>
      <rect x="-900" y="330" width="2600" height="70" fill="#F25CA6"/><rect x="-900" y="326" width="2600" height="5" fill="#fff" opacity=".25"/>
      <rect x="-900" y="400" width="2600" height="800" fill="${BLUE}"/><rect x="-900" y="400" width="2600" height="8" fill="${BLUE_DEEP}"/>
      <path d="M-900 444 H1700 M-900 486 H1700" stroke="${BLUE_DEEP}" stroke-width="2" opacity=".5"/>
      ${awnShade}${awning}
      <g class="sc sc-sway fast" style="transform-origin:700px 86px"><path d="M700 86 V104" stroke="${INK}" stroke-width="2.5"/>${[[694, 112, -14], [704, 122, 10], [695, 134, -8], [705, 144, 12]].map(([x, y, r]) => `<path d="M${x} ${y - 9} q-8 6 -3 16 q4 5 7 -1 q3 -8 -4 -15 z" fill="${TOMATO}" transform="rotate(${r} ${x} ${y})"/><path d="M${x} ${y - 9} v-5" stroke="${LEAF}" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>
      <g class="sc sc-sway fast" style="transform-origin:770px 86px;animation-delay:-1.4s"><path d="M770 86 V112" stroke="${INK}" stroke-width="2.5"/><path d="M752 134 A18 18 0 0 1 788 134 Z" fill="${BLUE}"/><circle cx="770" cy="136" r="6" fill="#FFF3B0"/></g>
      <rect x="56" y="406" width="560" height="12" fill="${INK}" opacity=".18"/>
      <rect x="56" y="104" width="560" height="300" rx="16" fill="${WHITE}"/>
      <rect x="56" y="118" width="14" height="280" fill="${INK}" opacity=".06"/><rect x="602" y="118" width="14" height="280" fill="${INK}" opacity=".1"/>
      <rect x="56" y="200" width="560" height="10" fill="${INK}"/><rect x="56" y="210" width="560" height="8" fill="${INK}" opacity=".08"/>
      <rect x="56" y="302" width="560" height="10" fill="${INK}"/><rect x="56" y="312" width="560" height="8" fill="${INK}" opacity=".08"/>
      <rect x="56" y="396" width="560" height="10" fill="${INK}"/>
      <g data-art="agua">${bottle(86)}${bottle(124)}${bottle(162)}</g>
      <g data-art="zumo">${carton(232)}${carton(270)}${carton(308)}</g>
      <g data-art="cafe">${[386, 426].map((x) => `<g><path d="M${x} 200 V151 L${x + 4} 141 H${x + 32} L${x + 36} 151 V200 Z" fill="#9A6234"/><path d="M${x + 28} 141 H${x + 32} L${x + 36} 151 V200 H${x + 30} Z" fill="${INK}" opacity=".14"/><path d="M${x + 4} 141 L${x + 7} 133 H${x + 29} L${x + 32} 141 Z" fill="#6E4220"/><path d="M${x + 10} 137 H${x + 26}" stroke="#F7E7CE" stroke-width="2" stroke-linecap="round"/><rect x="${x + 6}" y="158" width="24" height="28" rx="5" fill="#F7E7CE"/><ellipse cx="${x + 18}" cy="172" rx="6" ry="8.4" fill="#5A3519" transform="rotate(22 ${x + 18} 172)"/><path d="M${x + 15.5} 165.5 Q${x + 20.5} 171.5 ${x + 17} 178.5" stroke="#F7E7CE" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>`).join('')}</g>
      <g><rect x="490" y="146" width="104" height="54" rx="10" fill="${BLUE}"/><rect x="502" y="160" width="80" height="10" rx="5" fill="${WHITE}"/><rect x="502" y="178" width="52" height="8" rx="4" fill="${LIME}"/></g>
      <g data-art="pan"><path d="M82 298 C78 270 100 256 132 256 C164 256 186 270 182 298 Z" fill="${TAN}"/><path d="M110 266 L116 284 M134 262 L140 282 M158 266 L162 284" stroke="#B9822F" stroke-width="4" stroke-linecap="round"/><path d="M196 298 C192 276 210 264 236 264 C262 264 280 276 276 298 Z" fill="${TAN}"/><path d="M220 272 L225 288 M244 270 L248 288" stroke="#B9822F" stroke-width="4" stroke-linecap="round"/></g>
      <g data-art="naranja">${[[330, 282], [358, 282], [386, 282], [414, 282], [344, 258], [372, 258], [400, 258], [372, 236]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="${ORANGE}"/><circle cx="${x + 4}" cy="${y - 6}" r="3" fill="#FFD08A"/>`).join('')}</g>
      ${[474, 522].map((x) => `<g><rect x="${x}" y="252" width="36" height="46" rx="9" fill="#E4F2CF"/><rect x="${x - 2}" y="243" width="40" height="11" rx="3.5" fill="${INK}"/><circle cx="${x + 11}" cy="270" r="5.4" fill="#6B8E23"/><circle cx="${x + 24}" cy="279" r="5.4" fill="#4E6B22"/><circle cx="${x + 13}" cy="288" r="5.4" fill="#6B8E23"/><circle cx="${x + 26}" cy="264" r="5" fill="#4E6B22"/><rect x="${x + 4}" y="256" width="4" height="30" rx="2" fill="#fff" opacity=".7"/></g>`).join('')}
      <g><path d="M90 392 Q86 340 120 336 Q156 334 150 392 Z" fill="${TOMATO}"/><path d="M174 392 Q170 344 204 340 Q238 340 234 392 Z" fill="${TOMATO}"/><path d="M112 336 q6 -10 14 -6 M196 340 q6 -10 14 -6" stroke="${LEAF}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M100 356 q6 -10 16 -12 M184 360 q6 -10 16 -12" stroke="#fff" stroke-opacity=".45" stroke-width="4" fill="none" stroke-linecap="round"/></g>
      <g><rect x="300" y="344" width="172" height="48" rx="10" fill="${BLUE}"/><text x="386" y="375" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="19" fill="${WHITE}" letter-spacing="2">MERCADO</text></g>
      <g><path d="M484 392 V364 H592 V392 Z" fill="#C98F3E"/><path d="M484 376 H592" stroke="#9C6A26" stroke-width="3"/>${[[500, 356], [522, 354], [544, 356], [566, 354], [511, 345], [533, 344], [555, 345]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#FFE04A"/><circle cx="${x + 9}" cy="${y}" r="2" fill="#E8C42A"/>`).join('')}</g>
      ${tag(126, 197)}${tag(274, 197)}${tag(408, 197)}${tag(164, 299)}${tag(358, 299)}
      <g>
        <ellipse cx="136" cy="476" rx="62" ry="8" fill="${INK}" opacity=".2"/>
        <path class="sc sc-tail" d="M176 462 Q206 462 202 438 Q200 428 192 432" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round" style="transform-origin:176px 462px"/><path class="sc sc-tail" d="M176 462 Q206 462 202 438 Q200 428 192 432" fill="none" stroke="#F4F4EE" stroke-width="7" stroke-linecap="round" style="transform-origin:176px 462px"/>
        <g class="sc sc-purr" style="transform-origin:136px 476px"><ellipse cx="140" cy="456" rx="46" ry="20" fill="#F4F4EE" ${T3}/><path d="M150 438 q10 6 12 18 M166 442 q8 6 8 16" fill="none" stroke="${ORANGE}" stroke-width="6" stroke-linecap="round"/></g>
        <path d="M84 440 L86 420 L100 432 Z M108 430 L120 418 L124 438 Z" fill="#F4F4EE" ${T3}/><circle cx="104" cy="450" r="20" fill="#F4F4EE" ${T3}/>
        <path d="M92 450 q4 4 8 0 M106 450 q4 4 8 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M101 456 l2 2.4 l2 -2.4 z" fill="${PINK}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
        <g class="sc sc-zz" font-family="Space Grotesk, sans-serif" font-weight="700" fill="#fff" opacity=".9"><text x="122" y="424" font-size="16">z</text><text x="134" y="410" font-size="12">z</text></g>
      </g>
      <g class="paco" data-who="paco">${castFig(CAST.paco, 568, 143, 2.3, false)}</g>
      <g>
        <rect x="770" y="330" width="62" height="42" rx="8" fill="${BLUE}"/><rect x="778" y="312" width="38" height="22" rx="5" fill="${INK}"/><rect x="783" y="317" width="28" height="12" rx="3" fill="${LIME}"/>
        <path d="M780 346 h8 M794 346 h8 M808 346 h8 M780 358 h8 M794 358 h8 M808 358 h8" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      </g>
      <rect x="652" y="412" width="190" height="400" fill="${WHITE}"/>${[0, 1, 2, 3].map((i) => `<rect x="${668 + i * 46}" y="412" width="20" height="400" fill="${LIME}"/>`).join('')}<rect x="652" y="412" width="190" height="10" fill="${INK}" opacity=".14"/>
      <rect x="640" y="372" width="204" height="40" rx="8" fill="${INK}"/><rect x="648" y="376" width="188" height="3" rx="1.5" fill="#fff" opacity=".22"/>
      <g class="prop" data-prop="m-receipt"><path d="M684 368 L722 360 L726 374 L688 382 Z" fill="${WHITE}"/><path d="M692 368 L712 364 M693 374 L706 371" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/></g>
      ${opts.friend ? `<g class="friend-fig" data-who="${opts.friendId || 'friend'}">${castFig(opts.friend, 412, 143, 2.3, true)}</g>` : ''}
      ${hot('rect', 'cafe', 'x="380" y="126" width="90" height="80" rx="10"', 'Shelf item: bags')}
      ${hot('rect', 'm-receipt', 'x="676" y="346" width="58" height="42" rx="8"', 'Paper on the counter')}
      ${hot('rect', 'agua', 'x="78" y="120" width="120" height="86" rx="10"', 'Shelf item: bottles')}
      ${hot('rect', 'zumo', 'x="224" y="126" width="122" height="80" rx="10"', 'Shelf item: cartons')}
      ${hot('rect', 'pan', 'x="74" y="248" width="210" height="58" rx="10"', 'Shelf item: loaves')}
      ${hot('rect', 'naranja', 'x="306" y="214" width="134" height="92" rx="10"', 'Shelf item: round fruit')}
    </g>
    </svg>`;
  }


  /* ---------- La peluquería: Salón Rosa ---------- */
  // opts.fem picks the haircut photos that match the learner; opts.look draws them in the mirror.
  // The learner sits in the chair facing the mirror, so the mirror shows them (in a cape, the chair behind them)
  // and the room shows the counter under the mirror, not an empty chair.
  function salonReflection(look) {
    if (!look) return '';
    const c = Object.assign({}, look, { cap: 'none', pack: 'none', badge: 'none', cape: true });
    return `<path d="M462 300 V198 Q462 176 486 176 H554 Q578 176 578 198 V300 Z" fill="${BLUE}"/><path d="M462 198 Q462 176 486 176 H554 Q578 176 578 198 V206 H462 Z" fill="#fff" opacity=".18"/>
      ${A.avatarFull(c, 'refl', { legs: false }).replace('<svg ', '<svg x="424" y="99" width="192" height="320" ')}`;
  }
  function peluqueria(opts = {}) {
    let tiles = '';
    for (let r = 0; r < 4; r++) for (let c = -12; c < 40; c++) if ((r + c) % 2 === 0) tiles += `<rect x="${c * 46}" y="${400 + r * 46}" width="46" height="46" fill="${INK}" opacity=".9"/>`;
    let paper = '';
    for (let i = -20; i < 40; i++) paper += `<rect x="${i * 40}" y="-700" width="14" height="1050" fill="#EAF7C0"/>`;
    const id = A.nextId('pl');
    const cut = opts.fem ? ['hairShortF', 'hairLong'] : ['hairShort', 'hairLongM'];
    return `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" overflow="visible" role="img" aria-label="Salón Rosa: Carmen beside a big mirror where you can see yourself in the salon chair, with a trolley of towels, shampoo and scissors">
    <defs><clipPath id="${id}g"><path d="M444 296 V124 Q444 80 520 80 Q596 80 596 124 V296 Z"/></clipPath></defs>
    <g class="cam">
      <rect x="-900" y="-700" width="2600" height="1100" fill="#F4FCDD"/>
      ${paper}
      <rect x="-900" y="300" width="2600" height="100" fill="${PINK}"/><rect x="-900" y="296" width="2600" height="6" fill="${INK}" opacity=".8"/>
      <rect x="-900" y="400" width="2600" height="800" fill="${WHITE}"/>${tiles}
      <rect x="-900" y="400" width="2600" height="6" fill="${INK}" opacity=".25"/>
      <g>
        <rect x="40" y="36" width="250" height="62" rx="14" fill="${INK}"/>
        <text x="165" y="76" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="22" letter-spacing="2" fill="${PINK}">PELUQUERÍA</text>
        <circle class="sc sc-blink" cx="276" cy="50" r="5" fill="${LIME}"/>
      </g>

      <g class="sc sc-sway" style="transform-origin:330px -700px"><line x1="330" y1="-700" x2="330" y2="40" stroke="${INK}" stroke-width="3"/><path d="M306 60 A24 24 0 0 1 354 60 Z" fill="${BLUE}"/><circle cx="330" cy="61" r="7" fill="#FFF3B0"/></g>
      <g data-art="espejo">
        <path d="M428 300 V120 Q428 62 520 62 Q612 62 612 120 V300 Z" fill="${PINK}"/>
        <path d="M444 296 V124 Q444 80 520 80 Q596 80 596 124 V296 Z" fill="#CFE9FF"/>
        <g class="reflection" clip-path="url(#${id}g)">${salonReflection(opts.look)}</g>
        <path d="M462 140 L500 104 M566 214 L590 192" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>
        <circle cx="520" cy="70" r="6" fill="${LIME}"/>
      </g>
      <g>
        <rect x="412" y="294" width="216" height="14" rx="6" fill="${INK}"/>
        <rect x="426" y="308" width="188" height="92" fill="${WHITE}"/>
        <rect x="438" y="320" width="78" height="32" rx="7" fill="#FFE3F1"/><rect x="524" y="320" width="78" height="32" rx="7" fill="#FFE3F1"/>
        <rect x="438" y="360" width="164" height="30" rx="7" fill="#FFE3F1"/>
        <rect x="466" y="333" width="22" height="6" rx="3" fill="${INK}"/><rect x="552" y="333" width="22" height="6" rx="3" fill="${INK}"/><rect x="509" y="372" width="22" height="6" rx="3" fill="${INK}"/>
        <rect x="420" y="396" width="200" height="10" rx="3" fill="${INK}"/>
        <rect x="446" y="284" width="36" height="9" rx="3" fill="${BLUE}"/><path d="M450 293 v4 M455 293 v4 M460 293 v4 M465 293 v4 M470 293 v4 M475 293 v4" stroke="${BLUE}" stroke-width="2"/>
        <rect x="574" y="270" width="10" height="24" rx="4" fill="${LIME}"/><rect x="570" y="262" width="18" height="10" rx="4" fill="${INK}"/>
      </g>
      <g>
        <rect x="660" y="96" width="70" height="10" rx="5" fill="${INK}"/>
        <g class="sc sc-sway fast" style="transform-origin:686px 106px"><path d="M686 106 V130" stroke="${INK}" stroke-width="3"/><path d="M668 130 H708 Q716 130 716 140 V150 Q716 160 708 160 H690 L686 184 H678 L680 160 H668 Q660 160 660 150 V140 Q660 130 668 130 Z" fill="${LIME}"/><circle cx="706" cy="145" r="5" fill="${INK}"/></g>
      </g>
      <g>
        <rect x="640" y="340" width="130" height="12" rx="6" fill="${INK}"/><rect x="700" y="352" width="10" height="70" fill="${INK}"/><ellipse cx="705" cy="424" rx="34" ry="6" fill="${INK}"/>
      </g>
      <g data-art="agenda">
        <path d="M648 339 L672 331 L696 339 V322 L672 314 L648 322 Z" fill="${WHITE}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M672 314 V331" stroke="${INK}" stroke-width="2"/>
        <path d="M654 324 L666 320 M654 329 L666 325 M678 320 L690 324 M678 325 L686 328" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
        <path d="M648 339 L672 331 L696 339" fill="none" stroke="${PINK}" stroke-width="3" stroke-linejoin="round"/>
      </g>
      <g class="prop" data-prop="p-receipt"><path d="M716 334 L752 326 L756 338 L720 346 Z" fill="${WHITE}" stroke="${INK}" stroke-width="1.5"/><path d="M724 334 L742 330 M725 340 L736 338" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></g>
      ${plant(16, 404, 1.0, BLUE)}
      <g data-art="poster-corto"><rect x="636" y="192" width="64" height="84" rx="8" fill="${WHITE}"/><g transform="translate(640 196) scale(.56)">${P[cut[0]]}</g><text x="668" y="270" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="11" fill="${INK}">CORTO</text></g>
      <g data-art="poster-largo"><rect x="710" y="192" width="64" height="84" rx="8" fill="${WHITE}"/><g transform="translate(714 196) scale(.56)">${P[cut[1]]}</g><text x="742" y="270" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="11" fill="${INK}">LARGO</text></g>
      <g><rect x="648" y="20" width="112" height="64" rx="10" fill="${WHITE}"/>
        <g data-art="dye-rosa"><g transform="translate(660 26) scale(.52)">${P.dyePink}</g></g>
        <g data-art="dye-azul"><g transform="translate(708 26) scale(.52)">${P.dyeBlue}</g></g></g>
      <g class="carmen" data-who="carmen">${castFig(CAST.carmen, 222, 51, 2.3, true)}</g>
      <g>
        <rect x="56" y="236" width="150" height="10" rx="5" fill="${INK}"/><rect x="56" y="396" width="150" height="10" rx="5" fill="${INK}"/>
        <rect x="62" y="246" width="8" height="200" fill="${INK}"/><rect x="192" y="246" width="8" height="200" fill="${INK}"/>
        <circle cx="66" cy="452" r="9" fill="${INK}"/><circle cx="196" cy="452" r="9" fill="${INK}"/><circle cx="66" cy="452" r="3" fill="${WHITE}"/><circle cx="196" cy="452" r="3" fill="${WHITE}"/>
        <g data-art="tijeras" transform="translate(62 176) scale(.7)">${P.scissors}</g>
        <g data-art="champu" transform="translate(128 166) scale(.8)">${P.shampoo}</g>
        <g data-art="toalla" transform="translate(66 298) scale(1.22)">${P.towel}</g>
      </g>
      ${hot('rect', 'espejo', 'x="430" y="64" width="180" height="168" rx="20"', 'Big oval on the wall')}
      ${hot('rect', 'tijeras', 'x="72" y="180" width="62" height="58" rx="10"', 'Trolley item 1')}
      ${hot('rect', 'champu', 'x="146" y="168" width="50" height="70" rx="10"', 'Trolley item 2')}
      ${hot('rect', 'toalla', 'x="80" y="330" width="104" height="66" rx="10"', 'Trolley item 3')}
      ${hot('rect', 'p-receipt', 'x="708" y="316" width="58" height="40" rx="8"', 'Paper on the side table')}
      ${hot('rect', 'poster-corto', 'x="632" y="188" width="72" height="92" rx="10"', 'Photo of a short haircut')}
      ${hot('rect', 'poster-largo', 'x="706" y="188" width="72" height="92" rx="10"', 'Photo of a long haircut')}
      ${hot('rect', 'dye-rosa', 'x="656" y="22" width="44" height="60" rx="8"', 'Colour card 1')}
      ${hot('rect', 'dye-azul', 'x="704" y="22" width="44" height="60" rx="8"', 'Colour card 2')}
    </g>
    </svg>`;
  }

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

  A.scene = { cafe, mercado, peluqueria };
  A.salonReflection = salonReflection;
  A.arrival = arrival;
})();
