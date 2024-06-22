let numSelected = null;
let tileSelected = null;
let timerStarted = false;
let timerInterval;
let timeRemaining = 15 * 60; // 15 minutes in seconds

let errors = 0;
const maxErrors = 15; // Maximum number of allowed errors

let board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

let solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

window.onload = function () {
  setGame();
};

const setGame = () => {
  //Digits 1-9
  for (let i = 1; i <= 9; i++) {
    //<div id="1"><div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }
  //Board 9*9
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
};

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
  startTimer(); // Start the timer when a number is selected
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    let coords = this.id.split("-"); // ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    // Here you need to check against the solution array(kind of validation)
    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
      if (errors >= maxErrors) {
        gameOver();
      }
    }
    startTimer(); // Start the timer when a tile is selected
  }
}

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
    // Optionally, you can disable the board or take any other action here
    disableBoard();
    return;
  }
  timeRemaining--;
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  document.getElementById("timer").innerText = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

const gameOver = () => {
  clearInterval(timerInterval);
  alert("Game Over! Too many errors.");
  disableBoard();
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
