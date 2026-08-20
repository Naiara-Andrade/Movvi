let movies = [];
let movieGenres = [];

const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;

const categoriesContainer = document.getElementById("categories-container");
const categoriesChip = document.querySelectorAll(".category-chip");
const sortMovies = document.getElementById("sort-movies");

async function loadMovieGenres() {
  const response = await fetch(GENRES_URL);
  const data = await response.json();

  movieGenres = data.genres;
}

async function loadMovies(filters = {}) {
  const today = new Date().toISOString().split("T")[0];

  let url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&primary_release_date.lte=${today}&api_key=${API_KEY}`;

  if (filters.genreId) {
    url += `&with_genres=${filters.genreId}`;
  }

  const sortBy = filters.sortBy || "vote_average.desc";

    url += `&sort_by=${sortBy}`;

  const responsePage1 = await fetch(`${url}&page=1`);
  const dataPage1 = await responsePage1.json();

  const responsePage2 = await fetch(`${url}&page=2`);
  const dataPage2 = await responsePage2.json();

  movies = [...dataPage1.results, ...dataPage2.results];

  movies.sort((a, b) => b.vote_average - a.vote_average);

  createCategories(movies, filters.genreId);
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
        const sortBy = sortMovies.value;

        await loadMovies({
          genreId,
          sortBy,
        });
      }
    });
  });
}

function initSortMovies() {
  sortMovies.addEventListener("change", async () => {
    const sortBy = sortMovies.value;

    const activeChip = document.querySelector(".category-chip--active");

    let genreId = null;

    if (activeChip) {
      const genreName = activeChip.textContent;

      genreId = getGenreIdByName(genreName);
    }

    await loadMovies({
      genreId,
      sortBy,
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

  initSortMovies();

  await initCategories();
}

init();
