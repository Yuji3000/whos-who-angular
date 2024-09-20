import {TrackWithMeta} from "./playlist.service";

export interface Playlist {
    getRandomTrackFromPlaylist(ignoreIndices?: Set<number>): Promise<TrackWithMeta>;

    set allowExplicit(allow: boolean);
}