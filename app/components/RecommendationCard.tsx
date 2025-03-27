// app/components/RecommendationCard.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StarIcon, TvIcon, BookmarkIcon } from './Icons';

export default function RecommendationCard({ item }: { item: any }) {
    return (
        <TouchableOpacity className="flex-row mb-4 bg-gray-900 rounded-lg overflow-hidden">
            {/* Thumbnail Image (Landscape-oriented) */}
            <Image
                source={typeof item.image === 'number'
                    ? item.image
                    : { uri: item.image }}
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
                    <TouchableOpacity>
                        <BookmarkIcon filled={item.bookmarked} />
                    </TouchableOpacity>
                </View>

                {/* Star Rating */}
                <View className="flex-row items-center mt-1">
                    <StarIcon filled size={14} />
                    <Text className="text-yellow-400 text-xs ml-1">{item.rating}</Text>
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