let numSelected = null;
let tileSelected = null;
let timerStarted = false; //true: start, false:not start
let timerInterval;
let timeRemaining = 15 * 60; // 15 minutes in seconds

let errors = 0;
const maxErrors = 15; // Maximum number of allowed errors
let difficulty = 50;

//initialized the number of board
let board = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

//initialized the number of board
let solution = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

function shuffle(array) {
  //Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    //row 0-8
    const j = Math.floor(Math.random() * (i + 1)); //column 0-8
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isValid(board, row, col, num) {
  //validate we can put the number on the cell
  for (let x = 0; x < 9; x++) {
    // row
    if (board[row][x] == num) return false; //cannot put the number
  }
  for (let x = 0; x < 9; x++) {
    // column
    if (board[x][col] == num) return false; //cannot put the number
  }
  let startRow = row - (row % 3),
    startCol = col - (col % 3); //3*3 box
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
    //row
    for (let j = 0; j < 9; j++) {
      //column
      if (board[i][j] == "-") {
        // check if the cell is empty
        for (let num of numbers) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num; //put the number
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
    //loop until the number of  remove turns zero
    let i = Math.floor(Math.random() * 9); //row 0-8
    let j = Math.floor(Math.random() * 9); //column 0-8
    //choose the tile randomly
    if (board[i][j] != "-") {
      //if the cell is not empty
      board[i][j] = "-"; //make the cell empty
      numToRemove--; //reduce the number of remove
    }
  }
}

function checkWin() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === "-" || board[r][c] != solution[r][c]) {
        return false;
      }
    }
  }
  return true;
}

function setGame() {
  fillBoard(solution);
  board = JSON.parse(JSON.stringify(solution));
  removeDigits(board, difficulty); //remove the cells depemds on difficulty

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
  timeRemaining--; //reduce the time every 1 second
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  document.getElementById("timer").innerText = `${minutes}:${
    seconds < 10 ? "0" : "" //insert zero before seconds ex 01 02
  }${seconds}`;
}

function gameOver() {
  clearInterval(timerInterval);
  alert("Game Over! Too many errors.");
  disableBoard();
}

function selectNumber() {
  if (numSelected != null) {
    //when select number
    numSelected.classList.remove("number-selected"); //if the cell is already chosen, initialize (remove information)
  }
  numSelected = this; //the number clicked just now
  numSelected.classList.add("number-selected");
  startTimer(); // Start the timer when a number is selected
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      //the cell has already number
      return; //finish
    }

    let coords = this.id.split("-"); //0-0, 1-0, 2-3 0,0 1,0 2,3
    let r = parseInt(coords[0]); //first value
    let c = parseInt(coords[1]); //second value
    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id; //we can put the number
      board[r][c] = numSelected.id; //update the board
      if (checkWin()) {
        clearInterval(timerInterval);
        alert("Congratulations!!");
        disableBoard();
      }
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

function newGame() {
  const newArr = [
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ];
  board = newArr;
  solution = newArr;
  setGame();
}

function setDifficulty(numToRemove) {
  difficulty = numToRemove;
  newGame();
}

setGame(); //initialize game
document.getElementById("new-game-button").addEventListener("click", newGame);
document
  .getElementById("easy")
  .addEventListener("click", () => setDifficulty(40));
document
  .getElementById("medium")
  .addEventListener("click", () => setDifficulty(50));
document
  .getElementById("hard")
  .addEventListener("click", () => setDifficulty(55));

// const easy = [
//   [5, 3, "", "", 7, "", "", "", ""],
//   [6, "", "", 1, 9, 5, "", "", ""],
//   ["", 9, 8, "", "", "", "", 6, ""],
//   [8, "", "", "", 6, "", "", "", 3],
//   [4, "", "", 8, "", 3, "", "", 1],
//   [7, "", "", "", 2, "", "", "", 6],
//   ["", 6, "", "", "", "", 2, 8, ""],
//   ["", "", "", 4, 1, 9, "", "", 5],
//   ["", "", "", "", 8, "", "", 7, 9],
// ];

// const medium = [
//   ["", "", "", 5, "", "", "", "", ""],
//   ["", 3, "", "", 2, "", "", "", ""],
//   ["", "", 9, "", 8, "", "", "", ""],
//   ["", "", "", "", 3, "", "", 9, ""],
//   ["", 9, "", "", "", 7, "", "", ""],
//   ["", "", "", 3, "", "", "", "", ""],
//   ["", "", "", "", 9, "", 7, "", ""],
//   ["", "", "", "", "", 3, "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
// ];

// const hard = [
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
//   ["", "", "", "", "", "", "", "", ""],
// ];

// let selectedCell = null;

// function createeasyTable() {
//   const table = document.getElementById("easy-table");
//   table.innerHTML = ""; // Clear existing table

//   for (let i = 0; i < 9; i++) {
//     const row = document.createElement("tr");
//     for (let j = 0; j < 9; j++) {
//       const cell = document.createElement("td");
//       if (easy[i][j] !== "") {
//         cell.textContent = easy[i][j];
//       } else {
//         const input = document.createElement("input");
//         input.type = "text";
//         input.maxLength = 1;
//         input.addEventListener("input", () => {
//           const value = input.value;
//           // Allow only digits from 1 to 9
//           if (!/^[1-9]$/.test(value)) {
//             input.value = "";
//           } else {
//           }
//         });
//         input.addEventListener("focus", () => {
//           if (selectedCell) {
//             selectedCell.classList.remove("selected");
//           }

//           selectedCell = input;
//           selectedCell.classList.add("selected");
//         });
//         cell.appendChild(input);
//       }

//       // Add thick borders for 3x3 grid separation
//       if (j === 2 || j === 5) {
//         cell.classList.add("thick-border-right");
//       }
//       if (i === 2 || i === 5) {
//         cell.classList.add("thick-border-bottom");
//       }

//       row.appendChild(cell);
//     }
//     table.appendChild(row);
//   }
// }

// document.getElementById("keyboard").addEventListener("click", (event) => {
//   if (event.target.classList.contains("key") && selectedCell) {
//     selectedCell.value = event.target.getAttribute("data-value");
//   }
// });

// document.getElementById("new-game-button").addEventListener("click", () => {
//   // For simplicity, we'll just reset the table with the initial values
//   createeasyTable();
// });

// createeasyTable();
