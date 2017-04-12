// test for red.ctrl
const request = require('supertest');
const should = require('should');
const app = require('../');
const models = require('../data/models');
const contents = [
  {
    category: 'algorithm',
    title: 'merge sort',
    contents: 'This is merge sort',
    code: 'function merge() { return merge++;}'
  },
  {
    category: 'programing language',
    title: 'call by value',
    contents: 'He called me as value!'
  },
  {
    category: 'network',
    title: 'IPv4',
    contents: 'What is IPv4?'
  }
];

describe('GET /red', () => {
  before(() => models.sequelize.sync({force: true}));
  before(() => models.Red.bulkCreate(contents));

  describe('success', () => {
    it('should returns status code as 200 and length is 3', (done) => {
      request(app)
        .get('/red')
        .expect(200)
        .end(done);
    });

    it('should returns contents as array', (done) => {
      request(app)
        .get('/red')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('it should returns datas from 1 to 2', (done) => {
      request(app)
          .get('/red?offset=1&limit=2')
          .end((err, res) => {
            res.body.should.have.lengthOf(2);
            done();
          });
    });

    it('it should returns only algorithms', (done) => {
      request(app)
          .get('/red?category='+ encodeURIComponent('algorithm'))
          .end((err, res) => {
            res.body.should.have.lengthOf(1);
            done();
          });
    });
  });



  describe('fail', () => {

  });
});