import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'

const TabIcon = ({ focused, title, icon }: any) => {
    return (
        <View className="items-center justify-center flex-1 h-full">
            <View className={`items-center justify-center p-3 ${focused ? '' : ''}`}>
                <Image
                    source={icon}
                    tintColor={focused ? '#6C5CE7' : '#A8B5DB'}
                    className="w-6 h-6 mt-8"
                    resizeMode="contain"
                />
            </View>
            <Text
                className={`text-xs mt-1 ${focused ? 'text-primary font-semibold' : 'text-gray-400'}`} numberOfLines={1} ellipsizeMode="tail"
            >
                {title}
            </Text>
        </View>
    )
}

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                flex: 1,
                height: '100%',
            },
            tabBarStyle: {
                backgroundColor: '#0F0D23',
                height: 72,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search" />
                    ),
                }}
            />

            <Tabs.Screen
                name="save"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.save} title="Saved" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout