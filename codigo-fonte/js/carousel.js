
let carouselMovies = [];
let movieGenres = [];

const CAROUSEL_URL =
`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${API_KEY}`;

const GENRES_URL =
`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;

const containerCarousel = document.getElementById("container-carousel"); 

const btnPrev = document.createElement("button");
btnPrev.classList.add("carousel-btn","btn-prev");
btnPrev.id = "btn-prev";
btnPrev.setAttribute("aria-label","Anterior");

const prevIcon = document.createElement("i");
prevIcon.classList.add("fa-solid", "fa-chevron-left");
btnPrev.appendChild(prevIcon); 

const btnNext = document.createElement("button");
btnNext.classList.add("carousel-btn","btn-next");
btnNext.id = "btn-next";
btnNext.setAttribute("aria-label","Próximo");

const nextIcon = document.createElement("i");
nextIcon.classList.add("fa-solid", "fa-chevron-right");
btnNext.appendChild(nextIcon); 

const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselViewport = document.querySelector(".carousel-viewport");
carouselWrapper.insertBefore(btnPrev, carouselViewport); // Insira btnPrev dentro de carouselWrapper, antes de carouselViewport.
carouselWrapper.appendChild(btnNext);




async function loadCarouselMovies() {

    const response = await fetch(CAROUSEL_URL);

    const data = await response.json();

    carouselMovies = data.results;

    createCarousel();

}

async function loadMovieGenres() {
   const response = await fetch(GENRES_URL);
      const data = await response.json();
      movieGenres = data.genres;
    console.log(movieGenres);
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


if (movie.poster_path){
poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}else{
     poster.src ="assets/img/poster-default.png";
}
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
if (movie.vote_average) {
    rating.textContent = movie.vote_average.toFixed(1);
} else {
    rating.textContent = "N/A";
}

// Monta o badge (coloca icon e avaliação dentro do badge   )
ratingBadge.appendChild(starIcon);

ratingBadge.appendChild(rating);

// Coloca o badge dentro do card
card.appendChild(ratingBadge);

const cardInfo = document.createElement("div");
cardInfo.classList.add("card-info");
cardContainer.appendChild(cardInfo); //irmão de card, dentro de card-container

const title = document.createElement("h3");
title.classList.add("card-title");
title.textContent = movie.title;
cardInfo.appendChild(title);

const cardMeta = document.createElement("div");
cardMeta.classList.add("card-meta");
cardInfo.appendChild(cardMeta);

const cardYear = document.createElement("span");
const cardSeparator = document.createElement("span");
const cardCategory = document.createElement("span");

cardYear.classList.add("card-year");
cardSeparator.classList.add("card-separator");
cardCategory.classList.add("card-category");


if(movie.release_date){
cardYear.textContent = movie.release_date.substring(0, 4);
}else{ 
cardYear.textContent = "N/A"; 
}

cardSeparator.textContent = "•";

if (movie.genre_ids[0]) {

    const genreId = movie.genre_ids[0];

    const genre = movieGenres.find(
        (genre) => genre.id === genreId
    );

    if (genre) {
        cardCategory.textContent = genre.name;
    } else {
        cardCategory.textContent = "N/A";
    }

} else {
    cardCategory.textContent = "N/A";
}

cardMeta.appendChild(cardYear); 
cardMeta.appendChild(cardSeparator); 
cardMeta.appendChild(cardCategory); 

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

async function initCarousel() {
    await loadMovieGenres();
    await loadCarouselMovies();
}

initCarousel();


let currentIndex = 0;

function updateCarousel() {
const firstCard = document.querySelector(".card-carousel");
const cardWidth = firstCard.offsetWidth; //retornar a largura do 1º card 
const carouselStyle = getComputedStyle(containerCarousel); //retorna o estilo do container do carrossel
const gap = parseInt(carouselStyle.gap); //retorna o gap entre os cards 
const offset = currentIndex * (cardWidth + gap); // calcula o deslocamento total com base no índice atual e na largura do card + gap
containerCarousel.style.transform = `translateX(-${offset}px)`; //aplica a transformação de deslocamento ao container do carrossel

}

btnNext.addEventListener("click", () => {
       
     const maxIndex = 5;

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }  
       
});

btnPrev.addEventListener("click", () => {

   if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

