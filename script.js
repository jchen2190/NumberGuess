let playerGuess = ""
let riddlesComplete = 0;
let gamesPlayed = 1
let guesses = 0;
let guessCount = 1;

const guessBtn = document.getElementById('guess-btn');
const skipBtn = document.getElementById('skip-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
skipBtn.addEventListener('mouseup', skipGame);
guessBtn.addEventListener('mouseup', evalGuess);
playBtn.addEventListener('mouseup', playGame);
nextBtn.addEventListener('mouseup', nextRiddle);

let input = document.querySelector('input');
const currentRiddle = document.getElementById('riddle');
const feedback = document.getElementById('feedback');
const userInputs = document.getElementById('user-inputs');
const guessAvg = document.getElementById('guess-avg');

function playGame() {
    this.style.display = "none";
    input.style.display = "block"; 
    skipBtn.style.display = "inline";
    guessBtn.style.display = "inline";
    feedback.style.display = "inline-block";
    startGame();
}

function checkKey(e){
    if (e.key === "Enter" && guessBtn.style.display != "none"){
        evalGuess();
    } else if (e.key === "Enter" && nextBtn.style.display != "none"){
        nextRiddle();
    }
}

const riddlesCopy = [...riddles];
let matchRiddle = "";

function startGame() {
    // Fisher-Yates Shuffle
    for (let i = 0; i < riddles.length; i++) {
        let riddlesCopy = riddles[i];
        let r = Math.floor(Math.random() * riddles.length);
        riddles[i] = riddles[r];
        riddles[r] = riddlesCopy;
    }
    matchRiddle = riddles.pop();
    currentRiddle.textContent = matchRiddle.riddle;
}   

function evalGuess() {
    playerGuess = input.value;
    userInputs.innerHTML = `<br> &nbsp;  ${guessCount} ${input.value} ${userInputs.innerHTML}`;
    guessCount++;
    console.log('matchriddle', matchRiddle);

    if (playerGuess.toLowerCase().includes(matchRiddle.answer) || playerGuess.toLowerCase() === matchRiddle.answer2) {
        riddlesComplete++;
        input.style.borderColor = "var(--green-emerald)";
        feedback.innerHTML = "You got it!";
        guessBtn.style.display = "none";
        skipBtn.style.display = "none";
        nextBtn.style.display = "inline";
    } else {
        feedback.innerHTML = "Try again!";
        input.style.borderColor = "var(--red)";
        input.classList.add("shake");
        input.addEventListener("animationend", function() {
            input.classList.remove("shake");
        })
    }

    if(riddles == "") {
        feedback.innerHTML = "Congrats! You've finished all the riddles!"
        nextBtn.style.display = "none"
    }
}

function skipGame() {
    riddles.unshift(matchRiddle);
    matchRiddle = riddles.pop();
    currentRiddle.textContent = matchRiddle.riddle;
    feedback.innerHTML = "";
    input.style.borderColor = "black";
    input.value = "";
    userInputs.innerHTML = "";
    guessCount = 1;
}

function nextRiddle() {
    matchRiddle = riddles.pop();
    currentRiddle.textContent = matchRiddle.riddle;
    guessBtn.style.display = "inline";
    skipBtn.style.display = "inline";
    nextBtn.style.display = "none";
    feedback.innerHTML = "";
    input.style.borderColor = "black";
    input.value = "";
    userInputs.innerHTML = "";
    guessCount = 1;
}