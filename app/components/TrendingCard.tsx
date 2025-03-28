// Example TrendingCard.tsx
import { router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface TrendingCardProps {
    item: {
        id: number;
        title: string;
        rating: number;
        image: { uri: string } | number;
    };
}

export default function TrendingCard({ item }: TrendingCardProps) {
    return (
        <TouchableOpacity className="mr-4 w-40" onPress={() => router.push(`/movie/${item.id}`)}>
            <Image
                source={item.image}
                className="w-full h-56 rounded-xl"
                resizeMode="cover"
            />
            <Text className="text-white mt-2 font-medium" numberOfLines={1}>
                {item.title}
            </Text>
            <View className="flex-row items-center mt-1">
                <Text className="text-yellow-400">⭐</Text>
                <Text className="text-yellow-400 ml-1">{item.rating.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );
}