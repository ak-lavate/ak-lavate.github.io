/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior:"smooth"
            });
    });
});


/* Reveal Animation */
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".section").forEach(sec=>{
    observer.observe(sec);
});


/* Glow Cursor */
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{
    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";
});

let movements = 0;
let startedIntel = false;

/* Track interaction */
document.addEventListener("mousemove", ()=>{
    movements++;
});

/* Detect when section visible */
const intelSection = document.querySelector("#intelligence");

const intelObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting && !startedIntel){
            startedIntel = true;
            runIntelligence();
        }
    });
});

intelObserver.observe(intelSection);


function runIntelligence(){

    const status = document.getElementById("status");
    const interaction = document.getElementById("interaction");
    const focus = document.getElementById("focus");
    const trust = document.getElementById("trust");
    const risk = document.getElementById("risk");
    const bar = document.getElementById("progress-bar");

    status.textContent = "Scanning behavior...";

    let progress = 0;

    const scan = setInterval(()=>{

        progress += 2;

        bar.style.width = progress + "%";

        interaction.textContent = Math.min(progress,100) + "%";
        focus.textContent = Math.min(progress*0.9,100).toFixed(0)+"%";
        trust.textContent = Math.min(progress*0.8 + 10,100).toFixed(0)+"%";

        if(progress >= 100){

            clearInterval(scan);

            status.textContent = "Analysis Complete";

            if(movements > 200){
                risk.textContent = "LOW";
            }else if(movements > 80){
                risk.textContent = "MODERATE";
            }else{
                risk.textContent = "UNKNOWN";
            }
        }

    },60);
}

/* ===== COMMAND CONSOLE ===== */

const consoleBox = document.getElementById("console");
const input = document.getElementById("console-input");
const output = document.getElementById("console-output");

/* Open console using ` key */
document.addEventListener("keydown",(e)=>{
    if(e.key === "`"){
        consoleBox.classList.toggle("hidden");
        input.focus();
    }
});

function print(text){
    output.innerHTML += "<div>"+text+"</div>";
    output.scrollTop = output.scrollHeight;
}

const commands = {

help: () => `
Available Commands:
about
skills
projects
contact
clear
unlock
`,

about: () => "AK Lavate — Cybersecurity Specialist focused on Social Engineering & Behavioral Security.",

skills: () => `
Penetration Testing
OSINT Intelligence
Social Engineering
Digital Marketing Strategy
Behavioral Analysis
`,

projects: () => "Projects interface loading soon.",

contact: () => "Secure channel: contact@ak-lavate.tech",

unlock: () => "Interface already unlocked. Welcome.",

clear: () => {
    output.innerHTML="";
    return "";
}

};

input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){

        const cmd = input.value.trim().toLowerCase();

        print("> "+cmd);

        if(commands[cmd]){
            const result = commands[cmd]();
            if(result) print(result);
        }else{
            print("Unknown command. Type 'help'");
        }

        input.value="";
    }
});

/* ===== ADAPTIVE SYSTEM ===== */

let mouseSpeedSamples = [];
let lastX = 0;
let lastY = 0;
let scrollCount = 0;
let startTime = Date.now();

/* Track mouse speed */
document.addEventListener("mousemove",(e)=>{

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    const speed = Math.sqrt(dx*dx + dy*dy);

    mouseSpeedSamples.push(speed);

    lastX = e.clientX;
    lastY = e.clientY;
});

/* Track scroll */
document.addEventListener("scroll",()=>{
    scrollCount++;
});


setTimeout(analyzeVisitor,8000);

function analyzeVisitor(){

    const avgSpeed =
        mouseSpeedSamples.reduce((a,b)=>a+b,0) /
        (mouseSpeedSamples.length || 1);

    const timeSpent = (Date.now() - startTime)/1000;

    let type, style, engagement, color;

    /* Personality logic */
    if(avgSpeed > 15){
        type = "Analytical Explorer";
        style = "High Precision Movement";
        color = "#00ffa6";
    }
    else if(scrollCount > 20){
        type = "Curious Researcher";
        style = "Deep Navigation";
        color = "#00d9ff";
    }
    else{
        type = "Observer";
        style = "Calm Interaction";
        color = "#a066ff";
    }

    if(timeSpent > 20){
        engagement = "Highly Engaged";
    }else{
        engagement = "Quick Scanner";
    }

    /* Update UI */
    document.getElementById("visitorType").textContent = type;
    document.getElementById("interactionStyle").textContent = style;
    document.getElementById("engagement").textContent = engagement;

    /* Adaptive theme glow */
    document.documentElement.style.setProperty(
        "--accent-color",
        color
    );

    document.querySelectorAll(".card").forEach(card=>{
        card.style.borderColor = color;
    });
}

/* ===== CINEMATIC BACKGROUND ===== */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

let lines = [];

for(let i=0;i<60;i++){
    lines.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        speed:0.2 + Math.random()*0.5,
        length:50 + Math.random()*120
    });
}

function animateBG(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="rgba(0,255,166,0.15)";
    ctx.lineWidth=1;

    lines.forEach(line=>{

        ctx.beginPath();
        ctx.moveTo(line.x,line.y);
        ctx.lineTo(line.x,line.y+line.length);
        ctx.stroke();

        line.y += line.speed;

        if(line.y > canvas.height){
            line.y = -line.length;
            line.x = Math.random()*canvas.width;
        }
    });

    requestAnimationFrame(animateBG);
}

animateBG();

/* ===== RECRUITER MODE ===== */

const recruiterPanel = document.getElementById("recruiterMode");

document.addEventListener("keydown",(e)=>{

    if(e.shiftKey && e.key.toLowerCase() === "r"){
        recruiterPanel.classList.remove("hidden");
    }

});

function closeRecruiter(){
    recruiterPanel.classList.add("hidden");
}

/* ===== OSINT DOSSIER ANIMATION ===== */

const dossierObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){

            entry.target.querySelectorAll(".bar span")
            .forEach(bar=>{
                const width = bar.getAttribute("style");
                bar.style.width = width.split(":")[1];
            });

        }
    });
});

document.querySelectorAll("#osint").forEach(sec=>{
    dossierObserver.observe(sec);
});