/* ======================
   ADAPTIVE MATRIX ENGINE
====================== */

let interactionScore = 0;

/* Detect scrolling */
window.addEventListener("scroll", () => {
  interactionScore += 2;
  adaptMatrix();
});

/* Detect mouse movement */
window.addEventListener("mousemove", () => {
  interactionScore += 0.2;
});

/* Detect clicks */
window.addEventListener("click", () => {
  interactionScore += 5;
  adaptMatrix();
});

function adaptMatrix() {

  if (!window.matrixState) return;

  // Calm mode
  if (interactionScore < 50) {
    matrixState.speed = 45;
    matrixState.brightness = 0.5;
    matrixState.chaos = 0.04;
  }

  // Active visitor
  else if (interactionScore < 150) {
    matrixState.speed = 30;
    matrixState.brightness = 0.8;
    matrixState.chaos = 0.03;
  }

  // Highly engaged
  else {
    matrixState.speed = 18;
    matrixState.brightness = 1;
    matrixState.chaos = 0.015;
  }
}

/* =========================
   AI ALIVE — MOUSE REACTION
========================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function cursorInfluence(x, y) {

    const dx = x - mouseX;
    const dy = y - mouseY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 150; // influence area

    if (distance < radius) {
        return 2; // speed boost near cursor
    }

    return 1;
}