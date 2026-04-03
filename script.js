/* MATRIX SAFE CALL */
function matrixAction(action) {
  if (window.matrixControl && matrixControl[action]) {
    matrixControl[action]();
  }
}

function neuralAction(action){
  if(window.neuralControl && neuralControl[action]){
    neuralControl[action]();
  }
}

const output = document.getElementById("output");

const lines = [
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

let line = 0;
let char = 0;

function typeEffect(){

    if(line < lines.length){

        if(char < lines[line].length){

            matrixAction("typing");
            neuralAction("typing");
            

            output.textContent += lines[line].charAt(char);
            char++;

            if(lines[line] === "Access granted." && char === lines[line].length){
                matrixAction("accessGranted");
                neuralAction("accessGranted");
            }

            setTimeout(typeEffect,25);

        }else{

            matrixAction("thinking");
            neuralAction("thinking");

            output.textContent += "\n";
            line++;
            char=0;
            setTimeout(typeEffect,250);
        }
    }
}

typeEffect();

setTimeout(()=>{
    matrixAction("calm");
    neuralAction("calm");
    window.location.href="home.html";
},8000);