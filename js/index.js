const express    = require('express');
const handlebars = require('express3-handlebars');
const app        = express();
const port       = process.env.PORT || 5000;

app.use('/', express.static('assets'));
app.engine('handlebars', handlebars({defaultLayout: 'page'}));
app.set('view engine', 'handlebars');

app.get('/status', (request, response) => {
  response.send('OK');
});

app.get('/', (request, response) => {
  const metadata = {
    title: 'Home'
  };
  response.render('home', metadata);
});

app.listen(port, () => console.log('Listening on port:', port));

module.exports = app;
