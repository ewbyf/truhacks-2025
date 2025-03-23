import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const BottomPlayer = () => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [songPosition, setSongPosition] = useState(0);
	const [duration, setDuration] = useState(0);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const { currentSong, setCurrentSong, pause, setPause, queue, setQueue, position, setPosition, currentPlaylist } = useContext(UserContext);

	const handlePresentModalPress = useCallback(async () => {
		bottomSheetModalRef.current?.present();
		setTimeout(() => {
			bottomSheetModalRef.current?.snapToPosition(1000);
		}, 150);
	}, []);

	const loadSound = async () => {
		if (currentSong.name == '') {
			return;
		}
		if (sound != null) {
			await sound.unloadAsync();
		}
		await Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			staysActiveInBackground: true,
		});

		const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentSong.song_file }, { shouldPlay: true });
		setIsPlaying(true);
		setSound(newSound);
		setIsLoaded(true);

		const status = await newSound.getStatusAsync();
		if (status.isLoaded && status.durationMillis !== undefined) {
			setDuration(status.durationMillis);
		}
	};

	const playSound = async () => {
		if (sound && isLoaded && !isPlaying) {
			await sound.playAsync();
			setIsPlaying(true);
			setPause(false);
		}
	};

	const pauseSound = async () => {
		if (sound) {
			await sound.pauseAsync();
			setIsPlaying(false);
			setPause(true);
		}
	};

	const skipSong = () => {
		if (queue.length) {
			setPosition((position + 1) % queue.length);
			setCurrentSong(queue[(position + 1) % queue.length]);
			setIsPlaying(true);
			setPause(false);
		}
	};

	const rewindSong = () => {
        if (queue.length) {
			setPosition(((position - 1) + queue.length) % queue.length);
			setCurrentSong(queue[((position - 1) + queue.length) % queue.length]);
			setIsPlaying(true);
			setPause(false);
		}
    };

	useEffect(() => {
		if (pause) {
			pauseSound();
		} else {
			playSound();
		}
	}, [pause]);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (sound) {
				const status = await sound.getStatusAsync();
				if (status.isLoaded) {
					setSongPosition(status.positionMillis);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [sound]);

	useEffect(() => {
		loadSound();

		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [currentSong]);

	if (currentSong.name == '') {
		return null;
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={1} style={styles.player} onPress={handlePresentModalPress}>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.artwork} source={{ uri: currentSong.cover_art }} />
					<View style={styles.info}>
						<Text style={styles.title} numberOfLines={1}>{currentSong.name}</Text>
						<Text style={styles.artist}>{currentSong.genre}</Text>
					</View>
					<View style={styles.controls}>
						<TouchableOpacity onPress={rewindSong}>
							<Icon name="play-skip-back" color="white" size={28} />
						</TouchableOpacity>
						<TouchableOpacity onPress={isPlaying && !pause ? pauseSound : playSound}>
							<Icon name={isPlaying ? 'pause' : 'play'} color="white" size={28} />
						</TouchableOpacity>
						<TouchableOpacity onPress={skipSong}>
							<Icon name="play-skip-forward" color="white" size={28} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.progressBarContainer}>
					<View style={[styles.progressBarInside, { width: `${(songPosition / duration) * 100}%` }]}></View>
				</View>
			</TouchableOpacity>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				snapPoints={['100%']}
				index={-1}
				handleComponent={null}
				onChange={(index) => {
					if (index == 0) {
						bottomSheetModalRef.current?.close();
					}
				}}
				enablePanDownToClose={true}
			>
				<BottomSheetView style={styles.contentContainer}>
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity onPress={() => bottomSheetModalRef?.current?.close()}>
							<Icon name="chevron-down" color="white" size={36} />
						</TouchableOpacity>
						<Text style={styles.playlistTitle}>{currentPlaylist}</Text>
						<TouchableOpacity onPress={() => bottomSheetModalRef?.current?.close()}>
							<Icon name="ellipsis-horizontal" color="white" size={36} />
						</TouchableOpacity>
					</View>
					<Image source={{ uri: currentSong.cover_art }} style={{ height: 350, width: 350 }} />
					<View style={{ width: '100%' }}>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<View style={{ gap: 5 }}>
								<Text style={styles.songName}>{currentSong.name}</Text>
								<Text style={styles.genresName}>{currentSong.genre}</Text>
							</View>
						</View>
						<View style={styles.progressContainer}>
							<Slider
								style={styles.progressBar}
								value={songPosition / duration}
								minimumValue={0}
								maximumValue={1}
								thumbTintColor="white"
								minimumTrackTintColor="white"
								thumbImage={require('../../assets/images/circle.png')}
								onValueChange={async (value) => {
									if (sound) {
										const newPosition = value * duration;
										await sound.setPositionAsync(newPosition);
										setSongPosition(newPosition);
									}
								}}
							/>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 }}>
								<Text style={styles.timestamp}>
									{Math.floor(Math.floor(songPosition / 1000) / 60)}:{String(Math.floor(songPosition / 1000) % 60).padStart(2, '0')}
								</Text>
								<Text style={styles.timestamp}>
									{Math.floor(Math.floor(duration / 1000) / 60)}:{String(Math.floor(duration / 1000) % 60).padStart(2, '0')}
								</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
							<TouchableOpacity onPress={rewindSong}>
								<Icon name="play-skip-back" color="white" size={42} />
							</TouchableOpacity>
							<TouchableOpacity onPress={isPlaying && !pause ? pauseSound : playSound}>
								<Icon name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'} color="white" size={84} />
							</TouchableOpacity>
							<TouchableOpacity onPress={skipSong}>
								<Icon name="play-skip-forward" color="white" size={42} />
							</TouchableOpacity>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		paddingBottom: 120,
		paddingHorizontal: 20,
		backgroundColor: '#252525',
		justifyContent: 'space-between',
	},
	container: {
		flex: 1,
		padding: 5,
		left: 0,
		position: 'absolute',
		bottom: 85,
		width: '100%',
		backgroundColor: 'transparent',
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
		justifyContent: 'space-between',
		width: 110,
        marginHorizontal: 8,
	},
	controlText: {
		color: 'white',
		fontSize: 16,
	},
	progressContainer: {
		marginTop: 10,
		width: '100%',
	},
	progressText: {
		color: 'white',
		fontSize: 14,
		marginBottom: 5,
	},
	progressBar: {
		width: '100%',
		height: 30,
	},
	progressBarContainer: {
		backgroundColor: 'gray',
		width: '100%',
		height: 1.5,
		borderRadius: 10,
		marginTop: 'auto',
	},
	progressBarInside: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 10,
		backgroundColor: 'rgba(115,45,252,.75)',
		height: 1.5,
	},
	playlistTitle: {
		color: 'white',
		fontSize: 13,
		fontWeight: 'bold',
	},
	songName: {
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
	},
	genresName: {
		color: 'lightgray',
		fontSize: 18,
		fontWeight: 'medium',
	},
	timestamp: {
		fontSize: 12,
		color: 'lightgray',
	},
});

export default BottomPlayer;
