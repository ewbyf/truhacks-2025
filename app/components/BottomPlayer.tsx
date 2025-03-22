import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const BottomPlayer = () => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [position, setPosition] = useState(0);
	const [duration, setDuration] = useState(0);
	const [hasInteracted, setHasInteracted] = useState(false); // Track interaction state

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(async () => {
		bottomSheetModalRef.current?.present();
		setTimeout(() => {
			bottomSheetModalRef.current?.snapToPosition(1000);
		}, 150);
	}, [hasInteracted]);

	const loadSound = async () => {
		await Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			staysActiveInBackground: true,
		});

		const { sound } = await Audio.Sound.createAsync({ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, { shouldPlay: false });

		setSound(sound);
		setIsLoaded(true);

		const status = await sound.getStatusAsync();
		if (status.isLoaded && status.durationMillis !== undefined) {
			setDuration(status.durationMillis);
		}
	};

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

	const skipSong = () => {};
	const rewindSong = () => {};

	useEffect(() => {
		const interval = setInterval(async () => {
			if (sound) {
				const status = await sound.getStatusAsync();
				if (status.isLoaded) {
					setPosition(status.positionMillis);
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
	}, []);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.player} onPress={handlePresentModalPress}>
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Image style={styles.artwork} source={{ uri: 'https://picsum.photos/100' }} />
					<View style={styles.info}>
						<Text style={styles.title}>Song Title</Text>
						<Text style={styles.artist}>pop, r&b</Text>
					</View>
					<View style={styles.controls}>
						<TouchableOpacity onPress={rewindSong}>
							<Icon name="play-skip-back" color="white" size={30} />
						</TouchableOpacity>
						<TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
							<Icon name={isPlaying ? 'pause' : 'play'} color="white" size={30} />
						</TouchableOpacity>
						<TouchableOpacity onPress={skipSong}>
							<Icon name="play-skip-forward" color="white" size={30} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.progressBarContainer}>
					<View style={[styles.progressBarInside, { width: `${(position / duration) * 100}%` }]}></View>
				</View>
			</TouchableOpacity>

			{/* <View style={styles.progressContainer}>
				<Text style={styles.progressText}>
                {Math.floor(position / 1000)} / {Math.floor(duration / 1000)} seconds
				</Text>
				<Slider
                style={styles.progressBar}
                value={position / duration}
                minimumValue={0}
                maximumValue={1}
                thumbTintColor="white"
                minimumTrackTintColor="white"
                onValueChange={async (value) => {
                    if (sound) {
                        const newPosition = value * duration;
                        await sound.setPositionAsync(newPosition);
                        setPosition(newPosition);
						}
                        }}
                        />
                        </View> */}
			<BottomSheetModal ref={bottomSheetModalRef} snapPoints={[1000]} index={-1} handleComponent={null} enablePanDownToClose={true}>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
					<Text>Awesome 🎉</Text>
					<Text>Awesome 🎉</Text>
					<Text>Awesome 🎉</Text>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheetModal>
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
		left: 0,
		position: 'absolute',
		bottom: 85,
		width: '100%',
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
		width: 120,
	},
	controlText: {
		color: 'white',
		fontSize: 16,
	},
	// progressContainer: {
	// 	marginTop: 10,
	// 	paddingHorizontal: 20,
	// },
	// progressText: {
	// 	color: 'white',
	// 	fontSize: 14,
	// 	marginBottom: 5,
	// },
	// progressBar: {
	// 	width: '100%',
	// 	height: 40,
	// },
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
		backgroundColor: 'red',
		height: 1.5,
	},
	// bg-gray-100 w-full h-[1.5px] rounded mt-auto">
	// 						<View className={`absolute bottom-0 bg-purple-300 h-[1.5px] rounded`
});

export default BottomPlayer;
