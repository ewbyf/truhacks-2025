import BottomPlayer from '../components/BottomPlayer';
// import { Button, ButtonText } from '../components/ui/button';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'expo-router';

import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import RecentSong from '../components/RecentSong';
import TrendingGrid from '../components/TrendingGrid';

export default function HomeScreen() {
	const width = Dimensions.get('window').width;
	const router = useRouter();
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
					<Text style={styles.title}>LOGO</Text>
					<TouchableOpacity
						onPress={() => {
							supabase.auth.signOut();
							router.push('/');
						}}
					>
						<Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign out</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.subtitle}>Favorites</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{ display: 'flex', paddingTop: 8, paddingBottom: 25, paddingHorizontal: 20, width: width }}
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
					style={{ display: 'flex', paddingTop: 8, paddingBottom: 25, paddingHorizontal: 20, width: width }}
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
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E1E1E',
	},
	title: {
		fontSize: 44,
		fontWeight: 'bold',
		color: 'white',
	},
	subtitle: {
		fontSize: 28,
		fontWeight: 'medium',
		color: 'white',
		paddingLeft: 20,
	},
	recentSongs: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		display: 'flex',
		gap: 10,
	},
});
