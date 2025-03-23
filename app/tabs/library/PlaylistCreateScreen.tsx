import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import RecentSong from '../../components/RecentSong';
import * as ImagePicker from 'expo-image-picker';
import {  } from '@supabase/supabase-js'; // adjust path if needed


const [imageUri, setImageUri] = useState<string | null>(null);

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


const PlaylistCreateScreen = () => {
    const [selected, setSelected] = useState('playlists');
	const [playlistName, setplaylistName] = useState('');
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
});

export default PlaylistCreateScreen;
