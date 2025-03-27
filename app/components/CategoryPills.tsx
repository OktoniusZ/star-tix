import { View, TouchableOpacity, Text } from 'react-native';

export default function CategoryPills({ categories, activeCategory }: { categories: string[], activeCategory: string }) {
    return (
        <View className="flex-row flex-wrap gap-2">
            {categories.map(category => (
                <TouchableOpacity
                    key={category}
                    className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-purple-600' : 'bg-gray-800'}`}
                >
                    <Text className={`${activeCategory === category ? 'text-white' : 'text-gray-400'}`}>
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}