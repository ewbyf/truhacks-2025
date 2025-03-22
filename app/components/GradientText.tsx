import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = ({ text }: { text: string }) => (
	<MaskedView
		maskElement={
			<Text style={styles.gradientText}>
				{text}
			</Text>
		}
	>
		<LinearGradient
			colors={['#FA17DBcc', '#732DFCcc']} // 80% opacity in hex
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			<Text style={[styles.gradientText, { opacity: 0 }]}>
				{text}
			</Text>
		</LinearGradient>
	</MaskedView>
);

const styles = StyleSheet.create({
    gradientText: {
		fontSize: 48,
		fontWeight: '600',
		fontFamily: 'Roboto',
		lineHeight: 48,
	},
})

export default GradientText;