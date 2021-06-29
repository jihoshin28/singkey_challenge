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

  const renderMovies = () => {
    if(!movies){
      return <div>Loading Movies...</div>
    } else {
      return movies.map(({backdrop_path, original_title, vote_average, id}) => {
        return (
         
          <MovieCard poster = {backdrop_path} title = {original_title} rating = {vote_average} id = {id}/>
          
        )
      })
    }
  }

  const renderTvShows = () => {
    if(!tvShows){
      return<div>Loading Shows...</div> 
    } else {
      return tvShows.map(({backdrop_path, name, vote_average, id}) => {
        return (

          <TvShowCard poster = {backdrop_path} title = {name} rating = {vote_average} id = {id}/>

        )
      })
    }
  }
  
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
      <div className = "display-section">
        <div class = 'movie-display'>
          {renderMovies()}
        </div>
        <div class = 'tv-display'>
          {renderTvShows()}
        </div>
      </div> 
    </div>
  );
}

export default App;
