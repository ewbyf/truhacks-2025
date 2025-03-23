import 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { useState, useEffect } from 'react';

import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState('');

	useEffect(() => {
		const fetchToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				setToken(token);
			}
            setLoading(false);
		};
		fetchToken();
	}, []);

	if (loading) {
		return null;
	}

	if (token != '') {
		return <Redirect href="./tabs/HomeScreen"></Redirect>;
	}

	return <Redirect href="./LoginScreen"></Redirect>;
}
