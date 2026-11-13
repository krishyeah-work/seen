/* Glo, the learning buddy. A little speech-bubble creature ("glossa" = tongue, language).
   One rig, driven from CSS (motion.css) by data-mood and a few state classes:
     data-mood   idle | happy | joy | talk | think | wow | soft | sleep | star
     classes     is-jump, is-wave, still (no idle breathing), data-point="l|r|up"
   Parts: g-shadow, g-all > g-tail, g-arm-l/r, g-foot-l/r, g-tuft, body, g-face > g-eyes (pupils, lids), brows, mouths.
   See DESIGN.md, "Glo". */
(function () {
  const A = window.ART, { INK, BLUE, LIME, LIME_DEEP, PINK } = A.C;
  const BODY = 'M60 22 C82 22 99 38 101 62 C103 88 85 106 60 106 C35 106 17 88 19 62 C21 38 38 22 60 22 Z';
  const DARK = '#2A0F14';
  const O = `stroke="${INK}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

  function eye(cx, id, tone) {
    const x0 = cx - 14, x1 = cx + 14;
    return `<g class="g-eye">
        <ellipse cx="${cx}" cy="58" rx="12" ry="14" fill="#fff"/>
        <g clip-path="url(#${id})">
          <g class="g-pupils"><circle cx="${cx + 2}" cy="60" r="6.6" fill="${INK}"/><circle cx="${cx - 0.6}" cy="57.2" r="2.3" fill="#fff"/><circle cx="${cx + 4.4}" cy="63" r="1.1" fill="#fff" opacity=".85"/></g>
          <g class="g-lid g-lid-u"><g class="g-blink"><path d="M${x0} 20 H${x1} V40 Q${cx} 45 ${x0} 40 Z" fill="${tone}"/><path d="M${x0} 40 Q${cx} 45 ${x1} 40" fill="none" stroke="${INK}" stroke-width="3.4"/></g></g>
          <g class="g-lid g-lid-d"><path d="M${x0} 96 H${x1} V76 Q${cx} 71 ${x0} 76 Z" fill="${tone}"/><path d="M${x0} 76 Q${cx} 71 ${x1} 76" fill="none" stroke="${INK}" stroke-width="3.4"/></g>
        </g>
        <ellipse cx="${cx}" cy="58" rx="12" ry="14" fill="none" stroke="${INK}" stroke-width="3.6"/>
      </g>`;
  }

  // o: { mood, cls, mark (face-only logo mark, no limbs), tone: 'rest' (grey, for rest days) }
  function glo(o = {}) {
    const id = A.nextId('gl');
    const rest = o.tone === 'rest';
    const tone = rest ? '#E7E7E1' : LIME, deep = rest ? '#D2D2CB' : LIME_DEEP, tuft = rest ? '#BDBDB6' : BLUE;
    const limbs = o.mark ? '' : `
        <g class="g-arm g-arm-l" style="transform-origin:24px 66px"><path d="M23 66 L13 82" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M23 66 L13 82" stroke="${tone}" stroke-width="7" stroke-linecap="round"/></g>
        <g class="g-arm g-arm-r" style="transform-origin:96px 66px"><path d="M97 66 L107 82" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M97 66 L107 82" stroke="${tone}" stroke-width="7" stroke-linecap="round"/></g>
        <g class="g-foot g-foot-l" style="transform-origin:46px 104px"><ellipse cx="45" cy="108" rx="10.5" ry="5.6" fill="${tuft}" ${O}/></g>
        <g class="g-foot g-foot-r" style="transform-origin:74px 104px"><ellipse cx="75" cy="108" rx="10.5" ry="5.6" fill="${tuft}" ${O}/></g>`;
    return `<svg class="glo ola-svg ${o.mark ? 'glo-mark' : 'glo-full'} ${o.cls || ''}" viewBox="0 0 120 ${o.mark ? 120 : 132}" data-mood="${o.mood || 'idle'}" aria-hidden="true" focusable="false">
      <defs><clipPath id="${id}l"><ellipse cx="46" cy="58" rx="10.4" ry="12.4"/></clipPath><clipPath id="${id}r"><ellipse cx="74" cy="58" rx="10.4" ry="12.4"/></clipPath></defs>
      ${o.mark ? '' : `<ellipse class="g-shadow" cx="60" cy="120" rx="30" ry="5" fill="${INK}" opacity=".13" style="transform-origin:60px 120px"/>`}
      <g class="g-all" style="transform-origin:60px 112px">
        <g class="g-tail" style="transform-origin:36px 94px"><path d="M29 84 L15 111 L48 99 Z" fill="${tone}" ${O}/></g>${limbs}
        <g class="g-tuft" style="transform-origin:57px 25px"><path d="M56 26 C53 12 62 7 65.5 14 C69 21 76 17 74.5 8.5" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M56 26 C53 12 62 7 65.5 14 C69 21 76 17 74.5 8.5" fill="none" stroke="${tuft}" stroke-width="5" stroke-linecap="round"/></g>
        <path d="${BODY}" fill="${tone}"/>
        <path d="M20.5 70 C24 92 40 104.5 60 104.5 C80 104.5 96 92 99.5 70 C92 87 78 96 60 96 C42 96 28 87 20.5 70 Z" fill="${deep}"/>
        <path d="M31 43 C35 34 43 28.5 52 27.5" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
        <path d="${BODY}" fill="none" ${O}/>
        <g class="g-face" style="transform-origin:60px 64px">
          <ellipse class="g-cheek" cx="29.5" cy="75" rx="7" ry="4.6" fill="${PINK}" opacity="${rest ? 0.4 : 1}"/><ellipse class="g-cheek" cx="90.5" cy="75" rx="7" ry="4.6" fill="${PINK}" opacity="${rest ? 0.4 : 1}"/>
          <g class="g-eyes" style="transform-origin:60px 58px">${eye(46, id + 'l', tone)}${eye(74, id + 'r', tone)}</g>
          <g class="g-alt g-eyes-joy" fill="none" stroke="${INK}" stroke-width="4.6" stroke-linecap="round"><path d="M36 61 Q46 48 56 61"/><path d="M64 61 Q74 48 84 61"/></g>
          <g class="g-alt g-eyes-star"><polygon points="${A.starPts(46, 58, 14)}" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/><polygon points="${A.starPts(74, 58, 14)}" fill="#fff" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/></g>
          <g class="g-brow g-brow-l" style="transform-origin:46px 38px"><path d="M37 39.5 Q45.5 34.5 54 38.5" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/></g>
          <g class="g-brow g-brow-r" style="transform-origin:74px 38px"><path d="M66 38.5 Q74.5 34.5 83 39.5" fill="none" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/></g>
          <g class="g-mouth" style="transform-origin:60px 84px">
            <path class="gm gm-smile" d="M51 80.5 Q60 90 69 80.5" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
            <g class="gm gm-open"><path d="M49 78.5 Q60 100 71 78.5 Z" fill="${DARK}" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/><path d="M54.5 90 Q60 85.5 65.5 90 Q60 95.5 54.5 90 Z" fill="${PINK}"/></g>
            <path class="gm gm-talk" d="M53 80 Q60 93 67 80 Z" fill="${DARK}" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
            <ellipse class="gm gm-o" cx="60" cy="85" rx="5" ry="6.4" fill="${DARK}" stroke="${INK}" stroke-width="3.4"/>
            <path class="gm gm-flat" d="M54 84 H66" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
            <path class="gm gm-wavy" d="M52 85 Q56 80.5 60 84 T68 82.5" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
          </g>
        </g>
      </g>
      <g class="g-fx g-z" font-family="Space Grotesk, sans-serif" font-weight="700" fill="#9A9A92"><text x="92" y="34" font-size="20">z</text><text x="104" y="20" font-size="14">z</text></g>
      <g class="g-fx g-spark"><path d="M106 22 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="${PINK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M12 34 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="${BLUE}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></g>
    </svg>`;
  }

  // Streak faces: one Glo per day. future/none = not there yet, sleep = rest day, ok / happy / star = effort.
  function gloDay(mood, cls = '') {
    if (mood === 'future' || mood === 'none') return `<svg class="glo ola-svg glo-mark glo-ghost ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="${BODY}" fill="#fff" stroke="#C9C9C2" stroke-width="4" stroke-dasharray="7 7" stroke-linejoin="round"/></svg>`;
    const map = { sleep: 'sleep', ok: 'idle', happy: 'joy', star: 'star' };
    return glo({ mark: true, mood: map[mood] || 'idle', tone: mood === 'sleep' ? 'rest' : '', cls: 'still ' + cls });
  }
  const ola = (cls = '') => glo({ mark: true, cls });

  Object.assign(A, { glo, gloDay, ola });
})();
