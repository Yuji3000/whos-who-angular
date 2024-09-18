import { Component, OnInit } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { MatIcon} from "@angular/material/icon";
import {PlaylistService, Track} from "../../services/playlist/playlist.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import { SettingsComponent } from "../settings/settings.component";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { AudioPlayerComponent } from "../audio-player/audio-player.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatButton,
    MatAnchor,
    MatIcon,
    SettingsComponent,
    RouterLink,
    RouterOutlet,
    AudioPlayerComponent
  ],
})
export class HomeComponent implements OnInit {
  constructor(private playlist: PlaylistService) {}

  ngOnInit(): void {}

  track: Track | undefined;
  loadTrackButtonDisabled = false;

  loadTrack() {
    this.loadTrackButtonDisabled = true;
    this.playlist.getRandomTrackFromPlaylist()
        .then(track => this.track = track)
        .catch(err => console.log(err))
        .finally(() => this.loadTrackButtonDisabled = false);
  }
}
