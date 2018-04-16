/*
 * Create a list that holds all of your cards
 */
"use strict";
 let startTime;
let list = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];
shuffleTheCard();
 let rePlay = document.getElementById('restart').addEventListener('click' ,function(){
 restart();
 });
// ------------------------------------------------------------------------
 function restart(){
    startTime= new Date().getMinutes();
     move.innerHTML = `<span id="moves">0</span>`;
     count = 0;
     starsCounter =3;
     stars.item(0).classList.remove('add-new-star');
     stars.item(1).classList.remove('add-new-star');

      let myCard = document.getElementsByClassName('card');
      for (let i = 0; i < myCard.length; i++) {
              myCard[i].classList.remove('open','show','match');
      }
      for (let i = 0; i < locked.length; i++) {
              locked.pop();
      }
      for (let i = 0; i < openCard.length; i++) {
              openCard.pop();
      }
        shuffleTheCard();
        }
// ------------------------------------------------------------------------

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // ------------------------------------------------------------------------
 function shuffleTheCard(){
   setTimeout(startgame, 1000);
  startTime  = new  Date().getMinutes();
 shuffle(list);
 const theCard = document.getElementsByClassName('card');

     for (let i = 0; i < list.length; i++) {
       theCard[i].innerHTML = "<i></i>";
       theCard[i].firstChild.classList.add("fa" ,list[i]);
     }
   }
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// ------------------------------------------------------------------------

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// ------------------------------------------------------------------------
    let openCard = [];
    let starsCounter =3;
    let locked = [];
    let count =0 ;
    let myCard;
    let stars = document.getElementsByClassName('fa-star');
    let move = document.getElementById('moves');
    let endTime;
// ------------------------------------------------------------------------
    myCard = document.getElementsByClassName('card');
    for (let i = 0; i < myCard.length; i++) {
 CardOnCilck(i) ;
}
function CardOnCilck(i) {
  let CardOnClick = i;
myCard[i].addEventListener('click' ,function(e){
    if( openCard.length != 2){
    if (!(myCard[CardOnClick].classList.contains('open','show'))){
        Check(CardOnClick);
    }
  }
});

}
// ------------------------------------------------------------------------
 function Check(Card){
 let fClcik = myCard.item(Card);
   myCard[Card].classList.add('open','show');
   openCard.push(fClcik);
if ( openCard.length  === 2){
   if(openCard[0].firstElementChild.className === openCard[1].firstElementChild.className ){
        openCard[0].classList.add('match');
        openCard[1].classList.add('match');
        locked.push(openCard[0]);
        locked.push(openCard[1]);
        openCard.pop();
        openCard.pop();
         moves();
    }else {
        openCard[0].classList.add('notmatch');
        openCard[1].classList.add('notmatch');
        moves();
        setTimeout(starttiem, 500);
    }
  }
}
// ------------------------------------------------------------------------
function starttiem(){
    openCard[0].classList.remove('open','show', 'notmatch');
    openCard[1].classList.remove('open','show','notmatch');
    openCard.pop();
    openCard.pop();
}
// ------------------------------------------------------------------------
function moves(){
  count++;
  move.innerHTML = `<span id="moves">${count}</span>`;
   if(count === 12){
    stars.item(0).classList.add('add-new-star');
    starsCounter--;
  }else if(count === 24){
    stars.item(1).classList.add('add-new-star');
      starsCounter--;
  }else if(locked.length === 16){
   endTime = new Date().getMinutes();
    setTimeout(function win() {
      swal("Good job!", `You Win with ${count} Moves and ${starsCounter} Star and you take  ${startTime - endTime} Seconds to \tfinish the game \n \tif you want to play agen press OK (:`, "success");
      restart();
    }, 500);

  }
}

function startgame(){
  for (var i = 0; i <   myCard.length; i++) {
      myCard[i].classList.remove("open","show")
  }
}
// ------------------------------------------------------------------------
