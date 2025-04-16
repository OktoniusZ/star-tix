import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { BellIcon, MenuIcon } from '../components/Icons';
import CategoryPills from '../components/CategoryPills';
import TrendingCard from '../components/TrendingCard';
import RecommendationCard from '../components/RecommendationCard';
import { fetchTrendingMovies, fetchPopularMovies, fetchGenres, fetchMoviesByGenre } from '../services/tmdb';
import NotificationPanel from '../components/NotificationPanel';

interface MovieCard {
    id: number;
    title: string;
    rating: number;
    image: { uri: string } | number;
    views?: string;
    bookmarked?: boolean;
}

export default function Home() {
    const [trendingData, setTrendingData] = useState<MovieCard[]>([]);
    const [recommendationsData, setRecommendationsData] = useState<MovieCard[]>([]);
    const [genreData, setGenreData] = useState<MovieCard[]>([]);
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);
    const [activeGenre, setActiveGenre] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [trending, popular, genreList] = await Promise.all([
                    fetchTrendingMovies(),
                    fetchPopularMovies(),
                    fetchGenres()
                ]);

                setGenres(genreList);
                setActiveGenre(genreList[0]?.id); // Set first genre as active

                setTrendingData(trending.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    rating: movie.vote_average / 2,
                    image: movie.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                        : require('../assets/placeholder.png')
                })));

                setRecommendationsData(popular.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    rating: movie.vote_average / 2,
                    views: `${Math.max(1, Math.round(movie.popularity / 1000))}K`,
                    image: movie.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }
                        : require('../assets/placeholder.png'),
                    bookmarked: false
                })));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (activeGenre) {
            const loadGenreMovies = async () => {
                try {
                    const movies = await fetchMoviesByGenre(activeGenre);
                    setGenreData(movies.map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        rating: movie.vote_average / 2,
                        image: movie.poster_path
                            ? { uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }
                            : require('../assets/placeholder.png'),
                        views: `${Math.max(1, Math.round(movie.popularity / 1000))}K`
                    })));
                } catch (err) {
                    console.error('Error fetching genre movies:', err);
                }
            };
            loadGenreMovies();
        }
    }, [activeGenre]);

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#2DD4BF" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 bg-black justify-center items-center p-4">
                <Text className="text-red-500 text-center">Error: {error}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            {/* Header Section */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                <TouchableOpacity>
                    <MenuIcon />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">StarTix</Text>
                <TouchableOpacity
                    className="relative"
                    onPress={() => setShowNotifications(!showNotifications)}
                >
                    <BellIcon />
                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Category Section - Now with TMDB Genres */}
                <View className="px-4 mt-4">
                    <Text className="text-white font-bold text-lg mb-3">Category</Text>
                    <CategoryPills
                        categories={genres}
                        activeCategory={activeGenre}
                        onCategoryPress={(genreId) => setActiveGenre(genreId)}
                    />
                </View>

                {/* Genre-Specific Movies */}
                {genreData.length > 0 && (
                    <View className="mt-4 px-4">
                        <Text className="text-white font-bold text-lg mb-3">
                            {genres.find(g => g.id === activeGenre)?.name || 'Selected Genre'}
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                            {genreData.map(item => (
                                <TrendingCard key={item.id} item={item} />
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Trending Section */}
                <View className="mt-6 px-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white font-bold text-lg">Popular</Text>
                        <TouchableOpacity>
                            <Text className="text-purple-400">Lihat Semua</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                        {trendingData.map(item => (
                            <TrendingCard key={item.id} item={item} />
                        ))}
                    </ScrollView>
                </View>

                {/* Recommendation Section */}
                <View className="mt-6 px-4 pb-20">
                    <Text className="text-white font-bold text-lg mb-3">Reccomendation</Text>
                    {recommendationsData.map(item => (
                        <RecommendationCard key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
            <NotificationPanel
                visible={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </View>
    );
}