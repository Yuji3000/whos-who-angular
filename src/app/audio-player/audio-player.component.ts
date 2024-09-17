import { Component, Input } from '@angular/core';
import { AudioPlayerService } from 'src/services/audio-player.service';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [MatIcon, CommonModule, MatCardModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  @Input() audioSrc?: string;  
  songPlaying: boolean = false;

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngOnInit() {
    if (this.audioSrc) {
      this.audioPlayerService.loadAudio(this.audioSrc);
    }
  }
  
  playAudio() {
    this.audioPlayerService.play();
    this.songPlaying = true
  }

  pauseAudio() {
    this.audioPlayerService.pause();
    this.songPlaying = false
  }

  stopAudio() {
    this.audioPlayerService.stop();
    this.songPlaying = false
  }
}
