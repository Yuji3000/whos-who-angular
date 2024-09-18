import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private readonly settingsKey = 'gameSettings';

  difficultyModes = [
    { mode: 'easy', winPercentage: 50 },
    { mode: 'medium', winPercentage: 70 },
    { mode: 'hard', winPercentage: 90 }
  ];

  constructor() { }

  getSettings(): any {
    // Retrieves settings from localStorage
    const settings = localStorage.getItem(this.settingsKey);

    // parsed settings returns e.g. {mode: 'medium', numberOfQuestions: 10}
    const parsedSettings = settings ? JSON.parse(settings) : this.getDefaultSettings();
    return parsedSettings;
  }

  saveSettings(settings: any): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }


  private getDefaultSettings(): any {
    return {
      mode: 'medium',
      numeberOfQuestions: 10,
    };
  }
}