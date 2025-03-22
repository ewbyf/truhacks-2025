import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import RecentSong from '../../components/RecentSong';
  
const PlaylistScreen = () => {
    const [selected, setSelected] = useState('playlists');
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ paddingHorizontal: 20 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={styles.title}>LOGO</Text>
				</View>
				<TouchableOpacity onPress={() => router.back()}>
					<Icon name="arrow-back" size={30} color="white" />
				</TouchableOpacity>
				<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Image  source={{ uri: 'https://picsum.photos/213' }} style={{ height: 256, width: 256 }} />
				</View>
				<Text style={styles.playlistTitle}>Playlist #1</Text>
				<Text style={styles.playlistTitle}>1 hours 45 min</Text>
				<View style={styles.recentSongs}>
					<RecentSong/>
					<RecentSong/>
					<RecentSong/>
					<RecentSong/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
    column: {
        display: 'flex',
        gap: 10
    },
	title: {
		fontSize: 44,
		fontWeight: 'bold',
		color: 'white',
	},
	subtitle: {
		fontSize: 28,
		fontWeight: 'medium',
		color: 'white',
	},
	createContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	createIcon: {
		width: 75,
		height: 75,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'gray',
	},
	playlistTitle: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'medium',
	},
    selectionButton: {
        backgroundColor: '#732DFC',
        padding: 6,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
	recentSongs: {
		paddingVertical: 10,
		paddingHorizontal: 0,
		display: 'flex',
		gap: 10,
	},
});

export default PlaylistScreen;
