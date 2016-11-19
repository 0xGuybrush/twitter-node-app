const express        = require('express');
const handlebars     = require('express3-handlebars');
const app            = express();
const port           = process.env.PORT || 5000;
const TwitterService = require('./twitter/twitter-service');

const twitterService = new TwitterService();

app.use('/', express.static('assets'));
app.engine('handlebars', handlebars({defaultLayout: 'page'}));
app.set('view engine', 'handlebars');

app.get('/status', (request, response) => {
  response.send('OK');
});

app.get('/', (request, response) => {
  response.render('home', {title: 'Home'});
});

app.get('/:username', (request, response) => {
  // TODO: Choose an appropriate status code for error state
  const username   = request.params['username'];
  const showTweets = tweets => response.render('tweets', {
    'username': username,
    'tweets': tweets
  });
  const showError  = error => {
    console.error(error);
    response.render('error');
  };

  twitterService
    .getTweets(username)
    .then(showTweets)
    .catch(showError);
});

app.listen(port, () => console.log('Listening on port:', port));

module.exports = app;
