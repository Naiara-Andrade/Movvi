
let carouselMovies = [];
const CAROUSEL_URL =
`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${API_KEY}`;

const containerCarousel = document.getElementById("container-carousel"); 

async function loadCarouselMovies() {

    const response = await fetch(CAROUSEL_URL);

    const data = await response.json();

    carouselMovies = data.results;

    createCarousel();

}



function createCard(movie){

const cardCarousel = document.createElement("div");

cardCarousel.classList.add("card-carousel");

const cardContainer = document.createElement("div");

cardContainer.classList.add("card-container");

cardCarousel.appendChild(cardContainer);

const card = document.createElement("div");

card.classList.add("card");

cardContainer.appendChild(card);

const poster = document.createElement("img");

poster.classList.add("card-poster");

poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
poster.alt = movie.title;

card.appendChild(poster);

const ratingBadge = document.createElement("div");
ratingBadge.classList.add("card-rating-badge");

//Ícone da estrela 
const starIcon = document.createElement("i");

starIcon.classList.add("fa-solid");
starIcon.classList.add("fa-star");

//Nota 
const rating = document.createElement("span");
rating.classList.add("card-rating");
rating.textContent = movie.vote_average.toFixed(1);

// Monta o badge (coloca icon e avaliação dentro do badge   )
ratingBadge.appendChild(starIcon);

ratingBadge.appendChild(rating);

// Coloca o badge dentro do card
card.appendChild(ratingBadge);

const cardInfo = document.createElement("div");
cardInfo.classList.add("card-info");
cardContainer.appendChild(cardInfo); //irmão de card, dentro de card-container

return cardCarousel;


}

function createCarousel() {

    // Limpa o carrossel antes de adicionar os cards
    containerCarousel.innerHTML = "";

    carouselMovies.forEach((movie) => {

        const card = createCard(movie);

        containerCarousel.appendChild(card);

    });

}