/* ==============================================
   NEURAL.JS — Particle network background
   Exposes: window.neuralControl
============================================== */

/* BUG FIXED: Original declared `const canvas` and `const ctx` at global scope.
   main.js also declares `const canvas` for bgCanvas. Loading both caused a
   SyntaxError re-declaration crash. Fix: prefixed all variables with _neural. */

window.neuralControl = {
  calm:          () => { _neuralSpeedFactor = 0.3; },
  thinking:      () => { _neuralSpeedFactor = 0.8; },
  typing:        () => { _neuralSpeedFactor = 1.5; },
  accessGranted: () => { _neuralGlowBoost  = 1.5; }
};

let _neuralSpeedFactor = 1;
let _neuralGlowBoost   = 1;

const _neuralCanvas = document.getElementById("neuralCanvas");
const _neuralCtx    = _neuralCanvas.getContext("2d");

_neuralCanvas.width  = window.innerWidth;
_neuralCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  _neuralCanvas.width  = window.innerWidth;
  _neuralCanvas.height = window.innerHeight;
});

const _particles = Array.from({ length: 80 }, () => ({
  x:  Math.random() * _neuralCanvas.width,
  y:  Math.random() * _neuralCanvas.height,
  vx: (Math.random() - 0.5),
  vy: (Math.random() - 0.5)
}));

function _neuralAnimate() {
  _neuralCtx.clearRect(0, 0, _neuralCanvas.width, _neuralCanvas.height);

  _particles.forEach(p => {
    p.x += p.vx * _neuralSpeedFactor;
    p.y += p.vy * _neuralSpeedFactor;

    if (p.x < 0 || p.x > _neuralCanvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > _neuralCanvas.height)  p.vy *= -1;

    _neuralCtx.beginPath();
    _neuralCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    _neuralCtx.fillStyle = `rgba(0,255,204,${Math.min(_neuralGlowBoost, 1)})`;
    _neuralCtx.fill();
  });

  for (let i = 0; i < _particles.length; i++) {
    for (let j = i + 1; j < _particles.length; j++) {
      const dx   = _particles[i].x - _particles[j].x;
      const dy   = _particles[i].y - _particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        _neuralCtx.strokeStyle = "rgba(0,255,200,0.1)";
        _neuralCtx.beginPath();
        _neuralCtx.moveTo(_particles[i].x, _particles[i].y);
        _neuralCtx.lineTo(_particles[j].x, _particles[j].y);
        _neuralCtx.stroke();
      }
    }
  }

  _neuralGlowBoost += (1 - _neuralGlowBoost) * 0.02;
  requestAnimationFrame(_neuralAnimate);
}

_neuralAnimate();