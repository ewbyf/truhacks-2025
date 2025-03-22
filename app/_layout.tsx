
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

export default function Layout() {
	return (
		<GestureHandlerRootView>

				<Slot />

		</GestureHandlerRootView>
	);
}
