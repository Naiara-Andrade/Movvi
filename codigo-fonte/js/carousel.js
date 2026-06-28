const btnPrev = document.getElementById("btn-prev"); /*retorna o btn-prev*/
const btnNext = document.getElementById("btn-next"); /*retorna o btn-next*/
const containerCarousel = document.getElementById("container-carousel"); /*retorna o container-carousel*/
const firstCard = document.querySelector(".card-carousel"); /*retorna o 1º card*/
const carouselStyle = getComputedStyle(containerCarousel); /*Obtém o CSS calculado pelo navegador.*/
const cardWidth = firstCard.offsetWidth; /*devolve a largura real do elemento.*/
const gap = parseInt(carouselStyle.gap); /*retorna string "20px", parseInt() remove o px e tranforma em número.*/
const cards = document.querySelectorAll(".card-carousel");  /* retorna lista de card*/

let currentIndex = 0; /*Cria a variável que guarda a posição atual do carrossel.*/

function updateCarousel() { /*Cria uma função responsável por atualizar a posição do carrossel*/

const offset = currentIndex * (cardWidth + gap); /*Calcula quantos pixels o carrossel deve se mover.*/

containerCarousel.style.transform = `translateX(-${offset}px)`; /*Aplica um estilo CSS pelo JavaScript.*/

}

const visibleCards = 5; /*Quantidade de cards visíveis na tela.*/

const maxIndex = cards.length - visibleCards; /*Calcula o último índice permitido.*/

btnNext.addEventListener("click",() => {   /*evento quando houver o click e a função que será executada*/
 
  if (currentIndex < maxIndex) { /*O índice atual ainda é menor que o último permitido?*/

    currentIndex++; /*incrementa*/
   updateCarousel(); /*função responsável por mover o carrossel.*/
  }
    
    });

btnPrev.addEventListener("click",() => { 

if (currentIndex > 0) { /*Verifica se ainda é possível voltar uma posição.*/

    currentIndex--; /*decrementa*/
   updateCarousel(); /*função responsável por mover o carrossel.*/
  }
    
    });
