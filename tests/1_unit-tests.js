const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

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
});
