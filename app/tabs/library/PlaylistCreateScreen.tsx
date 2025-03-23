import React, { useCallback, useMemo, useRef, useEffect, useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import RecentSong from '../../components/RecentSong';
import { getSongs, createNewPlaylist, addSongToPlaylist } from '@/app/lib/supabaseUtils';
import { UserContext } from '@/app/contexts/UserContext';
import type { Song } from '@/app/interfaces/Song';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




const PlaylistCreateScreen = () => {
    const [selected, setSelected] = useState('playlists');
	const [playlistName, setplaylistName] = useState('');
	const router = useRouter();

	const [imageUri, setImageUri] = useState<string | null>(null);
	const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<number[]>([]);

	const {id} = useContext(UserContext);

	const pickImage = async () => {
	const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (!granted) {
		alert('Permission required, we need access to your media library to pick an image.');
		return;
	}

	const result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
		quality: 1,
	});

	if (!result.canceled && result.assets?.length > 0) {
		setImageUri(result.assets[0].uri);
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
		setSelectedSongs(prev =>
		  prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
		);
	};

	const savePlaylist = async () => {
		if (!playlistName || !imageUri || selectedSongs.length === 0) {
		  alert('Please enter playlist name, choose cover, and select songs.');
		  return;
		}
	  
		try {
		  const blob = await uriToBlob(imageUri);
	  
		  const playlist = await createNewPlaylist(playlistName, blob);
	  
		  await Promise.all(
			selectedSongs.map(songID => addSongToPlaylist(songID, playlist.id))
		  );
	  
		  alert('Playlist created successfully!');
		  router.push('/tabs/library');
		} catch (err) {
		  console.error(err);
		  alert('Something went wrong while saving the playlist.');
		}
	  };
	  

	  const uriToBlob = async (uri: string): Promise<Blob> => {
		const base64 = await FileSystem.readAsStringAsync(uri, {
		  encoding: FileSystem.EncodingType.Base64,
		});
	  
		const byteArray = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
	  
		return new Blob([byteArray], { type: 'image/jpeg' });
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
				<TouchableOpacity onPress={pickImage}>
					<Text style={styles.playlistTitle}>Add picture?</Text>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Image
						source={{ uri: imageUri ?? 'https://picsum.photos/213' }}
						style={{ height: 256, width: 256 }}
						/>
					</View>
				</TouchableOpacity>
				<TextInput style={styles.input} value={playlistName} onChangeText={setplaylistName} placeholder="Enter PlayList Name" placeholderTextColor="#999" />
				<View style={styles.recentSongs}>
					{availableSongs.map(song => (
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
						<Text style={{ color: 'white' }}>{song.name} – {song.genre} – {song.tag}</Text>
						</TouchableOpacity>
					))}
					</View>
					<TouchableOpacity
					style={styles.saveButton}
					onPress={savePlaylist}
					>
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
