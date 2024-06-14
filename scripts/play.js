let crossesButton = document.querySelector('.crosses')
let noughtsButton = document.querySelector('.noughts')
let isCrosses
let isNoughts
//save the inf abt user's choice using local storage
function crosses() {
    isCrosses = true
    isNoughts = false 
    console.log(isCrosses)
    localStorage.setItem('crosses', isCrosses);
    location.replace("./game.html")
}
function noughts() {
    isCrosses = false
    isNoughts = true 
    console.log(isNoughts)
    localStorage.setItem('noughts', isNoughts);
    location.replace("./game.html")
}



let counter = 0
let firstPlayer  = JSON.parse(localStorage.getItem('FirstPlayer')); // combs of FirstPlayer in the local storage
let secondPlayer = JSON.parse(localStorage.getItem('SecondPlayer')); // combs of Second Player in the local storage

let gameField = document.querySelector('.game-field')
gameField.onclick = function (event) {
    counter++
    // console.log(counter)
    let isCrosses = localStorage.getItem('crosses');
    let isNoughts = localStorage.getItem('noughts'); //find out which sign the user has chosen from the local storage
    let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';
    let imgCellFirstPlayer = (isCrosses) ? 'url(./assets/X.png) center no-repeat, white' :
                (isNoughts) ? 'url(./assets/O.png) center no-repeat, white' : ''; //choose right cover of the cell
    if (counter % 2 === 0) { //even click
        event.target.style.background = imgCellSecondPlayer
        event.target.style.backgroundSize = '50% 50%' //background changing 
        let cellId = event.target.id[4] //find out the id of the cell
        console.log(' Second Player clicks on' + cellId)
        if (!secondPlayer) { //if there are no data in the LS
            secondPlayer = [cellId] //comb of the Second Player
        } else { //if LS is not empty
            secondPlayer.push(cellId)// new cell id adding
        }
        localStorage.setItem('SecondPlayer',  JSON.stringify(secondPlayer)); // the comb of the Second Player adding in LS
        console.log('Second Player comb' + secondPlayer) 
    }
    else {
        event.target.style.background = imgCellFirstPlayer //the same actions with the First Player
        event.target.style.backgroundSize = '50% 50%'
        let cellId = event.target.id[4]
        console.log('First Player clicks on' + cellId)
        if (!firstPlayer) {
            firstPlayer = [cellId]
        } else {
            firstPlayer.push(cellId)
    }
    localStorage.setItem('FirstPlayer', JSON.stringify(firstPlayer));
    console.log('First Player comb' + firstPlayer)
    }
    if (counter === 10) { 
        localStorage.setItem('crosses', ('')) //LS clearing
        localStorage.setItem('noughts', ('')) //LS clearing
        alert('stop')
        return
    }

  
    
}

let winCombs = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9],[7,5,3]]
