let movies = [];
let movieGenres = [];

const GENRES_URL =
`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;

const categoriesContainer = document.getElementById("categories-container");
const categoriesChip = document.querySelectorAll(".category-chip");


async function loadMovieGenres() {

    const response = await fetch(GENRES_URL);
    const data = await response.json();

    movieGenres = data.genres;

}


async function loadMovies(filters = {}) {

    let url =
        `https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=${API_KEY}`;

    if (filters.genreId) {
        url += `&with_genres=${filters.genreId}`;
    }

    if (filters.sortBy) {
        url += `&sort_by=${filters.sortBy}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    movies = data.results;

    createCategories(movies);

}


function createCategories(movies) {

    categoriesContainer.innerHTML = "";

    movies.forEach((movie) => {

        const card = createMovieCard(movie, movieGenres);

        categoriesContainer.appendChild(card);

    });

}


function getGenreIdByName(genreName) {

    const selectedGenre = movieGenres.find(
        (genre) => genre.name === genreName
    );

    return selectedGenre ? selectedGenre.id : null;

}


function initCategoryFilters() {

    categoriesChip.forEach((chip) => {

        chip.addEventListener("click", async () => {

            categoriesChip.forEach((item) => {
                item.classList.remove("category-chip--active");
            });

            chip.classList.add("category-chip--active");

            const genreName = chip.textContent;

            const genreId = getGenreIdByName(genreName);

            if (genreId) {

                await loadMovies({
                    genreId
                });

            }

        });

    });

}


async function initCategories() {

    await loadMovieGenres();
    await loadMovies();

}


async function loadComponent(id, file) {

    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;

}


async function initPage() {

    await loadComponent("header", "./components/header.html");
    await loadComponent("footer", "./components/footer.html");

    initHeader();

}


async function init() {

    await initPage();

    initCategoryFilters();

    await initCategories();

}


init();