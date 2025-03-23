import {  Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import BottomPlayer from '../components/BottomPlayer';
import HomeIcon from '../components/svgs/HomeIcon';
import HomeIconHover from '../components/svgs/HomeIconHover';
import LibraryIcon from '../components/svgs/LibraryIcon';
import LibraryIconHover from '../components/svgs/LibraryIconHover';
import AddSongsIcon from '../components/svgs/AddSongsIcon';
import AddSongsHoverIcon from '../components/svgs/AddSongsHoverIcon';

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
						tabBarIcon: ({ focused }) =>
						focused ? <HomeIconHover /> : <HomeIcon />,
						title: 'Home',
					}}
					/>

					<Tabs.Screen
						name="MusicScreen"
						options={{
						tabBarIcon: ({ focused }) =>
						focused ? <AddSongsHoverIcon /> : <AddSongsIcon />,
						title: 'Create Songs',
					}}
					/>

					<Tabs.Screen
						name="library"
						options={{
						tabBarIcon: ({ focused }) =>
						focused ? <LibraryIconHover /> : <LibraryIcon />,
						title: 'Library',
					}}
					/>

					<Tabs.Screen
						name="PlaylistScreen"
						options={{
							href: null,
							title: '',
						}}
					/>
					<Tabs.Screen
						name="PlaylistCreateScreen"
						options={{
							href:null,
							title: '',
						}}
					/>
					<Tabs.Screen
						name="Playlist"
						options={{
							href:null,
							title: '',
						}}
					/>
					<Tabs.Screen
						name="LibraryScreen"
						options={{
							href:null,
							title: '',
						}}
					/>
				</Tabs>
				<BottomPlayer />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

const styles = {};

export default Navbar;
