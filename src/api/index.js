import axios from 'axios'

export const getTrending = async(media_type, time_window) => {
   
    let response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    return response
}

export const getMovie = async(id) => {
    let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    return response
}

export const getTvShow = async(id) => {
    let response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    return response
}