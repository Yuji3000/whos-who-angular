import { Injectable } from '@angular/core';
import {ApiTokenService} from "../api-token/api-token.service";
import fetchFromSpotify from "../api";

export type TrackWithMeta = {
  track: Track,
  index: number
}

export type Track = {
  explicit: boolean,
  name: string,
  preview_url: string,
  id: string
}

type TrackItem = {
  track: Track;
}

type PlaylistTrackResponse = {
  items: TrackItem[],
  next: string,
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private readonly playlistId = '0LsqrdTvD8RmhccowvjoKz'
  private readonly cleanPlaylistId = '4raGEGV7j9SgrAqlXS43uO'

  private readonly queryParams = {
    limit: 1,
    market: 'US',
    fields: 'items(track(id,preview_url,explicit,name)),total,next'
  }

  constructor(private tokenService: ApiTokenService) { }

  private createPlaylistTrackEndpoint(allowExplicit = false) {
    const id = allowExplicit ? this.playlistId : this.cleanPlaylistId;

    return `playlists/${id}/tracks`
  }

  private queryParamsWithOffset(offset: number) {
    return {
      ...this.queryParams,
      offset
    }
  }

  private async getTotalTracks(token: string): Promise<number> {
    const response = await fetchFromSpotify({
      token,
      endpoint: this.createPlaylistTrackEndpoint(),
      params: this.queryParams
    });
    return response.total;
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
    const token = await this.tokenService.token;

    const totalTracks = await this.getTotalTracks(token.value);

    const randomIndex = this.generateRandomIndex(totalTracks, ignoreIndices);

    return await fetchFromSpotify({
      token: token.value,
      endpoint: this.createPlaylistTrackEndpoint(),
      params: this.queryParamsWithOffset(randomIndex)
    }).then((response: PlaylistTrackResponse) => ({
      track: response.items[0].track,
      index: randomIndex
    }))
  }
}