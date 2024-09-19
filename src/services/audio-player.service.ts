import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})

export class AudioPlayerService {
  private sound: any;
  private currentSeek: number = 0;

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
      },
      onplay: () => {
        this.currentSeek = this.sound?.seek() || 0; 
      }
    });
  }

  async play() {
    try {
      if (Howler.ctx.state === 'suspended') {
        await Howler.ctx.resume();
      }
      this.sound.play();
      this.sound.seek(this.currentSeek);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  
  pause() {
    if (this.sound) {
      this.sound.pause();
      this.currentSeek = this.sound.seek(); 
    }
  }

  stop() {
    if (this.sound) {
      this.sound.stop();
      this.currentSeek = 0;
    }
  }

  seek(position: number) {
    if (this.sound) {
      this.sound.seek(position); 
    }
  }
  
}