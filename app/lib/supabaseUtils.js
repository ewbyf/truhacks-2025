import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer'

const generateFileName = (fileUri) => {
	const extension = fileUri.split('.').pop().split('?')[0];
	return `${uuidv4()}.${extension}`;
};

// Tag set to its URL
const tag_URL = {
	algebra:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Algebra.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9BbGdlYnJhLnBuZyIsImlhdCI6MTc0MjY4MDIwMSwiZXhwIjozMTU1MzExMTQ0MjAxfQ.3gtE7knLAwRKEAyMDczf4zHxN7qYiTLoEoW1pji8r4U',
	coding: 'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Coding.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9Db2RpbmcucG5nIiwiaWF0IjoxNzQyNjgwMjE1LCJleHAiOjMxNTUzMTExNDQyMTV9.JqzDafvJ33YTtOMJYOKuKshJiPHoy_rBzfxyHqm79RY',
	economics:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Economics.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9FY29ub21pY3MucG5nIiwiaWF0IjoxNzQyNjgwMjMyLCJleHAiOjMxNTUzMTExNDQyMzJ9.b476cCtBQ6buD_rGUcQa5YOP5z2sQLUjgT_3w4TRWF4',
	geography:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Geography.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9HZW9ncmFwaHkucG5nIiwiaWF0IjoxNzQyNjgwMjQyLCJleHAiOjMxNTUzMTExNDQyNDJ9.Ak1xWL3kj52w7IUCKuta_tJoR-Ud79p3lZcTHISlxX8',
	geometry:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Geometry.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9HZW9tZXRyeS5wbmciLCJpYXQiOjE3NDI2ODAyNTMsImV4cCI6MzE1NTMxMTE0NDI1M30.506A286-mh6zmT-unuv0mRdW7YpwFNVi1BN1VyduTYk',
	history:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/History.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9IaXN0b3J5LnBuZyIsImlhdCI6MTc0MjY4MDI2MywiZXhwIjozMTU1MzExMTQ0MjYzfQ.Kv9YZOHswDq7LEQYsZieKFtn6-hEOufxmJT5PUnkixg',
	physics:
		'https://vwqokxwilhvpiybjgsbt.supabase.co/storage/v1/object/sign/song-cover-art/Physics.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb25nLWNvdmVyLWFydC9QaHlzaWNzLnBuZyIsImlhdCI6MTc0MjY4MDI3NiwiZXhwIjozMTU1MzExMTQ0Mjc2fQ.1OeJfXEE5xZVMDPO7lDwnlzrFxKndAjhVCeDxMMm2Y0',
};

export const createNewSong = async (songName, userId, tag, genre, coverArt = null, songURL) => {
	if (coverArt) {
		// create file names for the cover art files
		const coverArtFileName = generateFileName(coverArt);

		// Upload Cover Art image file
		const { data: imageData, error: imageError } = await supabase.storage.from('song-cover-art').upload(coverArtFileName, coverArt, {
			contentType: 'mimeType',
		});

		if (imageError) {
			throw imageError;
		}

		// Get public URL for the uploaded image file
		const { data: imageURL, error: imageURLError } = supabase.storage.from('song-cover-art').getPublicUrl(coverArtFileName);

		if (imageURLError) {
			throw imageURLError;
		}

		// 3. Insert a new row in the songs table with the provided metadata and the file URL
		const { data, error } = await supabase
			.from('songs')
			.insert([
				{
					cover_art: imageURL,
					tag: tag,
					name: songName,
					song_file: songURL,
					user_id: userId,
				},
			])
			.select()
			.single();

		if (error) {
			throw error;
		}

		return data;
	} else {
		// use one of the preset images from bucket dependign on tag

		const imageURL = tag_URL[tag];
		// 3. Insert a new row in the songs table with the provided metadata and the file URL
		const { data, error } = await supabase
			.from('songs')
			.insert([
				{
					cover_art: imageURL,
					tag: tag,
					name: songName,
					genre: genre,
					song_file: songURL,
					user_id: userId,
				},
			])
			.select()
			.single();
		if (error) {
			throw error;
		}

		return data;
	}
};

export const createNewPlaylist = async (userId, playlistName, coverArt, coverArtFileName) => {

	const { data: uploadData, error: uploadError } = await supabase.storage.from('playlist-cover-art').upload(coverArtFileName,         decode(coverArt), {
		contentType: 'image/jpeg',
	});

	if (uploadError) {
		throw uploadError;
	}

	const { data: imageURL, error: imageURLError } = supabase.storage.from('playlist-cover-art').getPublicUrl(coverArtFileName);

	if (imageURLError) {
		throw imageURLError;
	}

	const { data: playlistData, error: insertError } = await supabase
		.from('playlists')
		.insert([
			{
                user_id: userId,
				name: playlistName,
				cover_art: imageURL.publicUrl,
			},
		])
		.select()
		.single();

	console.log('data:', playlistData);
	console.log('err:', insertError);

	if (insertError) {
		throw insertError;
	}

	return playlistData;
};

export const addSongToPlaylist = async (songID, playlistID) => {
	const { data: songPlaylistData, error: insertError } = supabase
		.from('playlist_songs')
		.insert([
			{
				song_id: songID,
				playlist_id: playlistID,
			},
		])
		.single();

	if (insertError) {
		throw insertError;
	}
};

// gets all the user's playlists
export const getPlaylists = async (userID) => {
	const { data, error } = await supabase.from('playlists').select('*').eq('user_id', userID);

	if (error) {
		throw error;
	}

	return data;
};

// gets all playlists that dont belong to the current user (for exploring new playlists)
export const getExplorePlaylists = async (userID) => {
	const { data, error } = await supabase
		.from('playlists')
		.select('*')
		.neq('user_id', userID);

		if (error) {
			throw error;
		}

		return data;
}

// gets all users songs in order of datecreated
export const getSongs = async (userID) => {
	const { data, error } = await supabase.from('songs').select('*').eq('user_id', userID).order('created_at', { ascending: true });

	if (error) {
		throw error;
	}

	return data;
};

// gets all songs in a playlist
export const getPlaylistSongs = async (playlistID) => {
	const { data, error } = await supabase
		.from('playlist_songs')
		.select(
			`
            song_id,
            songs (*)
        `)
        .eq('playlist_id', playlistID);

	if (error) {
		throw error;
	}

	const songs = data.map((row) => row.songs);

	return songs;
};

export const addSongsToPlaylist = async (song_ids, playlistID) => {

	const rowsToInsert = song_ids.map((songId) => ({
		song_id: songId,
		playlist_id: playlistID,
	}));
	
	const { data, error } = await supabase
        .from('playlist_songs')
        .insert(rowsToInsert);

    if (error) {
        console.error('Error inserting rows:', error);
		throw error;
    }

	return data;
}

export const setPlaylistSongCount = async (id, number) => {
	const { data, error } = await supabase
		.from('playlists')
		.update({ num_songs: number }) // update this to your column name
		.eq('id', id); // filter by ID

	if (error) {
		throw error;
	}

	return data;

}
