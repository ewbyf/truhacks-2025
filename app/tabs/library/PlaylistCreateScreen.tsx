import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { getSongs, createNewPlaylist, addSongToPlaylist, addSongsToPlaylist, setPlaylistSongCount } from '@/app/lib/supabaseUtils';
import { UserContext } from '@/app/contexts/UserContext';
import type { Song } from '@/app/interfaces/Song';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '@/app/components/Header';
import DinoDefaultBG from '@/app/components/svgs/DinoDefaultBG';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PlaylistCreateScreen = () => {
	const router = useRouter();

	const [playlistName, setplaylistName] = useState('');
	const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
	const [image, setImage] = useState<string | null>(null);

	const { id } = useContext(UserContext);

	const choosePhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
		});

		if (!result.canceled) {
			const source = result.assets[0].uri;
			setImage(source);
		}
	};

	useEffect(() => {
		const loadSongs = async () => {
			try {
				const songs = await getSongs(id);
				setAvailableSongs(songs);
			} catch (err) {
				console.error('Failed to load songs:', err);
			}
		};

		loadSongs();
	}, []);

	//Adds or removes a song's ID in the selectedSongs list when the user taps it.
	const toggleSong = (id: number) => {
		setSelectedSongs((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
	};

	const covers = [
		require('../../../assets/svgs/CirclePurplePlaylistBG.svg'),
		require('../../../assets/svgs/DiamondGreenPlaylistBG.svg'),
		require('../../../assets/svgs/SwirlPinkPlaylistBG.svg'),
		require('../../../assets/svgs/TriangleOrangePlaylistBG.svg'),
		require('../../../assets/svgs/Purple.svg'),
	];

	const generateRandomCover = () => {
		const idx = Math.floor(Math.random() * 5);
		const fileUri = Image.resolveAssetSource(covers[idx]).uri;
        console.log(fileUri)
		return fileUri;
	};

	const savePlaylist = async () => {
		if (!playlistName || selectedSongs.length === 0) {
			alert('Please enter playlist name, choose cover, and select songs.');
			return;
		}

		try {
			if (image) {
				const filename = image.substring(image.lastIndexOf('/') + 1);
				const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });

				const playlist = await createNewPlaylist(id, playlistName, base64, filename);

				await addSongsToPlaylist(selectedSongs, playlist.id)
				await setPlaylistSongCount(id, selectedSongs.length);

				alert('Playlist created successfully!');
			} else {
				const temp = generateRandomCover();
				const filename = temp.substring(temp.lastIndexOf('/') + 1);
				const base64 = await FileSystem.readAsStringAsync(temp, { encoding: 'base64' });

				const playlist = await createNewPlaylist(id, playlistName, base64, filename);

				await addSongsToPlaylist(selectedSongs, playlist.id)
				await setPlaylistSongCount(id, selectedSongs.length);

				alert('Playlist created successfully!');
			}

			router.push('/tabs/library');
		} catch (err) {
			console.error(err);
			alert('Something went wrong while saving the playlist.');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header title="Create Playlist"></Header>
			<KeyboardAwareScrollView style={{ paddingHorizontal: 20, paddingTop: 80 }} contentContainerStyle={{ paddingBottom: 80, gap: 20 }}>
				<TouchableOpacity onPress={choosePhoto}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						{image ? (
							<Image source={{ uri: image }} style={{ height: 256, width: 256 }} />
						) : (
							<View style={{ height: 256, width: 256, backgroundColor: '#252525', justifyContent: 'center', alignItems: 'center' }}>
								<FeatherIcon name="upload" size={72} color="gray" />
							</View>
						)}
					</View>
				</TouchableOpacity>
				<View style={{ gap: 8 }}>
					<View style={styles.row}>
						<Icon name="sparkles-sharp" size={16} color="white" />
						<Text style={styles.label}>NAME</Text>
					</View>
					<TextInput
						style={[styles.input]}
						placeholder="Enter a name for your playlist..."
						placeholderTextColor={'gray'}
						onChangeText={(e) => {
							setplaylistName(e);
						}}
						value={playlistName}
					></TextInput>
				</View>
				<View style={{ gap: 8 }}>
					<View style={styles.row}>
						<Icon name="musical-note" size={16} color="white" />
						<Text style={styles.label}>PICK SONGS</Text>
					</View>
					<View style={{ gap: 10 }}>
						{availableSongs.map((song) => (
							<TouchableOpacity
								key={song.id}
								onPress={() => toggleSong(song.id)}
								style={[styles.container2, { backgroundColor: selectedSongs.includes(song.id) ? '#732DFC' : '#252525' }]}
							>
								<View>
									<View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
										<Image style={styles.artwork} source={{ uri: song.cover_art }} />
										<View style={styles.info}>
											<Text style={styles.title2}>{song.name}</Text>
											<Text style={[styles.tag, { color: selectedSongs.includes(song.id) ? 'white' : 'gray' }]}>{song.genre}</Text>
										</View>
										<View style={styles.tag2}>
											<Text style={{ color: 'white', fontSize: 12 }}>Pop</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<TouchableOpacity style={styles.saveButton} onPress={savePlaylist}>
					<Text style={styles.saveButtonText}>Save Playlist</Text>
				</TouchableOpacity>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container2: {
		flex: 1,
		padding: 5,
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
	title2: {
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
	input: {
		borderRadius: 10,
		fontSize: 16,
		padding: 15,
		borderWidth: 1.5,
		color: 'white',
		borderColor: '#252525',
		backgroundColor: '#252525',
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
	saveButton: {
		backgroundColor: '#732DFC',
		paddingVertical: 12,
		borderRadius: 10,
		marginTop: 20,
		alignItems: 'center',
	},

	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white',
	},
	tag2: {
		backgroundColor: '#343333',
		borderRadius: 10,
		padding: 5,
		paddingHorizontal: 10,
	},
});

export default PlaylistCreateScreen;
