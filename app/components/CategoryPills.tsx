import { TouchableOpacity, Text, View, ScrollView } from 'react-native';

export default function CategoryPills({
    categories,
    activeCategory,
    onCategoryPress
}: {
    categories: { id: number, name: string }[];
    activeCategory: number | null;
    onCategoryPress: (genreId: number) => void;
}) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    onPress={() => onCategoryPress(category.id)}
                    className={`px-4 py-2 mr-2 rounded-full ${activeCategory === category.id ? 'bg-purple-600' : 'bg-gray-800'
                        }`}
                >
                    <Text className={`${activeCategory === category.id ? 'text-white' : 'text-gray-400'
                        }`}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}