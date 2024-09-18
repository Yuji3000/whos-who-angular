import { Component, Input } from '@angular/core';
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
export class AudioPlayerComponent {

  @Input()
  set audioSrc(newSrc: string) {
    this.stopAudio();
    this.audioPlayerService.loadAudio(newSrc);
    this.playAudio();
  }

  songPlaying: boolean = false;

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngOnInit() {
    if (this.audioSrc) {
      this.audioPlayerService.loadAudio(this.audioSrc);
    }
  }
  
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
}
