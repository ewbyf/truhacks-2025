import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

type PlaylistProps = {
  title: string;
  tag: string;
  image: string;
};

const Playlist = ({ title, tag, image }: PlaylistProps) => {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.artwork} source={{ uri: image }} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity>
            <Icon name="add" color="white" size={30} />
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
    width: 75,
    height: 75,
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
  controls: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 10,
  },
});

export default Playlist;
