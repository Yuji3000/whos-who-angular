import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/services/settings/settings.service';
// import {MatSelectModule} from '@angular/material/select';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

interface DifficultyModes {
  mode: string; 
  winPercentage: number;
}

@Component({
  selector: 'app-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      Validators.maxLength(2),
      Validators.min(5),
      Validators.max(20),
      Validators.pattern('^[0-9]*$')
    ]),
    mode: new FormControl(undefined, [Validators.required])
  })


  onSubmit() {
    console.log(`Number of questions: ${this.settingForm.controls['numberOfQuestions'].value}`)
    console.log(`mode: ${this.settingForm.controls['mode'].value}`)
    console.log('valid?', this.settingForm.valid);
  }
}
