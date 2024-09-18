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
    const settings = localStorage.getItem(this.settingsKey);
    // console.log('Retrieved settings from localStorage:', settings);
    const parsedSettings = settings ? JSON.parse(settings) : this.getDefaultSettings();
    // console.log('Parsed settings:', parsedSettings);
    return parsedSettings;
  }

  saveSettings(settings: any): void {
    // console.log('Saving settings:', settings);
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }


  private getDefaultSettings(): any {
    return {
      mode: 'medium',
      numeberOfQuestions: 10,
    };
  }
}