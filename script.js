const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGEPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHURL = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query='

let form = document.getElementById('form');
let search = document.getElementById('search');;

(function (window, document, undefined) {

    // code that should be taken care of right away

    window.onload = init;

    function init() {
        // the code to be called when the dom has loaded
        // #document has its nodes
        form = document.getElementById('form');
        search = document.getElementById('search');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const searchTerm = search.value;

            if (searchTerm) {
                getMovies(SEARCHURL + searchTerm);
                search.value = '';
            }
        });
    }

})(window, document, undefined);

getMovies(APIURL);

async function getMovies(url) {

    const response = await fetch(url);
    const responseData = await response.json();
    showMovies(responseData);

    console.log(responseData)
}


function showMovies(movies) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    movies.results.forEach((element) => {
        const { poster_path, title, vote_average,release_date,overview} = element;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `<div class='movie-header'>
        <img class="movie-icon" src="${IMAGEPATH + poster_path}" alt="${title}"/></div>
        <div class="movie-data">
            <div class="movie-title">
            <h3>${title}</h3>
            <span class= ${getvote(vote_average)}>${vote_average}</span>
            </div>
            <ul class="movie-info">
            <li>Release Date: ${release_date}</li>
            <li>Overview: ${overview}</li>
            </ul>
        </div>`;

        main.appendChild(movieEl);
    });
}

function getvote(vote) {
    if (vote >= 8) {
        return 'green';
    }
    else if (vote >= 5) {
        return 'orange'
    }
    else return 'red'
}


