import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

type PlaylistLibraryProps = {
    id: number;
    name: string;
    image: string;
};

const PlaylistLibrary = ({ id, name, image }: PlaylistLibraryProps) => {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.createContainer}
            onPress={() => {
                router.push(`/tabs/library/playlist/${id}`);
            }}
        >
            <Image source={{ uri: image }} style={{ height: 75, width: 75 }} />
            <Text style={styles.playlistTitle}>{name}</Text>
        </TouchableOpacity>
    );
}

export default PlaylistLibrary;

const styles = StyleSheet.create({
    createContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
    playlistTitle: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'medium',
	},
});