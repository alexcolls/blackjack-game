const btnNew = $('.btn-new');
const btnHit = $('.btn-hit');
const btnStand = $('.btn-stand');

let card;
let dealerScore = 0;
let playerScore = 0;
let dealerAces = 0;
let playerAces = 0;

function initDeck() {
    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const suits = ['C','D','H','S']; // Clubs, Diamonds, Hearts, Shapes
    let deck = [];
    // Build the deck
    for(let c of cards ){
        for(let s of suits){
            deck.push(c+s);
        }
    }
    // Mix randomly the deck before returning
    return deck.sort( () => Math.random() - 0.5 );
}

let deck = initDeck();
    

function cardScore ( card, currentScore ) {
    let value = card.slice(0,-1);
    const ten = ['J','Q','K'];
    if ( ten.includes(value) ) {
        return 10;
    } else if ( value === 'A' ) {
        if ( currentScore + 11 > 21 ) {
            return 1;
        } else {
            return 11;
        }
    } else {
        return Number(value);
    }
}


function cardDealer () {
    card = deck.shift();
    $('.dealer').html($('.dealer').html() + `<img src="./cards/${card}.svg" alt="">`);
    dealerScore += cardScore(card, dealerScore);
    $('.dealer-score').text(dealerScore);
}

function cardPlayer () {
    card = deck.shift();
    $('.player').html($('.player').html() + `<img src="./cards/${card}.svg" alt="">`);
    playerScore += cardScore(card, playerScore);
    $('.player-score').text(playerScore);
}

function newGame () {
    // Reset All
    $('.dealer').empty();
    dealerScore = 0;
    $('.dealer-score').text(dealerScore);
    $('.player').empty();
    playerScore = 0;
    $('.player-score').text(playerScore);

    // Initialize deck
    deck = initDeck();

    cardDealer();
    $('.dealer').html($('.dealer').html() + '<img class="0" src="./cards/0.svg" alt="">');
    
    cardPlayer();
    cardPlayer();
    btnHit.attr('disabled',false);
    btnStand.attr('disabled',false);

}

newGame();

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function dealerPlays() {
    btnHit.attr('disabled',true);
    $('.0').remove();
    let more = true;
    while ( more ) {
        cardDealer();
        if ( dealerScore >= playerScore || dealerScore >= 21 ) {
            more = false;
            btnStand.attr('disabled',true);
        }
        await sleep(1000);
    }    
}

btnNew.click( function () {
    newGame();
})

function youWin () {
    $('.message').removeClass('hidden');
    $('.message').addClass('back-green');
}

function youBust () {

}

function houseWins () {

}

btnHit.click( function () {
    cardPlayer();
    if ( playerScore >= 21 ) {
        btnHit.attr('disabled',true);
    }
})






btnStand.click( function () {

    dealerPlays();
    youWin();
    
})