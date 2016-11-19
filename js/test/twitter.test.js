const assert            = require('assert');
const TwitterService    = require('../twitter/twitter-service');
const fileSystem	= require('fs');

const mockTwitterClient = {
  get: (endpoint, parameters, callback) => {
    const sampleFilesDirectory = './js/test/sample-files/';
    const tweets = fileSystem.readFileSync(
      sampleFilesDirectory + 'twitter-api-response.json',
      'UTF-8'
    );
    const error = null;
    const response = null;

    return callback(error, tweets, response);
  }
};

function checkJsonVersusJavaScript(jsonObject, javaScriptObject) {
  assert.deepEqual(
    JSON.parse(jsonObject),
    javaScriptObject
  );
}

describe('The Twitter service', () => {
  const twitter                = new TwitterService(mockTwitterClient);

  it('should return a promise of some tweets', done => {
    const expectedValue  = {hello: 'world'};
    const checkValue = result => {
      checkJsonVersusJavaScript(result, expectedValue);
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
