import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

type SongProps = {
  title: string;
  artist: string;
  image: string;
  audioUri: string;
};

const Song = ({ title, artist, image, audioUri }: SongProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
    };

    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, [audioUri]);

  const playSound = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.artwork} source={{ uri: image }} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity>
            <Icon name="add" color="white" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            <Icon name={isPlaying ? 'pause' : 'play'} color="white" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width: '100%',
    backgroundColor: '#626262',
    borderRadius: 10,
  },
  artwork: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artist: {
    color: 'gray',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 10,
  },
});

export default Song;
