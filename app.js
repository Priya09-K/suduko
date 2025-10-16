// Grab HTML elements
const board = document.getElementById("board");
const difficulty = document.getElementById("difficulty");
const newGameBtn = document.getElementById("newGame");
const checkBtn = document.getElementById("checkBtn");
const solveBtn = document.getElementById("solveBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

// Sample puzzles
const puzzles = {
  easy: [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ],
  medium: [
    [0,2,0,6,0,8,0,0,0],
    [5,8,0,0,0,9,7,0,0],
    [0,0,0,0,4,0,0,0,0],
    [3,7,0,0,0,0,5,0,0],
    [6,0,0,0,0,0,0,0,4],
    [0,0,8,0,0,0,0,1,3],
    [0,0,0,0,2,0,0,0,0],
    [0,0,9,8,0,0,0,3,6],
    [0,0,0,3,0,6,0,9,0]
  ],
  hard: [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,8,5],
    [0,0,1,0,2,0,0,0,0],
    [0,0,0,5,0,7,0,0,0],
    [0,0,4,0,0,0,1,0,0],
    [0,9,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,0,7,3],
    [0,0,2,0,1,0,0,0,0],
    [0,0,0,0,4,0,0,0,9]
  ]
};

let currentBoard = [];

// Create empty board
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.setAttribute("max", 9);
    board.appendChild(input);
  }
}

// Load puzzle based on difficulty
function loadPuzzle(level) {
  if (!puzzles[level]) return;
  currentBoard = JSON.parse(JSON.stringify(puzzles[level]));
  const inputs = board.querySelectorAll("input");
  inputs.forEach((cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    if (currentBoard[row][col] !== 0) {
      cell.value = currentBoard[row][col];
      cell.disabled = true; // fixed cells
      cell.style.backgroundColor = "#dfe6e9";
    } else {
      cell.value = "";
      cell.disabled = false;
      cell.style.backgroundColor = "#fff";
    }
  });
  status.innerText = "Puzzle Loaded!";
}

// Check solution
function checkSolution() {
  const inputs = board.querySelectorAll("input");
  let correct = true;
  inputs.forEach((cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    if (cell.value != currentBoard[row][col] && currentBoard[row][col] !== 0) {
      correct = false;
    }
  });
  status.innerText = correct ? "✅ Correct!" : "❌ Some numbers are wrong!";
}

// Clear board
function clearBoard() {
  const inputs = board.querySelectorAll("input");
  inputs.forEach(cell => {
    if (!cell.disabled) cell.value = "";
  });
  status.innerText = "Board Cleared!";
}

// Simple solve (fill fixed numbers only)
function solvePuzzle() {
  const inputs = board.querySelectorAll("input");
  inputs.forEach((cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    if (currentBoard[row][col] !== 0) {
      cell.value = currentBoard[row][col];
    }
  });
  status.innerText = "Puzzle Solved (fixed numbers)!";
}

// Event listeners
newGameBtn.addEventListener("click", () => {
  if (difficulty.value === "0") {
    alert("Please select a difficulty!");
    return;
  }
  loadPuzzle(difficulty.value);
});

checkBtn.addEventListener("click", checkSolution);
clearBtn.addEventListener("click", clearBoard);
solveBtn.addEventListener("click", solvePuzzle);

// Initialize board
createBoard();
