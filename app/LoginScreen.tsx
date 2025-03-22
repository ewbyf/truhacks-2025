import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text, Button, Touchable, TextInput, Image } from 'react-native';
import GradientText from './components/GradientText';
import { supabase } from './lib/supabase';
// import { Input, InputField } from '../../components/ui/input';
// import { Button, ButtonText } from '../../components/ui/button';
import { useRouter } from 'expo-router';


export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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
		router.navigate('./tabs/HomeScreen');
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
			<View style={{ position: 'absolute', top: 100 }}>
				<Image
					source={{ uri: 'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/public/images//logo.png' }}
					style={{ width: 186, height: 186 }}
					resizeMode="contain" // or 'cover', 'stretch', etc.
				/>
			</View>
			<View style={{ position: 'relative', top: -70, left: -12 }}>
				<Text style={styles.phrase}>
					Get into the{'\n'}rhythm of{' '}
				</Text>
				<GradientText text="learning" />
			</View>
			<View style={styles.bottom}>
				<View style={styles.fields}>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="Enter email"
						placeholderTextColor="#999"
					/>
					<View style={styles.passwordContainer}>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="Password"
						placeholderTextColor="#999"
						secureTextEntry={!showPassword}
					/>
					<TouchableOpacity
						style={styles.eyeIcon}
						onPress={() => setShowPassword(!showPassword)}
					>
						<Text style={{ color: '#999' }}>
						{showPassword ? '🙈' : '👁️'}
						</Text>
					</TouchableOpacity>
					</View>
					<TouchableOpacity>
						<Text style={styles.forgot}>Forgot Password</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.button} onPress={() => signInWithEmail()}>
					<Text style={styles.buttonText}>Start Listening</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1E1E1E'
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
		gap: 100,
		position: 'absolute',
		bottom: 100,
		left: 0,
		right: 0,
	},
	button: {
		display: 'flex',
		width: 160,
		height: 42,
		paddingVertical: 0,         // --Spacing-0
		paddingHorizontal: 12,      // --Spacing-7
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
		fontStyle: 'normal',      // optional, this is the default
		fontWeight: '500',        // must be a string in React Native
		lineHeight: 17,           
	},
	input: {
		display: 'flex',               // optional; RN uses flex by default
		width: 313,
		height: 53,
		paddingVertical: 0,           // --Spacing-0
		paddingHorizontal: 12,        // --Spacing-3
		alignItems: 'center',
		gap: 8,                        // --Spacing-2 (works in RN 0.71+)
		flexShrink: 0,
		borderRadius: 8,              // --Border-radius-lg
		borderWidth: 2,
		borderColor: 'rgba(132, 42, 247, 0.7)',
		opacity: 0.7,
		color: '#FFF',
	},
	fields: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
	forgot: {
		overflow: 'hidden',
		color: 'rgba(255, 255, 255, 0.5)',
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',       // optional (default)
		fontWeight: '400',
		lineHeight: 21,
	},
	phrase: {
		width: 283,
		flexShrink: 0,
		color: 'rgba(142, 141, 141, 0.81)',
		fontFamily: 'Roboto',
		fontSize: 48,
		fontStyle: 'normal',   // optional (default)
		fontWeight: '600',     // must be a string
		lineHeight: 48,

	},
	learning: {

	},
	passwordContainer: {
		position: 'relative',
		width: 313,
	  },
	  
	  eyeIcon: {
		position: 'absolute',
		right: 12,
		top: 15,
	  },
});
