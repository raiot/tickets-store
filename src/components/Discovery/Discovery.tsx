import React, { useEffect } from 'react';
import { useStore } from '../../store';
import MovieService from '../../services/MovieService';

import Movie from '../Generic/Movie';
import './Discovery.scss';


const filter = (movie: IMovie, stars: number | null) => (stars ? Math.floor(movie.rating) <= stars : false);

const Discovery: React.FC = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'LOADING' });
            async function getMovies() {
                const movies = await MovieService.fetchMovies();
                dispatch({ type: 'LOADED', payload: movies });
            }

            getMovies();
    }, [dispatch]);

    const theMovies = state.filter ? state.movies.filter((m:IMovie) => filter(m, state.filter)) : state.movies;

    return(
        <section>
            <h2>Popular Movies</h2>
            <div className="discovery">
                {theMovies.map((movie: IMovie, index: number): any => <Movie key={index} {...movie} index={index} />) }
            </div>
        </section>
    );
}


export default Discovery;