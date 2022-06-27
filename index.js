const btnNew = $('.btn-new');
const btnHit = $('.btn-hit');
const btnStand = $('.btn-stand');

const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
const suits = ['C','D','H','S'];
let deck = [];

for(let c of cards ){
    for(let s of suits){
        deck.push(c+s);
    }
}

console.log(deck)


