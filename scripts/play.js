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



// background image changing when user clicks on the cell
let counter = 0
let gameField = document.querySelector('.game-field')
gameField.onclick = function (event) {
    counter++
    console.log(counter)
    let isCrosses = localStorage.getItem('crosses');
    let isNoughts = localStorage.getItem('noughts');
    let imgCellFirstPlayer = (isCrosses) ? 'url(./assets/O.png) center no-repeat, white' :
    (isNoughts) ? 'url(./assets/X.png) center no-repeat, white' : '';
    let imgCellSecondPlayer = (isCrosses) ? 'url(./assets/X.png) center no-repeat, white' :
                (isNoughts) ? 'url(./assets/O.png) center no-repeat, white' : '';
    if (counter % 2 === 0) { //even click
        event.target.style.background = imgCellSecondPlayer
        event.target.style.backgroundSize = '50% 50%'
    }
    else {
        event.target.style.background = imgCellFirstPlayer
        event.target.style.backgroundSize = '50% 50%'
    }
    if (counter === 10) { 
        localStorage.setItem('crosses', (''))
        localStorage.setItem('noughts', (''))
        alert('stop')
        return
    }

                                                        //обновляется массив
    let cellId = event.target.id[4]
    let cellArr = []
    cellArr.push(cellId)
    console.log(cellArr)
    if (cellArr[0]==='1') {  //сравнить массивы
        console.log('win')
    }
    
}