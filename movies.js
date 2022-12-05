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
//

setTimeout(() => {
    console.log() // state is "fulfilled" or "rejected"
}, 5000);

fetch('https://determined-unleashed-ixia.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        setTimeout(() => {
            console.log(data);
            document.querySelector(".preload").style.display = "none"; //stop the load
        }, 3000);
    })

// fetch('https://determined-unleashed-ixia.glitch.me/movies').then((response) => {
//     console.log(response.json());
// });

fetch(omdbKey).then((response) => {
    console.log(response.json());
});
//
// fetch('https://determined-unleashed-ixia.glitch.me/movies').then((response) => {
//     console.log(response.json());
// }).catch((error) => {
//     console.error(error);
// }).finally(() => {
//     mainSection.innerHTML = "<h2>Done.</h2>";
// })

/**********************  loader ***********************/
const loader = document.querySelector('.preload');
const emoji = loader.querySelector('.emoji');

const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];

const interval = 125;

const loadEmojis = (arr) => {
    setInterval(() => {
        emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
        //console.log(Math.floor(Math.random() * arr.length))
    }, interval);
}

const init = () => {
    loadEmojis(emojis);
}
init();