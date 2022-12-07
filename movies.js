//-------------------------- Genre Code ----------------------------

// Function generates genres selected into a global array
let newMovieGenres = []
function addNewGenre() {
    newMovieGenres = [];
    let genresChecked = document.getElementsByClassName("new-movie-genre");
    for (let i = 0; i < 15; i++) {
        if (genresChecked[i].checked === true && newMovieGenres.length === 0) {
            newMovieGenres.push(`${genresChecked[i].value}`);
        }
        else if (genresChecked[i].checked === true){
            newMovieGenres.push(` ${genresChecked[i].value}`);
        }
    }
    return newMovieGenres.toString()
}

//--------------------------- Add Movie Code ---------------------------
let movieAddBtn = document.querySelector('#movie-add-btn');
movieAddBtn.addEventListener('click', addMovie);

// function makes post request to glitch db
function addMovie() {
    event.preventDefault();

    let newTitle = document.querySelector('#new-movie-title').value;
    let newYear = document.querySelector('#new-movie-year').value;
    let newGenre = addNewGenre()
    let newPlot = document.querySelector('#new-movie-plot').value;
    let newRated = document.querySelector('#new-movie-rated').value;
    let newPoster = document.querySelector('#new-movie-poster').value;

    postTest(newTitle, newYear, newGenre, newPlot, newRated, newPoster);
    console.log(newTitle, newYear, newGenre, newPlot, newRated, newPoster);
}

function postTest(title, year, genre, plot, rating, poster) {
    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        Title: title,
        Year: year,
        Genre: genre,
        Plot: plot,
        Rated: rating,
        Poster: poster,
    }).done(function (data) {
        // do something with the response
    });
}

// --------------------- Glitch Database --------------------------- //
// Fetches movie information from the Glitch database.
// Sets a "Loading" message while the promise is still pending.
// getMovies function returns a list of movies in the Glitch database.
// Loads event listeners after cards have populated.
fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log('Glitch:', data);
            document.querySelector(".preload").style.display = "none"; // hide the load animation
            document.querySelector(".display").style.display = "flex"; // show the main content
        }, 3000);
    })

function getMovies() {
    return fetch('https://determined-unleashed-ixia.glitch.me/movies').then(response => response.json());
}
getMovies().then(data => console.log('Glitch:', data));
getMovies();

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
// removeMovie(1);

// --------------------- OMDB Movie Data --------------------------- //
// Accepts a movie title and returns the data from OMDB.
function movieData(title) {
    let link = `http://www.omdbapi.com/?t=${title}&apikey=850df038`;
    return fetch(link).then(response => response.json()).then(data => {
        console.log(`${title}:`, data);
    });
}

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
            let {Title, Year, Genre, Rated, Plot, Poster, id} = movie;
            // console.log(Title, Year, Genre, Rated, Plot, Poster, id);

            // Generates Card HTML
            movieCard += `<div class="card text-white bg-primary mb-3">`;
            movieCard += `<div class="row g-0"><div class="col-md-4 d-flex">`;
            movieCard += `<img src="${Poster}" class="rounded-start img-fluid"></div>`;
            movieCard += `<div class="col-md-8"><div class="card-body">`;
            movieCard += `<h5 class="card-title d-inline">${Title}</h5>`;
            movieCard += `<small class="text-muted ms-2">${Year}</small>`;
            movieCard += `<div class="dropend">`;
            movieCard += `<button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>`;
            movieCard += `  <ul class="dropdown-menu">
                                <li><a class="dropdown-item edit-movie" href="#" data-dbid="${id}">Edit</a></li>
                                <li><a class="dropdown-item delete-movie" href="#" data-dbid="${id}">Delete</a></li>
                            </ul>
                            </div>`;
            movieCard += `<p class="card-text mt-2">${Plot}</p>`;
            movieCard += `<p class="card-text"><small class="text-muted bottom">${Rated} | ${Genre}</small>`;
            movieCard += `</p></div></div></div></div>`;

        })

        movieContainer.innerHTML = movieCard;

        // Edit Movie TODO: Functionality
        $('.edit-movie').click(function(e){
            e.preventDefault();
            console.log('Edit Movie fired');
            alert('Boom');

            let editId = this.getAttribute('data-dbid');
            console.log(editId);
            getMovies().then(data => console.log('Edit this:', data[editId - 1].Title));

        })

        // Delete Movie
        $('.delete-movie').click(function(e){
            e.preventDefault();
            let deleteId = this.getAttribute('data-dbid');
            removeMovie(deleteId);
        })

    })

}
makeMovieCards();

// $("#movie-search-container").css("display: none");
// --------------------- Movie Search --------------------------- //
//
let userMovieSearch = document.querySelector('#movie-search-btn');
userMovieSearch.addEventListener('click', makeSearchCard);

function searchMovies() {
    event.preventDefault();
    let titleSearch = document.querySelector('#movie-search-input').value;
    omdbKey2 = "http://www.omdbapi.com/?t=" + titleSearch + "&apikey=850df038";
    return fetch(omdbKey2).then(response => (response.json()))
}

function makeSearchCard() {

    searchMovies().then(data => {
        console.log(data);
        let smallCards = document.querySelector("#movie-search-container");
        smallCards.innerHTML = ''

        let movieCard = '';
        let searchContainer = document.querySelector('#movie-large-container');

        let searchedTitle = data.Title
        let searchedActors = data.Actors
        let searchedDirectors = data.Director
        let searchedPlot = data.Plot
        let searchedGenre = data.Genre
        let searchedPoster = data.Poster

        console.log(searchedTitle, searchedActors, searchedDirectors, searchedPlot, searchedGenre, searchedPoster);


        // Generates Card HTML
        let searchedMovieCard = `<div class="card text-white bg-primary mb-3 " style="width: 87%; height: 70%">`
        searchedMovieCard += `<div class="row g-0">`
        searchedMovieCard += `<div class="col-md-4" style="width: 28%;">`
        searchedMovieCard += `<img src="${searchedPoster}" class="img-fluid rounded-start" alt="...">`
        searchedMovieCard += `</div>`
        searchedMovieCard += `<div class="col-md-8">`
        searchedMovieCard += `<div class = "card-body">`
        searchedMovieCard += `<h5 class = "card-title" id ="searched-title" >${searchedTitle}</h5><br>`
        searchedMovieCard += `<p class="card-text" id="searched-actors"><span class="large-card-label">Cast:</span> ${searchedActors}</p><br>`
        searchedMovieCard += `<p class="card-text" id="searched-directors"><span class="large-card-label">Directed By:</span> ${searchedDirectors}</p><br>`
        searchedMovieCard += `<p class="card-text" id="searched-plot"><span class="large-card-label">Summary:</span> ${searchedPlot}</p><br>`
        searchedMovieCard += `<p class="card-text" id="searched-genre"><span class="large-card-label">Genre:</span> ${searchedGenre}</p><br>`
        searchedMovieCard += `</div>`
        searchedMovieCard += `</div>`
        searchedMovieCard += `</div>`
        searchedMovieCard += `</div>`

        // Pushes to card container
        searchContainer.innerHTML = searchedMovieCard;

    })
}

//--------------- Reloads starting cards when home button is pressed --------------
let homeBtn = document.querySelector('#home');
let searchContainer = document.querySelector("#movie-large-container");
homeBtn.addEventListener('click', function (){
    searchContainer.innerHTML = ''
    makeMovieCards();
});

// function searchData() {
//     return fetch(omdbKey2).then(response => response.json());
// }

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
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      TODO: Like creating a movie, this should not involve any page reloads, instead your javascript
//       code should make an ajax request when the form is submitted.
//
//      Delete movies:
//      Each movie should have a "delete" button
//      When this button is clicked, your javascript should send a DELETE request
//
//      Bonuses:
//      TODO: Add a disabled attribute to buttons while their corresponding ajax request is still pending.
//      Show a loading animation instead of just text that says "loading...".
//      Use modals for the creating and editing movie forms.
//      Add a genre property to every movie.
//      TODO: Allow users to sort the movies by rating, title, or genre (if you have it).
//      TODO: Allow users to search through the movies by rating, title, or genre (if you have it).
//      Use a free movie API like OMDB to include extra info or render movie posters..