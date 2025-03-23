import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

type PlaylistLibraryProps = {
	id: number;
	name: string;
	image: string;
    num_songs: number;
};

const PlaylistLibrary = ({ id, name, image, num_songs }: PlaylistLibraryProps) => {
	const router = useRouter();
	return (
		<TouchableOpacity
			style={styles.createContainer}
			onPress={() => {
				router.push(`/tabs/library/playlist/${id}`);
			}}
		>
			<Image source={{ uri: image }} style={{ height: 75, width: 75 }} />
			<View style={{gap: 5}}>
				<Text style={styles.playlistTitle}>{name}</Text>
				<Text style={styles.numSongs}>{num_songs} songs</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PlaylistLibrary;

const styles = StyleSheet.create({
	createContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	playlistTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
    numSongs: {
        color: 'gray',
		fontSize: 14,
		fontWeight: 'medium',
    }
});
