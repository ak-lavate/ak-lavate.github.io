console.log("HOME JS LOADED");

/* ======================
   DYNAMIC ROLE SYSTEM
====================== */

const roles = [
  "Cybersecurity Specialist",
  "Social Engineering Analyst",
  "Behavioral Intelligence Researcher",
  "Human Layer Hacker"
];

let r = 0;
const roleEl = document.getElementById("dynamic-role");

if(roleEl){
setInterval(()=>{
  roleEl.style.opacity = 0;

  setTimeout(()=>{
    roleEl.textContent = roles[r];
    roleEl.style.opacity = 1;
    r = (r + 1) % roles.length;
  },400);

},2500);
}


/* ======================
   INTELLIGENCE LOG
====================== */

const intelLog = document.getElementById("intelLog");

if(intelLog){

const logs = [
  "Visitor connected.",
  "Behavioral pattern detected.",
  "Attention level increasing.",
  "Curiosity index rising.",
  "Interface adapting..."
];

let l = 0;

setInterval(()=>{
  const log = document.createElement("div");
  log.textContent = logs[l];
  intelLog.appendChild(log);

  intelLog.scrollTop = intelLog.scrollHeight;

  l = (l+1) % logs.length;
},3000);

}


/* ======================
   SECTION REVEAL
====================== */

const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window && sections.length > 0) {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  sections.forEach(sec => observer.observe(sec));
}


/* ======================
   THREAT LEVEL SYSTEM
====================== */

const levels = ["LOW","MONITORING","ANALYZING"];

setInterval(()=>{
 const el = document.getElementById("threatLevel");
 if(el){
   el.textContent =
     "Threat Level: " +
     levels[Math.floor(Math.random()*levels.length)];
 }
},5000);


/* ======================
   SCROLL INTELLIGENCE
====================== */

window.addEventListener("scroll", () => {

  const progress =
    (window.scrollY /
    (document.body.scrollHeight - window.innerHeight)) * 100;

  const bar = document.getElementById("progress-bar");

  if(bar){
    bar.style.width = progress + "%";
  }
});


/* ======================
   BEHAVIORAL AI SYSTEM
====================== */

const hud = document.querySelector(".system-hud");

/* SMART AI MESSAGE SYSTEM */

const aiCooldown = {};
const MESSAGE_DELAY = 4000; // prevent spam (4s)

window.aiMessage = function(text){

  if(!hud) return;

  const now = Date.now();

  // stop repeated messages
  if(aiCooldown[text] && now - aiCooldown[text] < MESSAGE_DELAY){
    return;
  }

  aiCooldown[text] = now;

  const msg = document.createElement("span");
  msg.textContent = text;
  msg.classList.add("ai-msg");

  hud.appendChild(msg);

  while(hud.children.length > 4){
    hud.removeChild(hud.children[0]);
  }
};

/* --- Visitor Arrival --- */
setTimeout(()=>{
  aiMessage("VISITOR DETECTED");
},2000);


/* --- Idle Detection --- */
let idleTimer;

function resetIdle(){
  clearTimeout(idleTimer);

  idleTimer = setTimeout(()=>{
    aiMessage("USER IDLE...");
  },8000);
}

["mousemove","keydown","scroll"].forEach(event=>{
  window.addEventListener(event, resetIdle);
});

resetIdle();


/* --- Focus Detection --- */
document.addEventListener("visibilitychange", () => {
  if(document.hidden){
    aiMessage("FOCUS LOST");
  } else {
    aiMessage("FOCUS RESTORED");
  }
});


/* --- Fast Scroll Detection --- */
let lastScroll = 0;
let engagementCooldown = false;

window.addEventListener("scroll", ()=>{

  const speed = Math.abs(window.scrollY - lastScroll);

  if(speed > 120 && !engagementCooldown){

    aiMessage("HIGH ENGAGEMENT DETECTED");

    engagementCooldown = true;

    setTimeout(()=>{
      engagementCooldown = false;
    },6000); // allow again after 6 sec
  }

  lastScroll = window.scrollY;
});

/* ======================
   HACKER AVATAR MATRIX
====================== */

const matrixCanvas = document.getElementById("matrix-overlay");

if(matrixCanvas){

const ctx = matrixCanvas.getContext("2d");

matrixCanvas.width = matrixCanvas.offsetWidth;
matrixCanvas.height = matrixCanvas.offsetHeight;

const chars = "01AKCYBERSECURITY";
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;

const drops = [];

for(let i=0;i<columns;i++){
    drops[i]=1;
}

function drawMatrix(){

    ctx.fillStyle="rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,
        matrixCanvas.width,
        matrixCanvas.height
    );

    ctx.fillStyle="#00ffaa";
    ctx.font=fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
            chars[Math.floor(Math.random()*chars.length)];

        ctx.fillText(text,i*fontSize,drops[i]*fontSize);

        if(drops[i]*fontSize > matrixCanvas.height &&
           Math.random()>0.975){
            drops[i]=0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix,40);

}

/* ======================
   VISITOR AWARENESS
====================== */

setTimeout(()=>{

  const hud = document.querySelector(".system-hud");

  if(hud){
    const msg = document.createElement("span");
    msg.textContent = "VISITOR TRUST ESTABLISHED";
    hud.appendChild(msg);
  }

},10000);

console.log("HOME JS FINISHED");

/* ======================
   VISITOR PROFILING AI
====================== */

const visitorTypeEl = document.getElementById("visitorType");
const interactionStyleEl = document.getElementById("interactionStyle");
const engagementEl = document.getElementById("engagement");

let interactionScore = 0;
let scrollEvents = 0;
let mouseMoves = 0;
let idleState = false;

/* ---- Interaction Tracking ---- */

window.addEventListener("mousemove", () => {
  mouseMoves++;
  interactionScore += 1;
});

window.addEventListener("click", () => {
  interactionScore += 3;
});

window.addEventListener("scroll", () => {
  scrollEvents++;
  interactionScore += 2;
});

/* ---- Idle Detection Hook ---- */

setInterval(()=>{
  idleState = true;
},10000);

["mousemove","keydown","scroll"].forEach(evt=>{
  window.addEventListener(evt, ()=> idleState = false);
});


/* ---- DevTools Detection (Psychological Easter Egg 😎) ---- */

let devtoolsOpen = false;

setInterval(()=>{
  const threshold = 160;
  if(
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ){
    devtoolsOpen = true;
  }
},2000);


/* ---- Profiling Engine ---- */

function analyzeVisitor(){

  if(!visitorTypeEl) return;

  let visitorType = "Observer";
  let interactionStyle = "Passive";
  let engagement = "LOW";

  /* Visitor Type Logic */

  if(devtoolsOpen){
    visitorType = "Technical User";
  }
  else if(scrollEvents > 25){
    visitorType = "Explorer";
  }
  else if(mouseMoves > 80){
    visitorType = "Analyst";
  }

  /* Interaction Style */

  if(idleState){
    interactionStyle = "Idle Monitoring";
  }
  else if(interactionScore > 120){
    interactionStyle = "Highly Interactive";
  }
  else if(interactionScore > 50){
    interactionStyle = "Engaged";
  }

  /* Engagement Level */

  if(interactionScore > 150){
    engagement = "HIGH";
  }
  else if(interactionScore > 60){
    engagement = "MEDIUM";
  }

  visitorTypeEl.textContent = visitorType;
  interactionStyleEl.textContent = interactionStyle;
  engagementEl.textContent = engagement;

}

/* Run analysis every 4 sec */
setInterval(analyzeVisitor,4000);

/* ======================
   RECRUITER DETECTION MODE
====================== */

let recruiterScore = 0;
let recruiterActivated = false;

/* --- Section Visit Tracking --- */
const recruiterSections = ["about","skills","projects","contact"];

recruiterSections.forEach(id => {
  const section = document.getElementById(id);

  if(section){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          recruiterScore += 2;
          checkRecruiter();
        }
      });
    }, { threshold: 0.6 });

    obs.observe(section);
  }
});


/* --- Long Focus Detection --- */
let focusStart = Date.now();

window.addEventListener("focus", ()=>{
  focusStart = Date.now();
});

window.addEventListener("blur", ()=>{
  const focusTime = Date.now() - focusStart;

  if(focusTime > 15000){ // 15 sec focus
    recruiterScore += 3;
    checkRecruiter();
  }
});


/* --- Slow Scroll Behavior --- */
let lastScrollTime = Date.now();

window.addEventListener("scroll", ()=>{
  const now = Date.now();

  if(now - lastScrollTime > 1500){
    recruiterScore += 1; // thoughtful scrolling
    checkRecruiter();
  }

  lastScrollTime = now;
});


/* --- Recruiter Activation --- */
function checkRecruiter(){

  if(recruiterActivated) return;

  if(recruiterScore >= 8){

    recruiterActivated = true;

    aiMessage("RECRUITER PROFILE DETECTED");

    const panel = document.getElementById("recruiterMode");

    if(panel){
      panel.classList.remove("hidden");
    }
  }
}