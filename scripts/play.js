let crossesButton = document.querySelector('.crosses')
let noughtsButton = document.querySelector('.noughts')

let imageCell 
let isCrosses
let isNoughts

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



// 
let counter = 0
let cells = document.querySelectorAll('.field-cell') //all cells
console.log(cells)
for (let i=0;i<cells.length;i++) {
    cells[i].addEventListener('click', gamePlay, true) 
}
function gamePlay () {
    counter++
    console.log(counter)
    let isCrosses = localStorage.getItem('crosses');
    let isNoughts = localStorage.getItem('noughts');
    console.log(isCrosses)
    if (isCrosses) {
        if (counter % 2 === 0) { //even click on the cell
            this.style.backgroundColor = 'yellow'; // the cell cover has changed
        }
    }
    if (isNoughts) {
        if (counter % 2 === 0) { //even click on the cell
            this.style.backgroundColor = 'red'; // the cell cover has changed
        }
    }
    if (counter === 9) {
        alert('stop')
        localStorage.setItem('crosses', (''))
        localStorage.setItem('noughts', (''))
    }
}


