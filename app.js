// Game 2 - Memory Game

// need 12 cards - 2 of each image
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries-ukr.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger-ukr.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog-ukr.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream-ukr.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake-ukr.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza-ukr.png'
    },
    {
        name: 'fries',
        img: 'images/fries-ukr.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger-ukr.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog-ukr.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream-ukr.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake-ukr.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza-ukr.png'
    }
]

// Get array and sort randomly
// sort() - compares 2 values and sorts
// The Math.random() method returns a random number from 0 (inclusive) up to but not including 1 (exclusive).
// So if it happens to give you a number less then 0.5 then you get a negative number and if it’s over that then you get a positive.
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid'); // search for id='grid'
const resultDisplay = document.querySelector('#result');

let cardsChosen = []; 
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    //create item for each element in array
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        //console.log(card, i);
        card.addEventListener('click', flipCard)  //flipCard is only called when click sensed
        gridDisplay.appendChild(card);

    }
}


// call the function
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    console.log('list the board of images: ', cards);
    console.log('check for match!');

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('You clicked the same image! Try again.');
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found the matching card!');
        //set cards to white
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        //remove ability to click on white cards
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        cardsWon.push(cardsChosen); //record number of matches
    } else {
        // turn the cards back over again
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('Sorry no match, try again!');
    }

    resultDisplay.textContent = cardsWon.length;
    // or resultDisplay.innerHTML = cardsWon.length;
    console.log('cards won so far: ', cardsWon);
    
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.innerHTML = 'Congratulations, you found them all!';
    }
    
}

function flipCard() {
    //console.log(cardArray); // log the array, just to check

    // get data from this clicked element
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log('cards chosen: ', cardsChosen);
    console.log('chosen card ids: ', cardsChosenIds);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500); // wait 0.5s before checking for match
    }

}