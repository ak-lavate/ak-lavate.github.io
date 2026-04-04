/* ==============================================
   ADAPTIVEMATRIX.JS
   Adapts matrix speed/brightness to visitor engagement.
   Provides: cursorInfluence() used by matrix.js
   Load order: adaptiveMatrix.js BEFORE matrix.js
============================================== */

/* BUG FIXED: Original declared `let interactionScore = 0` at global scope.
   home.js also declared `let interactionScore = 0` globally. The second
   declaration silently overwrote the first, making both trackers wrong.
   Fix: this file keeps `interactionScore` as the canonical adaptive tracker.
   home.js renames its copy to `profileScore`. */

let interactionScore = 0;

window.addEventListener("scroll", () => {
  interactionScore += 2;
  _adaptMatrix();
});

window.addEventListener("mousemove", () => {
  interactionScore += 0.2;
});

window.addEventListener("click", () => {
  interactionScore += 5;
  _adaptMatrix();
});

function _adaptMatrix() {
  if (!window.matrixState) return;

  if (interactionScore < 50) {
    window.matrixState.speed      = 45;
    window.matrixState.brightness = 0.5;
    window.matrixState.chaos      = 0.04;
  } else if (interactionScore < 150) {
    window.matrixState.speed      = 30;
    window.matrixState.brightness = 0.8;
    window.matrixState.chaos      = 0.03;
  } else {
    window.matrixState.speed      = 18;
    window.matrixState.brightness = 1;
    window.matrixState.chaos      = 0.015;
  }
}

/* Cursor proximity influence — called from matrix.js _drawMatrix() */
let _mouseX = window.innerWidth  / 2;
let _mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  _mouseX = e.clientX;
  _mouseY = e.clientY;
});

function cursorInfluence(x, y) {
  const dx = x - _mouseX;
  const dy = y - _mouseY;
  return Math.sqrt(dx * dx + dy * dy) < 150 ? 2 : 1;
}