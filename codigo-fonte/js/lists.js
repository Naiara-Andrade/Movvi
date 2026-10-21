const listsContainer = document.getElementById("lists-container");
const selectedList = document.getElementById("selected-list");
const selectedListTitle = document.getElementById("selected-list-title");
const selectedListMovies = document.getElementById("selected-list-movies");
const movieGenres = [];
const modalCreateList = document.getElementById("modal-create-list");
const cancelListButton = document.getElementById("btn-cancel-list");
const closeModalButton = document.getElementById("btn-close-modal");
const createListForm = document.getElementById("form-create-list");
const listNameInput = document.getElementById("list-name");
const listNameError = document.getElementById("list-name-error");


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
  createListButton.classList.add("list-card", "list-createList");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");
  icon.setAttribute("aria-hidden", "true");

  createListButton.appendChild(icon);
  createListButton.append(" Criar lista");
  listsContainer.appendChild(createListButton);

  createListButton.addEventListener("click", () => {
  modalCreateList.hidden = false;
});

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
         const emptyMessage = document.createElement("p");

  emptyMessage.classList.add("empty-list-message");
  emptyMessage.textContent = "Esta lista ainda não tem filmes.";

  selectedListMovies.appendChild(emptyMessage);
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


cancelListButton.addEventListener("click", () => {
  modalCreateList.hidden = true;
});

closeModalButton.addEventListener("click", () => {
  modalCreateList.hidden = true;
});

createListForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const listName = listNameInput.value.trim();
  listNameError.textContent = "";

  if (listName === "") {
    return;
  }

  if (listName.length < 3 || listName.length > 30) {
    listNameError.textContent = "O nome da lista deve ter entre 3 e 30 caracteres.";
    return;
  }
 
  const newList = {
    id: Date.now(),
    name: listName,
    movies: [],
  };

  lists.push(newList);

  renderLists();

  modalCreateList.hidden = true;
  createListForm.reset();
});

