import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { BellIcon, MenuIcon } from '../components/Icons';
import CategoryPills from '../components/CategoryPills';
import TrendingCard from '../components/TrendingCard';
import RecommendationCard from '../components/RecommendationCard';
import { fetchTrendingMovies, fetchPopularMovies } from '../services/tmdb';

interface MovieCard {
    id: number;
    title: string;
    rating: number;
    image: { uri: string } | number; // Can be URI or local require
    views?: string;
    bookmarked?: boolean;
}

export default function Home() {
    const [trendingData, setTrendingData] = useState<MovieCard[]>([]);
    const [recommendationsData, setRecommendationsData] = useState<MovieCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [trending, popular] = await Promise.all([
                    fetchTrendingMovies(),
                    fetchPopularMovies()
                ]);

                setTrendingData(trending.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    rating: movie.vote_average / 2, // Convert 10-point scale to 5-point
                    image: movie.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                        : require('../assets/placeholder.png')
                })));

                setRecommendationsData(popular.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    rating: movie.vote_average / 2,
                    views: `${Math.round(movie.popularity / 1000)}K`,
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
                <Text className="text-white text-xl font-bold">AniFlix</Text>
                <TouchableOpacity className="relative">
                    <BellIcon />
                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Category Section */}
                <View className="px-4 mt-4">
                    <Text className="text-white font-bold text-lg mb-3">Kategori</Text>
                    <CategoryPills
                        categories={['Anime', 'K-Drama', 'Horror', 'Comedy']}
                        activeCategory="Anime"
                    />
                </View>

                {/* Trending Section */}
                <View className="mt-6 px-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-white font-bold text-lg">Trending</Text>
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
                    <Text className="text-white font-bold text-lg mb-3">Rekomendasi</Text>
                    {recommendationsData.map(item => (
                        <RecommendationCard key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}