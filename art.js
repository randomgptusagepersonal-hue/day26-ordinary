/* =====================================================================
   DAY 26: THE HOME. All the drawing lives here; the words are in scenes.js.
   One long strip in world units (900 tall): bedroom 0-1000, kitchen
   1000-2000, living room 2000-3000, the street from 3000.
   ===================================================================== */
(() => {
const rect = (x, y, w, h, f, rx = 0, more = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${more}/>`;
const oval = (cx, cy, rx, ry, f, more = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${more}/>`;
const path = (d, f, more = '') => `<path d="${d}" fill="${f}" ${more}/>`;
const line = (d, c, w, more = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${more}/>`;
const at = (x, y, inner, more = '') => `<g transform="translate(${x} ${y})" ${more}>${inner}</g>`;

const C = {
  skin: '#B98059', skinD: '#A06C49', hair: '#2C2226', hairL: '#43343A',
  himTee: '#55678F', himPants: '#6E6358', herTee: '#A8C2D6', herPants: '#8E7F9C',
  bedWall: '#E9E0E6', kitWall: '#F0E6D4', livWall: '#EBDDC9', floor: '#BE9A78', floorD: '#AD8A69',
  wood: '#A87C5A', woodD: '#8F6849', woodL: '#C39B77', cream: '#FBF4E8', white: '#FFFBF3',
  lav: '#AE9DC2', lavD: '#927FAA', lavL: '#CFC3DA', rose: '#C99AA5', roseD: '#B28490', gold: '#E2B872',
  sage: '#8FA388', sageD: '#73886E', ink: '#4A3B47',
};

/* ---------- the two of them. Tiny faces, recognisable by glasses, beard and long hair ---------- */
function himHead(o = {}) {
  const asleep = o.asleep, messy = o.messy, glasses = o.glasses !== false;
  return (o.tilt ? `<g transform="rotate(${o.tilt})">` : '<g>') +
    oval(-41, 2, 7, 10, C.skinD) + oval(41, 2, 7, 10, C.skinD) +
    oval(0, 0, 40, 45, C.skin) +
    path('M-39 4C-40 56 40 56 39 4C31 19 15 15 0 17C-15 15-31 19-39 4Z', C.hair) +
    line('M-9 28Q0 35 9 28', '#E9C9B0', 3.4) +
    path(messy ? 'M-43 -2C-56-30-34-40-34-46C-26-40-22-58-8-52C-2-66 14-52 22-54C26-46 42-44 37-36C50-26 44-12 43-2C32-30-20-34-43-2Z' : 'M-42 0C-50-54 44-62 43-2C32-30-20-34-42 0Z', C.hair) +
    (asleep || !glasses
      ? line('M-23-3Q-15 3-7-3', C.hair, 3.2) + line('M7-3Q15 3 23-3', C.hair, 3.2)
      : oval(-15, -2, 3.6, 3.8, C.hair) + oval(15, -2, 3.6, 3.8, C.hair)) +
    (glasses ? `<rect x="-29" y="-13" width="25" height="21" rx="8" fill="none" stroke="${C.ink}" stroke-width="3"/><rect x="4" y="-13" width="25" height="21" rx="8" fill="none" stroke="${C.ink}" stroke-width="3"/>` + line('M-4-5H4', C.ink, 3) : '') +
    '</g>';
}
const herHairBack = (len = 92) => path(`M-46-8C-58-62 56-66 47-8C56 ${len * .3} 42 ${len * .55} 52 ${len}C30 ${len + 18} 14 ${len + 6} 0 ${len}C-14 ${len + 6}-34 ${len + 18}-54 ${len}C-44 ${len * .55}-58 ${len * .3}-46-8Z`, C.hair);
function herHead(o = {}) {
  return (o.tilt ? `<g transform="rotate(${o.tilt})">` : '<g>') +
    oval(0, 0, 37, 43, C.skin) +
    path('M-40 8C-48-54 48-56 40 8C34-14 18-30 1-32C-14-26-32-14-40 8Z', C.hair) +
    oval(-23, 16, 7, 4.5, '#C9806C', 'opacity=".45"') + oval(23, 16, 7, 4.5, '#C9806C', 'opacity=".45"') +
    (o.asleep
      ? line('M-21 4Q-14 10-7 4', C.hair, 3.2) + line('M7 4Q14 10 21 4', C.hair, 3.2)
      : oval(-14, 4, 3.6, 3.9, C.hair) + oval(14, 4, 3.6, 3.9, C.hair)) +
    line(o.flat ? 'M-6 23H6' : 'M-8 20Q0 28 8 20', '#7E4A3C', 3) +
    '</g>';
}
/* A person from the front. The origin is the hips; arms and legs are relative to it. */
function person(who, o) {
  const him = who === 'him', lean = o.lean || 0, tee = him ? C.himTee : C.herTee, pants = him ? C.himPants : C.herPants;
  const w = him ? 42 : 33, nx = lean, ny = -128, headY = -(him ? 174 : 172);
  const limb = (x1, y1, a, c, wd) => line(`M${x1} ${y1}Q${a[0]} ${a[1]} ${a[2]} ${a[3]}`, c, wd);
  const leg = (s, a) => limb(s * (w - 14), o.sit ? 26 : -4, a, pants, him ? 30 : 26) + oval(a[2], a[3] + 7, him ? 21 : 18, 10, o.barefoot === false ? '#6C5A63' : C.skinD);
  const legs = o.sit ? [[-(w - 12), 90, -(w - 10), 146], [w - 12, 90, w - 10, 146]] : o.legs;
  const lap = o.sit ? oval(-(w - 15), 14, him ? 28 : 24, him ? 25 : 21, pants) + oval(w - 15, 14, him ? 28 : 24, him ? 25 : 21, pants) : '';
  const arm = (s, a) => limb(nx + s * (w - 3), -112, a, tee, him ? 22 : 18) + oval(a[2], a[3], 10, 10, C.skin);
  return at(o.x, o.y,
    (o.s ? `<g transform="scale(${o.s})">` : '<g>') +
    (him ? '' : at(nx + (o.tilt || 0) * .5, headY, herHairBack(o.hair || 120))) +
    (legs ? leg(-1, legs[0]) + leg(1, legs[1]) : '') +
    (o.armBack ? arm(-1, o.armBack) : '') +
    path(`M${nx - w} -120C${nx - w - 6} -60 ${-w - 3} -20 ${-w + 2} 6Q0 18 ${w - 2} 6C${w + 3} -20 ${nx + w + 6} -60 ${nx + w} -120Q${nx} -142 ${nx - w} -120Z`, tee) +
    lap +
    rect(nx - 11, ny - 18, 22, 26, C.skinD, 8) +
    at(nx, headY, him ? himHead(o) : herHead(o)) +
    (o.armL ? arm(-1, o.armL) : '') + (o.armR ? arm(1, o.armR) : '') +
    (o.front || '') +
    '</g>');
}
/* His arm around her, drawn over her. And the little hearts that follow a kiss. */
const hold = (d, hx, hy) => line(d, C.himTee, 21) + oval(hx, hy, 10, 10, C.skin);
const behind = d => line(d, C.himTee, 21);
const handOn = (x, y) => oval(x, y, 11, 10, C.skin);
const heart = 'M0 6C-8-3-15 2-13 9S-4 17 0 21C4 17 11 15 13 9S8-3 0 6Z';
const hearts = (x, y) => at(x, y,
  `<g transform="translate(-20 6)"><g class="puff">${path(heart, C.rose)}</g></g>` +
  `<g transform="translate(16 -8) scale(.75)"><g class="puff b">${path(heart, C.lavD)}</g></g>` +
  `<g transform="translate(2 -30) scale(.6)"><g class="puff c">${path(heart, C.rose)}</g></g>`);
/* Side-on, walking to the right. Legs swing with CSS. */
function walker(who, x, delay, carry = '', freeArm = true) {
  const him = who === 'him', tee = him ? C.himTee : C.herTee, pants = him ? C.himPants : C.herPants;
  const legs = s => `<g class="stride${s ? ' two' : ''}" style="animation-delay:${delay}s">${line('M0 0Q2 50 0 104', pants, him ? 26 : 22)}${oval(8, 111, 19, 9, '#6C5A63')}</g>`;
  const head = him
    ? oval(0, 0, 40, 44, C.skin) + path('M6 8C4 52 40 50 39 8C30 16 18 14 6 8Z', C.hair) + path('M-42 8C-52-54 44-60 41-8C22-30-6-20-14-8C-22 0-30 6-42 8Z', C.hair) + oval(23, -3, 3.4, 3.8, C.hair) + `<rect x="9" y="-14" width="24" height="20" rx="8" fill="none" stroke="${C.ink}" stroke-width="3"/>` + line('M9-6H-22', C.ink, 2.8) + line('M16 25Q24 31 31 25', '#E9C9B0', 3)
    : path('M-48-6C-56-58 42-62 40-10C8-22-8-12-14 10C-16 48-36 96-58 112C-68 80-58 34-48-6Z', C.hair) + oval(1, 0, 36, 42, C.skin) + path('M-38 14C-46-56 44-58 38-8C10-24-8-18-12 10C-18 16-30 18-38 14Z', C.hair) + oval(19, 2, 3.4, 3.8, C.hair) + oval(11, 16, 6, 4, '#C9806C', 'opacity=".45"') + line('M14 22Q21 28 27 21', '#7E4A3C', 3);
  return `<g transform="translate(${x} 586)">` +
    `<g class="bob" style="animation-delay:${delay}s">` +
    legs(0) +
    path(`M-${him ? 36 : 29} -118C-${him ? 44 : 34} -60-${him ? 38 : 30}-16-${him ? 34 : 28} 8H${him ? 34 : 28}C${him ? 38 : 30}-16 ${him ? 44 : 34}-60 ${him ? 36 : 29}-118Q0-136-${him ? 36 : 29}-118Z`, tee) +
    legs(1) +
    rect(-10, -142, 20, 26, C.skinD, 8) + at(4, -172, head) +
    (freeArm ? line('M0-108Q8-60 6-24', tee, him ? 20 : 16) + oval(6, -18, 9, 9, C.skin) : '') + carry +
    '</g></g>';
}

const mug = (x, y, c, steam = false) => at(x, y,
  (steam ? `<g class="steam">${line('M-6-34C-12-46 0-52-6-66', '#fff', 4, 'opacity=".7"')}</g><g class="steam b">${line('M7-36C1-48 13-54 7-68', '#fff', 4, 'opacity=".6"')}</g>` : '') +
  `<path d="M18-20Q32-20 32-10T18 0" fill="none" stroke="${c}" stroke-width="5"/>` + rect(-19, -28, 38, 30, c, 7) + oval(0, -27, 18, 4, '#6B4A3C', 'opacity=".5"'));
const plant = (x, y, s = 1) => at(x, y, `<g transform="scale(${s})">` +
  path('M0 0C-30-60-60-70-66-120C-34-110-10-70 0 0Z', C.sage) + path('M0 0C-8-80 0-120 14-160C30-110 20-60 0 0Z', C.sageD) + path('M0 0C20-60 56-70 66-110C30-108 8-70 0 0Z', C.sage) +
  path('M-30 0H30L22 66Q0 74-22 66Z', C.rose) + '</g>');
const windowFrame = (x, y, w, h, sky) => rect(x - 10, y - 10, w + 20, h + 20, C.white, 6) + rect(x, y, w, h, `url(#${sky})`) +
  path(`M${x} ${y + h}V${y + h * .72}C${x + w * .25} ${y + h * .6} ${x + w * .5} ${y + h * .82} ${x + w * .72} ${y + h * .68}S${x + w} ${y + h * .7} ${x + w} ${y + h * .66}V${y + h}Z`, C.sage, 'opacity=".55"') +
  rect(x + w / 2 - 4, y, 8, h, C.white) + rect(x, y + h * .46, w, 8, C.white) + rect(x - 18, y + h + 8, w + 36, 12, C.white, 3);
const planks = (x, w) => {
  let s = rect(x, 690, w, 210, C.floor);
  for (let i = 0; i < 4; i++) s += rect(x, 738 + i * 50, w, 2.5, C.floorD);
  for (let i = 0; i < w / 170; i++) s += rect(x + 60 + i * 170 + (i % 2) * 70, 690 + (i % 4) * 50, 2.5, 48, C.floorD);
  return s;
};
const roomWall = (x, w, c) => rect(x, 0, w, 690, c) + rect(x, 660, w, 30, C.white) + rect(x, 655, w, 5, '#D8C9B4') + rect(x, 0, w, 22, '#D9CCB9') + planks(x, w);
const pillar = x => rect(x - 17, 0, 34, 690, '#CDBEA9') + rect(x - 17, 690, 34, 210, '#8F7559');

/* ---------- bedroom ---------- */
const bedroom = () => roomWall(0, 1000, C.bedWall) +
  path('M0 0H1000V690H0Z', 'url(#roomSoft)') +
  windowFrame(335, 66, 370, 245, 'skyDay') +
  rect(300, 44, 440, 8, C.woodD, 4) +
  at(90, 170, rect(0, 0, 90, 116, C.white, 3) + rect(8, 8, 74, 100, C.lavL) + path('M8 108L40 60L60 84L72 70L82 90V108Z', C.lavD, 'opacity=".55"')) +
  at(860, 200, rect(0, 0, 76, 76, C.white, 3) + rect(7, 7, 62, 62, '#E8CFCF') + oval(38, 40, 16, 16, C.rose, 'opacity=".7"')) +
  /* nightstands */
  rect(160, 575, 118, 115, C.woodL, 8) + rect(160, 575, 118, 14, C.wood, 6) + rect(204, 620, 30, 7, C.woodD, 3) +
  rect(762, 575, 118, 115, C.woodL, 8) + rect(762, 575, 118, 14, C.wood, 6) + rect(806, 620, 30, 7, C.woodD, 3) +
  /* lamp on the right stand */
  rect(811, 530, 8, 46, C.woodD) + oval(815, 577, 26, 6, C.woodD) + path('M785 532L796 478H834L845 532Z', C.gold) +
  /* the bed */
  rect(286, 356, 468, 240, C.wood, 26) + rect(304, 374, 432, 200, C.woodL, 16) +
  rect(278, 680, 18, 34, C.woodD, 4) + rect(744, 680, 18, 34, C.woodD, 4) +
  rect(274, 520, 492, 170, C.cream, 18) +
  oval(415, 512, 92, 42, C.white) + oval(415, 516, 86, 34, '#F4EBDD') +
  oval(628, 512, 92, 42, C.white) + oval(628, 516, 86, 34, '#F4EBDD') +
  oval(520, 830, 300, 56, C.lav, 'opacity=".42"') + oval(520, 830, 250, 42, C.lavL, 'opacity=".4"');

/* ---------- kitchen ---------- */
const kitchen = () => roomWall(1000, 1000, C.kitWall) +
  path('M1000 0H2000V690H1000Z', 'url(#roomSoft)') +
  windowFrame(1370, 74, 265, 225, 'skyDay') +
  /* shelf with jars */
  rect(1110, 236, 220, 10, C.wood, 3) + rect(1130, 180, 38, 56, C.lavL, 8) + rect(1130, 174, 38, 12, C.woodD, 3) + rect(1180, 196, 34, 40, '#E8D5B8', 8) + rect(1180, 190, 34, 10, C.woodD, 3) + plant(1282, 200, .36) +
  /* hanging mugs */
  rect(1672, 226, 210, 8, C.woodD, 3) + at(1710, 262, mug(0, 0, C.rose)) + at(1770, 262, mug(0, 0, C.lav)) + at(1830, 262, mug(0, 0, C.sage)) +
  /* counter */
  rect(1062, 462, 876, 206, C.woodL, 6) + rect(1050, 442, 900, 24, C.cream, 6) +
  [1080, 1236, 1392, 1548, 1704].map(x => rect(x, 486, 142, 170, '#CDA886', 8) + rect(x + 60, 504, 24, 6, C.woodD, 3)).join('') +
  /* stove and kettle */
  rect(1684, 430, 190, 14, C.ink, 4) + oval(1732, 430, 44, 7, '#2F272E') + at(1810, 430, path('M-30 0Q-36-54 0-54T30 0Z', C.lavD) + rect(-7, -64, 14, 12, C.ink, 4) + line('M30-34Q50-44 54-58', C.lavD, 9));

/* ---------- living room ---------- */
const living = () => roomWall(2000, 1000, C.livWall) +
  path('M2000 0H3000V690H2000Z', 'url(#roomSoft)') +
  windowFrame(2128, 78, 262, 280, 'skyDay') +
  path('M2098 50H2164C2160 170 2172 270 2148 392H2098Z', C.rose, 'opacity=".75"') + path('M2420 50H2354C2358 170 2346 270 2370 392H2420Z', C.rose, 'opacity=".75"') + rect(2080, 44, 360, 8, C.woodD, 4) +
  /* wall frames */
  at(2500, 170, rect(0, 0, 118, 88, C.white, 3) + rect(8, 8, 102, 72, C.lavL) + path('M8 80L44 40L70 64L88 48L110 76V80Z', C.lavD, 'opacity=".5"')) +
  at(2640, 130, rect(0, 0, 72, 96, C.white, 3) + rect(7, 7, 58, 82, '#EAD9C8') + oval(36, 48, 15, 15, C.gold, 'opacity=".7"')) +
  /* shelf */
  rect(2792, 220, 150, 470, C.wood, 6) + rect(2803, 232, 128, 446, C.woodD, 3) +
  [320, 420, 530].map(y => rect(2803, y, 128, 8, C.wood)).join('') +
  [['#C99AA5', 2809, 262, 22], ['#AE9DC2', 2833, 248, 18], ['#E2B872', 2853, 268, 20], ['#8FA388', 2875, 254, 24], ['#CFC3DA', 2809, 348, 26], ['#B28490', 2837, 360, 18], ['#E8D5B8', 2857, 342, 22], ['#927FAA', 2809, 458, 20], ['#C99AA5', 2831, 448, 24], ['#8FA388', 2857, 462, 18], ['#E2B872', 2877, 452, 22]].map(b => rect(b[1], b[2], b[3], (b[2] < 300 ? 320 : b[2] < 400 ? 420 : 530) - b[2], b[0], 2)).join('') +
  plant(2865, 678, .75) +
  /* floor lamp */
  rect(2257, 262, 7, 424, C.woodD) + oval(2260, 688, 34, 8, C.woodD) + path('M2212 268L2232 200H2288L2308 268Z', C.gold) +
  plant(2150, 624, .95) +
  /* rug */
  oval(2510, 790, 330, 64, C.rose, 'opacity=".5"') + oval(2510, 790, 280, 50, '#E0C3C4', 'opacity=".55"') +
  /* sofa */
  rect(2298, 408, 444, 170, C.lav, 34) + rect(2300, 520, 440, 118, C.lavD, 16) +
  rect(2316, 492, 202, 62, C.lav, 18) + rect(2522, 492, 202, 62, C.lav, 18) +
  rect(2270, 462, 60, 176, C.lavD, 24) + rect(2710, 462, 60, 176, C.lavD, 24) +
  rect(2316, 636, 18, 40, C.woodD, 4) + rect(2706, 636, 18, 40, C.woodD, 4) +
  rect(2316, 430, 88, 72, C.rose, 22) +
  /* coffee table */
  rect(2406, 742, 256, 16, C.wood, 6) + rect(2428, 758, 12, 66, C.woodD, 3) + rect(2628, 758, 12, 66, C.woodD, 3);

/* ---------- street ---------- */
const street = () => {
  let s = rect(3000, 0, 2500, 620, 'url(#skyEve)') +
    path('M3000 560C3200 480 3380 540 3560 492S3880 450 4100 500S4420 470 4700 510S5200 470 5500 520V640H3000Z', C.sage, 'opacity=".5"') +
    path('M3000 590C3300 540 3500 590 3800 552S4300 560 4600 540S5200 560 5500 550V640H3000Z', C.sageD, 'opacity=".5"');
  /* home's outside wall and door */
  s += rect(3000, 150, 260, 490, '#D9C4AA') + rect(3020, 420, 96, 220, C.woodD, 4) + oval(3102, 530, 5, 5, C.gold) + rect(3000, 130, 280, 22, C.woodD, 3) + rect(3160, 280, 74, 90, C.cream) + rect(3194, 280, 6, 90, C.white) + rect(3160, 322, 74, 6, C.white);
  /* a wall, trees, a lamp post */
  s += rect(3260, 520, 450, 120, '#CDB79C', 6) + rect(3260, 512, 450, 12, '#B9A388', 3);
  [[3420, 420, 1], [3880, 380, 1.25], [4620, 420, 1.1], [5100, 390, 1.2]].forEach(t => {
    s += at(t[0], t[1], `<g transform="scale(${t[2]})">` + rect(-10, 40, 20, 180, C.woodD, 5) + oval(0, 0, 90, 76, C.sageD) + oval(-40, 26, 56, 46, C.sage) + oval(44, 20, 58, 50, C.sage) + '</g>');
  });
  s += rect(3744, 300, 9, 340, C.ink, 4) + oval(3748, 292, 18, 14, '#F4DDA4');
  /* the very ordinary shop */
  s += rect(4080, 230, 460, 410, C.cream) + rect(4114, 400, 160, 240, '#EEDFC7') + rect(4300, 400, 200, 150, '#D9E4E2') + rect(4396, 400, 6, 150, C.white) + rect(4300, 472, 200, 6, C.white) +
    rect(4128, 420, 130, 220, '#E6D2B3') + path('M4060 280H4560L4590 368H4030Z', C.rose) +
    [0, 1, 2, 3, 4].map(i => path(`M${4060 + i * 100} 280H${4110 + i * 100}L${4100 + i * 112} 368H${4030 + i * 112}Z`, C.cream, 'opacity=".55"')).join('') +
    rect(4150, 236, 320, 34, C.lavD, 4) +
    rect(4310, 560, 80, 80, C.woodL, 4) + oval(4332, 556, 14, 14, C.gold) + oval(4362, 556, 14, 14, C.rose) + rect(4400, 560, 80, 80, C.woodL, 4) + oval(4424, 556, 14, 14, C.sage) + oval(4454, 556, 14, 14, C.gold);
  /* pavement */
  s += rect(3000, 640, 2500, 60, '#C4B5A2') + rect(3000, 700, 2500, 200, '#A79A8C');
  for (let x = 3040; x < 5500; x += 170) s += rect(x, 640, 3, 60, '#AD9E8B');
  for (let x = 3060; x < 5500; x += 240) s += rect(x, 790, 110, 8, '#D9CDBB', 4);
  return s;
};

const defs = `<defs>
  <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0EA"/><stop offset="1" stop-color="#F6E9D2"/></linearGradient>
  <linearGradient id="skyEve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AFC6DC"/><stop offset=".55" stop-color="#F0D6BD"/><stop offset="1" stop-color="#F3C49A"/></linearGradient>
  <radialGradient id="roomSoft" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#6A4A44" stop-opacity=".13"/></radialGradient>
  <radialGradient id="sunSoft"><stop offset="0" stop-color="#FFEBC2" stop-opacity=".62"/><stop offset=".55" stop-color="#FFE7B8" stop-opacity=".2"/><stop offset="1" stop-color="#FFE7B8" stop-opacity="0"/></radialGradient>
  <linearGradient id="patch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFEBC2" stop-opacity=".5"/><stop offset="1" stop-color="#FFEBC2" stop-opacity=".1"/></linearGradient>
  <linearGradient id="patchEve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3A266" stop-opacity=".5"/><stop offset="1" stop-color="#F3A266" stop-opacity=".08"/></linearGradient>
  <radialGradient id="moonSoft"><stop offset="0" stop-color="#C9D2F2" stop-opacity=".3"/><stop offset="1" stop-color="#C9D2F2" stop-opacity="0"/></radialGradient>
  <linearGradient id="moon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D2F2" stop-opacity=".22"/><stop offset="1" stop-color="#C9D2F2" stop-opacity=".04"/></linearGradient>
  <radialGradient id="lampGlow"><stop offset="0" stop-color="#FFD998" stop-opacity=".72"/><stop offset=".4" stop-color="#FFC877" stop-opacity=".22"/><stop offset="1" stop-color="#FFC877" stop-opacity="0"/></radialGradient>
  <radialGradient id="sunset"><stop offset="0" stop-color="#F69A5E" stop-opacity=".95"/><stop offset="1" stop-color="#E9796A" stop-opacity=".7"/></radialGradient>
</defs>`;

/* The whole home, drawn once. */
const home = `<svg id="home" xmlns="http://www.w3.org/2000/svg" viewBox="-1500 0 7000 900" width="7000" height="900" aria-hidden="true">${defs}` +
  rect(-1500, 0, 1500, 900, '#CDBEA9') + bedroom() + kitchen() + living() + street() +
  pillar(0) + pillar(1000) + pillar(2000) + pillar(3000) + '</svg>';

/* ---------- what they're doing. Each actor set is one small svg, each state a group ---------- */
const clockFace = t => at(240, 532, rect(-32, -24, 64, 48, C.ink, 11) + `<text x="0" y="7" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="19" fill="#F3DDAE">${t}</text>`) + rect(214, 556, 7, 19, C.ink, 2) + rect(259, 556, 7, 19, C.ink, 2);
const duvet = d => `<g transform="translate(520 690)"><g class="breathe">${at(-520, -690, path(d, C.lavL) + line(d.split('C')[0] + 'C' + d.split('C').slice(1).join('C').split('L')[0], '#fff', 3, 'opacity=".35"'))}</g></g>`;
const curtains = () => `<g transform="translate(330 44)"><g class="sway">${path('M-40 8H36C30 120 42 220 16 292H-40Z', C.rose, 'opacity=".78"')}</g></g><g transform="translate(710 44)"><g class="sway b">${path('M40 8H-36C-30 120-42 220-16 292H40Z', C.rose, 'opacity=".78"')}</g></g>`;
const glassesOnStand = at(792, 568, `<rect x="-22" y="-12" width="19" height="14" rx="6" fill="none" stroke="${C.ink}" stroke-width="3"/><rect x="3" y="-12" width="19" height="14" rx="6" fill="none" stroke="${C.ink}" stroke-width="3"/>` + line('M-3-6H3', C.ink, 3));

const heads = (a, b) => at(a, 502, herHairBack(36) + herHead({ asleep: true, tilt: 13 })) + at(b, 502, himHead({ asleep: true, glasses: false, tilt: -13 }));
const herAwakeInBed = { x: 415, y: 604, s: .86, armL: [-50, -60, -18, -50], armR: [50, -60, 18, -50], front: rect(-22, -74, 44, 30, C.ink, 5) };
const bedDuvet = 'M274 696C266 610 300 548 372 546C440 544 470 562 520 560C576 558 610 544 672 546C740 548 776 606 766 696L274 696Z';

const ACTORS = {
  bed: { x: 0, w: 1000, states: {
    asleep: clockFace('06:02') + heads(478, 568) + duvet(bedDuvet) + glassesOnStand,
    morning: clockFace('08:17') + person('her', herAwakeInBed) +
      at(632, 512, path('M-44 10C-48-34 44-40 44 6Z', C.hair)) + duvet('M274 696C266 610 300 568 372 566C450 562 500 590 540 548C570 502 690 500 716 556C744 580 776 620 766 696L274 696Z') + glassesOnStand,
    up: clockFace('08:17') + person('her', herAwakeInBed) +
      person('him', { x: 632, y: 612, s: .86, lean: -6, asleep: true, messy: true, glasses: false, tilt: -8, armL: [-56, -60, -44, -14], armR: [58, -56, 44, -12] }) + duvet(bedDuvet.replace('546', '566').replace('560', '586').replace('558', '584').replace('544', '566')) + glassesOnStand,
    kiss: clockFace('08:17') + person('him', { x: 632, y: 612, s: .86, lean: -6, asleep: true, messy: true, glasses: false, tilt: -10, armL: [-56, -60, -44, -14], armR: [58, -56, 44, -12] }) +
      person('her', { x: 512, y: 604, s: .86, lean: 48, tilt: 16, asleep: true, armL: [-30, -60, 8, -48], armR: [86, -82, 128, -60] }) + hearts(600, 410) + duvet(bedDuvet.replace('546', '566').replace('560', '586').replace('558', '584').replace('544', '566')) + glassesOnStand,
    bedtime: clockFace('11:47') + at(466, 502, herHairBack(36) + herHead({ tilt: 12 })) + at(578, 502, himHead({ tilt: -12, asleep: true, glasses: false })) + duvet(bedDuvet) + glassesOnStand,
    goodnight: clockFace('11:47') + at(492, 502, herHairBack(36) + herHead({ tilt: 16, asleep: true })) + at(562, 502, himHead({ tilt: -16, asleep: true, glasses: false })) + hearts(528, 430) + duvet(bedDuvet) + glassesOnStand,
    dark: clockFace('00:03') + heads(484, 560) + duvet(bedDuvet) + glassesOnStand,
  }, always: curtains() },

  kitchen: { x: 1000, w: 1000, states: {
    breakfast: person('him', { x: 1282, y: 520, barefoot: false, lean: -8, tilt: -4, legs: [[-30, 80, -20, 158], [34, 86, 54, 160]], armL: [-66, -56, -50, -24], armR: [68, -60, 36, -76], front: at(36, -68, mug(0, 0, C.lav, true)) }) +
      person('her', { x: 1720, y: 520, barefoot: false, hair: 150, tilt: 5, legs: [[-18, 86, -18, 158], [18, 86, 18, 158]], armL: [-48, -56, -18, -44], armR: [50, -74, 34, -92] }) +
      at(1500, 442, oval(0, -2, 62, 11, C.white) + oval(-12, -9, 22, 11, C.gold) + oval(16, -8, 18, 9, '#D9A98D')) + mug(1422, 442, C.rose, true) + mug(1582, 442, C.lavD, true),
    backhug: person('him', { x: 1578, y: 520, barefoot: false, lean: 16, tilt: 11, asleep: true, legs: [[-22, 84, -22, 158], [24, 86, 26, 160]] }) +
      person('her', { x: 1658, y: 520, barefoot: false, hair: 150, tilt: -7, asleep: true, legs: [[-18, 86, -18, 158], [18, 86, 18, 158]], armR: [50, -74, 40, -92] }) +
      hold('M1602 418Q1612 474 1674 466', 1680, 466) + hold('M1612 444Q1630 494 1686 488', 1692, 488) + hearts(1626, 262) +
      at(1440, 442, oval(0, -2, 62, 11, C.white) + oval(-12, -9, 22, 11, C.gold) + oval(16, -8, 18, 9, '#D9A98D')) + mug(1290, 442, C.rose, true) + mug(1360, 442, C.lavD, true),
  } },

  living: { x: 2000, w: 1000, states: {
    routines: person('him', { x: 2630, y: 558, sit: true, tilt: 3, armL: [-58, -52, -26, -4], armR: [60, -52, 26, -4], front: rect(-42, -14, 84, 12, C.ink, 3) + path('M-38-14L-31-66H31L38-14Z', '#D9D4CF') + oval(0, -40, 7, 7, C.lavD) }) +
      person('her', { x: 2345, y: 700, hair: 104, tilt: 8, legs: [[-50, -24, -30, 18], [50, -24, 30, 18]], armL: [-52, -56, -16, -50], armR: [52, -56, 16, -50], front: rect(-30, -72, 60, 40, C.rose, 3) + rect(-1, -72, 2, 40, C.cream) }) +
      mug(2478, 742, C.rose, true) + rect(2540, 734, 54, 8, C.ink, 3),
    cuddle: person('him', { x: 2630, y: 558, sit: true, tilt: -5, armR: [60, -52, 26, -4], front: rect(-42, -14, 84, 12, C.ink, 3) + path('M-38-14L-31-66H31L38-14Z', '#D9D4CF') + oval(0, -40, 7, 7, C.lavD) }) +
      behind('M2594 450Q2550 432 2510 452') +
      person('her', { x: 2510, y: 566, sit: true, hair: 104, tilt: 13, lean: 26, asleep: true, armL: [-40, -52, -18, -6], armR: [54, -52, 18, -6], front: rect(-28, -30, 56, 30, C.rose, 3) + rect(-1, -30, 2, 30, C.cream) }) +
      handOn(2502, 462) + mug(2478, 742, C.rose, true) + rect(2540, 734, 54, 8, C.ink, 3),
    apart: person('him', { x: 2668, y: 558, sit: true, tilt: 8, lean: 4, armL: [-48, -62, 26, -56], armR: [48, -62, -26, -62] }) +
      person('her', { x: 2380, y: 558, sit: true, hair: 104, tilt: -8, flat: true, armL: [-44, -62, 20, -56], armR: [44, -62, -20, -62] }) + mug(2478, 742, C.rose),
    silence: person('him', { x: 2650, y: 558, sit: true, tilt: 4, armL: [-58, -52, -38, 2], armR: [60, -52, 38, 2] }) +
      person('her', { x: 2395, y: 558, sit: true, hair: 104, tilt: -4, flat: true, armL: [-46, -52, -30, 2], armR: [46, -52, 30, 2] }) + mug(2478, 742, C.rose),
    snack: person('him', { x: 2584, y: 558, sit: true, tilt: -5, armL: [-58, -52, -30, -8], armR: [60, -52, 38, 2] }) +
      person('her', { x: 2450, y: 558, sit: true, hair: 104, tilt: 6, armL: [-46, -52, -30, 2], armR: [50, -56, 38, -32] }) +
      at(2517, 540, path('M-36-8H36Q30 26 0 26T-36-8Z', C.cream) + oval(-12, -11, 10, 8, C.gold) + oval(8, -12, 11, 8, '#D9A98D') + oval(20, -9, 8, 6, C.gold)) + mug(2478, 742, C.rose),
    makeup: person('him', { x: 2592, y: 558, sit: true, tilt: -11, lean: -6, armR: [60, -52, 38, -14] }) +
      behind('M2556 450Q2510 432 2470 452') +
      person('her', { x: 2486, y: 566, sit: true, hair: 104, tilt: 17, lean: 30, asleep: true, armL: [-40, -52, -18, -2], armR: [70, -66, 110, -40] }) +
      handOn(2472, 462) + hearts(2548, 322) +
      at(2626, 540, path('M-36-8H36Q30 26 0 26T-36-8Z', C.cream) + oval(-12, -11, 10, 8, C.gold) + oval(8, -12, 11, 8, '#D9A98D') + oval(20, -9, 8, 6, C.gold)) + mug(2478, 742, C.rose),
    eveningCuddle: person('him', { x: 2592, y: 558, sit: true, tilt: -10, asleep: true, glasses: false, armR: [60, -52, 38, 2] }) +
      behind('M2556 450Q2510 432 2470 452') +
      person('her', { x: 2478, y: 566, sit: true, hair: 104, tilt: 14, lean: 28, armL: [-40, -52, -18, 0], armR: [54, -52, 24, 0] }) +
      handOn(2466, 462) + mug(2478, 742, C.rose, true) + mug(2596, 742, C.lavD, true),
    evening: person('him', { x: 2625, y: 558, sit: true, tilt: -13, lean: -4, asleep: true, glasses: false, armL: [-58, -52, -36, 2], armR: [60, -52, 38, 2] }) +
      person('her', { x: 2410, y: 558, sit: true, hair: 104, tilt: 7, armL: [-46, -52, -30, 2], armR: [52, -68, 42, -88] }) + mug(2478, 742, C.rose, true) + mug(2596, 742, C.lavD, true),
    close: person('him', { x: 2592, y: 558, sit: true, tilt: -9, asleep: true, glasses: false, armR: [60, -52, 38, 2] }) +
      behind('M2556 450Q2510 432 2470 452') +
      person('her', { x: 2478, y: 566, sit: true, hair: 104, tilt: 14, lean: 28, asleep: true, armL: [-40, -52, -18, 0], armR: [54, -52, 24, 0] }) +
      handOn(2466, 462) + mug(2478, 742, C.rose) + mug(2596, 742, C.lavD),
    forehead: behind('M2556 450Q2510 432 2470 452') +
      person('her', { x: 2478, y: 584, sit: true, hair: 104, tilt: 14, lean: 22, asleep: true, armL: [-40, -52, -18, 0], armR: [54, -52, 24, 0] }) +
      person('him', { x: 2604, y: 558, sit: true, tilt: -24, lean: -36, asleep: true, glasses: false, armR: [60, -52, 38, 2] }) +
      handOn(2466, 476) + hearts(2520, 318) + mug(2478, 742, C.rose) + mug(2596, 742, C.lavD),
  } },

  street: { x: 3000, w: 2000, states: {
    /* holding hands; her other hand has the very boring shopping */
    walking: `<g class="walkers">${walker('him', 3400, 0, '', false) + walker('her', 3505, -.42, at(6, -18, line('M-14 8Q0-14 14 8', C.cream, 3) + rect(-20, 6, 40, 52, C.cream, 6))) + line('M3404 478Q3424 530 3450 562', C.himTee, 20) + line('M3498 482Q3480 530 3456 562', C.herTee, 16) + oval(3453, 566, 12, 11, C.skin)}</g>`,
  } },
};

/* ---------- light that sits above the dimming, so lamps and sun stay warm ---------- */
const GLOWS = {
  bedSun: oval(520, 220, 460, 400, 'url(#sunSoft)') + path('M322 716H720L790 900H252Z', 'url(#patch)'),
  kitchenSun: oval(1502, 200, 400, 330, 'url(#sunSoft)') + path('M1372 716H1636L1720 900H1288Z', 'url(#patch)'),
  livingSun: oval(2260, 220, 380, 360, 'url(#sunSoft)') + path('M2150 716H2420L2590 900H2230Z', 'url(#patch)'),
  livingAfternoon: oval(2260, 220, 340, 320, 'url(#sunSoft)', 'opacity=".7"') + path('M2230 716H2500L2760 900H2400Z', 'url(#patch)', 'opacity=".8"'),
  livingEvening: rect(2164, 78, 190, 280, 'url(#sunset)') + rect(2255, 78, 8, 280, C.white, 0, 'opacity=".5"') + rect(2164, 207, 190, 8, C.white, 0, 'opacity=".5"') + path('M2300 716H2560L2880 900H2520Z', 'url(#patchEve)') + oval(2260, 240, 430, 400, 'url(#lampGlow)') + path('M2212 268L2232 200H2288L2308 268Z', '#FFE3A8'),
  livingNight: oval(2260, 240, 400, 380, 'url(#lampGlow)') + path('M2212 268L2232 200H2288L2308 268Z', '#FFE3A8'),
  bedLamp: oval(815, 505, 400, 340, 'url(#lampGlow)') + path('M785 532L796 478H834L845 532Z', '#FFE3A8'),
  bedMoon: oval(520, 300, 420, 420, 'url(#moonSoft)') + path('M360 716H680L740 900H300Z', 'url(#moon)'),
};

window.DAY26_ART = { home, ACTORS, GLOWS, glowSvg: inner => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1500 0 7000 900" width="7000" height="900" aria-hidden="true">${inner}</svg>` };
})();
