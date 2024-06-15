import React, { useState } from 'react';
import './MovieCard.css'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solfaHeart } from '@fortawesome/free-solid-svg-icons'
import { faEye as solfaEye } from '@fortawesome/free-solid-svg-icons'

function MovieCard({ movieId, poster, title, rating, favoriteList, favorites, watchedList, watches }) {
    const [heartOn, setHeartOn] = useState(false)
    const [eyeOn, setEyeOn] = useState(false)
    const [favorited, setFavorited] = useState([])

    function handleRemoveWatch(itemToRemove){
        watchedList(watches.filter(item => item !== itemToRemove));
      };

    const handleRemoveFav = (itemToRemove) => {
        const newItems = favorites.filter((item) => item !== itemToRemove);
        favoriteList(newItems);
      };

    function addToFav(element) {
        const newArray = [...favorites, element];
        favoriteList(newArray);
    }

    function addToWatch(element) {
        const newArray = [...watches, element];
        watchedList(newArray);
    }

    function heartToggle(event) {
        event.preventDefault()
        event.stopPropagation()

        if (heartOn) {
            setHeartOn(false)
            handleRemoveFav(movieId)
        } else {
            setHeartOn(true)
            addToFav(movieId)
        }
    }
    function eyeToggle(event) {
        event.preventDefault()
        event.stopPropagation()
        if (eyeOn) {
            handleRemoveWatch(movieId)
            setEyeOn(false)
        } else {
            setEyeOn(true)
            addToWatch(movieId)
        }
    }

    return (
        <div className="card">
            <img className="movie-poster" src= {(poster !== null) ? `https://image.tmdb.org/t/p/w500${poster}` : `https://ik.imagekit.io/demo/tr:di-medium_cafe_B1iTdD0C.jpg/non_existent_image.jpg`} />
            <h4>{title}</h4>
            <p>{rating}</p>
            {heartOn ? (
            <FontAwesomeIcon icon={solfaHeart} className='heart-icon' onClick={heartToggle}/>
        ) : (<FontAwesomeIcon icon={faHeart} className='heart-icon' onClick={heartToggle}/>)}

        {eyeOn ? (
            <FontAwesomeIcon icon={solfaEye} className='eye-icon' onClick={eyeToggle}/>
        ) : (<FontAwesomeIcon icon={faEye} className='eye-icon' onClick={eyeToggle}/>)}
            
    
        </div>
    )
}

export default MovieCard
MovieCard.propTypes={
    title: PropTypes.string.isRequired,
}