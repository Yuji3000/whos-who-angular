import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/services/settings/settings.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
interface DifficultyModes {
  mode: string; 
  winPercentage: number;
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

  difficultyModes: DifficultyModes[] = [
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

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    const settings = this.settingsService.getSettings()
  }

  onSubmit() {
    if (this.settingForm.valid) {
      const updatedSettings = this.settingForm.value;
      this.settingsService.saveSettings(updatedSettings)
      console.log(this.settingForm.value)
    } else {
      console.log('Form is invalid. Please correct errors.')
    }
  }
}
