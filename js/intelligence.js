/* ==============================================
   INTELLIGENCE.JS
   Runs on DOMContentLoaded.
   Detects: returning visitor, device type, time of day.
   Writes initial log lines to #intelLog.
============================================== */

const Intelligence = {

  init() {
    this.detectVisitor();
    this.detectDevice();
    this.detectTimeContext();
  },

  detectVisitor() {
    const visited = localStorage.getItem("ak_visitor");
    if (!visited) {
      localStorage.setItem("ak_visitor", "known");
      this.log("New entity detected...");
    } else {
      this.log("Returning profile recognized...");
    }
  },

  detectDevice() {
    const device = /Mobi|Android/i.test(navigator.userAgent)
      ? "Mobile Interface"
      : "Desktop Interface";
    this.log("Interface Mode: " + device);
  },

  detectTimeContext() {
    const hour = new Date().getHours();
    if      (hour < 6)  this.log("Late-night activity detected...");
    else if (hour < 12) this.log("Morning cognitive window active...");
    else if (hour < 18) this.log("Daytime operational mode...");
    else                this.log("Evening analysis session...");
  },

  log(message) {
    const box = document.getElementById("intelLog");
    if (!box) return;
    const line = document.createElement("div");
    line.textContent = "> " + message;
    box.appendChild(line);
  }
};

document.addEventListener("DOMContentLoaded", () => Intelligence.init());

/* BUG FIXED: original had setTimeout(() => log.style.display = "none", 5000).
   home.js appends to #intelLog every 3 seconds indefinitely. Hiding the element
   with display:none caused home.js to keep writing to an invisible node, and
   the log panel would permanently disappear 5 seconds after load.
   Fix: removed the hide timeout entirely. The CSS opacity/positioning handles
   the visual subtlety of the log panel without breaking the write loop. */