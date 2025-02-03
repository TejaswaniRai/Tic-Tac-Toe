let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let gameMode = '';
let userTurn = true;

const turnDisplay = document.getElementById('turn');
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');

function startGame(mode) {
  gameMode = mode;
  resetGame();
  document.querySelector('.game-options').style.display = 'none';
  gameBoard.style.display = 'grid';
  turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function makeMove(index) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    turnDisplay.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    turnDisplay.textContent = 'It\'s a Tie!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    if (gameMode === 'computer' && currentPlayer === 'O') {
      computerMove();
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function computerMove() {
  let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(item => item !== null);
  let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  setTimeout(() => makeMove(randomMove), 500);
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  userTurn = true;
  turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });

  document.querySelector('.game-options').style.display = 'flex';
  gameBoard.style.display = 'none';
}
