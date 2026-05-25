const cardsArray = [

    "pala.png",
    "pala.png",

    "planos.png",
    "planos.png",

    "regla.png",
    "regla.png",

    "casco.png",
    "casco.png",

    "martillo.png",
    "martillo.png",

    "cemento.png",
    "cemento.png",

    "taladro.png",
    "taladro.png",

    "escalera.png",
    "escalera.png"

];

cardsArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;

cardsArray.forEach(image => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.value = image;

    card.innerHTML = "?";

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);

});

function flipCard(){

    if(lockBoard) return;

    if(this === firstCard) return;

    this.innerHTML = `
    <img src="cartas/${this.dataset.value}" width="70">
    <p>${this.dataset.value.replace(".png","")}</p>
`;

    this.classList.add("flipped");

    if(!firstCard){

        firstCard = this;

        return;
    }

    secondCard = this;

    checkMatch();
}

function checkMatch(){

    if(firstCard.dataset.value === secondCard.dataset.value){

        firstCard.classList.add("matched");

        secondCard.classList.add("matched");

        matchedPairs++;

        if(matchedPairs === 8){

            document.getElementById("victoryMessage")
            .classList.remove("hidden");
        }

        resetBoard();

    }else{

        lockBoard = true;

        setTimeout(() => {

            firstCard.innerHTML = "?";

            secondCard.innerHTML = "?";

            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");

            resetBoard();

        }, 1000);
    }
}

function resetBoard(){

    [firstCard, secondCard] = [null, null];

    lockBoard = false;
}

function restartGame(){

    location.reload();
}