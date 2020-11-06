
const API_TOKEN: string = process.env.REACT_APP_API_TOKEN || '';

const prepareData = (data: any) : [IMovie]|[] =>{
    if(!data || !data.results) {
        return [];
    }
    return data.results.map((movie: any) => ({
        name: movie.title,
        releaseDate: movie.release_date,
        summary: movie.overview,
        rating: movie.vote_average,
        avg: (parseInt(movie.vote_average) / 5) * 100,
        rawImg: movie.poster_path,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));
}

class MovieService {
    urls = {
        discover: {
            url: (apiKey: string) =>
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        },
        search: {
            url: (apiKey: string, query: string) =>
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        }
    };

    fetchMovies = async () => {
        const response = await fetch(this.urls['discover'].url(API_TOKEN));
        const movies = await response.json();
        return prepareData(movies);
    }

    searchMovies = async (query: string) => {
        const response = await fetch(this.urls['search'].url(API_TOKEN, query));
        const movies = await response.json();
        return prepareData(movies);
    }
}


export default new MovieService();