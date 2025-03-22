import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoSmall from '../components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogBox } from 'react-native';
import api from '../lib/axiosConfig';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation']);

const genres = [
	{ name: 'Pop', icon: 'modern-mic', library: Entypo },
	{ name: 'Rock', icon: 'guitar-electric', library: MaterialCommunityIcons },
	{ name: 'R&B', icon: 'saxophone', library: MaterialCommunityIcons },
	{ name: 'Hip-Hop', icon: 'musical-note', library: Ionicons },
	{ name: 'Classical', icon: 'piano', library: MaterialCommunityIcons },
	{ name: 'Electronic', icon: 'lightning-bolt', library: MaterialCommunityIcons },
];

export default function MusicScreen() {
	const [selectedGenre, setSelectedGenre] = useState('Pop');
	const [selectedTopic, setSelectedTopic] = useState('');
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: 'Math', value: 'Math' },
		{ label: 'Computer Science', value: 'Computer Science' },
		{ label: 'History', value: 'History' },
		{ label: 'Geography', value: 'Geography' },
		{ label: 'Physics', value: 'Physics' },
	]);
	const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

	const createSong = () => {
		if (selectedTopic == '') {
			Alert.alert('Must select a topic');
			return;
		}
		console.log({ selectedGenre, selectedTopic, prompt });
        setLoading(true)
		api.post('/api/v1/sonic/create', {
			customMode: false,
			gpt_description_prompt: prompt,
			tags: selectedGenre,
		})
			.then((resp) => {
				console.log(resp.data);
				fetchSong(resp.data.task_id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchSong = async (task_id: string) => {
		api.get(`/api/v1/sonic/task/${task_id}`)
			.then((resp) => {
				if (resp.data[0].state != 'succeeded') {
					setTimeout(() => {
						fetchSong(task_id);
					}, 3000);
				}
                else {
                    // success
                    setLoading(false);
                }
				console.log(resp.data[0]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(() => {
					fetchSong(task_id);
				}, 3000);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				style={{ paddingHorizontal: 20 }}
				contentContainerStyle={{ paddingBottom: 100 }}
				nestedScrollEnabled={true}
			>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall />
				</View>
				<View style={styles.column}>
					<Text style={styles.title}>Create Your Song</Text>
					<View style={styles.field}>
						<View style={styles.row}>
							<Icon name="rocket-sharp" size={16} color="white" />
							<Text style={styles.label}>TOPIC</Text>
						</View>
						<DropDownPicker
							style={styles.input}
							placeholder="What would you like to learn about?"
							placeholderStyle={{ color: 'gray' }}
							open={open}
							value={selectedTopic}
							items={items}
							setOpen={setOpen}
							setValue={setSelectedTopic}
							setItems={setItems}
							ArrowDownIconComponent={({ style }) => <Icon name="chevron-down" color="gray" size={20} />}
							ArrowUpIconComponent={({ style }) => <Icon name="chevron-up" color="gray" size={20} />}
							TickIconComponent={({ style }) => <Icon name="checkmark" color="white" size={20} />}
							dropDownContainerStyle={{
								backgroundColor: '#403E43',
								zIndex: 10,
							}}
							listItemLabelStyle={{
								color: 'gray',
							}}
							selectedItemLabelStyle={{
								color: 'white',
							}}
							textStyle={{
								color: 'white',
								fontSize: 16,
								fontWeight: 'bold',
							}}
							scrollViewProps={{ nestedScrollEnabled: true }}
						/>
					</View>
					<View style={styles.field}>
						<View style={styles.row}>
							<Icon name="musical-note" size={16} color="white" />
							<Text style={styles.label}>GENRE</Text>
						</View>
						<View style={styles.container2}>
							{genres.map((genre, index) => {
								const IconComponent = genre.library;
								return (
									<TouchableOpacity
										key={index}
										style={[styles.button, { backgroundColor: selectedGenre == genre.name ? '#732DFC' : '#403E43' }]}
										onPress={() => setSelectedGenre(genre.name)}
									>
										<IconComponent name={genre.icon} size={24} color="white" />
										<Text style={styles.buttonText}>{genre.name}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
					<View style={styles.field}>
						<View style={styles.row}>
							<Icon name="sparkles-sharp" size={16} color="white" />
							<Text style={styles.label}>DETAILS</Text>
						</View>
						<TextInput
							multiline={true}
							numberOfLines={3}
							style={[styles.input, { height: 150 }]}
							placeholder="Enter your prompt for the song..."
							placeholderTextColor={'gray'}
							onChangeText={(e) => {
								setPrompt(e);
							}}
							value={prompt}
						></TextInput>
					</View>
					<TouchableOpacity style={styles.createButton} onPress={createSong} disabled={loading}>
						{!loading && <Text style={styles.buttonText}>Create Song</Text>}
                        {loading && <ActivityIndicator size="small"></ActivityIndicator>}
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
	logo: {
		fontSize: 44,
		fontWeight: 'bold',
		color: 'white',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'white',
		marginTop: 10,
	},
	subtitle: {
		fontSize: 28,
		fontWeight: 'medium',
		color: 'white',
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'white',
	},
	input: {
		// backgroundColor: 'gray',
		borderRadius: 10,
		fontSize: 16,
		padding: 15,
		borderWidth: 1.5,
		color: 'white',
		borderColor: '#403E43',
		backgroundColor: '#403E43',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	field: {
		display: 'flex',
		gap: 8,
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		gap: 25,
	},
	container2: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	button: {
		width: '48%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingLeft: 15,
		marginBottom: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	createButton: {
		backgroundColor: '#732DFC',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		paddingLeft: 15,
		marginBottom: 10,
		borderRadius: 10,
	},
});
