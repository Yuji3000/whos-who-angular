import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/services/settings/settings.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

interface DifficultyMode {
  mode: string,
  winPercentage: number
}

interface GameSettings {
  mode: DifficultyMode;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.css'
})

export class SettingsFormComponent {
  numberOfQuestions: number = 0

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
    mode: new FormControl(undefined, [Validators.required])
  })

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.currentSettings.subscribe(settings => {
      if (settings) {
        // console.log('Settings (settings-form) OnInit', settings);
        this.settingForm.patchValue({
          numberOfQuestions: settings.numberOfQuestions,
          mode: settings.mode.mode 
        });
        this.difficultyModes = this.settingsService.difficultyModes;
      }
    });
  }

  onSubmit() {
    if (this.settingForm.valid) {
      const mode = this.settingForm.controls['mode'].value;
      const numberOfQuestions = this.settingForm.controls['numberOfQuestions'].value;
      this.settingsService.updateMode(mode);
      this.settingsService.updateNumberOfQuestions(numberOfQuestions);

      console.log('(Settings-form)Settings onSubmit() {mode, numberOfQuestions}', {mode, numberOfQuestions});

    } else {
      console.log('Form is invalid. Please correct errors.');
    }
  }
}
