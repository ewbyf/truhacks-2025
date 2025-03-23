import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Song } from '../interfaces/Song';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPlaylists, getSongs } from '../lib/supabaseUtils';
import { PlaylistType } from '../interfaces/PlaylistType';

interface UserContextType {
	id: string;
	songs: Song[];
	setSongs: (songs: Song[]) => void;
	currentSong: Song;
	setCurrentSong: (currentSong: Song) => void;
	queue: Song[];
	setQueue: (queue: Song[]) => void;
	pause: boolean;
	setPause: (pause: boolean) => void;
	position: number;
	setPosition: (position: number) => void;
	currentPlaylist: string;
	setCurrentPlaylist: (currentPlaylist: string) => void;
    playlists: PlaylistType[];
    setPlaylists: (playlist: PlaylistType[]) => void;
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
		genre: '',
	},
	setCurrentSong: () => {},
	queue: [],
	setQueue: () => {},
	pause: true,
	setPause: () => {},
	position: 0,
	setPosition: () => {},
	currentPlaylist: '',
	setCurrentPlaylist: () => {},
    playlists: [],
    setPlaylists: () => {},
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
	const [pause, setPause] = useState<boolean>(true);
	const [position, setPosition] = useState<number>(0);
	const [currentPlaylist, setCurrentPlaylist] = useState<string>('');
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

	useEffect(() => {
		const fetchToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				setId(token);
				getSongs(token)
					.then((resp) => {
						setSongs(resp);
					})
					.catch((err) => {
						console.log(err);
					});
                getPlaylists(token)
                .then((resp) => {
                    setPlaylists(resp);
                })
                .catch((err) => {
                    console.log(err);
                });
			}
		};
		fetchToken();
	}, []);

	return (
		<UserContext.Provider
			value={{
				id,
				songs,
				setSongs,
				currentSong,
				setCurrentSong,
				queue,
				setQueue,
				pause,
				setPause,
				position,
				setPosition,
				currentPlaylist,
				setCurrentPlaylist,
                playlists,
                setPlaylists
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
