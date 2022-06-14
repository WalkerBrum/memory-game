const cards = document.querySelectorAll('.card');
const main = document.querySelector('.memory-game');

let hasFlippedCard = false;
let blockBoard = false;
let firstCard, secondCard;
let qtdAcertos = 0;
let tentativas = 0;

function flipCard() {
    if (blockBoard)  return;
    if (this === firstCard) return;

    this.classList.add('card-flip');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkCardSame();
}

function checkCardSame() {
    tentativas += 1;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        disabledCard();
        return;
    }

    unflipCards();
}

function disabledCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); 
    qtdAcertos += 1;
    console.log(qtdAcertos);

    if (qtdAcertos === 6) {
        newHtmlWhenWin();
    }

    resetBoard();
}

function unflipCards() {
    blockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('card-flip');
        secondCard.classList.remove('card-flip');

        resetBoard();
    }, 700);
}

function resetBoard() {
    [hasFlippedCard, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function newHtmlWhenWin() {
    cards.forEach((card) => {
         main.removeChild(card);
    })
    
    main.classList.remove('memory-game');
    main.classList.add('main');

    const message = document.createElement('h2');
    message.textContent = `Parabéns você Ganhou! Depois de ${tentativas} tentativas!`;
    message.classList.add('message');
    main.appendChild(message);

    const playAgain = document.createElement('button');
    playAgain.textContent = 'Jogar Novamente';
    playAgain.classList.add('play-again');
    main.appendChild(playAgain);

    const resetGame = document.querySelector('.play-again');
    resetGame.addEventListener('click', addCards);
}

function addCards() {
    const message = document.querySelector('.message');
    const resetGame = document.querySelector('.play-again');
    
    main.removeChild(message);
    main.removeChild(resetGame);
    main.classList.add('memory-game');

    cards.forEach((card) => {
        main.appendChild(card);
        console.log(card);
   })

   location.reload();
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;  
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});






