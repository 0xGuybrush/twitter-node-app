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
    const getRawTweets = this._isValidUsername(username)
            ? this._retrieveFromTwitter(username)
            : Promise.reject(new Error('Provide a valid username'));

    return getRawTweets
             .then(this._formatResponse);
  }

  _retrieveFromTwitter(username) {
    const params   = createParams(username);
    const endpoint = 'statuses/user_timeline';
    return new Promise((resolve, reject) => {
        this.client.get(endpoint, params, (error, tweets, response) => {
          return error
                   ? reject(error)
                   : resolve(tweets);
        });
    });
  }

  _formatResponse(rawTweets) {
    /*
     * TODO: Link is cheating here, as depending on a redirect
     *  by twitter when using a correct ID string, but with a dummy
     * original poster (using 'get' below).
     *
     * The reason that this is in place is because the person's tweets
     * we're viewing mightn't provide the correct user ID if this was for
     * a retweet.
     *
     * Should be refactored to pull the original ID and construct a URL
     * that doesn't depend on a redirect by Twitter.
     */
    const filteredTweet = tweet => ({
      text: tweet.text,
      link: `https://twitter.com/get/status/${tweet.id_str}`,
      time: tweet.created_at,
      retweeted: tweet.retweet_count,
      favourited: tweet.favorite_count
    });

    if (!Array.isArray(rawTweets)) {
        return Promise.reject(new Error('Invalid JSON response'));
    }

    return new Promise((resolve, reject) => {
      const formattedTweets = rawTweets.map(filteredTweet);
      return resolve(formattedTweets);
    });
  }

  _isValidUsername(username) {
    // TODO: Consider wrapping this in an immediately resolving promise to
    // make parent function a more readable chain of events.
    const validUsernameFormat = /^[A-Za-z0-9_]{1,15}$/;
    return validUsernameFormat.test(username);
  }
};
