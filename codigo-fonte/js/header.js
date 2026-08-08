function initHeader() {

    const botaoMenu = document.querySelector(".botao-menu");
    const menu = document.querySelector(".nav-menu-list");

    botaoMenu.addEventListener("click", () => {
        menu.classList.toggle("menu-active");
    });

}