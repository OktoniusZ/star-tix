import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { images } from '@/constants/images';

const dummyBookmarks = [
    {
        id: 1,
        title: 'Attack on Titan',
        description: 'Humans fight giant humanoid creatures called Titans',
        rating: 4.8,
        thumbnail: images.anime1,
    },
    {
        id: 2,
        title: 'Jujutsu Kaisen',
        description: 'A boy swallows a cursed talisman and becomes a sorcerer',
        rating: 4.7,
        thumbnail: images.anime2,
    },
    {
        id: 3,
        title: 'Demon Slayer',
        description: 'A boy becomes a demon slayer to save his sister',
        rating: 4.9,
        thumbnail: images.anime3,
    },
    {
        id: 4,
        title: 'Demon Slayer',
        description: 'A boy becomes a demon slayer to save his sister',
        rating: 4.9,
        thumbnail: images.anime4,
    },
];

export default function SaveScreen() {
    const [bookmarks, setBookmarks] = useState(dummyBookmarks);
    const [searchQuery, setSearchQuery] = useState('');

    const removeBookmark = (id: number) => {
        setBookmarks(prev => prev.filter(item => item.id !== id));
    };

    return (
        <View className="flex-1 bg-black">
            {/* Header Section */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                <TouchableOpacity>
                    <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Bookmark</Text>
                <TouchableOpacity className="relative">
                    <Ionicons name="notifications" size={24} color="white" />
                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="mx-4 mt-4 flex-row items-center bg-gray-800 rounded-lg px-3 py-2">
                <TextInput
                    placeholder="Search movies or genres..."
                    placeholderTextColor="#94A3B8"
                    className="flex-1 text-white"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Ionicons name="search" size={20} color="#94A3B8" />
            </View>

            {/* Bookmarked Items List */}
            <ScrollView className="mt-4">
                {bookmarks.map(movie => (
                    <View key={movie.id} className="mx-4 mb-4 p-3 bg-gray-900 rounded-lg flex-row">
                        <Image
                            source={movie.thumbnail}
                            className="w-16 h-24 rounded"
                            resizeMode="cover"
                        />

                        <View className="flex-1 ml-3">
                            <View className="flex-row justify-between">
                                <Text className="text-white font-bold flex-1" numberOfLines={1}>
                                    {movie.title}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => removeBookmark(movie.id)}
                                    className="ml-2"
                                >
                                    <Ionicons name="close" size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-gray-400 text-xs mt-1" numberOfLines={2}>
                                {movie.description}
                            </Text>

                            <View className="flex-row items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons
                                        key={i}
                                        name={i < Math.floor(movie.rating) ? 'star' : 'star-outline'}
                                        size={14}
                                        color="#FBBF24"
                                    />
                                ))}
                                <Text className="text-yellow-400 text-xs ml-1">
                                    {movie.rating.toFixed(1)}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}

                {bookmarks.length === 0 && (
                    <Text className="text-gray-400 text-center mt-8">
                        No bookmarked movies yet
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}