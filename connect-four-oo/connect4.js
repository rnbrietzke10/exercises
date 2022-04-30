/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
class Game {
  constructor(height, width, player1, player2) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.player1 = player1;
    this.player2 = player2;
    this.currPlayer = player1; // active player: 1 or 2
    this.gameOver = false;
    this.handleClick = this.handleClick.bind(this);
    this.placeInTable = this.placeInTable.bind(this);
    this.findSpotForCol = this.findSpotForCol.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const board = document.getElementById("board");

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    this.gameOver = true;
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */

  handleClick = evt => {
    // get x from ID of clicked cell
    if (!this.gameOver) {
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);

      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer.color} won!`);
      }
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame("Tie!");
      }

      // switch players
      this.currPlayer =
        this.currPlayer === this.player1 ? this.player2 : this.player1;
    }
  };

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    const _win = cells => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor() {
    this.color;
  }
}

const p1 = new Player();
const p2 = new Player();
document.querySelector("#start").addEventListener("click", startGame);
const board1 = new Game(6, 7, p1, p2);

function startGame(evt) {
  evt.preventDefault();
  if (board1.board.length === 0) {
    board1.makeBoard();
    board1.makeHtmlBoard();
  } else {
    clearBoard(board1);
    board1.makeBoard();
  }

  console.log("clicked");
  setColor(p1, p2);
  board1.gameOver = false;
}

function setColor(player1, player2) {
  const p1Color = document.querySelector("#player1");
  player1.color = p1Color.value;
  const p2Color = document.querySelector("#player2");
  player2.color = p2Color.value;
  p1Color.value = "";
  p2Color.value = "";
}

function clearBoard(board) {
  const pieces = document.querySelectorAll(".piece");
  console.log("Clear board");
  for (let piece of pieces) {
    piece.remove();
  }
  board.board = [];
}
