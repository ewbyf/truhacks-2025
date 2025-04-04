import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import TrendingGrid from '../components/TrendingGrid';
import LogoSmall from '../components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import SongComponent from '../components/SongComponent';

import { getPlaylists, getExplorePlaylists } from '../lib/supabaseUtils';
import GreenDiamondBG from '../components/svgs/GreenDiamondBG';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
	const [playlists, setPlaylists] = useState<any[]>([]);
	const [explorePlaylists, setExplorePlaylists] = useState<any[]>([]);
	const width = Dimensions.get('window').width;
	const router = useRouter();

	const { id, songs } = useContext(UserContext);

	useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const data = await getPlaylists(id); // Await the promise
                setPlaylists(data); // Set state with the resolved data
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

		const fetchExplorePlaylists = async () => {
			try {
                const exploreData = await getExplorePlaylists(id); // Await the promise
                setExplorePlaylists(exploreData); // Set state with the resolved data
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
		};

        fetchPlaylists();
		fetchExplorePlaylists();
    }, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* <View style={[StyleSheet.absoluteFill]}>
				<HomePageBG width="100%" height="100%" />
			</View> */}
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 80 }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<LogoSmall />
					<TouchableOpacity
						onPress={() => {
							AsyncStorage.removeItem('token');
							supabase.auth.signOut();
							router.push('/');
						}}
						style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#323232', padding: 10, borderRadius: 10 }}
					>
						<Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Sign out</Text>
						<Icon name="logout" size={16} color="white"></Icon>
					</TouchableOpacity>
				</View>
				<View style={{ gap: 15 }}>
					<View>
						<Text style={styles.subtitle}>Recently Played</Text>
						<TouchableOpacity>
							<LinearGradient colors={['#101010', '#323232']} style={styles.recentPlaylist} start={{ x: 0, y: -0.2 }} end={{ x: 1, y: 1 }}>
								<GreenDiamondBG></GreenDiamondBG>
								<View style={{ alignItems: 'flex-start', justifyContent: 'center', gap: 10 }}>
									<Text style={{ color: '#D0D0D0', fontWeight: 'bold', fontSize: 18 }}>GOATED PLAYLIST</Text>
									<View style={styles.tag}>
										<Text style={{ color: 'white', fontSize: 12 }}>Pop</Text>
									</View>
								</View>
                                <Icon2 name={'play'} color="white" size={30} style={{marginLeft: 'auto', marginVertical: 'auto', marginRight: 10}} />
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<View>
						<Text style={styles.subtitle}>Playlists</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ display: 'flex', width: width }}
							contentContainerStyle={{ gap: 20, paddingRight: 40 }}
						>
							{playlists.map((playlist, index) => (
								<TouchableOpacity key={playlist.id} style={{ width: 100, height: 100, borderRadius: 15 }}
									onPress={() => {
										router.push(`/tabs/library/playlist/${playlist.id}`);
									}}
								>
									<Image source={{ uri: playlist.cover_art }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
					<View>
						<Text style={styles.subtitle}>Trending</Text>
						<TrendingGrid />
					</View>
					<View>
						<Text style={styles.subtitle}>Explore</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{ display: 'flex', width: width }}
							contentContainerStyle={{ gap: 20, paddingRight: 40 }}
						>
							{explorePlaylists.map((playlist, index) => (
								<TouchableOpacity key={playlist.id} style={{ width: 100, height: 100, borderRadius: 15 }}
									onPress={() => {
										router.push(`/tabs/library/playlist/${playlist.id}`);
									}}
								>
									<Image source={{ uri: playlist.cover_art }} style={{ height: '100%', width: '100%', borderRadius: 15 }} />
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
					<View>
						<Text style={styles.subtitle}>Recently Added</Text>
						<View style={styles.recentSongs}>
							{songs.map((song) => (
								<SongComponent key={song.id} song={song} />
							))}
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E', // optional fallback
		position: 'relative',
	},
	subtitle: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 10,
	},
	recentSongs: {
		display: 'flex',
		gap: 10,
	},
	recentPlaylist: {
		backgroundColor: 'gray',
		width: '100%',
		borderRadius: 10,
		padding: 10,
		flexDirection: 'row',
		gap: 10,
	},
	tag: {
		backgroundColor: '#343333',
		borderRadius: 10,
		padding: 5,
		paddingHorizontal: 10,
	},
});
