import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import TrendingGrid from '../components/TrendingGrid';
import LogoSmall from '../components/svgs/LogoSmall';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import SongComponent from '../components/SongComponent';
import HomePageBG from '../components/svgs/HomePageBG';

export default function HomeScreen() {
	const width = Dimensions.get('window').width;
	const router = useRouter();

	const { id, songs } = useContext(UserContext);

	useEffect(() => {
		console.log(id);
		// get users playlist to display at the top
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={[StyleSheet.absoluteFill]}>
				<HomePageBG width="100%" height="100%" />
			</View>
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
								<Image source={{ uri: 'https://picsum.photos/105' }} style={{ height: 100, width: 100, borderRadius: 15 }} />
								<View style={{ alignItems: 'flex-start', justifyContent: 'center', gap: 10 }}>
									<Text style={{ color: '#D0D0D0', fontWeight: 600, fontSize: 18 }}>GOATED PLAYLIST</Text>
									<View style={styles.tag}>
										<Text style={{ color: 'white', fontSize: 12 }}>Pop</Text>
									</View>
								</View>
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
					</View>
					<View>
						<Text style={styles.subtitle}>Recently Added</Text>
						<View style={styles.recentSongs}>
							{songs.map((song) => (
								<SongComponent song={song} />
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
