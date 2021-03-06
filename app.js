let scores, gamePlaying,roundScores, activePlayer, winningScore

let rollHandler = document.querySelector('.roll');
let holdHandler = document.querySelector('.hold');
let newGameHandler = document.querySelector('.new');


let firstPlayer = document.getElementById('first-p');
let secondPlayer = document.getElementById('second-p');
let scoreSetUp = document.getElementById('max-score');
let setUpHandler = document.getElementById('set-up-submit');
let setUpBox = document.getElementById('set-up');
let form = document.querySelector('form');


// funkcija koja proverava pobednika

let checkWinner = (res) =>{
  if (scores[activePlayer] >= res) {
    document.querySelector(`#player-${activePlayer}`).textContent = 'WINNER!!!';
    document.querySelector('#dice').style.display = 'none';
    document.querySelector(`.player-${activePlayer}-box`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-box`).classList.remove('active');
    gamePlaying = false;
  } else {
    nextPlayer();
  }
}
// funkcija koja restartuje igricu i brise sve podatke

let init = () => {
  scores = [0, 0]; // za svakog igraca po jedan element niza za skladistenje ukupnog rezultata
  roundScores = 0; // za rezultat po rundi. zajednicka varijabla u svakoj novoj rundi dodeljuje se drugom igracu
  activePlayer = 0; // ako je 0 onda igra player1 ako je 1 onda igra player2
  gamePlaying = true;
  winningScore = undefined;
  
  document.querySelector('#player-0').textContent = 'Player 1';
  document.querySelector('#player-1').textContent = 'Player 2';
  document.querySelector('#dice').style.display = 'none';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('.player-0-box').classList.remove('winner');
  document.querySelector('.player-1-box').classList.remove('winner');
  document.querySelector('.player-0-box').classList.remove('active');
  document.querySelector('.player-1-box').classList.remove('active');
  document.querySelector('.player-0-box').classList.add('active');
};


init();


// funkcija prebacuje sledeceg igraca ako se ispuni neki uslov (predhodni igrac dobio 1 ili je igrac odlucio da sacuva trenutni zbir)
let nextPlayer = () => {
    //activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    //i trenutni rezultat pocinje da se racuna odpocetka
    roundScores = 0;
  
    //i da stampa u box-u 0, tj. da obrise dotadasnje poene
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
  
    //ukljucivanje #active
    document.querySelector('.player-0-box').classList.toggle('active');
    document.querySelector('.player-1-box').classList.toggle('active');
  
    //kada igrac dobije 1 kocka ponovo nestaje
    document.querySelector('#dice').style.display = 'none';
  };
  

//eventlistener za dugme roll

rollHandler.addEventListener('click', function() {
  // if statemant koristimo u kombinaciji sa gamePlaying varijablom kako bi oznacili kraj igre i 'ukocili' roll dice dugme
  if (gamePlaying) {
    //Sta se desi kad se klikne na 'roll dice'
    //1. bacati kocku
    let dice = Math.floor(Math.random() * 6) + 1;

    //2. prikazati kocku
    let diceDOM = document.querySelector('#dice');
    diceDOM.style.display = 'block';
    diceDOM.setAttribute('src', `img/dice-${dice}.png`);

    //3. sabrati rezultat
    if (dice > 1) {
      roundScores += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScores;
      //sve dok igrac dobija veci broj od 1, rezultat se sabira i stampa u box-u za trenutni rezultat.
    } else {
      //cim dobijemo 1, drugi igrac postaje aktivan
      //predlog: ovde mogu da dodam pop up??
      setTimeout(nextPlayer, 800);
    }
  }
});

//eventlistener za dugme hold

holdHandler.addEventListener('click', function() {
  // if statemant koristimo u kombinaciji sa gamePlaying varijablom kako bi oznacili kraj igre i 'ukocili' hold dugme
  if (gamePlaying) {
    //dodaj trenutni rezultat u konacni zbir
    scores[activePlayer] += roundScores;

    // dodaj rezultat u tabelu
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    //proveri da li je igrac pobedio - da li ima vise od 250 poena ili koliko je setovano
    if (winningScore === undefined){
      checkWinner(250);
    }
    else {
      checkWinner(winningScore);
    }
  }
});


setUpHandler.addEventListener('click', (event)=>{
  event.preventDefault()
  
  winningScore = scoreSetUp.value;
  
  if (firstPlayer) {
    document.querySelector('#player-0').textContent = firstPlayer.value;
  } else {
    document.querySelector('#player-0').textContent = 'Player 1';
  }
  if (secondPlayer) {
    document.querySelector('#player-1').textContent = secondPlayer.value;
  } else {
    document.querySelector('#player-1').textContent = 'Player 2';
  }
  form.reset();
  setUpBox.style.display = 'none';
})


//eventlistener za dugme new game
newGameHandler.addEventListener('click', ()=>{
  init();
  setUpBox.style.display = 'grid';
});
