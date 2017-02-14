var express = require('express');
var request = require('request');
var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static('public'));

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
