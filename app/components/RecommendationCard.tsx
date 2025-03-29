import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StarIcon, TvIcon, BookmarkIcon } from './Icons';
import { router } from 'expo-router';

interface RecommendationItem {
    id: number;
    title: string;
    rating: number;
    views: string;
    image: ImageSourcePropType;
    bookmarked: boolean;
}

interface RecommendationCardProps {
    item: RecommendationItem;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
    // const handleBookmarkPress = () => {
    //     if (isBookmarked) {
    //         removeBookmark(item.id);
    //     } else {
    //         addBookmark({
    //             id: item.id,
    //             title: item.title,
    //             image: item.image,
    //             rating: item.rating,
    //             views: item.views,
    //         });
    //     }
    // };
    return (
        <TouchableOpacity
            className="flex-row mb-4 bg-gray-900 rounded-lg overflow-hidden"
            onPress={() => router.push(`/movie/${item.id}`)}
        >
            {/* Thumbnail Image */}
            <Image
                source={item.image}
                className="w-32 h-20"
                resizeMode="cover"
            />

            {/* Content */}
            <View className="flex-1 p-3">
                {/* Title and Bookmark */}
                <View className="flex-row justify-between items-start">
                    <Text className="text-white font-medium flex-1" numberOfLines={1}>
                        {item.title}
                    </Text>
                    <TouchableOpacity
                        // onPress={(e) => {
                        //     e.stopPropagation(); // Prevent navigation when clicking bookmark
                        //     handleBookmarkPress();
                        // }}
                    >
                        {/* <BookmarkIcon filled={isBookmarked} /> */}
                    </TouchableOpacity>
                </View>

                {/* Star Rating */}
                <View className="flex-row items-center mt-1">
                    <StarIcon filled size={14} />
                    <Text className="text-yellow-400 text-xs ml-1">
                        {item.rating.toFixed(1)}
                    </Text>
                </View>

                {/* Watch Count */}
                <View className="flex-row items-center mt-1">
                    <TvIcon size={14} color="#94A3B8" />
                    <Text className="text-gray-400 text-xs ml-1">{item.views} ditonton</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}