import React, {useEffect, useState} from 'react';
import { getTvShow } from '../api'

const TvShowCard = ({poster, title, rating, id}) => {

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
                </div> 
                <div>
                    <a className = "trailer-link"  href = "www.google.com">Watch Trailer</a>
                </div>
            </div>

        </div>
    );
};

export default TvShowCard;