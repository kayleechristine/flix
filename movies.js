// Loading
const loader = document.querySelector('.preload');

movie = {title: "Ponyo", year: "2008", genre: "Animation, Adventure, Comedy", plot: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.", rated: "G"};

// Add a Movie
function addMovie(title, year, genre, plot, rated) {
    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        title, year, genre, plot, rated
    }).done(function() {
        console.log('Movie added'); // Maybe breaks the function?
    });
}
addMovie("Spirited Away", "2008", "Animation, Adventure, Comedy", "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.", "G");

// function addMovie() {
//     let newMovie = {
//         title: "Ponyo",
//         year: "2008",
//         genre: "Animation, Adventure, Comedy",
//         plot: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
//         rated: "G"
//     }
//     $.ajax('https://determined-unleashed-ixia.glitch.me/movies', {
//         method: "POST",
//         data: newMovie
//     })
//     console.log('Movie added');
// }
// addMovie();

// Glitch Database
fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log('Glitch:', data);
            document.querySelector(".preload").style.display = "none"; // stop the load
            document.querySelector(".display").style.display = "block"; // show the main
        }, 3000);
    })

function getMovies() {
    fetch('https://determined-unleashed-ixia.glitch.me/movies').then((response) => {
        console.log('Movies:', response.json());
    });
}
getMovies();

// Remove a Movie
function removeMovie(id) {
    fetch('https://determined-unleashed-ixia.glitch.me/movies' + "/" + id, {
        method: 'DELETE'
    }).then(() => {
        console.log('removed');
    }).catch(err => {
        console.error(err)
    });
}
// removeMovie();

// OMDB Pull Function
function omdbData() {
    return fetch(omdbKey).then(response => response.json()) // Converts the response into a json
}

$.get("https://determined-unleashed-ixia.glitch.me/movies").done(function (data) {
    omdbData().then( data => {
    console.log('OMDB:', data);

    // Details from OMDB
    let {Title, Year, Genre, Rated, Plot, Poster} = data;
    // console.log(Title, Year, Genre, Rated, Plot, Poster);

    // Pushes to the Card
    $('#title').html(Title);
    $('#year').html(Year);
    $('#genre').html(Genre);
    $('#rated').html(Rated);
    $('#plot').html(Plot);
    $('#img').html(`<img src="${Poster}" class="rounded-start img-fluid">`);

    });
});

// Specifications
// Your application should:
//
//      On page load:
//      Display a "loading..." message
//      TODO: Make an AJAX request to get a listing of all the movies
//      TODO: When the initial AJAX request comes back, remove the "loading..." message and
//       replace it with HTML generated from the json response your code receives
//
//      Allow users to add new movies:
//      TODO: Create a form for adding a new movie that has fields for the movie's title and rating
//      TODO: When the form is submitted, the page should not reload / refresh, instead, your javascript
//       should make a POST request to /movies with the information the user put into the form
//
//      Allow users to edit existing movies:
//      TODO: Give users the option to edit an existing movie
//      TODO: A form should be pre-populated with the selected movie's details
//      TODO: Like creating a movie, this should not involve any page reloads, instead your javascript
//       code should make an ajax request when the form is submitted.
//
//      Delete movies:
//      TODO: Each movie should have a "delete" button
//      TODO: When this button is clicked, your javascript should send a DELETE request
//
//      Bonuses:
//      TODO: Add a disabled attribute to buttons while their corresponding ajax request is still pending.
//      TODO: Show a loading animation instead of just text that says "loading...".
//      TODO: Use modals for the creating and editing movie forms.
//      TODO: Add a genre property to every movie.
//      TODO: Allow users to sort the movies by rating, title, or genre (if you have it).
//      TODO: Allow users to search through the movies by rating, title, or genre (if you have it).
//      TODO: Use a free movie API like OMDB to include extra info or render movie posters.