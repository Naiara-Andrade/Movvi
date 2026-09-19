let heroMovies = [];
const hero_movies_limit = 4;

const URL = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${API_KEY}`;

async function loadHeroMovies() {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  heroMovies = data.results.slice(0, hero_movies_limit);
  createIndicators();

  updateHero();
}

const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroIndicators = document.getElementById("hero-indicators");

const heroBtnPrimary = document.getElementById("btn-primary");
const heroBtnSecondary = document.getElementById("btn-secondary");

let currentHero = 0;

function createIndicators() {
  heroIndicators.innerHTML = "";

  heroMovies.forEach((movie, index) => {
    const button = document.createElement("button");

    button.classList.add("hero-indicator");

    if (index === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentHero = index;

      updateHero();
    });

    heroIndicators.appendChild(button);
  });
}

function updateHero() {
  const movie = heroMovies[currentHero];

  heroImage.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  heroTitle.textContent = movie.title;
  heroDescription.textContent = movie.overview;

  if (movie.backdrop_path) {
    heroImage.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  } else {
    heroImage.src = "./assets/img/hero-default.webp";
  }

  heroTitle.textContent = movie.title;

  let description = movie.overview;

  if (!description) {
    description = "Sinopse indisponível no momento.";
  }

  let maxDescriptionLength;

  if (window.innerWidth <= 375) {
    maxDescriptionLength = 250;
  } else if (window.innerWidth <= 425) {
    maxDescriptionLength = 300;
  } else if (window.innerWidth <= 768) {
    maxDescriptionLength = 400;
  } else if (window.innerWidth <= 992) {
    maxDescriptionLength = 600;
  } else {
    maxDescriptionLength = 450;
  }

  if (description.length > maxDescriptionLength) {
    description = description.slice(0, maxDescriptionLength) + "...";
  }

  heroDescription.textContent = description;

  const indicators = document.querySelectorAll(".hero-indicator");

  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  indicators[currentHero].classList.add("active");
}

loadHeroMovies();

function atualizarTextoBotoes() {
  if (window.innerWidth <= 992) {
    heroBtnPrimary.innerHTML = '<i class="fa-solid fa-square-plus"></i>';

    heroBtnSecondary.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
  } else {
    heroBtnPrimary.textContent = "Adicionar à lista";
    heroBtnSecondary.textContent = "Ver detalhes";
  }
}

atualizarTextoBotoes();
