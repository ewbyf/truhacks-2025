import { router, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="HomeScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <Icon name="home" size={24} /> : <Icon name="home" size={24} />),
					title: 'Home',
				}}
			/>
			<Tabs.Screen
				name="LibraryScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <Icon name="home" size={24} /> : <Icon name="home" size={24} />),
					title: 'Library',
				}}
			/>
			<Tabs.Screen
				name="MusicScreen"
				options={{
					tabBarIcon: ({ focused }) => (focused ? <Icon name="home" size={24} /> : <Icon name="home" size={24} />),
					title: 'Add Music',
				}}
			/>
		</Tabs>
	);
};

const styles = {
	shadow: {
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
};

export default Navbar;
