import React from "react";
import '../index.css';

const Movie = ({item}) => (
        <div class="movie"> 
            <img src={"https://image.tmdb.org/t/p/original/" + item.poster_path} alt="Image" />
            <div class="movie-info">
                <h3>{item.title}</h3>
                <span class="green">{item.vote_average}</span>
            </div>

            <div class="overview">
                {item.overview}
            </div>
        </div>
        );

export default Movie;