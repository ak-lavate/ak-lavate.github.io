/* ==============================================
   SCRIPT.JS — index.html ONLY
   Typewriter boot sequence + redirect to home.html.
   DO NOT load this file in home.html.
   Load order: after matrix.js and adaptiveMatrix.js
============================================== */

function matrixAction(action) {
  if (window.matrixControl && window.matrixControl[action]) {
    window.matrixControl[action]();
  }
}

function neuralAction(action) {
  if (window.neuralControl && window.neuralControl[action]) {
    window.neuralControl[action]();
  }
}

const _bootOutput = document.getElementById("output");

const _bootLines = [
  "Initializing behavioral engine...",
  "",
  "Scanning visitor environment...",
  "Analyzing interaction intent...",
  "",
  "Human presence confirmed.",
  "",
  "Trust Index Calculated: 91%",
  "",
  "Loading AK Lavate Interface...",
  "",
  "Access granted."
];

let _bootLine = 0;
let _bootChar = 0;

function typeEffect() {
  if (_bootLine >= _bootLines.length) return;

  if (_bootChar < _bootLines[_bootLine].length) {
    matrixAction("typing");
    neuralAction("typing");

    _bootOutput.textContent += _bootLines[_bootLine].charAt(_bootChar++);

    if (
      _bootLines[_bootLine] === "Access granted." &&
      _bootChar === _bootLines[_bootLine].length
    ) {
      matrixAction("accessGranted");
      neuralAction("accessGranted");
    }

    setTimeout(typeEffect, 25);

  } else {
    matrixAction("thinking");
    neuralAction("thinking");
    _bootOutput.textContent += "\n";
    _bootLine++;
    _bootChar = 0;
    setTimeout(typeEffect, 250);
  }
}

typeEffect();

setTimeout(() => {
  matrixAction("calm");
  neuralAction("calm");
  window.location.href = "home.html";
}, 8000);