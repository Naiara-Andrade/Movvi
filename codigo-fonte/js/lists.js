
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

const modalEditList = document.getElementById("modal-edit-list");
const cancelEditListButton = document.getElementById("btn-cancel-edit-list");
const closeEditModalButton = document.getElementById("btn-close-edit-modal");
const editListMovies = document.getElementById("edit-list-movies");
const editListNameInput = document.getElementById("edit-list-name");
const editListForm = document.getElementById("form-edit-list");
const editListNameError = document.getElementById("edit-list-name-error");
const editListMovieCount = document.getElementById("edit-list-movie-count");

const modalDeleteList = document.getElementById("modal-delete-list");
const deleteListName = document.getElementById("delete-list-name");
const deleteListMovieCount = document.getElementById("delete-list-movie-count");
const cancelDeleteListButton = document.getElementById("btn-cancel-delete-list");
const confirmDeleteListButton = document.getElementById("btn-confirm-delete-list");

let editingList = null;
let listToDelete = null;
let selectedListId = null;
let movieToDelete = null;

const lists = [
  {
    id: 1,
    name: "Lista de Ação",
    movies: [
      { id: 1, title: "John Wick" },
      { id: 2, title: "Matrix" }
    ]
  },
  {
    id: 2,
    name: "Lista de Comédia",
    movies: []
  }
];

function renderSelectedList(list) {
  selectedListMovies.innerHTML = "";

  if (list.movies.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-list-message");
    emptyMessage.textContent = "Esta lista ainda não tem filmes.";
    selectedListMovies.appendChild(emptyMessage);
    return;
  }

  list.movies.forEach((movie) => {
    const movieCard = createMovieCard(movie, movieGenres);
    selectedListMovies.appendChild(movieCard);
  });
}

function renderLists() {
  listsContainer.innerHTML = "";

  const createListButton = document.createElement("button");
  createListButton.type = "button";
  createListButton.classList.add("list-card", "list-createList");

  const createIcon = document.createElement("i");
  createIcon.classList.add("fa-solid", "fa-plus");
  createIcon.setAttribute("aria-hidden", "true");

  createListButton.appendChild(createIcon);
  createListButton.append(" Criar lista");
  listsContainer.appendChild(createListButton);

  createListButton.addEventListener("click", () => {
    modalCreateList.hidden = false;
  });

  lists.forEach((list) => {
    const card = document.createElement("div");
    card.classList.add("list-card");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-film");
    icon.setAttribute("aria-hidden", "true");

    card.appendChild(icon);
    card.append(` ${list.name}`);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("list-edit-button");
    editButton.setAttribute("aria-label", `Editar ${list.name}`);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.setAttribute("aria-hidden", "true");

    editButton.appendChild(editIcon);
    card.appendChild(editButton);

    const deleteListButton = document.createElement("button");
    deleteListButton.type = "button";
    deleteListButton.classList.add("list-delete-button");
    deleteListButton.setAttribute("aria-label", `Excluir ${list.name}`);

    const deleteListIcon = document.createElement("i");
    deleteListIcon.classList.add("fa-regular", "fa-trash-can");
    deleteListIcon.setAttribute("aria-hidden", "true");

    deleteListButton.appendChild(deleteListIcon);
    card.appendChild(deleteListButton);

    const numberOfMovies = document.createElement("span");
    numberOfMovies.classList.add("list-number-of-movies");
    numberOfMovies.textContent = `${list.movies.length} filmes`;
    card.appendChild(numberOfMovies);

    editButton.addEventListener("click", (event) => {
      event.stopPropagation();

      editingList = {
        ...list,
        movies: [...list.movies]
      };

      editListNameInput.value = editingList.name;
      editListNameError.textContent = "";

      renderEditListMovies();
      modalEditList.hidden = false;
    });

    deleteListButton.addEventListener("click", (event) => {
      event.stopPropagation();

      listToDelete = list;
      movieToDelete = null;

      deleteListName.textContent = list.name;
      deleteListMovieCount.textContent =
        `${list.movies.length} ${list.movies.length === 1 ? "filme" : "filmes"}`;

      modalDeleteList.hidden = false;
    });

    card.addEventListener("click", () => {
      selectedList.hidden = false;
      selectedListId = list.id;
      selectedListTitle.textContent = list.name;
      renderSelectedList(list);
    });

    listsContainer.appendChild(card);
  });
}

function renderEditListMovies() {
  editListMovies.innerHTML = "";
  editListMovieCount.textContent = editingList.movies.length;

  if (editingList.movies.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-list-message");
    emptyMessage.textContent = "Esta lista ainda não tem filmes.";
    editListMovies.appendChild(emptyMessage);
    return;
  }

  editingList.movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("edit-list-movie-item");

    const poster = document.createElement("img");
    poster.classList.add("edit-list-movie-poster");
    poster.src = movie.poster || "./images/poster-placeholder.png";
    poster.alt = `Pôster de ${movie.title}`;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("edit-list-movie-info");

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    const movieDetails = document.createElement("p");
    movieDetails.textContent = [movie.genre, movie.year]
      .filter(Boolean)
      .join(" • ");

    movieInfo.append(movieTitle, movieDetails);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("edit-list-movie-delete");
    deleteButton.setAttribute("aria-label", `Remover ${movie.title} da lista`);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    deleteIcon.setAttribute("aria-hidden", "true");

    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", () => {
      movieToDelete = movie;
      listToDelete = null;

      deleteListName.textContent = movie.title;
      deleteListMovieCount.textContent = "este filme";

      modalDeleteList.hidden = false;
    });

    movieItem.append(poster, movieInfo, deleteButton);
    editListMovies.appendChild(movieItem);
  });
}

renderLists();

cancelListButton.addEventListener("click", () => {
  modalCreateList.hidden = true;
});

closeModalButton.addEventListener("click", () => {
  modalCreateList.hidden = true;
});

cancelEditListButton.addEventListener("click", () => {
  modalEditList.hidden = true;
  editingList = null;
  movieToDelete = null;
});

closeEditModalButton.addEventListener("click", () => {
  modalEditList.hidden = true;
  editingList = null;
  movieToDelete = null;
});

createListForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const listName = listNameInput.value.trim();
  listNameError.textContent = "";

  if (listName.length < 3 || listName.length > 30) {
    listNameError.textContent = "O nome da lista deve ter entre 3 e 30 caracteres.";
    return;
  }

  lists.push({
    id: Date.now(),
    name: listName,
    movies: []
  });

  renderLists();
  modalCreateList.hidden = true;
  createListForm.reset();
});

editListForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const editListName = editListNameInput.value.trim();
  editListNameError.textContent = "";

  if (editListName.length < 3 || editListName.length > 30) {
    editListNameError.textContent = "Entre 3 e 30 caracteres.";
    return;
  }

  if (!editingList) return;

  const originalList = lists.find(
    (list) => list.id === editingList.id
  );

  if (!originalList) return;

  originalList.name = editListName;
  originalList.movies = [...editingList.movies];

  if (selectedListId === originalList.id) {
    selectedListTitle.textContent = originalList.name;
    renderSelectedList(originalList);
  }

  renderLists();
  modalEditList.hidden = true;
  editingList = null;
  movieToDelete = null;
});

cancelDeleteListButton.addEventListener("click", () => {
  modalDeleteList.hidden = true;
  listToDelete = null;
  movieToDelete = null;
});

confirmDeleteListButton.addEventListener("click", () => {
  if (movieToDelete && editingList) {
    editingList.movies = editingList.movies.filter(
      (movie) => movie.id !== movieToDelete.id
    );

    renderEditListMovies();
  } else if (listToDelete) {
    const deletedListId = listToDelete.id;
    const index = lists.findIndex(
      (list) => list.id === deletedListId
    );

    if (index !== -1) {
      lists.splice(index, 1);

      if (editingList?.id === deletedListId) {
        editingList = null;
        modalEditList.hidden = true;
      }

      if (selectedListId === deletedListId) {
        selectedList.hidden = true;
        selectedListId = null;
        selectedListTitle.textContent = "";
        selectedListMovies.innerHTML = "";
      }

      renderLists();
    }
  }

  modalDeleteList.hidden = true;
  listToDelete = null;
  movieToDelete = null;
});
