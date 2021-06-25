const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;
solver.puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
solver.generateBoard(solver.puzzleString);

suite('UnitTests', () => {   

    suite('Logic for handling string input', function(){
        test('Logic handles a valid puzzle string of 81 characters', function(){
            assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 'valid');
        });
    
        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
            assert.equal(solver.validate('1.5..2.84..63.12.7.2..5abcde9..1....8.2.3674.3.7.2..9.47...8..1..16..z.926914.37.'), 'invalid char');
        });
    
        test('Logic handles a puzzle string that is not 81 characters in length', function(){
            assert.equal(solver.validate('1.5..2.84.6....926914.37.'), 'invalid length');
        });
    });    

    suite('Logic for row placement', function(){        
        test('Logic handles a valid row placement', function(){
            assert.equal(solver.checkRowPlacement(solver.board,8,4,5), 'valid');
        })
        test('Logic handles an invalid row placement', function(){
            assert.equal(solver.checkRowPlacement(solver.board,0,1,4), 'invalid row');
        })
    });

    suite('Logic for column placement', function(){
        test('Logic for a valid column placement', function(){
            assert.equal(solver.checkColPlacement(solver.board,0,1,5), 'valid');
        });
        test('Logic for an invalid column placement', function(){
            assert.equal(solver.checkColPlacement(solver.board,0,2,1), 'invalid column');
        });
    });
    
    suite('Logic for region placement', function(){
        test('Logic handles a valid region (3x3 grid) placement', function(){
            assert.equal(solver.checkRegionPlacement(solver.board,8,4,5), 'valid');
        });
        test('Logic handles an invalid region (3x3 grid) placement', function(){
            assert.equal(solver.checkRegionPlacement(solver.board,8,4,8), 'invalid region');
        });
    });

    suite('Logic for solving', function(){
        test('Solver returns true for an incomplete, solvable puzzle', function(){
            assert.equal(solver.solve(solver.board), true);
        });
        test('Solver returns the expected solution for an incomplete puzzle', function(){
            solver.solve(solver.board);
            assert.equal(solver.board.flat().join(''), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        });        
        test('Solver returns false for an incomplete, unsolvable puzzle', function(){
            solver.puzzleString = '123456788.5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
            solver.generateBoard(solver.puzzleString);
            assert.equal(solver.solve(solver.board), false);
        });
    })
});
