interface IMovieContext {
    state: State;
    dispatch: Dispatch<IAction>
}

type MoviesState = |
    'LOADING' |
    'EMPTY' |
    'LOADED' |
    'SEARCHING' |
    'SEARCHED';

interface IMovieService {
    fetchMovies: () => void;
}

interface IAction {
    state: State;
    payload: any;
    type: MoviesState | string;
}

interface IMovie {
    name: string;
    imageUrl: string;
    summary: string;
    rating: number;
    releaseDate: string;
    index: number;
    rawImg: string;
    avg: number;
}


type State = {
    movies: Array<IMovie> | Array<>;
    moviesState: MoviesState;
    filter: number | null;
}