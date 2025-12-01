const cells = document.getElementsByClassName('cell')
const player1Score = document.getElementById('player1-score')
const player2Score = document.getElementById('player2-score')
const reset = document.getElementById('reset')
const gameStatus = document.getElementsByClassName('status')

const game = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameOver: false
}
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 8],
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
}

if (won) {
    gameStatus.textContent = `Player ${game.currentPlayer} wins`
    game.gameOver = true
} else if (!game.board.includes("")) {
    gameStatus.textContent = `Draw`;
    game.gameOver = true
}
else {
    game.currentPlayer = game.currentPlayer === "X" ? "Y" ? "X" : "O" :
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    game.currentPlayer = 'X';
    game.board = ["", "", "", "", "", "", "", "", ""];
    game.gameOver = false;
    gameStatus.textContent = `Player ${game.currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = ""
    });
}


for (const cell of cells) {
    cell.addEventListener('click', (e) => {
        const uid = parseInt(cell.id)
        console.log(uid)
        if (game.board[uid] !== "" || game.gameOver) {
            return;
        }
        checkResult()
    })
}


reset.addEventListener('click', resetGame)


