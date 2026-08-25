let movies = [];

let movieGenres = [];

let currentPage = 1;

let totalPages = 1;

let currentFilters = {};

let allMovies = [];

const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;

const categoriesContainer =
    document.getElementById("categories-container");

const categoriesChip =
    document.querySelectorAll(".category-chip");

const pagination =
    document.getElementById("pagination");

const discoverButtons =
    document.querySelectorAll(".discover-button");


async function loadMovieGenres() {

    const response = await fetch(GENRES_URL);

    const data = await response.json();

    movieGenres = data.genres;

}


async function loadMovies(filters = {}) {

    currentFilters = filters;

    const today =
        new Date().toISOString().split("T")[0];

    let url =
        `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

    if (filters.genreId) {

        url += `&with_genres=${filters.genreId}`;

    }

    if (filters.minRating) {

        url += `&vote_average.gte=${filters.minRating}`;

    }

    if (filters.minVotes) {

        url += `&vote_count.gte=${filters.minVotes}`;

    }

    const sortBy =
        filters.sortBy || "vote_average.desc";

    url += `&sort_by=${sortBy}`;

    const response =
        await fetch(`${url}&page=${currentPage}`);

    const data =
        await response.json();

    totalPages =
        data.total_pages;

    movies =
        data.results.slice(0, 18);

    createCategories(
        movies,
        filters.genreId
    );

    createPagination();

}


function createCategories(
    movies,
    genreId = null
) {

    categoriesContainer.innerHTML = "";

    movies.forEach((movie) => {

        const card =
            createMovieCard(
                movie,
                movieGenres,
                genreId
            );

        categoriesContainer.appendChild(card);

    });

}


function getGenreIdByName(genreName) {

    const selectedGenre =
        movieGenres.find(
            (genre) =>
                genre.name === genreName
        );

    return selectedGenre
        ? selectedGenre.id
        : null;

}


async function loadPopularRatedMovies(
    genreId = null
) {

    allMovies = [];

    const today =
        new Date().toISOString().split("T")[0];

    let url =
        `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

    if (genreId) {

        url += `&with_genres=${genreId}`;

    }

    url += `&sort_by=popularity.desc`;

    for (
        let page = 1;
        page <= 5;
        page++
    ) {

        const response =
            await fetch(
                `${url}&page=${page}`
            );

        const data =
            await response.json();

        allMovies = [
            ...allMovies,
            ...data.results
        ];

    }

    allMovies.sort(
        (a, b) =>
            b.vote_average -
            a.vote_average
    );

    movies =
        allMovies.slice(0, 18);

    createCategories(
        movies,
        genreId
    );

}


function initDiscover() {

    discoverButtons.forEach((button) => {

        button.addEventListener(
            "click",
            async () => {

                const discoverType =
                    button.dataset.discover;

                const activeChip =
                    document.querySelector(
                        ".category-chip--active"
                    );

                let genreId = null;

                if (activeChip) {

                    const genreName =
                        activeChip.textContent;

                    genreId =
                        getGenreIdByName(
                            genreName
                        );

                }

                if (
                    discoverType ===
                    "trending"
                ) {

                    await loadMovies({

                        genreId,

                        sortBy:
                            "popularity.desc"

                    });

                }

                if (
                    discoverType ===
                    "top-rated"
                ) {

                    await loadMovies({

                        genreId,

                        sortBy:
                            "vote_average.desc",

                        minRating: 7.5,

                        minVotes: 900

                    });

                }

                if (
                    discoverType ===
                    "popular-rated"
                ) {

                    await loadPopularRatedMovies(
                        genreId
                    );

                }

            }
        );

    });

}


function createPagination() {

    pagination.innerHTML = "";

    const maxVisiblePages = 5;

    let startPage = Math.max(
        1,
        currentPage - 2
    );

    let endPage = Math.min(
        totalPages,
        startPage + maxVisiblePages - 1
    );

    if (endPage - startPage < maxVisiblePages - 1) {

        startPage = Math.max(
            1,
            endPage - maxVisiblePages + 1
        );

    }

    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {

        const pageButton =
            document.createElement("button");

        pageButton.textContent = page;

        pageButton.classList.add(
            "page-button"
        );

        if (page === currentPage) {

            pageButton.classList.add(
                "page-button--active"
            );

        }

        pagination.appendChild(
            pageButton
        );

        pageButton.addEventListener(
            "click",
            async () => {

                currentPage = page;

                await loadMovies(
                    currentFilters
                );

            }
        );

    }

}


function initCategoryFilters() {

    categoriesChip.forEach((chip) => {

        chip.addEventListener(
            "click",
            async () => {

                categoriesChip.forEach(
                    (item) => {

                        item.classList.remove(
                            "category-chip--active"
                        );

                    }
                );

                chip.classList.add(
                    "category-chip--active"
                );

                const genreName =
                    chip.textContent;

                const genreId =
                    getGenreIdByName(
                        genreName
                    );

                    currentPage = 1;

                if (genreId) {

                    await loadMovies({

                        genreId

                    });

                }

            }
        );

    });

}


async function initCategories() {

    await loadMovieGenres();

    await loadMovies();

}


async function loadComponent(
    id,
    file
) {

    const response =
        await fetch(file);

    const html =
        await response.text();

    document.getElementById(id)
        .innerHTML = html;

}


async function initPage() {

    await loadComponent(
        "header",
        "./components/header.html"
    );

    await loadComponent(
        "footer",
        "./components/footer.html"
    );

    initHeader();

}


async function init() {

    await initPage();

    initCategoryFilters();

    initDiscover();

    await initCategories();

}


init();