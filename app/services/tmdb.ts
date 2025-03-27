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