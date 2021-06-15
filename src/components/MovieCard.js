import styles from '../styles/MovieCard.module.css';
import close from '../svg/close.svg';
import Movie from './Movie';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MovieContext } from './MovieContext';
import star from '../svg/star.svg';
import Empty from '../svg/Empty';
const MovieCard = ({ title, vote_average, poster, id }) => {
    const URL = `https://image.tmdb.org/t/p/w300`;

    const starAverage = Math.round(vote_average / 2);
    if (poster === null) {
        return (
            <Link to={`/movie/${id}`} key={id} className={`${styles.movieCard} ${styles.emptyCard}`} >
               <Empty height="150" width="150"/>
                <div className={styles.movieInfo}>
                    <h2>{title}</h2>
                    <div>
                        {[...Array(starAverage)].map((element, index) => {
                            return (
                                <img className={styles.star} key={starAverage} src={star} alt={index} />
                            );
                        })}
                    </div>
                    <span>{vote_average}/10</span>
                </div>
            </Link>
        )
    } else {

        return (
            <Link to={`/movie/${id}`} className={styles.movieCard} key={id}>
                <img src={`${URL}${poster}`} alt="hey" />
                <div className={styles.movieInfo}>
                    <h2>{title}</h2>
                    <div>
                        {[...Array(starAverage)].map((element, index) => {
                            return (
                                <img className={styles.star} key={starAverage} src={star} alt={vote_average.toFixed(1)} />
                            );
                        })}
                    </div>
                    <span>{vote_average.toFixed(1)}</span>
                </div>
            </Link>

        )
    }
}
export default MovieCard;
