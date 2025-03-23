import React, { useCallback, useMemo, useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoSmall from '@/app/components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PlaylistLibrary from '@/app/components/PlaylistLibrary';
import SongComponent from '@/app/components/SongComponent';

import { getPlaylists } from '@/app/lib/supabaseUtils';
import { UserContext } from '@/app/contexts/UserContext';

const LibraryScreen = () => {
	const [playlistsData, setPlaylistsData] = useState<any[]>([]);
    const [selected, setSelected] = useState('playlists');
	const router = useRouter();
	const { id: userID, songs } = useContext(UserContext);

	useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const data = await getPlaylists(userID); // Await the promise
                setPlaylistsData(data); // Set state with the resolved data
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, [userID]);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 80 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall />
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
					{/* <Text style={styles.subtitle}>{selected == "playlists" ? 'Playlists' : 'Songs'}</Text> */}
					<Text style={styles.title}>Library</Text>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
						<TouchableOpacity
							style={[styles.selectionButton, { backgroundColor: selected == 'playlists' ? '#732DFC' : '#323232' }]}
							onPress={() => setSelected('playlists')}
						>
							<Text style={{ color: selected == 'playlists' ? 'white' : 'lightgray' }}>Playlists</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.selectionButton, { backgroundColor: selected == 'songs' ? '#732DFC' : '#323232' }]}
							onPress={() => setSelected('songs')}
						>
							<Text style={{ color: selected == 'songs' ? 'white' : 'lightgray' }}>Songs</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.column}>
					{selected === 'playlists' && (
						<>
							<TouchableOpacity
								style={styles.createContainer}
								onPress={() => {
									router.push('/tabs/library/PlaylistCreateScreen' as const);
								}}
							>
								<View style={styles.createIcon}>
									<Icon name="add" size={32} color="white"></Icon>
								</View>
								<Text style={styles.playlistTitle}>Create playlist</Text>
							</TouchableOpacity>
							{playlistsData.map((playlist, index) => (
								<PlaylistLibrary key={index} id={playlist.id} name={playlist.name} image={playlist.cover_art}/>
							))}
						</>
					)}
					{selected == 'songs' && songs.map((song) => <SongComponent key={song.id} song={song}></SongComponent>)}
				</View>
			</KeyboardAwareScrollView>
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
		fontSize: 17,
		fontWeight: 'medium',
	},
	selectionButton: {
		backgroundColor: '#732DFC',
		padding: 6,
		paddingHorizontal: 8,
		borderRadius: 10,
	},
});

export default LibraryScreen;
