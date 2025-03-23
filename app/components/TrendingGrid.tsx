import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import PurpleCircleBG from './svgs/PurpleCircleBG';

const TrendingGrid = () => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={{ alignItems: 'center', gap: 5 }}>
					<PurpleCircleBG style={styles.image} />
					<Text style={styles.songName}>Love of Code</Text>
				</View>
				<View style={{ justifyContent: 'space-between', gap: 10 }}>
					<View style={{ gap: 5 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<Icon name="musical-note" size={11} color="white" />
							<Text style={styles.label}>GENRE</Text>
						</View>
						<View style={styles.tag}>
							{/* <EntypoIcon name="modern-mic" color="white" size={16}/> */}
							<Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>Pop</Text>
						</View>
					</View>
					<View style={{ gap: 5 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<Icon name="rocket-sharp" size={11} color="white" />
							<Text style={styles.label}>TOPIC</Text>
						</View>
						<View style={styles.tag}>
							{/* <Icon name="code-slash" color="white" size={16}/> */}
							<Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>Coding</Text>
						</View>
					</View>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: '#707070', fontSize: 18, fontWeight: '300' }}>Played</Text>
					<MaskedView maskElement={<Text style={styles.gradientText}>152</Text>}>
						<LinearGradient
							colors={['#FA17DBcc', '#732DFCcc']} // 80% opacity in hex
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
						>
							<Text style={[styles.gradientText, { opacity: 0 }]}>152</Text>
						</LinearGradient>
					</MaskedView>
					<Text style={{ color: '#5F5F5F', fontSize: 15, fontWeight: '300' }}>times</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#252525',
		borderRadius: 10,
		padding: 20,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 5,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	songName: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold',
	},
	label: {
		color: 'white',
		fontSize: 11,
		fontWeight: 'bold',
	},
	tag: {
		padding: 10,
		paddingHorizontal: 20,
		width: '100%',
		backgroundColor: '#732DFC',
		borderRadius: 10,
		alignItems: 'center',
		// justifyContent: 'flex-start',
		// flexDirection: 'row',
		gap: 8,
	},
	gradientText: {
		fontSize: 48,
		fontWeight: '800',
		fontFamily: 'Roboto',
	},
});

export default TrendingGrid;
