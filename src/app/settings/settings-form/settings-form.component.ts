import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/services/settings/settings.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {PlaylistLoaderComponent} from "../../playlist-loader/playlist-loader.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatCheckbox} from "@angular/material/checkbox";

interface DifficultyMode {
  mode: string,
  winPercentage: number
}

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, PlaylistLoaderComponent, MatButtonToggleGroup, MatButtonToggle, MatCheckbox],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.css'
})

export class SettingsFormComponent implements OnInit {
  showSuccessMessage = false;
  difficultyModes: DifficultyMode[] = [
    { mode: 'easy', winPercentage: 50 },
    { mode: 'medium', winPercentage: 70 },
    { mode: 'hard', winPercentage: 90 }
  ];

  settingForm: FormGroup = new FormGroup({
    numberOfQuestions: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(25)
    ]),
    mode: new FormControl(undefined, [Validators.required]),
    playlistChoice: new FormControl('', [Validators.required]),
    allowExplicit: new FormControl('', [Validators.required])
  })

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.currentSettings.subscribe(settings => {
      if (settings) {
        // console.log('Settings (settings-form) OnInit', settings);
        this.settingForm.patchValue({
          numberOfQuestions: settings.numberOfQuestions,
          mode: settings.mode.mode,
          playlistChoice: settings.customPlaylistSelected ? 'custom' : 'default',
          allowExplicit: settings.allowExplicit,
        });
        this.difficultyModes = this.settingsService.difficultyModes;

        if (settings.customPlaylistSelected) {
          this.settingForm.get('playlistChoice')?.enable();
        } else {
          this.settingForm.get('playlistChoice')?.disable();
        }
      }
    });
  }

  onSubmit() {
    if (this.settingForm.valid) {
      const mode = this.settingForm.controls['mode'].value;
      const numberOfQuestions = this.settingForm.controls['numberOfQuestions'].value;
      const playlistSelected = this.settingForm.controls['playlistChoice'].value;
      const allowExplicit = this.settingForm.controls['allowExplicit'].value;
      this.settingsService.updateMode(mode);
      this.settingsService.updateNumberOfQuestions(numberOfQuestions);
      this.settingsService.setCustomPlaylist(playlistSelected === 'custom')
      this.settingsService.setExplicitPreference(allowExplicit);

      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);

    } else {
      console.log('Form is invalid. Please correct errors.');
    }
  }
}
