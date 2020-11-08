import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import MovieService from '../../services/MovieService';

import Movie from '../Generic/Movie';
import './Discovery.scss';


const filter = (movie: IMovie, stars: number | null) => (stars ? Math.floor(movie.rating) <= stars : false);

const Discovery: React.FC = () => {
    const { state, dispatch } = useStore();
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
            async function getMovies() {
                const movies = await MovieService.fetchMovies();
                dispatch({ type: 'LOADED', payload: movies });
            }

            getMovies();
    }, [dispatch]);

    const handleNav = (direction: string, max: number) => (e: any) => {
        if(direction === "right") {
            if (visible < max) {
                setVisible(visible + 1);
            }
        } else {
            if(visible > 0) {
                setVisible(visible - 1);
            }
        }
    }
    const theMovies = state.filter ? state.movies.filter((m:IMovie) => filter(m, state.filter)) : state.movies;
    const grouped = theMovies.reduce((acc: Array<Array<IMovie>> | Array<Array<never>>, movie: IMovie) => {
        if(acc.length === 0) {
            acc.push([]);
        }

        if(acc[acc.length - 1].length < 4) {
            acc[acc.length - 1].push(movie);
        } else {
            acc.push([]);
            acc[acc.length - 1].push(movie);
        }
        return acc;
    }, []);

    return(
        <section>
            <h2>Popular Movies</h2>
            <div className="discovery">
                <button onClick={handleNav('left', grouped.length - 1)} type="button" className="nav left">{'<'}</button>
                {
                    grouped
                    .map((movies: Array<IMovie>, index: number): any =>
                    <div key={`group-${index}`} className={`layer ${visible === index ? 'visible' : ''}`} data-scene={index}>
                      {movies.map((movie: IMovie, index: number) => <Movie key={`movie-${index}`} {...movie} index={index} />)}
                    </div>
                    )
                }
                <button onClick={handleNav('right', grouped.length - 1)} type="button" className="nav right">{'>'}</button>
            </div>
        </section>
    );
}


export default Discovery;