// --------------------- Glitch Database --------------------------- //
// Fetches movie information from the Glitch database.
// Sets a "Loading" message while the promise is still pending.
// getMovies function returns a list of movies in the Glitch database.
// Loads event listeners after cards have populated.
function loadPage() {
    fetch('https://determined-unleashed-ixia.glitch.me/movies')
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                console.log('Glitch:', data);
                document.querySelector(".preload").style.display = "none"; // hide the load animation
                document.querySelector(".display").style.display = "flex"; // show the main content
            }, 3000);
        })
}
loadPage();

function getMovies() {
    return fetch('https://determined-unleashed-ixia.glitch.me/movies').then(response => response.json());
}
// getMovies().then(data => console.log('Glitch:', data));
// getMovies();

// -------------------------- Genre Tags ---------------------------- //
// These functions generate the genre tags for the glitch database.
// One works for the New Movie feature and the other for the Edit Movie feature.

// New Genres:
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
    return newMovieGenres.toString();
}



let genres = ["sci-fi", "fantasy", "action", "romance", "mystery", "horror", "thriller", "drama", "adventure", "western", "documentary", "epic", "history", "war", "comedy", "crime"];

// Edit Genres:
function editMovieGenres() {
    let editMovieGenres = [];
    genres.forEach(genre => {
        if (document.getElementById(`edit-${genre}`).checked === true) {
            array = genre.split('');
            genre = array[0].toUpperCase() + array.splice(1).join('');
            editMovieGenres.push(genre);
        }
    })
    return editMovieGenres.join(', ');
}

// --------------------------- Add a Custom Movie --------------------------- //
let movieAddBtn = document.querySelector('#movie-add-btn');
movieAddBtn.addEventListener('click', addMovie);

// Function makes post request to glitch db
function addMovie() {
    event.preventDefault();

    let newTitle = document.querySelector('#new-movie-title').value;
    let newYear = document.querySelector('#new-movie-year').value;
    let newGenre = addNewGenre()
    let newPlot = document.querySelector('#new-movie-plot').value;
    let newRated = document.querySelector('#new-movie-rated').value;
    let newPoster = "https://i.ibb.co/ZcyNXmb/coming-soon.jpg";

    postTest(newTitle, newYear, newGenre, newPlot, newRated, newPoster);
    // console.log(newTitle, newYear, newGenre, newPlot, newRated, newPoster);
}

function postTest(title, year, genre, plot, rating, poster) {
    $.post('https://determined-unleashed-ixia.glitch.me/movies', {
        Title: title,
        Year: year,
        Genre: genre,
        Plot: plot,
        Rated: rating,
        Poster: poster
    }).done(function (data) {
        makeMovieCards();
    });
}

// --------------------------- Edit a Movie --------------------------- //
// Editing a movie is done through the Edit Modal. The modal is pre-populated
// with the current info for the movie being selected for editing. When the
// user is finished editing, the submit button will patch the newly-edited
// movie info to Glitch and refresh the cards. When the Edit Modal is exited,
// the clearInputFields method runs to clear the modal until it's called again.

// Gets selected movie information and populates the Edit Modal
function getMovieById(id) {
    fetch(`https://determined-unleashed-ixia.glitch.me/movies/${id}`).then((response) => {
        response.json().then(movie => {
            console.log('Movie Data:', movie);
            let {Title, Year, Genre, Rated, Plot} = movie;
            console.log(Genre)

            let Genres = Genre.toLowerCase().split(', ');
            Genres.forEach(genre => {
                document.getElementById(`edit-${genre}`).checked = true;
            })

            document.getElementById('edit-movie-title').value = Title;
            document.getElementById('edit-movie-year').value = Year;
            document.getElementById(Rated).selected = true;
            document.getElementById('edit-movie-plot').value = Plot;
            document.getElementById('edit-id').innerHTML = id;
        });
    });
}

// Retrieves the edited info from the Edit Modal
$('#movie-edit-btn').click(() => editMovie());

function editMovie() {

    let editId = document.getElementById('edit-id').innerHTML;
    let editTitle = document.getElementById('edit-movie-title').value;
    let editYear = document.getElementById('edit-movie-year').value;
    let editGenre = editMovieGenres(editId);
    let editPlot = document.getElementById('edit-movie-plot').value;
    let editRated = document.getElementById('edit-movie-rated').value;

    patchInfo(editId, editTitle, editYear, editGenre, editPlot, editRated);
    console.log(editId, editTitle, editYear, editGenre, editPlot, editRated);
}

// Patches the edited movie info to Glitch
function patchInfo(editId, title, year, genre, plot, rating) {

    fetch(`https://determined-unleashed-ixia.glitch.me/movies/${editId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            Title: title,
            Year: year,
            Genre: genre,
            Plot: plot,
            Rated: rating
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    clearInputFields('edit');
    setTimeout(() => { makeMovieCards(); }, 500)

}

// Clears the Edit/Create Modal input fields so the modal can be re-used
function clearInputFields(prefix) {
    console.log('clear input function fired');

    document.getElementById(`${prefix}-movie-title`).value = '';
    document.getElementById(`${prefix}-movie-year`).value = '';

    genres.forEach((genre) => {
        document.getElementById(`${prefix}-${genre}`).checked = false;
    })

    document.getElementById(`${prefix}-default`).selected = true;
    document.getElementById(`${prefix}-movie-plot`).value = '';
    document.getElementById(`${prefix}-id`).innerHTML = '';
}

// --------------------- Remove Movie Card --------------------------- //
// Removes a movie from the Glitch database via the id number.
function removeMovie(id) {

    fetch('https://determined-unleashed-ixia.glitch.me/movies' + "/" + id, {
        method: 'DELETE'
    }).then(() => {
        makeMovieCards();
    }).catch(err => {
        console.error(err)
    });
}

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
        // console.log('Movie Cards:', data);

        let movieCard = '';
        let movieContainer = document.querySelector('#movie-container');

        data.forEach(movie => {

            let {Title, Year, Genre, Rated, Plot, Poster, id} = movie;

            // Generates Card HTML
            movieCard +=
            `<div class="card text-white bg-primary mb-3">
                <div class="row g-0">
                    <div class="col-md-4 d-flex">
                        <img src="${Poster}" class="rounded-start img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body"><h5 class="card-title d-inline">${Title}</h5>
                            <small class="text-muted ms-2">${Year}</small>
                            <div class="dropend">
                                <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false"></button>
                                <ul class="dropdown-menu bg-dark" style="">
                                    <li><a class="dropdown-item edit-movie" href="#" data-dbid="${id}"
                                           data-bs-toggle="modal" data-bs-target="#editMovieForm">Edit</a></li>
                                    <li><a class="dropdown-item delete-movie" href="#" data-dbid="${id}">Delete</a></li>
                                </ul>
                            </div>
                            <p class="card-text mt-2">${Plot}</p><p class="card-text"><small class="text-muted bottom">${Rated} | ${Genre}</small></p></div>
                    </div>
                </div>
            </div>`

        })

        movieContainer.innerHTML = movieCard;

        // Edit Movie Listener
        $('.edit-movie').click(function(){
            let editId = this.getAttribute('data-dbid');
            getMovieById(editId);
        });

        // Delete Movie Listener
        $('.delete-movie').click(function(){
            let deleteId = this.getAttribute('data-dbid');
            removeMovie(deleteId);

        });
    })
}
makeMovieCards();

// --------------------- Movie Search --------------------------- //
// TODO: Reformat card population
function searchMovies() {
    event.preventDefault();
    let titleSearch = document.querySelector('#movie-search-input').value;
    omdbKey2 = "https://www.omdbapi.com/?t=" + titleSearch + "&apikey=850df038";
    return fetch(omdbKey2).then(response => (response.json()));
}

function makeSearchCard() {

    searchMovies().then(data => {
        console.log(data);

        let searchContainer = document.querySelector('#search-container');

        let searchedTitle = data.Title;
        let searchedActors = data.Actors;
        let searchedDirectors = data.Director;
        let searchedPlot = data.Plot;
        let searchedGenre = data.Genre;
        let searchedPoster = data.Poster;

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

// --------------------- Random Movie --------------------------- //
// Gets the total numbers of movies on the site and randomly generates
// a card to display it.
function randomMovie() {
    getMovies().then(data => {
        let index = Math.floor(Math.random() * data.length);

        let randomCard = '';
        let randomContainer = document.querySelector('#random-container');

        let {Title, Year, Genre, Rated, Plot, Poster, id} = data[index];
        console.log(Title, Year, Genre, Rated, Plot, Poster, id);

        // Generates Card HTML
        randomCard += `<div class="card text-white bg-primary mb-3">`;
        randomCard += `<div class="row g-0"><div class="col-md-4 d-flex">`;
        randomCard += `<img src="${Poster}" class="rounded-start img-fluid"></div>`;
        randomCard += `<div class="col-md-8"><div class="card-body">`;
        randomCard += `<h5 class="card-title d-inline">${Title}</h5>`;
        randomCard += `<small class="text-muted ms-2">${Year}</small>`;
        randomCard += `<p class="card-text mt-2">${Plot}</p>`;
        randomCard += `<p class="card-text"><small class="text-muted bottom">${Rated} | ${Genre}</small>`;
        randomCard += `</p></div></div></div></div>`;

        randomContainer.innerHTML = randomCard;

    })
}

// --------------------- Nav Bar Links --------------------------- //
// Runs the associated functions when each link is clicked on.
// Hides all other containers and displays the correct content only.

// Home Button
$('#home').click(() => {
    document.querySelector(".display").style.display = "flex"; // show the main section
    document.querySelector("#random-container").style.display = "none"; // hide the random section
    document.querySelector("#search-container").style.display = "none"; // hide the search section
});

// Random Movie
$('#random-click').click(() => {
    randomMovie();
    document.querySelector(".display").style.display = "none"; // hide the main section
    document.querySelector("#random-container").style.display = "flex"; // show the random section
    document.querySelector("#search-container").style.display = "none"; // hide the search section
});

// Search Bar
// $('#movie-search-btn').click(() => {
//     makeSearchCard();
//     document.querySelector(".display").style.display = "none"; // hide the main section
//     document.querySelector("#random-container").style.display = "none"; // hide the random section
//     document.querySelector("#search-container").style.display = "flex"; // show the search section
// });

// --------------------- Project Requirements --------------------------- //
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
//      When the form is submitted, the page should not reload / refresh, instead, your javascript
//       should make a POST request to /movies with the information the user put into the form
//
//      Allow users to edit existing movies:
//      Give users the option to edit an existing movie
//      A form should be pre-populated with the selected movie's details
//      Like creating a movie, this should not involve any page reloads, instead your javascript
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
//
//      Personal To Do:
//      TODO: Search by Genre / Filter content feature
//      TODO: Allow users to save movies to a Watchlist
//      TODO: Search populates multiple results