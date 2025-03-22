import { router, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomPlayer from '../components/BottomPlayer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

const Navbar = ({ children }: { children: JSX.Element }) => {
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				{children}
				<Tabs
					screenOptions={{
						tabBarStyle: {
							backgroundColor: '#1E1E1E',
							borderTopColor: '#5F5F5F',
							borderTopWidth: 1,
							paddingTop: 5,
						},
						tabBarActiveTintColor: 'white',
						tabBarInactiveTintColor: '#5F5F5F',
						headerShown: false,
					}}
				>
					<Tabs.Screen
						name="HomeScreen"
						options={{
							tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
							title: 'Home',
						}}
					/>
					<Tabs.Screen
						name="MusicScreen"
						options={{
							tabBarIcon: ({ color, size }) => <Icon name="add" color={color} size={size} />,
							title: 'Add Music',
						}}
					/>
					<Tabs.Screen
						name="LibraryScreen"
						options={{
							tabBarIcon: ({ color, size }) => <Icon name="book" color={color} size={size} />,
							title: 'Library',
						}}
					/>
				</Tabs>
				<BottomPlayer />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
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
