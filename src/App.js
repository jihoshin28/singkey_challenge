import React, {useState, useEffect} from 'react'
import {getTrending} from './api'
import MovieCard from './components/MovieCard'
import TvShowCard from './components/TvShowCard'
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  useEffect(() => {
    getTrending('movie', 'day')
    .then((res) => {
      setMovies(res.data.results)
      console.log(res.data.results)
    }).catch((err) => {
      throw err
    })
    
    getTrending('tv', 'day')
    .then((res) => {
      setTvShows(res.data.results)
      console.log(res.data.results)
    }).catch((err) => {
      throw err
    })

  },[])

  
  return (
    <div className="App">
      <div className = "header">
        <div>
          <h3>Trending Movies</h3>
        </div>
        <div>
          <h3>Trending Tv Shows</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
