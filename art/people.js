/* People: one rig for the traveller, friends and the scene cast. viewBox 120 x 200, ~4.5 heads tall.
   Everything that moves is a named group; motion.css drives it. Put these classes on the <svg> or any ancestor:
     expression  x-joy | x-wow | x-think | x-soft | x-wink | x-talk
     pose        p-present | p-present-l | p-point-l | p-point-up-l | p-point-r | p-think | p-idea | p-cheer | p-hips | p-thumb | p-shrug
     state       walking (on the svg), waving (on .arm-r, one hello)
     gaze        CSS variables --gx / --gy (pupils) and --hx (head turn), set from JS
   Layers back to front: av-back, legs, torso, arm-l, arm-r, av-head. See DESIGN.md, "People". */
(function () {
  const A = window.ART, { INK, BLUE, LIME, PINK, WHITE, SKIN, SKIN2 } = A.C, { shade, starPts, nextId } = A;
  const TB = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
  const TF = `stroke="${INK}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"`;
  const AV_DEFAULT = { skin: SKIN, hair: 'short', hairC: '#1F1A17', fem: false, beard: false, tache: false, cap: 'none', capC: PINK, top: 'tee', topC: BLUE, pants: '#2E3A73', pack: 'pack', packC: PINK, badge: 'none', eyes: 'none', apron: null, bg: 'lime' };
  const FACE = 'M44 33 C44 20 51 13 60 13 C69 13 76 20 76 33 C76 46 70 54.5 60 54.5 C50 54.5 44 46 44 33 Z';
  const TORSO = 'M40 72 Q40 59.5 52 58.5 H68 Q80 59.5 80 72 L78.5 113 Q78.5 116 75.5 116 H44.5 Q41.5 116 41.5 113 Z';
  const HEAD_O = 'transform-origin:60px 56px';
  const ARM = { l: { sx: 43.5, ex: 38.2, wx: 40 }, r: { sx: 76.5, ex: 81.8, wx: 80 }, sy: 63, ey: 87, wy: 107 };
  let seq = 0;

  function avBack(c) {
    let s = '';
    if (c.pack !== 'none') s += `<path d="M53.5 58 V52 Q60 46.5 66.5 52 V58" fill="none" stroke="${INK}" stroke-width="2.4"/><rect x="27.6" y="78" width="7" height="22" rx="3.5" fill="${shade(c.packC, -0.14)}" ${TF}/><rect x="85.4" y="78" width="7" height="22" rx="3.5" fill="${shade(c.packC, -0.14)}" ${TF}/><rect x="30.5" y="57" width="59" height="52" rx="15" fill="${c.packC}" ${TB}/><rect x="30.5" y="57" width="59" height="13" rx="6.5" fill="${shade(c.packC, -0.12)}" ${TB}/>`;
    let hb = '';
    if (c.hair === 'long') hb += `<path d="M42 30 C40 14 52 8 60 8 C68 8 80 14 78 30 L79 60 Q79 64.5 74 64.5 H70 Q68.4 56 66 52 H54 Q51.6 56 50 64.5 H46 Q41 64.5 41 60 Z" fill="${c.hairC}" ${TB}/>`;
    if (c.hair === 'bun' && c.cap === 'none') hb += `<circle cx="60" cy="9.5" r="7.2" fill="${c.hairC}" ${TB}/><path d="M56.4 6.6 Q59.6 4.4 63 5.8" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/>`;
    if (hb) s += `<g class="av-head" style="${HEAD_O}"><g class="av-head-i" style="${HEAD_O}">${hb}</g></g>`;
    if (c.top === 'hoodie') s += `<path d="M45 64 Q42 50 52 48.5 H68 Q78 50 75 64 Z" fill="${shade(c.topC, 0.18)}" ${TB}/>`;
    return s;
  }
  function avLegs(c) {
    const dk = shade(c.pants, -0.22);
    const shoe = (d, sole) => `<path d="${d}" fill="#F6F6F1" ${TF}/><path d="${sole}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
    return `<ellipse class="av-ground" cx="60" cy="191.6" rx="27" ry="3.6" fill="${INK}" opacity=".13"/>
      <g class="leg-l" style="transform-origin:51px 112px"><path d="M43.5 108 H59 L57 183 H46.5 Z" fill="${c.pants}" ${TB}/><path d="M48.6 146 Q51.6 147.6 54.6 146" fill="none" stroke="${dk}" stroke-width="1.5" stroke-linecap="round"/>${shoe('M45.5 180.2 H57.6 Q59.6 180.2 59.6 183 V187.4 Q59.6 191 56.4 191 H41.4 Q37.6 191 38.2 187.8 Q39.4 181.6 45.5 180.2 Z', 'M39.4 187.6 H59.2')}</g>
      <g class="leg-r" style="transform-origin:69px 112px"><path d="M61 108 H76.5 L73.5 183 H63 Z" fill="${c.pants}" ${TB}/><path d="M71.6 110 L76.5 108 L73.5 183 H70.6 Z" fill="${INK}" opacity=".14"/><path d="M65.4 146 Q68.4 147.6 71.4 146" fill="none" stroke="${dk}" stroke-width="1.5" stroke-linecap="round"/>${shoe('M74.5 180.2 H62.4 Q60.4 180.2 60.4 183 V187.4 Q60.4 191 63.6 191 H78.6 Q82.4 191 81.8 187.8 Q80.6 181.6 74.5 180.2 Z', 'M60.8 187.6 H80.6')}</g>
      <path d="M43 105 H77 V116.5 Q60 119.5 43 116.5 Z" fill="${c.pants}" ${TB}/>`;
  }
  function avTorso(c, id) {
    const sk2 = shade(c.skin, -0.2);
    let s = `<rect x="55" y="46" width="10" height="15" fill="${c.skin}" ${TB}/><path d="M55.6 50.5 Q60 55.5 64.4 50.5 V55.5 Q60 59 55.6 55.5 Z" fill="${sk2}"/>`;
    s += `<path d="${TORSO}" fill="${c.topC}"/>`;
    if (c.top === 'stripes') s += `<clipPath id="${id}t"><path d="${TORSO}"/></clipPath><g clip-path="url(#${id}t)">${[67, 77, 87, 97, 107].map((y) => `<rect x="38" y="${y}" width="44" height="4.6" fill="#fff"/>`).join('')}</g>`;
    // One shade (right side and hem) and one soft highlight (left shoulder): the house shading rule.
    s += `<path d="M71 59.4 Q80 61 80 72 L78.5 113 Q78.5 116 75.5 116 H71 Q73.6 92 71 59.4 Z" fill="${INK}" opacity=".13"/><path d="M41.7 109 Q60 112.6 78.4 109 L78.5 113 Q78.5 116 75.5 116 H44.5 Q41.5 116 41.5 113 Z" fill="${INK}" opacity=".1"/><path d="M44.6 68 Q45.4 62.6 51 61.6" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2.2" stroke-linecap="round"/>`;
    s += `<path d="${TORSO}" fill="none" ${TB}/>`;
    if (c.top === 'tee' || c.top === 'stripes') s += `<path d="M53.4 58.7 Q60 64.8 66.6 58.7" fill="${c.skin}" ${TF}/>`;
    if (c.top === 'hoodie') s += `<path d="M51 58.6 Q60 69 69 58.6" fill="${shade(c.topC, 0.18)}" ${TF}/><path d="M56 64.5 V76 M64 64.5 V76" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="M48 97 H72 L70.5 107 Q60 109 49.5 107 Z" fill="${shade(c.topC, 0.1)}" ${TF}/>`;
    if (c.top === 'jacket') s += `<path d="M53 58.7 L60 81 L67 58.7 Z" fill="#fff" ${TF}/><path d="M60 81 V116" stroke="${INK}" stroke-width="1.8"/><path d="M52.6 59 L56.6 70 L51.6 74.6 M67.4 59 L63.4 70 L68.4 74.6" fill="none" ${TF}/><circle cx="64" cy="92" r="1.3" fill="${INK}"/><circle cx="64" cy="102" r="1.3" fill="${INK}"/>`;
    if (c.apron) s += `<path d="M47.6 70 H72.4 L73.6 116 H46.4 Z" fill="${c.apron}" ${TF}/><path d="M68.6 70 H72.4 L73.6 116 H69.8 Z" fill="${INK}" opacity=".1"/><path d="M49.4 70.5 L54 59.2 M70.6 70.5 L66 59.2" stroke="${INK}" stroke-width="1.7" fill="none"/><rect x="53.5" y="84" width="13" height="9" rx="2.5" fill="none" ${TF}/><path d="M46.6 96 H42 M73.4 96 H78" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
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
  // Two-part arm with a hand. Shoulder, elbow and wrist are separate pivots, so poses are just three angles.
  function avArm(c, side, wave) {
    const l = side === 'l', g = ARM[side], k = l ? 1 : -1, { sy, ey, wy } = ARM, { sx, ex, wx } = g;
    const long = c.top === 'hoodie' || c.top === 'jacket';
    const fist = `<ellipse cx="${wx}" cy="${wy + 3.8}" rx="4.5" ry="4.3" fill="${c.skin}" ${TF}/>`;
    const hand = `<g class="hand" style="transform-origin:${wx}px ${wy}px">
          <g class="h-open"><ellipse cx="${wx + 3.5 * k}" cy="${wy + 2.6}" rx="1.9" ry="3.1" transform="rotate(${-26 * k} ${wx + 3.5 * k} ${wy + 2.6})" fill="${c.skin}" ${TF}/><ellipse cx="${wx}" cy="${wy + 4.6}" rx="4.5" ry="5.1" fill="${c.skin}" ${TF}/><path d="M${wx - 1.4} ${wy + 7.4} v1.9 M${wx + 1.4} ${wy + 7.4} v1.9" stroke="${shade(c.skin, -0.35)}" stroke-width="1" stroke-linecap="round"/></g>
          <g class="h-point"><rect x="${wx - 1.7 - 0.5 * k}" y="${wy + 4.4}" width="3.4" height="9.4" rx="1.7" fill="${c.skin}" ${TF}/>${fist}</g>
          <g class="h-thumb"><rect x="${l ? wx - 10.6 : wx + 3}" y="${wy + 1.8}" width="7.6" height="3.5" rx="1.75" fill="${c.skin}" ${TF}/>${fist}</g>
        </g>`;
    return `<g class="arm arm-${side}${wave ? ' waving' : ''}" style="transform-origin:${sx}px ${sy}px">
        <g class="fore" style="transform-origin:${ex}px ${ey}px">
          <path d="M${ex} ${ey} L${wx} ${wy}" stroke="${INK}" stroke-width="10.6" stroke-linecap="round"/>
          <path d="M${ex} ${ey} L${wx} ${wy}" stroke="${long ? c.topC : c.skin}" stroke-width="6.2" stroke-linecap="round"/>
          ${hand}
        </g>
        <path d="M${sx} ${sy} L${ex} ${ey}" stroke="${INK}" stroke-width="11.8" stroke-linecap="round"/>
        <path d="M${sx} ${sy} L${ex} ${ey}" stroke="${c.topC}" stroke-width="7.4" stroke-linecap="round"/>
      </g>`;
  }
  function eye(cx, id, c, d) {
    const l = cx - 5, r = cx + 5;
    return `<g class="eye ${cx < 60 ? 'eye-l' : 'eye-r'}">
          <ellipse cx="${cx}" cy="35.6" rx="4.3" ry="5" fill="#fff"/>
          <g clip-path="url(#${id})">
            <g class="glance" style="animation-delay:-${d}s"><g class="pupils"><circle cx="${cx + 0.5}" cy="36.1" r="2.9" fill="#2B1A12"/><circle cx="${cx + 1.5}" cy="34.8" r="1" fill="#fff"/></g></g>
            <g class="lid lid-u"><g class="blink" style="animation-delay:-${d}s"><path d="M${l} 17 H${r} V28.6 Q${cx} 30.9 ${l} 28.6 Z" fill="${c.skin}"/><path d="M${l} 28.6 Q${cx} 30.9 ${r} 28.6" fill="none" stroke="${INK}" stroke-width="1.5"/></g></g>
            <g class="lid lid-d"><path d="M${l} 54 H${r} V42.6 Q${cx} 40.3 ${l} 42.6 Z" fill="${c.skin}"/><path d="M${l} 42.6 Q${cx} 40.3 ${r} 42.6" fill="none" stroke="${shade(c.skin, -0.34)}" stroke-width="1.2"/></g>
          </g>
          <ellipse cx="${cx}" cy="35.6" rx="4.3" ry="5" fill="none" stroke="${INK}" stroke-width="1.4"/>
          <path d="M${cx - 4.5} 33.6 Q${cx} 29 ${cx + 4.5} 33.6" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round"/>
        </g>`;
  }
  function avFace(c, id) {
    const br = c.hairC, lips = c.fem ? '#C2405A' : '#8A3232', dark = '#4A1420';
    const d = ((seq++ % 9) * 0.73).toFixed(2);
    const arc = `fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round"`;
    let s = `<ellipse cx="48.2" cy="43.4" rx="3.4" ry="2" fill="${PINK}" opacity=".5"/><ellipse cx="71.8" cy="43.4" rx="3.4" ry="2" fill="${PINK}" opacity=".5"/>`;
    s += `<path d="M60.6 37.8 Q58.2 41.8 61.2 42.4" fill="none" stroke="${shade(c.skin, -0.24)}" stroke-width="1.8" stroke-linecap="round"/>`;
    s += `<g class="eyes" style="transform-origin:60px 35.6px">${eye(53, id + 'a', c, d)}${eye(67, id + 'b', c, d)}${c.fem ? `<path class="lash" d="M48.7 33 L46.7 31.1 M71.3 33 L73.3 31.1" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>` : ''}</g>`;
    s += `<path class="e-arc e-arc-l" d="M48.8 37.6 Q53 31.6 57.2 37.6" ${arc}/><path class="e-arc e-arc-r" d="M62.8 37.6 Q67 31.6 71.2 37.6" ${arc}/>`;
    s += `<g class="brow brow-l" style="transform-origin:52.7px 27.8px"><path d="M48.4 29 Q52.6 26.4 57 28" fill="none" stroke="${br}" stroke-width="2.4" stroke-linecap="round"/></g><g class="brow brow-r" style="transform-origin:67.3px 27.8px"><path d="M63 28 Q67.4 26.4 71.6 29" fill="none" stroke="${br}" stroke-width="2.4" stroke-linecap="round"/></g>`;
    s += `<g class="mouth" style="transform-origin:60px 47px">
          <g class="mo mo-smile"><path d="M54.8 45.2 Q60 51.8 65.2 45.2 Q60 46.6 54.8 45.2 Z" fill="${lips}" ${TF}/><path d="M56 45.8 Q60 46.9 64 45.8 L63.4 47 Q60 47.8 56.6 47 Z" fill="#fff"/></g>
          <g class="mo mo-grin"><path d="M53.4 44.4 Q60 55.6 66.6 44.4 Z" fill="${dark}" ${TF}/><path d="M54.6 45 H65.4 L64.6 46.9 H55.4 Z" fill="#fff"/><path d="M56.8 49.6 Q60 47.8 63.2 49.6 Q60 51.4 56.8 49.6 Z" fill="#FF8FA3"/></g>
          <g class="mo mo-a"><path d="M55.6 45 Q60 43.9 64.4 45 Q65 51 60 51.4 Q55 51 55.6 45 Z" fill="${dark}" ${TF}/><path d="M56.8 45.5 Q60 44.8 63.2 45.5 L63 46.8 H57 Z" fill="#fff"/></g>
          <ellipse class="mo mo-o" cx="60" cy="47.6" rx="2.7" ry="3.3" fill="${dark}" ${TF}/>
          <path class="mo mo-flat" d="M55.4 47.8 Q57.8 46.2 60.2 47.4 Q62.6 48.6 64.6 46.8" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
          <path class="mo mo-soft" d="M56 46.4 Q60 49.4 64 46.4" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
        </g>`;
    if (c.tache) s += `<path d="M53.6 44 Q56.8 41.4 60 43.2 Q63.2 41.4 66.4 44 Q63.4 46.4 60 45 Q56.6 46.4 53.6 44 Z" fill="${br}" ${TF}/>`;
    if (c.eyes === 'glasses') s += `<g fill="none" stroke="${INK}" stroke-width="1.9"><rect x="47.2" y="30.6" width="11.6" height="10.2" rx="4.2"/><rect x="61.2" y="30.6" width="11.6" height="10.2" rx="4.2"/><path d="M58.8 34.6 Q60 33.6 61.2 34.6"/></g><path d="M49.6 33 l2 -1 M63.6 33 l2 -1" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`;
    if (c.eyes === 'shades') s += `<rect x="46.6" y="30.8" width="12.4" height="9.8" rx="4" fill="${INK}"/><rect x="61" y="30.8" width="12.4" height="9.8" rx="4" fill="${INK}"/><path d="M59 34.6 H61" stroke="${INK}" stroke-width="1.9"/><path d="M49.2 33.6 h4 M63.6 33.6 h4" stroke="${LIME}" stroke-width="1.6" stroke-linecap="round"/>`;
    return s;
  }
  function avHead(c, id) {
    const hc = c.hairC, hat = c.cap !== 'none', sk2 = shade(c.skin, -0.2);
    let s = `<g class="av-head" style="${HEAD_O}"><g class="av-head-i" style="${HEAD_O}">`;
    s += `<ellipse cx="44.6" cy="36" rx="3.6" ry="4.8" fill="${c.skin}" ${TF}/><ellipse cx="75.4" cy="36" rx="3.6" ry="4.8" fill="${c.skin}" ${TF}/><path d="M44 34.4 Q45.6 36 44.4 38 M76 34.4 Q74.4 36 75.6 38" fill="none" stroke="${sk2}" stroke-width="1.1" stroke-linecap="round"/>`;
    if (c.fem) s += `<circle cx="44.3" cy="42.8" r="1.9" fill="#F5C542" stroke="${INK}" stroke-width="1.1"/><circle cx="75.7" cy="42.8" r="1.9" fill="#F5C542" stroke="${INK}" stroke-width="1.1"/>`;
    s += `<path d="${FACE}" fill="${c.skin}"/><path d="M68 14.8 C73 18.4 76 25 76 33 C76 46 70 54.5 60 54.5 C67 51.4 71.6 43 71.6 33 C71.6 25.4 70.2 19.4 68 14.8 Z" fill="${sk2}" opacity=".5"/><path class="head" d="${FACE}" fill="none" ${TB}/>`;
    if (c.beard) s += `<path d="M44.4 36 C44.6 48.6 51 55.6 60 55.6 C69 55.6 75.4 48.6 75.6 36 C73.4 43 69.4 45.6 65.2 45 Q60 43.2 54.8 45 C50.6 45.6 46.6 43 44.4 36 Z" fill="${hc}" ${TF}/>`;
    s += `<g class="av-face">${avFace(c, id)}</g>`;
    const locks = `<path d="M45.2 24 C40 33 41.6 50 40.4 62.4 Q44.6 66.6 49.2 62.4 C47.4 52 46.6 41 47.8 29 Z" fill="${hc}" ${TB}/><path d="M74.8 24 C80 33 78.4 50 79.6 62.4 Q75.4 66.6 70.8 62.4 C72.6 52 73.4 41 72.2 29 Z" fill="${hc}" ${TB}/>`;
    const shine = `<path d="M52 14.8 Q58 12.6 65 13.8" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="2" stroke-linecap="round"/>`;
    if (!hat) {
      if (c.hair === 'short') s += `<path d="M43.2 34 C41 18 50.5 9.6 61 10 C72 10.4 79.4 18 77 33.4 C75.4 26.2 72.2 22.4 67.2 21.4 C62 24.6 53 24.8 47.2 22.8 C45.2 26 44.2 29.4 43.2 34 Z" fill="${hc}" ${TB}/>${shine}`;
      if (c.hair === 'buzz') s += `<path d="M44.4 31 C44 17.6 51 11.6 60 11.6 C69 11.6 76 17.6 75.6 31 C72.6 24.4 67 21.6 60 21.6 C53 21.6 47.4 24.4 44.4 31 Z" fill="${hc}" ${TF}/>`;
      if (c.hair === 'curly') s += `<path d="M42.6 34 C37.6 29 40 20.4 46 19.4 C46.4 12.4 54 8.6 59.4 11.8 C64.6 8 72.6 10.4 73.8 16.6 C79.8 18 82.4 26 78 32.6 C75.6 26.6 70.6 24.4 65.6 25.4 C60.6 22.4 54 23.4 50.2 26.4 C46.8 26.6 44.2 29 42.6 34 Z" fill="${hc}" ${TB}/><path d="M50 15.6 Q53 13 56.4 14.4 M63.6 13.4 Q66.6 12.4 69 14.6" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.8" stroke-linecap="round"/>`;
      if (c.hair === 'bun') s += `<path d="M43.2 34 C41.4 17.6 50 10.2 60 10.2 C70 10.2 78.6 17.6 76.8 34 C75 25.4 70.4 20.4 63.4 19.6 Q60 22.4 56.6 19.6 C49.6 20.4 45 25.4 43.2 34 Z" fill="${hc}" ${TB}/>${shine}`;
      if (c.hair === 'long') s += `${locks}<path d="M43 34 C41 16.4 51 9.6 61 10 C71 10.4 79 17 77 34 C74.4 24.6 68.4 19.8 60.4 19.2 C55 22.2 49 26.4 43 34 Z" fill="${hc}" ${TB}/>${shine}`;
    } else if (c.hair === 'long') s += locks;
    if (c.cap === 'cap') s += `<g transform="translate(0 -1.6)"><path d="M43.6 24 C43.6 11 51 4.6 60 4.6 C69 4.6 76.4 11 76.4 24 Z" fill="${c.capC}" ${TB}/><path d="M60 5.2 V23" stroke="${INK}" stroke-width="1.4" opacity=".3"/><path d="M48 12 Q52 7.6 57 6.6" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/><path d="M41.6 20.6 Q60 25.4 78.4 20.6 Q81.2 23 78.4 25.4 Q60 30 41.6 25.4 Q38.8 23 41.6 20.6 Z" fill="${shade(c.capC)}" ${TB}/><circle cx="60" cy="5" r="2.2" fill="${c.capC}" ${TF}/></g>`;
    if (c.cap === 'beanie') s += `<path d="M44 25 C43.6 11 51 5.4 60 5.4 C69 5.4 76.4 11 76 25 Z" fill="${c.capC}" ${TB}/><path d="M50 21 V25.6 M55 20.4 V26.4 M60 20.2 V26.6 M65 20.4 V26.4 M70 21 V25.6" stroke="${INK}" stroke-width="1.1" opacity=".35"/><rect x="42" y="19.4" width="36" height="7.4" rx="3.7" fill="${shade(c.capC)}" ${TB}/><circle cx="60" cy="4.6" r="4.2" fill="#fff" ${TF}/>`;
    if (c.cap === 'sunhat') s += `<ellipse cx="60" cy="21.5" rx="29" ry="5.6" fill="${c.capC}" ${TB}/><path d="M47.4 22 C47.4 9 53 4.4 60 4.4 C67 4.4 72.6 9 72.6 22 Z" fill="${c.capC}" ${TB}/><rect x="47.8" y="16.2" width="24.4" height="4.4" fill="${PINK}"/>`;
    if (c.eyes === 'goggles') s += `<rect x="43" y="19.6" width="34" height="3.6" rx="1.8" fill="${INK}"/><circle cx="52.4" cy="21.4" r="5" fill="#A8E6FF" ${TF}/><circle cx="67.6" cy="21.4" r="5" fill="#A8E6FF" ${TF}/><path d="M50.4 19.8 l2 -1.4 M65.6 19.8 l2 -1.4" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`;
    return s + '</g></g>';
  }
  function figure(c, id, o = {}) {
    return `<defs><clipPath id="${id}a"><ellipse cx="53" cy="35.6" rx="3.7" ry="4.4"/></clipPath><clipPath id="${id}b"><ellipse cx="67" cy="35.6" rx="3.7" ry="4.4"/></clipPath></defs>
      <g class="av-fig" style="transform-origin:60px 191px"><g class="av-breath">${avBack(c)}</g>${o.legs === false ? '' : avLegs(c)}<g class="av-breath">${avTorso(c, id)}${avArm(c, 'l', false)}${avArm(c, 'r', o.wave)}${avHead(c, id)}</g></g>`;
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
    const id = nextId('bgp');
    return `<svg class="bg-panel" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${bgArt(kind, id, 400, 400)}</svg>`;
  }

  function avatarBust(cfg, cls = '') {
    const c = Object.assign({}, AV_DEFAULT, cfg || {});
    const id = nextId('av');
    return `<svg class="avatar ${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><clipPath id="${id}c"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#${id}c)">${bgArt(c.bg, id)}<g transform="translate(-48 -3) scale(1.8)">${figure(c, id, { legs: false })}</g></g></svg>`;
  }
  // o: true = wave hello once; or { wave, legs, pose, mood }
  function avatarFull(cfg, cls = '', o = false) {
    const c = Object.assign({}, AV_DEFAULT, cfg || {});
    const opt = typeof o === 'object' ? o : { wave: !!o };
    const id = nextId('av');
    const state = `${opt.pose ? ' p-' + opt.pose : ''}${opt.mood ? ' x-' + opt.mood : ''}`;
    return `<svg class="avatar-full ${cls}${state}" viewBox="0 0 120 200" aria-hidden="true" focusable="false">${figure(c, id, opt)}</svg>`;
  }

  /* Scene cast: the same rig, dressed for the job. */
  const CAST = {
    lucia: { skin: SKIN, hair: 'bun', hairC: '#1F1A17', fem: true, top: 'tee', topC: INK, apron: LIME, pack: 'none' },
    paco: { skin: SKIN2, hair: 'short', hairC: '#2A1A10', tache: true, top: 'tee', topC: LIME, apron: WHITE, pack: 'none' }
  };
  // Place a figure inside a scene SVG. s = scale; everyone in one scene shares a scale.
  const castFig = (cfg, x, y, s, legs) => avatarFull(cfg, 'scene-fig', { legs }).replace('<svg ', `<svg x="${x}" y="${y}" width="${120 * s}" height="${200 * s}" `);

  Object.assign(A, { avatarBust, avatarFull, bgPanel, AV_DEFAULT, CAST, castFig });
})();
