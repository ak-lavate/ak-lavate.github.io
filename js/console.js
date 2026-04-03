const consoleEl = document.getElementById("console");
const input = document.getElementById("console-input");
const output = document.getElementById("console-output");

/* -------------------------
   SHOW / HIDE CONSOLE
-------------------------- */

// Open console with "~" key
document.addEventListener("keydown", (e) => {
    if (e.key === "`") {   // press ~ or `
        consoleEl.classList.toggle("hidden");
        input.focus();
    }
});


/* -------------------------
   PRINT FUNCTION
-------------------------- */

function print(text) {
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
}


/* -------------------------
   COMMAND SYSTEM
-------------------------- */

const commands = {

    help: () => {
        print("Available commands:");
        print("help  → show commands");
        print("about → who am I");
        print("clear → clear console");
        print("skills → show skills");
        print("contact → contact info");
        print("matrix → activate mode");
        print("github → information");
        print("whoami → reveal identity");
    },

    about: () => {
        print("Akash Lavate");
        print("Cybersecurity | Social Engineering");
        print("Human psychology enthusiast.");
    },

    

    skills: () => {
        print("• Cybersecurity");
        print("• Social Engineering");
        print("• Digital Marketing");
        print("• Web Development");
    },

    contact: () => {
        print("Email: your@email.com");
        print("LinkedIn: linkedin.com/in/yourprofile");
    },

    clear: () => {
        output.innerHTML = "";
    },

    matrix: () => {
        document.body.classList.toggle("matrix-mode");
        print("Matrix mode toggled.");
    },

    github: () => {
        print("GitHub profile not deployed yet.");
        print("Repository coming soon..."); 
    },

    whoami: () => {

    const profile = [
        "Resolving identity...",
        "",
        "Identity: AK Lavate",
        "Role: Cybersecurity Specialist",
        "Focus: Social Engineering & Behavioral Security",
        "Domain: Human-Centric Security",
        "Status: ACTIVE",
        "Clearance Level: Human Layer Analyst"
    ];

    let i = 0;

    function reveal(){
        if(i < profile.length){
            print(profile[i]);
            i++;
            setTimeout(reveal, 250);
        }
    }

    reveal();
},
};

/* -------------------------
   COMMAND HISTORY
-------------------------- */

let history = [];
let historyIndex = -1;

/* -------------------------
   INPUT HANDLER
-------------------------- */

input.addEventListener("keydown", function(e) {

    // ENTER → run command
    if (e.key === "Enter") {

        const cmd = input.value.trim().toLowerCase();

        if (!cmd) return;

        history.push(cmd);
        historyIndex = history.length;

        print("> " + cmd);

        if (commands[cmd]) {
            commands[cmd]();
        } else {
            print("Command not found. Type 'help'");
        }

        input.value = "";
    }

    // ARROW UP → previous command
    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
    }

    // ARROW DOWN → next command
    if (e.key === "ArrowDown") {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            input.value = "";
        }
    }

});