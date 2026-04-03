const bootText = [
  "Initializing AK-LAVATE Interface...",
  "Loading Intelligence Core...",
  "Establishing Secure Connection...",
  "Authenticating Visitor...",
  "Access Granted."
];

let i = 0;

function bootSequence() {
  const boot = document.getElementById("boot");
  const screen = document.getElementById("bootScreen");

  if (!boot || !screen) {
    console.log("Boot elements not found");
    return;
  }

  if (i < bootText.length) {
    const line = document.createElement("div");
    line.textContent = bootText[i];
    boot.appendChild(line);
    i++;
    setTimeout(bootSequence, 800);
  } else {
    setTimeout(() => {
      screen.style.display = "none";
    }, 800);
  }
}

document.addEventListener("DOMContentLoaded", bootSequence);