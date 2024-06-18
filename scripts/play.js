let crossesButton = document.querySelector('.crosses')
let noughtsButton = document.querySelector('.noughts')
let isCrosses
let isNoughts
let isGameOver
let isPlayAgain
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

let counter = 0
let firstPlayer  = JSON.parse(localStorage.getItem('FirstPlayer')); // combs of FirstPlayer in the local storage
let secondPlayer = JSON.parse(localStorage.getItem('SecondPlayer')); // combs of Second Player in the local storage
let combosFirstPlayer = JSON.parse(localStorage.getItem('CombosFirstPlayer'));
let combosSecondPlayer = JSON.parse(localStorage.getItem('CombosSecondPlayer'));

let gameField = document.querySelector('.game-field')
let winCombs = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9],[7,5,3]]

function clearXO() {
    localStorage.setItem('crosses', ('')) //LS clearing
    localStorage.setItem('noughts', ('')) //LS clearing
}

gameField.onclick = function (event) {
    isGameOver = false
    counter++
    let isCrosses = localStorage.getItem('crosses');
    let isNoughts = localStorage.getItem('noughts'); //find out which sign the user has chosen from the local storage

    let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';

    let imgCellFirstPlayer = (isCrosses) ? 'url(./assets/X.png) center no-repeat, white' :
                (isNoughts) ? 'url(./assets/O.png) center no-repeat, white' : ''; //choose right cover of the cell

    if (counter % 2 === 0) { //even click
        event.target.style.background = imgCellSecondPlayer
        event.target.style.backgroundSize = '50% 50%' //background changing 
        let cellId = Number(event.target.id[4]) //find out the id of the cell
        console.log('Second Player clicks on ' + cellId)
        if (!secondPlayer) { //if there are no data in the LS
            secondPlayer = [cellId] //comb of the Second Player
        } else { //if LS is not empty
            secondPlayer.push(cellId)
            let comboSecondPlayer = Array.from(secondPlayer)// new cell id adding
            console.log('Second Player comb ' + comboSecondPlayer) 
            for (let i=0; i<winCombs.length;i++) {             
                let intersection = comboSecondPlayer.filter(element => winCombs[i].includes(element));
                if (intersection.length === 3) {
                    alert('And the winner is Second Player!')
                    isGameOver = true
                }
            }
            localStorage.setItem('secondPlayer', JSON.stringify(comboSecondPlayer));
            clearXO()
        }
       
    }
    else {
        event.target.style.background = imgCellFirstPlayer //the same actions with the First Player
        event.target.style.backgroundSize = '50% 50%'
        let cellId = Number(event.target.id[4])
        console.log('First Player clicks on ' + cellId)
        if (!firstPlayer) {
            firstPlayer = [cellId]
        } else {
            firstPlayer.push(cellId)                                     
            let comboFirstPlayer = Array.from(firstPlayer)
            console.log('First Player comb ' + comboFirstPlayer)
            for (let i=0; i<winCombs.length;i++) {             
                let intersection = comboFirstPlayer.filter(element => winCombs[i].includes(element));
                if (intersection.length === 3) {
                    alert('And the winner is First Player!')
                    isGameOver = true
                }
            }
            localStorage.setItem('FirstPlayer', JSON.stringify(comboFirstPlayer));
            clearXO()
        }
    }
    if (counter === 9) { 
        
        alert('Nobody has won')
        return
    }
    if(isGameOver) {
        isPlayAgain = confirm('Play again?')
                                                                     // запись всех комбинаций, даже проигрышных
        if (!combosFirstPlayer) {
            combosFirstPlayer = [firstPlayer]
        } else {
            combosFirstPlayer.push(firstPlayer)
        }
        localStorage.setItem('CombosFirstPlayer', JSON.stringify(combosFirstPlayer));
        localStorage.setItem('FirstPlayer', '');

        if (!combosSecondPlayer) {
            combosSecondPlayer = [secondPlayer]
        } else {
            combosSecondPlayer.push(secondPlayer)
        }
        localStorage.setItem('CombosSecondPlayer', JSON.stringify(combosSecondPlayer));
        localStorage.setItem('SecondPlayer', '');
    }
    if(isPlayAgain) {                       //прописать, если не согласны играть заново
        location.replace("./index.html") 
    }
    
    
}


