/* ==============================================
   PRESENCE.JS — Idle body class toggler
   Adds/removes body.idle after 5s of no movement.
   CSS uses body.idle { filter: brightness(0.7) }
============================================== */

let _lastMove = Date.now();

document.addEventListener("mousemove", () => {
  _lastMove = Date.now();
  document.body.classList.remove("idle");
});

setInterval(() => {
  if (Date.now() - _lastMove > 5000) {
    document.body.classList.add("idle");
  }
}, 1000);