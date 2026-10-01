/* ==========================================================================
   RABIATU HUSSAINI — PORTFOLIO SCRIPT
   Modules:
   01. Theme Toggle
   02. Content Data (expertise, skills, learning, projects)
   03. Inline SVG Visuals
   04. Render Functions
   05. Avatar (profile picture fallback)
   06. Reveal on Scroll
   07. Navigation (scroll state, mobile menu)
   08. Routing & Scroll Spy
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     01. Theme Toggle
     ------------------------------------------------------------------------ */
  const getStoredTheme = () => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  };
  const saveTheme = (theme) => {
    try { localStorage.setItem('theme', theme); } catch {}
  };

  const initialTheme = getStoredTheme() ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  root.setAttribute('data-theme', initialTheme);
  themeToggle.setAttribute('aria-label',
    initialTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    saveTheme(next);
    themeToggle.setAttribute('aria-label',
      next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });

  /* ------------------------------------------------------------------------
     02. Content Data
     ------------------------------------------------------------------------ */
  const expertise = [
    { title:'Data Science & Analytics', desc:'Analyze, clean, visualize, and interpret data to generate meaningful insights.', icon:'<path d="M4 19h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-5"/>' },
    { title:'Machine Learning', desc:'Build and explore machine-learning models using Python and real-world datasets.', icon:'<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="17" r="2.4"/><path d="M7.7 8.9 10.7 15"/><path d="M16.3 8.9 13.3 15"/><path d="M8.4 7h7.2"/>' },
    { title:'Computational Statistics', desc:'Apply mathematical and statistical methods to computational and research problems.', icon:'<path d="M4 5h16"/><path d="M7 5v14"/><path d="M17 5v14"/><path d="M4 19h16"/><path d="M8.5 15.5 11 11l2 3 2.5-5"/>' },
    { title:'Product & UX Design', desc:'Design practical, user-centered digital products and interfaces, from user needs to working prototypes.', icon:'<path d="M12 3 3 8.2 12 13.4l9-5.2L12 3Z"/><path d="M3 12.6 12 17.8l9-5.2"/><path d="M3 16.8 12 22l9-5.2"/>' },
    { title:'Research', desc:'Explore quantitative and computational approaches to real-world problems.', icon:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>' },
    { title:'Social Innovation', desc:'Explore technology-driven solutions in education, healthcare, and community development.', icon:'<path d="M12 20.5s-7-4.3-7-9.4A4.1 4.1 0 0 1 12 8.4a4.1 4.1 0 0 1 7 2.7c0 5.1-7 9.4-7 9.4Z"/>' }
  ];

  const skillGroups = [
    { title:'Languages & Data', items:['Python','R','SQL','Excel'], icon:'<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h13"/>' },
    { title:'Data Science', items:['Pandas','NumPy','Matplotlib','Seaborn','Scikit-learn','Jupyter Notebook'], icon:'<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7.4 10 10.5"/><path d="M17 7.4 14 10.5"/><path d="M7 16.6 10 13.5"/><path d="M17 16.6 14 13.5"/>' },
    { title:'Visualization & BI', items:['Power BI','Tableau'], icon:'<path d="M4 19h16"/><rect x="6" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="7" width="3" height="10" rx="1"/><rect x="15" y="13" width="3" height="4" rx="1"/>' },
    { title:'Design & UI/UX', items:['Figma','UI/UX Design','User Research','Information Architecture','Interaction Design','Product Design','Wireframing','Prototyping','Design Systems'], icon:'<rect x="3" y="4" width="18" height="16" rx="2.4"/><path d="M3 9h18"/><path d="M9 9v11"/>' },
    { title:'Other Tools', items:['Git & GitHub','ODK','Kobo Toolbox','Google Workspace'], icon:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="m6 6 2 2"/><path d="m16 16 2 2"/><path d="m18 6-2 2"/><path d="m8 16-2 2"/>' }
  ];

  const learning = [
    'Machine Learning with Python',
    'Computational Statistics',
    'Statistical Modelling',
    'Data Visualization',
    'Advanced Python for Data Science',
    'Product Design & User Experience',
    'UI/UX Design Systems',
    'Interaction Design'
  ];

  /* ------------------------------------------------------------------------
     03. Inline SVG Visuals
     ------------------------------------------------------------------------ */
  const heroSVG = () => {
    let seed = 19;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

    let scatter = '';
    for (let i = 0; i < 26; i++) {
      const x = 46 + rnd() * 232;
      const base = 300 - (x - 46) * 0.42;
      const y = base + (rnd() - 0.5) * 46;
      const cy = Math.max(178, Math.min(322, y)).toFixed(1);
      const c = i % 4 === 0 ? '#8B5CF6' : (i % 3 === 0 ? '#12B0A0' : '#4B57F0');
      scatter += `<circle cx="${x.toFixed(1)}" cy="${cy}" r="3" fill="${c}" opacity="0.72"/>`;
    }

    const nodes = [[312,74],[352,62],[392,88],[330,112],[372,124],[416,118],[344,150],[400,158]];
    const edges = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,7],[6,7],[1,3]];
    let net = '';
    edges.forEach(([a, b]) => {
      net += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="#4B57F0" stroke-width="1" opacity="0.28"/>`;
    });
    nodes.forEach(([x, y], idx) => {
      const c = idx % 3 === 0 ? '#8B5CF6' : (idx % 3 === 1 ? '#4B57F0' : '#12B0A0');
      net += `<circle cx="${x}" cy="${y}" r="${idx % 4 === 0 ? 6 : 4.4}" fill="${c}"/>`;
    });

    let gridLines = '';
    [0.25, 0.5, 0.75].forEach(t => {
      gridLines += `<line x1="46" y1="${178 + 152 * t}" x2="282" y2="${178 + 152 * t}" stroke="#F0F2F9" stroke-width="1"/>`;
    });

    return `
      <svg viewBox="0 0 480 400" role="img" aria-label="Abstract composition combining mathematical notation, a regression scatter plot, a network graph of connected data nodes, and a wireframe interface preview." xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="heroGrid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0v22" fill="none" stroke="#E5E8F4" stroke-width="1"/></pattern>
          <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4B57F0"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>
        </defs>
        <rect width="480" height="400" fill="url(#heroGrid)" opacity="0.55"/>
        <g opacity="0.95">
          <text x="34" y="62" font-family="Manrope, Inter, sans-serif" font-size="21" font-weight="800" fill="#0A0E1A" letter-spacing="-0.5">y = &#946;&#8320; + &#946;&#8321;x&#8321; + &#946;&#8322;x&#8322; + u</text>
          <text x="34" y="88" font-family="Inter, sans-serif" font-size="12.5" fill="#7A839C">&#8721; (y&#7522; &#8722; &#375;&#7522;)&#178;  &#8594;  min</text>
          <rect x="34" y="102" width="96" height="2" rx="1" fill="url(#heroLine)" opacity="0.5"/>
        </g>
        <rect x="282" y="40" width="166" height="140" rx="16" fill="#FFFFFF" stroke="#E4E7F0"/>
        <text x="300" y="62" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#7A839C" letter-spacing="1.2">GRAPH MODEL</text>
        <line x1="300" y1="70" x2="430" y2="70" stroke="#EEF0F7" stroke-width="1"/>
        ${net}
        <rect x="26" y="128" width="272" height="236" rx="18" fill="#FFFFFF" stroke="#E4E7F0"/>
        <text x="46" y="154" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#7A839C" letter-spacing="1.2">REGRESSION</text>
        <line x1="46" y1="164" x2="278" y2="164" stroke="#EEF0F7" stroke-width="1"/>
        <line x1="46" y1="178" x2="46" y2="330" stroke="#DFE3F0" stroke-width="1.2"/>
        <line x1="46" y1="330" x2="282" y2="330" stroke="#DFE3F0" stroke-width="1.2"/>
        ${gridLines}
        ${scatter}
        <line x1="52" y1="312" x2="276" y2="204" stroke="url(#heroLine)" stroke-width="2.6" stroke-linecap="round" opacity="0.85"/>
        <circle cx="276" cy="204" r="4.5" fill="#4B57F0"/>
        <rect x="266" y="286" width="188" height="96" rx="16" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="282" y="302" width="46" height="8" rx="4" fill="#E4E7F0"/>
        <rect x="282" y="320" width="128" height="7" rx="3.5" fill="#EEF0F7"/>
        <rect x="282" y="334" width="102" height="7" rx="3.5" fill="#EEF0F7"/>
        <rect x="282" y="350" width="66" height="18" rx="9" fill="#4B57F0" opacity="0.9"/>
        <rect x="356" y="350" width="46" height="18" rx="9" fill="#F0F2F9"/>
        <circle cx="430" cy="306" r="7" fill="#12B0A0" opacity="0.85"/>
      </svg>`;
  };

  const svgMultilevel = () => {
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const X0 = 58, X1 = 370, Ytop = 34, Ybot = 194;
    const px = t => X0 + t * (X1 - X0);
    const py = u => Ytop + u * (Ybot - Ytop);

    const groups = [
      { c:'#4B57F0', n:9, xa:0.05, xb:0.38, ya:0.80, yb:0.57 },
      { c:'#8B5CF6', n:9, xa:0.35, xb:0.69, ya:0.64, yb:0.43 },
      { c:'#12B0A0', n:9, xa:0.65, xb:0.97, ya:0.47, yb:0.20 }
    ];

    let dots = '', lines = '';
    groups.forEach(g => {
      for (let i = 0; i < g.n; i++) {
        const t = g.xa + (g.xb - g.xa) * (i / (g.n - 1)) + (rnd() - 0.5) * 0.045;
        const u = g.ya + (g.yb - g.ya) * (i / (g.n - 1)) + (rnd() - 0.5) * 0.17;
        dots += `<circle cx="${px(t).toFixed(1)}" cy="${py(u).toFixed(1)}" r="3.4" fill="${g.c}" opacity="0.85"/>`;
      }
      lines += `<line x1="${px(g.xa).toFixed(1)}" y1="${py(g.ya).toFixed(1)}" x2="${px(g.xb).toFixed(1)}" y2="${py(g.yb).toFixed(1)}" stroke="${g.c}" stroke-width="2.2" stroke-linecap="round" opacity="0.45"/>`;
    });

    let ticks = '';
    for (let k = 0; k <= 4; k++) {
      const y = Ytop + (Ybot - Ytop) * (k / 4);
      ticks += `<line x1="${X0}" y1="${y.toFixed(1)}" x2="${X0 - 5}" y2="${y.toFixed(1)}" stroke="#C9CFE4" stroke-width="1"/>`;
    }

    return `
      <svg viewBox="0 0 400 240" role="img" aria-label="Scatter plot showing three groups of data points with three fitted regression lines of differing intercepts, illustrating multilevel modelling." xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="p1g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#E9ECF6" stroke-width="1"/></pattern></defs>
        <rect width="400" height="240" fill="#F8F9FE"/>
        <rect width="400" height="240" fill="url(#p1g)" opacity="0.7"/>
        <rect x="18" y="14" width="118" height="24" rx="12" fill="#FFFFFF" stroke="#E4E7F0"/>
        <text x="32" y="30" font-family="Inter, sans-serif" font-size="9.5" font-weight="700" fill="#5A6480" letter-spacing="1">LEVEL 1 - 3</text>
        <line x1="${X0}" y1="${Ytop}" x2="${X0}" y2="${Ybot}" stroke="#D7DCEB" stroke-width="1.2"/>
        <line x1="${X0}" y1="${Ybot}" x2="${X1}" y2="${Ybot}" stroke="#D7DCEB" stroke-width="1.2"/>
        ${ticks}${lines}${dots}
        <text x="${X0}" y="${Ybot + 20}" font-family="Inter, sans-serif" font-size="9" fill="#9AA2B8">Predictor</text>
        <rect x="256" y="24" width="126" height="34" rx="10" fill="#FFFFFF" stroke="#E4E7F0"/>
        <circle cx="272" cy="41" r="4" fill="#4B57F0"/><circle cx="300" cy="41" r="4" fill="#8B5CF6"/><circle cx="328" cy="41" r="4" fill="#12B0A0"/>
        <text x="340" y="45" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#5A6480">Groups</text>
      </svg>`;
  };

  const svgFinance = () => `
    <svg viewBox="0 0 400 260" role="img" aria-label="Interface preview of an offline-first financial literacy app showing a lesson progress bar, a balance card, and simple lesson rows, alongside an offline availability badge and a budget chart card." xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="pf1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4B57F0"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs>
      <rect width="400" height="260" fill="#F8F9FE"/>
      <circle cx="60" cy="210" r="110" fill="#4B57F0" opacity="0.05"/>
      <circle cx="350" cy="50" r="90" fill="#12B0A0" opacity="0.06"/>
      <rect x="150" y="8" width="116" height="244" rx="18" fill="#FFFFFF" stroke="#E4E7F0" stroke-width="1.4"/>
      <rect x="192" y="15" width="32" height="4" rx="2" fill="#DFE3F0"/>
      <text x="162" y="40" font-family="Manrope, Inter, sans-serif" font-size="10.5" font-weight="800" fill="#0A0E1A">Money Basics</text>
      <text x="162" y="52" font-family="Inter, sans-serif" font-size="7.4" fill="#7A839C">Lesson 2 of 6</text>
      <rect x="162" y="60" width="92" height="5" rx="2.5" fill="#EDEFF7"/>
      <rect x="162" y="60" width="38" height="5" rx="2.5" fill="url(#pf1)"/>
      <rect x="162" y="74" width="92" height="44" rx="10" fill="#F3F4FC"/>
      <text x="172" y="90" font-family="Inter, sans-serif" font-size="7" fill="#7A839C" letter-spacing="0.6">SAVINGS</text>
      <text x="172" y="106" font-family="Manrope, Inter, sans-serif" font-size="14" font-weight="800" fill="#0A0E1A">&#8358; 12,400</text>
      <circle cx="242" cy="98" r="9" fill="#12B0A0" opacity="0.18"/>
      <path d="M238 100.5 241 96l2 2.5L246 94" fill="none" stroke="#12B0A0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="162" y="126" width="92" height="26" rx="8" fill="#FFFFFF" stroke="#EBEEF7"/>
      <circle cx="176" cy="139" r="6" fill="#4B57F0" opacity="0.15"/>
      <rect x="188" y="134" width="42" height="4.5" rx="2.2" fill="#DFE3F0"/>
      <rect x="188" y="142" width="28" height="4" rx="2" fill="#EDEFF7"/>
      <rect x="162" y="158" width="92" height="26" rx="8" fill="#FFFFFF" stroke="#EBEEF7"/>
      <circle cx="176" cy="171" r="6" fill="#8B5CF6" opacity="0.15"/>
      <rect x="188" y="166" width="36" height="4.5" rx="2.2" fill="#DFE3F0"/>
      <rect x="188" y="174" width="46" height="4" rx="2" fill="#EDEFF7"/>
      <rect x="162" y="192" width="92" height="24" rx="8" fill="#FFFFFF" stroke="#EBEEF7"/>
      <rect x="172" y="200" width="34" height="8" rx="4" fill="#EDEFF7"/>
      <rect x="212" y="198" width="34" height="12" rx="6" fill="url(#pf1)" opacity="0.9"/>
      <rect x="162" y="226" width="92" height="20" rx="10" fill="#F3F4FC"/>
      <circle cx="180" cy="236" r="3" fill="#4B57F0"/>
      <circle cx="204" cy="236" r="3" fill="#C9CFE4"/>
      <circle cx="228" cy="236" r="3" fill="#C9CFE4"/>
      <rect x="16" y="62" width="118" height="80" rx="14" fill="#FFFFFF" stroke="#E4E7F0"/>
      <rect x="28" y="74" width="26" height="26" rx="8" fill="#12B0A0" opacity="0.14"/>
      <path d="M34 88.5a4 4 0 0 1 7.5-1.6M36 91.5a1.6 1.6 0 0 1 3.2 0" fill="none" stroke="#12B0A0" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="30" y1="76" x2="52" y2="98" stroke="#12B0A0" stroke-width="1.6" stroke-linecap="round"/>
      <text x="62" y="86" font-family="Inter, sans-serif" font-size="8.6" font-weight="700" fill="#0A0E1A">Works offline</text>
      <text x="62" y="97" font-family="Inter, sans-serif" font-size="7.2" fill="#7A839C">No data needed</text>
      <rect x="28" y="112" width="94" height="6" rx="3" fill="#EDEFF7"/>
      <rect x="28" y="124" width="66" height="6" rx="3" fill="#EDEFF7"/>
      <rect x="274" y="96" width="110" height="96" rx="14" fill="#FFFFFF" stroke="#E4E7F0"/>
      <text x="288" y="114" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#7A839C" letter-spacing="1">BUDGET</text>
      <rect x="288" y="146" width="10" height="14" rx="3" fill="#4B57F0"/>
      <rect x="304" y="130" width="10" height="30" rx="3" fill="#8B5CF6" opacity="0.75"/>
      <rect x="320" y="138" width="10" height="22" rx="3" fill="#12B0A0" opacity="0.8"/>
      <rect x="336" y="122" width="10" height="38" rx="3" fill="#4B57F0" opacity="0.55"/>
      <rect x="352" y="150" width="10" height="10" rx="3" fill="#8B5CF6" opacity="0.4"/>
      <line x1="288" y1="162" x2="368" y2="162" stroke="#E4E7F0" stroke-width="1.2"/>
    </svg>`;

  const svgHealth = () => {
    let rows = '';
    [0, 1, 2].forEach(i => {
      const y = 78 + i * 34;
      rows += `<rect x="38" y="${y}" width="52" height="6" rx="3" fill="#C9CFE4"/>
              <rect x="38" y="${y + 12}" width="164" height="16" rx="6" fill="#F4F5FB" stroke="#E9ECF6"/>`;
    });

    let bars = '';
    [46, 30, 58].forEach((h, i) => {
      const x = 258 + i * 34;
      const c = ['#4B57F0', '#8B5CF6', '#12B0A0'][i];
      bars += `<rect x="${x}" y="${196 - h}" width="18" height="${h}" rx="5" fill="${c}" opacity="0.85"/>`;
    });

    return `
      <svg viewBox="0 0 400 240" role="img" aria-label="Interface preview of an offline community health screening tool: a simple labelled form on the left and a readable data summary panel with bar chart on the right." xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#F8F9FE"/>
        <circle cx="330" cy="210" r="100" fill="#12B0A0" opacity="0.06"/>
        <rect x="20" y="20" width="200" height="200" rx="16" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="38" y="36" width="72" height="8" rx="4" fill="#0A0E1A" opacity="0.85"/>
        <rect x="38" y="52" width="120" height="6" rx="3" fill="#EDEFF7"/>
        <line x1="38" y1="68" x2="202" y2="68" stroke="#EEF0F7"/>
        ${rows}
        <rect x="38" y="182" width="12" height="12" rx="4" fill="#4B57F0" opacity="0.15" stroke="#4B57F0" stroke-width="1.2"/>
        <path d="M41 188.2 43.4 190.6 47.5 185.6" fill="none" stroke="#4B57F0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="58" y="185" width="76" height="6" rx="3" fill="#DFE3F0"/>
        <rect x="232" y="20" width="148" height="200" rx="16" fill="#FFFFFF" stroke="#E4E7F0"/>
        <text x="250" y="42" font-family="Inter, sans-serif" font-size="8.4" font-weight="700" fill="#7A839C" letter-spacing="1.1">SUMMARY</text>
        <line x1="250" y1="52" x2="362" y2="52" stroke="#EEF0F7"/>
        <rect x="250" y="64" width="90" height="7" rx="3.5" fill="#DFE3F0"/>
        <rect x="250" y="78" width="60" height="6" rx="3" fill="#EDEFF7"/>
        ${bars}
        <line x1="250" y1="196" x2="362" y2="196" stroke="#E4E7F0" stroke-width="1.2"/>
        <rect x="250" y="118" width="112" height="6" rx="3" fill="#EDEFF7"/>
        <rect x="250" y="130" width="88" height="6" rx="3" fill="#EDEFF7"/>
      </svg>`;
  };

  const svgLivestock = () => {
    let seed = 31;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    let cells = '';
    const cols = 12, rowsN = 7, cw = 28, ch = 26, ox = 24, oy = 34;
    for (let r = 0; r < rowsN; r++) {
      for (let c = 0; c < cols; c++) {
        const x = ox + c * cw, y = oy + r * ch;
        let fill = '#F2F4FB', op = 1;
        if (rnd() > 0.74) { fill = '#12B0A0'; op = 0.22; }
        if (r === 3 && c === 2) { fill = '#4B57F0'; op = 0.25; }
        if (r === 1 && c === 9) { fill = '#8B5CF6'; op = 0.22; }
        cells += `<rect x="${x}" y="${y}" width="${cw - 3}" height="${ch - 3}" rx="4" fill="${fill}" opacity="${op}"/>`;
      }
    }
    const path = 'M62 158 C 96 132, 118 176, 152 138 S 208 96, 248 128 S 300 158, 336 96';
    return `
      <svg viewBox="0 0 400 240" role="img" aria-label="Grid environment showing grazing cells, a water point, movement paths between locations, and waypoint nodes representing livestock movement optimisation." xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="p4arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#4B57F0"/></marker>
          <linearGradient id="p4path" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4B57F0"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="#F8F9FE"/>
        ${cells}
        <path d="${path}" fill="none" stroke="url(#p4path)" stroke-width="2.4" stroke-dasharray="7 6" stroke-linecap="round" marker-end="url(#p4arrow)" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1.6s" repeatCount="indefinite"/>
        </path>
        <circle cx="62" cy="158" r="7" fill="#FFFFFF" stroke="#4B57F0" stroke-width="2.4"/>
        <circle cx="152" cy="138" r="5.5" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2.2"/>
        <circle cx="248" cy="128" r="5.5" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2.2"/>
        <circle cx="336" cy="96" r="7" fill="#FFFFFF" stroke="#12B0A0" stroke-width="2.4"/>
        <circle cx="106" cy="152" r="3.4" fill="#4B57F0" opacity="0.8"/>
        <circle cx="196" cy="118" r="3.4" fill="#4B57F0" opacity="0.8"/>
        <circle cx="292" cy="140" r="3.4" fill="#4B57F0" opacity="0.8"/>
        <rect x="24" y="14" width="150" height="16" rx="8" fill="#FFFFFF" stroke="#E4E7F0"/>
        <circle cx="38" cy="22" r="3.2" fill="#4B57F0"/><text x="46" y="25" font-family="Inter, sans-serif" font-size="7.6" fill="#5A6480">Path</text>
        <circle cx="82" cy="22" r="3.2" fill="#12B0A0"/><text x="90" y="25" font-family="Inter, sans-serif" font-size="7.6" fill="#5A6480">Grazing</text>
        <circle cx="142" cy="22" r="3.2" fill="#8B5CF6"/><text x="150" y="25" font-family="Inter, sans-serif" font-size="7.6" fill="#5A6480">State</text>
      </svg>`;
  };

  const svgAnalytics = () => {
    const bars = [38, 62, 30, 74, 50, 86, 44];
    let barMarkup = '';
    bars.forEach((h, i) => {
      const x = 46 + i * 21;
      const c = i % 2 ? '#8B5CF6' : '#4B57F0';
      const o = i % 2 ? 0.55 : 0.88;
      barMarkup += `<rect x="${x}" y="${198 - h}" width="12" height="${h}" rx="3.5" fill="${c}" opacity="${o}"/>`;
    });
    return `
      <svg viewBox="0 0 400 240" role="img" aria-label="Analytics dashboard preview with KPI cards, a bar chart of counts, and a line chart showing a trend over time." xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#F8F9FE"/>
        <rect x="20" y="16" width="110" height="42" rx="11" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="34" y="28" width="34" height="6" rx="3" fill="#DFE3F0"/>
        <rect x="34" y="40" width="54" height="9" rx="4.5" fill="#4B57F0" opacity="0.85"/>
        <rect x="145" y="16" width="110" height="42" rx="11" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="159" y="28" width="34" height="6" rx="3" fill="#DFE3F0"/>
        <rect x="159" y="40" width="44" height="9" rx="4.5" fill="#8B5CF6" opacity="0.8"/>
        <rect x="270" y="16" width="110" height="42" rx="11" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="284" y="28" width="34" height="6" rx="3" fill="#DFE3F0"/>
        <rect x="284" y="40" width="60" height="9" rx="4.5" fill="#12B0A0" opacity="0.85"/>
        <rect x="20" y="70" width="190" height="152" rx="13" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="36" y="84" width="52" height="6" rx="3" fill="#DFE3F0"/>
        <line x1="40" y1="198" x2="200" y2="198" stroke="#E9ECF6" stroke-width="1.2"/>
        <line x1="40" y1="106" x2="40" y2="198" stroke="#E9ECF6" stroke-width="1.2"/>
        ${barMarkup}
        <rect x="222" y="70" width="158" height="152" rx="13" fill="#FFFFFF" stroke="#E4E7F0"/>
        <rect x="238" y="84" width="52" height="6" rx="3" fill="#DFE3F0"/>
        <polyline points="238,178 262,158 286,166 310,134 334,144 358,112" fill="none" stroke="#4B57F0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="238,178 262,158 286,166 310,134 334,144 358,112 358,198 238,198" fill="#4B57F0" opacity="0.08" stroke="none"/>
        <circle cx="310" cy="134" r="4" fill="#FFFFFF" stroke="#4B57F0" stroke-width="2.2"/>
        <circle cx="358" cy="112" r="4" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="2.2"/>
        <circle cx="238" cy="206" r="3" fill="#4B57F0"/><rect x="246" y="203" width="30" height="6" rx="3" fill="#EDEFF7"/>
        <circle cx="298" cy="206" r="3" fill="#8B5CF6"/><rect x="306" y="203" width="30" height="6" rx="3" fill="#EDEFF7"/>
      </svg>`;
  };

  const projects = [
    { num:'01', featured:true,
      category:'Mathematical Research - Computational Statistics',
      title:'Multilevel Computational Modelling',
      desc:"MSc research project focused on modelling students' academic performance across public secondary schools.",
      note:'Hierarchical structure · Group-level variation · Model interpretation',
      tags:['Mathematics','Computational Statistics','Statistical Modelling','Education'],
      visual: svgMultilevel },
    { num:'02',
      category:'Product Design · UX · Financial Literacy · Social Impact',
      title:'Rural Digital Finance Hub',
      desc:'An offline-first digital financial literacy solution designed to improve understanding of basic financial services.',
      note:'Clear information hierarchy · Simple navigation · Accessible language · Low-connectivity considerations',
      tags:['Product Design','UI/UX Design','Financial Literacy','Offline-first','Social Impact'],
      visual: svgFinance },
    { num:'03',
      category:'Health Technology · Data · Product Design · UX',
      title:'Community Health Kiosk',
      desc:'An offline health-screening concept designed to support community-level health data collection and decision-making.',
      note:'Simple task flows · Clear form design · Readable summaries · Error prevention',
      tags:['HealthTech','Data Collection','Offline-first','Product Design','UI/UX Design'],
      visual: svgHealth },
    { num:'04',
      category:'Machine Learning · Reinforcement Learning',
      title:'Livestock Movement Optimization',
      desc:'A Reinforcement Learning project exploring sustainable livestock movement and grazing management in Namibia.',
      note:'Environment and state transitions · Movement paths · Optimisation objectives',
      tags:['Python','Reinforcement Learning','Optimization','Machine Learning'],
      visual: svgLivestock },
    { num:'05',
      category:'Data Analytics',
      title:'Data Analysis Projects',
      desc:'Practical projects involving data cleaning, exploratory data analysis, visualization, statistical analysis, and machine learning.',
      note:'Data cleaning · EDA · Visualization · Statistical analysis · Modelling',
      tags:['Python','Pandas','SQL','Visualization','Machine Learning'],
      visual: svgAnalytics }
  ];

  const icon = (paths, size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  /* ------------------------------------------------------------------------
     04. Render Functions
     ------------------------------------------------------------------------ */
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) heroCanvas.innerHTML = heroSVG();

  const expertiseGrid = document.getElementById('expertiseGrid');
  if (expertiseGrid) {
    expertiseGrid.innerHTML = expertise.map((item, i) => `
      <article class="exp-card reveal${i % 3 === 1 ? ' reveal--d1' : i % 3 === 2 ? ' reveal--d2' : ''}">
        <div class="exp-card__top">
          <span class="exp-card__icon" aria-hidden="true">${icon(item.icon, 17)}</span>
          <h3>${item.title}</h3>
        </div>
        <p>${item.desc}</p>
      </article>`).join('');
  }

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map((p, i) => {
      const tagsHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
      return `
        <article class="project reveal${p.featured ? ' project--featured' : ''}${i % 2 ? ' reveal--d1' : ''}">
          <div class="project__visual">
            <span class="project__num" aria-hidden="true">${p.num}</span>
            ${p.visual()}
          </div>
          <div class="project__body">
            <p class="project__cat">${p.category}</p>
            <h3 class="project__title">${p.title}</h3>
            <p class="project__desc">${p.desc}</p>
            <p class="project__note">${p.note}</p>
            <div class="project__tags">${tagsHTML}</div>
            <div class="project__footer">
              <a class="btn btn--sm btn--ghost" href="#">View Project</a>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = skillGroups.map((group, i) => {
      const badges = group.items.map(item => `<span class="skill-badge">${item}</span>`).join('');
      return `
        <article class="skill-card reveal${i % 3 === 1 ? ' reveal--d1' : i % 3 === 2 ? ' reveal--d2' : ''}">
          <div class="skill-card__head">
            <span class="skill-card__icon" aria-hidden="true">${icon(group.icon, 16)}</span>
            <h3>${group.title}</h3>
          </div>
          <div class="skill-badges">${badges}</div>
        </article>`;
    }).join('');
  }

  const learningGrid = document.getElementById('learningGrid');
  if (learningGrid) {
    learningGrid.innerHTML = learning.map((item, i) => `
      <div class="learn-item reveal${i % 4 === 1 ? ' reveal--d1' : i % 4 === 2 ? ' reveal--d2' : i % 4 === 3 ? ' reveal--d3' : ''}">
        <span class="learn-item__idx" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <p>${item}</p>
      </div>`).join('');
  }

  /* ------------------------------------------------------------------------
     05. Avatar (Profile Picture with Initials Fallback)
     - Reads data-avatar for the image source.
     - If the image loads, fades it in over the initials.
     - If it fails or is missing, keeps the initials visible.
     ------------------------------------------------------------------------ */
  const initAvatar = () => {
    const profile = document.getElementById('profileAvatar');
    if (!profile) return;

    const img = profile.querySelector('.profile__img');
    const fallback = profile.querySelector('.profile__fallback');
    const src = (profile.getAttribute('data-avatar') || '').trim();
    const initials = profile.getAttribute('data-initials') || 'RH';
    const name = profile.getAttribute('data-name') || 'User';

    if (fallback) {
      fallback.textContent = initials;
      fallback.setAttribute('aria-label', `${name} avatar`);
    }
    if (img) img.alt = `Portrait of ${name}`;

    if (!src || !img) {
      profile.classList.add('is-fallback');
      return;
    }

    const showImage = () => profile.classList.add('is-loaded');
    const showFallback = () => {
      profile.classList.remove('is-loaded');
      profile.classList.add('is-fallback');
      if (img.parentNode) img.remove();
    };

    img.addEventListener('load', showImage, { once: true });
    img.addEventListener('error', showFallback, { once: true });

    img.src = src;

    // Handle images already in cache
    if (img.complete) {
      if (img.naturalWidth > 0) showImage();
      else showFallback();
    }
  };

  initAvatar();

  /* ------------------------------------------------------------------------
     06. Reveal on Scroll
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------------
     07. Navigation (scroll state + mobile menu)
     ------------------------------------------------------------------------ */
  const nav = document.getElementById('siteNav');
  let scrollTicking = false;
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
      scrollTicking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');

  const closeMenu = () => {
    navPanel.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  };
  const openMenu = () => {
    navPanel.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
  };

  navToggle.addEventListener('click', () => {
    navPanel.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  navPanel.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navPanel.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (!navPanel.classList.contains('is-open')) return;
    if (e.target.closest('#navPanel') || e.target.closest('#navToggle')) return;
    closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 980) closeMenu();
  });

  /* ------------------------------------------------------------------------
     08. Routing & Scroll Spy
     ------------------------------------------------------------------------ */
  const pages = {
    home: document.getElementById('page-home'),
    work: document.getElementById('page-work'),
    contact: document.getElementById('page-contact')
  };

  const navLinks = document.querySelectorAll('[data-nav]');
  let scrollSpy = null;

  const setActiveNav = (key) => {
    navLinks.forEach(link => {
      if (link.getAttribute('data-nav') === key) {
        link.setAttribute('aria-current', key === 'contact' ? 'page' : 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const showPage = (name) => {
    Object.entries(pages).forEach(([key, page]) => {
      if (!page) return;
      const active = key === name;
      page.classList.toggle('is-active', active);
      active ? page.removeAttribute('hidden') : page.setAttribute('hidden', '');
    });
    document.body.setAttribute('data-page', name);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const behavior = prefersReduced ? 'auto' : 'smooth';
    requestAnimationFrame(() => {
      setTimeout(() => target.scrollIntoView({ behavior, block: 'start' }), 20);
    });
  };

  const enableScrollSpy = () => {
    if (!('IntersectionObserver' in window) || scrollSpy) return;
    scrollSpy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    ['home', 'about', 'projects', 'skills', 'research'].forEach(id => {
      const section = document.getElementById(id);
      if (section) scrollSpy.observe(section);
    });
  };

  const disableScrollSpy = () => {
    if (scrollSpy) { scrollSpy.disconnect(); scrollSpy = null; }
  };

  const handleRoute = (hash = '#/') => {
    const h = hash.toLowerCase();

    if (h === '#/contact' || h === '#contact') {
      disableScrollSpy();
      showPage('contact');
      setActiveNav('contact');
      scrollToTop();
      return;
    }

    if (['#projects', '#skills', '#research'].includes(h)) {
      disableScrollSpy();
      showPage('work');
      const id = h.slice(1);
      setActiveNav(id);
      scrollToSection(id);
      return;
    }

    if (h === '#about') {
      disableScrollSpy();
      showPage('home');
      setActiveNav('about');
      scrollToSection('about');
      return;
    }

    disableScrollSpy();
    showPage('home');
    setActiveNav('home');
    scrollToTop();
    enableScrollSpy();
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    if (href === '#') {
      e.preventDefault();
      return;
    }

    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      closeMenu();
      if (window.location.hash === href) handleRoute(href);
      else window.location.hash = href;
    }
  });

  window.addEventListener('hashchange', () => handleRoute(window.location.hash));

  if (window.location.hash) handleRoute(window.location.hash);
  else { showPage('home'); setActiveNav('home'); enableScrollSpy(); }

})();