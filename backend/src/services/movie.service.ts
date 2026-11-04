type Movie = {
    title: string;
    releaseYear: number;
    genre: string;
};

export function createMovieService(movie: Movie) { //movie: object -> Indica que o parâmetro movie deve ser um objeto.
    return movie;
}