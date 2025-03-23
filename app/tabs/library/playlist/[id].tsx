import React, { useCallback, useMemo, useRef, useState, useEffect, useContext } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import SongComponent from '@/app/components/SongComponent';

import { getPlaylistSongs } from '@/app/lib/supabaseUtils';
import { supabase } from '@/app/lib/supabase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@/app/components/Header';
import { PlaylistType } from '@/app/interfaces/PlaylistType';
import { Song } from '@/app/interfaces/Song';
import { UserContext } from '@/app/contexts/UserContext';

export const options = {
	href: null,
	title: '',
};

const PlaylistScreen = () => {
	const { id } = useLocalSearchParams();

	const [playlist, setPlaylist] = useState<PlaylistType>();
	const [songs, setSongs] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const router = useRouter();

	const { setCurrentSong, pause, setPause, queue, setQueue, position, setPosition, currentPlaylist, setCurrentPlaylist } = useContext(UserContext);

	useEffect(() => {
		const fetchPlaylist = async () => {
			try {
				const { data: playlistData, error: playlistError } = await supabase.from('playlists').select('*').eq('id', id).single();
				setPlaylist(playlistData);
			} catch (error) {
				console.error('Error fetching playlists:', error);
			}
		};

		const fetchSongs = async () => {
			try {
				const songsData = await getPlaylistSongs(id);
				setSongs(songsData);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching playlists:', error);
			}
		};

		fetchPlaylist();
		fetchSongs();
	}, []);

	useEffect(() => {
		if (pause) {
			setIsPlaying(false);
		} else if (!pause && queue == songs) {
			setIsPlaying(true);
		}
	}, [pause]);

	const playSound = async () => {
		let tempPosition = position;
		if (queue != songs) {
			setPosition(0);
			tempPosition = 0;
		}
		setQueue(songs);
        setCurrentPlaylist(playlist!.name)
		setCurrentSong(songs[tempPosition]);
		setPause(false);
		setIsPlaying(true);
	};

	const pauseSound = async () => {
		setIsPlaying(false);
		setPause(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			{!loading && playlist && <Header title=""></Header>}
			<KeyboardAwareScrollView style={{ paddingHorizontal: 20, paddingTop: 60 }} contentContainerStyle={{ paddingBottom: 80, gap: 20 }}>
				<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={{ uri: 'https://picsum.photos/213' }} style={{ height: 256, width: 256 }} />
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						{playlist && <Text style={styles.playlistName}>{playlist.name}</Text>}
						{playlist && (
							<Text style={styles.date}>
								{new Date(playlist!.created_at).toLocaleString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</Text>
						)}
						<Text style={styles.songsNumber}>{songs.length} songs</Text>
					</View>
					<TouchableOpacity onPress={isPlaying && !pause ? pauseSound : playSound}>
						<Icon name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'} color="white" size={84} />
					</TouchableOpacity>
				</View>
				{!loading ? (
					<>
						{/* <Text style={styles.playlistTitle}>1 hours 45 min</Text> */}
						<View style={styles.recentSongs}>
							{songs.map((song, index) => (
								<SongComponent key={index} song={song} inPlaylist={playlist?.name} songs={songs} />
							))}
						</View>
					</>
				) : (
					<></>
				)}
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
    playlistName: {
        color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
    },
	date: {
		color: 'gray',
		fontSize: 18,
	},
    songsNumber: {
        color: 'gray',
		fontSize: 14,
    }
});

export default PlaylistScreen;
