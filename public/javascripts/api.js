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
  $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(randomMovie)).then(function(response){
    var image = response.image;
    console.log(response.Poster);
    if(image !== "undefined"){
      $('image').attr('src', image);
    }

  });
}

//apiCall();

$('button').click(function(){
  apiCall();
});
