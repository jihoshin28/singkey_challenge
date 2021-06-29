import axios from 'axios'

export const getTrending = async(media_type, time_window) => {
   
    let response = await axios.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=44486321235fa575380b0f650efa3224`)
    return response
}

export const getMovie = async(id) => {
    let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=44486321235fa575380b0f650efa3224`)
    return response
}

export const getTvShow = async(id) => {
    let response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=44486321235fa575380b0f650efa3224`)
    return response
}