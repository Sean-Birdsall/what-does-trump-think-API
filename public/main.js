angular.module('game', [])
  .controller('mainController', mainController);

mainController.$inject = ['$http'];

function mainController($http){
  var main = this;

  main.personalQuote = null;
  main.randomQuote = null;

  main.score = 0;

  main.increaseScore = function() {
    $http.get('/random-quote')
      .then(function(res){
        main.personalQuote = null;
        main.randomQuote = res.data.message;
        console.log(res.data.message);
      }, function(err){
        if (err){
          console.log(err);
        }
      })
  }

  main.getPersonalQuote = function(){

    if (main.name != undefined){
      $http.get(`/personal-quote?q=${main.name}`)
        .then(function(res){
          main.randomQuote = null;
          main.personalQuote = res.data.message;
        }, function(err){
          if (err){
            console.log(err);
          }
        })
    }


  }

}
