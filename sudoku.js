// let numSelected = null;
// let tileSelected = null;
// let timerStarted = false;
// let timerInterval;
// let timeRemaining = 15 * 60; // 15 minutes in seconds

// let errors = 0;
// const maxErrors = 15; // Maximum number of allowed errors

// let board = [
//   "--74916-5",
//   "2---6-3-9",
//   "-----7-1-",
//   "-586----4",
//   "--3----9-",
//   "--62--187",
//   "9-4-7---2",
//   "67-83----",
//   "81--45---",
// ];

// let solution = [
//   "387491625",
//   "241568379",
//   "569327418",
//   "758619234",
//   "123784596",
//   "496253187",
//   "934176852",
//   "675832941",
//   "812945763",
// ];

// window.onload = function () {
//   setGame();
// };

// function setGame() {
//   //Digits 1-9
//   for (let i = 1; i <= 9; i++) {
//     //<div id="1"><div>
//     let number = document.createElement("div");
//     number.id = i;
//     number.innerText = i;
//     number.addEventListener("click", selectNumber);
//     number.classList.add("number");
//     document.getElementById("digits").appendChild(number);
//   }
//   //Board 9*9
//   for (let r = 0; r < 9; r++) {
//     for (let c = 0; c < 9; c++) {
//       let tile = document.createElement("div");
//       tile.id = r.toString() + "-" + c.toString();
//       if (board[r][c] != "-") {
//         tile.innerText = board[r][c];
//         tile.classList.add("tile-start");
//       }
//       if (r == 2 || r == 5) {
//         tile.classList.add("horizontal-line");
//       }

//       if (c == 2 || c == 5) {
//         tile.classList.add("vertical-line");
//       }
//       tile.addEventListener("click", selectTile);
//       tile.classList.add("tile");
//       document.getElementById("board").append(tile);
//     }
//   }
// }

// function selectNumber() {
//   if (numSelected != null) {
//     numSelected.classList.remove("number-selected");
//   }
//   numSelected = this;
//   numSelected.classList.add("number-selected");
//   startTimer(); // Start the timer when a number is selected
// }

// function selectTile() {
//   if (numSelected) {
//     if (this.innerText != "") {
//       return;
//     }

//     let coords = this.id.split("-"); // ["0", "0"]
//     let r = parseInt(coords[0]);
//     let c = parseInt(coords[1]);
//     // Here you need to check against the solution array(kind of validation)
//     if (solution[r][c] == numSelected.id) {
//       this.innerText = numSelected.id;
//     } else {
//       errors += 1;
//       document.getElementById("errors").innerText = errors;
//       if (errors >= maxErrors) {
//         gameOver();
//       }
//     }
//     startTimer(); // Start the timer when a tile is selected
//   }
// }

// function startTimer() {
//   if (!timerStarted) {
//     timerStarted = true;
//     timerInterval = setInterval(updateTimer, 1000);
//   }
// }

// function updateTimer() {
//   if (timeRemaining <= 0) {
//     clearInterval(timerInterval);
//     alert("Time's up!");
//     // Optionally, you can disable the board or take any other action here
//     disableBoard();
//     return;
//   }
//   timeRemaining--;
//   let minutes = Math.floor(timeRemaining / 60);
//   let seconds = timeRemaining % 60;
//   document.getElementById("timer").innerText = `${minutes}:${
//     seconds < 10 ? "0" : ""
//   }${seconds}`;
// }

// function gameOver() {
//   clearInterval(timerInterval);
//   alert("Game Over! Too many errors.");
//   disableBoard();
// }

// function disableBoard() {
//   let tiles = document.querySelectorAll(".tile");
//   tiles.forEach((tile) => {
//     tile.removeEventListener("click", selectTile);
//   });
//   let numbers = document.querySelectorAll(".number");
//   numbers.forEach((number) => {
//     number.removeEventListener("click", selectNumber);
//   });
// }

const easy = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

const medium = [
  ['', '', '', 5, '', '', '', '', ''],
  ['', 3, '', '', 2, '', '', '', ''],
  ['', '', 9, '', 8, '', '', '', ''],
  ['', '', '', '', 3, '', '', 9, ''],
  ['', 9, '', '', '', 7, '', '', ''],
  ['', '', '', 3, '', '', '', '', ''],
  ['', '', '', '', 9, '', 7, '', ''],
  ['', '', '', '', '', 3, '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];

const hard =[
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];



let selectedCell = null;

function createeasyTable() {
  const table = document.getElementById('easy-table');
  table.innerHTML = ''; // Clear existing table
  
  for (let i = 0; i < 9; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 9; j++) {
          const cell = document.createElement('td');
          if (easy[i][j] !== '') {
              cell.textContent = easy[i][j];
          } else {
              const input = document.createElement('input');
              input.type = 'text';
              input.maxLength = 1;
              input.addEventListener('input', () => {
                  const value = input.value;
                  // Allow only digits from 1 to 9
                  if (!/^[1-9]$/.test(value)) {
                      input.value = '';
                  }else {
                    
                  }
              });
              input.addEventListener('focus', () => {
                  if (selectedCell) {
                      selectedCell.classList.remove('selected');
                      
                      
                  } 
                  
                  selectedCell = input;
                  selectedCell.classList.add('selected');
                 
              });
              cell.appendChild(input);
              
          }

          // Add thick borders for 3x3 grid separation
          if (j === 2 || j === 5) {
              cell.classList.add('thick-border-right');
          }
          if (i === 2 || i === 5) {
              cell.classList.add('thick-border-bottom');
          }

          row.appendChild(cell);
      }
      table.appendChild(row);
  }
  
}

document.getElementById('keyboard').addEventListener('click', (event) => {
  if (event.target.classList.contains('key') && selectedCell) {
      selectedCell.value = event.target.getAttribute('data-value');
  }
});

document.getElementById('new-game-button').addEventListener('click', () => {
  // For simplicity, we'll just reset the table with the initial values
  createeasyTable();
});



createeasyTable();
