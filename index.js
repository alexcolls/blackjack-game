

const cardSound1 = new Audio('sounds/cardSlide1.wav');
const cardSound2 = new Audio('sounds/cardSlide2.wav');
const winSound = new Audio('sounds/win.wav');
const loseSound = new Audio('sounds/lose.wav');


const btnNew = $('.btn-new');
const btnHit = $('.btn-hit');
const btnStand = $('.btn-stand');

let dealerWins = 0;
let playerWins = 0;

let card;
let score;
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
    const jqk = ['J','Q','K'];
    if ( jqk.includes(value) ) {
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
    cardSound2.play();
    card = deck.shift();
    $('.dealer').html($('.dealer').html() + `<img src="./cards/${card}.svg" alt="">`);
    dealerScore += cardScore(card, dealerScore);
    $('.dealer-score').text(dealerScore);
}

function cardPlayer () {
    cardSound1.play();
    card = deck.shift();
    $('.player').html($('.player').html() + `<img src="./cards/${card}.svg" alt="">`);
    playerScore += cardScore(card, playerScore);
    $('.player-score').text(playerScore);
}



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
        await sleep(1200);
    }

    if ( dealerScore > 21 ) {
        youWin();
    } else if ( dealerScore >= playerScore ) {
        houseWins();
    }
}

async function newGame () {
    // Reset cards and scores
    $('.dealer').empty();
    dealerScore = 0;
    $('.dealer-score').text(dealerScore);
    $('.player').empty();
    playerScore = 0;
    $('.player-score').text(playerScore);

    // Hide popup
    $('.popup').addClass('hidden');

    // Initialize deck
    deck = initDeck();

    // Initialize dealer
    cardDealer();
    $('.dealer').html($('.dealer').html() + '<img class="0" src="./cards/0.svg" alt="">');
    await sleep(500);
    // Initialize player
    cardPlayer();
    cardPlayer();
    
    btnHit.attr('disabled',false);
    btnStand.attr('disabled',false);

    

}

newGame();

function youWin () {
    $('.popup').removeClass('hidden');
    $('.popup').css({"backgroundColor": "rgba(0,100,0,0.9)"});
    $('.message').text('You Won! 💃');
    playerWins++;
    $('.player-wins').text(playerWins);
    winSound.play();
}

function youBust () {
    $('.popup').removeClass('hidden');
    $('.popup').css({"backgroundColor": "rgba(250,0,0,0.8)"});
    $('.message').text('You Bust! ⛔');
    dealerWins++;
    $('.dealer-wins').text(dealerWins);
    loseSound.play();
}

function houseWins () {
    $('.popup').removeClass('hidden');
    $('.popup').css({"backgroundColor": "rgba(250,0,0,0.8)"});
    $('.message').text('House Wins! 👎'); 
    dealerWins++;
    $('.dealer-wins').text(dealerWins);
    loseSound.play();
}




btnNew.click( function () {
    newGame();
})



btnHit.click( function () {
    cardPlayer();
    if ( playerScore > 21 ) {
        btnHit.attr('disabled',true);
        btnStand.attr('disabled',true);
        youBust();
    }
})






btnStand.click( function () {

    dealerPlays();

    
})