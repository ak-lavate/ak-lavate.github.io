window.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#00ff9f";
ctx.shadowColor = "#9bf785";
ctx.shadowBlur = 8;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(
      Math.floor(Math.random() * letters.length)
    );

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i] += Math.random() * 1.5;
  }
}

function animate(){
  draw();
  requestAnimationFrame(animate);
}

animate();

});

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%*&";

const fontSize = 16;
let columns = canvas.width / fontSize;

const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

/* =====================
   ADAPTIVE STATE
===================== */

const matrixState = {
  speed: 35,
  brightness: 0.7,
  chaos: 0.02
};

/* =====================
   DRAW MATRIX
===================== */

function drawMatrix() {

  ctx.fillStyle = `rgba(0,0,0,${matrixState.chaos})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `rgba(0,255,170,${matrixState.brightness})`;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {

    const text =
      letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (
      drops[i] * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i] += cursorInfluence(i * fontSize, drops[i] * fontSize);
  }
}

function matrixLoop() {
  drawMatrix();
  setTimeout(matrixLoop, matrixState.speed);
}

matrixLoop();

/* ======================
   MATRIX CONTROL API
====================== */

window.matrixControl = {

  typing() {
    matrixState.speed = 15;
    matrixState.brightness = 1;
  },

  thinking() {
    matrixState.speed = 28;
    matrixState.brightness = 0.8;
  },

  calm() {
    matrixState.speed = 45;
    matrixState.brightness = 0.5;
  },

  accessGranted() {
    matrixState.brightness = 1.5;

    setTimeout(() => {
      matrixState.brightness = 0.7;
    }, 600);
  }

};