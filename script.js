var scores, roundScores, activePlayer, gamePlaying ;

init();

/* var playerFirst = prompt('Ime prvog igrača je?');
var playerSecond = prompt('Ime drugog igrača je?');

document.querySelector('#player-0').textContent = playerFirst;
document.querySelector('#player-1').textContent = playerSecond;
 */

//eventlistener za dugme roll

document.querySelector('.roll').addEventListener('click', function (){
    // if statemant koristimo u kombinaciji sa gamePlaying varijablom kako bi oznacili kraj igre i 'ukocili' roll dice dugme
    if (gamePlaying) {
   //Sta se desi kad se klikne na 'roll dice'
    //1. bacati kocku
    var dice = Math.floor(Math.random()*6)+1;
   
    //2. prikazati kocku
    var diceDOM = document.querySelector('#dice');  
    diceDOM.style.display= 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    //3. sabrati rezultat
    if( dice > 1){
        roundScores += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;
        //sve dok igrac dobija veci broj od 1, rezultat se sabira i stampa u box-u za trenutni rezultat.
    }else{
        //cim dobijemo 1, drugi igrac postaje aktivan
        
        setTimeout(nextPlayer , 800);
        
        
    }
    
    };   
});

//eventlistener za dugme hold

document.querySelector ('.hold').addEventListener('click', function(){
    // if statemant koristimo u kombinaciji sa gamePlaying varijablom kako bi oznacili kraj igre i 'ukocili' hold dugme
    if (gamePlaying){
      //dodaj trenutni rezultat u konacni zbir
    scores[activePlayer] +=roundScores;
     
    // dodaj rezultat u tabelu
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    

    //proveri da li je igrac pobedio - da li ima vise od 100 poena
    if (scores[activePlayer] >= 250) {
         document.querySelector('#player-' + activePlayer).textContent = 'WINNER!!!';
         document.querySelector('#dice').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-box').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-box').classList.remove('active');
         gamePlaying = false;
    } else {
        nextPlayer();
    };  
    }
    
    

});

//eventlistener za dugme new game
document.querySelector ('.new').addEventListener ('click', init);


// funkcija prebacuje sledeceg igraca ako se ispuni neki uslov (predhodni igrac dobio 1 ili je igrac odlucio da sacuva trenutni zbir)
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //i trenutni rezultat pocinje da se racuna odpocetka
    roundScores = 0;
    //i da stampa u box-u 0, tj. da obrise dotadasnje poene
    document.getElementById ('current-0').textContent = '0';
    document.getElementById ('current-1').textContent = '0';
    //ukljucivanje #active
   document.querySelector('.player-0-box').classList.toggle('active');
   document.querySelector('.player-1-box').classList.toggle('active');
   //kada igrac dobije 1 kocka ponovo netaje
   document.querySelector('#dice').style.display = 'none';
   // alert("NEXT PLAYER");
};



// funkcija koja restartuje igricu i brise sve podatke
function init(){
    scores = [0,0]; // za svakog igraca po jedan element niza za skladistenje ukupnog rezultata
    roundScores = 0 ; // za rezultat po rundi. zajednicka varijabla u svakoj novoj rundi dodeljuje se drugom igracu 
    activePlayer = 0; // ako je 0 onda igra player1 ako je 1 onda igra player2 
    gamePlaying = true;

    document.querySelector('#dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('player-0').textContent = 'Player 1';
    document.getElementById('player-1').textContent = 'Player 2';
    document.querySelector('.player-0-box').classList.remove('winner');
    document.querySelector('.player-1-box').classList.remove('winner');
    document.querySelector('.player-0-box').classList.remove('active');
    document.querySelector('.player-1-box').classList.remove('active');
    document.querySelector('.player-0-box').classList.add('active');


}