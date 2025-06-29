const images = [
  'cat.png', 'dog.png', 'sun.png', 'ice.png', 'book.png', 'robot.png'
];

const board = document.getElementById("gameBoard");
const playAgainBtn = document.getElementById("play-again");
const resultMsg = document.getElementById("result-message");
const triesCount = document.getElementById("tries-count");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;

// Generate cards
let cardsData = [...images, ...images];
cardsData.sort(() => 0.5 - Math.random());

cardsData.forEach((img, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.image = img;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back" style="background-image: url('./game3_resorces/${img}')"></div>
    </div>
  `;

  board.appendChild(card);
});

// Game Logic
const cards = Array.from(document.querySelectorAll('.card'));
const totalCards = cards.length;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  });
});

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;
  lockBoard = true;
  tries++;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const matched = document.querySelectorAll(".matched");
  if (matched.length === totalCards) {
    setTimeout(() => {
      resultMsg.classList.remove("d-none");
      playAgainBtn.classList.remove("d-none");
      triesCount.textContent = tries;
    }, 300);
  }
}

playAgainBtn.addEventListener("click", () => {
  location.reload();
});