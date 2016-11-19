const assert     = require('assert');
const express    = require('express');
const fileSystem = require('fs');
const handlebars = require('express3-handlebars');
const request    = require('supertest');

const app        = express();

app.engine('handlebars', handlebars({defaultLayout: 'page'}));
app.set('view engine', 'handlebars');

app.get('/handlebars', (request, response) => {
  response.render('test', {
    title: 'Test'
  });
});

const testExpressServer = app.listen(8001);

function readFileAsString(fileName) {
  const sampleFilesDirectory = './js/test/sample-files/';
  return fileSystem.readFileSync(sampleFilesDirectory + fileName, 'UTF-8');
}

describe('Express-Handlebars rendering engine', () => {
  const expectedResult = readFileAsString('handlebars.html');

  it('should be able to wire in views correctly', done => {
  request(app)
    .get('/handlebars')
    .expect(200)
    .end((error, response) => {
      assert.equal(response.text, expectedResult);
      done();
    });
  });

  after(function() {
    testExpressServer.close();
  });
});
