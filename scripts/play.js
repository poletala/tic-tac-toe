let crossesButton = document.querySelector('.crosses')
let noughtsButton = document.querySelector('.noughts')
let returnBack = document.querySelector('.arrow-back') 
let firstPlayer  = JSON.parse(localStorage.getItem('FirstPlayer')); // combs of FirstPlayer in the local storage (current game)
let secondPlayer = JSON.parse(localStorage.getItem('SecondPlayer')); // combs of Second Player in the local storage (current game)
let combosFirstPlayer = JSON.parse(localStorage.getItem('CombosFirstPlayer')); //
let combosSecondPlayer = JSON.parse(localStorage.getItem('CombosSecondPlayer'));
let FirstPlayerScore = JSON.parse(localStorage.getItem('First Player score')); 
let SecondPlayerScore = JSON.parse(localStorage.getItem('Second Player score')); 
let gameField = document.querySelector('.game-field')
let gameScore = document.querySelector('#game-score')
let playerTurnText = document.querySelector('.player-turn')
let timer = document.querySelector('.timer')
let winCombs = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9],[7,5,3]]
let counter = 0
let isCrosses
let isNoughts
let isGameOver
let isPlayAgain
let isNotEmpty 
let interval
let minutes = 0
let seconds = 0

function timerGame() {
    console.log(timer.textContent)
    seconds++
    if(seconds < 10) {
        timer.textContent = '0:0' + seconds
    }
    if(seconds > 9) {
        timer.textContent = '0:' + seconds
    }
     if(seconds > 59) {
        minutes++
        seconds = 0
        timer.textContent = minutes + ':00' 

    }
    
}
function startTimer() {
    interval = setInterval(timerGame, 1000)
}

function newGame() {
    gameScore.textContent = '0 : 0'
    clearGameScore()
}

function scoreOnload() { 
    gameScore.textContent = (FirstPlayerScore && SecondPlayerScore) ? (`${FirstPlayerScore} : ${SecondPlayerScore}`) :
        (FirstPlayerScore && !SecondPlayerScore) ? (`${FirstPlayerScore} : 0`) :
        (!FirstPlayerScore && SecondPlayerScore) ? (`0 : ${SecondPlayerScore}`) : '0 : 0';
}

//save the inf abt user's choice using local storage
function crosses() {
    isCrosses = true
    isNoughts = false 
    console.log('X' + isCrosses)
    localStorage.setItem('crosses', isCrosses);
    location.replace("./game.html")
    
}
function noughts() {
    isCrosses = false
    isNoughts = true 
    console.log('0' + isNoughts)
    localStorage.setItem('noughts', isNoughts);
    location.replace("./game.html")
  
}

//click on array
returnBack.onclick = function() {
    location.replace("./index.html") 
    clearFirstAndSecondPlayer()
    clearXO()
}

// delete 'crosses' and 'noughtes' keys from LS
function clearXO() {
    localStorage.removeItem('crosses') 
    localStorage.removeItem('noughts') 
}
// delete 'FirstPlayer' and 'SecondPlayer' keys from LS
function clearFirstAndSecondPlayer() {
    localStorage.removeItem('FirstPlayer');
    localStorage.removeItem('SecondPlayer');
}

function clearGameScore() {
    localStorage.removeItem('First Player score');
    localStorage.removeItem('Second Player score');
}

// comparing win combinations with players' combinations, determining the winner
function winner() {
    let player = (counter % 2 === 0) ? secondPlayer : firstPlayer;
    let winnerText =  (counter % 2 === 0) ? 'Second Player' : 'First Player';
    for (let i=0; i<winCombs.length;i++) {         
        let intersection = player.filter(element => winCombs[i].includes(element));
        if (intersection.length === 3) {
            console.log(`intersection of ${player} ` + intersection)
            alert(`And the winner is ${winnerText}!`)
            isGameOver = true
            localStorage.setItem(`${winnerText} score`, (Number(localStorage.getItem(`${winnerText} score`))) + 1); // game score in LS
        }
    }
}   
// 
function combosOfPlayers() {
    if (!combosFirstPlayer) {
        combosFirstPlayer = [firstPlayer]
    } else {
       combosFirstPlayer.push(firstPlayer)
    }
    if (!combosSecondPlayer) {
        combosSecondPlayer = [secondPlayer]
    } else {
        combosSecondPlayer.push(secondPlayer)
    }
    localStorage.setItem('CombosFirstPlayer', JSON.stringify(combosFirstPlayer));
    localStorage.setItem('CombosSecondPlayer', JSON.stringify(combosSecondPlayer));
}
// game
gameField.onclick = function (event) {
    isGameOver = false
    counter++
    let isCrosses = localStorage.getItem('crosses');
    let isNoughts = localStorage.getItem('noughts'); //find out which sign the user has chosen from the local storage
    
    let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';

    let imgCellFirstPlayer = (isCrosses) ? 'url(./assets/X.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/O.png) center no-repeat, white' : ''; //choose right cover of the cell
    
    let cellId = Number(event.target.id[4]) //find out the id of the cell

    if (counter % 2 === 0) { //even click
        playerTurnText.textContent = 'Player 1’s Turn'
        
        if (!secondPlayer) { //if there are no data in LS
            secondPlayer = [cellId] //comb of the Second Player (current game)
            localStorage.setItem('SecondPlayer', JSON.stringify(secondPlayer));
        } else { //if LS is not empty
            if ([...secondPlayer, ...firstPlayer].includes(cellId)) {  //
                alert('Choose another one cell.')
                return
            }
            
            secondPlayer.push(cellId)
            let comboSecondPlayer = Array.from(secondPlayer)// new cell id adding
            console.log('Second Player comb ' + comboSecondPlayer) 
            localStorage.setItem('SecondPlayer', JSON.stringify(comboSecondPlayer));
        }
        event.target.style.background = imgCellSecondPlayer
        event.target.style.backgroundSize = '50% 50%' //background changing 
        console.log('Second Player clicks on ' + cellId)
       
    }
    else {
        playerTurnText.textContent = 'Player 2’s Turn'
        if (!firstPlayer) {
            firstPlayer = [cellId]
            localStorage.setItem('FirstPlayer', JSON.stringify(firstPlayer));
        } else {
            if ([...secondPlayer, ...firstPlayer].includes(cellId)) {    
                alert('Choose another one cell.')
                return
            }

            firstPlayer.push(cellId)                                     
            let comboFirstPlayer = Array.from(firstPlayer)
            console.log('First Player comb ' + comboFirstPlayer)
            localStorage.setItem('FirstPlayer', JSON.stringify(comboFirstPlayer));
        }
        event.target.style.background = imgCellFirstPlayer //the same actions with the First Player
        event.target.style.backgroundSize = '50% 50%'

        console.log('First Player clicks on ' + cellId)
    }

    winner()

    if ((firstPlayer.length + secondPlayer.length) === 9 && !isGameOver) { 
        alert('Nobody has won')
        isGameOver = true
    }
    if(isGameOver) {
        combosOfPlayers()
        isPlayAgain = confirm('Play again?')
    }
    if(isPlayAgain) {                       //прописать, если не согласны играть заново
        location.replace("./index.html") 
        
        //
        clearXO()
        clearFirstAndSecondPlayer()
    }
    if(!isPlayAgain && isGameOver) {
        location.replace("./index.html") 
        clearXO()
        clearFirstAndSecondPlayer()
    }
   
}


