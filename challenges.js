/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();


document.querySelector('.btn-roll').addEventListener('click',function(){
	
	if(gamePlaying){

		//1. random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		var dice = dice1+dice2;
		//2. display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-1').src='dice-'+dice1+'.png';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-2').src='dice-'+dice2+'.png';


		//3. update the round score if the roll number was not a 1

		// if(dice1 ===6 && dice2 ===6){
		// 	//player loses score

		// 	scores[activePlayer] = 0;
		// 	document.querySelector('#score-'+activePlayer).textContent = '0';
		// 	nextPlayer();

		// }else 

		if(dice1 !== 1 && dice2 !== 1){
			//add score
			roundScore += dice;
			document.querySelector('#current-'+activePlayer).textContent = roundScore;
			}else{
				//next player
				nextPlayer();
		}
		
	}	

});

document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying){

		//add current score to global score
		scores[activePlayer] += roundScore;


		//update the ui
		document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		console.log(input);

		//input value: undefined, 0, null, "" are coerced to false
		//anything else is coerced to true
		if(input){
			var winningScore = input;			
		} else {
			winningScore = 100;
		}

		//check if player won the game
		if(scores[activePlayer] >= winningScore){
			
			document.querySelector('#name-'+activePlayer).textContent = "Winner!";
			document.querySelector('#dice-1').style.display = 'none';
			document.querySelector('#dice-2').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gamePlaying=false;
		} else {
			//next player
			nextPlayer();
		}

	}

});



function nextPlayer(){
	//next player
	//if activeplayer = 0 then player =1, else player=0;
	activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = "0";
	document.getElementById('current-1').textContent = "0";

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//change dice number to none when switch player
	document.querySelector('#dice-1').style.display='none';
	document.querySelector('#dice-2').style.display='none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){


	scores = [0,0];
	roundScore = 0;
	// 0 for first player and 1 for second player
	activePlayer = 0;

	gamePlaying = true;

	document.querySelector('#dice-1').style.display='none';
	document.querySelector('#dice-2').style.display='none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = "PLAY 1";
	document.getElementById('name-1').textContent = "PLAY 2";
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');	
	document.querySelector('.player-1-panel').classList.remove('winner');	
}




//console.log(dice);
// document.querySelector('#current-' + activePlayer).textContent = dice;
// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);
