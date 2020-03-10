const express = require('express');
const Twitter = require('twit');
const app = express();
const path = require('path');

const PORT = 4000;
const HOST = '0.0.0.0'
const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/', (req, res) => {
  // res.send('Server running');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/exists/:name', (req, res) => {
    const params = { screen_name: req.params.name };
    // console.log(req.params.name)
    client
      .get('users/lookup', params)
      .then(response => {
        res.send(response.data);
        // console.log('response', response)
      })
      .catch(error => {
      res.status(error.statusCode).send(error);
      // console.log('error', error)
    }); 
});

app.listen(process.env.PORT || PORT, function(){
  console.log('Your node js server is running');
});
