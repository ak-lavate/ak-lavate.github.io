const lines = [
"Connecting to behavioral engine...",
"",
"Collecting interaction signals...",
"Analyzing visitor intent...",
"Mapping cognitive response...",
"",
"Human presence detected.",
"",
"Calculating Trust Score...",
"",
"Trust Score: 27%",
"Risk Profile: UNKNOWN",
"",
"⚠ ACCESS LEVEL: RESTRICTED",
"",
"Akash Lavate Interface Locked",
"",
"Authorized launch pending..."
];

let line = 0;
let char = 0;
const speed = 28;
const output = document.getElementById("output");

function typeLine() {
    if (line < lines.length) {

        if (char < lines[line].length) {
            output.textContent += lines[line].charAt(char);
            char++;
            setTimeout(typeLine, speed);
        } else {
            output.textContent += "\n";
            line++;
            char = 0;
            setTimeout(typeLine, 300);
        }
    }
}

setTimeout(typeLine, 800);