// app/services/tmdb.ts
import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';
// Add this at the top of your tmdb.ts
export interface Genre {
    id: number;
    name: string;
}
// Update your TMDBMovie interface
export interface TMDBMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null; // Add this line
    vote_average: number;
    popularity: number;
    release_date?: string;
    // Add other fields you might need
}

// Add this interface for the API response
interface TMDBDiscoverResponse {
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}

export const fetchTrendingMovies = async (): Promise<TMDBMovie[]> => {
    try {
        const response = await axios.get<{ results: TMDBMovie[] }>(
            `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};
// Add this to your existing tmdb.ts file
export const fetchGenreImages = async (genreId: number): Promise<string> => {
    try {
        // Fetch 3 random popular movies from this genre
        const response = await axios.get<{ results: TMDBMovie[] }>(
            `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}` +
            `&with_genres=${genreId}&sort_by=popularity.desc&page=1`
        );

        // Get a random movie from the first 3 results
        const randomIndex = Math.floor(Math.random() * Math.min(3, response.data.results.length));
        const movie = response.data.results[randomIndex];

        // Return backdrop if available, otherwise poster, otherwise empty string
        return movie?.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            : movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '';
    } catch (error) {
        console.error('Error fetching genre image:', error);
        return '';
    }
};
export const fetchPopularMovies = async (): Promise<TMDBMovie[]> => {
    try {
        const response = await axios.get<{ results: TMDBMovie[] }>(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

// app/services/tmdb.ts
export const fetchMovieDetails = async (id: number): Promise<TMDBMovieDetails> => {
    try {
        const response = await axios.get(
            `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// In your tmdb.ts service file
export const fetchGenres = async (): Promise<Genre[]> => {
    const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
    const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
    );
    return response.data.results;
};

// Add this interface
export interface TMDBMovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    credits: {
        cast: {
            name: string;
            character: string;
        }[];
    };
}