const parseMovieData = (movieData) => {
    return movieData.map(data=> ({
        movieId: data.id,
        title: data.original_title,
        rating: data.vote_average,
        poster: data.poster_path,
        release: data.release_date,
        overview: data.overview,
        genres: data.genre_ids
    }));
};

export { parseMovieData }