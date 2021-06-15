import React, { useContext, useEffect, useState } from 'react';
// import { MovieContext } from './MovieContext';
import MovieCard from './MovieCard';

import Pagination from './Pagination';
import { useLocation } from "react-router-dom";
import styles from '../styles/MovieCard.module.css';
import GenreFilters from './GenreFilters';


const Output = (props) => {
    // const { movies, loading } = useContext(MovieContext);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [similar, setSimilar] = useState(['']);
    const [genreTitle, setGenreTitle] = useState('');
    let location = useLocation();

    useEffect(() => {
        if (props.length < 2) {
            return;
        }
        const hey = location.pathname;

        if ((hey.includes("person"))) {

            setSimilar("person");
            if (props.personCredits !== undefined) {
                console.log("credit", props.personCredits);
                console.log("credit", props.personCredits.cast);
                setCurrentMovies(props.personCredits.cast);
            }
        }

        if ((hey.includes("search"))) {
            setSimilar("search");

            setCurrentMovies(props.searchList);
            const enterString = location.pathname;
            let regexStr = enterString.match(/[a-z]+|[^a-z]+/gi);
            setGenreTitle(`Search Results: '${regexStr[3]}' `);
            document.title = genreTitle;
        }

        if ((hey.includes("genre"))) {

            setSimilar("genre");
            const enterString = location.pathname;
            let regexStr = enterString.match(/[a-z]+|[^a-z]+/gi);
            setGenreTitle(`${regexStr[3]} Films`);
            document.title = genreTitle;
            setCurrentMovies(props.genreList);
        }
        if ((hey.includes("movie"))) {
            setSimilar("movie");


            if (props.recomendedMovies !== undefined) {
                setCurrentMovies(props.recomendedMovies);
            }

        }
        if (hey.includes("discover")) {
            setSimilar("discover");
            setCurrentMovies(props.discoverList);

        }


    }, [props])

    const removeSlash = movieName => {
        const finalString = movieName.match(/[a-z]+|[^a-z]+/gi);
        return finalString[3];
    }

    if (currentMovies !== undefined && currentMovies.length) {
        return (
            <div className={styles.movieWrapper}>
                <div className={styles.movieCategory}>
                    {similar === "movie" ? <h1>Reccomended Films</h1>
                        : similar === "person" ? <h1>Has starred in</h1>
                            : similar === "genre" ? <GenreFilters changeValue={props.changeValue} title={genreTitle} />
                                
                                : similar === "search" ? <h1>{genreTitle}</h1>
                                    : <h1>{`${removeSlash(location.pathname)} Films`}</h1>
                    }


                </div>
                <div className={styles.moviesContainer}>
                    {currentMovies !== undefined &&
                        currentMovies.map((c) => (
                            <MovieCard
                                title={c.title}
                                poster={c.poster_path}
                                vote_average={c.vote_average}
                                id={c.id}
                            />
                        ))
                    }

                </div>
                <Pagination />
            </div>

        );
    }
    else {
        return (
            null
        );
    }
}

export default Output;
