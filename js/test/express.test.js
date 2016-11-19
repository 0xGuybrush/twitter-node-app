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
  it('should respond successfully for rendered endpoints', done => {
    const checkRequestGivesBody = (endpoint, result) => {
      assertBodyOfEndpoint(endpoint, result, done);
    };

    checkRequestGivesBody('/status', 'OK');
  });

  it('should return a 404 statys for endpoints not configured', done => {
    const checkRequestGivesStatus = (endpoint, status) => {
      assertStatusOfEndpoint(endpoint, status, done);
    };

    checkRequestGivesStatus('/foo/bar?q=bax', 404);
  });

  it('should be able to serve static files correctly', done => {
    const checkRequestGivesBody = (endpoint, result) => {
      assertBodyOfEndpoint(endpoint, result, done);
    };

    const expectedResponse = 'Author: Dave Moloney\n';

    checkRequestGivesBody('/humans.txt', expectedResponse);
  });
});
