const btnNew = $('.btn-new');
const btnHit = $('.btn-hit');
const btnStand = $('.btn-stand');



let card;
let score = 0;
let dealerScore = 0;
let playerScore = 0;

function prepareDeck() {

    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const suits = ['C','D','H','S'];
    let deck = [];
    
    for(let c of cards ){
        for(let s of suits){
            deck.push(c+s);
        }
    }

    return deck.sort( () => Math.random() - 0.5 );
}

let deck = prepareDeck();
    

function cardScore ( card, currentScore ) {
    let value = card.slice(0,-1);
    const ten = ['J','Q','K'];
    if ( ten.includes(value) ) {
        value = 10;
    } else if ( value === 'A' ) {
        if ( currentScore + 11 > 21 ) {
            value = 1;
        } else {
            value = 11;
        }
    } else {
        value = Number(value);
    }
    return value;   
}

function hitCard () {
    card = deck.shift();
    $('.player').html($('.player').html() + `<img src="./cards/${card}.svg" alt="">`);
    playerScore += cardScore(card, playerScore);
    $('.player-score').text(playerScore);
}

function newCard ( card ) {
    $('.dealer').html($('.dealer').html() + `<img src="./cards/${card}.svg" alt="">`);
}

function newGame () {
    $('.dealer').html('');
    dealerScore = 0;
    $('.dealerScore').text(dealerScore);
    $('.player').html('');
    playerScore = 0;
    $('.playerScore').text(playerScore);

    card = deck.shift();
    newCard(card);
    newCard('0');
    dealerScore += cardScore(card, dealerScore);
    $('.dealer-score').text(dealerScore);
    
    

}

newGame();

btnNew.click( function () {
    newGame();
})

btnHit.click( function () {
    hitCard();
})