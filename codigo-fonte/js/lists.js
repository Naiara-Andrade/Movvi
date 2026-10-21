const listsContainer = document.getElementById("lists-container");
const selectedList = document.getElementById("selected-list");
const selectedListTitle = document.getElementById("selected-list-title");
const selectedListMovies = document.getElementById("selected-list-movies");
const movieGenres = [];

const lists = [
  {
    id: 1,
    name: "Lista de Ação",
    movies: [
      { id: 1, title: "John Wick" },
      { id: 2, title: "Matrix" },
      // { id: 2, title: "Matrix" },
      // { id: 2, title: "Matrix" },
      // { id: 2, title: "Matrix" }
    ],
  },

  {
    id: 2,
    name: "Lista de Comédia",
    movies: [],
  },
];

function renderLists() {
  listsContainer.innerHTML = "";

  const createListButton = document.createElement("button");
  createListButton.classList.add("list-createList");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");
  icon.setAttribute("aria-hidden", "true");

  createListButton.appendChild(icon);
  createListButton.append(" Criar lista");
  listsContainer.appendChild(createListButton);

  lists.forEach((list) => {
    const card = document.createElement("button");

    card.classList.add("list-card");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-film");
    icon.setAttribute("aria-hidden", "true");

    card.appendChild(icon);
    card.append(list.name);
  


    const numberOfMovies = document.createElement("span");
    numberOfMovies.classList.add("list-number-of-movies");
    numberOfMovies.textContent = `${list.movies.length} filmes`;

    card.appendChild(numberOfMovies);

    card.addEventListener("click", () => {
      selectedList.hidden = false;
      selectedListTitle.textContent = list.name;

      selectedListMovies.innerHTML = "";

      if (list.movies.length === 0) {
        selectedListMovies.textContent = "Esta lista ainda não tem filmes.";
      } else {
        list.movies.forEach((movie) => {
          const movieCard = createMovieCard(movie, movieGenres);
          selectedListMovies.appendChild(movieCard);
        });
      }
    });

    listsContainer.appendChild(card);
  });
}

renderLists();
