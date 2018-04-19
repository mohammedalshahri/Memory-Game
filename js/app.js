"use strict";
let openCard = [];
let starsCounter =3;
let locked = [];
let count =0 ;
const theCard = document.getElementsByClassName('card');
let myCard;
let stars = document.getElementsByClassName('fa-star');
let move = document.getElementById('moves');
let seconds= 0;
let contertime= document.getElementById('watch');
  // array thet will be shuffled
let list = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];
  //this method will suffle the card in the time of lode
setTimeout(start_stopwatch , 500);
shuffleTheCard();
  //to listen when the user click restart buttom
 document.getElementById('restart').addEventListener('click' ,function(){
restart();
});
  // restart funcation
function restart(){
  count = 0;
  starsCounter =3;
  seconds=0;
    move.innerHTML = `<span id="moves">0</span>`;
    contertime.textContent= 0;

    stars.item(0).classList.remove('add-new-star');
    stars.item(1).classList.remove('add-new-star');
     myCard = document.getElementsByClassName('card');
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
  //suffle card funcation that will show the card
function shuffleTheCard(){
  setTimeout(startgame, 500);
shuffle(list);
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
  //this call for method CardOnCilck(i)
myCard = document.getElementsByClassName('card');
for (let i = 0; i < myCard.length; i++) {
CardOnCilck(i) ;
    }
  //this method will know witch card has been clicked
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
  //this method decide witch cards is match or not
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
  //starttiem will close not muched card
    function starttiem(){
        openCard[0].classList.remove('open','show', 'notmatch');
        openCard[1].classList.remove('open','show','notmatch');
        openCard.pop();
        openCard.pop();
    }
  //this method will count how many move user take to win
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
        setTimeout(function win() {

          swal("Good job!", `You Win with ${count} Moves and ${starsCounter} Star and you take ${seconds} Seconds to \tfinish the game \n \tif you want to play agen press OK`, "success");
          restart();
        }, 500);

      }
    }
  //method for show the card in the first time of playe
function startgame(){
  for (var i = 0; i <   myCard.length; i++) {
      myCard[i].classList.remove("open","show");
  }
}
//this method will count time in Seconds
function start_stopwatch(){
  seconds++;
contertime.textContent= seconds;
setTimeout(start_stopwatch , 1000);
}
