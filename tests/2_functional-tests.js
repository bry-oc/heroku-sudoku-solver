const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        chai.request(server)
            .post('/api/solve')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'
            })
            .end(function (err, res) {
                assert.property(res.body, 'solution');
                assert.equal(res.body.solution, '827549163531672894649831527496157382218396475753284916962415738185763249374928651');
                done();
            })
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
        chai.request(server)
            .post('/api/solve')
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field missing');
                done();
            })
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
        chai.request(server)
            .post('/api/solve')
            .type('form')
            .send({
                puzzle: '8abcd..6...16..89...98315.749.157...ghe.......5x..4...96.415..81..7632..3...28.51'
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
        chai.request(server)
            .post('/api/solve')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.......'
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
        chai.request(server)
            .post('/api/solve')
            .type('form')
            .send({
                puzzle: '123456788.5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            })
    });
});

