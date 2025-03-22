import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoSmall from '../components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LibraryScreen = () => {
    const [selected, setSelected] = useState('playlists');

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }} contentContainerStyle={{paddingBottom: 80}}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall/>
				</View>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 }}>
					{/* <Text style={styles.subtitle}>{selected == "playlists" ? 'Playlists' : 'Songs'}</Text> */}
                    <Text style={styles.title}>Library</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity style={[styles.selectionButton, {backgroundColor: selected == "playlists" ? '#732DFC' : '#403E43'}]} onPress={() => setSelected('playlists')}>
                            <Text style={{color: selected == 'playlists' ? 'white' : 'black' }}>Playlists</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectionButton, {backgroundColor: selected == "songs" ? '#732DFC' : '#403E43'}]} onPress={() => setSelected('songs')}>
                            <Text style={{color: selected == 'songs' ? 'white' : 'black' }}>Songs</Text>
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
					<TouchableOpacity style={styles.createContainer}>
						<Image source={{ uri: 'https://picsum.photos/213' }} style={{ height: 75, width: 75 }} />
						<Text style={styles.playlistTitle}>Playlist #1</Text>
					</TouchableOpacity>
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
        gap: 10
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
