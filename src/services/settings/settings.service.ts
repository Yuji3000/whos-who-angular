import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CustomPlaylistService} from "../custom-playlist/custom-playlist.service";

interface DifficultyMode {
  mode: string,
  winPercentage: number
}

interface GameSettings {
  mode: DifficultyMode;
  numberOfQuestions: number;
  customPlaylistSelected: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private readonly settingsKey = 'gameSettings';

  difficultyModes: DifficultyMode[] = [
    { mode: 'easy', winPercentage: 50 },
    { mode: 'medium', winPercentage: 70 },
    { mode: 'hard', winPercentage: 90 }
  ];

  private settingsSource = new BehaviorSubject<GameSettings>(this.getSettings());
  currentSettings = this.settingsSource.asObservable();

  getSettings(): GameSettings {
    const storedSettings = localStorage.getItem(this.settingsKey);
    // console.log('(settings.service) Retrieved settings from localstorage:', storedSettings);
    return storedSettings ? JSON.parse(storedSettings) : this.getDefaultSettings();
  }

  getDefaultSettings(): GameSettings {
    return {
      mode: this.difficultyModes[1],
      numberOfQuestions: 10,
      customPlaylistSelected: false
    };
  }

  updateSettings(newSettings: Partial<GameSettings>) {
    const currentSettings = this.settingsSource.value;
    const updatedSettings = { ...currentSettings, ...newSettings };
    this.settingsSource.next(updatedSettings);
    this.saveSettings(updatedSettings);
  }

  updateMode(mode: string) {
    const selectedMode = this.difficultyModes.find(d => d.mode === mode);
    if (selectedMode) {
      this.updateSettings({ mode: selectedMode });
    }
  }

  updateNumberOfQuestions(numberOfQuestions: number) {
    this.updateSettings({ numberOfQuestions });
  }

  setCustomPlaylist(customPlaylistSelected: boolean) {
    this.updateSettings({ customPlaylistSelected })
  }

  saveSettings(settings: GameSettings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }
}