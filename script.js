const cardContainer = document.getElementById("cards");
let cards = [];
let firstCard, secondcard;
let lockBoard= false
let score = 0


let scoreBoard = document.getElementById("score");
scoreBoard.textContent = score

fetch("./data/cards.json")
.then( (res) => res.json())
.then(   (data) =>  {
    console.log(cards);
    cards = [...data, ...data]
    console.log(cards);
    shuffleCards();
    generateCards();
}
)
function shuffleCards(){
    let currentIndex = cards.length;
    let randomIndex;
    let temporaryValue;

    while(currentIndex >0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex-= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

}



function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
        `;
        cardContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard); 
      cardElement.addEventListener("touchstart", flipCard); 

    }
}
function flipCard(){
    if(lockBoard){
        return;
    }
    if(this === firstCard) {return;}

    this.classList.add("flipped");
    
    if(!firstCard){
        firstCard = this;
        return;
    }

    secondcard = this;
    lockBoard = true;
    checKForMatch();
    scoreBoard.textContent = score
}
   function checKForMatch(){
    if(firstCard.dataset.name === secondcard.dataset.name)
    disablecards();
    else unflipCards();
}
function disablecards(){
    firstCard.removeEventListener("click",flipCard);
    secondcard.removeEventListener("click",flipCard);
    secondcard.removeEventListener("touchstart",flipCard);
    secondcard.removeEventListener("touchstart",flipCard);
    score++;
    if (score === 9)
    startConfetti();
    scoreBoard.textContent = score
    score++;
    scoreBoard.textContent = score;
    unlockBoard();
}

function unflipCards(){
    setTimeout(
        () => {
            firstCard.classList.remove("flipped");
            secondcard.classList.remove("flipped")
            unlockBoard();

        },  1000)
        }
    
function unlockBoard(){
    firstCard = null;
    secondcard = null; 
    lockBoard = false;
}
function restart(){
shuffleCards()
unlockBoard()
score = 0; 
scoreBoard.textContent = score;
cardContainer.innerHTML = "";
generateCards();
stopConfetti();
}