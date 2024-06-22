let numSelected = null;
let tileSelected = null;
let timerStarted = false;
let timerInterval;
let timeRemaining = 15 * 60; // 15 minutes in seconds

let errors = 0;
const maxErrors = 15; // Maximum number of allowed errors

let board = [
  //initialize board
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
];
let solution = [
  //initialize answer
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
  "---------",
];

window.onload = function () {
  setGame(); //initialize game
  document.getElementById("new-game-button").addEventListener("click", newGame);
};

function shuffle(array) {
  //Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    // row
    if (board[row][x] == num) return false; //cannot put the number
  }
  for (let x = 0; x < 9; x++) {
    // column
    if (board[x][col] == num) return false; //cannot put the number
  }
  let startRow = row - (row % 3),
    startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] == num) return false;
    }
  }
  return true; //we can put the number
}

function fillBoard(board) {
  let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == "-") {
        for (let num of numbers) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num;
            if (fillBoard(board)) return true;
            board[i][j] = "-"; //if we cannot put the number, we need turn the tile to empty
          }
        }
        return false;
      }
    }
  }
  return true;
}

function removeDigits(board, numToRemove) {
  while (numToRemove > 0) {
    let i = Math.floor(Math.random() * 9);
    let j = Math.floor(Math.random() * 9);
    //choose the tile randomly
    if (board[i][j] != "-") {
      //if the cell is not empty
      board[i][j] = "-"; //make the cell empty
      numToRemove--; //reduce the number of remove
    }
  }
}

function setGame() {
  // 文字列の配列を2次元配列に変換
  solution = solution.map((row) => row.split(""));
  board = board.map((row) => row.split(""));

  fillBoard(solution);
  board = JSON.parse(JSON.stringify(solution));
  removeDigits(board, 50); //in this case, remove 50 tiles

  document.getElementById("digits").innerHTML = "";
  document.getElementById("board").innerHTML = "";

  //make digit
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  //make box(9*9)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }

  errors = 0;
  document.getElementById("errors").innerText = errors;
  timeRemaining = 15 * 60;
  document.getElementById("timer").innerText = "15:00";
  timerStarted = false;
  clearInterval(timerInterval);
}

function selectNumber() {
  if (numSelected != null) {
    //when select number
    numSelected.classList.remove("number-selected");
  }
  numSelected = this; //the number clicked just now
  numSelected.classList.add("number-selected");
  startTimer(); // Start the timer when a number is selected
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]); //first
    let c = parseInt(coords[1]); //second
    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id; //we can put the number
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
      if (errors >= maxErrors) {
        gameOver();
      }
    }
    startTimer();
  }
}

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    disableBoard();
    return;
  }
  timeRemaining--;
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  document.getElementById("timer").innerText = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function gameOver() {
  clearInterval(timerInterval);
  alert("Game Over! Too many errors.");
  disableBoard();
}

function disableBoard() {
  let tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.removeEventListener("click", selectTile);
  });
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.removeEventListener("click", selectNumber);
  });
}

function newGame() {
  board = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
  ];
  solution = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
  ];
  setGame();
}
