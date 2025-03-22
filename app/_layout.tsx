import { Slot } from 'expo-router';
import 'react-native-url-polyfill/auto';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';

export default function Layout() {
	return (
		<View style={{ flex: 1}}>
			<Slot />
			<Toast></Toast>
		</View>
	);
}
