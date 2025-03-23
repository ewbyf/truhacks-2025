import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { UserContext } from '../contexts/UserContext';
import { Song } from '../interfaces/Song';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import PlaylistLibrary from '@/app/components/PlaylistLibrary';
import { useRouter } from 'expo-router';
import { addSongToPlaylist } from '../lib/supabaseUtils';

const SongComponent = ({ song, inPlaylist, songs }: { song: Song; inPlaylist?: string; songs?: Song[] }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const { currentSong, setCurrentSong, setPause, pause, position, setPosition, queue, setQueue, setCurrentPlaylist, playlists } = useContext(UserContext);
	const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const router = useRouter();

	useEffect(() => {
		if (currentSong == song) {
			setIsPlaying(true);
		} else {
			setIsPlaying(false);
		}
	}, [currentSong]);

	useEffect(() => {
		if (pause) {
			setIsPlaying(false);
		} else if (!pause && currentSong == song) {
			setIsPlaying(true);
		}
	}, [pause]);

	const playSound = async () => {
		if (inPlaylist != '') {
			setQueue([]);
			setPosition(0);
			setCurrentPlaylist('');
		} else if (songs && songs != queue) {
			setQueue(songs);
			setCurrentPlaylist(inPlaylist);
		}
		setCurrentSong(song);
		setPause(false);
		const idx = queue.findIndex((s) => s == song);
		if (idx >= 0) {
			setPosition(idx);
		}
	};

	const pauseSound = async () => {
		setIsPlaying(false);
		setPause(true);
	};

	const handlePresentModalPress = useCallback(async () => {
		bottomSheetModalRef.current?.present();
		setTimeout(() => {
			bottomSheetModalRef.current?.snapToPosition(800);
		}, 150);
	}, []);

	const addToPlaylist = async () => {
		selectedPlaylists.forEach(async (element) => {
			await addSongToPlaylist(song, element);
		});
	};

	const handlePlaylistClick = (playlistId: number) => {
		if (selectedPlaylists.includes(playlistId)) {
			setSelectedPlaylists(selectedPlaylists.filter((pl) => pl != playlistId));
		} else {
			setSelectedPlaylists([...selectedPlaylists, playlistId]);
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image style={styles.artwork} source={{ uri: song.cover_art }} />
				<View style={styles.info}>
					<Text style={[styles.title]} numberOfLines={1}>
						{song.name}
					</Text>
					<Text style={styles.tag}>{song.tag}</Text>
				</View>
				<View style={styles.controls}>
					<TouchableOpacity onPress={handlePresentModalPress}>
						<Icon name="add" color="white" size={30} />
					</TouchableOpacity>
					<TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
						<Icon name={isPlaying ? 'pause' : 'play'} color="white" size={30} />
					</TouchableOpacity>
				</View>
			</View>
			<BottomSheetModal ref={bottomSheetModalRef} snapPoints={[800]} index={-1} handleStyle={{ backgroundColor: '#252525' }} enablePanDownToClose={true}>
				<BottomSheetView style={styles.contentContainer}>
					<Text style={styles.bigTitle}>Add to Playlist</Text>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ height: '100%', width: '100%' }}
						contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
					>
						<View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
							<TouchableOpacity
								style={styles.createContainer}
								onPress={() => {
									bottomSheetModalRef.current?.dismiss();
									router.push('/tabs/library/PlaylistCreateScreen' as const);
								}}
							>
								<View style={styles.createIcon}>
									<Icon name="add" size={32} color="white"></Icon>
								</View>
								<Text style={styles.playlistTitle}>Create playlist</Text>
							</TouchableOpacity>

							{playlists.map((playlist) => (
								<TouchableOpacity
									style={[
										{
											padding: 5,
											flexDirection: 'row',
											gap: 8,
											alignItems: 'center',
											width: '100%',
											backgroundColor: selectedPlaylists.includes(playlist.id) ? 'rgba(115, 45, 252, .2)' : 'transparent',
										},
									]}
									onPress={() => handlePlaylistClick(playlist.id)}
								>
									<Image source={{ uri: playlist.cover_art }} width={60} height={60}></Image>
									<Text style={styles.playlistName}>{playlist.name}</Text>
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
					<TouchableOpacity style={styles.button}>
						<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Done</Text>
					</TouchableOpacity>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		paddingVertical: 8,
		width: '100%',
		backgroundColor: '#252525',
		borderRadius: 10,
	},
	artwork: {
		width: 45,
		height: 45,
		borderRadius: 10,
	},
	info: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold',
	},
	tag: {
		color: 'gray',
		fontSize: 12,
	},
	controls: {
		flexDirection: 'row',
		gap: 10,
		paddingRight: 10,
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#252525',
		justifyContent: 'space-between',
	},
	bigTitle: {
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 24,
	},

	createContainer: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	createIcon: {
		width: 60,
		height: 60,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#323232',
	},
	playlistTitle: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'bold',
	},
	selectionButton: {
		backgroundColor: '#732DFC',
		padding: 6,
		paddingHorizontal: 8,
		borderRadius: 10,
	},
	playlistName: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#732DFC',
		paddingVertical: 15,
		paddingHorizontal: 30,
		margin: 10,
		borderRadius: 20,
	},
});

export default SongComponent;
