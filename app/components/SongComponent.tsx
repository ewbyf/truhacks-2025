import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { UserContext } from '../contexts/UserContext';
import { Song } from '../interfaces/Song';

const SongComponent = ({ song }: { song: Song }) => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const { setCurrentSong } = useContext(UserContext);

	const playSound = async () => {
		setCurrentSong(song);
		setIsPlaying(true);
	};

	const pauseSound = async () => {
		// if (sound) {
		// 	await sound.pauseAsync();
		setIsPlaying(false);
		// }
	};

    console.log(song.cover_art)

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image style={styles.artwork} source={{ uri: song.cover_art }} />
				<View style={styles.info}>
					<Text style={styles.title}>{song.name}</Text>
					<Text style={styles.tag}>{song.tag}</Text>
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
	container: {
		flex: 1,
		padding: 5,
		width: '100%',
		backgroundColor: '#626262',
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
});

export default SongComponent;
