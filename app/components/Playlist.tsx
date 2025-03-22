import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

type PlaylistProps = {
  id: string;
  name: string;
  image: string;
};

const Playlist = ({ id, name, image }: PlaylistProps) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.artwork} source={{ uri: image }} />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity>
              <Icon name="add" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
  name: {
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
