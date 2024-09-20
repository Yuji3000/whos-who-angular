import { Component } from '@angular/core';
import {CustomPlaylistService} from "../../services/custom-playlist/custom-playlist.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-playlist-loader',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatProgressBar,
    MatLabel,
    MatError
  ],
  templateUrl: './playlist-loader.component.html',
  styleUrl: './playlist-loader.component.css'
})
export class PlaylistLoaderComponent {

  playlistSubmitted: boolean = false;
  playlistSubmissionSuccessful: boolean = false;
  playlistSubmissionFailed: boolean = false;
  playlistSubmissionError: string = '';

  playlistForm = new FormGroup({
    playlistLink: new FormControl('', [Validators.required])
  })

  constructor(private customPlaylistService: CustomPlaylistService, private settingService: SettingsService) {

  }

  get currentLoadedPlaylistName() {
    return this.customPlaylistService.playlistResponse.name;
  }

  get placeholderUrl() {
    return 'Example: https://open.spotify.com/playlist/0GqhGKrZUX5GGUWOGycYi9';
  }

  get playlistFound() {
    return this.customPlaylistService.playlistFound;
  }

  get playlistFoundText() {
    return this.playlistFound ?
        `Playlist found: ${this.customPlaylistService.playlistResponse.name}`
        : `Looking up playlist...`
  }

  get totalTracks() {
    return this.customPlaylistService.totalTracks;
  }

  get playlistLoaded() {
    return this.customPlaylistService.playlistLoaded;
  }

  get playlistLoadedText() {
    return 'Loading playlist...'
  }

  get totalTracksText() {
    return `Loaded ${this.totalTracks} tracks`
  }

  get playlistTracksText() {
    return `Found ${this.customPlaylistService.tracks.length} with previews`;
  }

  get playlistTracksNonExplicitText() {
    return `${this.customPlaylistService.tracksNotExplicit.length} of those tracks are not explicit`;
  }

  get playlistTracksIgnoredText() {
    return `Unable to use ${this.customPlaylistService.tracksIgnored.length} tracks because they do not have previews`
  }

  get playlistSavedText() {
    return 'Saving playlist...'
  }

  get playlistLoadingProgress() {
    return this.playlistLoaded ? 100
        : this.customPlaylistService.playlistLoadingProgress;
  }

  get playlistSaved() {
    return this.customPlaylistService.playlistSaved;
  }

  get playlistSavingProgress() {
    return this.playlistSaved ? 100
        : this.customPlaylistService.playlistSavingProgress;
  }

  onSubmit() {
    this.playlistSubmitted = true;

    this.customPlaylistService.playlistId = this.playlistForm.value.playlistLink!;
    this.customPlaylistService.loadPlaylist()
        .then(() => {
          this.playlistSubmissionSuccessful = true;
          this.settingService.setCustomPlaylist(true);
        })
        .catch(error => {
          this.playlistSubmissionFailed = true;
          console.error(error);
          this.playlistSubmissionError = error;
        });
  }
}
