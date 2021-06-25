'use strict';

const multer = require('multer');

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  const upload = multer();

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(upload.none(), (req, res) => {
      //check if required fields were sent and validate the puzzle
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = parseInt(req.body.value);

      if(!puzzle || !coordinate || !value) {
        return res.json({error: 'Required field missing'});
      }      
      const validatePuzzle = solver.validate(puzzle);
      if(validatePuzzle !== 'valid'){
        if(validatePuzzle === 'invalid char') {
          return res.json({ error: 'Invalid characters in puzzle' });
        }
        if(validatePuzzle === 'invalid length') {
          return res.json({ error: 'Expected puzzle to be 81 characters long' });
        }
      }      
      //validate coordinate and value;
      const validateCoordinate = solver.validateCoordinate(coordinate);
      if(validateCoordinate !== 'valid'){
        return res.json({ error: 'Invalid coordinate'});
      }
      if(typeof(value) != 'number' || !(value >= 1 && value <= 9)) {
        return res.json({ error: 'Invalid value' });
      }
      //populate the puzzle and board configuration
      solver.puzzleString = puzzle;
      solver.generateBoard(solver.puzzleString);
      //split coordinate into row and column;
      const RowsEnum = Object.freeze({"A":0, "B":1, "C":2, "D":3, "E":4, "F":5, "G":6, "H":7, "I":8 });
      const row = RowsEnum[coordinate.split('')[0]];
      const column = coordinate.split('')[1] - 1;
      //check value placement
      let conflict = [];
      if(solver.checkRowPlacement(solver.board, row, column, value) != 'valid'){
        conflict.push('row');
      }
      if(solver.checkColPlacement(solver.board, row, column, value) != 'valid'){
        conflict.push('column');
      }
      if(solver.checkRegionPlacement(solver.board, row, column, value) != 'valid'){
        conflict.push('region');
      }
      //if any of the checks fail, the placement is not valid and indicate where it conflicts
      if(conflict.length != 0){
        return res.json({valid: false, conflict: conflict});
      }
      //otherwise the placement is valid
      return res.json({valid: true});
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
