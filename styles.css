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
