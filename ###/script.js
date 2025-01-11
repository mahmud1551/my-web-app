const cards = document.querySelector('.game-container');
const tryAgainButton = document.getElementById('try-again');
const nextLevelButton = document.getElementById('next-level');
const gameStatus = document.getElementById('game-status');
const levelStatus = document.getElementById('level-status');
const timerElement = document.getElementById('timer');
const welcomeScreen = document.getElementById('welcome-screen');
const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-button');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let level = 1;
let totalLevels = 10;
let timer;
let timeLeft = 40; // Initial time for the first level

// Show the game area and hide the welcome screen
startButton.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  gameArea.classList.remove('hidden');
  shuffleCards(); // Start the game
  startTimer();    // Start the timer
});

// Shuffle cards function
function shuffleCards() {
  const cardData = getCardDataForLevel(level);
  cards.innerHTML = ''; // Reset the game area
  cardData.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-framework', data.framework);
    card.innerHTML = `
      <div class="front-face">❓</div>
      <div class="back-face">${data.emoji}</div>
    `;
    card.addEventListener('click', flipCard);
    cards.appendChild(card);
  });

  matchedPairs = 0;
  gameStatus.textContent = '';
  levelStatus.textContent = `Level: ${level}`;
  showTryAgainButton(false);
  showNextLevelButton(false);
  updateCardSize(); // Update card size for the current level
}

// Get card data for each level
function getCardDataForLevel(level) {
  const emojis = ['🚗', '🚀', '🐍', '🎨', '🔤', '💻', '🛸', '🦄', '🎁', '🎉'];
  let cardData = [];
  let numCards = 8 + (level * 2); // Start with 8 cards, and add 2 cards per level
  let numEmojis = 4 + (level * 2); // Start with 4 emojis, and add 2 emojis per level

  // Add pairs of emojis for the current level
  for (let i = 0; i < numCards / 2; i++) {
    const emoji = emojis[i % numEmojis]; // Use emojis in a loop
    cardData.push({ framework: emoji, emoji: emoji });
    cardData.push({ framework: emoji, emoji: emoji });
  }

  // Shuffle the card data
  return cardData.sort(() => Math.random() - 0.5);
}

// Update card size based on the number of cards
function updateCardSize() {
  const numCards = cards.children.length;
  const gridSize = Math.ceil(Math.sqrt(numCards)); // Calculate grid size for better fit
  const cardWidth = 120 * (4 / gridSize); // Adjust card width
  const cardHeight = 150 * (4 / gridSize); // Adjust card height

  cards.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Update grid layout
  cards.querySelectorAll('.card').forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
  });
}

// Flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if the cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  matchedPairs++;

  if (matchedPairs === cards.children.length / 2) {
    setTimeout(() => {
      gameStatus.textContent = `WIN! 🎉`; // Win message with emoji
      showNextLevelButton(true); // Show Next Level button
      clearInterval(timer); // Stop the timer when win
    }, 500);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showTryAgainButton(show) {
  if (show) {
    tryAgainButton.classList.remove('hidden');
  } else {
    tryAgainButton.classList.add('hidden');
  }
}

function showNextLevelButton(show) {
  if (show) {
    nextLevelButton.classList.remove('hidden');
  } else {
    nextLevelButton.classList.add('hidden');
  }
}

tryAgainButton.addEventListener('click', restartGame);
nextLevelButton.addEventListener('click', nextLevel);

// Restart the game
function restartGame() {
  matchedPairs = 0;
  shuffleCards();
  startTimer();
  showTryAgainButton(false);
  gameStatus.textContent = ''; // Clear WIN message
}

// Move to the next level
function nextLevel() {
  level++;
  matchedPairs = 0;
  shuffleCards();
  startTimer();
  showNextLevelButton(false);
  gameStatus.textContent = ''; // Clear WIN message
}

// Start the timer
function startTimer() {
  timeLeft = 40 + (level - 1) * 5; // Add 5 seconds per level
  timerElement.textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameStatus.textContent = "Time's up! You lost.";
      showTryAgainButton(true); // Show Try Again button
    }
  }, 1000);
}

// Initialize the game
shuffleCards();
