let movies = [];

let movieGenres = [];

let currentPage = 1;

let totalPages = 1;

let currentFilters = {};

let allMovies = [];

const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;

const categoriesContainer = document.getElementById("categories-container");

const categoriesChip = document.querySelectorAll(".category-chip");

const pagination = document.getElementById("pagination");

const discoverButtons = document.querySelectorAll(".discover-button");

async function loadMovieGenres() {
  const response = await fetch(GENRES_URL);

  const data = await response.json();

  movieGenres = data.genres;
}

async function loadMovies(filters = {}) {
  currentFilters = filters;

  const today = new Date().toISOString().split("T")[0];

  let url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

  if (filters.genreId) {
    url += `&with_genres=${filters.genreId}`;
  }

  if (filters.minRating) {
    url += `&vote_average.gte=${filters.minRating}`;
  }

  if (filters.minVotes) {
    url += `&vote_count.gte=${filters.minVotes}`;
  }

  const sortBy = filters.sortBy || "vote_average.desc";

  url += `&sort_by=${sortBy}`;

  const response = await fetch(`${url}&page=${currentPage}`);

  const data = await response.json();

  let results = data.results;

  if (getMoviesPerPage() === 24) {
    const responseNext = await fetch(`${url}&page=${currentPage + 1}`);

    const dataNext = await responseNext.json();

    results = [...results, ...dataNext.results];
  }

  totalPages = totalPages = Math.min(data.total_pages, 10);

  movies = results.slice(0, getMoviesPerPage());

  createCategories(movies, filters.genreId);

  createPagination();
}

function createCategories(movies, genreId = null) {
  categoriesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = createMovieCard(movie, movieGenres, genreId);

    categoriesContainer.appendChild(card);
  });
}

function getGenreIdByName(genreName) {
  const selectedGenre = movieGenres.find((genre) => genre.name === genreName);

  return selectedGenre ? selectedGenre.id : null;
}

async function loadPopularRatedMovies(genreId = null) {
  allMovies = [];

  const today = new Date().toISOString().split("T")[0];

  let url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  url += `&sort_by=popularity.desc`;

  for (let page = 1; page <= 5; page++) {
    const response = await fetch(`${url}&page=${page}`);

    const data = await response.json();

    allMovies = [...allMovies, ...data.results];
  }

  allMovies.sort((a, b) => b.vote_average - a.vote_average);

  movies = allMovies.slice(0, getMoviesPerPage());

  createCategories(movies, genreId);
}

async function loadHiddenGemsMovies(genreId = null) {
  const today = new Date().toISOString().split("T")[0];

  let url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  url += `&vote_average.gte=7.0`;

  url += `&vote_count.gte=600`;

  url += `&vote_count.lte=899`;

  url += `&sort_by=vote_average.desc`;

  const response = await fetch(url);

  const data = await response.json();

  movies = data.results.slice(0, getMoviesPerPage());

  createCategories(movies, genreId);
}

function initDiscover() {
  discoverButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const discoverType = button.dataset.discover;

      discoverButtons.forEach((btn) => {
        btn.classList.remove("discover-button--active");
      });

      button.classList.add("discover-button--active");

      const activeChip = document.querySelector(".category-chip--active");

      let genreId = null;

      if (activeChip) {
        const genreName = activeChip.textContent;

        genreId = getGenreIdByName(genreName);
      }

      if (discoverType === "trending") {
        await loadMovies({
          genreId,

          sortBy: "popularity.desc",
        });
      }

      if (discoverType === "top-rated") {
        await loadMovies({
          genreId,

          sortBy: "vote_average.desc",

          minRating: 7.5,

          minVotes: 900,
        });
      }

      if (discoverType === "popular-rated") {
        await loadPopularRatedMovies(genreId);
      }

      if (discoverType === "hidden-gems") {
        await loadHiddenGemsMovies(genreId);
      }
    });
  });
}

function createPagination() {
  pagination.innerHTML = "";

  const maxVisiblePages = 5;

  const maxPages = Math.min(totalPages, 10);

  let startPage = Math.max(1, currentPage - 2);

  let endPage = Math.min(maxPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const prevButton = document.createElement("button");

  prevButton.classList.add("page-button", "pagination-control");

  const prevIcon = document.createElement("i");

  prevIcon.classList.add("fa-solid", "fa-chevron-left");

  prevButton.appendChild(prevIcon);

  prevButton.disabled = currentPage === 1;

  pagination.appendChild(prevButton);

  prevButton.addEventListener("click", async () => {
    if (currentPage > 1) {
      currentPage--;

      await loadMovies(currentFilters);
    }
  });

  for (let page = startPage; page <= endPage; page++) {
    const pageButton = document.createElement("button");

    pageButton.textContent = page;

    pageButton.classList.add("page-button");

    if (page === currentPage) {
      pageButton.classList.add("page-button--active");
    }

    pagination.appendChild(pageButton);

    pageButton.addEventListener("click", async () => {
      currentPage = page;

      await loadMovies(currentFilters);
    });
  }

  const nextButton = document.createElement("button");

  nextButton.classList.add("page-button", "pagination-control");

  const nextIcon = document.createElement("i");

  nextIcon.classList.add("fa-solid", "fa-chevron-right");

  nextButton.appendChild(nextIcon);

  nextButton.disabled = currentPage === maxPages;

  pagination.appendChild(nextButton);

  nextButton.addEventListener("click", async () => {
    if (currentPage < maxPages) {
      currentPage++;

      await loadMovies(currentFilters);
    }
  });
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

      currentPage = 1;

      if (genreId) {
        await loadMovies({
          genreId,
        });
      }
    });
  });
}

function getMoviesPerPage() {
  if (window.innerWidth > 1200) {
    return 24;
  }

  if (window.innerWidth <= 768) {
    return 18;
  }

  return 20;
}

async function initCategories() {
  await loadMovieGenres();

  await loadMovies();
}

async function init() {
  initCategoryFilters();

  initDiscover();

  await initCategories();
}

init();