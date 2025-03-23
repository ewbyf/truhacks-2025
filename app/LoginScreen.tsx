import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text, Button, Touchable, TextInput, Image, SafeAreaView } from 'react-native';
import GradientText from './components/GradientText';
import { supabase } from './lib/supabase';
import { useRouter } from 'expo-router';
import Logo from './components/svgs/Logo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginBG from './components/svgs/LoginBG';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const router = useRouter();

	async function signInWithEmail() {
		if (!email.trim() || !password.trim()) {
			setErrorMessage('Email and password are required.');
			return;
		}
		supabase.auth
			.signInWithPassword({
				email: email,
				password: password,
			})
			.then(async (resp) => {
				await AsyncStorage.setItem('token', resp.data.user!.id);
				console.log(resp.data.user!.id);
				console.log('logged in');
                router.navigate('./tabs/HomeScreen'); //WHEN APPO RELOADS, THIS IS WHAT GETS US NAVIGATED
			})
			.catch((err) => {
				setErrorMessage('Invalid email or password.');
			});
	}

	async function signUpWithEmail() {
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!error && !session) Alert.alert('Please check your inbox for email verification!');
	}

	return (
		<>
			<View style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
				<LoginBG></LoginBG>
			</View>

			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, padding: 40 }}>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<Logo />
					</View>
					<View style={{ marginTop: 75, marginBottom: 25 }}>
						<Text style={styles.phrase}>Get into the{'\n'}rhythm of </Text>
						<GradientText text="learning" />
					</View>
					<View style={styles.bottom}>
						<View style={styles.fields}>
							<TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email" placeholderTextColor="#999" />
							<TextInput
								style={styles.input}
								value={password}
								onChangeText={setPassword}
								placeholder="Password"
								placeholderTextColor="#999"
								secureTextEntry={!showPassword}
							/>
							<TouchableOpacity style={{ marginLeft: 'auto' }}>
								<Text style={styles.forgot}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity style={styles.button} onPress={() => signInWithEmail()}>
							<Text style={styles.buttonText}>Start Listening</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	bottom: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
	},
	button: {
		display: 'flex',
		width: '100%',
		height: 50,
		paddingVertical: 0,
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		flexShrink: 0,
		borderRadius: 10,
		backgroundColor: '#732DFC',
	},
	buttonText: {
		color: '#FFF',
		fontFamily: 'Roboto',
		fontSize: 17,
		fontWeight: '500',
		lineHeight: 17,
	},
	input: {
		width: '100%',
		height: 53,
		paddingHorizontal: 12,
		alignItems: 'center',
		flexShrink: 0,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#515054',
		color: '#FFF',
	},
	fields: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		width: '100%',
	},
	forgot: {
		overflow: 'hidden',
		color: 'rgba(255, 255, 255, 0.5)',
		fontFamily: 'Roboto',
		fontSize: 13,
	},
	phrase: {
		width: 283,
		flexShrink: 0,
		color: 'rgba(142, 141, 141, 0.81)',
		fontFamily: 'Roboto',
		fontSize: 48,
		fontWeight: '600',
		lineHeight: 48,
	},
});
