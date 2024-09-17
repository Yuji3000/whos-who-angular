
import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})

export class AudioPlayerService {
  private sound: any;

  constructor() {}

  loadAudio(audioSrc: string) {
    if (this.sound) {
      this.sound.unload();
    }
    this.sound = new Howl({
      src: [audioSrc],
      format: ['mp3'], 
      autoplay: false,
      onloaderror: (error) => {
        console.error('Error loading audio:', error);
      }
    });
  }

  async play() {
    try {
      if (Howler.ctx.state === 'suspended') {
        // Resume AudioContext if suspended
        await Howler.ctx.resume();
      }
      this.sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  
  pause() {
    this.sound.pause();
  }

  stop() {
    this.sound.stop();
  }
}