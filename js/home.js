/* ==============================================
   HOME.JS
   Handles: dynamic role, intel log, threat level,
   scroll progress, AI HUD messages, visitor profiling,
   recruiter detection.
============================================== */

/* ── Dynamic Role Rotator ── */
const _roles  = [
  "Cybersecurity Specialist",
  "Social Engineering Analyst",
  "Behavioral Intelligence Researcher",
  "Human Layer Hacker"
];
let _roleIdx = 0;
const _roleEl = document.getElementById("dynamic-role");

if (_roleEl) {
  setInterval(() => {
    _roleEl.style.opacity = 0;
    setTimeout(() => {
      _roleEl.textContent  = _roles[_roleIdx];
      _roleEl.style.opacity = 1;
      _roleIdx = (_roleIdx + 1) % _roles.length;
    }, 400);
  }, 2500);
}


/* ── Intelligence Log Feed ── */
const _intelLogEl = document.getElementById("intelLog");

if (_intelLogEl) {
  const _logs = [
    "Visitor connected.",
    "Behavioral pattern detected.",
    "Attention level increasing.",
    "Curiosity index rising.",
    "Interface adapting..."
  ];
  let _logIdx = 0;
  /* Cap at 6 visible entries — CSS max-height clips the box, but we also
     prune the DOM so it doesn't grow indefinitely behind the scenes. */
  const MAX_LOG_ENTRIES = 6;

  setInterval(() => {
    const entry = document.createElement("div");
    entry.textContent = _logs[_logIdx];
    _intelLogEl.appendChild(entry);

    /* Remove oldest entry once we exceed the cap */
    while (_intelLogEl.children.length > MAX_LOG_ENTRIES) {
      _intelLogEl.removeChild(_intelLogEl.firstChild);
    }

    _logIdx = (_logIdx + 1) % _logs.length;
  }, 3000);
}


/* ── Section Reveal (guards against duplicate observer with main.js) ── */
/* main.js also observes .section — both adding "show" is idempotent and safe.
   No bug, but noted here for clarity. */


/* ── Threat Level Ticker ── */
const _threatLevels = ["LOW", "MONITORING", "ANALYZING"];
const _threatEl     = document.getElementById("threatLevel");

setInterval(() => {
  if (_threatEl) {
    _threatEl.textContent =
      "Threat Level: " + _threatLevels[Math.floor(Math.random() * _threatLevels.length)];
  }
}, 5000);


/* ── Scroll Progress Bar ── */
window.addEventListener("scroll", () => {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  bar.style.width = Math.min(scrolled * 100, 100) + "%";
});


/* ── AI HUD Message System ── */
const _hud        = document.querySelector(".system-hud");
const _aiCooldown = {};
const _MSG_DELAY  = 4000;

window.aiMessage = function (text) {
  if (!_hud) return;
  const now = Date.now();
  if (_aiCooldown[text] && now - _aiCooldown[text] < _MSG_DELAY) return;
  _aiCooldown[text] = now;

  const msg = document.createElement("span");
  msg.textContent = text;
  msg.classList.add("ai-msg");
  _hud.appendChild(msg);

  while (_hud.children.length > 4) _hud.removeChild(_hud.children[0]);
};

/* Visitor arrival message */
setTimeout(() => { window.aiMessage("VISITOR DETECTED"); }, 2000);

/* Idle detection */
let _idleTimer;
function _resetIdle() {
  clearTimeout(_idleTimer);
  _idleTimer = setTimeout(() => window.aiMessage("USER IDLE..."), 8000);
}
["mousemove", "keydown", "scroll"].forEach(ev => window.addEventListener(ev, _resetIdle));
_resetIdle();

/* Tab visibility */
document.addEventListener("visibilitychange", () => {
  window.aiMessage(document.hidden ? "FOCUS LOST" : "FOCUS RESTORED");
});

/* Fast scroll engagement */
let _lastScrollPos  = 0;
let _engageCooldown = false;
window.addEventListener("scroll", () => {
  const speed = Math.abs(window.scrollY - _lastScrollPos);
  if (speed > 120 && !_engageCooldown) {
    window.aiMessage("HIGH ENGAGEMENT DETECTED");
    _engageCooldown = true;
    setTimeout(() => { _engageCooldown = false; }, 6000);
  }
  _lastScrollPos = window.scrollY;
});

/* Trust established message */
setTimeout(() => { window.aiMessage("VISITOR TRUST ESTABLISHED"); }, 10000);


/* ── Visitor Profiling AI ── */
/* BUG FIXED: was `let interactionScore` — collided with adaptiveMatrix.js global.
   Renamed to `profileScore` throughout this file. */
/* BUG FIXED: function was named `analyzeVisitor()` — collided with main.js.
   Renamed to `_runProfileAnalysis()`. */

let _profileScore    = 0;
let _profileScrolls  = 0;
let _profileMoves    = 0;
let _profileIdle     = false;
let _devtoolsOpen    = false;

window.addEventListener("mousemove", () => { _profileMoves++; _profileScore += 1; });
window.addEventListener("click",     () => { _profileScore += 3; });
window.addEventListener("scroll",    () => { _profileScrolls++; _profileScore += 2; });

/* Idle state hook */
setInterval(() => { _profileIdle = true; }, 10000);
["mousemove", "keydown", "scroll"].forEach(ev => {
  window.addEventListener(ev, () => { _profileIdle = false; });
});

/* DevTools detection easter egg */
setInterval(() => {
  const t = 160;
  _devtoolsOpen = (window.outerWidth - window.innerWidth > t) ||
                  (window.outerHeight - window.innerHeight > t);
}, 2000);

function _runProfileAnalysis() {
  const vtEl = document.getElementById("visitorType");
  if (!vtEl) return;

  let visitorType, interactionStyle, engagement;

  if      (_devtoolsOpen)         visitorType = "Technical User";
  else if (_profileScrolls > 25)  visitorType = "Explorer";
  else if (_profileMoves   > 80)  visitorType = "Analyst";
  else                            visitorType = "Observer";

  if      (_profileIdle)           interactionStyle = "Idle Monitoring";
  else if (_profileScore > 120)    interactionStyle = "Highly Interactive";
  else if (_profileScore > 50)     interactionStyle = "Engaged";
  else                             interactionStyle = "Passive";

  if      (_profileScore > 150)    engagement = "HIGH";
  else if (_profileScore > 60)     engagement = "MEDIUM";
  else                             engagement = "LOW";

  vtEl.textContent = visitorType;
  const isEl = document.getElementById("interactionStyle");
  const enEl = document.getElementById("engagement");
  if (isEl) isEl.textContent = interactionStyle;
  if (enEl) enEl.textContent = engagement;
}

setInterval(_runProfileAnalysis, 4000);


/* ── Recruiter Detection ── */
let _recruiterScore     = 0;
let _recruiterActivated = false;

/* BUG FIXED: original watched id="skills" which doesn't exist in home.html.
   Updated to watch the actual section IDs. */
["about", "capabilities", "projects", "contact"].forEach(id => {
  const section = document.getElementById(id);
  if (!section) return;

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        _recruiterScore += 2;
        _checkRecruiter();
      }
    });
  }, { threshold: 0.6 }).observe(section);
});

let _focusStart = Date.now();
window.addEventListener("focus", () => { _focusStart = Date.now(); });
window.addEventListener("blur",  () => {
  if (Date.now() - _focusStart > 15000) { _recruiterScore += 3; _checkRecruiter(); }
});

let _lastRecruiterScroll = Date.now();
window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - _lastRecruiterScroll > 1500) { _recruiterScore += 1; _checkRecruiter(); }
  _lastRecruiterScroll = now;
});

function _checkRecruiter() {
  if (_recruiterActivated || _recruiterScore < 8) return;
  _recruiterActivated = true;
  window.aiMessage("RECRUITER PROFILE DETECTED");
  const panel = document.getElementById("recruiterMode");
  if (panel) panel.classList.remove("hidden");
}