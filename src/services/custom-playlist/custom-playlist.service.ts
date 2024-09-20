import {Injectable} from '@angular/core';
import {ApiTokenService, Token} from "../api-token/api-token.service";
import fetchFromSpotify, {request} from "../api";
import {PlaylistTrackResponse, Track, TrackItem, TrackWithMeta} from "../playlist/playlist.service";
import {Playlist} from "../playlist/playlist.interface";

export type PlaylistResponse = {
  id: string,
  name: string,
  tracks: PlaylistTrackInfo,
  external_urls: PlaylistExternalUrls
}

export type PlaylistTrackInfo = {
  total: number
}

export type PlaylistExternalUrls = {
  spotify: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomPlaylistService implements Playlist {

  private _trackLimit = 50;

  private readonly playlistQueryParams = {
    market: 'US',
    fields: 'id,name,tracks(total),total,next,uri'
  }

  private readonly trackQueryParams = {
    limit: this._trackLimit,
    market: 'US',
    fields: 'items(track(id,preview_url,explicit,name)),total,next'
  }

  // Defaults to our clean playlist id
  private _playlistId: string = '4raGEGV7j9SgrAqlXS43uO';
  private _playlistResponse: Partial<PlaylistResponse> = {};
  private _allowExplicit = false;

  private _playlistFound = false;

  private _playlistLoadingProgress = 0;
  private _playlistLoaded = false;

  private _playlistSavingProgress = 0;
  private _playlistSaved = false;

  private _tracks: Track[] = []
  private _tracksNotExplicit: Track[] = []
  private _tracksIgnored: Track[] = []

  constructor(private tokenService: ApiTokenService) {
    this._tracks = JSON.parse(localStorage.getItem('tracks') ?? '[]') ?? [];
    this._tracksNotExplicit = JSON.parse(localStorage.getItem('tracksNotExplicit') ?? '[]') ?? [];
    this._tracksIgnored = JSON.parse(localStorage.getItem('tracksIgnored') ?? '[]') ?? [];
    this._playlistResponse = JSON.parse(localStorage.getItem('playlistResponse') ?? '{}') ?? {};

    if (localStorage.getItem('playlistSavedTime')) {
      this._playlistFound = true;
      this._playlistSaved = true;
      this._playlistLoaded = true;
    }
  }

  /**
   * Extracts the playlist id from the playlist URL
   *
   * @param playlistUrl a URL of the form https://open.spotify.com/playlist/{playlistId}?si=29c383md74f34580
   */
  set playlistId(playlistUrl: string) {
    const regex = /playlist\/([a-zA-Z0-9]+)/;

    const match = playlistUrl.match(regex);

    if (match && match[1]) {
      this._playlistId = match[1];
    } else {
      throw new Error("Invalid playlist URL. Make sure this URL links to your Spotify playlist");
    }
  }

  get playlistFound() {
    return this._playlistFound;
  }

  get totalTracks() {
    return this._playlistResponse.tracks?.total;
  }

  get playlistResponse() {
    return { ...this._playlistResponse }
  }

  get playlistLoadingProgress() {
    return this._playlistLoadingProgress;
  }

  get playlistLoaded() {
    return this._playlistLoaded;
  }

  private incrementPlaylistLoadingProgress() {
    this._playlistLoadingProgress += (this._trackLimit / this.totalTracks!) * 100;
  }

  get playlistSavingProgress() {
    return this._playlistSavingProgress;
  }

  get playlistSaved() {
    return this._playlistSaved;
  }

  get tracks() {
    return this._tracks;
  }

  get tracksNotExplicit() {
    return this._tracksNotExplicit;
  }

  get tracksIgnored() {
    return this._tracksIgnored;
  }

  private incrementPlaylistSavingProgress() {
    this._playlistSavingProgress += 33;
  }

  private createPlaylistEndpoint() {
    return `playlists/${this._playlistId}`
  }

  private createPlaylistTracksEndpoint() {
    return `${this.createPlaylistEndpoint()}/tracks`
  }

  private async getTotalTracks(token?: Token): Promise<void> {
    if (!token) {
      token = await this.tokenService.token;
    }

    this._playlistResponse = await fetchFromSpotify({
      token: token.value,
      endpoint: this.createPlaylistEndpoint(),
      params: this.playlistQueryParams
    });

    localStorage.setItem('playlistResponse', JSON.stringify(this._playlistResponse));

    this._playlistFound = true;
  }

  resetValues() {
    this._playlistFound = false;

    this._playlistLoaded = false;
    this._playlistLoadingProgress = 0;

    this._playlistSaved = false;
    this._playlistSavingProgress = 0;
  }

  async loadPlaylist(): Promise<void> {
    this.resetValues();
    await this.getTotalTracks();

    let response =
        await this.fetchTracks(this.createPlaylistTracksEndpoint(), this.trackQueryParams);

    const tracks: Track[] = [];
    const tracksNotExplicit: Track[] = [];
    const tracksIgnored: Track[] = [];

    this.addTracks(tracks, tracksNotExplicit, tracksIgnored, response.items);
    this.incrementPlaylistLoadingProgress();

    while (response.next !== null) {
      response = await this.fetchTracks(response.next);
      this.addTracks(tracks, tracksNotExplicit, tracksIgnored, response.items);
      this.incrementPlaylistLoadingProgress();
    }

    this._playlistLoaded = true;
    this.savePlaylist(tracks, tracksNotExplicit, tracksIgnored);

    return Promise.resolve();
  }

  savePlaylist(tracks: Track[], tracksNotExplicit: Track[], tracksIgnored: Track[]) {
    localStorage.setItem('tracks', JSON.stringify(tracks));
    this.incrementPlaylistSavingProgress();

    localStorage.setItem('tracksNotExplicit', JSON.stringify(tracksNotExplicit));
    this.incrementPlaylistSavingProgress();

    localStorage.setItem('tracksIgnored', JSON.stringify(tracksIgnored));
    this.incrementPlaylistSavingProgress();

    this._tracks = tracks;
    this._tracksNotExplicit = tracksNotExplicit;
    this._tracksIgnored = tracksIgnored;

    localStorage.setItem('playlistSavedTime', JSON.stringify(Date.now()));

    this._playlistSaved = true;
  }

  async fetchTracks(url: string, params?: Object): Promise<PlaylistTrackResponse> {
    const token = await this.tokenService.token;

    if (url.startsWith('http')) {
      const options = { headers: { Authorization: `Bearer ${token.value}` } };
      return await request(url, options);
    } else {
      return await fetchFromSpotify({
        token: token.value,
        endpoint: url,
        params
      });
    }
  }

  private addTracks(tracks: Track[], tracksNotExplicit: Track[], tracksIgnored: Track[], tracksToAdd: TrackItem[]) {
    for (const trackItem of tracksToAdd) {
      const track = trackItem.track;

      if (track === null) continue;

      if (track.preview_url === null) {
        console.log("Track is null", track);
        tracksIgnored.push(track);
        continue;
      } else if (!track.explicit) {
        tracksNotExplicit.push(track);
      }

      tracks.push(track);
    }
  }

  private generateRandomIndex(totalIndices: number, ignoreIndices?: Set<number>): number {
    if (!ignoreIndices) {
      return Math.round(Math.random() * totalIndices);
    }

    if (totalIndices == ignoreIndices.size) {
      console.warn("Length of indices set equals upper bound, returning 0");
      return 0;
    }

    // Try random selection for a few times
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * totalIndices);
      if (!ignoreIndices.has(randomIndex)) {
        return randomIndex;
      }
    }

    // Fallback to building a valid indices array
    const validIndices = [];
    for (let i = 0; i < totalIndices; i++) {
      if (!ignoreIndices.has(i)) {
        validIndices.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * validIndices.length);
    return validIndices[randomIndex];
  }

  public async getRandomTrackFromPlaylist(ignoreIndices?: Set<number>): Promise<TrackWithMeta> {
    const length = this._allowExplicit ? this.tracks.length : this.tracksNotExplicit.length;
    const randomIndex = this.generateRandomIndex(length, ignoreIndices);

    return {
      track: this._allowExplicit ? this.tracks[randomIndex] : this.tracksNotExplicit[randomIndex],
      index: randomIndex
    }
  }

  set allowExplicit(allow: boolean) {
    this._allowExplicit = allow;
  }
}
