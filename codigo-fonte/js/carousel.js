const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const containerCarousel = document.getElementById("container-carousel");
const firstCard = document.querySelector(".card-carousel");
const carouselStyle = getComputedStyle(containerCarousel);
const cardWidth = firstCard.offsetWidth;
const gap = parseInt(carouselStyle.gap);
const cards = document.querySelectorAll(".card-carousel");

let currentIndex = 0;

function updateCarousel() {

const offset = currentIndex * (cardWidth + gap);

containerCarousel.style.transform = `translateX(-${offset}px)`;

}

const visibleCards = 4;

const maxIndex = cards.length - visibleCards;

btnNext.addEventListener("click",() => {
 
  if (currentIndex < maxIndex) {

    currentIndex++;
   updateCarousel();
  }
    
    });


