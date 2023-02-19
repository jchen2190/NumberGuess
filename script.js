let randNum = 0
let playerGuess = 0
let guessesLeft = 7;
let gamesPlayed = 0
let guessAvg = 0
let totalGuesses = 0;

const playBtn = document.getElementById('play-btn');
const guessBtn = document.getElementById('guess-btn');
playBtn.addEventListener('click', playGame);
guessBtn.addEventListener('click', evalGuess);

let guessBox = document.querySelector('input');

const feedbackH2 = document.getElementById('feedback');
const totGamesSpan = document.getElementById('tot-games-span');
const guessAvgSpan = document.getElementById('guess-avg-span');



function playGame() {
    randNum = Math.ceil(Math.random()*100); // 1-100
    console.log('randNum', randNum);
    this.style.display = "none"; // hide the PLAY button
    guessBox.style.display = "inline"; // show the GUESS button
    guessBtn.style.display = "inline";
    feedbackH2.style.display = "inline-block";
    feedbackH2.innerHTML = `Guess the mystery number from 1-100! <br>You have ${guessesLeft} guesses.`
}

function evalGuess() {
    totalGuesses++; // total guess +1
    guessesLeft--; // -1 guess left
    playerGuess = Number(guessBox.value); // get the player's guess (number)
    // compare the player's guess to the mystery number
    if (playerGuess < randNum) {
        feedbackH2.innerHTML = `Your Guess is too LOW! <br/>You have ${guessesLeft} left!`;
    } else if (playerGuess > randNum) {
        feedbackH2.innerHTML = `Your Guess is too HIGH! <br/>You have ${guessesLeft} left!`;
    } else {
        feedbackH2.innerHTML = `Congrats! You guessed the mystery number: ${randNum}! <br/>You got it in ${7-guessesLeft} guesses!`;
        // reset the game
        resetGame();
    }

    if(guessesLeft == 0) { // game over
        feedback.textContent = `You are out of guesses! GAME OVER!`
        gameOver();
    }
}

function resetGame() {
    playerGuess = 0;
    guessesLeft = 7;
    guessBox.value = 0;
    guessBox.style.display = "none"; // show the GUESS button
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

function gameOver() {
    playerGuess = 0;
    guessesLeft = 7;
    guessBox.value = 0;
    guessBox.style.display = "none"; // show the GUESS button
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