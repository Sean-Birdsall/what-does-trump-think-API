var express = require('express');
var request = require('request');
var lame = require('./lame');
var PORT = process.env.PORT || 8080;
var Twit = require('twit');

var T = new Twit({
  consumer_key: lame.consumer_key,
  consumer_secret: lame.consumer_secret,
  access_token: lame.access_token,
  access_token_secret: lame.access_token_secret
});

var app = express();

app.use(express.static('public'));

app.get('/tweets', (req, res) => {
  T.get('statuses/user_timeline', { screen_name: '@realDonaldTrump'}, function(err, data, response) {
    res.send(data);
  })
})

app.get('/random-quote', (req, res) =>{
  request('https://api.whatdoestrumpthink.com/api/v1/quotes/random', (err, response, body) => {
    if (err){
      console.log('API Error');
    }
    res.send(body);
  })
})

app.get('/personal-quote', (req, res) =>{
  request(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${encodeURIComponent(req.query.q)}`, (err, response, body) => {
    if (err){
      console.log(err);
    }
    res.send(body);
  })
})

app.listen(PORT, (err) => {
  if (err){
    console.log('Server Error:', err);
  } else {
    console.log(`Server up and running on port ${PORT}`);
  }
})
