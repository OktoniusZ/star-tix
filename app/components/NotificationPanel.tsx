import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BellIcon } from './Icons';

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

interface NotificationPanelProps {
    visible: boolean;
    onClose: () => void;
}

const NotificationPanel = ({ visible, onClose }: NotificationPanelProps) => {
    // Mock notification data
    const notifications: Notification[] = [
        {
            id: 1,
            title: 'New Movie Alert',
            message: 'Avengers: Endgame is now trending in your area',
            time: '2 mins ago',
            read: false,
        },
        {
            id: 2,
            title: 'Special Offer',
            message: 'Get 20% off on all tickets booked today',
            time: '1 hour ago',
            read: true,
        },
        {
            id: 3,
            title: 'Booking Confirmed',
            message: 'Your ticket for Spider-Man: No Way Home has been confirmed',
            time: '3 hours ago',
            read: true,
        },
    ];

    if (!visible) return null;

    return (
        <View className="absolute top-16 right-4 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-800 z-50">
            {/* Notification Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                <Text className="text-white font-bold text-lg">Notifications</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text className="text-purple-400">Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Notification List */}
            <ScrollView className="max-h-96">
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        className={`p-4 border-b border-gray-800 ${!notification.read ? 'bg-gray-800' : ''}`}
                    >
                        <View className="flex-row items-start">
                            <View className="mr-3 mt-1">
                                <BellIcon size={18} color={!notification.read ? '#a78bfa' : '#6b7280'} />
                            </View>
                            <View className="flex-1">
                                <Text className={`font-bold ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                                    {notification.title}
                                </Text>
                                <Text className={`mt-1 ${!notification.read ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {notification.message}
                                </Text>
                                <Text className="text-gray-500 text-xs mt-2">{notification.time}</Text>
                            </View>
                            {!notification.read && (
                                <View className="w-2 h-2 bg-purple-400 rounded-full ml-2 mt-1" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Footer */}
            <TouchableOpacity className="p-4 items-center border-t border-gray-800">
                <Text className="text-purple-400 font-medium">View All Notifications</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NotificationPanel;