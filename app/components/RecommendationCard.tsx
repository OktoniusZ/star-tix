// app/components/RecommendationCard.tsx
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StarIcon, TvIcon, BookmarkIcon } from './Icons';

interface RecommendationItem {
    id: number;
    title: string;
    rating: number;
    views: string;
    image: ImageSourcePropType; // Handles both require() and {uri: string}
    bookmarked: boolean;
}

interface RecommendationCardProps {
    item: RecommendationItem;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
    return (
        <TouchableOpacity className="flex-row mb-4 bg-gray-900 rounded-lg overflow-hidden">
            {/* Thumbnail Image */}
            <Image
                source={item.image}
                className="w-32 h-20"
                resizeMode="cover"
                // defaultSource={require('@/assets/placeholder.png')} // Fallback image
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
                    <Text className="text-yellow-400 text-xs ml-1">
                        {item.rating.toFixed(1)} {/* Ensure 1 decimal place */}
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