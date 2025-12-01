const player1Score = document.getElementById('player1-score')
const player2Score = document.getElementById('player2-score')
const cells = document.getElementsByClassName('cell')
const playAgain = document.getElementById('play-again')
const reset = document.getElementById('reset')
const gameStatus = document.querySelector('.status')

const game = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameOver: false,
    scoreX: 0,
    scoreO: 0
}
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function checkResult() {
    let won = false
    for (const pattern of winPattern) {
        const [a, b, c] = pattern
        if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
            won = true;
            break;
        }
    }

    if (won) {
        gameStatus.textContent = `Player ${game.currentPlayer} wins`
        playAgain.style.display = "flex"
        game.gameOver = true;
        if (game.currentPlayer === "X") {
            game.scoreX++
            player1Score.textContent = game.scoreX
        } else {
            game.scoreO++
            player2Score.textContent = game.scoreO
        }
    } else if (!game.board.includes("")) {
        gameStatus.textContent = `Draw`;
        playAgain.style.display = "flex";
        game.gameOver = true
        game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
    }
    else {
        game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `Player ${game.currentPlayer} turn`;
    }

}

function playGameAgain() {
    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
    game.board = ["", "", "", "", "", "", "", "", ""];
    game.gameOver = false;
    playAgain.style.display = "none";
    gameStatus.textContent = `Player ${game.currentPlayer} turn`;
    for (const cell of cells) {
        cell.textContent = ""
    }
}

function resetGame() {
    game.currentPlayer = 'X';
    game.board = ["", "", "", "", "", "", "", "", ""];
    game.gameOver = false;
    playAgain.style.display = "none";
    gameStatus.textContent = `Player ${game.currentPlayer} turn`;
    game.scoreO = 0;
    game.scoreX = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    for (const cell of cells) {
        cell.textContent = ""
    }
}

gameStatus.textContent = `Player ${game.currentPlayer} turn`

for (const cell of cells) {
    cell.addEventListener('click', () => {
        const uid = parseInt(cell.id)
        if (game.board[uid] !== "" || game.gameOver) {
            return;
        }
        game.board[uid] = game.currentPlayer;
        cell.textContent = game.currentPlayer;
        checkResult()
    })
}


playAgain.addEventListener('click', playGameAgain)
reset.addEventListener('click', resetGame)


