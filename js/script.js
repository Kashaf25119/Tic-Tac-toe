const cells = document.querySelectorAll('.cell');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const titleHeader = document.querySelector('#titleHeader');
const restartBtn =document.querySelector('#restartBtn')

//Initializig variables for game
let player = 'X';
let isGamePause = false;
let isGameStart = false;

//Array of win condition
const inputCell = [ '', '', '',
                    '', '', '',
                    '', '', '',
]

//Array of win condition
const winConditions = [
    [0, 1, 2],//row
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], //column
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],//digonal 
    [2, 4, 6]
]

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCell.fill('');
    cells.forEach(cell => {
        cell.textContent ='';
        cell.style.background ='';
    })

    isGamePause = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose';
})

const declarewinner = (winningIndices) => {
    titleHeader.textContent = `${player} Win`;
    isGamePause = true;
    winningIndices.forEach((index) => {
        cells[index].style.background = '#2A2343'
    })

    restartBtn.style.visibility = 'visible';
    
}

const declareDraw = () => {
    titleHeader.textContent = 'Draw';
    isGamePause = true;
    restartBtn.style.visibility = 'visible';
}

const choosePlayer = (selectedPlayer) => {
    if(!isGameStart){
        player = selectedPlayer;
        if(player == 'X'){
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        }
        else {
            oPlayerDisplay.classList.add('player-active');
            xPlayerDisplay.classList.remove('player-active');
        }
    }
}

const checkWinner = () => {
    for(const [a, b, c] of winConditions) {
        if (inputCell[a] == player &&
            inputCell[b] == player && 
            inputCell[c] == player) {
                declarewinner([a, b, c]);
                return true;
         }
    }

    if(inputCell.every(cell => cell != '')){
        declareDraw()
        return true;
    }
}

const changePlayer = () => {
    player = (player == 'X') ? 'O' : 'X';
}

const updateCell = (cell, index) => {
    cell.textContent = player;
    inputCell[index] = player;
    cell.style.color = (player == 'X') ? '#1892EA': '#A737FF';
}

const randomPick = () => {
    isGamePause = true;
    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * inputCell.length)
        } while (inputCell[randomIndex] != '');
        updateCell(cells[randomIndex], randomIndex, player)

        if(!checkWinner()) {
            changePlayer();
            isGamePause = false;
            return;
        }

        player = (player == 'X') ? 'O' : 'X';
    }, 1000)

}

const tapCell = (cell, index) => {
    if(cell.textContent == '' && !isGamePause){
        isGameStart = true;
        updateCell(cell, index);

        if(!checkWinner()){
            changePlayer()
            randomPick()
        }
    }
}

//Add click event linstenerto each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        tapCell(cell, index);
    })
})