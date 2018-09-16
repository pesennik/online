export interface Song {
    id: string,
    title: string
    content: string
}

export interface SongCollection {
    id: string,
    title: string
    songIds: string[],
    author: string,
    composer: string
}

export interface Pesennik {
    collections: SongCollection[]
    songs: { [songId: string]: Song }
}
