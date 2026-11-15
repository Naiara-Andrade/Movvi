function initHeader() {

    const botaoMenu = document.querySelector(".botao-menu");
    const menu = document.querySelector(".nav-menu-list");

const menuItems =
        document.querySelectorAll(".menu-item");

    botaoMenu.addEventListener("click", () => {
        menu.classList.toggle("menu-list--active");
    });

const currentPage =
        window.location.pathname;

    menuItems.forEach((item) => {

        const link =
            item.getAttribute("href");

        if (
            link &&
            link !== "#" &&
             currentPage === link
        ) {

            item.classList.add(
                "menu-item--active"
            );

        }

    });

}

