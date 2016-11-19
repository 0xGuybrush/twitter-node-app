const express = require('express');
const Twitter = require('twitter');
const handleBars = require('express3-handlebars');

const app     = express();
const port    = process.env.PORT || 5000;

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.engine('handlebars', handleBars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/:screenName', (req, res) => {
  let data;
  const validTwitterNameRegex = /^[A-Za-z0-9_]{1,15}$/;
  const screenName = req.params['screenName'];
  if (validTwitterNameRegex.test(screenName)) {
    const params = {
      screen_name: screenName
    };
   
    twitter.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) { // TODO: Handle errors in response
        data = {
          screenName: screenName,
          tweets: tweets
        };
//        console.log(JSON.stringify(tweets));
      } else {
        data = {
          screenName: screenName // TODO: Output more user details
        }
        //console.log(error);
      }
    res.render('tweets', data);
    });
  } else {
    console.error('Invalid Twitter username attempted');
    res.render('error', data);
  }
});

app.listen(port, () => console.log('Listening on port:', port));
