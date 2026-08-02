const botaoMenu = document.querySelector(".botao-menu");
const navMenuList = document.querySelector(".nav-menu-list");

botaoMenu.addEventListener("click", () => {
  navMenuList.classList.toggle("menu-active");
});

