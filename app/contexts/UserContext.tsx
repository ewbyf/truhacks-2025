import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Song } from '../interfaces/Song';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecentSongs } from '../lib/supabaseUtils'

interface UserContextType {
	id: string;
	songs: Song[];
	setSongs: (songs: Song[]) => void;
	currentSong: Song;
	setCurrentSong: (currentSong: Song) => void;
	queue: Song[];
	setQueue: (queue: Song[]) => void;
}

export const UserContext = createContext<UserContextType>({
	id: '',
	songs: [],
	setSongs: () => {},
	currentSong: {
		id: 0,
		created_at: new Date(),
		cover_art: '',
		tag: '',
		name: '',
		song_file: '',
		user_id: 0,
        genre: ''
	},
	setCurrentSong: () => {},
	queue: [],
	setQueue: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState<string>('');
	const [songs, setSongs] = useState<Song[]>([]);
	const [currentSong, setCurrentSong] = useState<Song>({
		id: 0,
		created_at: new Date(),
		cover_art: '',
		tag: '',
		name: '',
		song_file: '',
		user_id: 0,
        genre: '',
	});
	const [queue, setQueue] = useState<Song[]>([]);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				setId(token);
                getRecentSongs(token)
                .then((resp) => {
                    setSongs(resp)
                })
                .catch((err) => {
                    console.log(err)
                })
			}
		};
        fetchToken();
	}, []);

	return <UserContext.Provider value={{ id, songs, setSongs, currentSong, setCurrentSong, queue, setQueue }}>{children}</UserContext.Provider>;
};
