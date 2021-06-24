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
      if(!puzzle) {
        return res.json({error: 'Required field missing'});
      }      
      const validate = solver.validate(puzzle);
      if(validate !== 'valid'){
        if(validate === 'invalid char') {
          return res.json({ error: 'Invalid characters in puzzle' });
        }
        if(validate === 'invalid length') {
          return res.json({ error: 'Expected puzzle to be 81 characters long' });
        }
      }
      //populate the puzzle and board configuration
      solver.puzzleString = puzzle;
      let board = [];
      let row = [];
      for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
          row.push(solver.puzzleString[i * 9 +j]);
        }
        board.push(row);
        row = [];
      }
      solver.board = board;
      console.log(solver.board);
      console.log(solver.puzzleString);
      return res.json({status:'success'});
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
