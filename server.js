const express = require('express');
const Twitter = require('twit');
const app = express();
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'
const client = new Twitter({
    consumer_key: 'ZZaq1WNWyrct8TC6KhBHPZg3F',
    consumer_secret: 'DAVIqeOOw0iU9r3zczCD9BJcykyGTbccetw67KOZ3rPzXM3t8v',
    access_token: '376020588-fPbhUUYEVvfrHHwjvKth0fkInHKjIwa2pbIl8HNJ',
    access_token_secret: 'vHZyi5tWus8UgXICtWrz82em1Dv9R2eS8wQ398jMreJMM'
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
        res.send(response);
        // console.log('response', response)
      })
      .catch(error => {
      res.status(error.statusCode).send(error);
      // console.log('error', error)
    }); 
});

app.listen(process.env.PORT || 4000, function(){
  console.log('Your node js server is running');
});