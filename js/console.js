/* ==============================================
   CONSOLE.JS — Command terminal overlay
   Toggle: backtick (`) key
   All variables prefixed _con to avoid collision
   with any print() or commands declared elsewhere.
============================================== */

const _conEl     = document.getElementById("console");
const _conInput  = document.getElementById("console-input");
const _conOutput = document.getElementById("console-output");

/* ── Toggle open/close with ` key ── */
document.addEventListener("keydown", (e) => {
  if (e.key === "`" && _conEl) {
    _conEl.classList.toggle("hidden");
    if (!_conEl.classList.contains("hidden")) _conInput.focus();
  }
});

/* ── Print a line to the console output ── */
function _conPrint(text) {
  const line = document.createElement("div");
  line.textContent = text;
  _conOutput.appendChild(line);
  _conOutput.scrollTop = _conOutput.scrollHeight;
}

/* ── Command definitions ── */
/* BUG FIXED: contact command had placeholder "your@email.com". Updated to real address. */
const _commands = {

  help: () => {
    _conPrint("Available commands:");
    _conPrint("  help    → show this list");
    _conPrint("  about   → who is AK Lavate");
    _conPrint("  skills  → capability list");
    _conPrint("  contact → secure channel");
    _conPrint("  whoami  → reveal identity");
    _conPrint("  github  → repository status");
    _conPrint("  matrix  → toggle matrix mode");
    _conPrint("  clear   → clear console");
  },

  about: () => {
    _conPrint("Identity: Akash Lavate");
    _conPrint("Domain:   Cybersecurity | Social Engineering");
    _conPrint("Focus:    Human psychology in digital environments.");
  },

  skills: () => {
    _conPrint("• Social Engineering Analysis  [85%]");
    _conPrint("• OSINT & Reconnaissance       [75%]");
    _conPrint("• Network Security             [65%]");
    _conPrint("• Linux Environment            [70%]");
    _conPrint("• Security Awareness Strategy  [80%]");
  },

  contact: () => {
    _conPrint("Secure channel: contact@ak-lavate.tech");
    _conPrint("Response time:  24–48 hours");
    _conPrint("Status:         AVAILABLE");
  },

  whoami: () => {
    const profile = [
      "Resolving identity...",
      "",
      "Identity:        AK Lavate",
      "Role:            Cybersecurity Specialist",
      "Focus:           Social Engineering & Behavioral Security",
      "Domain:          Human-Centric Security",
      "Status:          ACTIVE",
      "Clearance Level: Human Layer Analyst"
    ];
    let i = 0;
    function _reveal() {
      if (i < profile.length) {
        _conPrint(profile[i++]);
        setTimeout(_reveal, 250);
      }
    }
    _reveal();
  },

  github: () => {
    _conPrint("GitHub profile: not yet deployed.");
    _conPrint("Repository:     coming soon...");
  },

  matrix: () => {
    document.body.classList.toggle("matrix-mode");
    _conPrint("Matrix mode toggled.");
  },

  clear: () => {
    _conOutput.innerHTML = "";
  }
};

/* ── Command history ── */
let _cmdHistory  = [];
let _historyIdx  = -1;

/* ── Input handler ── */
_conInput.addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    const cmd = _conInput.value.trim().toLowerCase();
    if (!cmd) return;

    _cmdHistory.push(cmd);
    _historyIdx = _cmdHistory.length;

    _conPrint("> " + cmd);

    if (_commands[cmd]) {
      _commands[cmd]();
    } else {
      _conPrint("Command not found. Type 'help'");
    }

    _conInput.value = "";
  }

  if (e.key === "ArrowUp") {
    if (_historyIdx > 0) _conInput.value = _cmdHistory[--_historyIdx];
  }

  if (e.key === "ArrowDown") {
    _conInput.value = _historyIdx < _cmdHistory.length - 1
      ? _cmdHistory[++_historyIdx]
      : (_historyIdx = _cmdHistory.length, "");
  }
});