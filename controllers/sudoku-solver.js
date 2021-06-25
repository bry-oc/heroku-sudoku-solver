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
    //if the value is in the row and not already placed
    //then it is invalid 
    for(let i = 0; i < 9; i++) {
      if(board[row][i] === value && board[row][column] != value) {
        return 'invalid row';
      }
    }
    return 'valid';
  }

  checkColPlacement(board, row, column, value) {
    //if the value is in the column and not already placed
    //then it is invalid 
    for(let i = 0; i < 9; i++) {
      if(board[i][column] === value && board[row][column] != value) {
        return 'invalid column';
      }
    }
    return 'valid';
  }

  checkRegionPlacement(board, row, column, value) {
    //identify starting row and column of 3x3 region
    let rowVal = row;
    let regionRowStart = rowVal % 3;
    while(regionRowStart %3 != 0){
      rowVal -= 1;
      regionRowStart = rowVal % 3;
    }
    
    let columnVal = column;
    let regionColStart = columnVal % 3;

    while(regionColStart % 3 != 0){
      columnVal -= 1;
      regionColStart = columnVal % 3;
    }

    const regionRowEnd = rowVal + 2;
    const regionColEnd = columnVal + 2;

    for(let i = rowVal; i <= regionRowEnd; i++) {
      for(let j = columnVal; j <= regionColEnd; j++) {
        if(board[i][j] === value && board[row][column] != value) {
          return 'invalid region';
        }
      }
      return 'valid';
    }
  }

  solve(board) {
    
  }
}

module.exports = SudokuSolver;

