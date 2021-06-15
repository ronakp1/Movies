import React, { useState, useEffect } from 'react';
import NavBarLinks from './NavBarLinks';
import styles from '../styles/navBar.module.css';
import { getGenres } from '../apicalls/Connect';
import upcoming from '../svg/upcoming.svg';
import popular from '../svg/popularity.svg';
import topRated from '../svg/bar-chart.svg';
import { Link } from "react-router-dom";


const NavBar = ({ showMenu }) => {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        let isUnmount = false;

        const getList = async () => {
            const result = await getGenres();
            if (!isUnmount) {
                setGenreList(result);
            }
        }
        getList();
        return () => {
            isUnmount = true;
        }
    }, [])


    let completeClass = showMenu ? styles.hamburger : '';
    return (
        <div className={styles.navBar}>
            <Link className={` ${styles.dropbtn}`} to="/">Movie Library</Link>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Discover</button>
                <div className={`${styles.dropdownContent} ${styles.discoverContent} ${completeClass} `}>
                    <div className={`${styles.groupContent} ${styles.discoverContent}`}>
                        <NavBarLinks itemValue="popular" pic={popular} />
                        <NavBarLinks itemValue="top rated" pic={topRated} />
                        <NavBarLinks itemValue="upcoming" pic={upcoming} />
                    </div>
                </div>
            </div>

            <div class={styles.dropdown}>
                <a class={styles.dropbtn}>Genres</a>
                <div className={`${styles.dropdownContent} ${styles.genreContent} ${completeClass}`}>
                    <div className={styles.groupContent}>
                        {genreList.length > 0 &&
                            genreList.map(genre =>
                                <NavBarLinks itemValue={genre.name} id={genre.id} key={genre.id} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default NavBar;