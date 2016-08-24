var randomMovieArray =
    ['The Dark Knight',
     'Saving Private Ryan',
     'Harry Potter',
     'Secret Life of Pets',
     'Star Wars',
     'Skyfall',
     'Batman Begins',
     'Forgetting Sarah Marshall',
     'Fury'
    ]

// var randomNumber = Math.floor((Math.random() * randomMovieArray.length - 1) + 1);

// var randomMovie = randomMovieArray[randomNumber];

function apiCall() {
  var randomNumber = Math.floor((Math.random() * randomMovieArray.length - 1) + 1);
  var randomMovie = randomMovieArray[randomNumber];
  $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(randomMovie)).then(function(response){
    var image = response.Poster;
    console.log(response.Poster);
    if(image !== "N/A"){
      $('image').attr('src', image);
    }

  });
}

apiCall();

$('.search button').click(function(){
  apiCall();
});
