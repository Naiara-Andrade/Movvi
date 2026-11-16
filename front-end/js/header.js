
function initHeader() {
    const botaoMenu = document.querySelector(".botao-menu");
    const menu = document.querySelector(".nav-menu-list");
    const menuItems = document.querySelectorAll(".menu-item");

    // Toggle do menu mobile
    if (botaoMenu && menu) {
        botaoMenu.addEventListener("click", () => {
            menu.classList.toggle("menu-list--active");
        });
    }

    // Normaliza os caminhos
    const normalizePath = (path) => {
        return path
            .replace(/\/index\.html$/i, "")
            .replace(/\.html$/i, "")
            .replace(/\/+$/, "")
            .toLowerCase() || "/";
    };

    const currentPath = normalizePath(window.location.pathname);

    menuItems.forEach((item) => {
        const link = item.getAttribute("href");

        if (!link || link === "#") return;

        const linkPath = normalizePath(
            new URL(link, window.location.href).pathname
        );

        if (linkPath === currentPath) {
            item.classList.add("menu-item--active");
        } else {
            item.classList.remove("menu-item--active");
        }
    });
}
