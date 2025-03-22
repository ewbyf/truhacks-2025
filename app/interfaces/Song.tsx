export interface Song {
    id: number;
    created_at: Date;
    cover_art: string;
    tag: string;
    name: string;
    song_file: string;
    user_id: number;
}