import React, {useEffect, useState} from 'react';
import { getMovie } from '../api'
const MovieCard = ({title, rating, id}) => {

    const [poster, setPoster] = useState('')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getMovie(id)
        .then((res) => {
            setGenres(res.data.genres)
            setPoster(res.data.poster_path)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])

    let renderGenres = () => {
        if(!genres){
            return <div>Loading Genres</div>
        } else {
            let genreString = ''
            genres.forEach((genre, index) => {
                if(index !== genres.length - 1){
                    genreString += `${genre.name}, `
                } else {
                    genreString += `${genre.name}`
                }
            })
            return genreString
        }
    }

    let urlQuery = () => {
        let splitTitle = title.split(' ')
        let result = ''
        for(let i = 0; i < splitTitle.length; i++){
            result += `${splitTitle[i]}+`
        }
        return result
    }

    
    return (
        <div className = "card">
            <img alt = "movie_poster" className = "poster" src = {`https://image.tmdb.org/t/p/w500/${poster}`}/>
            <div className = "info">
                <div className = "rating">
                    <h5>{rating}/10</h5> 
                </div> 
                <div className = "titleDiv">
                    <div className = "title">
                        <h6>{title}</h6>
                    </div>
                    <div className = "genres">
                        <h6>
                            {renderGenres()}
                        </h6> 
                    </div>
                </div> 
                <a className = "trailer-link"  href = {`https://www.youtube.com/results?search_query=${urlQuery()}trailer`}>Watch Trailer</a>
            </div>

        </div>
    );
};

export default MovieCard;