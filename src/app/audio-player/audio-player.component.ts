import { Component, Input } from '@angular/core';
import { AudioPlayerService } from 'src/services/audio-player.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  @Input() audioSrc?: string;  
  // isPlaying = false;
  // soundLoaded = false;

  constructor(private audioPlayerService: AudioPlayerService) {}

  ngOnInit() {
    
  }

  loadAndPlay() {
    if (this.audioSrc) {
      console.log('Playing audio from source:', this.audioSrc);
      this.audioPlayerService.loadAudio(this.audioSrc);
      this.audioPlayerService.play();
    }
  }

  playAudio() {
    this.loadAndPlay();
  }

  pauseAudio() {
    this.audioPlayerService.pause();

  }

  stopAudio() {
    this.audioPlayerService.stop();

  }
}
