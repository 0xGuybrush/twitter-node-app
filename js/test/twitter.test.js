const assert            = require('assert');
const TwitterService    = require('../twitter/twitter-service');
const fileSystem	= require('fs');

function createStringFromFile(fileName) {
    const path = `./js/test/sample-files/${fileName}`;
    const rawFile = fileSystem.readFileSync(path, 'UTF-8');
    return JSON.parse(rawFile);
}

const mockTwitterClient = {
  get: (endpoint, parameters, callback) => {
    const tweets = createStringFromFile('raw-twitter-api-response.json');
    const error = null;
    const response = null;

    return callback(error, tweets, response);
  }
};

function checkReturnedValue(actualValue, expectedValue) {
  assert.deepEqual(actualValue, expectedValue);
}

describe('The Twitter service', () => {
  const twitter = new TwitterService(mockTwitterClient);

  it('should return a promise of some tweets', done => {
    const expectedValue  = createStringFromFile(
        'expected-formatted-response.json'
    );
    const checkValue = actualValue => {
      checkReturnedValue(actualValue, expectedValue);
      done();
    };

    twitter.getTweets('hello')
      .then(checkValue, done)
      .catch(done);
  });

  it('should return a rejected promise for an invalid username', done => {
    const checkExpectedFailure = error => {
      return error.message === 'Provide a valid username'
        ? undefined
        : error;
    };

    const invalidUsername = 'This user name contains space';

   // Return silently from done if error is expected,
   // otherwise throw the error and let Mocha handle it.
   twitter.getTweets(invalidUsername)
     .then(done)
     .catch(error => done(checkExpectedFailure(error)));
  });
});
