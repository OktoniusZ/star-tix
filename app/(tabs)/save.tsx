// app/(tabs)/save.tsx
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StarIcon, TvIcon } from '@/app/components/Icons';
import { BellIcon, MenuIcon, SearchIcon } from '@/app/components/Icons';
import { useEffect } from 'react';

export default function SaveScreen() {
    return (
        <View className="flex-1 bg-black">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                <TouchableOpacity>
                    <MenuIcon />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Menu Bookmark</Text>
                <TouchableOpacity className="relative">
                    <BellIcon />
                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="mx-4 mt-4 flex-row items-center bg-gray-800 rounded-lg px-3 py-2">
                <TextInput
                    placeholder="Cari judul atau genre film.."
                    placeholderTextColor="#94A3B8"
                    className="flex-1 text-white"
                />
                <SearchIcon size={20} color="#94A3B8" />
            </View>

            {/* Bookmarked Items List */}
            <ScrollView className="mt-4">
                {/* {bookmarks.map(movie => (
                    <View key={movie.id} className="mx-4 mb-4 p-3 bg-gray-900 rounded-lg flex-row">
                        <Image
                            source={movie.image}
                            className="w-16 h-24 rounded"
                            resizeMode="cover"
                        />

                        <View className="flex-1 ml-3">
                            <View className="flex-row justify-between">
                                <Text className="text-white font-bold flex-1" numberOfLines={1}>
                                    {movie.title}
                                </Text>
                                <TouchableOpacity onPress={() => removeBookmark(movie.id)}>
                                    <Text className="text-red-500 text-lg">❌</Text>
                                </TouchableOpacity>
                            </View>

                            <Text className="text-gray-400 text-xs mt-1" numberOfLines={2}>
                                {movie.views} views • Description would go here
                            </Text>

                            <View className="flex-row items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        filled={i < Math.floor(movie.rating)}
                                        size={14}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                ))}

                {bookmarks.length === 0 && (
                    <Text className="text-gray-400 text-center mt-8">
                        No bookmarked movies yet
                    </Text>
                )} */}
            </ScrollView>
        </View>
    );
}