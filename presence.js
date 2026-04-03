let lastMove = Date.now();

document.addEventListener("mousemove", () => {
  lastMove = Date.now();
  document.body.classList.remove("idle");
});

setInterval(() => {
  if (Date.now() - lastMove > 5000) {
    document.body.classList.add("idle");
    console.log("User idle detected");
  }
}, 1000);