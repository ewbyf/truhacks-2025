import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { getSongs, createNewPlaylist, addSongToPlaylist } from '@/app/lib/supabaseUtils';
import { UserContext } from '@/app/contexts/UserContext';
import type { Song } from '@/app/interfaces/Song';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const PlaylistCreateScreen = () => {

	//TODO : change image to default image when we finish designing it
	const DEFAULT_IMAGE = 'https://picsum.photos/213';
	const router = useRouter();

	const [playlistName, setplaylistName] = useState('');
	const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
	const [image, setImage] = useState<string | null>(DEFAULT_IMAGE);

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

				await Promise.all(selectedSongs.map((songID) => addSongToPlaylist(songID, playlist.id)));

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
			<ScrollView style={{ paddingHorizontal: 20 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={styles.title}>LOGO</Text>
				</View>
				<TouchableOpacity onPress={() => router.back()}>
					<Icon name="arrow-back" size={30} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={choosePhoto}>
					<Text style={styles.playlistTitle}>Add picture?</Text>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Image source={{ uri: image ?? DEFAULT_IMAGE }} style={{ height: 256, width: 256 }} />
					</View>
				</TouchableOpacity>
				<TextInput
					style={styles.input}
					value={playlistName}
					onChangeText={setplaylistName}
					placeholder="Enter PlayList Name"
					placeholderTextColor="#999"
				/>
				<View style={styles.recentSongs}>
					{availableSongs.map((song) => (
						<TouchableOpacity
							key={song.id}
							onPress={() => toggleSong(song.id)}
							style={{
								backgroundColor: selectedSongs.includes(song.id) ? '#732DFC' : '#333',
								padding: 10,
								borderRadius: 8,
								marginBottom: 8,
							}}
						>
							<Text style={{ color: 'white' }}>
								{song.name} – {song.genre} – {song.tag}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				<TouchableOpacity style={styles.saveButton} onPress={savePlaylist}>
					<Text style={styles.saveButtonText}>Save Playlist</Text>
				</TouchableOpacity>
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
		width: '100%',
		height: 53,
		paddingHorizontal: 12,
		alignItems: 'center',
		flexShrink: 0,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#515054',
		color: '#FFF',
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
});

export default PlaylistCreateScreen;
