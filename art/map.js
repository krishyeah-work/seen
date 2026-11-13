/* Illustrated map of Spain. Cities are levels.
   What makes it read as a map: a smooth coastline floating over a sea with a faint grid, neighbours in muted tones
   with letter-spaced labels, rivers and mountain glyphs, one small landmark per city, a compass and a boat.
   viewBox 432 x 332; content is drawn in a 14,12 offset frame. The app overlays HTML pins using the same numbers.
   See DESIGN.md, "Map". */
(function () {
  const A = window.ART, { INK, BLUE, LIME, PINK, TOMATO, ORANGE, LEAF } = A.C;
  const SPAIN = [[57, 9.5], [117, 17], [174, 20.5], [201, 22.8], [234, 24.7], [246, 36], [288, 49.4], [309, 43.7], [330, 53], [348, 59], [387, 64.6], [384, 79.8], [354, 98.8], [325.5, 110], [313.5, 125], [288, 152], [277.5, 173], [294, 199.5], [273, 214.7], [258, 243], [222, 275.5], [156, 277], [120, 304], [99, 285], [79.5, 258], [66, 258], [63, 243], [78, 220], [69, 197.6], [78, 175], [63, 163], [81, 140.6], [84, 114], [102, 91], [90, 78], [72, 80], [45, 83.6], [21, 80], [25.5, 66.5], [9, 41.8], [36, 24]];
  const PORTUGAL = [[21, 80], [28.5, 108], [25.5, 129], [3, 198], [13.5, 201], [22.5, 230], [18, 266], [49.5, 266], [66, 258], [63, 243], [78, 220], [69, 197.6], [78, 175], [63, 163], [81, 140.6], [84, 114], [102, 91], [90, 78], [72, 80], [45, 83.6]];
  // Closed Catmull-Rom spline through the points: turns a polygon into a soft, hand-drawn coastline.
  function smooth(pts, k = 0.75) {
    const n = pts.length, f = (v) => v.toFixed(1);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += ` C${f(p1[0] + ((p2[0] - p0[0]) / 6) * k)} ${f(p1[1] + ((p2[1] - p0[1]) / 6) * k)} ${f(p2[0] - ((p3[0] - p1[0]) / 6) * k)} ${f(p2[1] - ((p3[1] - p1[1]) / 6) * k)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + ' Z';
  }
  const LAND = smooth(SPAIN), PT = smooth(PORTUGAL);
  const peak = (x, y, s = 1) => `<path d="M${x - 7 * s} ${y} L${x} ${y - 9 * s} L${x + 7 * s} ${y} Z" fill="#EBD8AE" stroke="#B89A5E" stroke-width="1.2" stroke-linejoin="round"/><path d="M${x - 2.7 * s} ${y - 5.5 * s} L${x} ${y - 9 * s} L${x + 2.7 * s} ${y - 5.5 * s} L${x + 1.1 * s} ${y - 6.6 * s} L${x} ${y - 5.2 * s} L${x - 1.1 * s} ${y - 6.6 * s} Z" fill="#fff"/>`;
  const wave = (x, y) => `<path d="M${x} ${y} q3 -3 6 0 t6 0" fill="none" stroke="#AEBEF2" stroke-width="1.5" stroke-linecap="round"/>`;
  const L = `stroke="${INK}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"`;
  // One small landmark per city, drawn around 0,0.
  const LANDMARK = {
    barcelona: [322, 84, `${[[-7, 8], [-2.4, 13], [2.4, 12], [7, 7]].map(([x, h]) => `<path d="M${x - 2.2} 9 V${-h + 4} Q${x} ${-h - 3} ${x + 2.2} ${-h + 4} V9 Z" fill="#F1C27D" ${L}/>`).join('')}<rect x="-10.5" y="5" width="21" height="4.5" rx="1" fill="#E0A85C" ${L}/>`],
    madrid: [146, 138, `<path d="M-4.5 -6 L0 -10.5 L4.5 -6 Z" fill="#F4F4EE" ${L}/><rect x="-10" y="-6" width="20" height="14" rx="1" fill="#F4F4EE" ${L}/>${[-7, -2.2, 2.6].map((x) => `<path d="M${x} 8 V1.4 a2.2 2.2 0 0 1 4.4 0 V8 Z" fill="${INK}"/>`).join('')}`],
    valencia: [254, 166, `<circle r="7.2" fill="${ORANGE}" ${L}/><path d="M0 -7 q2 -6 8 -6 q-1 6 -8 6" fill="${LEAF}" ${L}/><circle cx="2.4" cy="-2.4" r="1.4" fill="#FFD08A"/>`],
    sevilla: [114, 275, `<path d="M0 7 L-10.5 -3 A14.5 14.5 0 0 1 10.5 -3 Z" fill="${PINK}" ${L}/><path d="M0 7 L-5.4 -7.4 M0 7 V-9 M0 7 L5.4 -7.4" stroke="${INK}" stroke-width="1" stroke-linecap="round"/><circle cy="7" r="1.6" fill="${INK}"/>`],
    granada: [154, 264, `<path d="M-2.6 -6 l0.8 -4 l1.8 2.6 l1.8 -2.6 l0.8 4 z" fill="${TOMATO}" ${L}/><circle r="7" fill="${TOMATO}" ${L}/><path d="M-3.6 -2.4 q1.6 -2.4 4 -2.6" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.4" stroke-linecap="round"/>`]
  };

  function spain(cities, sel, me, fs = 13) {
    const route = 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172 Q205 222 108.6 251 Q140 282 180 259';
    const reach = Math.max(cities.findIndex((c) => c.state === 'now'), cities.map((c) => c.state).lastIndexOf('done'));
    const doneRoute = ['', 'M352.5 99 Q262 86 177 136', 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172', 'M352.5 99 Q262 86 177 136 Q236 126 276.6 172 Q205 222 108.6 251', route][Math.max(0, reach)] || '';
    const marks = cities.map((c, i) => {
      const txt = `${c.nm} · L${c.lvl}`;
      const w = Math.round(txt.length * fs * 0.54 + 20);
      const [lx, ly, an] = c.lbl;
      const rx = an === 'start' ? lx : an === 'end' ? lx - w : lx - w / 2;
      let dot;
      if (c.state === 'done') dot = `<circle r="11" fill="${LIME}" stroke="${INK}" stroke-width="2.5"/><path d="M-4.5 0.5 L-1 4 L5 -3" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      else if (c.state === 'now') dot = `<circle class="pulse" r="12" fill="${BLUE}"/><circle r="12" fill="${BLUE}" stroke="${INK}" stroke-width="2.5"/><circle r="4" fill="#fff"/>`;
      else dot = `<circle r="9" fill="#fff" stroke="${INK}" stroke-width="2.2"/><circle r="2.6" fill="#C9C9C2"/>`;
      const lm = LANDMARK[c.id];
      return `<g class="city ${c.state}${sel === c.id ? ' sel' : ''}" style="--i:${i}" data-action="city" data-id="${c.id}" role="button" tabindex="0" aria-label="${c.nm}, level ${c.lvl}, ${c.state === 'done' ? 'completed' : c.state === 'now' ? 'you are here' : 'locked'}">
        <circle cx="${c.x}" cy="${c.y}" r="24" fill="transparent"/>
        ${lm ? `<g class="lm" transform="translate(${lm[0]} ${lm[1]})">${lm[2]}</g>` : ''}
        <ellipse cx="${c.x}" cy="${c.y + 11}" rx="9" ry="2.6" fill="${INK}" opacity=".16"/>
        <g class="dot" transform="translate(${c.x} ${c.y})">${dot}</g>
        <rect class="lbl-bg" x="${rx}" y="${ly - fs}" width="${w}" height="${fs * 2}" rx="${fs}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
        <text x="${rx + w / 2}" y="${(ly + fs * 0.36).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="600" font-size="${fs}" fill="${INK}">${txt}</text>
      </g>`;
    }).join('');
    const cap = 'font-family="Inter, sans-serif" font-weight="600" font-size="9.5" letter-spacing="2.4" fill="#9A988E"';
    const sea = 'font-family="Inter, sans-serif" font-style="italic" font-size="12.5" letter-spacing=".6" fill="#6474C9"';
    return `<svg class="spain" viewBox="0 0 432 332" role="group" aria-label="Map of Spain showing your route from Barcelona to Granada">
      <g transform="translate(14 12)">
        <rect x="-10" y="-8" width="424" height="324" rx="16" fill="none" stroke="#C3CEF6" stroke-width="1.4" stroke-dasharray="2 6" stroke-linecap="round"/>
        <path d="M80 -8 V316 M188 -8 V316 M296 -8 V316 M-10 96 H414 M-10 204 H414" stroke="#D9E1FB" stroke-width="1"/>
        <g class="sea-waves">${[[398, 112], [404, 206], [318, 250], [246, 302], [44, 304], [4, 262], [396, 84], [286, 292]].map(([x, y]) => wave(x, y)).join('')}</g>
        <path d="M234 24.7 L246 36 L288 49.4 L309 43.7 L330 53 L348 59 L387 64.6 Q398 50 414 40 V-8 H222 Z" fill="#F4F2EA" stroke="#C9C7BE" stroke-width="1.5" stroke-dasharray="4 4" stroke-linejoin="round"/>
        <text x="306" y="16" ${cap}>FRANCIA</text>
        <path d="M92 316 Q108 308 130 311 Q160 303 200 316 Z" fill="#F4F2EA" stroke="#C9C7BE" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="${PT}" fill="#F4F2EA" stroke="#C9C7BE" stroke-width="1.5" stroke-dasharray="4 4" stroke-linejoin="round"/>
        <text x="40" y="178" ${cap} transform="rotate(-78 40 178)" text-anchor="middle">PORTUGAL</text>
        <path d="${LAND}" fill="#B9C6F4" transform="translate(3 5)"/>
        <path d="${LAND}" fill="#FFF2D8" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <g fill="none" stroke="#9DB8FF" stroke-width="1.8" stroke-linecap="round" opacity=".85"><path d="M150 42 Q200 62 240 80 T312 124"/><path d="M236 132 Q180 156 120 158 Q70 164 24 196"/><path d="M210 222 Q160 232 112 250 Q96 262 90 280"/></g>
        <text x="128" y="202" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="13" letter-spacing="9" fill="#E8D3A2">ESPAÑA</text>
        ${peak(262, 43)}${peak(284, 52, 1.15)}${peak(306, 49)}${peak(326, 57, 0.9)}${peak(120, 31, 0.9)}${peak(137, 28, 1.1)}${peak(153, 32, 0.85)}${peak(124, 121, 0.9)}${peak(138, 117)}${peak(206, 247, 0.9)}${peak(220, 251, 1.05)}
        <ellipse cx="378" cy="170" rx="13" ry="7.5" transform="rotate(-18 378 170)" fill="#B9C6F4"/><ellipse cx="378" cy="168" rx="13" ry="7.5" transform="rotate(-18 378 168)" fill="#FFF2D8" stroke="${INK}" stroke-width="2"/>
        <ellipse cx="401" cy="155" rx="6" ry="3.5" fill="#FFF2D8" stroke="${INK}" stroke-width="2"/>
        <ellipse cx="334" cy="192" rx="5" ry="4" fill="#FFF2D8" stroke="${INK}" stroke-width="2"/>
        <text x="296" y="270" ${sea}>Mediterráneo</text>
        <text x="-4" y="312" ${sea}>Atlántico</text>
        <g class="boat" style="transform-origin:352px 236px"><path d="M340 232 H364 L359 239 H345 Z" fill="${PINK}" ${L}/><path d="M352 232 V214" stroke="${INK}" stroke-width="1.4"/><path d="M353.4 215 L362 229 H353.4 Z" fill="#fff" ${L}/><path d="M350.6 218 L344 229 H350.6 Z" fill="${LIME}" ${L}/></g>
        <path d="M334 242 q4 -3 8 0 t8 0 t8 0 t8 0" fill="none" stroke="#AEBEF2" stroke-width="1.5" stroke-linecap="round"/>
        <g class="whale" style="transform-origin:44px 288px"><path d="M44 290 Q38 280 30 280 Q36 284 38 290 Z M44 290 Q50 280 58 280 Q52 284 50 290 Z" fill="${BLUE}" ${L}/><path d="M36 292 q8 -4 16 0" fill="none" stroke="#AEBEF2" stroke-width="1.5" stroke-linecap="round"/></g>
        <g class="compass" transform="translate(396 298)"><circle r="14" fill="#fff" stroke="${INK}" stroke-width="1.6"/><path d="M0 -10 L3 0 L0 10 L-3 0 Z" fill="#E4E4DE"/><path d="M0 -10 L3 0 H-3 Z" fill="${PINK}" ${L}/><path d="M-10 0 H-6 M6 0 H10" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/><text y="-17" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="9" fill="${INK}">N</text></g>
        <path class="route" d="${route}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="2 8" stroke-linecap="round" opacity=".55"/>
        ${doneRoute ? `<path class="route-done" d="${doneRoute}" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>` : ''}
        ${marks}
      </g>
    </svg>`;
  }

  A.spain = spain;
})();
