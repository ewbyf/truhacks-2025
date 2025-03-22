import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

const LibraryScreen = () => {
    const [selected, setSelected] = useState('playlists');
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ paddingHorizontal: 20 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={styles.title}>LOGO</Text>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
					<Text style={styles.subtitle}>{selected == "playlists" ? 'Playlists' : 'Songs'}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity style={[styles.selectionButton, {backgroundColor: selected == "playlists" ? '#732DFC' : '#403E43'}]} onPress={() => setSelected('playlists')}>
                            <Text>Playlists</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectionButton, {backgroundColor: selected == "songs" ? '#732DFC' : '#403E43'}]} onPress={() => setSelected('songs')}>
                            <Text>Songs</Text>
                        </TouchableOpacity>
                    </View>
				</View>
				<View style={styles.column}>
					<TouchableOpacity style={styles.createContainer}>
						<View style={styles.createIcon}>
							<Icon name="add" size={32} color="white"></Icon>
						</View>
						<Text style={styles.playlistTitle}>Create playlist</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.createContainer}
						onPress={() => {
							router.push('/tabs/PlaylistScreen');
						}}
					>
						<Image source={{ uri: 'https://picsum.photos/213' }} style={{ height: 75, width: 75 }} />
						<Text style={styles.playlistTitle}>Playlist #1</Text>
					</TouchableOpacity>
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
		backgroundColor: '#403E43',
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
    }
});

export default LibraryScreen;
