//DADOS DA API TMDB

let heroMovies = [];
const hero_movies_limit = 4;
const API_KEY = "***REMOVED***";
const URL = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&api_key=${API_KEY}`;

//BUSCA DOS FILMES

//async Esta função vai realizar uma operação assíncrona
async function loadHeroMovies() {
  const response = await fetch(URL); // fetch(URL) É o comando que envia uma requisição para a TMDB.//response contém a resposta da requisição.

  const data = await response.json();
  console.log(data);
  heroMovies = data.results.slice(
    0,
    hero_movies_limit,
  ); /*slice(0, 4) Pega os 4 primeiros filmes do array results.*/

  // Cria automaticamente os indicadores.
  createIndicators();

  //Atualiza o Hero.
  updateHero();
}

//ELEMENTOS DO DOM
const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroIndicators = document.getElementById("hero-indicators");

const heroBtnPrimary = document.getElementById("btn-primary");
const heroBtnSecondary = document.getElementById("btn-secondary");

let currentHero = 0;

function createIndicators() {
  // Remove indicadores antigos.
  heroIndicators.innerHTML = "";

  heroMovies.forEach((movie, index) => {
    // Cria um botão.
    const button = document.createElement("button");

    // Adiciona a classe.
    button.classList.add("hero-indicator");

    // O primeiro indicador inicia ativo.
    if (index === 0) {
      button.classList.add("active");
    }

    // Evento de clique.
    button.addEventListener("click", () => {
      currentHero = index;

      updateHero();
    });

    // Adiciona o botão ao HTML.
    heroIndicators.appendChild(button);
  });
}

//ATUALIZA O HERO
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

if (window.innerWidth <= 360) {
    maxDescriptionLength = 120;
} else if (window.innerWidth <= 412) {
    maxDescriptionLength = 150;
} else if (window.innerWidth <= 768) {
    maxDescriptionLength = 300;
} else if (window.innerWidth <= 992) {
    maxDescriptionLength = 350;
} else{
  maxDescriptionLength = 450;
}

if (description.length > maxDescriptionLength) {
    description = description.slice(0, maxDescriptionLength) + "...";
}

heroDescription.textContent = description;

  const indicators = document.querySelectorAll(".hero-indicator");

  // Remove a classe active de todos os indicadores
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Ativa apenas o indicador atual
  indicators[currentHero].classList.add("active");
}

loadHeroMovies();

function atualizarTextoBotoes() {
 if (window.innerWidth <= 992) {

    heroBtnPrimary.innerHTML =
        '<i class="fa-solid fa-square-plus"></i> ';

    heroBtnSecondary.innerHTML =
        '<i class="fa-solid fa-circle-info"></i>';

} else {

    heroBtnPrimary.textContent = "Adicionar à lista";
    heroBtnSecondary.textContent = "Ver detalhes";

}
}

atualizarTextoBotoes();
