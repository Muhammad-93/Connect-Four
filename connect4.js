/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */



const WIDTH = 7;
const HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // created a matrix by creating an array for each row and pushed it to the board
  // each row array contains WIDTH number of null elements and represents the columns
  for (let y = 0; y < HEIGHT; y++) {
    const arr = new Array(WIDTH).fill(null);
    board.push(arr)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');
   
  // TODO: add comment for this code
  // Create top row with width num of columns (table cells) and handle click function to insert color into that column
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //  Creates rows and columns in htmlBorad. Every table cell has unique id to identify.
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */


  // TODO: write the real version of this, rather than always returning 0
  //  Given the x column, this function returns next available empty spot from the bottom.
  // And if column is full, the return null.
  // y and x use to specify the table cell id
function findSpotForCol(x) {
    for (let y = HEIGHT-1; y >= 0; y--) {
      if (board[y][x] == null) {
        return y;
      }
    }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div to represent a color piece based on the currPlayer and insert it into correct table cell.
  // y = row, x = column
  const div = document.createElement('div')
  const td = document.getElementById(`${y}-${x}`)
  div.classList.add('piece');
  div.classList.add(`p${currPlayer}`);

  td.append(div)
  
  console.log(x, y)
}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  window.alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // this x represent column id clicked
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer
   
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const boardFilled = board.every(row => row.every(element => element == 1 || element == 2))
   if (boardFilled == true){
     return endGame('Game Tied')
   }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // if (currPlayer == 1){
  //   currPlayer = 2
  // } else if (currPlayer == 2){
  //   currPlayer = 1
  // }

  currPlayer = currPlayer == 1 ? 2 : 1 (ternary )
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
