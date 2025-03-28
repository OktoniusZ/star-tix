import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchMovieDetails, TMDBMovieDetails } from '../services/tmdb';
import { Stack } from 'expo-router';

type TabType = 'synopsis' | 'cast' | 'details';

export default function MovieDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('synopsis');

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await fetchMovieDetails(Number(id));
                setMovie(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#2DD4BF" />
            </View>
        );
    }

    if (error || !movie) {
        return (
            <View className="flex-1 bg-black justify-center items-center p-4">
                <Text className="text-red-500 text-center">Error loading movie details</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-purple-600 px-4 py-2 rounded"
                >
                    <Text className="text-white">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

    return (
        <>
            <Stack.Screen options={{ headerShown: false, statusBarBackgroundColor: 'black' }} />
            <ScrollView className="flex-1 bg-black">
                {/* Background & Header */}
                <View className="relative h-96">
                    {movie.backdrop_path ? (
                        <>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }}
                                className="absolute w-full h-full"
                                blurRadius={5}
                            />
                            <View className="absolute inset-0 bg-black/60" />
                        </>
                    ) : (
                        <View className="absolute inset-0 bg-gray-900" />
                    )}

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-12 left-4 z-10 p-2"
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity className="absolute inset-0 items-center justify-center">
                        <View className="bg-white/30 rounded-full p-4">
                            <Ionicons name="play" size={48} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Movie Title & Rating */}
                <View className="px-4 mt-4">
                    <Text className="text-white text-2xl font-bold">
                        {movie.title}
                    </Text>
                    {releaseYear && (
                        <Text className="text-gray-400">({releaseYear})</Text>
                    )}

                    <View className="flex-row items-center mt-2 space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <Ionicons
                                key={i}
                                name={i < Math.floor(movie.vote_average / 2) ? 'star' : 'star-outline'}
                                size={20}
                                color="#FBBF24"
                            />
                        ))}
                        <Text className="text-yellow-400">
                            {(movie.vote_average / 2).toFixed(1)}
                        </Text>

                        {movie.runtime > 0 && (
                            <Text className="text-gray-400 ml-2">
                                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                            </Text>
                        )}
                    </View>
                </View>

                {/* Navigation Tabs */}
                <View className="flex-row border-b border-gray-800 mt-6 mx-4">
                    {[
                        { id: 'synopsis', label: 'Synopsis' },
                        { id: 'cast', label: 'Pemeran' },
                        { id: 'details', label: 'Detail' }
                    ].map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id as TabType)}
                            className={`pb-3 px-4 ${activeTab === tab.id ? 'border-b-2 border-purple-500' : ''}`}
                        >
                            <Text className={`${activeTab === tab.id ? 'text-purple-500' : 'text-gray-400'}`}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Content Sections */}
                <View className="p-4">
                    {activeTab === 'synopsis' && (
                        <Text className="text-white">
                            {movie.overview || 'No synopsis available.'}
                        </Text>
                    )}

                    {activeTab === 'cast' && (
                        <View>
                            {movie.credits?.cast.slice(0, 10).map((person) => (
                                <View key={person.id} className="py-3 border-b border-gray-800">
                                    <Text className="text-white font-medium">{person.name}</Text>
                                    <Text className="text-gray-400">{person.character}</Text>
                                </View>
                            ))}
                            {movie.credits?.cast.length === 0 && (
                                <Text className="text-gray-400">No cast information available</Text>
                            )}
                        </View>
                    )}

                    {activeTab === 'details' && (
                        <View>
                            <View className="py-3 border-b border-gray-800">
                                <Text className="text-gray-400">Release Date</Text>
                                <Text className="text-white">{movie.release_date || 'Unknown'}</Text>
                            </View>

                            <View className="py-3 border-b border-gray-800">
                                <Text className="text-gray-400">Genres</Text>
                                <Text className="text-white">
                                    {movie.genres?.map(g => g.name).join(', ') || 'Unknown'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Call-to-Action Button */}
                <TouchableOpacity
                    className="bg-purple-600 mx-4 mb-8 py-4 rounded-lg items-center"
                    onPress={() => console.log('Order Ticket')}
                >
                    <Text className="text-white font-bold text-lg">Pesan Tiket</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}