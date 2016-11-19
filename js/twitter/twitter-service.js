/*
 * TODO: Consider passing this in completely externally,
 * 	 rather than using concrete implementation as fallback value
 */
const Twitter = require('twitter');

/* eslint-disable camelcase */
const twitterApiConfig = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const createParams = username => ({screen_name: username});
/* eslint-enable camelcase */

module.exports = class TwitterService {
  constructor(twitterRestClient = new Twitter(twitterApiConfig)) {
    this.client = twitterRestClient;
  }

  getTweets(username) {
    return this._isValidUsername(username)
            ? this._retrieveFromTwitter(username)
            : Promise.reject(new Error('Provide a valid username'));
  }

  _retrieveFromTwitter(username) {
    const params   = createParams(username);
    const endpoint = 'statuses/user_timeline';
    return new Promise((resolve, reject) => {
        this.client.get(endpoint, params, (error, tweets, response) => {
        console.log(JSON.stringify(tweets));
          return error
                   ? reject(error)
                   : resolve(tweets);
        });
    });
  }

  _isValidUsername(username) {
    // TODO: Consider wrapping this in an immediately resolving promise to
    //       make parent function a more readable chain of events.
    const validUsernameFormat = /^[A-Za-z0-9_]{1,15}$/;
    return validUsernameFormat.test(username);
  }
};
