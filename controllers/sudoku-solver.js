class SudokuSolver {
  constructor() {
    this.puzzleString = null;
    this.board = [];
  }

  validate(puzzleString) {
    const puzzleFormat = /(\d|\.){81}/;
    if(puzzleString.length != 81){
      return 'invalid length';
    } else if(!puzzleString.match(puzzleFormat)){
      return 'invalid char';
    } else {        
      return 'valid';
    }
  }

  validateCoordinate(coordinate) {
    const coordinateFormat = /^[A-I][1-9]$/;
    if(!coordinate.toUpperCase().match(coordinateFormat)) {
      return 'invalid coordinate';
    }
    return 'valid';
  }

  generateBoard(puzzleString) {
    let board = [];
    let row = [];
    for(let i = 0; i < 9; i++) {
      for(let j = 0; j < 9; j++){
        row.push(parseInt(puzzleString[i * 9 + j]));
      }
      board.push(row);
      row = [];
    }
    this.board = board; 
  }

  checkRowPlacement(board, row, column, value) {
    for(let i = 0; i <= 9; i++) {
      if(board[row][i] === value && board[row][column] != value) {
        return 'invalid row';
      }
    }
    return 'valid';
  }

  checkColPlacement(board, row, column, value) {
    for(let i = 0; i <= 9; i++) {
      if(board[i][column] === value && board[row][column] != value) {
        return 'invalid column';
      }
    }
    return 'valid';
  }

  checkRegionPlacement(board, row, column, value) {

  }

  solve(board) {
    
  }
}

module.exports = SudokuSolver;

