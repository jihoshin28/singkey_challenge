import React, {useEffect, useState} from 'react';
import { getTvShow } from '../api'

const TvShowCard = ({poster, title, rating, id}) => {

    const [genres, setGenres] = useState([])

    useEffect(() => {
        getTvShow(id)
        .then((res) => {
            setGenres(res.data.genres)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

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

    return (
        <div className = "card">
            <img className = "poster" src = {`https://image.tmdb.org/t/p/w500/${poster}`}/>
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
                <div>
                    <a className = "trailer-link"  href = "www.google.com">Watch Trailer</a>
                </div>
            </div>

        </div>
    );
};

export default TvShowCard;