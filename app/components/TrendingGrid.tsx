import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = width / 2 - 20;

const images = [
	{ id: '1', uri: 'https://picsum.photos/200' },
	{ id: '2', uri: 'https://picsum.photos/201' },
	{ id: '3', uri: 'https://picsum.photos/202' },
	{ id: '4', uri: 'https://picsum.photos/203' },
];

const TrendingGrid = () => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				{images.slice(0, 2).map((image) => (
					<View key={image.id} style={styles.imageContainer}>
						<Image source={{ uri: image.uri }} style={styles.image} />
					</View>
				))}
			</View>
			<View style={styles.row}>
				{images.slice(2).map((image) => (
					<View key={image.id} style={styles.imageContainer}>
						<Image source={{ uri: image.uri }} style={styles.image} />
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
        paddingVertical: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        gap: 5,
	},
	imageContainer: {
		width: imageSize,
		height: imageSize,
		marginBottom: 5,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
});

export default TrendingGrid;
