/* ==============================================
   BOOT.JS — Boot sequence overlay
   Runs on DOMContentLoaded.
   Hides #bootScreen after sequence completes.
============================================== */

const _bootText = [
  "Initializing AK-LAVATE Interface...",
  "Loading Intelligence Core...",
  "Establishing Secure Connection...",
  "Authenticating Visitor...",
  "Access Granted."
];

let _bootIdx = 0;

function _bootSequence() {
  const boot   = document.getElementById("boot");
  const screen = document.getElementById("bootScreen");

  if (!boot || !screen) return;

  if (_bootIdx < _bootText.length) {
    const line = document.createElement("div");
    line.textContent = _bootText[_bootIdx++];
    boot.appendChild(line);
    setTimeout(_bootSequence, 800);
  } else {
    setTimeout(() => { screen.style.display = "none"; }, 800);
  }
}

document.addEventListener("DOMContentLoaded", _bootSequence);