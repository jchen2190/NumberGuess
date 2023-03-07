let playerGuess = ""
let riddlesComplete = 0;
let gamesPlayed = 1
let guesses = 0;

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
    this.style.display = "none"; // hide the Play button
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
let count = 1;
function evalGuess() {
    
    playerGuess = input.value;
    userInputs.innerHTML = `<br> &nbsp;  ${count} ${input.value} ${userInputs.innerHTML}`;
    count++;
    console.log('guesses', guesses);
    console.log('matchriddle', matchRiddle);

    if (playerGuess.toLowerCase().includes(matchRiddle.answer) || playerGuess.toLowerCase() === matchRiddle.answer2) {
        riddlesComplete++;
        input.style.borderColor = "var(--green-emerald)";
        // input.style.color = "#fff"
        feedback.innerHTML = "You got it!";
        guessBtn.style.display = "none";
        skipBtn.style.display = "none";
        nextBtn.style.display = "inline";       
    } else {
        feedback.innerHTML = "Try again!";
        input.style.borderColor = "var(--red)";
        // input.style.color = "#fff";
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
    // input.style.backgroundColor = "#fff";
    // input.style.color = "black";
    input.value = "";
    userInputs.innerHTML = "";

}

function nextRiddle() {
    matchRiddle = riddles.pop();
    currentRiddle.textContent = matchRiddle.riddle;
    guessBtn.style.display = "inline";
    skipBtn.style.display = "inline";
    nextBtn.style.display = "none";
    feedback.innerHTML = "";
    input.style.color = "black";
    input.style.backgroundColor = "white";
    input.value = "";
    userInputs.innerHTML = "";
}

// function resetGame() {
//     playerGuess = 0;
//     guesses = 7;
//     input.value = 0;
//     input.style.display = "none"; // show the GUESS button
//     guessBtn.style.display = "none";
//     playBtn.style.display = "inline-block";
//     playBtn.textContent = "PLAY AGAIN";
//     // update footer (Games Played and Guess Average)
//     gamesPlayed++;
//     guessAvg = totalGuesses / gamesPlayed;
//     // output (Games Played and Guess Average) to footer
//     totGamesSpan.textContent = gamesPlayed;
//     guessAvgSpan.textContent = guessAvg.toFixed(2);
// }
