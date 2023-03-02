let playerGuess = ""
let riddlesComplete = 0;
let gamesPlayed = 0
let guessAvg = 0
let totalGuesses = 0;

const guessBtn = document.getElementById('guess-btn');
const skipBtn = document.getElementById('skip-btn');
const playBtn = document.getElementById('play-btn');
skipBtn.addEventListener('click', skipGame);
guessBtn.addEventListener('click', evalGuess);
playBtn.addEventListener('click', playGame);

let input = document.querySelector('input');
const currentRiddle = document.getElementById('riddle');
const feedback = document.getElementById('feedback');
const totGamesSpan = document.getElementById('tot-games-span');
const guessAvgSpan = document.getElementById('guess-avg-span');

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
        // console.log('riddlesCopy', riddlesCopy);
    }
    console.log(riddles);
    currentRiddle.textContent = riddles.pop().riddle;

}   

function skipGame() {

}



function evalGuess() {
    totalGuesses++;
    playerGuess = input.value;
    console.log(playerGuess);
    console.log(riddles);

    if (playerGuess == riddles.answer) {
        feedback.innerHTML = `You got it right! <br/>You guessed it in ${guesses} tries!`;
        riddlesComplete++;

        return resetGame();
    } else {
        feedback.innerHTML = `Your guess is incorrect. <br/>Try again!`;
    }
}

    // if(guesses == 0) { // game over
    //     feedback.textContent = `You are out of guesses! Try Again!`
    //    resetGame();
    // }


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