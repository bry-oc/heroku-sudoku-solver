'use strict';

const multer = require('multer');

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  const upload = multer();

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(upload.none(), (req, res) => {
      //check if a puzzle was sent and validate the format
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
      //populate the puzzle and board configuration
      solver.puzzleString = puzzle;
      solver.generateBoard(solver.puzzleString);
      //validate coordinate and value;
      const validateCoordinate = solver.validateCoordinate(coordinate);
      if(validateCoordinate !== 'valid'){
        return res.json({ error: 'Invalid coordinate'});
      }
      if(typeof(value) != 'number' || !(value >= 1 && value <= 9)) {
        return res.json({ error: 'Invalid value' });
      }
      //split coordinate into row and column;
      const RowsEnum = Object.freeze({"A":0, "B":1, "C":2, "D":3, "E":4, "F":5, "G":6, "H":7, "I":8 });
      const row = RowsEnum[coordinate.split('')[0]];
      const column = coordinate.split('')[1] - 1;
      //check value placement
      return res.json({valid: true});
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
