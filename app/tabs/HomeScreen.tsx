import BottomPlayer from '../components/BottomPlayer';
// import { Button, ButtonText } from '../components/ui/button';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';

import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

export default function HomeScreen() {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.container}>
			<Text>Home</Text>
			<TouchableOpacity
				onPress={() => {
					supabase.auth.signOut();
					router.push('/');
				}}
			>
				<Text>Sign out</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					supabase.auth.signOut();
					router.push('/');
				}}
			>
				<Text>Sign out</Text>
			</TouchableOpacity>
			<BottomPlayer />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    backgroundColor: 'gray',
		justifyContent: 'flex-end',
	},
});
