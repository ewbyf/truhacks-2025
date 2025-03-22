import BottomPlayer from '../components/BottomPlayer';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { Audio } from 'expo-av';

const RecentSong = () => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const playSound = async () => {
		if (sound && isLoaded && !isPlaying) {
			await sound.playAsync();
			setIsPlaying(true);
		}
	};

	const pauseSound = async () => {
		if (sound) {
			await sound.pauseAsync();
			setIsPlaying(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<Image style={styles.artwork} source={{ uri: 'https://picsum.photos/100' }} />
				<View style={styles.info}>
					<Text style={styles.title}>Song Title</Text>
					<Text style={styles.artist}>pop, r&b</Text>
				</View>
				<View style={styles.controls}>
					<TouchableOpacity>
						<Icon name="add" color="white" size={30} />
					</TouchableOpacity>
					<TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
						<Icon name={isPlaying ? 'pause' : 'play'} color="white" size={30} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		// position: 'absolute'
	},
	container: {
		flex: 1,
		padding: 5,
		width: '100%',
        backgroundColor: '#626262',
        borderRadius: 10,
	},
	player: {
		backgroundColor: '#333',
		flexDirection: 'column',
		borderRadius: 10,
		alignItems: 'center',
		padding: 8,
		paddingBottom: 0,
		height: 60,
		gap: 5,
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
	artist: {
		color: 'gray',
		fontSize: 12,
	},
	controls: {
		flexDirection: 'row',
		gap: 10,
        paddingRight: 10,
	},
	controlText: {
		color: 'white',
		fontSize: 16,
	},
});

export default RecentSong;
