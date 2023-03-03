let playerGuess = ""
let riddlesComplete = 0;
let gamesPlayed = 1
let guesses = 0;

const guessBtn = document.getElementById('guess-btn');
const skipBtn = document.getElementById('skip-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
skipBtn.addEventListener('click', skipGame);
guessBtn.addEventListener('click', evalGuess);
playBtn.addEventListener('click', playGame);
nextBtn.addEventListener('click', nextRiddle);

let input = document.querySelector('input');
const currentRiddle = document.getElementById('riddle');
const feedback = document.getElementById('feedback');
const totRiddles = document.getElementById('tot-riddles');
const guessAvg = document.getElementById('guess-avg');

function playGame() {
    this.style.display = "none"; // hide the Play button
    input.style.display = "block"; 
    skipBtn.style.display = "inline";
    guessBtn.style.display = "inline";
    feedback.style.display = "inline-block";

    if(currentRiddle.textContent == "") {
        startGame();
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
    // console.log('matchRiddle', matchRiddle);
    // console.log('riddles', riddles);
}   

function evalGuess() {
    
    playerGuess = input.value;
    console.log('playerguess', playerGuess);
    console.log('riddlesCopy', riddlesCopy);
    console.log('matchriddle', matchRiddle);
    console.log('riddles', riddles);
    console.log('answer', riddles.answer);

    for (let i = 0; i < riddlesCopy.length; i++) {
        if (playerGuess.toLowerCase() == matchRiddle.answer) {
            riddlesComplete++;
            feedback.innerHTML = "You got it!";
            guessBtn.style.display = "none";
            skipBtn.style.display = "none";
            nextBtn.style.display = "inline";
        } else {
            feedback.innerHTML = "Try again!";
        }
    }
    if(riddles == "") {
        feedback.innerHTML = "Congrats! You've finished all the riddles!"
        nextBtn.style.display = "none"
    }
    guesses++;

}
function skipGame() {

}
function nextRiddle() {
    matchRiddle = riddles.pop();
    currentRiddle.textContent = matchRiddle.riddle;
    guessBtn.style.display = "inline";
    skipBtn.style.display = "inline";
    nextBtn.style.display = "none";
    feedback.innerHTML = "";
}

function resetGame() {
    playerGuess = 0;
    guesses = 7;
    input.value = 0;
    input.style.display = "none"; // show the GUESS button
    guessBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    playBtn.textContent = "PLAY AGAIN";
    // update footer (Games Played and Guess Average)
    gamesPlayed++;
    guessAvg = totalGuesses / gamesPlayed;
    // output (Games Played and Guess Average) to footer
    totGamesSpan.textContent = gamesPlayed;
    guessAvgSpan.textContent = guessAvg.toFixed(2);
}
