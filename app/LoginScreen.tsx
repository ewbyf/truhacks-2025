import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text, Button, Touchable } from 'react-native';
import { supabase } from './lib/supabase';
// import { Input, InputField } from '../../components/ui/input';
// import { Button, ButtonText } from '../../components/ui/button';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function signInWithEmail() {
		setLoading(true);
		supabase.auth
			.signInWithPassword({
				email: email,
				password: password,
			})
			.then((resp) => {
				Alert.alert('yay');
				console.log(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});

		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session) Alert.alert('Please check your inbox for email verification!');
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={() => router.navigate('./tabs/HomeScreen')}>
				<Text style={styles.buttonText}>Start Listening</Text>
			</TouchableOpacity>
			<Text>Hello World</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
		padding: 12,
		backgroundColor: 'rgba(132, 42, 247, 0.55)'
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	button: {
		display: 'flex',
		width: 160,
		height: 42,
		paddingVertical: 0,         // --Spacing-0
		paddingHorizontal: 28,      // --Spacing-7
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,                    // --Spacing-3
		flexShrink: 0,
		borderRadius: 10,
		backgroundColor: 'rgba(132, 42, 247, 0.55)',
	},
	buttonText: {
		color: '#FFF',
		fontFamily: 'Roboto',
		fontSize: 17,
		fontStyle: 'normal',
		fontWeight: 500,
		lineHeight: 25,
	}
});
