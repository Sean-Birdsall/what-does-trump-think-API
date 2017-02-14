angular.module('game', [])
  .controller('mainController', mainController);

mainController.$inject = ['$http'];

function mainController($http){
  var main = this;

  main.getTweet = function(){

    $http.get('/tweets')
      .then(function(res){
        main.personalQuote = null;
        main.randomQuote = null;
        // console.log(res.data[Math.floor(getRandomInt(0, 20))].text);
        main.tweet = res.data[Math.floor(getRandomInt(0, 20))].text;
      }, function(err){
        if (err){
          console.log(err);
        }
      });

  }

  main.increaseScore = function() {
    $http.get('/random-quote')
      .then(function(res){
        main.personalQuote = null;
        main.tweet = null;
        main.randomQuote = res.data.message;
      }, function(err){
        if (err){
          console.log(err);
        }
      });
  }

  main.getPersonalQuote = function(){

    if (main.name != undefined){
      $http.get(`/personal-quote?q=${main.name}`)
        .then(function(res){
          main.randomQuote = null;
          main.tweet = null;
          main.personalQuote = res.data.message;
        }, function(err){
          if (err){
            console.log(err);
          }
        });
    } else {
      alert("Please enter your name in the textbox provided");
    }


  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
