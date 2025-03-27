import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { BellIcon, MenuIcon, TvIcon, BookmarkIcon } from '../components/Icons';
import CategoryPills from '../components/CategoryPills';
import TrendingCard from '../components/TrendingCard';
import RecommendationCard from '../components/RecommendationCard';
import { images } from '@/constants/images'

const trendingData = [
    { id: 1, title: 'Demon Slayer', rating: 4.8, image: images.anime1 },
    { id: 2, title: 'Attack on Titan', rating: 4.9, image: images.anime2 },
    { id: 3, title: 'Attack on Titan', rating: 4.9, image: images.anime3 },
    { id: 4, title: 'Attack on Titan', rating: 4.9, image: images.anime4 },
];

const recommendationsData = [
    { id: 1, title: 'Jujutsu Kaisen', rating: 4.7, views: '1.2M', image: images.anime1, bookmarked: false },
    { id: 2, title: 'Jujutsu Kaisen', rating: 4.7, views: '1.2M', image: images.anime2, bookmarked: false },
    { id: 3, title: 'Jujutsu Kaisen', rating: 4.7, views: '1.2M', image: images.anime3, bookmarked: false },
    { id: 4, title: 'Jujutsu Kaisen', rating: 4.7, views: '1.2M', image: images.anime4, bookmarked: false },
];

export default function Home() {
    return (
        <View className="flex-1 bg-black">
            {/* 1. Header Section */}
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
                {/* 2. Category Section */}
                <View className="px-4 mt-4">
                    <Text className="text-white font-bold text-lg mb-3">Kategori</Text>
                    <CategoryPills
                        categories={['Anime', 'K-Drama', 'Horror', 'Comedy']}
                        activeCategory="Anime"
                    />
                </View>

                {/* 3. Trending Section */}
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

                {/* 4. Recommendation Section */}
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