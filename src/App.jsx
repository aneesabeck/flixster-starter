import React, { useState, useEffect } from 'react';
import './App.css'
import SearchForm from './SearchForm'
import MovieList from './MovieList'

const App = () => {
  const [movie, setMovie] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [page, setPage] = useState(2);
  const [selectedSort, setSelectedSort] = useState("popularity")
  const [favoriteArray, setFavorites] = useState([])
  const [watchedArray, setWatched] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };
  
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&sort_by=${selectedSort}&page=1`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
  
  const fetchData = async() => {
    const apikey = import.meta.env.VITE_API_KEY
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&include_adult=false&language=en-US&page=1&sort_by=${selectedSort}`)
    const data = await response.json()
    setMovieData(data.results)
  }

  useEffect(()=> {
    if (movie != ''){
      fetchData();
    }
  }, [movie]);

  async function handleLoad(event) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=${selectedSort}`)
    setPage((prev) => 
      prev+1
    )
    const data = await response.json()
    setMovieData((prev) => {
      return [
      ...prev,
      ...data.results
      ]}
    );
}
  
  const handleSort = async (event) => {
    setSelectedSort(event.target.value)
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&language=en-US&page=1&sort_by=${event.target.value}`)
    const data = await response.json()
    setMovieData(data.results)
    }



  return(
  <div className="App">
    <h1>Flixster</h1>
    <SearchForm onMovieChange={setMovieData}/>
    <div class="sort-filter">
            <select value={selectedSort} onChange={handleSort} className="sort-btn">
            <option value="popularity"  className='sort-option'>Sort Movies:</option>
                <option value="title.asc" >Title: A-Z</option> 
                <option value="title.desc">Title: Z-A</option> 
                <option value="release_date.desc">Release Date: New-Old</option> 
                <option value="release_date.asc">Release Date: Old-New</option> 
            </select>
        </div>
    <div className='side-movie'>
    <MovieList data={movieData} favoriteList={setFavorites} favorites={favoriteArray} watchedList={setWatched} watches={watchedArray}/>
    </div>
    
    <button className="load-btn" onClick={handleLoad}>Load More</button>
  </div>
  )
}
export default App
