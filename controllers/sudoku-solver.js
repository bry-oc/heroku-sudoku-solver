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

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

