let cell00 = document.getElementById("cell00");
let cell01 = document.getElementById("cell01");
let cell02 = document.getElementById("cell02");
let cell10 = document.getElementById("cell10");
let cell11 = document.getElementById("cell11");
let cell12 = document.getElementById("cell12");
let cell20 = document.getElementById("cell20");
let cell21 = document.getElementById("cell21");
let cell22 = document.getElementById("cell22");

let cellArray = [cell00, cell01, cell02, cell10, cell11, cell12, cell20, cell21, cell22];
let cell2dArray = [[cell00, cell01, cell02], [cell10, cell11, cell12], [cell20, cell21, cell22]];

let isTurnPlayerOne = true;
let stopPlay = false;
let winningText = document.getElementById("winningText")
let gameOverDiv = document.getElementById("gameOver")
let playAgainBtn = document.getElementById("playAgain")

playAgainBtn.addEventListener("click",newGame)

cellArray.forEach(cell => {
    cell.addEventListener("click",function () {
        console.log(cell);
        playSquare(cell);
    })
})

function playSquare (cell) {
    if (stopPlay) {return}

    if (cell.textContent.length == 0) {
        if (isTurnPlayerOne) {
            cell.textContent = "X"
            cell.style.color = "crimson"
            isTurnPlayerOne = false;
            if (checkWinner("X")) {
                gameOver("X")
            } else if (checkDraw()) {
                gameOver("-")
            }
        } else {
            cell.textContent = "O"
            cell.style.color = "darkblue"
            isTurnPlayerOne = true;

            if (checkWinner("O")) {
                gameOver("O")
            } else if (checkDraw()) {
                gameOver("-")
            }
        }
        cell.classList.add("cannotuse")

    }

}

function checkWinner (player){
    let winsHorizontally = false;

    //Check horizontal wins
    for (let i = 0; i < cell2dArray.length; i++) {
        winsHorizontally = true;
        for (let j = 0; j < cell2dArray[i].length; j++) {
            winsHorizontally = winsHorizontally && cell2dArray[i][j].textContent == player;
        }
        if (winsHorizontally) {
            return true;
        }
    }

    let winsVertically = false;
    //Check vertical wins
    for (let i = 0; i < cell2dArray.length; i++) {
        winsVertically = true;
        for (let j = 0; j < cell2dArray[i].length; j++) {
            winsVertically = winsVertically && cell2dArray[j][i].textContent == player;
        }
        if (winsVertically) {
            return true;
        }
    }

    let winsDiagonally = false;
    //Check diagonal wins
    for (let i = 0; i < cell2dArray.length; i++) {
        winsDiagonally = winsDiagonally && cell2dArray[i][i].textContent == player;
    }
    if (winsDiagonally) {
        return true;
    }

    let winsDiagonallyLeft = true;

    let indexColumn = cell2dArray.length - 1;
    let indexRow = 0;

    while (indexColumn >= 0) {
        winsDiagonallyLeft = winsDiagonallyLeft && (cell2dArray[indexRow][indexColumn].textContent == player);
        indexColumn--;
        indexRow++;
    }
    if (winsDiagonallyLeft) {
        return true;
    }

    return false;
}

function checkDraw() {
    let isDraw = true;
    for (let i = 0; i < cell2dArray.length; i++) {
        for (let j = 0; j < cell2dArray[i].length; j++) {
            isDraw = isDraw && (cell2dArray[i][j].textContent == "X" || cell2dArray[i][j].textContent == "O");
        }
    }
    return isDraw;
}

function gameOver (winningPlayer) {
    cellArray.forEach(cell => cell.classList.add("cannotuse"))

    if (winningPlayer != "-") {
        winningText.textContent = "Player " + winningPlayer + " wins!"
    } else {
        winningText.textContent = "It's a draw!"
    }

    gameOverDiv.classList.remove("hidden")
    stopPlay = true;
}

function newGame() {
    cellArray.forEach(cell => {
        cell.classList.remove("cannotuse");
        cell.textContent = ""
    } )
    gameOverDiv.classList.add("hidden")
    isTurnPlayerOne = true;
    stopPlay = false;
}