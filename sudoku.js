let numSelected = null;
let tileSelected = null;
let timerStarted = false; //true: start, false:not start
let timerInterval;
let timeRemaining = 15 * 60; // 15 minutes
let errors = 0;
const maxErrors = 30; // Maximum number of allowed errors
let difficulty = 50; //midium
let selectedButton = document.getElementById("medium");

const firstArr = [
  //initialize the board and answer
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
board = firstArr;
solution = firstArr;

const shuffle = (array) => {
  //Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // floor: round down
    // random: make random number between 0 to 1
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isValid = (board, row, col, num) => {
  //validate we can put the number on the cell
  for (let x = 0; x < 9; x++) {
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
};

const fillBoard = (board) => {
  let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == "-") {
        // check if the cell is empty
        for (let num of numbers) {
          if (isValid(board, i, j, num)) {
            //i:row, j:col
            board[i][j] = num; //put the number
            if (fillBoard(board)) return true; //Recursively try to fill the rest of the board
            board[i][j] = "-"; //if we cannot put the number, we need turn the cell to empty
          }
        }
        return false; // If no number can be placed in the cell, backtrack
      }
    }
  }
  return true; //All cells are successfully filled
};

const removeDigits = (board, numToRemove) => {
  while (numToRemove > 0) {
    //loop until the number of  remove turns zero
    let i = Math.floor(Math.random() * 9); //row 0-8
    let j = Math.floor(Math.random() * 9); //column 0-8
    //choose the cell randomly
    if (board[i][j] != "-") {
      //if the cell is not empty
      board[i][j] = "-"; //make the cell empty
      numToRemove--; //reduce the number of remove
    }
  }
};

const checkWin = () => {
  for (let r = 0; r < 9; r++) {
    //row 0-8
    for (let c = 0; c < 9; c++) {
      //col 0-8
      if (board[r][c] === "-" || board[r][c] != solution[r][c]) {
        return false; //lose
      }
    }
  }
  return true; //win
};

const setGame = () => {
  fillBoard(solution);
  board = JSON.parse(JSON.stringify(solution)); //Deep copy
  //board = solution;
  removeDigits(board, difficulty); //remove the cells depends on difficulty

  document.getElementById("digits").innerHTML = ""; //initialize the digits
  document.getElementById("board").innerHTML = ""; // initialize the board

  //make digit
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber); //when click, call selectNumber()
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  //make box(9*9)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        //check if the cell is empty
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line"); //make the line thick
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line"); //make the line thick
      }
      if (r == 0) {
        tile.classList.add("top-line"); //make the line thick
      }
      if (r == 8) {
        tile.classList.add("bottom-line"); //make the line thick
      }
      if (c == 0) {
        tile.classList.add("left-line"); //make the line thick
      }
      if (c == 8) {
        tile.classList.add("right-line"); //make the line thick
      }
      tile.addEventListener("click", selectTile); //when the cell is clicked, call selectTile()
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
  //initialize error and timer
  errors = 0;
  document.getElementById("errors").innerText = errors;
  timeRemaining = 15 * 60;
  document.getElementById("timer").innerText = "15:00";
  timerStarted = false; //not start
  clearInterval(timerInterval);
  selectedButton.classList.add("selected");
};

const disableBoard = () => {
  let tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.removeEventListener("click", selectTile);
  });
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.removeEventListener("click", selectNumber);
  });
};

const startTimer = () => {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
};

const updateTimer = () => {
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
};

const gameOver = () => {
  clearInterval(timerInterval);
  alert("Game Over! Too many errors.");
  disableBoard();
};

const selectNumber = (event) => {
  if (numSelected != null) {
    //if the number already existed
    numSelected.classList.remove("number-selected");
  } //remove the class
  numSelected = event.target;
  numSelected.classList.add("number-selected");
  startTimer();
};

const selectTile = (event) => {
  if (numSelected != null) {
    if (event.target.innerText != "") {
      //if the cellhas already number
      return; //finish the function
    }
    let coords = event.target.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (solution[r][c] == numSelected.id) {
      event.target.innerText = numSelected.id;
      board[r][c] = numSelected.id;
      if (checkWin()) {
        clearInterval(timerInterval);
        alert("Congratulations!!");
        disableBoard();
      }
    } else {
      //if failed
      errors += 1;
      document.getElementById("errors").innerText = errors;
      if (errors >= maxErrors) {
        gameOver();
      }
    }
    startTimer();
  }
};

document.querySelectorAll(".number").forEach((number) => {
  number.addEventListener("click", selectNumber);
});
document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("click", selectTile);
});

const newGame = () => {
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
};

//change the level
const setDifficulty = (numToRemove, button) => {
  difficulty = numToRemove;
  newGame();
  if (selectedButton) {
    selectedButton.classList.remove("selected");
  }
  button.classList.add("selected");
  selectedButton = button;
};

setGame(); //reset game
document.getElementById("new-game-button").addEventListener("click", newGame);
document
  .getElementById("easy")
  .addEventListener("click", (event) => setDifficulty(40, event.target));
document
  .getElementById("medium")
  .addEventListener("click", (event) => setDifficulty(50, event.target));
document
  .getElementById("hard")
  .addEventListener("click", (event) => setDifficulty(60, event.target));
