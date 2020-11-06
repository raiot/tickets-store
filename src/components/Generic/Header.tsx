import React, { useState, useEffect } from 'react';
import MovieService from '../../services/MovieService';
import { useStore } from '../../store';


const Header: React.FC<{}> = () => {
    const { dispatch } = useStore();
    const [query, setQuery ] = useState('');
    const [search, setSearch] = useState(false);

    const handleChange = (e: any) => {
        const { target } = e;
        if(target) {
            setQuery(target.value)
        }
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        setSearch(true);
    }

    useEffect(() => {
        dispatch({ type: 'SEARCHING' });
        async function doSearch () {
            if(!query || query.length === 0) {
                return;
            }
            const m = await MovieService.searchMovies(query);
            dispatch({ type: 'SEARCHED', payload: m});
        }

        async function getMovies() {
            const movies = await MovieService.fetchMovies();
            dispatch({ type: 'LOADED', payload: movies });
        }
        if(search){
            doSearch();
        }else {
            getMovies();
        }
        return () => setSearch(false);
    }, [dispatch, query, search]);

    return (
        <header>
            <h2>
                MOVIE GALLERY
            </h2>
            <form className="search-form">
                <input type="text" onChange={handleChange} value={query} />
                <button type="submit" onClick={handleClick}>search</button>
            </form>
        </header>
    );
}

export default Header;