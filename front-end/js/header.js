
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

    // Identifica a página pelo arquivo, sem depender da raiz/domínio
    // (o site também pode estar publicado dentro de uma subpasta).
    const currentFile = window.location.pathname
        .split("/")
        .filter(Boolean)
        .pop()
        ?.toLowerCase() || "index.html";

    menuItems.forEach((item) => {
        const link = item.getAttribute("href");
        const linkFile = link?.split("/").filter(Boolean).pop()?.toLowerCase();
        const isCurrentPage = linkFile === currentFile;

        if (isCurrentPage) {
            item.classList.add("menu-item--active");
            item.setAttribute("aria-current", "page");
        } else {
            item.classList.remove("menu-item--active");
            item.removeAttribute("aria-current");
        }
    });
}
