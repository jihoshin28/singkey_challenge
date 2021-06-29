import React, {useEffect, useState} from 'react';
import { getTvShow } from '../api'

const TvShowCard = ({title, rating, id}) => {

    const[poster, setPoster] = useState('')
    const [genres, setGenres] = useState([])
    const [network, setNetwork] = useState('')

    useEffect(() => {
        getTvShow(id)
        .then((res) => {
            console.log(res)
            setGenres(res.data.genres)
            setNetwork({
                url: res.data.homepage, 
                name: res.data.networks[0].name
            })
            setPoster(res.data.poster_path)
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
                    <a className = "homepage-link"  href = {network.url}>Playing On: {network.name}</a>
                </div>
                <div>
                    <a className = "trailer-link"  href = {`https://www.youtube.com/results?search_query=${urlQuery()}trailer`}>Watch Trailer</a>
                </div>
            </div>

        </div>
    );
};

export default TvShowCard;