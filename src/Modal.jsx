import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { Genres } from './Genres';

const Modal = ({ closeModal, currentMovie }) => {
    const [runtime, setRuntime] = useState(0)
    const [trailer, setTrailerUrl] = useState("")
    const [heartOn, setHeartOn] = useState(false)
    const [eyeOn, setEyeOn] = useState(false)

    function handleCloseModal() {
        console.log("handleCloseModal")
        closeModal()
    }

    function handleGenres(genreIDS) {
        return genreIDS.map(id => Genres[id]).filter(name => name !== undefined);
    }
    const genreNames = handleGenres(currentMovie.genres)



    const fetchMoreMovieDetails = async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${currentMovie.movieId}?api_key=${apiKey}&append_to_response=videos`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setRuntime(data.runtime);

            const trailer = data.videos.results.find(video => video.type === 'Trailer');
            setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : '');
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    };

    useEffect(()=> {
        if (currentMovie != ''){
            fetchMoreMovieDetails();
        }
      }, []);


    return (
        <>
      <div className="centered">
                <div className="modal">
                    <div className='modal-content'>
                        <div className='movie-poster'>
                        <img src= {(currentMovie.poster !== null) ? `https://image.tmdb.org/t/p/w500${currentMovie.poster}` : `https://ik.imagekit.io/demo/tr:di-medium_cafe_B1iTdD0C.jpg/non_existent_image.jpg`} />                     
                        
                        </div>
                        <div className="movie-details">
                            <h2>{currentMovie.title}</h2>
                            <p>{currentMovie.release}</p>

                            <p>{currentMovie.overview}</p>
                            <p>{genreNames.join(', ')}</p>
                            <p>Runtime: {runtime}</p>
                            <iframe width="370" height="240"
                            src={trailer}>
                            </iframe>
                        </div>
                    </div>
                    <button className="closeBtn" onClick={handleCloseModal}>
                        Close
                    </button>
                    

                </div>
      </div>
        
        </>
    )
}

export default Modal;