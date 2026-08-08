let carouselMovies = [];
let movieGenres = [];
let currentIndex = 0;


const CAROUSEL_URL =
`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&api_key=${API_KEY}`;

const GENRES_URL =
`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=${API_KEY}`;


const containerCarousel = document.getElementById("container-carousel");
const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselViewport = document.querySelector(".carousel-viewport");


const btnPrev = document.createElement("button");
btnPrev.classList.add("carousel-btn", "btn-prev");
btnPrev.id = "btn-prev";
btnPrev.setAttribute("aria-label", "Anterior");

const prevIcon = document.createElement("i");
prevIcon.classList.add("fa-solid", "fa-chevron-left");
btnPrev.appendChild(prevIcon);


const btnNext = document.createElement("button");
btnNext.classList.add("carousel-btn", "btn-next");
btnNext.id = "btn-next";
btnNext.setAttribute("aria-label", "Próximo");

const nextIcon = document.createElement("i");
nextIcon.classList.add("fa-solid", "fa-chevron-right");
btnNext.appendChild(nextIcon);


carouselWrapper.insertBefore(btnPrev, carouselViewport);
carouselWrapper.appendChild(btnNext);


async function loadMovieGenres() {
    const response = await fetch(GENRES_URL);
    const data = await response.json();

    movieGenres = data.genres;
}


async function loadCarouselMovies() {
    const response = await fetch(CAROUSEL_URL);
    const data = await response.json();

    carouselMovies = data.results;

    createCarousel(carouselMovies);
}


function createCarousel(movies) {

    containerCarousel.innerHTML = "";

    movies.forEach((movie) => {

        const card = createMovieCard(movie, movieGenres);

        containerCarousel.appendChild(card);

    });

}


function updateCarousel() {

    const firstCard = document.querySelector(".card-container");

    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;

    const carouselStyle = getComputedStyle(containerCarousel);

    const gap = parseInt(carouselStyle.gap);

    const offset = currentIndex * (cardWidth + gap);

    containerCarousel.style.transform = `translateX(-${offset}px)`;

}


async function initCarousel() {
    await loadMovieGenres();
    await loadCarouselMovies();
}


btnNext.addEventListener("click", () => {

    const visibleCards = 4;
    const maxIndex = carouselMovies.length - visibleCards;

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


initCarousel();