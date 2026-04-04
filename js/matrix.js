/* ==============================================
   MATRIX.JS — Single adaptive renderer
   Exposes: window.matrixState, window.matrixControl
   Requires: cursorInfluence() from adaptiveMatrix.js
   Load order: matrix.js BEFORE adaptiveMatrix.js
============================================== */

/* BUG FIXED: Original file had TWO renderers running simultaneously on the
   same canvas — a DOMContentLoaded rAF loop AND a module-level setTimeout loop.
   The module-level block also called cursorInfluence() before adaptiveMatrix.js
   loaded, causing ReferenceError and crashing the entire script.
   Fix: removed the DOMContentLoaded block entirely. This single block runs after
   defer ensures the DOM is ready, exposes window.matrixState for adaptiveMatrix.js,
   and calls cursorInfluence() safely because adaptiveMatrix.js is listed first. */

const _matrixCanvas = document.getElementById("matrix");
const _matrixCtx    = _matrixCanvas.getContext("2d");

_matrixCanvas.width  = window.innerWidth;
_matrixCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  _matrixCanvas.width  = window.innerWidth;
  _matrixCanvas.height = window.innerHeight;
});

const _matrixLetters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%*&";
const _matrixFontSize = 16;

let _matrixDrops = Array.from(
  { length: Math.floor(_matrixCanvas.width / _matrixFontSize) },
  () => 1
);

/* Adaptive state — read and written by adaptiveMatrix.js */
window.matrixState = {
  speed:      35,
  brightness: 0.7,
  chaos:      0.02
};

function _drawMatrix() {
  _matrixCtx.fillStyle = `rgba(0,0,0,${window.matrixState.chaos})`;
  _matrixCtx.fillRect(0, 0, _matrixCanvas.width, _matrixCanvas.height);

  _matrixCtx.fillStyle = `rgba(0,255,170,${window.matrixState.brightness})`;
  _matrixCtx.font      = _matrixFontSize + "px monospace";

  for (let i = 0; i < _matrixDrops.length; i++) {
    const text = _matrixLetters[Math.floor(Math.random() * _matrixLetters.length)];
    _matrixCtx.fillText(text, i * _matrixFontSize, _matrixDrops[i] * _matrixFontSize);

    if (_matrixDrops[i] * _matrixFontSize > _matrixCanvas.height && Math.random() > 0.975) {
      _matrixDrops[i] = 0;
    }

    /* cursorInfluence is defined in adaptiveMatrix.js which loads before this runs */
    _matrixDrops[i] += (typeof cursorInfluence === "function")
      ? cursorInfluence(i * _matrixFontSize, _matrixDrops[i] * _matrixFontSize)
      : 1;
  }
}

function _matrixLoop() {
  _drawMatrix();
  setTimeout(_matrixLoop, window.matrixState.speed);
}

_matrixLoop();

/* Public control API — called by script.js on the boot screen */
window.matrixControl = {
  typing()       { window.matrixState.speed = 15;  window.matrixState.brightness = 1;   },
  thinking()     { window.matrixState.speed = 28;  window.matrixState.brightness = 0.8; },
  calm()         { window.matrixState.speed = 45;  window.matrixState.brightness = 0.5; },
  accessGranted() {
    window.matrixState.brightness = 1.5;
    setTimeout(() => { window.matrixState.brightness = 0.7; }, 600);
  }
};