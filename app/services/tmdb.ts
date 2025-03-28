// app/services/tmdb.ts
import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';

interface TMDBMovie {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    popularity: number;
    // Add other fields you need
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