import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TMDBMovie } from '../services/tmdb';
import { images } from '@/constants/images';

interface MovieCardProps {
    movie: TMDBMovie;
    className?: string;
}

export default function MovieCard({ movie, className = '' }: MovieCardProps) {
    return (
        <TouchableOpacity
            className={`${className} mb-4`}
            activeOpacity={0.7}
        // onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })}
        >
            <View className="rounded-lg overflow-hidden">
                <Image
                    source={
                        movie.poster_path
                            ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                            : images.anime1
                    }
                    className="w-full h-48 rounded-lg"
                    resizeMode="cover"
                />
                <View className="mt-2">
                    <Text
                        className="text-white font-semibold"
                        numberOfLines={1}
                    >
                        {movie.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-yellow-400 mr-2">
                            ★ {(movie.vote_average / 2).toFixed(1)} {/* Convert 10-point scale to 5-star */}
                        </Text>
                        <Text className="text-gray-400 text-xs">
                            {movie.release_date?.split('-')[0] || 'N/A'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}