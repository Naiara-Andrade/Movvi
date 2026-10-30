
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

const modalSearchMovies =document.getElementById("modal-search-movies");
const closeSearchMoviesButton = document.getElementById("btn-close-search-movies");
const cancelSearchMoviesButton = document.getElementById("btn-cancel-search-movies");
const searchMovieInput = document.getElementById("search-movie-input");
const searchMoviesButton = document.getElementById("btn-search-movies");
const searchMoviesResults = document.getElementById("search-movies-results");
const addSelectedMoviesButton = document.getElementById("btn-add-selected-movies");

const addMovieCreateButton = document.getElementById("btn-add-movie-create");
const addMovieEditButton = document.getElementById("btn-add-movie-edit");

let editingList = null;
let creatingList = null;
let listToDelete = null;
let selectedListId = null;
let movieToDelete = null;
let selectedMovies = [];
const mockMovies = [
  { id: 1, title: "Interestelar", year: 2014 },
  { id: 2, title: "Matrix", year: 1999 },
  { id: 3, title: "John Wick", year: 2014 },
  { id: 4, title: "A Origem", year: 2010 },
  { id: 5, title: "O Batman", year: 2022 }
];


function openSearchMoviesModal() {
   selectedMovies = [];
  addSelectedMoviesButton.disabled = true;
  addSelectedMoviesButton.textContent = "Adicionar selecionados (0)";
  searchMovieInput.value = "";
  searchMoviesResults.innerHTML = "";

  modalSearchMovies.hidden = false;
}

function closeSearchMoviesModal() {
  modalSearchMovies.hidden = true;
}


  addMovieCreateButton.addEventListener("click", () => {
    const listName = listNameInput.value.trim();

    listNameError.textContent = "";

    if (listName.length < 3 || listName.length > 30) {
        listNameError.textContent =
            "O nome da lista deve ter entre 3 e 30 caracteres.";
        return;
    }

    localStorage.setItem("movvi-pending-list-name", listName);

    window.location.href = "categories.html";
});


  addMovieEditButton.addEventListener("click", () => {
    if (!editingList) return;

    localStorage.setItem(
        "movvi-pending-list-id",
        String(editingList.id)
    );

    window.location.href = "categories.html";
});
closeSearchMoviesButton.addEventListener("click", closeSearchMoviesModal);
cancelSearchMoviesButton.addEventListener("click", closeSearchMoviesModal);

function updateSelectedMoviesButton() {
  addSelectedMoviesButton.disabled = selectedMovies.length === 0;

  addSelectedMoviesButton.textContent = `Adicionar selecionados (${selectedMovies.length})`;
}


function renderSearchMovies(movies) {
  searchMoviesResults.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("search-movie-item");

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const title = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.value = String(movie.id);

    checkbox.checked = selectedMovies.some(
      (selected) => selected.id === movie.id
    );

    title.textContent = `${movie.title} (${movie.year})`;

    label.append(checkbox, title);
    movieItem.appendChild(label);
    searchMoviesResults.appendChild(movieItem);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        const alreadySelected = selectedMovies.some(
          (selected) => selected.id === movie.id
        );

        if (!alreadySelected) {
          selectedMovies.push(movie);
        }
      } else {
        selectedMovies = selectedMovies.filter(
          (selected) => selected.id !== movie.id
        );
      }

      updateSelectedMoviesButton();
    });
  });

}




function searchMovies() {
  const searchTerm = searchMovieInput.value.trim().toLowerCase();

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  renderSearchMovies(filteredMovies);
}


searchMoviesButton.addEventListener("click", searchMovies);

searchMovieInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies();
  }
});





function loadLists() {
    const savedLists = localStorage.getItem("movvi-lists");

    if (savedLists) {
        return JSON.parse(savedLists);
    }

    return [
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
}

let lists = loadLists();

function saveLists() {
    localStorage.setItem("movvi-lists", JSON.stringify(lists));
}

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

    const listInfo = document.createElement("div");
listInfo.classList.add("list-card-info");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-film");
    icon.setAttribute("aria-hidden", "true");

   const listName = document.createElement("span");
listName.classList.add("list-card-name");
listName.textContent = list.name;

listInfo.append(icon, listName);

const actions = document.createElement("div");
actions.classList.add("list-card-actions");

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("list-edit-button");
    editButton.setAttribute("aria-label", `Editar ${list.name}`);

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.setAttribute("aria-hidden", "true");

    editButton.appendChild(editIcon);
   actions.appendChild(editButton);

    const deleteListButton = document.createElement("button");
    deleteListButton.type = "button";
    deleteListButton.classList.add("list-delete-button");
    deleteListButton.setAttribute("aria-label", `Excluir ${list.name}`);

    const deleteListIcon = document.createElement("i");
    deleteListIcon.classList.add("fa-regular", "fa-trash-can");
    deleteListIcon.setAttribute("aria-hidden", "true");

    deleteListButton.appendChild(deleteListIcon);
    actions.appendChild(deleteListButton);

    const numberOfMovies = document.createElement("span");
    numberOfMovies.classList.add("list-number-of-movies");
    numberOfMovies.textContent = `${list.movies.length} filmes`;
    listInfo.appendChild(numberOfMovies);

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
card.append(listInfo, actions);
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

const pendingListMovies = localStorage.getItem(
    "movvi-pending-list-movies"
);

if (pendingListMovies) {
    modalCreateList.hidden = false;
}

cancelListButton.addEventListener("click", () => {
  modalCreateList.hidden = true;

    localStorage.removeItem("movvi-pending-list-movies");
});

closeModalButton.addEventListener("click", () => {
  modalCreateList.hidden = true;
   localStorage.removeItem("movvi-pending-list-movies");
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

  const pendingMovies = JSON.parse(
    localStorage.getItem("movvi-pending-list-movies") || "[]"
);

lists.push({
    id: Date.now(),
    name: listName,
    movies: pendingMovies
});

  saveLists();
  renderLists();  

localStorage.removeItem("movvi-pending-list-movies");

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
saveLists();

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

    const originalList = lists.find(
        (list) => list.id === editingList.id
    );

    if (originalList) {
        originalList.movies = [...editingList.movies];
        saveLists();
    }

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
      saveLists();
    }
  }

  modalDeleteList.hidden = true;
  listToDelete = null;
  movieToDelete = null;
});


