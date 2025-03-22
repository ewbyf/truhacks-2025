import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

const generateFileName = (fileUri) => {
    const extension = fileUri.split('.').pop().split('?')[0];
    return `${uuidv4()}.${extension}`;
};

export const createNewSong = async (
    songName,
    userId,
    tag,
    coverArt,
    mp3FilePath,
) => {

    // create file names for the song and cover art files
    const songFileName = generateFileName(mp3FilePath)
    const coverArtFileName = generateFileName(coverArt)

    // 1. Upload song MP3 file
    const { data: mp3Data, error: mp3Error } = await supabase.storage
        .from('song-files')
        .upload(songFileName, mp3FilePath, {
            contentType: 'audio/mpeg',
        });

    if (mp3Error) {
        throw mp3Error;
    }

    // Upload Cover Art image file
    const { data: imageData, error: imageError } = await supabase.storage
        .from('song-cover-art')
        .upload(coverArtFileName, coverArt, {
            contentType: 'mimeType'
        });

    if (imageError) {
        throw imageError;
    }

    // 2. Get public URL for the uploaded MP3 file
    const { data: songURL, error: songURLError } = supabase.storage
        .from('song-files')
        .getPublicUrl(songFileName);

    if (songURLError) {
        throw songURLError;
    }

    // Get public URL for the uploaded image file
    const { data: imageURL, error: imageURLError } = supabase.storage
        .from('song-cover-art')
        .getPublicUrl(coverArtFileName);

    if (imageURLError) {
        throw imageURLError;
    }

    // 3. Insert a new row in the songs table with the provided metadata and the file URL
    const { data: songData, error: songInsertError } = await supabase
        .from('songs')
        .insert([
            {
                cover_art: imageURL,
                tag: tag,
                name: songName,
                song_file: songURL,
                user_id: userId,
            }
        ])
        .single();

    if (songInsertError) {
        throw songInsertError;
    }

    return songData;
};

export const createNewPlaylist = async (
    playlistName,
    coverArt
) => {

    const coverArtFileName = generateFileName(coverArt);
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('playlist-cover-art')
        .upload(coverArtFileName, coverArt, {
            contentType: 'mimeType',
        });
    
        if (uploadError) {
            throw uploadError;
        }

    const { data: imageURL, error: imageURLError } = supabase.storage
        .from('playlist-cover-art')
        .getPublicUrl(coverArtFileName);

    if (imageURLError) {
        throw imageURLError;
    }

    const { data: playlistData, error: insertError } = supabase
        .from('playlists')
        .insert([
            {
                name: playlistName,
                cover_art: imageURL,
            }
        ])
        .single();

    if (insertError) {
        throw insertError;
    }

    return playlistData;
}

export const addSongToPlaylist = async (
    songID,
    playlistID
) => {

    const { data: songPlaylistData, error: insertError } = supabase
        .from('playlist_songs')
        .insert([
            {
                song_id: songID,
                playlist_id: playlistID,
            }
        ])
        .single();

    if (insertError) {
        throw insertError;
    }
}

// gets all the user's playlists
export const getPlaylists = async (userID) => {
    const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('user_id', userID);

    if (error) {
        throw error;
    }

    return data;
}

// gets all users songs in order of datecreated
export const getRecentSongs = async (userID) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', userID)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}

// gets all songs in a playlist
export const getPlaylistSongs = async (playlistID) => {
    const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
            song_id,
            songs (*)
        `)
        .eq('playlist_id', playlistId);

    if (error) {
        throw error;
    }

    // `data` is an array of objects like:
    // [
    //   {
    //     song_id: 1,
    //     songs: { id: 1, name: "Song Name", ... }
    //   },
    //   ...
    // ]
    //
    // Extract just the `songs` object from each row:
    const songs = data.map((row) => row.songs);

    return songs;
}