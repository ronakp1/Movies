import REACT_APP_API_KEY from './apikey';

const API_KEY = REACT_APP_API_KEY;

const discoverLookup =  {
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

// const getPopular = async (pageNumber) => {
//     try {
//         const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
//         // const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pageNumber}`);
//         const data = await response.json();
//         // console.log("connectia", data.results);
//         return data.results;
//     } catch (err) {
//         console.log(err);a
//     }
// }

const getDiscoverCategories = async (filter,pageNumber) => {
    if(filter.includes("rated")) filter = "top_rated";
    const filterTerm = discoverLookup[filter];
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filterTerm}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
        const data = await response.json();
        // console.log("rated data", data.results);
        return data.results;
    } catch (err) {
        console.log(err);
    }
}

// const getUpcoming = async (pageNumber) => {
//     try {
//         const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
//         const data = await response.json();
//         // console.log("IMHERE", data.results);
//         return data.results;
//     } catch (err) {
//         console.log(err);
//     }
// }

const getSearch = async (searchQ, pageNumber) => {
    try {
        console.log("searchCONNECTB4", searchQ, pageNumber)
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=${searchQ}&page=${pageNumber}`)
        const data = await response.json();
        // console.log("searchinsideRESULTS", data.results);
        return data.results;
    } catch (err) {
        console.log(err);
    }
}

const getMovie = async ({ id }) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        //console.log("from connect", data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getRecommendedMovies = async (id, pageNumb) => {
    try {
        console.log("idis inside", id, pageNumb)
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNumb}`)
        const data = await response.json();
        console.log("from RECOMENDED", data.results);
        return data.results;
    } catch (err) {
        console.log(err);
    }
}


const getCredits = async ({ id }) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        //console.log("from CREDITS", data);
        return data;
    } catch (err) {
        console.log(err);
    }
}


const getGenres = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        // console.log("GENRE", data.genres);
        return data.genres;
    } catch (err) {
        console.log(err);
    }
}

const filterLookup = {
    popular: "popularity.desc",
    toprated: "vote_average.desc",
    title: "original_title.asc",
    releasedate: "primary_release_date.desc"
}

const getGenre = async (id, pageNumb, filter) => {
    try {
        const searchFilter = filterLookup[filter];
        console.log("THELINKISISISS", id, pageNumb, filter, searchFilter);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${searchFilter}&include_adult=false&include_video=false&page=${pageNumb}&with_genres=${id}&with_watch_monetization_types=flatrate
        `)
        const data = await response.json();
        console.log("MOVIELIST", data.results);
        return data.results;
    } catch (err) {
        console.log(err);
    }
}

const getPerson = async ({ id }) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        // console.log("from connect", data);
        return data;
    } catch (err) {
        console.log(err);
    }
}


const getPersonCredits = async ({ id }) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        // console.log("from connect", data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getMovieVideo = async ({ id }) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        //console.log("from connect", data);
        return data.results;
    } catch (err) {
        console.log(err);
    }
}




export { getDiscoverCategories, getSearch, getMovie, getGenres, getGenre, getCredits, getPerson, getRecommendedMovies, getPersonCredits, getMovieVideo }