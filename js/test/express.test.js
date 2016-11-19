const assert  = require('assert');
const request = require('supertest');

const app     = require('../index');

function assertBodyOfEndpoint(endpoint, expectedBody, done) {
  request(app)
    .get(endpoint)
    .expect(200)
    .end((error, response) => {
      assert.equal(response.text, expectedBody);
      done();
    });
}

function assertStatusOfEndpoint(endpoint, expectedStatus, done) {
  request(app)
    .get(endpoint)
    .expect(expectedStatus, done);
}

describe('The application', () => {
  it('should respond successfully for configured', done => {
    const checkRequestGivesBody = (endpoint, result) => {
      assertBodyOfEndpoint(endpoint, result, done);
    };

    checkRequestGivesBody('/', 'OK');
  });

  it('should return a 404 statys for endpoints not configured', done => {
    const checkRequestGivesStatus = (endpoint, status) => {
      assertStatusOfEndpoint(endpoint, status, done);
    };

    checkRequestGivesStatus('/foo', 404);
  });
});
