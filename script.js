const wordList = ['amuse', 'laugh', 'humor', 'silly', 'funny', 'watch', 'witty', 'irony', 'comic', 'joker'];
let targetWord = getRandomWord();
const maxAttempts = 6;
let currentAttempt = 0;
let gameOver = false;

function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

document.getElementById('guessButton').addEventListener('click', handleGuess);

function handleGuess() {
    if (gameOver) return;
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.toLowerCase().trim();

    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    if (guess === targetWord) {
        document.getElementById('result').textContent = 'Congratulations, you guessed the word!';
        endGame();
    } else {
        showFeedback(guess);
        currentAttempt++;
        if (currentAttempt >= maxAttempts) {
            document.getElementById('result').textContent = 'Game Over! The word was ' + targetWord + '.';
            endGame();
        }
    }

    guessInput.value = ''; // Clear the input field
}

function endGame() {
    document.getElementById('guessButton').disabled = true;
    document.getElementById('restartButton').style.display = 'inline-block';
    gameOver = true;
}

function showFeedback(guess) {
    const guessRows = document.getElementById('guessRows');
    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < 5; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const letter = guess[i];
        
        if (letter === targetWord[i]) {
            cell.classList.add('correct');
        } else if (targetWord.includes(letter)) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }

        cell.textContent = letter.toUpperCase();
        row.appendChild(cell);
    }

    guessRows.appendChild(row);
}

document.getElementById('restartButton').addEventListener('click', () => {
    targetWord = getRandomWord();
    currentAttempt = 0;
    gameOver = false;

    document.getElementById('guessRows').innerHTML = '';
    document.getElementById('result').textContent = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('restartButton').style.display = 'none';
});