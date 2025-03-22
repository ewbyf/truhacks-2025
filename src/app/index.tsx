
import { useRouter } from 'expo-router';

import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import { View, Text, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { Button, ButtonText } from '@/components/ui/button';


export default function Page() {
	const router = useRouter();

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

	return (
		<SafeAreaView className="flex justify-center items-center h-full">
             <Auth />
             {session && session.user && <Text>{session.user.id}</Text>}
			<Button onPress={() => router.navigate('/LoginScreen')}>
				<ButtonText>go forward</ButtonText>
			</Button>
		</SafeAreaView>
	);
}
