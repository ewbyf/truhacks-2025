import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ paddingHorizontal: 20 }} contentContainerStyle={{paddingBottom: 80}}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={styles.logo}>LOGO</Text>
				</View>
				<View style={styles.column}>
					<Text style={styles.title}>Create Your Song</Text>
					<View style={styles.field}>
						<View style={styles.row}>
							<Icon name="rocket-sharp" size={16} color="white" />
							<Text style={styles.label}>TOPIC</Text>
						</View>
						<TextInput style={styles.input} placeholder="What would you like to learn about?" placeholderTextColor={'gray'}></TextInput>
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
									<TouchableOpacity key={index} style={[styles.button, {backgroundColor: selectedGenre == genre.name ? "#732DFC" : "#403E43"}]} onPress={() => setSelectedGenre(genre.name)}>
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
                        <TextInput multiline={true} numberOfLines={3} style={[styles.input, {height: 150}]} placeholder="Enter your prompt for the song..." placeholderTextColor={'gray'}></TextInput>
					</View>
                    <TouchableOpacity style={styles.createButton}>
                        <Text style={styles.buttonText}>Create Song</Text>
                    </TouchableOpacity>
				</View>
			</ScrollView>
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
        backgroundColor: "#732DFC",
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
