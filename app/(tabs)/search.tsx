import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BellIcon, MenuIcon, SearchIcon } from '../components/Icons';
import { fetchGenres, fetchGenreImages } from '../services/tmdb'; // Add fetchGenreImages to your tmdb service
import { images } from '@/constants/images';

interface Genre {
    id: number;
    name: string;
    imageUrl?: string; // Add optional imageUrl property
}

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genreList = await fetchGenres();

                // Fetch images for each genre
                const genresWithImages = await Promise.all(
                    genreList.map(async (genre) => {
                        const imageUrl = await fetchGenreImages(genre.id);
                        return { ...genre, imageUrl };
                    })
                );

                setGenres(genresWithImages);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load genres');
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);


    const handleSearch = () => {
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

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
                <Text className="text-white text-xl font-bold">Search Movies</Text>
                <TouchableOpacity className="relative">
                    <BellIcon />
                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Search Bar Section */}
                <View className="px-4 mt-4">
                    <View className="relative">
                        <TextInput
                            className="bg-gray-800 rounded-lg py-3 px-4 text-white pr-10"
                            placeholder="Cari film atau genre..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                        />
                        <TouchableOpacity
                            className="absolute right-3 top-3"
                            onPress={handleSearch}
                        >
                            <SearchIcon />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Genre Selection Grid */}
                <View className="px-4 mt-6">
                    <Text className="text-white font-bold text-lg mb-4">Genre</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {genres.map((genre) => (
                            <TouchableOpacity
                                key={genre.id}
                                className="w-[48%] mb-4"
                                activeOpacity={0.7}
                                // onPress={() => handleGenrePress(genre.id, genre.name)}
                            >
                                <View className="rounded-lg overflow-hidden">
                                    <Image
                                        source={
                                            genre.imageUrl
                                                ? { uri: genre.imageUrl }
                                                : images.anime1
                                        }
                                        className="w-full h-32"
                                        resizeMode="cover"
                                    />
                                    <View className="bg-gray-800 p-3">
                                        <Text className="text-white font-bold">{genre.name}</Text>
                                        <Text className="text-gray-400 text-xs mt-1">
                                            {/* Placeholder count - you could fetch actual counts if needed */}
                                            20+ Film..
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* See All Genres Link */}
                <TouchableOpacity className="mt-2 mb-8 items-center">
                    <Text className="text-purple-400">Lihat Semua Genre</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}