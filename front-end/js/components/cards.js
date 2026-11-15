
function createMovieCard(movie, movieGenres, selectedGenreId) {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("card-container");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card");
    cardContainer.appendChild(cardContent);

    const poster = document.createElement("img");
    poster.classList.add("card-poster");

    if (movie.poster_path) {
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
        poster.src = "assets/img/poster-default.png";
    }

    poster.alt = movie.title;
    cardContent.appendChild(poster);

    const ratingBadge = document.createElement("div");
    ratingBadge.classList.add("card-rating-badge");

    const starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star");

    const rating = document.createElement("span");
    rating.classList.add("card-rating");

    if (movie.vote_average !== undefined) {
        rating.textContent = movie.vote_average.toFixed(1);
    } else {
        rating.textContent = "N/A";
    }

    ratingBadge.appendChild(starIcon);
    ratingBadge.appendChild(rating);

    cardContent.appendChild(ratingBadge);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    cardContainer.appendChild(cardInfo);

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = movie.title;
    cardInfo.appendChild(title);

    const cardMeta = document.createElement("div");
    cardMeta.classList.add("card-meta");
    cardInfo.appendChild(cardMeta);

    const cardYear = document.createElement("span");
    cardYear.classList.add("card-year");

    if (movie.release_date) {
        cardYear.textContent = movie.release_date.substring(0, 4);
    } else {
        cardYear.textContent = "N/A";
    }

    const cardSeparator = document.createElement("span");
    cardSeparator.classList.add("card-separator");
    cardSeparator.textContent = "•";

    const cardCategory = document.createElement("span");
    cardCategory.classList.add("card-category");

    if (selectedGenreId) {
        const selectedGenre = movieGenres.find(
            (genre) => genre.id === selectedGenreId
        );

        cardCategory.textContent =
            selectedGenre ? selectedGenre.name : "N/A";

    } else if (movie.genre_ids && movie.genre_ids.length > 0) {
        const genreId = movie.genre_ids[0];

        const genre = movieGenres.find(
            (movieGenre) => movieGenre.id === genreId
        );

        cardCategory.textContent =
            genre ? genre.name : "N/A";

    } else {
        cardCategory.textContent = "N/A";
    }

    cardMeta.appendChild(cardYear);
    cardMeta.appendChild(cardSeparator);
    cardMeta.appendChild(cardCategory);

    return cardContainer;
}
