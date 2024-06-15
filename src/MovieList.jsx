import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';
import Modal from './Modal'
import { parseMovieData } from './utils/utils';
// import PropTypes from 'prop-types';


function MovieList({ data, favoriteList, watchedList, favorites, watches }) {
    const parsedData = data ? parseMovieData(data) : [];
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)


    function closeModal () {
        setIsOpen(false)
    }

    function openModal(movie) {
        setIsOpen(true)
        setSelectedMovie(movie)
    }

    return (
        <>
        <div className="movList-container">
            {parsedData.map(movie => (
                <div className="movie-card" key={movie.movieId} onClick={() => openModal(movie)}>
                    <MovieCard movieId={movie} poster={movie.poster} title={movie.title} rating={movie.rating} favoriteList={favoriteList} favorites={favorites} watchedList={watchedList} watches={watches}/>

                </div>
            ))}
            {isOpen && <Modal closeModal={closeModal} currentMovie={selectedMovie}/>}
            
        </div>
        </>
    );
}

export default MovieList;
