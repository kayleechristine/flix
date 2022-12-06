// Loading
const loader = document.querySelector('.preload');

// Glitch Database
fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log('Glitch:', data);
            document.querySelector(".preload").style.display = "none"; //stop the load
            document.querySelector(".display").style.display = "block"; //stop the load
        }, 3000);
    })

function getMovies() {
    fetch('https://determined-unleashed-ixia.glitch.me/movies').then((response) => {
        console.log('Movies:', response.json());
    });
}
// getMovies();

// Add a Movie
function addMovie(title, year, genre, plot, rated) {
    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        title, year, genre, plot, rated
    }).done(function(data) {
        // console.log('Movie added:', data); // Maybe breaks the function?
    });
}
// addMovie("b", "b", "b", "b", "b");

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
//--------------------- Create Movie Search Card ---------------------------
   // function creates card html for searched movie and assigns to a variable
    function makeMovieProfile(coffee) {

        let movieProfile = '<div class="card movieProfile" style="width: 18rem;">';
        movieProfile += '<img src="' + coffee.image +'" className="card-img-top" alt="...">';
        movieProfile += '<div class="card-body">'
        movieProfile += '<h5 class="card-title headerFont"> '+ coffee.name +' </h5>'
        movieProfile += '<p class="card-text">' + coffee.roast + ' roast</p>'
        movieProfile += '</div>'
        movieProfile += '</div>'

        return movieProfile;
    }
    // Pushes searched movie card to HTML container
    function loadMovieProfile() {

        let searchMovieContainer = document.querySelector('#movie-search-container');
        searchMovieContainer.innerHTML = makeMovieProfile();

    }
    //******* Still need to create HTML container assigned to container to feed to ******
//--------------------- End Movie Search Card ---------------------------
//--------------------- Start Search a Movie ----------------------------------
    let userMovieSearch = document.querySelector('#movie-search-btn');

    userMovieSearch.addEventListener('click', function (){

    event.preventDefault();

    let titleSearch = document.querySelector('#movie-search-input').value
    let omdbKey2 = "http://www.omdbapi.com/?t=" + titleSearch + "&apikey=850df038"

    fetch(omdbKey2).then((response) => {
        console.log('OMDB:', response.json());
    });
})
// --------------------- End Movie Search ----------------------------------
$.get("https://determined-unleashed-ixia.glitch.me/movies").done(function (data) {
    omdbData().then( data => {
    console.log('OMDB:', data);

    // Details from OMDB
    let {Title, Year, Genre, Rated, Plot, Poster} = data;
    console.log(Title, Year, Genre, Rated, Plot, Poster);

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