/* ==============================================
   MAIN.JS
   Handles: smooth scroll, section reveal, cursor glow,
   intelligence scan, bg canvas, recruiter mode, OSINT bars.
   Does NOT handle: console commands (that is console.js only).
============================================== */

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});


/* ── Section Reveal ── */
const _sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

document.querySelectorAll(".section").forEach(sec => _sectionObserver.observe(sec));


/* ── Glow Cursor ── */
const _cursor = document.createElement("div");
_cursor.classList.add("cursor-glow");
document.body.appendChild(_cursor);

document.addEventListener("mousemove", (e) => {
  _cursor.style.left = e.clientX + "px";
  _cursor.style.top  = e.clientY + "px";
});


/* ── Visitor Intelligence Scan ── */
let _movements   = 0;
let _startedIntel = false;

document.addEventListener("mousemove", () => { _movements++; });

/* BUG FIXED: original called intelObserver.observe(intelSection) with no null
   guard. If #intelligence is missing the script threw immediately and nothing
   below this line ran — cursor, bg canvas, recruiter mode all broken. */
const _intelSection = document.querySelector("#intelligence");

if (_intelSection) {
  const _intelObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !_startedIntel) {
        _startedIntel = true;
        _runIntelligence();
      }
    });
  });
  _intelObserver.observe(_intelSection);
}

function _runIntelligence() {
  const statusEl      = document.getElementById("status");
  const interactionEl = document.getElementById("interaction");
  const focusEl       = document.getElementById("focus");
  const trustEl       = document.getElementById("trust");
  const riskEl        = document.getElementById("risk");
  const bar           = document.getElementById("progress-bar");

  if (!statusEl) return;

  statusEl.textContent = "Scanning behavior...";
  let progress = 0;

  const scan = setInterval(() => {
    progress += 2;

    if (bar)            bar.style.width           = progress + "%";
    if (interactionEl)  interactionEl.textContent = Math.min(progress, 100) + "%";
    if (focusEl)        focusEl.textContent        = Math.min(progress * 0.9, 100).toFixed(0) + "%";
    if (trustEl)        trustEl.textContent        = Math.min(progress * 0.8 + 10, 100).toFixed(0) + "%";

    if (progress >= 100) {
      clearInterval(scan);
      statusEl.textContent = "Analysis Complete";
      if (riskEl) {
        riskEl.textContent = _movements > 200 ? "LOW"
                           : _movements > 80  ? "MODERATE"
                                              : "UNKNOWN";
      }
    }
  }, 60);
}


/* ── Cinematic Background Lines ── */
const _bgCanvas = document.getElementById("bgCanvas");
const _bgCtx    = _bgCanvas.getContext("2d");

function _resizeBg() {
  _bgCanvas.width  = window.innerWidth;
  _bgCanvas.height = window.innerHeight;
}
_resizeBg();
window.addEventListener("resize", _resizeBg);

const _bgLines = Array.from({ length: 60 }, () => ({
  x:      Math.random() * _bgCanvas.width,
  y:      Math.random() * _bgCanvas.height,
  speed:  0.2 + Math.random() * 0.5,
  length: 50  + Math.random() * 120
}));

function _animateBG() {
  _bgCtx.clearRect(0, 0, _bgCanvas.width, _bgCanvas.height);
  _bgCtx.strokeStyle = "rgba(0,255,166,0.15)";
  _bgCtx.lineWidth   = 1;

  _bgLines.forEach(line => {
    _bgCtx.beginPath();
    _bgCtx.moveTo(line.x, line.y);
    _bgCtx.lineTo(line.x, line.y + line.length);
    _bgCtx.stroke();

    line.y += line.speed;
    if (line.y > _bgCanvas.height) {
      line.y = -line.length;
      line.x = Math.random() * _bgCanvas.width;
    }
  });

  requestAnimationFrame(_animateBG);
}
_animateBG();


/* ── Recruiter Mode (Shift+R shortcut) ── */
const _recruiterPanel = document.getElementById("recruiterMode");

document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "r" && _recruiterPanel) {
    _recruiterPanel.classList.remove("hidden");
  }
});

/* Exposed globally so the inline onclick="closeRecruiter()" in HTML works */
window.closeRecruiter = function () {
  if (_recruiterPanel) _recruiterPanel.classList.add("hidden");
};


/* ── OSINT Dossier Bar Animation ── */
const _dossierObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".bar span").forEach(bar => {
        /* BUG FIXED: original did bar.getAttribute("style").split(":")[1]
           which returned "85%" with a trailing space on some browsers,
           producing an invalid CSS value. Now reads data-width attribute. */
        const w = bar.dataset.width || bar.style.width;
        if (w) bar.style.width = w;
      });
    }
  });
});

document.querySelectorAll("#osint").forEach(sec => _dossierObserver.observe(sec));


/* ── Adaptive Visitor Analysis (main.js version) ── */
/* BUG FIXED: original was named analyzeVisitor() — same name as function in
   home.js. Last script loaded silently won. Renamed to _runAdaptiveAnalysis. */

let _mouseSpeedSamples = [];
let _lastX = 0, _lastY = 0;
let _scrollCount = 0;
let _startTime   = Date.now();

document.addEventListener("mousemove", (e) => {
  const dx = e.clientX - _lastX;
  const dy = e.clientY - _lastY;
  _mouseSpeedSamples.push(Math.sqrt(dx * dx + dy * dy));
  _lastX = e.clientX;
  _lastY = e.clientY;
});

document.addEventListener("scroll", () => { _scrollCount++; });

setTimeout(_runAdaptiveAnalysis, 8000);

function _runAdaptiveAnalysis() {
  const avgSpeed  = _mouseSpeedSamples.reduce((a, b) => a + b, 0) / (_mouseSpeedSamples.length || 1);
  const timeSpent = (Date.now() - _startTime) / 1000;

  let type, style, color;

  if      (avgSpeed > 15)       { type = "Analytical Explorer"; style = "High Precision Movement"; color = "#00ffa6"; }
  else if (_scrollCount > 20)   { type = "Curious Researcher";  style = "Deep Navigation";         color = "#00d9ff"; }
  else                          { type = "Observer";             style = "Calm Interaction";         color = "#a066ff"; }

  const engagement = timeSpent > 20 ? "Highly Engaged" : "Quick Scanner";

  const vtEl = document.getElementById("visitorType");
  const isEl = document.getElementById("interactionStyle");
  const enEl = document.getElementById("engagement");

  if (vtEl) vtEl.textContent = type;
  if (isEl) isEl.textContent = style;
  if (enEl) enEl.textContent = engagement;

  document.documentElement.style.setProperty("--accent-color", color);
}