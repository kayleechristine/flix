// --------------------- Add Movie --------------------------- //
// Adds a movie to the Glitch movie database.
function addMovie(title, year, genre, plot, rated) {
    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        title, year, genre, plot, rated
    }).done(function() {
        console.log('Movie added');
    });
}

// --------------------- Glitch Database --------------------------- //
// Fetches movie information from the Glitch database.
// Sets a "Loading" message while the promise is still pending.
// getMovies function returns a list of movies in the Glitch database.
fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log('Glitch:', data);
            document.querySelector(".preload").style.display = "none"; // stop the load
            document.querySelector(".display").style.display = "flex"; // show the main
        }, 3000);
    })

function getMovies() {
    return fetch('https://determined-unleashed-ixia.glitch.me/movies').then(response => response.json());
}
getMovies().then(data => console.log('Glitch:', data[0].Title));

// --------------------- Remove Movie Card --------------------------- //
// Removes a movie from the Glitch database via the id number.
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

// --------------------- OMDB Movie Data --------------------------- //
// Accepts a movie title and returns the data from OMDB.
function movieData(title) {
    let link = `http://www.omdbapi.com/?t=${title}&apikey=850df038`;
    return fetch(link).then(response => response.json()).then(data => {
        console.log(`${title}:`, data);
    });
}
// movieData("little mermaid");

function omdbData() {
    return fetch(omdbKey).then(response => response.json());
}
// omdbData().then(data => console.log('OMDB:', data));

// --------------------- Create Movie Card --------------------------- //
// Creates pulls movie data from the OMDB API and assigns it to variables.
// It then generates the card HTML to be pushed into the Doc later on.

let omdbKey2;

function makeMovieCards() {

    getMovies().then(data => {
        console.log(data);

        let movieCard = '';
        let movieContainer = document.querySelector('#movie-search-container');

        data.forEach(movie => {

            // OMDB Data
            let {Title, Year, Genre, Rated, Plot, Poster} = movie;
            console.log(Title, Year, Genre, Rated, Plot, Poster);

            // Generates Card HTML
            movieCard += `<div class="card text-white bg-primary mb-3">`;
            movieCard += `<div class="row g-0"><div class="col-md-4 d-flex">`;
            movieCard += `<img src="${Poster}" class="rounded-start img-fluid"></div>`;
            movieCard += `<div class="col-md-8"><div class="card-body">`;
            movieCard += `<h5 class="card-title d-inline">${Title}</h5>`;
            movieCard += `<small class="text-muted ms-2">${Year}</small>`;

            movieCard += `<div class="btn-group dropend">`;
            movieCard += `  <button type="button" class="btn btn-dark btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                            </button>`;
            movieCard += `  <ul class="dropdown-menu">
                            <li><a href="#">Edit</a></li>
                            <li><a href="#">Delete</a></li>
                            </ul>
                            </div>`;
            movieCard += `<p class="card-text mt-2">${Plot}</p>`;
            movieCard += `<p class="card-text">`;
            movieCard += `<small class="text-muted bottom">${Rated} | ${Genre}</small>`;
            movieCard += `</p></div></div></div></div>`;

            // console.log(`${Title}:`, movieCard);

        })

        // console.log('Movie Card:', movieCard);
        movieContainer.innerHTML = movieCard;

    })
}
makeMovieCards();

// --------------------- Movie Search --------------------------- //
//
let userMovieSearch = document.querySelector('#movie-search-btn');
userMovieSearch.addEventListener('click', searchMovies);

function searchMovies() {
    event.preventDefault();

    let titleSearch = document.querySelector('#movie-search-input').value;
    omdbKey2 = "http://www.omdbapi.com/?t=" + titleSearch + "&apikey=850df038";

    fetch(omdbKey2).then((response) => {
        console.log('OMDB:', response.json());
    });
}

function searchData() {
    return fetch(omdbKey2).then(response => response.json());
}

// Specifications
// Your application should:
//
//      On page load:
//      Display a "loading..." message
//      Make an AJAX request to get a listing of all the movies
//      When the initial AJAX request comes back, remove the "loading..." message and
//       replace it with HTML generated from the json response your code receives
//
//      Allow users to add new movies:
//      Create a form for adding a new movie that has fields for the movie's title and rating
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