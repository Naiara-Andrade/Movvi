async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;
}

async function initPage() {

    await loadComponent("header", "./components/header.html");
    await loadComponent("footer", "./components/footer.html");

    initHeader();   
}

initPage();

function initCategory() {

const categoriesChip = document.querySelectorAll(".category-chip");

categoriesChip.forEach((chip) => {

    chip.addEventListener("click", () => {

        categoriesChip.forEach((item) => {
            item.classList.remove("category-chip--active");
        });

        chip.classList.add("category-chip--active");

    });

});

}

initCategory()