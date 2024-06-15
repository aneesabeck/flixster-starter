import React, { useState, useEffect } from 'react';
import './SearchForm.css'

// if input text is none

function SearchForm({ onMovieChange }) {
    const [inputText, setText] = useState("")
    const handleInput = (event) => {
        var input = event.target.value.toLowerCase();
        setText(input)
        console.log("input", input)

    }

    console.log("input text", inputText)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const apiKey = '788c4770613fc401b48890e6290fc098'
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?&page=1&api_key=${apiKey}&language=en-US&release_date.gte=1950-01-01&release_date.lte=2024-08-01&query=${inputText}`)
        const data = await response.json()
        console.log("data", data)
        onMovieChange(data.results)
    }

    const handleNowPlay = async (event) => {
        event.preventDefault()
        const apiKey = '788c4770613fc401b48890e6290fc098'
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
        const data = await response.json()
        setText("")
        onMovieChange(data.results)
    }


    return (
        <form className="search-bar">
            <input className="search-input" type="text" value={inputText} onChange={handleInput} placeholder="Enter a movie title" input={inputText}/>
            <button className="search-button" type="submit" onClick={handleSubmit}>Search</button>
            <button className="now-btn" onClick={handleNowPlay}>Now Playing</button>
        </form>
    )
}

export default SearchForm