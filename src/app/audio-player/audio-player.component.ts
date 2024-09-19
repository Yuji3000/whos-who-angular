import {Component, Input, OnDestroy} from '@angular/core';
import { AudioPlayerService } from 'src/services/audio-player.service';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [MatIcon, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent implements OnDestroy {

  @Input()
  set audioSrc(newSrc: string) {
    this.stopAudio();
    this.audioPlayerService.loadAudio(newSrc);
    this.playAudio();
  }

  songPlaying: boolean = true;

  constructor(private audioPlayerService: AudioPlayerService) {}
  
  playAudio() {
    this.audioPlayerService.play().then(() => {
      this.songPlaying = true;
    })
  }

  pauseAudio() {
    this.audioPlayerService.pause();
    this.songPlaying = false
  }

  stopAudio() {
    this.audioPlayerService.stop();
    this.songPlaying = false
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }
}
