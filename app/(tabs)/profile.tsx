import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { images } from '@/constants/images'
import { useState } from 'react';

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState<'account' | 'balance'>('account');
    const [editingField, setEditingField] = useState<string | null>(null);

    const userData = {
        name: 'Monkey D. Luffy',
        phone: '0812-3456-7890',
        password: '••••••••',
        avatar: images.anime1
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View className="flex-1 bg-black ">
                {/* Header Section */}
                <View className="bg-black pt-12 pb-4 px-4">
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity>
                            <Ionicons name="menu" size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white text-xl font-bold">Menu Profile</Text>
                        <TouchableOpacity className="relative">
                            <Ionicons name="notifications" size={24} color="white" />
                            <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab Navigation */}
                <View className="flex-row mx-4 mt-4 bg-gray-200 rounded-lg overflow-hidden">
                    <TouchableOpacity
                        className={`flex-1 py-3 items-center ${activeTab === 'account' ? 'bg-purple-600' : 'bg-gray-300'}`}
                        onPress={() => setActiveTab('account')}
                    >
                        <Text className={`font-medium ${activeTab === 'account' ? 'text-white' : 'text-gray-700'}`}>
                            Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-3 items-center ${activeTab === 'balance' ? 'bg-purple-600' : 'bg-gray-300'}`}
                        onPress={() => setActiveTab('balance')}
                    >
                        <Text className={`font-medium ${activeTab === 'balance' ? 'text-white' : 'text-gray-700'}`}>
                            Balance
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Content */}
                <ScrollView className="flex-1 px-4 mt-4">
                    {/* Profile Picture */}
                    <View className="items-center my-6">
                        <Image
                            source={userData.avatar}
                            className="w-24 h-24 rounded-full border-4 border-purple-500"
                        />
                        <TouchableOpacity className="mt-2">
                            <Text className="text-purple-600 font-medium">Change Profille</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Account Information */}
                    {activeTab === 'account' && (
                        <View className="bg-black text-white rounded-lg p-4 mb-4">
                            <ProfileField
                                label="Username"
                                value={userData.name}
                                editing={editingField === 'name'}
                                onEdit={() => setEditingField('name')}
                            />
                            <ProfileField
                                label="Phone Number"
                                value={userData.phone}
                                editing={editingField === 'phone'}
                                onEdit={() => setEditingField('phone')}
                            />
                            <ProfileField
                                label="Password"
                                value={userData.password}
                                editing={editingField === 'password'}
                                onEdit={() => setEditingField('password')}
                            />
                        </View>
                    )}

                    {/* Balance Information */}
                    {activeTab === 'balance' && (
                        <View className="bg-black rounded-lg p-4 mb-4">
                            <Text className="text-lg font-bold mb-2">Saldo Anda</Text>
                            <Text className="text-3xl font-bold text-purple-600 mb-4">Rp 1.250.000</Text>
                            <TouchableOpacity className="bg-purple-600 py-3 rounded-lg items-center">
                                <Text className="text-white font-medium">Top Up Balance</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Logout Button */}
                    <TouchableOpacity className="flex-row items-center justify-center py-4 mb-8">
                        <Ionicons name="log-out" size={20} color="#ef4444" />
                        <Text className="text-red-500 font-medium ml-2">Log out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}

// Reusable Components
const ProfileField = ({ label, value, editing, onEdit }: {
    label: string,
    value: string,
    editing: boolean,
    onEdit: () => void
}) => (
    <View className="py-3 border-b border-gray-100">
        <Text className="text-white text-sm">{label}</Text>
        <View className="flex-row justify-between items-center">
            {editing ? (
                <TextInput
                    value={value}
                    className="flex-1 text-white py-1"
                    autoFocus
                />
            ) : (
                <Text className="text-white py-1">{value}</Text>
            )}
            <TouchableOpacity onPress={onEdit}>
                <Ionicons name={editing ? "checkmark" : "create-outline"} size={20} color="#9333ea" />
            </TouchableOpacity>
        </View>
    </View>
);

const TabIcon = ({ name, active }: { name: string, active: boolean }) => (
    <TouchableOpacity>
        <Ionicons
            name={`${name}${active ? '' : '-outline'}` as any}
            size={24}
            color={active ? "#9333ea" : "#6b7280"}
        />
    </TouchableOpacity>
);