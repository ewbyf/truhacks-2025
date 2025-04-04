import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoSmall from '@/app/components/svgs/LogoSmall';
import PlaylistLibrary from '@/app/components/PlaylistLibrary';
import SongComponent from '@/app/components/SongComponent';

import { getPlaylists } from '@/app/lib/supabaseUtils';
import { UserContext } from '@/app/contexts/UserContext';

const LibraryScreen = () => {
	const [playlistsData, setPlaylistsData] = useState<any[]>([]);
	const [selected, setSelected] = useState('playlists');
	const [refreshing, setRefreshing] = useState(false);
	const router = useRouter();
	const { id: userID, songs, playlists } = useContext(UserContext);

	useEffect(() => {
		setPlaylistsData(playlists)
	}, [playlists])

	//updating playlist with most recent data
	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			const freshData = await getPlaylists(userID);
			setPlaylistsData(freshData);
		} catch (error) {
			console.error('Refresh error:', error);
		}
		setRefreshing(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				{/* Header */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall />
				</View>

				{/* Title + Toggle */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
					<Text style={styles.title}>Library</Text>
					<View style={{ flexDirection: 'row', gap: 10 }}>
						<TouchableOpacity
							style={[styles.selectionButton, { backgroundColor: selected === 'playlists' ? '#732DFC' : '#323232' }]}
							onPress={() => setSelected('playlists')}
						>
							<Text style={{ color: selected === 'playlists' ? 'white' : 'lightgray' }}>Playlists</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.selectionButton, { backgroundColor: selected === 'songs' ? '#732DFC' : '#323232' }]}
							onPress={() => setSelected('songs')}
						>
							<Text style={{ color: selected === 'songs' ? 'white' : 'lightgray' }}>Songs</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Scrollable Playlist/Song Section */}
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingBottom: 80 }}
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="white" colors={['#732DFC']} />}
				>
					<View style={styles.column}>
						{selected === 'playlists' && (
							<>
								<TouchableOpacity style={styles.createContainer} onPress={() => router.push('/tabs/library/PlaylistCreateScreen' as const)}>
									<View style={styles.createIcon}>
										<Icon name="add" size={32} color="white" />
									</View>
									<Text style={styles.playlistTitle}>Create playlist</Text>
								</TouchableOpacity>

								{playlistsData.map((playlist, index) => (
									<PlaylistLibrary key={index} id={playlist.id} name={playlist.name} image={playlist.cover_art} num_songs={playlist.num_songs} />
								))}
							</>
						)}

						{selected === 'songs' && songs.map((song) => <SongComponent key={song.id} song={song} />)}
					</View>
				</ScrollView>
			</View>
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
		gap: 10,
	},
	title: {
		fontSize: 36,
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
		backgroundColor: '#252525',
	},
	playlistTitle: {
        color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	selectionButton: {
		backgroundColor: '#732DFC',
		padding: 6,
		paddingHorizontal: 8,
		borderRadius: 10,
	},
});

export default LibraryScreen;
