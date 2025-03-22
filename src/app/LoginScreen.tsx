// import React, { useState } from 'react';
// import { Alert, StyleSheet, View } from 'react-native';
// import { supabase } from '../lib/supabase';
// import { Input, InputField } from '../components/ui/input';
// import { Button, ButtonText } from '../components/ui/button';

// export default function Auth() {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [loading, setLoading] = useState(false);

// 	async function signInWithEmail() {
// 		setLoading(true);
// 		supabase.auth.signInWithPassword({
// 			email: email,
// 			password: password,
// 		})
//         .then((resp) => {
//             Alert.alert('yay')
//             console.log(resp.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })

// 		setLoading(false);
// 	}

// 	async function signUpWithEmail() {
// 		setLoading(true);
// 		const {
// 			data: { session },
// 			error,
// 		} = await supabase.auth.signUp({
// 			email: email,
// 			password: password,
// 		});

// 		if (error) Alert.alert(error.message);
// 		if (!session) Alert.alert('Please check your inbox for email verification!');
// 		setLoading(false);
// 	}

// 	return (
// 		<View style={styles.container}>
// 			<View style={[styles.verticallySpaced, styles.mt20]}>
// 				<Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
// 					<InputField value={email} placeholder="email@address.com" autoCapitalize={'none'} onChangeText={(text) => setEmail(text)} />
// 				</Input>
// 			</View>
// 			<View style={styles.verticallySpaced}>
// 				<Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
// 					<InputField
// 						onChangeText={(text) => setPassword(text)}
// 						value={password}
// 						secureTextEntry={true}
// 						placeholder="Password"
// 						autoCapitalize={'none'}
// 					/>
// 				</Input>
// 			</View>
// 			<View style={[styles.verticallySpaced, styles.mt20]}>
// 				<Button size="md" variant="solid" action="primary" onPress={() => signInWithEmail()}>
// 					<ButtonText>Sign in</ButtonText>
// 				</Button>
// 			</View>
// 			<View style={styles.verticallySpaced}>
//                 <Button size="md" variant="solid" action="primary" onPress={() => signUpWithEmail()}>
// 					<ButtonText>Sign up</ButtonText>
// 				</Button>
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: 40,
// 		padding: 12,
// 	},
// 	verticallySpaced: {
// 		paddingTop: 4,
// 		paddingBottom: 4,
// 		alignSelf: 'stretch',
// 	},
// 	mt20: {
// 		marginTop: 20,
// 	},
// });
