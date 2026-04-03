// ===== NEURAL CONTROL SYSTEM =====
window.neuralControl = {
  calm: () => speedFactor = 0.3,
  thinking: () => speedFactor = 0.8,
  typing: () => speedFactor = 1.5,
  accessGranted: () => glowBoost = 1.5
};

let speedFactor = 1;
let glowBoost = 1;

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx * speedFactor;
    p.y += p.vy * speedFactor;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,204,${glowBoost})`;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(0,255,200,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  glowBoost += (1 - glowBoost) * 0.02;
  requestAnimationFrame(animate);
}

animate();