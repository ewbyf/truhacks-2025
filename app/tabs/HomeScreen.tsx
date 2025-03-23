import BottomPlayer from '../components/BottomPlayer';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';

import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import RecentSong from '../components/RecentSong';
import TrendingGrid from '../components/TrendingGrid';
import LogoSmall from '../components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
	const width = Dimensions.get('window').width;
	const router = useRouter();

    const { id } = useContext(UserContext)

    useEffect(() => {
        console.log(id)
    }, [])

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 80 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall />
					<TouchableOpacity
						onPress={() => {
                            AsyncStorage.removeItem('token')
							supabase.auth.signOut();
							router.push('/');
						}}
                        style={{flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#323232', padding: 10, borderRadius: 10}}
					>
						<Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign out</Text>
                        <Icon name="logout" size={20} color="white"></Icon>
					</TouchableOpacity>
				</View>
				<Text style={styles.title}>Home</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{ display: 'flex', paddingTop: 8, paddingBottom: 25, width: width }}
					contentContainerStyle={{ gap: 20, paddingRight: 40 }}
				>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/300' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/302' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/303' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/304' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
				</ScrollView>
				<Text style={styles.subtitle}>Trending topics</Text>
				<TrendingGrid />
				<Text style={styles.subtitle}>Explore</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{ display: 'flex', paddingTop: 8, paddingBottom: 25, width: width }}
					contentContainerStyle={{ gap: 20, paddingRight: 40 }}
				>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/105' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/101' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/102' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 100, height: 100, borderRadius: 15 }}>
						<Image source={{ uri: 'https://picsum.photos/103' }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
					</TouchableOpacity>
				</ScrollView>
				<Text style={styles.subtitle}>Recently played</Text>
				<View style={styles.recentSongs}>
					<RecentSong></RecentSong>
					<RecentSong></RecentSong>
					<RecentSong></RecentSong>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'white',
	},
	subtitle: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white',
	},
	recentSongs: {
		paddingVertical: 10,
		display: 'flex',
		gap: 10,
	},
});
