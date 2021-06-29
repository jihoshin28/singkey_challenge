import React, {useState, useEffect} from 'react'
import {getTrending} from './api'
import MovieCard from './components/MovieCard'
import TvShowCard from './components/TvShowCard'
import LazyLoad from './components/LazyLoad'
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
      return movies.map(({title, vote_average, id}) => {
        return (
          <LazyLoad>
            <MovieCard title = {title} rating = {vote_average} id = {id}/>
          </LazyLoad>
        )
      })
    }
  }

  const renderTvShows = () => {
    if(!tvShows){
      return<div>Loading Shows...</div> 
    } else {
      return tvShows.map(({name, vote_average, id}) => {
        return (
          <LazyLoad>
            <TvShowCard title = {name} rating = {vote_average} id = {id}/>
          </LazyLoad>
        )
      })
    }
  }

  const sortData = (e, value) => {
    let result
    let data
    if(value === 'movie'){
      data = [...movies]
    } else if(value === 'tv'){
      data = [...tvShows]
    }

    if(e.target.value === 'high-rate'){
      data.sort((a,b) => b.vote_average - a.vote_average)
    } else if(e.target.value === 'low-rate') {
      data.sort((a,b) => a.vote_average - b.vote_average)
    } else if(e.target.value === 'a') {
      if(value === 'tv') {
        data.sort((a,b) => a.name.localeCompare(b.name))
      } else {
        data.sort((a,b) => a.title.localeCompare(b.title))
      }
    } else if(e.target.value === 'z') {
      if(value === 'tv') {
        data.sort((a,b) => b.name.localeCompare(a.name))
      } else {
        data.sort((a,b) => b.title.localeCompare(a.title))
      }
    }
    console.log(data)
    if(value === 'movie'){
      setMovies(data)
    } else if(value === 'tv'){
      setTvShows(data)
    }
  }

  return (
    <div className="App">
      <img className = "logo" src = {process.env.PUBLIC_URL + '/movie_db_logo.png'}></img>
      <div className = "header">
        <div className = "header-row">
          <h3>Trending Movies</h3>
          <div className = "header-select">
            <p>Sort by: </p>
            <select onChange = {(e) => sortData(e, 'movie')}>
              <option value="high-rate">Highest Rating</option>
              <option value="low-rate">Lowest Rating</option>
              <option value="a">A-Z</option>
              <option value="z">Z-A</option>
            </select>
          </div>
        </div>
        <div className = "header-row">
          <h3>Trending Tv Shows</h3>
          <div className = "header-select">
            <p>Sort by: </p>
            <select onChange = {(e) => sortData(e, 'tv')}>
              <option value="high-rate">Highest Rating</option>
              <option value="low-rate">Lowest Rating</option>
              <option value="a">A-Z</option>
              <option value="z">Z-A</option>
            </select>
          </div>
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
