import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function TrendingCard({ item }: { item: any }) {
    return (
        <TouchableOpacity className="mr-4 w-40">
            <Image
                source={typeof item.image === 'number'
                    ? item.image
                    : { uri: item.image }}
                className="w-full h-56 rounded-xl"
            />
            <Text className="text-white mt-2 font-medium" numberOfLines={1}>{item.title}</Text>
            <View className="flex-row items-center mt-1">
                {/* <StarIcon filled /> */}
                <Text className="text-yellow-400 ml-1">{item.rating}</Text>
            </View>
        </TouchableOpacity>
    );
}