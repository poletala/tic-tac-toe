let crossesButton = document.querySelector('.crosses')
let noughtsButton = document.querySelector('.noughts')
let returnBack = document.querySelector('.arrow-back') 
let firstPlayer  = JSON.parse(localStorage.getItem('FirstPlayer')); // combs of FirstPlayer in the local storage (current game)
let secondPlayer = JSON.parse(localStorage.getItem('SecondPlayer')); // combs of Second Player in the local storage (current game)
let combosFirstPlayer = JSON.parse(localStorage.getItem('CombosFirstPlayer')); //
let combosSecondPlayer = JSON.parse(localStorage.getItem('CombosSecondPlayer'));//
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
let interval 
let minutes = 0
let seconds = 0
function pageOnload() {
    if (localStorage.getItem('isBot') === null) {
        document.querySelector('.game-score').classList.add('invisible-element')
        document.querySelector('.new-game').classList.add('invisible-element')
        document.querySelector('.choose-button').classList.add('invisible-element')
    }
    if (localStorage.getItem('isBot')) {
        document.querySelector('.players-quantity').classList.add('invisible-element')
    }
    if (localStorage.getItem('isBot') === 'true') {
        document.querySelector('.quantity-text').innerHTML = 'One Player Game'
    }
    if (localStorage.getItem('isBot') === 'false') {
        document.querySelector('.quantity-text').innerHTML = 'Two Players Game'
    }
}
function onePlayerGame() { 
    document.querySelector('.quantity-text').innerHTML = 'One Player Game'
    document.querySelector('.players-quantity').classList.add('invisible-element')
    setTimeout(() => {
        document.querySelector('.choose-button').classList.remove('invisible-element')
    }, 500);
    localStorage.setItem('isBot', true)
}
function twoPlayersGame() {
    document.querySelector('.quantity-text').innerHTML = 'Two Players Game'
    document.querySelector('.players-quantity').classList.add('invisible-element')
    setTimeout(() => {
        document.querySelector('.choose-button').classList.remove('invisible-element')
    }, 500);
    localStorage.setItem('isBot', false)
}
function newGame() {//click on New Game btn
    gameScore.textContent = '0 : 0'
    document.querySelector('.new-game').classList.add('invisible-element')
    document.querySelector('.choose-button').classList.add('invisible-element')
    document.querySelector('.players-quantity').classList.remove('invisible-element')
    document.querySelector('.quantity-text').innerHTML = ''
    clearLS()
    clearGameScore()
    localStorage.removeItem('CombosFirstPlayer')
    localStorage.removeItem('CombosSecondPlayer')
    localStorage.removeItem('isBot')
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
function timerGame() {
    seconds++
    if(seconds < 10) {
        timer.textContent = minutes + ':0' + seconds
    }
    if(seconds > 9) {
        timer.textContent = minutes + ':' + seconds
    }
     if(seconds > 59) {
        minutes++
        seconds = 0
        timer.textContent = minutes + ':0' + seconds
    }
}
function startTimer() {
    interval = setInterval(timerGame, 1000)
}
//click on back-btn
returnBack.onclick = function() {
    location.replace("./index.html") 
    clearLS()
}

// delete keys from LS
function clearLS() {
    localStorage.removeItem('FirstPlayer');
    localStorage.removeItem('SecondPlayer');
    localStorage.removeItem('bot cell');
    localStorage.removeItem('crosses') 
    localStorage.removeItem('noughts') 
}

function clearGameScore() {
    localStorage.removeItem('First Player score');
    localStorage.removeItem('Second Player score');
}

// comparing win combinations with players' combinations, determining the winner
function winner() {
    let isBot = localStorage.getItem('isBot')
    if (isBot==='true') {
        for (let i=0; i<winCombs.length;i++) {         
            let intersection1 = firstPlayer.filter(element => winCombs[i].includes(element));
            let intersection2 = secondPlayer.filter(element => winCombs[i].includes(element));
            let winnerPlayerText = (intersection1.length === 3) ? 'First Player': (intersection2.length === 3) ? 'Second Player' : '';
            if ((intersection1.length === 3) || (intersection2.length === 3)) {
                console.log(`intersection of First Player ` + intersection1)
                console.log(`intersection of Second Player ` + intersection2)
                alert(`And the winner is ${winnerPlayerText}!`)
                isGameOver = true
                localStorage.setItem(`${winnerPlayerText} score`, (Number(localStorage.getItem(`${ winnerPlayerText} score`))) + 1); // game score in LS
                }}}
     else {
        let player = (counter % 2 === 0) ? secondPlayer : firstPlayer;
        let winnerText =  (counter % 2 === 0) ? 'Second Player' : 'First Player';
        for (let i=0; i<winCombs.length;i++) {         
            let intersection = player.filter(element => winCombs[i].includes(element));
            if (intersection.length === 3) {
                console.log(`intersection of ${winnerText} ` + intersection)
                alert(`And the winner is ${winnerText}!`)
                isGameOver = true
                localStorage.setItem(`${winnerText} score`, (Number(localStorage.getItem(`${winnerText} score`))) + 1); // game score in LS
        }
    }
}
}   

// ??
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
    
    let isBot = localStorage.getItem('isBot') // one-player mode or not
    
    let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';

    let imgCellFirstPlayer = (isCrosses) ? 'url(./assets/X.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/O.png) center no-repeat, white' : ''; //choose right cover of the cell
    
    let cellId = Number(event.target.id[4]) //find out the id of the cell

    if (isBot === 'false') { // two-players mode

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
   
        else {//the same actions with the First Player
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

        event.target.style.background = imgCellFirstPlayer 
        event.target.style.backgroundSize = '50% 50%'
        console.log('First Player clicks on ' + cellId)
        }
    }
    if (isBot==='true') {//one-player mode
        playerTurnText.textContent = ''
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
       

        //bot
        let cellsPool = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let excludePool = (firstPlayer && !secondPlayer) ? [firstPlayer] : [...firstPlayer, ...secondPlayer];
        console.log('Исключаемые позиции для бота ' +  excludePool)
        let filteredCellsPool = []
        
        for (let i=0;i<cellsPool.length;i++) {
            if (excludePool.indexOf(cellsPool[i]) === -1) {
                filteredCellsPool.push(cellsPool[i])
            }
        }
        console.log('Возможные позиции для бота ' + filteredCellsPool)
        let randomCellBot = filteredCellsPool[Math.floor(Math.random() * filteredCellsPool.length)]
        console.log('Позиция бота ' + randomCellBot) //bot cell choice
        
        if (!secondPlayer) { //if there are no data in LS
            secondPlayer = [randomCellBot] //comb of the Second Player (current game)
            localStorage.setItem('SecondPlayer', JSON.stringify(secondPlayer));
        } else { //if LS is not empty
            secondPlayer.push(randomCellBot)
            let comboSecondPlayer = Array.from(secondPlayer)// new cell id adding
            console.log('Second Player comb ' + comboSecondPlayer) 
            localStorage.setItem('SecondPlayer', JSON.stringify(comboSecondPlayer));
        }
        setTimeout(() => {
            let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
        (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';
            document.querySelector(`#cell${randomCellBot}`).style.background = imgCellSecondPlayer
            document.querySelector(`#cell${randomCellBot}`).style.backgroundSize = '50% 50%' //background changing 
            console.log('Second Player clicks on ' + randomCellBot)
        }, 500);
    playerTurnText.textContent = ''
        
    
   
    }

    winner()

    if ((firstPlayer.length + secondPlayer.length) >= 9 && !isGameOver) { 
        alert('Nobody has won')
        isGameOver = true
    }
    if(isGameOver) {
        combosOfPlayers()
        isPlayAgain = confirm('Play again?')
    }
    if(isPlayAgain) {    
        setTimeout(() => {
            location.replace("./index.html") 
        }, 500);                 
        
        clearLS()
    }
    if(!isPlayAgain && isGameOver) {
        setTimeout(() => {
            location.replace("./index.html") 
        }, 500);   
        clearLS()
    }
}

