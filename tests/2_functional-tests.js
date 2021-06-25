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

    test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'A1',
                value: 5
            })
            .end(function (err, res) {
                assert.property(res.body, 'valid');
                assert.equal(res.body.valid, true);
                done();
            })
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'A1',
                value: 3
            })
            .end(function (err, res) {
                assert.property(res.body, 'valid');
                assert.property(res.body, 'conflict');
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 1);
                assert.equal(res.body.conflict[0], 'column');
                done();
            })
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'A1',
                value: 2
            })
            .end(function (err, res) {
                assert.property(res.body, 'valid');
                assert.property(res.body, 'conflict');
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 2);
                assert.equal(res.body.conflict[0], 'row');
                assert.equal(res.body.conflict[1], 'region');
                done();
            })
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'I4',
                value: 1
            })
            .end(function (err, res) {
                assert.property(res.body, 'valid');
                assert.property(res.body, 'conflict');
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 3);
                assert.equal(res.body.conflict[0], 'row');
                assert.equal(res.body.conflict[1], 'column');
                assert.equal(res.body.conflict[2], 'region');
                done();
            })
    });


    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Required field(s) missing');
                done();
            })
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '8abcd..6...16..89...98315.749.157...ghe.......5x..4...96.415..81..7632..3...28.51',
                coordinate: 'A1',
                value: '4'
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
    });

    test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.......',
                coordinate: 'A1',
                value: '4'
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'F65',
                value: 1
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            })
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
        chai.request(server)
            .post('/api/check')
            .type('form')
            .send({
                puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
                coordinate: 'F6',
                value: 12
            })
            .end(function (err, res) {
                assert.property(res.body, 'error');
                assert.equal(res.body.error, 'Invalid value');
                done();
            })
    });
});

