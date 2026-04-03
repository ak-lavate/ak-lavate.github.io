const Intelligence = {

  init() {
    this.detectVisitor();
    this.detectDevice();
    this.detectTimeContext();
  },

  // -------- VISITOR MEMORY --------
  detectVisitor() {

    const visited = localStorage.getItem("ak_visitor");

    if (!visited) {
      localStorage.setItem("ak_visitor", "known");
      this.log("New entity detected...");
    } else {
      this.log("Returning profile recognized...");
    }
  },

  // -------- DEVICE ANALYSIS --------
  detectDevice() {

    const device = /Mobi|Android/i.test(navigator.userAgent)
      ? "Mobile Interface"
      : "Desktop Interface";

    this.log("Interface Mode: " + device);
  },

  // -------- TIME PSYCHOLOGY --------
  detectTimeContext() {

    const hour = new Date().getHours();

    if (hour >= 0 && hour < 6)
      this.log("Late-night activity detected...");
    else if (hour < 12)
      this.log("Morning cognitive window active...");
    else if (hour < 18)
      this.log("Daytime operational mode...");
    else
      this.log("Evening analysis session...");
  },

  // -------- OUTPUT SYSTEM --------
  log(message) {

    const consoleBox = document.getElementById("intelLog");
    if (!consoleBox) return;

    const line = document.createElement("div");
    line.textContent = "> " + message;

    consoleBox.appendChild(line);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Intelligence.init();
});

setTimeout(() => {
  const log = document.getElementById("intelLog");
  if (log) log.style.display = "none";
}, 5000);