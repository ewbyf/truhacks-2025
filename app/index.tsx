import 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

import { View, Text, SafeAreaView } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';

export default function Page() {
	const router = useRouter();
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		//   supabase.auth.onAuthStateChange((_event, session) => {
		//     setSession(session)
		//   })
	}, []);

	if (loading) {
		return null;
	}

	if (session != null && session.user != null) {
		return <Redirect href="./tabs/HomeScreen"></Redirect>;
	}

	return <Redirect href="./LoginScreen"></Redirect>;
}
