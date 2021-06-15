import React, { useEffect, useState } from "react";
import { getMovie, getCredits, getRecommendedMovies, getMovieVideo } from '../apicalls/Connect';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";


import Credits from './Credits';
import Output from './Output';
import Loading from '../components/Loading';

import styles from '../styles/movie.module.css';
import star from '../svg/star.svg';
import Empty from '../svg/Empty';
import { FaRegPlayCircle, FaLink, FaImdb, FaPlayCircle, FaBackward } from 'react-icons/fa';


const Movie = () => {
    const [movie, setMovie] = useState([]);
    const [credits, setCredits] = useState([]);
    const [video, setVideo] = useState([]);
    const [recomendedMovies, setRecomendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = `https://image.tmdb.org/t/p/w500`;
    let { id } = useParams();
    let history = useHistory();
    let location = useLocation();

    const { search } = location;
    const searchParams = new URLSearchParams(search);

    let pageNumb = searchParams.get('page');

    if (pageNumb === undefined || pageNumb === null) {
        pageNumb = 1;
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setMovie(await getMovie({ id }));
            setCredits(await getCredits({ id }));
            const result = await getRecommendedMovies(id, pageNumb);
            setRecomendedMovies(result);
            setVideo(await getMovieVideo({ id }));
            setLoading(false);
        }
        fetchData();
    }, [id, pageNumb])

    { loading ? document.title = 'loading' : document.title = `${movie.original_title} - Movie Library` };


    const { poster_path, original_title, vote_average, runtime, release_date, overview, tagline, genres, homepage, imdb_id } = movie;

    const starAverage = Math.round(vote_average / 2);

    // const splitDate = release_date.split("-");
    // console.log("date", splitDate);

    return (
        <div className={styles.movieWrapper}>
            {loading ? <Loading /> :
                <div className={styles.movieDetails}>
                    <div className={styles.moviePoster}>
                        {poster_path === null ? <Empty height="600" width="550" />
                            :
                            <img src={`${URL}${poster_path}`} alt={original_title} />
                        }
                    </div>
                    <div className={styles.movieInformation}>
                        <h1>{original_title}</h1>
                        <h2>{tagline}</h2>
                        <div className={styles.stats}>
                            <div className={styles.average}>
                                {!isNaN(starAverage) && [...Array(starAverage)].map((element, index) => {
                                    return (
                                        <img className={styles.star} key={index} src={star} alt={`${starAverage} Stars`} />
                                    );
                                })}
                            </div>
                            <span>{vote_average}</span>
                            <div className={styles.metaInfo}>
                                {`${runtime} MIN. / ${release_date}`}
                            </div>
                        </div>
                        <div className={styles.genres}>
                            {genres.map(genre =>
                                <Link className={`${styles.clickables} ${styles.genreButtons}`} to={`/genre/${genre.id}${genre.name}`} key={genre.id}>
                                    <FaRegPlayCircle className={styles.svgicon} />
                                    {genre.name}
                                </Link>
                            )}

                        </div>

                        <div className={styles.synoposis}>
                            <h3>The Synoposis</h3>
                            <p>{overview}</p>
                        </div>

                        <div className={styles.movieCastInfo}>
                            <h3>The Cast</h3>
                            <Credits credits={credits} />
                        </div>


                        <div className={styles.buttons}>
                            <a href={`${homepage}`} className={styles.clickables} target="_blank" rel="noopener noreferrer"> <FaLink className={styles.svgicon} /> Website </a>
                            <a className={styles.clickables} href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer" > <FaImdb className={styles.svgicon} /> IMDB </a>
                            {video[0] &&
                                <a className={styles.clickables} href={`https://youtube.com/watch?v=${video[0].key}`} target="_blank" rel="noopener noreferrer"><FaPlayCircle className={styles.svgicon} />Watch Trailer</a>
                            }
                            <button className={`${styles.clickables} ${styles.backBtn}`} onClick={() => history.push("/")}><FaBackward className={styles.svgicon} /> Back </button>
                        </div>
                    </div>

                </div>
            }

            {loading ? '' : <Output recomendedMovies={recomendedMovies} />}

        </div >
    )
}


export default Movie
